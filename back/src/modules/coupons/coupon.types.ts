import { $Enums } from '../../../generated/prisma';

export interface CreateCouponDto {
  code: string;
  discount_type: $Enums.DiscountType;
  discount_value: number;
  expiry_date: Date | string;
  is_active?: boolean;
}
