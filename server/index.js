import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import clientRoutes from './routes/client.js';
import generalRoutes from './routes/general.js';
import managementRoutes from './routes/management.js';
import salesRoutes from './routes/sales.js';

// -----> Data imports <-------
import User from './models/User.js';
import Product from './models/Product.js';
import ProductStat from './models/ProductStat.js';
import Transaction from './models/Transactions.js';
import OverallStat from './models/OverallStat.js';
import AffiliateStat from './models/AffiliateStat.js';
import {
	dataUser,
	dataProduct,
	dataProductStat,
	dataTransaction,
	dataOverallStat,
	dataAffiliateStat,
} from './data/index.js';
// -----> Configuration of dotenv <-------
dotenv.config();

// -----> Server configuartion <-------
const app = express();
app.use(express.json());
app.use(helmet()); //protecting APIs
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// -----> Routes <-------
app.use('/client', clientRoutes);
app.use('/general', generalRoutes);
app.use('/management', managementRoutes);
app.use('/sales', salesRoutes);

// -----> DB and server setup <-------

const PORT = process.env.PORT || 6000;
mongoose
	.connect(process.env.MONGOURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		app.listen(PORT, () => console.log(`Server PORT: ${PORT}`));

		// -----> Only Add Data Once <-------
		// User.insertMany(dataUser);
		// Product.insertMany(dataProduct);
		// ProductStat.insertMany(dataProductStat);
		// Transaction.insertMany(dataTransaction);
		// OverallStat.insertMany(dataOverallStat);
		// AffiliateStat.insertMany(dataAffiliateStat);
		console.log('Data inserted');
	})
	.catch((error) => console.log(`Issues: ${error}`));
