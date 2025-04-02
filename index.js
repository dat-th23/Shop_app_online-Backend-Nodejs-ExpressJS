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

    yarn add express
    yarn add dotenv nodemon
    yarn add --dev @babel/core @babel/node @babel/preset-env
*/
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import { AppRoute } from './AppRoute.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
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
