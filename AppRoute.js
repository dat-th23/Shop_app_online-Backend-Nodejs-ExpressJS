import express from 'express'
import * as ProductController from './controllers/ProductController.js'
import * as CategoryController from './controllers/CategoryController.js'
import * as BrandController from './controllers/BrandController.js'
import * as OrderController from './controllers/OrderController.js'
import * as OrderDetailController from './controllers/OrderDetailController.js'
import asyncHandler from './middlewares/asyncHandler.js'
import validate from './middlewares/validate.js'
import InsertProductRequest from './dtos/requests/InsertProductRequest.js'
import UpdateProductRequest from './dtos/requests/updateProductRequest.js'

const router = express.Router()

export function AppRoute(app) {
    // Product Routes
    router.get('/products', asyncHandler(ProductController.getAllProducts))
    router.get('/products/:id', asyncHandler(ProductController.getProductById))
    router.post('/products',
        validate(InsertProductRequest),
        asyncHandler(ProductController.createProduct))
    router.put('/products/:id',
        validate(UpdateProductRequest),
        asyncHandler(ProductController.updateProduct))
    router.delete('/products/:id', asyncHandler(ProductController.deleteProduct))

    // Category Routes
    router.get('/categories', asyncHandler(CategoryController.getAllCategories))
    router.get('/categories/:id', asyncHandler(CategoryController.getCategoryById))
    router.post('/categories', asyncHandler(CategoryController.createCategory))
    router.put('/categories/:id', asyncHandler(CategoryController.updateCategory))
    router.delete('/categories/:id', asyncHandler(CategoryController.deleteCategory))

    // Brand Routes
    router.get('/brands', asyncHandler(BrandController.getAllBrands))
    router.get('/brands/:id', asyncHandler(BrandController.getBrandById))
    router.post('/brands', asyncHandler(BrandController.createBrand))
    router.put('/brands/:id', asyncHandler(BrandController.updateBrand))
    router.delete('/brands/:id', asyncHandler(BrandController.deleteBrand))

    // Order Routes
    router.get('/orders', asyncHandler(OrderController.getAllOrders))
    router.get('/orders/:id', asyncHandler(OrderController.getOrderById))
    router.post('/orders', asyncHandler(OrderController.createOrder))
    router.put('/orders/:id', asyncHandler(OrderController.updateOrder))
    router.delete('/orders/:id', asyncHandler(OrderController.deleteOrder))

    // Order Detail Routes
    router.get('/order-details', asyncHandler(OrderDetailController.getAllOrderDetails))
    router.get('/order-details/:id', asyncHandler(OrderDetailController.getOrderDetailById))
    router.post('/order-details', asyncHandler(OrderDetailController.createOrderDetail))
    router.put('/order-details/:id', asyncHandler(OrderDetailController.updateOrderDetail))
    router.delete('/order-details/:id', asyncHandler(OrderDetailController.deleteOrderDetail))

    // Use the router with the base URL "/api"
    app.use('/api/', router)
}
