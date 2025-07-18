/*
    DB diagram 
    https://dbdiagram.io/d/ShopApp_NodeJs_ReactJs-67e2cc4975d75cc8446aa55e

    npx sequelize-cli init
    npx sequelize-cli model:generate --name User --attributes email:string,password:string,name:string,role:integer,avatar:string,phone:integer,created_at:date,updated_at:date

    Run Migration: 
    npx sequelize-cli db:migrate

    Revert the most recent migration:
    npx sequelize-cli db:migrate:undo

    npx sequelize-cli db:migrate:undo:all

    npx sequelize-cli model:generate --name Category --attributes name:string,image:text
    
    npx sequelize-cli model:generate --name Brand --attributes name:string,image:text
    
    npx sequelize-cli model:generate --name News --attribute title:string,image:text,content:text
    
    npx sequelize-cli model:generate --name Banner --attributes name:string,image:text,status:integer

    npx sequelize-cli model:generate --name Order --attributes user_id:integer,status:integer,note:text,total:integer
    
    npx sequelize-cli model:generate --name Product --attributes name:string,image:text,price:integer,oldprice:integer,description:text,specification:text,buyturn:integer,quantity:integer,brand_id:integer,category_id:integer
    
    npx sequelize-cli model:generate --name OrderDetail --attributes order_id:integer,product_id:integer,price:integer,quantity:integer
    
    npx sequelize-cli model:generate --name BannerDetail --attributes product_id:integer,banner_id:integer
    
    npx sequelize-cli model:generate --name NewsDetail --attributes product_id:integer,news_id:integer
    SELECT * FROM information_schema.table_constraints WHERE table_schema = 'shop_app_online' AND table_name = 'products';

    npx sequelize-cli model:generate --name Feedback --attributes product_id:integer,user_id:integer,star:integer,content:text

    npx sequelize-cli model:generate --name ProductImage --attributes product_id:integer,image_url:text

    npx sequelize-cli migration:generate --name add-session_id-to-orders

    ALTER TABLE `order` DROP FOREIGN KEY constraint_name;

    npx sequelize-cli model:generate --name Cart --attributes user_id:integer,session_id:string

    npx sequelize-cli model:generate --name CartItem --attributes cart_id:integer,product_id:integer,quantity:integer

    ALTER TABLE carts MODIFY COLUMN session_id VARCHAR(225) NULL, ADD UNIQUE (session_id)
    ALTER TABLE carts MODIFY COLUMN user_id VARCHAR(225) NULL, ADD UNIQUE (user_id)

    ALTER TABLE order 
    MODIFY COLUMN status INT COMMENT 1: pending, 2: processing, 3: cancel, 4: ship, 
    5: delivered, 6: refund, 7: fail

    ALTER TABLE orders ADD phone varchar(50)
    ALTER TABLE orders ADD address varchar(255)

    ALTER TABLE banners 
    MODIFY COLUMN status INT COMMENT 1: pending, 2: processing, 3: cancel,

    ALTER TABLE users ADD COLUMN is_locked TINYINT(1) DEFAUlT 0

    ALTER TABLE users ADD COLUMN password_changed_at DATETIME NULL;

    npx sequelize-cli model:generate --name Attribute --attributes name:string
    npx sequelize-cli model:generate --name ProductAttributeValue --attributes product_id:integer,attribute_id:integer,value:text

    yarn add express
    yarn add dotenv nodemon
    yarn add --dev @babel/core @babel/node @babel/preset-env

    yarn add multer
    yarn add jsonwebtoken
*/
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import { AppRoute } from './AppRoute.js'
import db from './models/index.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", '*')
    res.header("Access-Control-Allow-Methods", 'GET, POST, PUT, DELETE')
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")

    next()
})

app.get('/api/health', async (req, res) => {
    try {
        // ping DB
        await db.sequelize.authenticate()

        res.status(200).json({
            status: 'ok',
            db: 'connected',
            uptime: process.uptime(),
        })
    } catch (err) {
        res.status(500).json({
            status: 'error',
            db: 'disconnected',
            error: err.message
        })
    }
})

app.use(morgan('dev'))

// Default Route
app.get('/', (req, res) => {
    res.send('Hello world! This is my app 🚀')
})

// Register Routes
AppRoute(app)

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
