import CouponForm from '../features/coupons/CouponForm';
import { createCoupon } from '../features/coupons/hooks';
import type { Coupon } from '../features/coupons/types';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../hooks/useToast';
import Toast from '../components/Toast';

const CreateCouponPage = () => {
  const navigate = useNavigate();
  const { toast, showSuccess, showError, hideToast } = useToast();

  const handleSubmit = async (data: Omit<Coupon, 'id'>) => {
    try {
      await createCoupon(data);
      showSuccess('Coupon created successfully! 🎉');
      setTimeout(() => {
        navigate('/coupons');
      }, 1500);
    } catch {
      showError('Failed to create coupon. Please try again.');
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
