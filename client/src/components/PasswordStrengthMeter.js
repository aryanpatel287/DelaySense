import React from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const PasswordStrengthMeter = ({ password }) => {
  const getPasswordStrength = (password) => {
    let score = 0;
    const feedback = [];

    // Length check
    if (password.length >= 8) {
      score += 1;
      feedback.push({ type: 'success', text: 'At least 8 characters' });
    } else {
      feedback.push({ type: 'error', text: 'At least 8 characters' });
    }

    // Lowercase check
    if (/[a-z]/.test(password)) {
      score += 1;
      feedback.push({ type: 'success', text: 'Contains lowercase letter' });
    } else {
      feedback.push({ type: 'error', text: 'Contains lowercase letter' });
    }

    // Uppercase check
    if (/[A-Z]/.test(password)) {
      score += 1;
      feedback.push({ type: 'success', text: 'Contains uppercase letter' });
    } else {
      feedback.push({ type: 'error', text: 'Contains uppercase letter' });
    }

    // Number check
    if (/\d/.test(password)) {
      score += 1;
      feedback.push({ type: 'success', text: 'Contains number' });
    } else {
      feedback.push({ type: 'error', text: 'Contains number' });
    }

    // Special character check
    if (/[@$!%*?&]/.test(password)) {
      score += 1;
      feedback.push({ type: 'success', text: 'Contains special character' });
    } else {
      feedback.push({ type: 'error', text: 'Contains special character' });
    }

    return { score, feedback };
  };

  const getStrengthLabel = (score) => {
    if (score <= 1) return { label: 'Very Weak', color: 'bg-red-500' };
    if (score <= 2) return { label: 'Weak', color: 'bg-orange-500' };
    if (score <= 3) return { label: 'Fair', color: 'bg-yellow-500' };
    if (score <= 4) return { label: 'Good', color: 'bg-blue-500' };
    return { label: 'Strong', color: 'bg-green-500' };
  };

  const { score, feedback } = getPasswordStrength(password);
  const strengthInfo = getStrengthLabel(score);

  return (
    <div className="space-y-3">
      {/* Strength Bar */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Password Strength:</span>
          <span className={`text-sm font-semibold px-2 py-1 rounded-full ${
            strengthInfo.color === 'bg-red-500' ? 'bg-red-100 text-red-800' :
            strengthInfo.color === 'bg-orange-500' ? 'bg-orange-100 text-orange-800' :
            strengthInfo.color === 'bg-yellow-500' ? 'bg-yellow-100 text-yellow-800' :
            strengthInfo.color === 'bg-blue-500' ? 'bg-blue-100 text-blue-800' :
            'bg-green-100 text-green-800'
          }`}>
            {strengthInfo.label}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${strengthInfo.color}`}
            style={{ width: `${(score / 5) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Requirements List */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-700">Requirements:</p>
        <div className="space-y-1">
          {feedback.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              {item.type === 'success' ? (
                <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
              ) : (
                <XCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
              )}
              <span className={`text-sm ${
                item.type === 'success' ? 'text-green-700' : 'text-red-700'
              }`}>
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Security Tips */}
      {score < 5 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex items-start space-x-2">
            <AlertCircle className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-800">Security Tip</p>
              <p className="text-sm text-blue-700 mt-1">
                A strong password should meet all requirements above. This helps protect your account from unauthorized access.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PasswordStrengthMeter; 