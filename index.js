import express from "express";
import cors from "cors";
import vendorsRoute from './routes/vendorsRoute.js';
import categoriesRoute from './routes/categoriesRoutes.js';
import productsRoute from './routes/productsRoutes.js';
import usersRoute from './routes/deleteusersRoutes.js';
import adminRoute from './routes/usersRoutes.js';
import branchesRoutes from './routes/branchesRoutes.js';
import payoutsRoutes from './routes/payoutsRoutes.js';
import dotenv from 'dotenv';

import path from 'path';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "30mb", extended: true }))
app.use(express.urlencoded({ limit: "30mb", extended: true }))

app.use('/uploads/images', express.static(path.join('uploads', 'images')))

app.use("/api/users", usersRoute);
app.use("/api/vendors", vendorsRoute);
app.use("/api/categories", categoriesRoute);
app.use("/api/products", productsRoute);
app.use("/api/auth", adminRoute);
app.use("/api/branches", branchesRoutes);
app.use("/api/payouts", payoutsRoutes);


const server = app.listen(process.env.PORT || 8000, () => {
    console.log(`Server running at Port: ${process.env.PORT ? process.env.PORT : 8000}`)
});

