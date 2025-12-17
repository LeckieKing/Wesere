import React, { useState, useEffect } from 'react';
import { Zap, Home, CreditCard, History, LogOut } from 'lucide-react';
import SmartMeteringBackend from './backend/SmartMeteringBackend';
import LoginScreen from './components/LoginScreen';
import Dashboard from './components/Dashboard';
import BuyTokens from './components/BuyTokens';
import TransactionHistory from './components/TransactionHistory';

// Initialize backend
const backend = new SmartMeteringBackend();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [meterData, setMeterData] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [analytics, setAnalytics] = useState(null);

  const handleLogin = (customer) => {
    setCurrentUser(customer);
    setIsLoggedIn(true);
    loadDashboardData(customer.id);
  };

  const loadDashboardData = async (customerId) => {
    const data = await backend.getCustomerData(customerId);
    setMeterData(data.meter);
    setTransactions(data.transactions);
    
    if (data.meter) {
      const analyticsData = await backend.getConsumptionAnalytics(data.meter.meterNumber);
      setAnalytics(analyticsData);
    }
  };

  const handlePurchaseComplete = () => {
    loadDashboardData(currentUser.id);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setMeterData(null);
    setTransactions([]);
    setAnalytics(null);
    setActiveTab('dashboard');
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} backend={backend} />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Smart Metering</h1>
              <p className="text-xs text-gray-600">Automated Token System</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
              <p className="font-semibold text-gray-800">{currentUser?.name}</p>
              <p className="text-sm text-gray-600">{currentUser?.phone}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-1">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: Home },
              { id: 'buy', label: 'Buy Tokens', icon: CreditCard },
              { id: 'history', label: 'History', icon: History }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 font-semibold transition-colors ${
                    activeTab === tab.id
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        {activeTab === 'dashboard' && <Dashboard meterData={meterData} analytics={analytics} />}
        {activeTab === 'buy' && (
          <BuyTokens 
            currentUser={currentUser} 
            backend={backend} 
            onPurchaseComplete={handlePurchaseComplete} 
          />
        )}
        {activeTab === 'history' && <TransactionHistory transactions={transactions} />}
      </div>
    </div>
  );
}

export default App;