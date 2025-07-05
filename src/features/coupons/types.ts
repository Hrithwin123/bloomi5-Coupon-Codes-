export type DiscountType = 'PERCENTAGE' | 'FLAT';

export interface Coupon {
  id: string;
  code: string;
  discount_type: DiscountType;
  discount_value: number;
  expiry_date: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
