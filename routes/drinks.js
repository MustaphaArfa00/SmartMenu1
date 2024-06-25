import express from 'express';
import { addDrink, updateDrink, getAllDrinks, deleteDrink } from '../controllers/drinks.controller.js';

const router = express.Router();

router.post('/addDrink', addDrink);
router.put('/updateDrink/:id', updateDrink);
router.get('/getAllDrinks', getAllDrinks);
router.delete('/deleteDrink/:id', deleteDrink);

export default router;
