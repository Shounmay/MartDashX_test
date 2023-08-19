import express from 'express';
import {
	getCustomers,
	getGeography,
	getProducts,
	getTransaction,
} from '../controllers/client.js';
const router = express.Router();

router.get('/products', getProducts);
router.get('/customers', getCustomers);
router.get('/transactiondetails', getTransaction);
router.get('/diverseStat', getGeography);
export default router;
