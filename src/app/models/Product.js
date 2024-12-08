import Sequelize, { Model } from "sequelize";

class Product extends Model {
   static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
            price: Sequelize.INTEGER,
            category: Sequelize.STRING,
            path: Sequelize.STRING,
            offer: Sequelize.BOOLEAN,
            url:{
                type:Sequelize.VIRTUAL,
                get(){
                    return `http://localhost:3001/product-file/${this.path}`
                }
            } 
        },
        {
            sequelize
        },
        );
        return this;
    }
    static associante(models){
        this.belongsTo(models.category, {
            foreignKey: 'category_id',
            as: 'category',
        });
    }
} 

export default Product;