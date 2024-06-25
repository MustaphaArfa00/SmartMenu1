import express from 'express';
import { addPizza, updatePizza, getAllPizzas, deletePizza } from '../controllers/pizza.controller.js';

const router = express.Router();

router.post('/addPizza', addPizza);
router.put('/updatePizza/:id', updatePizza);
router.get('/getAllPizzas', getAllPizzas);
router.delete('/deletePizza/:id', deletePizza);

export default router;
