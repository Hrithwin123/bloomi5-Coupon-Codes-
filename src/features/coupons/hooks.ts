import api from '../../api/axios';
import type { Coupon } from './types';

export const getCoupons = async (): Promise<Coupon[]> => {
  const res = await api.get('/coupons');
  return res.data;
};

export const createCoupon = async (coupon: Omit<Coupon, 'id' | 'created_at' | 'updated_at'>) => {
  const res = await api.post('/coupons', coupon);
  return res.data;
};

export const updateCoupon = async (id: string, data: Partial<Coupon>) => {
  const res = await api.put(`/coupons/${id}`, data);
  return res.data;
};

export const deleteCoupon = async (id: string) => {
  await api.delete(`/coupons/${id}`);
};
