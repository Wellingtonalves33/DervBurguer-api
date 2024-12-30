import express from 'express';
import routes from './routes';
import { resolve } from 'node:path';
import cors from 'cors';
import './database';

class App {
    constructor() {
        try {
            console.log('Iniciando aplicação...');
            this.app = express();
            
            // Configuração básica do express
            this.app.use(express.json());
            console.log('Express JSON configurado');
            
            // Configuração do CORS
            this.app.use(cors({
                origin: '*',
                methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
                allowedHeaders: ['Content-Type', 'Authorization']
            }));
            console.log('CORS configurado');

            this.middlewares();
            this.routes();
            console.log('Aplicação iniciada com sucesso');
        } catch (error) {
            console.error('Erro ao iniciar aplicação:', error);
        }
    }

    middlewares() {
        try {
            const uploadsPath = resolve(__dirname, '..', 'uploads');
            this.app.use('/product-file', express.static(uploadsPath));
            this.app.use('/category-file', express.static(uploadsPath));
            
            // Error handling middleware
            this.app.use((err, req, res, next) => {
                console.error(err.stack);
                res.status(500).json({ error: 'Algo deu errado!' });
            });
            
            console.log('Middlewares configurados');
        } catch (error) {
            console.error('Erro nos middlewares:', error);
        }
    }

    routes() {
        try {
            // Rota de teste
            this.app.get('/test', (req, res) => {
                res.json({ message: 'API is working!' });
            });

            this.app.use(routes);
            console.log('Rotas configuradas');
        } catch (error) {
            console.error('Erro nas rotas:', error);
        }
    }
}

// Tratamento de erros não capturados
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
});

export default new App().app;