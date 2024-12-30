import express from 'express';
import routes from './routes';
import { resolve } from 'node:path';
import cors from 'cors';
import './database';

class App {
    constructor() {
        this.app = express()
        
        // Configuração atualizada do CORS
        this.app.use(cors({
            origin: [
                'https://devburger-front-c5gfmkp2i-wellingtonalves33s-projects.vercel.app',
                'http://localhost:5173'  // para desenvolvimento local
            ],
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization']
        }));

        this.middlewares();
        this.routes();
    };

    middlewares() {
        this.app.use(express.json());
        
        // Configuração dos arquivos estáticos
        const uploadsPath = resolve(__dirname, '..', 'uploads');
        this.app.use('/product-file', express.static(uploadsPath));
        this.app.use('/category-file', express.static(uploadsPath));

        // Adicione um middleware para log de requisições (opcional, mas útil para debug)
        this.app.use((req, res, next) => {
            console.log(`${req.method} ${req.path}`);
            next();
        });
    };

    routes() {
        this.app.use(routes);
    };
}

export default new App().app;