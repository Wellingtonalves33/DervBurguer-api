

import  Sequelize  from "sequelize";
import mongoose from "mongoose";

import configDatabase from '../config/database'

import User from '../app/models/User';
import Product from "../app/models/Product";
import Category from "../app/models/Category";

const models = [User, Product,Category];


class Database {
   constructor(){
       this.init();
       this.mongo();
   }
   init(){
       this.connection = new Sequelize('postgresql://postgres:KlzdeEAmvBgLQezXggtTiiisxwRlTRIU@roundhouse.proxy.rlwy.net:35897/railway');
       models
       .map((model)=> model.init(this.connection))
       .map(
           (model) => model.associate && model.associate(this.connection.models),
       );
   }
   mongo() {
       this.mongoConnection = mongoose.connect('mongodb://mongo:FjXTfKXrYguFodGukHkMqFZCnkKrZQwR@roundhouse.proxy.rlwy.net:50362');
   }
}
export default new Database();