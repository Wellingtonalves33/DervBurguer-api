import * as Yup from "yup";
import Order from "../schemas/Order";
import Product from "../models/Product";
import Category from "../models/Category";
import User from "../models/User";

class OrderController {
    async store(request, response) {
        const schema = Yup.object({
            products: Yup.array()
                .required()
                .of(
                    Yup.object({
                        id: Yup.number().required(),
                        quantity: Yup.number().required(),
                    }),
                ),
        });

        try {
            schema.validateSync(request.body, { abortEarly: false });
        } catch (err) {
            return response.status(400).json({ error: err.errors });
        }

        const { products } = request.body;

        const productsIds = products.map((product) => product.id);

        const findProducts = await Product.findAll({
            where: {
                id: productsIds,
            },
            include: [
                {
                    model: Category,
                    as: "category",
                    attributes: ["name"]
                }
            ],
        });

        if (findProducts.length !== productsIds.length) {
            return response.status(400).json({ error: "Alguns produtos não foram encontrados" });
        }

        const formattedproducts = findProducts.map(product => {
            const productIndex = products.findIndex((item) => item.id === product.id);

            if (productIndex === -1) {
                throw new Error(`Produto com id ${product.id} não encontrado no pedido`);
            }

            const newProduct = {
                id: product.id,
                name: product.name,
                category: product.category.name,
                price: product.price,
                url: product.url,
                quantity: products[productIndex].quantity,
            };
            return newProduct;
        });

        const order = {
            user: {
                id: request.userId,
                name: request.userName,
            },
            products: formattedproducts,
            status: "pedido realizado",
        };

        try {
            const createOrder = await Order.create(order);
            return response.status(201).json(createOrder);
        } catch (err) {
            return response.status(400).json({ error: "Erro ao criar pedido" });
        }
    }

    async index(request, response) {
        try {
            const orders = await Order.find();
            return response.json(orders);
        } catch (err) {
            return response.status(400).json({ error: "Erro ao buscar pedidos" });
        }
    }

    async update(request, response) {
        const schema = Yup.object({
            status: Yup.string().required(),
        });

        try {
            schema.validateSync(request.body, { abortEarly: false });
        } catch (err) {
            return response.status(400).json({ error: err.errors });
        }

        try {
            const { admin: isAdmin } = await User.findByPk(request.userId);

            if (!isAdmin) {
                return response.status(401).json({ error: "Não autorizado" });
            }

            const { id } = request.params;
            const { status } = request.body;

            await Order.updateOne({ _id: id }, { status });

            return response.json({ message: "Status atualizado com sucesso" });
        } catch (err) {
            return response.status(400).json({ error: err.message });
        }
    }
}

export default new OrderController();