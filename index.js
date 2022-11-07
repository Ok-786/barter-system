import express from "express";
import cors from "cors";
import productsRoute from './routes/productsRoutes.js';
import adminRoute from './routes/usersRoutes.js';
import dotenv from 'dotenv';

import path from 'path';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "30mb", extended: true }))
app.use(express.urlencoded({ limit: "30mb", extended: true }))

app.use('/uploads/images', express.static(path.join('uploads', 'images')))

app.use("/api/users", adminRoute);
app.use("/api/products", productsRoute);
app.use("/api/auth", adminRoute);


const server = app.listen(process.env.PORT || 8000, () => {
    console.log(`Server running at Port: ${process.env.PORT ? process.env.PORT : 8000}`)
});

