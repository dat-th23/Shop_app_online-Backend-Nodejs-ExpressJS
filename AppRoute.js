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
import * as BannerDetailController from './controllers/BannerDetailController.js'
import * as ImageController from './controllers/ImageController.js'
import * as ProductImageController from './controllers/ProductImageController.js'
import * as CartController from './controllers/CartController.js'
import * as CartItemController from './controllers/CartItemController.js'

import asyncHandler from './middlewares/asyncHandler.js'
import validate from './middlewares/validate.js'
import validateImage from './middlewares/validateImage.js'
import uploadImageMiddleware from './middlewares/uploadImage.js'

import InsertProductRequest from './dtos/requests/product/InsertProductRequest.js'
import UpdateProductRequest from './dtos/requests/product/updateProductRequest.js'
import InsertOrderRequest from './dtos/requests/order/InsertOrderRequest.js'
import InsertUserRequest from './dtos/requests/user/InsertUserRequest.js'
import InsertNewsRequest from './dtos/requests/news/InsertNewsRequest.js'
import UpdateNewsRequest from './dtos/requests/news/UpdateNewsRequest.js'
import InsertNewsDetailRequest from './dtos/requests/news-detail/InsertNewsDetailRequest.js'
import InsertBannerRequest from './dtos/requests/banner/InsertBannerRequest.js'
import InsertBannerDetailRequest from './dtos/requests/banner-detail/InsertBannerDetailRequest.js'
import InsertCartRequest from './dtos/requests/cart/InsertCartRequest.js'
import InsertCartItemRequest from './dtos/requests/cart-item/InsertCartItemRequest.js'

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
        validateImage,
        validate(InsertProductRequest),
        asyncHandler(ProductController.createProduct))
    router.put('/products/:id',
        validateImage,
        validate(UpdateProductRequest),
        asyncHandler(ProductController.updateProduct))
    router.delete('/products/:id', asyncHandler(ProductController.deleteProduct))

    // Category Routes
    router.get('/categories', asyncHandler(CategoryController.getAllCategories))
    router.get('/categories/:id', asyncHandler(CategoryController.getCategoryById))
    router.post('/categories',
        validateImage,
        asyncHandler(CategoryController.createCategory))
    router.put('/categories/:id',
        validateImage,
        asyncHandler(CategoryController.updateCategory))
    router.delete('/categories/:id', asyncHandler(CategoryController.deleteCategory))

    // Brand Routes
    router.get('/brands', asyncHandler(BrandController.getAllBrands))
    router.get('/brands/:id', asyncHandler(BrandController.getBrandById))
    router.post('/brands',
        validateImage,
        asyncHandler(BrandController.createBrand))
    router.put('/brands/:id',
        validateImage,
        asyncHandler(BrandController.updateBrand))
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
        validateImage,
        validate(InsertNewsRequest),
        asyncHandler(NewsController.createNewsArticle))
    router.put('/news/:id',
        validateImage,
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
        validateImage,
        validate(InsertBannerRequest),
        asyncHandler(BannerController.createBanner))
    router.put('/banners/:id',
        validateImage,
        asyncHandler(BannerController.updateBanner))
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

    // Image Upload Routes
    router.post('/images/upload', uploadImageMiddleware.array('images', 5),
        asyncHandler(ImageController.uploadImages))
    router.get('/images/:filename', asyncHandler(ImageController.viewImage))
    router.delete('/images/:filename', asyncHandler(ImageController.deleteImage))

    // Product Image Route 
    router.get('/product-images', asyncHandler(ProductImageController.getAllProductImages))
    router.get('/product-images/:id', asyncHandler(ProductImageController.getProductImageById))
    router.post('/product-images',
        validateImage,
        asyncHandler(ProductImageController.createProductImage))
    // router.put('/product-images/:id',
    //     validateImage,
    //     asyncHandler(ProductImageController.updateProductImage))
    router.delete('/product-images/:id', asyncHandler(ProductImageController.deleteProductImage))

    // cart route
    router.get('/carts', asyncHandler(CartController.getAllCarts));
    router.post('/carts',
        validate(InsertCartRequest),
        asyncHandler(CartController.createCart));
    router.post('/carts/checkout', asyncHandler(CartController.checkoutCart));
    router.get('/carts/:id', asyncHandler(CartController.getCartById));
    router.get('/carts/user/session', asyncHandler(CartController.getCartBySessionIdOrUserId));
    // router.put('/carts/:id', validate(InsertCartRequest), asyncHandler(CartController.updateCart));
    router.delete('/carts/:id', asyncHandler(CartController.deleteCart));

    // cart item route 
    router.post('/cart-items',
        validate(InsertCartItemRequest),
        asyncHandler(CartItemController.createCartItem));
    router.get('/cart-items/carts/:cart_id', asyncHandler(CartItemController.getCartItems));
    router.put('/cart-items/:id',
        validate(InsertCartItemRequest),
        asyncHandler(CartItemController.updateCartItem));
    router.delete('/cart-items/:id', asyncHandler(CartItemController.deleteCartItem));

    // Use the router with the base URL "/api"
    app.use('/api/', router)
}
