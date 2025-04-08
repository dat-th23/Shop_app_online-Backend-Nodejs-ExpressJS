import { Op, Sequelize, where } from "sequelize"
import db from "../models"

export async function getAllProducts(req, res) {
    const { page = 1, limit = 10, search = '' } = req.query
    const offset = (page - 1) * limit

    const whereCondition = {
        [Op.or]: [
            { name: { [Op.like]: `%${search}%` } },
            { description: { [Op.like]: `%${search}%` } },
            { specification: { [Op.like]: `%${search}%` } },
        ]
    }

    const [total, products] = await Promise.all([
        db.Product.count({ where: whereCondition }),
        db.Product.findAll({
            where: whereCondition,
            include: ['Brand', 'Category'],
            offset: parseInt(offset),
            limit: parseInt(limit),
            order: [['id', 'ASC']],
        })
    ])

    res.status(200).json({
        success: true,
        message: 'Get product list successfully',
        data: products,
        count: products.length,
        pagination: {
            total: total,
            page: parseInt(page),
            limit: parseInt(limit),
        }
    })
}

export async function getProductById(req, res) {
    const { id } = req.params
    const product = await db.Product.findByPk(id)

    if (!product) {
        // If no product found, return a 404 Not Found Response
        return res.status(404).json({
            message: 'Not Found!',
            data: product
        })
    }
    res.status(200).json({
        success: true,
        message: 'Get product by id successfully',
        data: product,
    })
}

export async function createProduct(req, res) {
    const product = await db.Product.create(req.body)
    res.status(201).json({
        message: 'Created product list successfully',
        data: product,
    })
}

export async function deleteProduct(req, res) {
    res.status(200).json({
        success: true,
        message: 'Deleted product list successfully'
    })
}

export async function updateProduct(req, res) {
    res.status(200).json({
        success: true,
        message: 'Updated product list successfully'
    })
}