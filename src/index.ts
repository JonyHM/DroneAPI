import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import { Drone } from "./entity/Drone";

const PORTA = 3000;

createConnection().then(async connection => {

    const app = express();
    app.use(bodyParser.json());
    const droneRepository = connection.getRepository(Drone);

    app.get('/drones', async (req: express.Request, resp: express.Response) => {
        let page = req.query._page;
        let limit = req.query._limit;
        page > 0 
            ? page = page 
            : page = 0;
        limit > 0 
            ? limit = limit 
            : limit = 0;
        
        let sort = req.query._sort;
        let order = req.query._order;
        let orderId, orderName, orderBattery, orderStatus, orderFly;
        order 
            ? order = order.toUpperCase()
            : order = '';
        
        switch(sort) {
            case 'id':  {
                orderId = order;
                break;
            }

            case 'name':  {
                orderName = order;
                break;
            }

            case 'battery':  {
                orderBattery = order;
                break;
            }

            case 'status':  {
                orderStatus = order;
                break;
            }

            case 'fly':  {
                orderFly = order;
                break;
            }

        }

        await droneRepository.find({
            order: {
                id: orderId,
                customer_name: orderName,
                battery: orderBattery,
                status: orderStatus,
                current_fly: orderFly
            },
            skip: page,
            take: limit
        })
        .then(drones => resp.send(drones))
        .catch(err => resp.status(400).send(err.message));
    });

    app.get('/drones/:id', async (req: express.Request, resp: express.Response) => {
        await droneRepository.findOne(req.params.id)
            .then(drone => resp.send(drone))
            .catch(err => resp.status(400).send(err.message));
    });

    app.post('/drones', async (req: express.Request, resp: express.Response) => {
        await droneRepository.save(req.body)
            .then(() => resp.status(201).send('Drone criado com sucesso!'))
            .catch(err => resp.status(400).send(err.message));
    });

    app.delete('/drones/:id', async (req: express.Request, resp: express.Response) => {
        let droneARemover;        
        await droneRepository.findOne(req.params.id)
            .then(drone => droneARemover = drone)
            .catch(err => resp.status(400).send(err.message));
        await droneRepository.remove(droneARemover)
            .then(() => resp.status(200).send('Drone removido com sucesso!'))
            .catch(err => resp.status(400).send(err.message));
    });

    app.put('/drones/:id', async (req: express.Request, resp: express.Response) =>{
        let droneAAtualizar;
        await droneRepository.findOne(req.params.id)
            .then(drone => droneAAtualizar = drone)
            .catch(err => resp.status(400).send(err.message));
        await droneRepository.merge(droneAAtualizar, req.body);
    
        await droneRepository.save(droneAAtualizar)
            .then(() => resp.status(200).send('Drone atualizado com sucesso!'))
            .catch(err => resp.status(400).send(err.message));
    });

    await connection.manager.save(connection.manager.create(Drone, {
        customer_image: "https://robohash.org/uia.jpg",
        customer_name:  "Suzann",
        customer_adress: "955 Springview Junction",
        battery!: 90,
        max_speed!:  33.8,
        average_speed!: 11.6,
        status!: "failed",
        current_fly!: 94
    })).catch(error => console.log(error));
    
    await connection.manager.save(connection.manager.create(Drone, {
        customer_image: "https://robohash.org/drone.jpg",
        customer_name:  "Drake",
        customer_adress: "955 Springview Junction",
        battery!: 54,
        max_speed!:  23.8,
        average_speed!: 14.6,
        status!: "success",
        current_fly!: 98
    })).catch(error => console.log(error));;
    
    app.listen(PORTA);
    console.log("Servidor iniciado na porta: " + PORTA);

}).catch(error => console.log(error));
