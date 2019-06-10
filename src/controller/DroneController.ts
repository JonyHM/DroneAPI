import { Request, Response } from "express"

import { Drone } from './../entity/Drone';
import { Connection } from "typeorm";


class DroneController {

    private droneRepository;
    private conexao;

    constructor(connection: Connection) {
        this.droneRepository = connection.getRepository(Drone);
        this.conexao = connection;
    }

    public getAll = async (req: Request, resp: Response, ...opt: any) => {
        const orderId = opt[0];
        const orderName = opt[1];
        const orderBattery = opt[2];
        const orderStatus = opt[3];
        const orderFly = opt[4];
        const page = opt[5];
        const limit = opt[6];

        await this.droneRepository.find({
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
    }
    
    public getOne = async (req: Request, resp: Response) => {
        await this.droneRepository.findOne(req.params.id)
            .then(drone => resp.send(drone))
            .catch(err => resp.status(400).send(err.message)
        );
    }

    public delete = async (req: Request, resp: Response) => {
        let droneARemover: Drone;        
        await this.droneRepository.findOne(req.params.id)
            .then(drone => droneARemover = drone)
            .catch(err => resp.status(400).send(err.message)
        );

        await this.droneRepository.remove(droneARemover)
            .then(() => resp.status(200).send('Drone removido com sucesso!'))
            .catch(err => resp.status(400).send(err.message)
        );
    }

    public update = async (req: Request, resp: Response) => {
        let droneAAtualizar: Drone;
        await this.droneRepository.findOne(req.params.id)
            .then(drone => droneAAtualizar = drone)
            .catch(err => resp.status(400).send(err.message)
        );
        await this.droneRepository.merge(droneAAtualizar, req.body);
    
        await this.droneRepository.save(droneAAtualizar)
            .then(() => resp.status(200).send('Drone atualizado com sucesso!'))
            .catch(err => resp.status(400).send(err.message)
        );
    }

    public create = async (req: Request, resp: Response) => {
        await this.droneRepository.save(req.body)
            .then(() => resp.status(201).send('Drone criado com sucesso!'))
            .catch(err => resp.status(400).send(err.message)
        );
    }
}

export default DroneController;