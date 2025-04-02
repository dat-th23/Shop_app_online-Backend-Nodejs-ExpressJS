import { Sequelize } from "sequelize"
import db from "../models"

export async function getAllBrands(req, res) {
    res.status(200).json({
        message: 'Get brand list successfully'
    })
}

export async function getBrandById(req, res) {
    res.status(200).json({
        message: 'Get brand by id successfully'
    })
}

export async function createBrand(req, res) {
    try {
        const brand = await db.Brand.create(req.body)
        res.status(200).json({
            message: 'Get brand by id successfully',
            data: brand,
        })
    } catch (error) {
        console.error('Error during brand insertion: ', error)
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

export async function deleteBrand(req, res) {
    res.status(200).json({
        message: 'Deleted brand successfully'
    })
}

export async function updateBrand(req, res) {
    res.status(200).json({
        message: 'Updated brand successfully'
    })
}
