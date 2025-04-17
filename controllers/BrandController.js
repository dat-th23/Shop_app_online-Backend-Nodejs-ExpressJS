import { Op } from "sequelize"
import db from "../models"

export async function getAllBrands(req, res) {
    const { page = 1, limit = 10, search = '' } = req.query
    const offset = (page - 1) * limit

    const whereCondition = {
        [Op.or]: [
            { name: { [Op.like]: `%${search}%` } },
        ]
    }

    const [total, brands] = await Promise.all([
        db.Brand.count({ where: whereCondition }),
        db.Brand.findAll({
            where: whereCondition,
            offset: parseInt(offset),
            limit: parseInt(limit),
            order: [['id', 'ASC']],
        })
    ])

    res.status(200).json({
        success: true,
        message: 'Get brand list successfully',
        data: brands,
        count: brands.length,
        pagination: {
            total: total,
            page: parseInt(page),
            limit: parseInt(limit),
        }
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
        message: 'Created brand successfully',
        data: brand,
    })
}
export async function deleteBrand(req, res) {
    const { id } = req.params;
    const deleted = await db.Brand.destroy({ where: { id } });

    if (!deleted) {
        return res.status(404).json({
            message: 'Not Found!',
        });
    }

    res.status(200).json({
        success: true,
        message: 'Deleted brand successfully',
    });
}

export async function updateBrand(req, res) {
    const { id } = req.params;

    const [affectedRows] = await db.Brand.update(req.body, { where: { id } });

    if (affectedRows === 0) {
        return res.status(404).json({ message: 'Not Found!' });
    }

    const updatedBrand = await db.Brand.findByPk(id);

    res.status(200).json({
        success: true,
        message: 'Updated brand successfully',
        data: updatedBrand,
    });
}

