import { Sequelize } from "sequelize"
import db from "../models"

export async function getAllCategories(req, res) {
    const categories = await db.Category.findAll()
    res.status(200).json({
        success: true,
        message: 'Get category list successfully',
        data: categories
    })
}

export async function getCategoryById(req, res) {
    const { id } = req.params
    const category = await db.Category.findByPk(id)
    if (!category) {
        // If no category found, return a 404 Not Found Response
        return res.status(404).json({
            message: 'Not Found!',
            data: category
        })
    }
    res.status(200).json({
        success: true,
        message: 'Get category by id successfully',
        data: category
    })
}

export async function createCategory(req, res) {
    const category = await db.Category.create(req.body)
    res.status(200).json({
        success: true,
        message: 'Get category by id successfully',
        data: category,
    })
}

export async function deleteCategory(req, res) {
    res.status(200).json({
        success: true,
        message: 'Deleted category successfully'
    })
}

export async function updateCategory(req, res) {
    res.status(200).json({
        success: true,
        message: 'Updated category successfully'
    })
}
