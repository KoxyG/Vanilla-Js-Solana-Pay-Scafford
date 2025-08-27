# Solana Pay Demo

A simple HTML project that demonstrates Solana Pay integration for cryptocurrency payments.

## Features

- 🚀 **Simple Payment Interface**: Clean, modern UI for sending SOL payments
- 💳 **Wallet Integration**: Works with Phantom, Solflare, Backpack, and other Solana wallets
- 🔒 **Secure Transactions**: Uses Solana's native transaction system
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🎨 **Modern UI**: Beautiful gradient design with smooth animations
- ⚡ **Real-time Validation**: Input validation and transaction status updates

## Prerequisites

Before running this demo, you'll need:

1. **A Solana Wallet**: Install [Phantom](https://phantom.app/) or another Solana wallet
2. **Devnet SOL**: Get some devnet SOL for testing (real SOL for mainnet)
3. **Web Browser**: Any modern browser with JavaScript enabled

## Getting Started

### 1. Clone or Download

```bash
git clone <repository-url>
cd html-solana-pay
```

### 2. Open the Project

Simply open `index.html` in your web browser, or serve it using a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

### 3. Connect Your Wallet

1. Make sure you have a Solana wallet installed (Phantom recommended)
2. Open the demo in your browser
3. The app will automatically detect your wallet
4. Click "Connect" when prompted

### 4. Make a Payment

1. Enter the amount of SOL you want to send
2. Provide the recipient's Solana wallet address
3. Add an optional memo
4. Click "Pay with Solana"
5. Approve the transaction in your wallet

## Project Structure

```
html-solana-pay/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and responsive design
├── script.js           # JavaScript for Solana Pay integration
└── README.md           # This file
```

## How It Works

### Solana Pay Integration

The demo uses the official Solana Web3.js library to:

1. **Connect to Solana Network**: Uses devnet for testing
2. **Detect Wallets**: Automatically detects installed Solana wallets
3. **Create Transactions**: Builds payment transactions with optional memos
4. **Sign and Send**: Uses wallet to sign and broadcast transactions
5. **Confirm Transactions**: Waits for blockchain confirmation

### Key Components

- **Wallet Detection**: Automatically detects Phantom and other Solana wallets
- **Address Validation**: Validates Solana wallet addresses
- **Transaction Building**: Creates proper Solana transactions with system program transfers
- **Error Handling**: Comprehensive error handling and user feedback
- **Status Updates**: Real-time transaction status and feedback

## Configuration

### Network Selection

By default, the demo uses Solana's devnet. To switch to mainnet:

```javascript
// In script.js, change the connection URL:
this.connection = new solanaWeb3.Connection(
    'https://api.mainnet-beta.solana.com',  // Mainnet
    'confirmed'
);
```

### Custom RPC Endpoint

You can use a custom RPC endpoint for better performance:

```javascript
this.connection = new solanaWeb3.Connection(
    'https://your-rpc-endpoint.com',
    'confirmed'
);
```

## Supported Wallets

This demo works with any Solana wallet that implements the standard Solana wallet adapter interface:

- ✅ **Phantom** (recommended)
- ✅ **Solflare**
- ✅ **Backpack**
- ✅ **Slope**
- ✅ **Other compatible wallets**

## Development

### Adding Features

To extend this demo, you can:

1. **Add Token Support**: Implement SPL token transfers
2. **Multi-Signature**: Add support for multi-signature wallets
3. **Payment History**: Store and display transaction history
4. **QR Code Generation**: Generate Solana Pay QR codes
5. **Backend Integration**: Add server-side transaction processing

### Testing

For testing, use Solana's devnet:

1. Get devnet SOL from a faucet
2. Use devnet wallet addresses
3. Test with small amounts

## Troubleshooting

### Common Issues

1. **Wallet Not Detected**
   - Make sure Phantom or another Solana wallet is installed
   - Refresh the page after installing the wallet
   - Check browser console for errors

2. **Transaction Fails**
   - Ensure you have enough SOL for the payment + fees
   - Check that the recipient address is valid
   - Verify you're on the correct network (devnet/mainnet)

3. **Connection Issues**
   - Check your internet connection
   - Try refreshing the page
   - Use a different RPC endpoint if needed

### Debug Mode

Enable debug logging by opening browser console (F12) and checking for error messages.

## Security Notes

- This is a demo project for educational purposes
- Never use real private keys in client-side code
- Always validate inputs on both client and server side
- Use HTTPS in production environments
- Consider implementing additional security measures for production use

## Contributing

Feel free to submit issues, feature requests, or pull requests to improve this demo.

## License

This project is open source and available under the MIT License.

## Resources

- [Solana Documentation](https://docs.solana.com/)
- [Solana Pay Specification](https://github.com/solana-labs/solana-pay)
- [Phantom Wallet](https://phantom.app/)
- [Solana Web3.js](https://github.com/solana-labs/solana-web3.js)
# Vanilla-Js-Solana-Pay-Scafford
