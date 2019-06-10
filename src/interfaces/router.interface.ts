import { Router } from 'express';

interface Roteador {
    caminho: string
    rota: Router,
}

export default Roteador;