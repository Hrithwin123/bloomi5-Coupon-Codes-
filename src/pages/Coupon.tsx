import { Link } from 'react-router-dom';
import CouponList from '../features/coupons/CouponList';

const CouponsPage = () => {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Coupons</h1>
        <div className="flex gap-2">
          <Link
            to="/subscribe"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Subscription Plans
          </Link>
          <Link
            to="/coupons/new"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Create Coupon
          </Link>
        </div>
      </div>

      <CouponList />
    </div>
  );
};

export default CouponsPage;
