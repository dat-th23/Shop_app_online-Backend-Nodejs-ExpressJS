import { Op } from "sequelize"
import db from "../models"

export async function getAllCategories(req, res) {
    const { page = 1, limit = 10, search = '' } = req.query
    const offset = (page - 1) * limit

    const whereCondition = {
        [Op.or]: [
            { name: { [Op.like]: `%${search}%` } },
        ]
    }

    const [total, categories] = await Promise.all([
        db.Category.count({ where: whereCondition }),
        db.Category.findAll({
            where: whereCondition,
            offset: parseInt(offset),
            limit: parseInt(limit),
            order: [['id', 'ASC']],
        })
    ])

    res.status(200).json({
        success: true,
        message: 'Get category list successfully!',
        data: categories,
        count: categories.length,
        pagination: {
            total: total,
            page: parseInt(page),
            limit: parseInt(limit),
        }
    })
}

export async function getCategoryById(req, res) {
    const { id } = req.params
    const category = await db.Category.findByPk(id)
    if (!category) {
        // If no category found, return a 404 Not Found Response
        return res.status(404).json({
            message: 'Category not found!',
            data: category
        })
    }
    res.status(200).json({
        success: true,
        message: 'Get category by id successfully!',
        data: category
    })
}

export async function createCategory(req, res) {
    const category = await db.Category.create(req.body)
    res.status(200).json({
        success: true,
        message: 'Created category successfully!',
        data: category,
    })
}
export async function deleteCategory(req, res) {
    const { id } = req.params;
    const deleted = await db.Category.destroy({ where: { id } });

    if (!deleted) {
        return res.status(404).json({
            message: 'Category not found!',
        });
    }

    res.status(200).json({
        success: true,
        message: 'Deleted category successfully!',
    });
}

export async function updateCategory(req, res) {
    const { id } = req.params;

    const [affectedRows] = await db.Category.update(req.body, { where: { id } });

    if (affectedRows === 0) {
        return res.status(404).json({ message: 'Category not found!' });
    }

    const updatedCategory = await db.Category.findByPk(id);

    res.status(200).json({
        success: true,
        message: 'Updated category successfully!',
        data: updatedCategory,
    });
}

