import { Request, Response } from 'express';
import * as CouponService from './coupon.service.js';
import { CreateCouponDto } from './coupon.types';



export const getCoupons = async (_req: Request, res: Response) => {

  try {

    const coupons = await CouponService.getAllCoupons();
    res.json(coupons);

  } catch (err) {

    res.status(500).json({ error : 'Failed to fetch coupons' });

  }
};

export const getCoupon = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const coupon = await CouponService.getCouponById(id);
    if (!coupon) {
      res.status(404).json({ error: 'Coupon not found' });
      return;
    }
    res.json(coupon);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch coupon' });
  }
};



export const createCoupon = async (req: Request, res: Response) => {

  try {

    const data: CreateCouponDto = req.body;
    console.log('Creating coupon with data:', data);
    const coupon = await CouponService.createCoupon(data);
    res.status(201).json(coupon);

  } catch (error) {

    console.error('Error creating coupon:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(400).json({ error : 'Failed to create coupon', details: errorMessage });

  }
};



export const updateCoupon = async (req: Request, res: Response) => {

  const { id } = req.params;

  try {

    const coupon = await CouponService.updateCoupon(id, req.body);
    res.json(coupon);

  } catch (error) {

    res.status(400).json({ error : 'Failed to update coupon' });

  }
};



export const deleteCoupon = async (req: Request, res: Response) => {

  const { id } = req.params;

  try {

    await CouponService.deleteCoupon(id);
    res.status(204).send();

  } catch (error) {

    res.status(400).json({ error : 'Failed to delete coupon' });

  }
};
