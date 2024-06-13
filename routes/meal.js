import express from 'express';
import { addMeal,updateMeal, getAllMeals, deleteMeal } from '../controllers/meal.controller.js';


const router = express.Router();

router.post('/addMeal', addMeal);

router.put('/updateMeal/:id', updateMeal);

router.get('/getAllMeals', getAllMeals);

router.delete('/delete/:id', deleteMeal);

export default router ;
