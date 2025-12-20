# Smart Metering System

An automated token loading system for smart electricity meters with M-Pesa integration.

## Features

- Secure authentication
-  M-Pesa payment integration
-  Automatic token loading (no manual entry)
-  Real-time consumption analytics
-  Responsive design
-  Transaction history

## Quick Start

### Prerequisites
- Node.js v16 or higher
- npm or yarn

### Installation

1. Clone or create the project:
```bash
mkdir smart-metering
cd smart-metering
```

2. Initialize React app:
```bash
npx create-react-app .
```

3. Install dependencies:
```bash
npm install lucide-react
```

4. Copy all source files to their respective folders

5. Start the development server:
```bash
npm start
```

6. Open http://localhost:3000 in your browser

## Demo Credentials

- **Phone:** 254712345678
- **PIN:** 1234

## Project Structure
smart-metering/
├── src/
│   ├── App.js                    # Main application
│   ├── index.js                  # Entry point
│   ├── backend/
│   │   └── SmartMeteringBackend.js  # Simulated backend API
│   └── components/
│       ├── LoginScreen.js        # Login component
│       ├── Dashboard.js          # Dashboard view
│       ├── BuyTokens.js          # Token purchase
│       └── TransactionHistory.js # Transaction list
└── public/
└── index.html                # HTML template
## Usage

1. **Login** - Use demo credentials
2. **View Dashboard** - Check meter status and consumption
3. **Buy Tokens** - Enter amount and purchase via M-Pesa
4. **Auto-Loading** - Tokens automatically load to meter
5. **View History** - See all transactions

## Technology Stack

- React 18
- Tailwind CSS
- Lucide React (icons)
- JavaScript ES6+

## License

MIT
🎯 Final Steps to Run
Step 5: Install Dependencies
bashnpm install
Step 6: Start Development Server
bashnpm start
The app will open at http://localhost:3000

🎨 VS Code Extensions (Recommended)
Install these for better development experience:

ES7+ React/Redux/React-Native snippets
Prettier - Code formatter
ESLint
Auto Rename Tag
Path Intellisense


📝 Quick Test Checklist
✅ Login with: 254712345678 / 1234
✅ View dashboard with meter stats
✅ Click "Buy Tokens" tab
✅ Enter amount (e.g., 500 KES)
✅ Click "Buy with M-Pesa"
✅ Watch automatic token loading
✅ Check transaction history
✅ View updated balance on dashboard

🔧 Troubleshooting
Port 3000 already in use?
bash# Kill process on port 3000
npx kill-port 3000
# Then run again
npm start
Module not found errors?
bash# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
Tailwind not working?

Make sure the CDN script is in public/index.html
Clear browser cache (Ctrl+Shift+R)


📦 Build for Production
bashnpm run build
Creates optimized build in /build folder ready for deployment.

🚀 Next Steps

Add real M-Pesa API integration (Daraja API)
Connect to actual backend server
Add SMS notifications
Implement user registration
Add admin dashboard
Deploy to hosting platform (Vercel, Netlify, etc.)


💡 Support
For issues or questions, refer to:

React docs: https://react.dev
Tailwind CSS: https://tailwindcss.com
Lucide icons: https://lucide.dev
🎯 Final Steps to Run
Step 5: Install Dependencies
bashnpm install
Step 6: Start Development Server
bashnpm start
The app will open at http://localhost:3000

🎨 VS Code Extensions (Recommended)
Install these for better development experience:

ES7+ React/Redux/React-Native snippets
Prettier - Code formatter
ESLint
Auto Rename Tag
Path Intellisense


📝 Quick Test Checklist
✅ Login with: 254712345678 / 1234
✅ View dashboard with meter stats
✅ Click "Buy Tokens" tab
✅ Enter amount (e.g., 500 KES)
✅ Click "Buy with M-Pesa"
✅ Watch automatic token loading
✅ Check transaction history
✅ View updated balance on dashboard

🔧 Troubleshooting
Port 3000 already in use?
bash# Kill process on port 3000
npx kill-port 3000
# Then run again
npm start
Module not found errors?
bash# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
Tailwind not working?

Make sure the CDN script is in public/index.html
Clear browser cache (Ctrl+Shift+R)


📦 Build for Production
bashnpm run build
Creates optimized build in /build folder ready for deployment.

🚀 Next Steps

Add real M-Pesa API integration (Daraja API)
Connect to actual backend server
Add SMS notifications
Implement user registration
Add admin dashboard
Deploy to hosting platform (Vercel, Netlify, etc.)


💡 Support
For issues or questions, refer to:

React docs: https://react.dev
Tailwind CSS: https://tailwindcss.com
Lucide icons: https://lucide.dev

