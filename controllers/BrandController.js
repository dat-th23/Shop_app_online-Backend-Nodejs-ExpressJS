import { Sequelize } from "sequelize"
import db from "../models"

export async function getAllBrands(req, res) {
    const brands = await db.Brand.findAll()
    res.status(200).json({
        success: true,
        message: 'Get brand list successfully',
        data: brands
    })
}

export async function getBrandById(req, res) {
    const { id } = req.params
    const brand = await db.Brand.findByPk(id)
    if (!brand) {
        // If no brand found, return a 404 Not Found Response
        return res.status(404).json({
            message: 'Not Found!',
            data: brand
        })
    }
    res.status(200).json({
        success: true,
        message: 'Get brand by id successfully',
        data: brand
    })
}

export async function createBrand(req, res) {
    const brand = await db.Brand.create(req.body)
    res.status(200).json({
        success: true,
        message: 'Get brand by id successfully',
        data: brand,
    })
}

export async function deleteBrand(req, res) {
    res.status(200).json({
        success: true,
        message: 'Deleted brand successfully'
    })
}

export async function updateBrand(req, res) {
    res.status(200).json({
        success: true,
        message: 'Updated brand successfully'
    })
}
