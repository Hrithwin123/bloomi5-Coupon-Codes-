// src/modules/coupon/coupon.service.ts
import { prisma } from '../../utils/prisma.js';
import { CreateCouponDto } from './coupon.types'; 


export const getAllCoupons = async () => {
  return prisma.coupon.findMany();
};

export const getCouponById = async (id: string) => {
  return prisma.coupon.findUnique({
    where: { id },
  });
};

export const createCoupon = async (data: CreateCouponDto) => {
  return prisma.coupon.create({ 
    data: {
      ...data,
      discount_value: Number(data.discount_value),
      expiry_date: new Date(data.expiry_date),
      is_active: data.is_active ?? true
    }
  });
};

export const updateCoupon = async (id: string, data: Partial<CreateCouponDto>) => {
  const updateData: any = { ...data };
  
  if (data.discount_value !== undefined) {
    updateData.discount_value = Number(data.discount_value);
  }
  
  if (data.expiry_date !== undefined) {
    updateData.expiry_date = new Date(data.expiry_date);
  }
  
  return prisma.coupon.update({
    where: { id },
    data: updateData,
  });
};

export const deleteCoupon = async (id: string) => {
  return prisma.coupon.delete({
    where: { id },
  });
};
