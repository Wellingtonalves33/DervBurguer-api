import express from 'express';
import routes from './routes';
import { resolve } from 'node:path';
import cors from 'cors';
import './database';

class App {
    constructor() {
        this.app = express();
        
        // Configuração básica do express
        this.app.use(express.json());
        
        // Usando o middleware cors
        this.app.use(cors({
            origin: '*',
            methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization']
        }));

        // Resto das configurações
        this.middlewares();
        this.routes();
    }

    middlewares() {
        const uploadsPath = resolve(__dirname, '..', 'uploads');
        this.app.use('/product-file', express.static(uploadsPath));
        this.app.use('/category-file', express.static(uploadsPath));
        
        // Middleware para logging
        this.app.use((req, res, next) => {
            console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
            next();
        });
    }

    routes() {
        // Rota de teste
        this.app.get('/test', (req, res) => {
            res.json({ message: 'API is working!' });
        });

        // Suas rotas
        this.app.use(routes);
    }
}

export default new App().app;