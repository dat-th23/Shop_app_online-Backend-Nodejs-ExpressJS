import express from 'express'
import * as ProductController from './controllers/ProductController.js'
import * as CategoryController from './controllers/CategoryController.js'
import * as BrandController from './controllers/BrandController.js'
import * as OrderController from './controllers/OrderController.js'
import * as OrderDetailController from './controllers/OrderDetailController.js'
import * as UserController from './controllers/UserController.js'
import * as NewsController from './controllers/NewsController.js'
import * as NewsDetailController from './controllers/NewsDetailController.js'
import * as BannerController from './controllers/BannerController.js'
import * as BannerDetailController from './controllers/BannerDetailController'

import asyncHandler from './middlewares/asyncHandler.js'
import validate from './middlewares/validate.js'
import InsertProductRequest from './dtos/requests/product/InsertProductRequest.js'
import UpdateProductRequest from './dtos/requests/product/updateProductRequest.js'
import InsertOrderRequest from './dtos/requests/order/InsertOrderRequest.js'
import InsertUserRequest from './dtos/requests/user/InsertUserRequest.js'
import InsertNewsRequest from './dtos/requests/news/InsertNewsRequest.js'
import UpdateNewsRequest from './dtos/requests/news/UpdateNewsRequest.js'
import InsertNewsDetailRequest from './dtos/requests/news-detail/InsertNewsDetailRequest.js'
import InsertBannerRequest from './dtos/requests/banner/InsertBannerRequest.js'
import InsertBannerDetailRequest from './dtos/requests/banner-detail/InsertBannerDetailRequest.js'

const router = express.Router()

export function AppRoute(app) {
    // User Routes
    router.post('/users',
        validate(InsertUserRequest),
        asyncHandler(UserController.createUser)
    )

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
    router.post('/orders',
        validate(InsertOrderRequest),
        asyncHandler(OrderController.createOrder))
    router.put('/orders/:id', asyncHandler(OrderController.updateOrder))
    router.delete('/orders/:id', asyncHandler(OrderController.deleteOrder))

    // Order Detail Routes
    router.get('/order-details', asyncHandler(OrderDetailController.getAllOrderDetails))
    router.get('/order-details/:id', asyncHandler(OrderDetailController.getOrderDetailById))
    router.post('/order-details', asyncHandler(OrderDetailController.createOrderDetail))
    router.put('/order-details/:id', asyncHandler(OrderDetailController.updateOrderDetail))
    router.delete('/order-details/:id', asyncHandler(OrderDetailController.deleteOrderDetail))

    // News Routes
    router.get('/news', asyncHandler(NewsController.getAllNewsArticles))
    router.get('/news/:id', asyncHandler(NewsController.getNewsArticleById))
    router.post('/news',
        validate(InsertNewsRequest),
        asyncHandler(NewsController.createNewsArticle))
    router.put('/news/:id',
        validate(UpdateNewsRequest),
        asyncHandler(NewsController.updateNewsArticle))
    router.delete('/news/:id', asyncHandler(NewsController.deleteNewsArticle))


    // NewsDetail Routes
    router.get('/news-details', asyncHandler(NewsDetailController.getAllNewsDetails))
    router.get('/news-details/:id', asyncHandler(NewsDetailController.getNewsDetailById))
    router.post('/news-details',
        validate(InsertNewsDetailRequest),
        asyncHandler(NewsDetailController.createNewsDetail))
    router.put('/news-details/:id',
        asyncHandler(NewsDetailController.updateNewsDetail))
    router.delete('/news-details/:id', asyncHandler(NewsDetailController.deleteNewsDetail))

    // Banner Routes
    router.get('/banners', asyncHandler(BannerController.getAllBanners))
    router.get('/banners/:id', asyncHandler(BannerController.getBannerById))
    router.post('/banners',
        validate(InsertBannerRequest),
        asyncHandler(BannerController.createBanner))
    router.put('/banners/:id', asyncHandler(BannerController.updateBanner))
    router.delete('/banners/:id', asyncHandler(BannerController.deleteBanner))

    // BannerDetail Routes
    router.get('/banner-details', asyncHandler(BannerDetailController.getAllBannerDetails))
    router.get('/banner-details/:id', asyncHandler(BannerDetailController.getBannerDetailById))
    router.post('/banner-details',
        validate(InsertBannerDetailRequest),
        asyncHandler(BannerDetailController.createBannerDetail))
    router.put('/banner-details/:id',
        asyncHandler(BannerDetailController.updateBannerDetail))
    router.delete('/banner-details/:id', asyncHandler(BannerDetailController.deleteBannerDetail))


    // Use the router with the base URL "/api"
    app.use('/api/', router)
}
