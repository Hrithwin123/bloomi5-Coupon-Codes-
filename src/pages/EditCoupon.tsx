import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CouponForm from '../features/coupons/CouponForm';
import { updateCoupon } from '../features/coupons/hooks';
import type { Coupon } from '../features/coupons/types';
import api from '../api/axios';
import LoadingPage from '../components/LoadingPage';

const EditCouponPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchCoupon = async () => {
      try {
        const res = await api.get(`/coupons/${id}`);
        setCoupon(res.data);
      } catch {
        alert('Coupon not found');
        navigate('/coupons');
      } finally {
        setLoading(false);
      }
    };

    fetchCoupon();
  }, [id, navigate]);

  const handleUpdate = async (data: Omit<Coupon, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      if (!id) return;
      await updateCoupon(id, {
        ...data,
        discount_value: Number(data.discount_value),
      });
      alert('Coupon updated!');
      navigate('/coupons');
    } catch {
      alert('Failed to update coupon');
    }
  };

  if (loading) return <LoadingPage text="Loading coupon..." subtitle="Fetching coupon details..." />;
  if (!coupon) return null;

  // Format the date for the HTML date input (YYYY-MM-DD)
  const formattedCoupon = {
    ...coupon,
    expiry_date: new Date(coupon.expiry_date).toISOString().split('T')[0]
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Edit Coupon</h2>
      <CouponForm
        initialValues={formattedCoupon}
        onSubmit={handleUpdate}
        submitLabel="Update Coupon"
      />
    </div>
  );
};

export default EditCouponPage;
