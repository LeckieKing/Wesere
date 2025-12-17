import React from 'react';
import { History } from 'lucide-react';

const TransactionHistory = ({ transactions }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Transaction History</h3>
      
      {transactions.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <History className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>No transactions yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {transactions.map((txn) => (
            <div key={txn.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-semibold text-gray-800">{txn.units} kWh</p>
                  <p className="text-sm text-gray-600">{txn.timestamp.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-800">KES {txn.amount}</p>
                  <span className="inline-block bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
                    {txn.status}
                  </span>
                </div>
              </div>
              <div className="text-xs text-gray-500 font-mono bg-gray-50 p-2 rounded">
                Ref: {txn.mpesaRef}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;