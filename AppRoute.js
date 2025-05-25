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
import { authenticateToken, requireRole } from './middlewares/jwtAuth.js'

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
import UpdateOrderRequest from './dtos/requests/order/updateOrderRequest.js'
import LoginUserRequest from './dtos/requests/user/LoginUserRequest.js'
import { UserRole } from './constants/userRole.js'

const router = express.Router()

export function AppRoute(app) {
    // User Routes
    router.get('/users/profile/:id',
        authenticateToken,
        requireRole([UserRole.USER]),
        asyncHandler(UserController.profile))
    router.post('/users/register', validate(InsertUserRequest), asyncHandler(UserController.registerUser))
    router.post('/users/login', validate(LoginUserRequest), asyncHandler(UserController.login))
    router.put('/users/:id',
        authenticateToken,
        requireRole([UserRole.ADMIN, UserRole.USER]),
        asyncHandler(UserController.updateUser))

    // Product Routes
    router.get('/products', asyncHandler(ProductController.getAllProducts))
    router.get('/products/:id', asyncHandler(ProductController.getProductById))
    router.post('/products',
        authenticateToken,
        requireRole([UserRole.ADMIN]),
        validateImage,
        validate(InsertProductRequest),
        asyncHandler(ProductController.createProduct))
    router.put('/products/:id',
        authenticateToken,
        requireRole([UserRole.ADMIN]),
        validateImage,
        validate(UpdateProductRequest),
        asyncHandler(ProductController.updateProduct))
    router.delete('/products/:id',
        authenticateToken,
        requireRole([UserRole.ADMIN]),
        asyncHandler(ProductController.deleteProduct))

    // Category Routes
    router.get('/categories', asyncHandler(CategoryController.getAllCategories))
    router.get('/categories/:id', asyncHandler(CategoryController.getCategoryById))
    router.post(
        '/categories',
        authenticateToken,
        requireRole([UserRole.ADMIN]),
        validateImage,
        asyncHandler(CategoryController.createCategory)
    );
    router.put(
        '/categories/:id',
        authenticateToken,
        requireRole([UserRole.ADMIN]),
        validateImage,
        asyncHandler(CategoryController.updateCategory)
    );
    router.delete(
        '/categories/:id',
        authenticateToken,
        requireRole([UserRole.ADMIN]),
        asyncHandler(CategoryController.deleteCategory)
    );

    // Brand Routes
    router.get('/brands', asyncHandler(BrandController.getAllBrands))
    router.get('/brands/:id', asyncHandler(BrandController.getBrandById))
    router.post('/brands',
        authenticateToken,
        requireRole([UserRole.ADMIN]),
        validateImage,
        asyncHandler(BrandController.createBrand))
    router.put('/brands/:id',
        authenticateToken,
        requireRole([UserRole.ADMIN]),
        validateImage,
        asyncHandler(BrandController.updateBrand))
    router.delete('/brands/:id',
        authenticateToken,
        requireRole([UserRole.ADMIN]),
        asyncHandler(BrandController.deleteBrand))

    // Order Routes
    router.get('/orders', asyncHandler(OrderController.getAllOrders))
    router.get('/orders/:id', asyncHandler(OrderController.getOrderById))
    // router.post('/orders',
    //     validate(InsertOrderRequest),
    //     asyncHandler(OrderController.createOrder))
    router.put('/orders/:id',
        authenticateToken,
        requireRole([UserRole.ADMIN, UserRole.USER]),
        validate(UpdateOrderRequest),
        asyncHandler(OrderController.updateOrder))
    router.delete('/orders/:id',
        authenticateToken,
        requireRole([UserRole.ADMIN]),
        asyncHandler(OrderController.deleteOrder))

    // Order Detail Routes
    router.get('/order-details', asyncHandler(OrderDetailController.getAllOrderDetails))
    router.get('/order-details/:id', asyncHandler(OrderDetailController.getOrderDetailById))
    router.post('/order-details',
        authenticateToken,
        requireRole([UserRole.ADMIN]),
        asyncHandler(OrderDetailController.createOrderDetail))
    router.put('/order-details/:id',
        authenticateToken,
        requireRole([UserRole.ADMIN]),
        asyncHandler(OrderDetailController.updateOrderDetail))
    router.delete('/order-details/:id',
        authenticateToken,
        requireRole([UserRole.ADMIN]),
        asyncHandler(OrderDetailController.deleteOrderDetail))

    // News Routes
    router.get('/news', asyncHandler(NewsController.getAllNewsArticles))
    router.get('/news/:id', asyncHandler(NewsController.getNewsArticleById))
    router.post('/news',
        authenticateToken,
        requireRole([UserRole.ADMIN]),
        validateImage,
        validate(InsertNewsRequest),
        asyncHandler(NewsController.createNewsArticle))
    router.put('/news/:id',
        authenticateToken,
        requireRole([UserRole.ADMIN]),
        validateImage,
        validate(UpdateNewsRequest),
        asyncHandler(NewsController.updateNewsArticle))
    router.delete('/news/:id',
        authenticateToken,
        requireRole([UserRole.ADMIN]),
        asyncHandler(NewsController.deleteNewsArticle))


    // NewsDetail Routes
    router.get('/news-details', asyncHandler(NewsDetailController.getAllNewsDetails))
    router.get('/news-details/:id', asyncHandler(NewsDetailController.getNewsDetailById))
    router.post('/news-details',
        authenticateToken,
        requireRole([UserRole.ADMIN]),
        validate(InsertNewsDetailRequest),
        asyncHandler(NewsDetailController.createNewsDetail))
    router.put('/news-details/:id',
        authenticateToken,
        requireRole([UserRole.ADMIN]),
        asyncHandler(NewsDetailController.updateNewsDetail))
    router.delete('/news-details/:id',
        authenticateToken,
        requireRole([UserRole.ADMIN]),
        asyncHandler(NewsDetailController.deleteNewsDetail))

    // Banner Routes
    router.get('/banners', asyncHandler(BannerController.getAllBanners))
    router.get('/banners/:id', asyncHandler(BannerController.getBannerById))
    router.post('/banners',
        authenticateToken,
        requireRole([UserRole.ADMIN]),
        validateImage,
        validate(InsertBannerRequest),
        asyncHandler(BannerController.createBanner))
    router.put('/banners/:id',
        authenticateToken,
        requireRole([UserRole.ADMIN]),
        validateImage,
        asyncHandler(BannerController.updateBanner))
    router.delete('/banners/:id',
        authenticateToken,
        requireRole([UserRole.ADMIN]),
        asyncHandler(BannerController.deleteBanner))

    // BannerDetail Routes
    router.get('/banner-details', asyncHandler(BannerDetailController.getAllBannerDetails))
    router.get('/banner-details/:id', asyncHandler(BannerDetailController.getBannerDetailById))
    router.post('/banner-details',
        authenticateToken,
        requireRole([UserRole.ADMIN]),
        validate(InsertBannerDetailRequest),
        asyncHandler(BannerDetailController.createBannerDetail))
    router.put('/banner-details/:id',
        authenticateToken,
        requireRole([UserRole.ADMIN]),
        asyncHandler(BannerDetailController.updateBannerDetail))
    router.delete('/banner-details/:id',
        authenticateToken,
        requireRole([UserRole.ADMIN]),
        asyncHandler(BannerDetailController.deleteBannerDetail))

    // Image Upload Routes
    router.post('/images/upload',
        authenticateToken,
        requireRole([UserRole.ADMIN, UserRole.USER]),
        uploadImageMiddleware.array('images', 5),
        asyncHandler(ImageController.uploadImages))
    router.get('/images/:filename', asyncHandler(ImageController.viewImage))
    router.delete('/images/:filename',
        authenticateToken,
        requireRole([UserRole.ADMIN, UserRole.USER]),
        asyncHandler(ImageController.deleteImage))

    // Product Image Route 
    router.get('/product-images', asyncHandler(ProductImageController.getAllProductImages))
    router.get('/product-images/:id', asyncHandler(ProductImageController.getProductImageById))
    router.post('/product-images',
        authenticateToken,
        requireRole([UserRole.ADMIN]),
        validateImage,
        asyncHandler(ProductImageController.createProductImage))
    router.delete('/product-images/:id',
        authenticateToken,
        requireRole([UserRole.ADMIN]),
        asyncHandler(ProductImageController.deleteProductImage))

    // cart route
    router.get('/carts', asyncHandler(CartController.getAllCarts));
    router.post('/carts',
        authenticateToken,
        requireRole([UserRole.USER]),
        validate(InsertCartRequest),
        asyncHandler(CartController.createCart));
    router.post('/carts/checkout',
        authenticateToken,
        requireRole([UserRole.USER]),
        asyncHandler(CartController.checkoutCart));
    router.get('/carts/:id', asyncHandler(CartController.getCartById));
    router.get('/carts/user/session', asyncHandler(CartController.getCartBySessionIdOrUserId));
    // router.put('/carts/:id', validate(InsertCartRequest), asyncHandler(CartController.updateCart));
    router.delete('/carts/:id',
        authenticateToken,
        requireRole([UserRole.USER]),
        asyncHandler(CartController.deleteCart));

    // cart item route 
    router.post('/cart-items',
        validate(InsertCartItemRequest),
        asyncHandler(CartItemController.createCartItem));
    router.get('/cart-items/carts/:cart_id', asyncHandler(CartItemController.getCartItems));
    router.put('/cart-items/:id',
        authenticateToken,
        requireRole([UserRole.USER]),
        validate(InsertCartItemRequest),
        asyncHandler(CartItemController.updateCartItem));
    router.delete('/cart-items/:id',
        authenticateToken,
        requireRole([UserRole.USER]),
        asyncHandler(CartItemController.deleteCartItem));

    // Use the router with the base URL "/api"
    app.use('/api/', router)
}
