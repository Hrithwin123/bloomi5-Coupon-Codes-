import { Routes, Route, Navigate } from 'react-router-dom';
import CouponsPage from './pages/Coupon';
import CreateCouponPage from './pages/CreateCoupon';
import EditCouponPage from './pages/EditCoupon';
import SubscriptionPlans from './pages/SubscriptionPlans';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/coupons" />} />
      <Route path="/coupons" element={<CouponsPage />} />
      <Route path="/coupons/new" element={<CreateCouponPage />} />
      <Route path="/coupons/:id/edit" element={<EditCouponPage />} />
      <Route path="/subscribe" element={<SubscriptionPlans/>}></Route>
    </Routes>
  );
};

export default App;
