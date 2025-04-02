import { Sequelize } from "sequelize"
import db from "../models"

export async function getAllCategories(req, res) {
    res.status(200).json({
        message: 'Get category list successfully'
    })
}

export async function getCategoryById(req, res) {
    res.status(200).json({
        message: 'Get category by id successfully'
    })
}

export async function createCategory(req, res) {
    try {
        const category = await db.Category.create(req.body)
        res.status(200).json({
            message: 'Get category by id successfully',
            data: category,
        })
    } catch (error) {
        console.error('Error during category insertion: ', error)
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

export async function deleteCategory(req, res) {
    res.status(200).json({
        message: 'Deleted category successfully'
    })
}

export async function updateCategory(req, res) {
    res.status(200).json({
        message: 'Updated category successfully'
    })
}
