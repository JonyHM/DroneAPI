// import {getRepository, getConnection} from "typeorm";
// import {NextFunction, Request, Response} from "express";
// import {Drone} from "../entity/Drone";

// class DroneController {

//     private connection = getConnection();
//     private droneRepository = this.connection.getRepository(Drone);

//     public all(request: Request, response: Response, next: NextFunction) {
//         return this.droneRepository.find()
//             .then(drones => response.send(drones))
//             .catch(err => response.status(400).send(err.message)
//         );
//     }

//     public one(request: Request, response: Response, next: NextFunction) {
//         return this.droneRepository.findOne(request.params.id)
//             .then(drone => response.send(drone))
//             .catch(err => response.status(400).send(err.message)
//         );
//     }

//     public save(request: Request, response: Response, next: NextFunction) {
//         return this.droneRepository.save(request.body)
//             .then(() => response.status(201).send('Drone criado com sucesso!'))
//             .catch(err => response.status(400).send(err.message)
//         );
//     }

//     public remove(request: Request, response: Response, next: NextFunction) {
//         let droneARemover;
//         this.droneRepository.findOne(request.params.id)
//             .then(drone => droneARemover = drone)
//             .catch(err => console.log(err.message)
//         );

//         return this.droneRepository.remove(droneARemover)
//             .then(() => response.status(200).send('Drone removido com sucesso!'))
//             .catch(err => response.status(400).send(err.message)
//         );
//     }

//     public update(request: Request, response: Response, next: NextFunction) {
//         let droneAAtualizar;
//         this.droneRepository.findOne(request.params.id)
//             .then(drone => droneAAtualizar = drone)
//             .catch(err => console.log(err.message)
//         );

//         return this.droneRepository.update(droneAAtualizar, request.body)
//             .then(() => response.status(200).send('Drone atualizado com sucesso!'))
//             .catch(err => response.status(400).send(err.message)
//         );
//     }

//     // async paginate

//     // async sort

// }

// export const droneController = new DroneController();