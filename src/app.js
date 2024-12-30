import express from 'express';
import routes from './routes';
import { resolve } from 'node:path';
import cors from 'cors';
import './database';

class App {
    constructor() {
        this.app = express()
        
        // Configuração mais permissiva do CORS para teste
        this.app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
            
            // Responde imediatamente a requisições OPTIONS
            if (req.method === 'OPTIONS') {
                return res.sendStatus(200);
            }
            next();
        });

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(express.json());
        const uploadsPath = resolve(__dirname, '..', 'uploads');
        this.app.use('/product-file', express.static(uploadsPath));
        this.app.use('/category-file', express.static(uploadsPath));
    }

    routes() {
        this.app.use(routes);
    }
}

export default new App().app;