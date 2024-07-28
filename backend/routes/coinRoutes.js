import express from 'express';
import {
  getCoinStatus
} from '../controllers/coinController.js';

const router = express.Router();

router.route('/').get(getCoinStatus);

export default router;
