import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getCoupons } from '../features/coupons/hooks';
import type { Coupon } from '../features/coupons/types';

type Plan = {
  id: string;
  name: string;
  price: number;
  features: string[];
};

const plans: Plan[] = [
  { 
    id: 'basic', 
    name: 'Basic', 
    price: 199,
    features: ['Basic features', 'Email support', '1GB storage']
  },
  { 
    id: 'pro', 
    name: 'Pro', 
    price: 499,
    features: ['All Basic features', 'Priority support', '10GB storage', 'Advanced analytics']
  },
  { 
    id: 'premium', 
    name: 'Premium', 
    price: 999,
    features: ['All Pro features', '24/7 support', 'Unlimited storage', 'Custom integrations', 'Dedicated account manager']
  },
];

const SubscriptionPlans = () => {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [couponCode, setCouponCode] = useState('');
  const [discountedPrice, setDiscountedPrice] = useState<number | null>(null);
  const [couponResult, setCouponResult] = useState<string>('');
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        setLoading(true);
        const data = await getCoupons();
        setCoupons(data);
      } catch (err) {
        setError('Failed to load coupons');
        console.error('Error loading coupons:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, []);

  const handleApplyCoupon = () => {
    if (!selectedPlan) {
      setCouponResult('⚠️ Please select a plan first.');
      return;
    }

    const coupon = coupons.find(
      (c) => c.code.toLowerCase() === couponCode.toLowerCase()
    );

    if (!coupon) {
      setCouponResult('❌ Invalid coupon.');
      return;
    }

    if (!coupon.is_active) {
      setCouponResult('❌ Coupon is inactive.');
      return;
    }

    if (new Date(coupon.expiry_date) < new Date()) {
      setCouponResult('❌ Coupon has expired.');
      return;
    }

    let price = selectedPlan.price;

    if (coupon.discount_type === 'PERCENTAGE') {
      price = price - (price * coupon.discount_value) / 100;
    } else {
      price = price - coupon.discount_value;
    }

    price = Math.max(price, 0);

    setDiscountedPrice(price);
    setCouponResult(`✅ Coupon applied! New price: ₹${price.toFixed(2)}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-lavender-100 flex items-center justify-center">
        <motion.div 
          className="text-center bg-white rounded-2xl shadow-xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full mx-auto mb-6"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-xl font-semibold text-gray-700">Loading subscription plans...</p>
          <p className="text-sm text-gray-500 mt-2">Preparing your business solutions</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-lavender-100 flex items-center justify-center">
        <motion.div 
          className="text-center bg-white rounded-2xl shadow-xl p-8 max-w-md"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <p className="text-red-600 mb-6 text-lg font-medium">{error}</p>
          <motion.button 
            onClick={() => window.location.reload()} 
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Retry
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
      {/* Header */}
      <motion.div 
        className="bg-white shadow-lg border-b border-purple-100"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <motion.h2 
              className="text-3xl font-bold text-gray-800"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              🚀 Choose Your <span className="text-purple-600">Business Growth</span> Plan
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link
                to="/coupons"
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Back to Coupons
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Partner with us to build and grow your online presence. We're here to support you every step of the way.
          </p>
          <div className="flex justify-center items-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <span className="text-green-500 font-bold">✓</span>
              <span>Hand-holding support</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-500 font-bold">✓</span>
              <span>Complete customization</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-500 font-bold">✓</span>
              <span>Community engagement</span>
            </div>
          </div>
        </motion.div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 h-full flex flex-col ${
                selectedPlan?.id === plan.id
                  ? 'ring-4 ring-purple-500 transform scale-105 shadow-2xl bg-purple-50'
                  : 'hover:shadow-xl hover:transform hover:scale-102'
              }`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -5 }}
              onClick={() => {
                setSelectedPlan(plan);
                setCouponCode('');
                setDiscountedPrice(null);
                setCouponResult('');
              }}
            >
              <div className="p-8 flex flex-col h-full">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{plan.name}</h3>
                  <div className="flex items-center justify-center space-x-1 mb-6">
                    <span className="text-lg text-gray-500">₹</span>
                    <span className="text-4xl font-bold text-purple-600">{plan.price}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature, i) => (
                    <motion.li 
                      key={i} 
                      className="flex items-center text-sm text-gray-600"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                    >
                      <span className="text-green-500 mr-3 font-bold">✓</span>
                      {feature}
                    </motion.li>
                  ))}
                </ul>

                <motion.div 
                  className={`text-center py-4 rounded-xl font-semibold transition-all duration-200 mt-auto ${
                    selectedPlan?.id === plan.id 
                      ? 'bg-purple-600 text-white shadow-lg' 
                      : 'bg-gray-100 text-gray-700 hover:bg-purple-100'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {selectedPlan?.id === plan.id ? 'Selected' : 'Select Plan'}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Selected Plan Details */}
        {selectedPlan && (
          <motion.div 
            className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-purple-200"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-6">
              <h3 className="text-2xl font-bold mb-2">
                Selected Plan: {selectedPlan.name}
              </h3>
              <p className="text-purple-100">
                Ready to transform your business presence
              </p>
            </div>
            
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="bg-gray-50 rounded-xl p-6">
                  <p className="text-gray-600 text-sm mb-2">Original Price:</p>
                  <p className="text-3xl font-bold text-gray-800">₹{selectedPlan.price}</p>
                </div>
                {discountedPrice && (
                  <motion.div 
                    className="bg-green-50 rounded-xl p-6 border-2 border-green-200"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-green-600 text-sm mb-2">Discounted Price:</p>
                    <p className="text-3xl font-bold text-green-600">₹{discountedPrice.toFixed(2)}</p>
                    <p className="text-sm text-green-500 mt-1">
                      You save: ₹{(selectedPlan.price - discountedPrice).toFixed(2)}
                    </p>
                  </motion.div>
                )}
              </div>

              <div className="space-y-6">
                <div className="bg-purple-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-800 mb-4">Apply Coupon Code</h4>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                      onKeyPress={(e) => e.key === 'Enter' && handleApplyCoupon()}
                    />
                    <motion.button
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-sm"
                      onClick={handleApplyCoupon}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Apply Coupon
                    </motion.button>
                  </div>
                </div>

                {couponResult && (
                  <motion.div 
                    className={`p-4 rounded-xl border-2 ${
                      couponResult.includes('✅') 
                        ? 'bg-green-100 text-green-800 border-green-200' 
                        : 'bg-red-100 text-red-800 border-red-200'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {couponResult}
                  </motion.div>
                )}

                <motion.button
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white py-4 px-8 rounded-xl font-bold text-lg transition-all duration-200 shadow-lg"
                  onClick={() => {
                    const finalPrice = discountedPrice ?? selectedPlan.price;
                    alert(`Proceeding to checkout for ${selectedPlan.name} plan at ₹${finalPrice.toFixed(2)}`);
                    // Here you would typically redirect to a payment gateway
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Proceed to Checkout - ₹{(discountedPrice ?? selectedPlan.price).toFixed(2)}
                </motion.button>
                
                <div className="text-center text-sm text-gray-500">
                  <p>💰 30-day money-back guarantee • 🔒 Secure payment • 🤝 Dedicated support</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionPlans;