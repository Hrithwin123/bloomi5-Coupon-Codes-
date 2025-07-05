import CouponForm from '../features/coupons/CouponForm';
import { createCoupon } from '../features/coupons/hooks';
import type { Coupon } from '../features/coupons/types';
import { useNavigate } from 'react-router-dom';

const CreateCouponPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data: Omit<Coupon, 'id'>) => {
    try {
      await createCoupon(data);
      alert('Coupon created!');
      navigate('/coupons');
    } catch {
      alert('Failed to create coupon');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Create New Coupon</h2>
      <CouponForm onSubmit={handleSubmit} submitLabel="Create Coupon" />
    </div>
  );
};

export default CreateCouponPage;
