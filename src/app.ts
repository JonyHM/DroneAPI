import "reflect-metadata";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";

import {rotas} from "./routes/router";

class App {
    public app: express.Application;
    private PORTA: number;

    constructor(porta: number) {
        this.app = express();
        this.PORTA = parseInt(process.env.PORT, 10) || porta;
        this.init();
    }

    public listen() {
        this.app.listen(this.PORTA, () => {
            console.log(`Servidor iniciado na porta ${this.PORTA}`);
        });
    }

    public init() {
        this.app.use(bodyParser.json());
        this.app.use('/', rotas);
        this.app.use(cors());
    }

}

export default App;