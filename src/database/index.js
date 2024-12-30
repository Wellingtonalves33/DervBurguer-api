import Sequelize from "sequelize";
import mongoose from "mongoose";
import configDatabase from '../config/database';
import 'dotenv/config';

class Database {
    constructor() {
        try {
            console.log('Iniciando conexão com banco de dados...');
            console.log('Config Database:', JSON.stringify(configDatabase, null, 2));
            this.init();
            this.mongo();
        } catch (error) {
            console.error('Erro no constructor do Database:', error);
            throw error;
        }
    }
    
    async init() {
        try {
            console.log('Tentando conectar ao PostgreSQL...');
            this.connection = new Sequelize(
                process.env.NODE_ENV === 'production'
                    ? process.env.DATABASE_URL
                    : configDatabase
            );
            await this.connection.authenticate();
            console.log('Conexão PostgreSQL estabelecida com sucesso');
        } catch (error) {
            console.error('Erro na conexão PostgreSQL:', error);
            throw error;
        }
    }
    
    async mongo() {
        try {
            console.log('Tentando conectar ao MongoDB...');
            const mongoURL = process.env.MONGODB_URI;
            console.log('MongoDB URL:', mongoURL ? 'URL configurada' : 'URL não encontrada');
            await mongoose.connect(mongoURL);
            console.log('Conexão MongoDB estabelecida com sucesso');
        } catch (error) {
            console.error('Erro na conexão MongoDB:', error);
            throw error;
        }
    }
}

export default new Database();

// import  Sequelize  from "sequelize";
// import mongoose from "mongoose";

// import configDatabase from '../config/database'

// import User from '../app/models/User';
// import Product from "../app/models/Product";
// import Category from "../app/models/Category";

// const models = [User, Product,Category];


// class Database {
//    constructor(){
//        this.init();
//        this.mongo();
//    }
//    init(){
//        this.connection = new Sequelize(configDatabase);
//        models
//        .map((model)=> model.init(this.connection))
//        .map(
//            (model) => model.associate && model.associate(this.connection.models),
//        );
//    }
//    mongo() {
//        this.mongoConnection = mongoose.connect('mongodb://localhost:27017/devburger');
//    }
// }
// export default new Database();