import express from 'express';
import { addAppetizer, updateAppetizer, getAllAppetizers, deleteAppetizer } from '../controllers/appetizers.controller.js';

const router = express.Router();

router.post('/addAppetizer', addAppetizer);
router.put('/updateAppetizer/:id', updateAppetizer);
router.get('/getAllAppetizers', getAllAppetizers);
router.delete('/deleteAppetizer/:id', deleteAppetizer);

export default router;
