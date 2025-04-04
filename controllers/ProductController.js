import { Sequelize } from "sequelize"
import db from "../models"
import InsertProductRequest from "../dtos/requests/InsertProductRequest"

export async function getAllProducts(req, res) {
    const products = await db.Product.findAll()
    res.status(200).json({
        message: 'Get product list successfully',
        data: products
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
        message: 'Deleted product list successfully'
    })
}

export async function updateProduct(req, res) {
    res.status(200).json({
        message: 'Updated product list successfully'
    })
}