import express from 'express';
import { addDessert, updateDessert, getAllDesserts, deleteDessert } from '../controllers/desserts.controller.js';

const router = express.Router();

router.post('/addDessert', addDessert);
router.put('/updateDessert/:id', updateDessert);
router.get('/getAllDesserts', getAllDesserts);
router.delete('/deleteDessert/:id', deleteDessert);

export default router;
