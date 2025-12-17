import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';

const BuyTokens = ({ currentUser, backend, onPurchaseComplete }) => {
  const [amount, setAmount] = useState('');
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [autoLoading, setAutoLoading] = useState(false);

  const handlePurchase = async () => {
    if (!amount || parseFloat(amount) < 10) {
      alert('Minimum purchase is KES 10');
      return;
    }

    setProcessing(true);
    setResult(null);

    // Step 1: Process M-Pesa payment
    const paymentResult = await backend.processMpesaPayment(
      currentUser.phone,
      parseFloat(amount),
      currentUser.meterNumber
    );

    if (paymentResult.success) {
      setResult(paymentResult);
      setProcessing(false);
      setAutoLoading(true);

      // Step 2: Auto-load token to meter
      const loadResult = await backend.autoLoadToken(
        currentUser.meterNumber,
        paymentResult.tokenData.token,
        paymentResult.tokenData.units
      );

      setAutoLoading(false);

      if (loadResult.success) {
        onPurchaseComplete();
      }
    }
  };

  const units = amount ? (parseFloat(amount) / currentUser.tariffRate).toFixed(2) : '0.00';

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Purchase Tokens</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Amount (KES)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:border-blue-500 outline-none"
              placeholder="Enter amount"
              min="10"
            />
          </div>

          {amount && (
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700">You will receive:</span>
                <span className="text-2xl font-bold text-blue-600">{units} kWh</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Rate:</span>
                <span className="text-gray-800 font-semibold">KES {currentUser.tariffRate}/kWh</span>
              </div>
            </div>
          )}

          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-700 mb-2"><strong>Payment Method:</strong> M-Pesa ({currentUser.phone})</p>
            <p className="text-sm text-gray-700"><strong>Meter:</strong> {currentUser.meterNumber}</p>
          </div>

          <button
            onClick={handlePurchase}
            disabled={processing || autoLoading}
            className="w-full bg-green-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-green-700 transition-colors disabled:bg-gray-400"
          >
            {processing ? 'Processing Payment...' : autoLoading ? 'Loading Token to Meter...' : 'Buy with M-Pesa'}
          </button>
        </div>
      </div>

      {result && (
        <div className="bg-white rounded-xl shadow-md p-6 border-2 border-green-500">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
            <h3 className="text-lg font-bold text-gray-800">Purchase Successful!</h3>
          </div>

          <div className="space-y-3">
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Token (automatically loaded)</p>
              <p className="text-xl font-mono font-bold text-green-700">{result.tokenData.token}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-600">Units Purchased</p>
                <p className="font-bold text-gray-800">{result.tokenData.units} kWh</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-600">Amount Paid</p>
                <p className="font-bold text-gray-800">KES {result.transaction.amount}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-600">M-Pesa Ref</p>
                <p className="font-bold text-gray-800 text-sm">{result.transaction.mpesaRef}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-600">Status</p>
                <p className="font-bold text-green-600">Loaded ✓</p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>✓ Token automatically loaded to your meter!</strong><br/>
                Your new balance has been updated. No manual entry required.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyTokens;