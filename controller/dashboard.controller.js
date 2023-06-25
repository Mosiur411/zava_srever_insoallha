const { default: mongoose } = require("mongoose");
const { ProductModel } = require("../model/product/product.model");
const { OrderModel } = require("../model/order.model");
const { PurchasesModel } = require("../model/purchase");

const getRrecord = async (req, res) => {
    try {
        const { _id, role } = req.user
        const isAdmin = role == 'admin' ? true : false
        const product = await PurchasesModel.aggregate([
            {
                $group: {
                    _id: 1,
                    quantity: {
                        $sum: '$quantity'
                    },
                    stock: {
                        $sum: '$stock'
                    },
                    cost: {
                        $sum: { $multiply: ["$quantity", "$cost"] }
                    },
                    totalCost: {
                        $sum: { $multiply: ["$stock", "$cost"] }
                    },
                }
            },
            {
                $project: {
                    cost: true,
                    stock: true,
                    quantity: true,
                    totalCost: true,
                }
            }
        ])
        let pipeline = [];
        if (isAdmin) {
            pipeline = [];
        } else {
            pipeline = [
                {
                    $match: { user: _id }
                },
            ];
        }

        const sale = await OrderModel.aggregate([
            ...pipeline,
            {
                $unwind: "$item"
            },
            {
                $group: {
                    _id: 1,
                    quantity: {
                        $sum: "$item.quantity"
                    },
                    total: { $sum: "$item.saleing_Price" }
                }
            },
            {
                $project: {
                    quantity: true,
                    total: true,
                }
            }

        ])


        const payment = await OrderModel.aggregate([
            ...pipeline,
            {
                $group: {
                    _id: "$payment",
                    totalAmount: { $sum: "$totalPrice" }
                }
            }
        ],
        );




        return res.status(200).json({ products: product, sales: sale, payment: payment })
    } catch (err) {
        const errorMessage = errorMessageFormatter(err)
        return res.status(500).json(errorMessage)
    }
}


module.exports = { getRrecord }