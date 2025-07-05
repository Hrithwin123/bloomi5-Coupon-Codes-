
import { Router } from 'express';
import { getCoupons, getCoupon, createCoupon, updateCoupon, deleteCoupon } from './coupon.controllers.js';

const router = Router();

router.get('/', getCoupons);
router.post('/', createCoupon);
router.get('/:id', getCoupon);
router.put('/:id', updateCoupon);
router.delete('/:id', deleteCoupon);

export default router;
