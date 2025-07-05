import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import type { Coupon } from './types';

interface CouponFormProps {
  initialValues?: Partial<Coupon>;
  onSubmit: (data: Omit<Coupon, 'id'>) => void;
  submitLabel?: string;
}

const CouponForm = ({ initialValues = {}, onSubmit, submitLabel = 'Create Coupon' }: CouponFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<Coupon, 'id'>>({
    defaultValues: {
      code: '',
      discount_type: 'PERCENTAGE',
      discount_value: 0,
      expiry_date: '',
      is_active: true,
      ...initialValues,
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-lavender-50 p-4 flex items-center justify-center">
      <motion.div 
        className="w-full max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header Section */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {initialValues.code ? 'Edit Coupon' : 'Create New Coupon'}
          </h1>
          <p className="text-gray-600 text-lg">
            Build and manage your promotional campaigns with ease
          </p>
        </motion.div>

        {/* Form Container */}
        <motion.div 
          className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {/* Purple Header Bar */}
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-6">
            <h2 className="text-xl font-semibold text-white flex items-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              Coupon Details
            </h2>
            <p className="text-purple-100 mt-1">Configure your discount settings below</p>
          </div>

          {/* Form Content */}
          <div className="p-8 space-y-6">
            {/* Coupon Code Field */}
            <motion.div 
              className="space-y-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Coupon Code
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors duration-200 text-gray-900 placeholder-gray-400"
                placeholder="Enter coupon code (e.g., SAVE20)"
                {...register('code', { required: 'Code is required' })}
              />
              {errors.code && (
                <p className="text-red-500 text-sm flex items-center mt-1">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.code.message}
                </p>
              )}
            </motion.div>

            {/* Discount Type and Value Row */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              {/* Discount Type */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Discount Type
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <select
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors duration-200 text-gray-900 bg-white appearance-none cursor-pointer pr-10"
                    {...register('discount_type', { required: true })}
                  >
                    <option value="PERCENTAGE">🎯 Percentage (%)</option>
                    <option value="FLAT">💰 Fixed Amount (₹)</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Discount Value */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Discount Value
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="number"
                  min="1"
                  step="0.01"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors duration-200 text-gray-900 placeholder-gray-400"
                  placeholder="Enter value"
                  {...register('discount_value', {
                    required: 'Discount value is required',
                    min: { value: 1, message: 'Must be at least 1' },
                  })}
                />
                {errors.discount_value && (
                  <p className="text-red-500 text-sm flex items-center mt-1">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.discount_value.message}
                  </p>
                )}
              </div>
            </motion.div>

            {/* Expiry Date */}
            <motion.div 
              className="space-y-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Expiry Date
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="date"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors duration-200 text-gray-900"
                {...register('expiry_date', { required: 'Expiry date is required' })}
              />
              {errors.expiry_date && (
                <p className="text-red-500 text-sm flex items-center mt-1">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.expiry_date.message}
                </p>
              )}
            </motion.div>

            {/* Status Toggle */}
            <motion.div 
              className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg border border-gray-200"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.7 }}
            >
              <input
                type="checkbox"
                id="is_active"
                className="w-5 h-5 text-purple-600 border-2 border-gray-300 rounded focus:ring-purple-500 focus:ring-2"
                {...register('is_active')}
              />
              <label htmlFor="is_active" className="text-sm font-medium text-gray-700 cursor-pointer">
                Activate this coupon immediately
              </label>
            </motion.div>

            {/* Submit Button */}
            <motion.div 
              className="pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.8 }}
            >
              <button
                type="submit"
                onClick={handleSubmit(onSubmit)}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>{submitLabel}</span>
              </button>
            </motion.div>
          </div>
        </motion.div>

        {/* Support Text */}
        <motion.div 
          className="text-center mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <p className="text-gray-600 text-sm">
            Need help? We're here to support your business growth journey.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CouponForm;