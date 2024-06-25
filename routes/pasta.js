import express from 'express';
import { addPasta, updatePasta, getAllPastas, deletePasta } from '../controllers/pasta.controller.js';

const router = express.Router();

router.post('/addPasta', addPasta);
router.put('/updatePasta/:id', updatePasta);
router.get('/getAllPastas', getAllPastas);
router.delete('/deletePasta/:id', deletePasta);

export default router;
