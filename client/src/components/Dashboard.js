import React from 'react';
import { LogOut, User, Mail, Calendar } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">DelaySense</h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Welcome Card */}
          <div className="bg-white rounded-xl shadow-md p-8 mb-8">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-10 w-10 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {user?.name}!
              </h2>
              <p className="text-gray-600">
                You have successfully logged into your DelaySense account.
              </p>
            </div>

            {/* User Information */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Full Name</p>
                    <p className="text-gray-900">{user?.name}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Email Address</p>
                    <p className="text-gray-900">{user?.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Member Since</p>
                    <p className="text-gray-900">{user?.created_at ? formatDate(user.created_at) : 'N/A'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Security Information */}
          <div className="bg-white rounded-xl shadow-md p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Security Status</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-green-800 font-medium">Authentication Active</span>
                </div>
                <span className="text-green-600 text-sm">Secure</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-blue-800 font-medium">JWT Token</span>
                </div>
                <span className="text-blue-600 text-sm">Valid</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-purple-800 font-medium">Session Management</span>
                </div>
                <span className="text-purple-600 text-sm">Active</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard; 