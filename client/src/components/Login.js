import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import PasswordStrengthMeter from './PasswordStrengthMeter';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
});

const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])/, 'Password must contain at least one lowercase letter')
    .matches(/^(?=.*[A-Z])/, 'Password must contain at least one uppercase letter')
    .matches(/^(?=.*\d)/, 'Password must contain at least one number')
    .matches(/^(?=.*[@$!%*?&])/, 'Password must contain at least one special character')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password')
});

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setIsSubmitting(true);
    setError('');

    try {
      let result;
      if (isLogin) {
        result = await login(values.email, values.password);
      } else {
        result = await register(values.name, values.email, values.password);
      }

      if (result && result.success) {
        navigate('/dashboard');
      } else {
        setError(result?.message || 'Authentication failed');
      }
    } catch (err) {
      console.error('Authentication error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
      setSubmitting(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const getInitialValues = () => {
    if (isLogin) {
      return {
        email: '',
        password: ''
      };
    } else {
      return {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      };
    }
  };

  const getValidationSchema = () => {
    return isLogin ? LoginSchema : RegisterSchema;
  };

  if (isLogin) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          {/* Login Form */}
          <div className="bg-white rounded-xl shadow-md p-8 border border-blue-500/20">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                DelaySense Login
              </h1>
              <p className="text-gray-600">Welcome back! Please sign in to your account.</p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <Formik
              initialValues={getInitialValues()}
              validationSchema={getValidationSchema()}
              onSubmit={handleSubmit}
            >
              {({ values, errors, touched }) => (
                <Form className="space-y-6">
                  {/* Email Field */}
                  <div>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Field
                        name="email"
                        type="email"
                        placeholder="Email Address"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                    <ErrorMessage name="email" component="div" className="mt-1 text-red-500 text-sm" />
                  </div>

                  {/* Password Field */}
                  <div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Field
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    <ErrorMessage name="password" component="div" className="mt-1 text-red-500 text-sm" />
                  </div>

                  {/* Login Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:transform-none"
                  >
                    {isSubmitting ? 'Signing in...' : 'Sign In'}
                  </button>
                </Form>
              )}
            </Formik>

            {/* Forgot Password & Register Links */}
            <div className="mt-6 text-center space-y-3">
              <div>
                <button className="text-blue-500 hover:text-blue-600 text-sm font-medium transition-colors">
                  Forgot password?
                </button>
              </div>
              <div className="text-sm text-gray-600">
                Don't have an account?{' '}
                <button
                  onClick={toggleMode}
                  className="text-blue-500 hover:text-blue-600 font-medium transition-colors"
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          {/* Register Form */}
          <div className="bg-white rounded-xl shadow-md p-8 border border-blue-500/20">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                DelaySense Register
              </h1>
              <p className="text-gray-600">Create your account to get started.</p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <Formik
              initialValues={getInitialValues()}
              validationSchema={getValidationSchema()}
              onSubmit={handleSubmit}
            >
              {({ values, errors, touched }) => (
                <Form className="space-y-6">
                  {/* Name Field */}
                  <div>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Field
                        name="name"
                        type="text"
                        placeholder="Full Name"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                    <ErrorMessage name="name" component="div" className="mt-1 text-red-500 text-sm" />
                  </div>

                  {/* Email Field */}
                  <div>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Field
                        name="email"
                        type="email"
                        placeholder="Email Address"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                    <ErrorMessage name="email" component="div" className="mt-1 text-red-500 text-sm" />
                  </div>

                  {/* Password Field */}
                  <div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Field
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    <ErrorMessage name="password" component="div" className="mt-1 text-red-500 text-sm" />
                    
                    {/* Password Strength Meter */}
                    {values.password && (
                      <div className="mt-2">
                        <PasswordStrengthMeter password={values.password} />
                      </div>
                    )}
                  </div>

                  {/* Confirm Password Field */}
                  <div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Field
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    <ErrorMessage name="confirmPassword" component="div" className="mt-1 text-red-500 text-sm" />
                  </div>

                  {/* Register Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:transform-none"
                  >
                    {isSubmitting ? 'Creating account...' : 'Create Account'}
                  </button>
                </Form>
              )}
            </Formik>

            {/* Login Link */}
            <div className="mt-6 text-center">
              <div className="text-sm text-gray-600">
                Already have an account?{' '}
                <button
                  onClick={toggleMode}
                  className="text-blue-500 hover:text-blue-600 font-medium transition-colors"
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Login; 