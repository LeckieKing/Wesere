// Simulated Backend API for Smart Metering System
class SmartMeteringBackend {
  constructor() {
    this.customers = this.initializeCustomers();
    this.transactions = [];
    this.meters = this.initializeMeters();
  }

  initializeCustomers() {
    return [
      {
        id: 'CUST001',
        name: 'John Kamau',
        phone: '254712345678',
        email: 'john.kamau@email.com',
        meterNumber: 'MTR-2024-001234',
        accountBalance: 150.50,
        address: 'Kilimani, Nairobi',
        tariffRate: 23.5, // KES per kWh
        lastPurchase: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      }
    ];
  }

  initializeMeters() {
    return [
      {
        meterNumber: 'MTR-2024-001234',
        customerId: 'CUST001',
        status: 'online',
        currentUnits: 150.50,
        lastSync: new Date(),
        dailyConsumption: 12.5,
        monthlyConsumption: 320,
        firmware: 'v2.3.1',
        signalStrength: 85,
        tamperStatus: 'normal',
        installDate: new Date('2024-01-15')
      }
    ];
  }

  // Authenticate user
  async authenticate(phone, pin) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const customer = this.customers.find(c => c.phone === phone);
        if (customer && pin === '1234') {
          resolve({ success: true, customer });
        } else {
          resolve({ success: false, message: 'Invalid credentials' });
        }
      }, 800);
    });
  }

  // Generate STS token
  generateToken(meterNumber, amount) {
    const units = (amount / 23.5).toFixed(2);
    const timestamp = Date.now().toString().slice(-8);
    const meterHash = meterNumber.slice(-4);
    const token = `${meterHash}${timestamp}`.padEnd(20, Math.floor(Math.random() * 10));
    
    return {
      token: token.match(/.{1,5}/g).join('-'),
      units: parseFloat(units),
      amount: amount,
      expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    };
  }

  // Process M-Pesa payment
  async processMpesaPayment(phone, amount, meterNumber) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const tokenData = this.generateToken(meterNumber, amount);
        const transaction = {
          id: `TXN${Date.now()}`,
          phone,
          amount,
          meterNumber,
          token: tokenData.token,
          units: tokenData.units,
          timestamp: new Date(),
          status: 'completed',
          mpesaRef: `MPE${Math.random().toString(36).substr(2, 9).toUpperCase()}`
        };
        
        this.transactions.push(transaction);
        
        // Update meter balance
        const meter = this.meters.find(m => m.meterNumber === meterNumber);
        if (meter) {
          meter.currentUnits += tokenData.units;
          meter.lastSync = new Date();
        }

        // Update customer balance
        const customer = this.customers.find(c => c.meterNumber === meterNumber);
        if (customer) {
          customer.accountBalance += tokenData.units;
          customer.lastPurchase = new Date();
        }
        
        resolve({ success: true, transaction, tokenData });
      }, 2000);
    });
  }

  // Auto-load token to meter
  async autoLoadToken(meterNumber, token, units) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const meter = this.meters.find(m => m.meterNumber === meterNumber);
        if (meter && meter.status === 'online') {
          meter.currentUnits += units;
          meter.lastSync = new Date();
          resolve({ success: true, newBalance: meter.currentUnits });
        } else {
          resolve({ success: false, message: 'Meter offline - token sent via SMS' });
        }
      }, 1500);
    });
  }

  // Get customer data
  async getCustomerData(customerId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const customer = this.customers.find(c => c.id === customerId);
        const meter = this.meters.find(m => m.customerId === customerId);
        const customerTransactions = this.transactions.filter(t => 
          this.customers.find(c => c.id === customerId)?.meterNumber === t.meterNumber
        );
        
        resolve({ customer, meter, transactions: customerTransactions });
      }, 500);
    });
  }

  // Get consumption analytics
  async getConsumptionAnalytics(meterNumber) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const last7Days = Array.from({ length: 7 }, (_, i) => ({
          date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
          consumption: Math.random() * 20 + 5
        }));

        resolve({
          dailyAverage: 12.5,
          weeklyTotal: 87.5,
          monthlyTotal: 320,
          costThisMonth: 7520,
          trend: 'decreasing',
          chartData: last7Days
        });
      }, 500);
    });
  }
}

export default SmartMeteringBackend;