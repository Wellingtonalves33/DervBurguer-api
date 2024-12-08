import mongoose from 'mongoose';


const OrderSchema = new mongoose.Schema({
    user:{
        id:{
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
    },
    products: [
        {
            id: {
                type: Number,
                required: true,
            },
            name: {
                type: String,
                require: true,
            },
            price: {
                type: Number,
                require: true,
            },
            category: {
                type: String,
                require: true,
            },
            url: {
                type: String,
                require: true,
            },
            quantity: {
                type: String,
                require: true,
            },
        },
    ],

    status: {
        type: String,
        require: true,
    },
    
},
{
    timestamps: true,
},
);

export default mongoose.model('Order', OrderSchema);