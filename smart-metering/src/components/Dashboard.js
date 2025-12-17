import React from 'react';
import { Zap, TrendingUp, Wifi, WifiOff } from 'lucide-react';

const Dashboard = ({ meterData, analytics }) => {
  if (!meterData) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="space-y-6">
      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <span className="text-blue-100">Current Balance</span>
            <Zap className="w-6 h-6" />
          </div>
          <div className="text-3xl font-bold">{meterData.currentUnits.toFixed(2)}</div>
          <div className="text-sm text-blue-100 mt-1">Units (kWh)</div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <span className="text-green-100">Meter Status</span>
            {meterData.status === 'online' ? <Wifi className="w-6 h-6" /> : <WifiOff className="w-6 h-6" />}
          </div>
          <div className="text-3xl font-bold capitalize">{meterData.status}</div>
          <div className="text-sm text-green-100 mt-1">Signal: {meterData.signalStrength}%</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <span className="text-purple-100">Daily Usage</span>
            <TrendingUp className="w-6 h-6" />
          </div>
          <div className="text-3xl font-bold">{meterData.dailyConsumption}</div>
          <div className="text-sm text-purple-100 mt-1">kWh/day average</div>
        </div>
      </div>

      {/* Meter Information */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Meter Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Meter Number</p>
            <p className="font-semibold text-gray-800">{meterData.meterNumber}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Firmware Version</p>
            <p className="font-semibold text-gray-800">{meterData.firmware}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Last Sync</p>
            <p className="font-semibold text-gray-800">{meterData.lastSync.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Tamper Status</p>
            <p className="font-semibold text-green-600 capitalize">{meterData.tamperStatus}</p>
          </div>
        </div>
      </div>

      {/* Consumption Chart */}
      {analytics && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Weekly Consumption</h3>
          <div className="h-48 flex items-end justify-between gap-2">
            {analytics.chartData.map((day, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center">
                <div className="w-full bg-blue-500 rounded-t-lg hover:bg-blue-600 transition-colors relative group" 
                     style={{ height: `${(day.consumption / 25) * 100}%` }}>
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {day.consumption.toFixed(1)} kWh
                  </div>
                </div>
                <div className="text-xs text-gray-600 mt-2">{day.date}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-blue-50 rounded-lg p-3">
              <p className="text-xs text-gray-600">Daily Avg</p>
              <p className="font-bold text-gray-800">{analytics.dailyAverage} kWh</p>
            </div>
            <div className="bg-green-50 rounded-lg p-3">
              <p className="text-xs text-gray-600">Weekly Total</p>
              <p className="font-bold text-gray-800">{analytics.weeklyTotal} kWh</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-3">
              <p className="text-xs text-gray-600">Monthly Total</p>
              <p className="font-bold text-gray-800">{analytics.monthlyTotal} kWh</p>
            </div>
            <div className="bg-orange-50 rounded-lg p-3">
              <p className="text-xs text-gray-600">Cost This Month</p>
              <p className="font-bold text-gray-800">KES {analytics.costThisMonth}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;