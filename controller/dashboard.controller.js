const { default: mongoose } = require("mongoose");
const { ProductModel } = require("../model/product/product.model");
const { OrderModel } = require("../model/order.model");
const { PurchasesModel } = require("../model/purchase");
const { SalesModel } = require("../model/sales.model");
const { errorMessageFormatter } = require("../utils/helpers");
const moment = require("moment/moment");

const getRrecord = async (req, res) => {
    try {
        let invoicTotal = 0;
        let totalDue = 0;
        let { fromDate, toDate } = req.query;
        fromDate = fromDate == 'undefined' ? new Date() : fromDate;
        toDate = toDate == 'undefined' ? new Date() : toDate;
        var fromDateHandel = new Date(fromDate);
        var toDateHandel = new Date(toDate);
        fromDate = moment(fromDateHandel).startOf('day').toDate()
        toDate = moment(toDateHandel).endOf('day').toDate()

        let reportOptions = {
            filter: {
                createdAt: {
                    $gte: fromDate,
                    $lte: toDate
                },
                updatedAt: {
                    $gte: fromDate,
                    $lte: toDate
                }
            }
        }
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

        let GrossProfitSlea = 0
        const sale = await SalesModel.aggregate([
            { $match: reportOptions.filter },
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
                    total: { $sum: "$item.saleing_Price" },
                    purchases_ids: { $push: { purchases_id: "$item.purchases_id", quantity: "$item.quantity" } },

                }
            },
            {
                $project: {
                    quantity: true,
                    total: true,
                    purchases_ids: true,
                }
            }

        ])

        /* total sele handel  */

        if (sale[0]?.purchases_ids) {
            const promises = sale[0].purchases_ids.map(async (data) => {
                const GrossPrices = await PurchasesModel.findById(data.purchases_id);
                return GrossPrices;
            });

            const resolvedPromises = await Promise.all(promises);

            GrossProfitSlea = resolvedPromises.reduce((total, data, index) => {
                const quantity = sale[0].purchases_ids[index].quantity;
                return total + data?.cost * quantity;
            }, 0);
        }
        let payment = await SalesModel.aggregate([
            { $match: reportOptions.filter },
            ...pipeline,
            {
                $group: {
                    _id: "$payment",
                    totalAmount: { $sum: "$totalPrice" }
                }
            }
        ],
        );

        for (const item of payment) {
            if (item._id !== 'due') {
                invoicTotal += item.totalAmount;
            } else {
                totalDue += item.totalAmount;
            }
        }
        payment = { totalInvoic: invoicTotal, totalDue: totalDue }


        const dashboard = {
            grossProfit: sale[0]?.total-GrossProfitSlea,
        }
        return res.status(200).json({ products: product, sales: sale, payment: payment, dashboard: dashboard })
    } catch (err) {
        const errorMessage = errorMessageFormatter(err)
        return res.status(500).json(errorMessage)
    }
}


module.exports = { getRrecord }