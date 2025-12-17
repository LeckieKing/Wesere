import React, { useState } from 'react';
import { Zap, Phone, Smartphone, AlertCircle } from 'lucide-react';

const LoginScreen = ({ onLogin, backend }) => {
  const [phone, setPhone] = useState('254712345678');
  const [pin, setPin] = useState('1234');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    const result = await backend.authenticate(phone, pin);
    setLoading(false);

    if (result.success) {
      onLogin(result.customer);
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-blue-600 p-4 rounded-full">
            <Zap className="w-12 h-12 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Smart Metering</h1>
        <p className="text-center text-gray-600 mb-8">Automated Token Loading System</p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
            <div className="flex items-center border-2 border-gray-300 rounded-lg px-3 py-2 focus-within:border-blue-500">
              <Phone className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="flex-1 outline-none"
                placeholder="254712345678"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">M-Pesa PIN</label>
            <div className="flex items-center border-2 border-gray-300 rounded-lg px-3 py-2 focus-within:border-blue-500">
              <Smartphone className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="flex-1 outline-none"
                placeholder="Enter PIN"
                maxLength={4}
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              {error}
            </div>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400"
          >
            {loading ? 'Authenticating...' : 'Login'}
          </button>

          <div className="bg-blue-50 p-4 rounded-lg mt-4">
            <p className="text-xs text-blue-800 font-semibold mb-2">Demo Credentials:</p>
            <p className="text-xs text-blue-700">Phone: 254712345678</p>
            <p className="text-xs text-blue-700">PIN: 1234</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;