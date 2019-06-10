import { Router, Request, Response } from "express"
import { createConnection } from "typeorm";

import { Drone } from './../entity/Drone';
import Roteador from "../interfaces/router.interface";
import DroneController from "../controller/DroneController";

class Rotas implements Roteador {
    public caminho: string;
    public rota: Router;
    public controller: DroneController;

    constructor() {
        this.rota = Router();
        this.caminho = '/drones';
        this.requisicoes();
    }
    
    public requisicoes() {
        createConnection().then(async connection => {
            this.controller = new DroneController(connection);

            this.rota.get('/drones', async (req: Request, resp: Response) => {
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
        
                this.controller.getAll(req, resp, orderId, orderName, orderBattery,
                    orderStatus, orderFly, page, limit);

            });

            this.rota.get('/drones/:id', async (req: Request, resp: Response) => {
                this.controller.getOne(req, resp);
            });
        
            this.rota.post('/drones', async (req: Request, resp: Response) => {
                this.controller.create(req, resp);
            });
        
            this.rota.delete('/drones/:id', async (req: Request, resp: Response) => {
                this.controller.delete(req, resp);
            });
        
            this.rota.put('/drones/:id', async (req: Request, resp: Response) =>{
                this.controller.update(req, resp);
            });      
        }).catch(error => console.log(error));
    }
}

export const rotas = new Rotas().rota;