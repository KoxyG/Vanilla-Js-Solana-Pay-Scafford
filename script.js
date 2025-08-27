// Solana Pay QR Code Generator with Payment Verification
class SolanaPayQRGenerator {
    constructor() {
        this.connection = null;
        this.paymentInterval = null;
        this.paymentConfirmed = false;
        this.transactionSignature = null;
        this.loading = false;
        this.init();
    }

    init() {
        // Initialize Solana connection (using devnet for demo)
        this.connection = new solanaWeb3.Connection(
            'https://api.devnet.solana.com',
            'confirmed'
        );
        
        this.setupEventListeners();
    }

    setupEventListeners() {
        const qrButton = document.getElementById('generateQR');
        qrButton.addEventListener('click', () => this.handlePayment());

        // Add input validation
        const amountInput = document.getElementById('amount');
        const recipientInput = document.getElementById('recipient');

        amountInput.addEventListener('input', () => this.validateInputs());
        recipientInput.addEventListener('input', () => this.validateInputs());
    }

    validateInputs() {
        const amount = parseFloat(document.getElementById('amount').value);
        const recipient = document.getElementById('recipient').value.trim();
        const qrButton = document.getElementById('generateQR');

        if (amount > 0 && recipient.length > 0 && this.isValidSolanaAddress(recipient)) {
            qrButton.disabled = false;
            this.showStatus('Ready to generate QR code!', 'info');
        } else {
            qrButton.disabled = true;
            this.showStatus('Please enter valid amount and recipient address', 'error');
        }
    }

    isValidSolanaAddress(address) {
        // Basic Solana address validation (32-44 characters, base58)
        return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address);
    }

    async handlePayment() {
        const amount = parseFloat(document.getElementById('amount').value);
        const recipient = document.getElementById('recipient').value.trim();
        const memo = document.getElementById('memo').value.trim();

        if (!this.isValidSolanaAddress(recipient)) {
            this.showStatus('Please enter a valid recipient address first', 'error');
            return;
        }

        this.setLoading(true);
        this.paymentConfirmed = false;
        this.transactionSignature = null;

        try {
            const recipientPubkey = new solanaWeb3.PublicKey(recipient);
            const amountBN = new BigNumber(amount);
            const reference = new solanaWeb3.Keypair().publicKey;
            const label = 'Solana Pay Demo';
            const message = memo || `Payment of ${amount} SOL`;

            console.log('Creating transaction details:', {
                recipient: recipientPubkey.toString(),
                amount: amountBN.toString(),
                reference: reference.toString(),
                label,
                message
            });

            // Manually create the Solana Pay URL (more reliable than external package)
            const params = new URLSearchParams();
            params.append('amount', amountBN.toString());
            if (memo && memo.trim() !== '') {
                params.append('memo', memo);
            }
            params.append('label', label);
            params.append('message', message);
            params.append('reference', reference.toString());
            
            const url = {
                href: `solana:${recipientPubkey.toString()}?${params.toString()}`
            };
            console.log('Generated URL:', url.href);

            // Generate QR code
            await this.generateQRCode(url.href);

            // Start payment verification
            await this.verifyPayment(recipientPubkey, amountBN, reference);

        } catch (error) {
            console.error('Payment error:', error);
            this.showStatus(`Payment failed: ${error.message}`, 'error');
            this.setLoading(false);
        }
    }

    async generateQRCode(url) {
        try {
            // Generate QR code using a reliable service
            const qrCodeImage = document.getElementById('qrCodeImage');
            
            if (!qrCodeImage) {
                this.showStatus('QR code container not found', 'error');
                return;
            }
            
            const qrServiceUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(url)}&format=png&margin=2`;
            
            // Create image element
            const img = document.createElement('img');
            img.src = qrServiceUrl;
            img.alt = 'QR Code';
            img.style.border = '1px solid #e2e8f0';
            img.style.borderRadius = '4px';
            img.style.maxWidth = '100%';
            img.style.height = 'auto';
            
            // Clear container and add image
            qrCodeImage.innerHTML = '';
            qrCodeImage.appendChild(img);

            // Show QR code container
            const qrContainer = document.getElementById('qrCode');
            if (qrContainer) {
                qrContainer.style.display = 'block';
            }
            
            // Display the URL
            const qrUrlElement = document.getElementById('qrUrl');
            if (qrUrlElement) {
                qrUrlElement.textContent = url;
            }

            this.showStatus('QR code generated! Scan with your mobile wallet', 'success');
        } catch (error) {
            console.error('Error generating QR code:', error);
            this.showStatus('Failed to generate QR code', 'error');
        }
    }

    async verifyPayment(recipient, amount, reference) {
        try {
            const interval = setInterval(async () => {
                try {
                    // Manually search for transactions with the reference
                    const signatures = await this.connection.getSignaturesForAddress(reference, { limit: 10 });
                    
                    if (signatures.length > 0) {
                        clearInterval(interval); // Stop polling

                        // Simple validation: check if transaction exists and is successful
                        try {
                            const transaction = await this.connection.getTransaction(signatures[0].signature, {
                                commitment: 'confirmed'
                            });
                            
                            if (transaction && transaction.meta && !transaction.meta.err) {
                                this.transactionSignature = signatures[0].signature;
                                this.paymentConfirmed = true;
                                this.setLoading(false);
                                this.showPaymentSuccess();
                            }
                        } catch (error) {
                            console.log("Transaction validation failed:", error);
                        }
                    }
                } catch (error) {
                    console.log("No valid transaction found yet, retrying...");
                }
            }, 5000); // Poll every 5 seconds
        } catch (err) {
            console.error("Error verifying payment:", err);
        }
    }

    showPaymentSuccess() {
        this.showStatus('✅ Payment confirmed!', 'success');
        
        // Add a success message to the QR code container
        const qrContainer = document.getElementById('qrCode');
        if (qrContainer) {
            const successDiv = document.createElement('div');
            successDiv.innerHTML = `
                <div style="background: #c6f6d5; color: #22543d; padding: 1rem; border-radius: 8px; margin-top: 1rem; border: 1px solid #9ae6b4;">
                    <h4 style="margin: 0 0 0.5rem 0;">🎉 Payment Confirmed!</h4>
                    <p style="margin: 0; font-size: 0.8rem;"><strong>Transaction Signature:</strong> ${this.transactionSignature}</p>
                </div>
            `;
            qrContainer.appendChild(successDiv);
        }
    }

    setLoading(loading) {
        this.loading = loading;
        const qrButton = document.getElementById('generateQR');
        
        if (loading) {
            qrButton.disabled = true;
            qrButton.innerHTML = `
                <svg style="width: 12px; height: 12px; margin-right: 6px; animation: spin 1s linear infinite;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
                Waiting...
            `;
        } else {
            qrButton.disabled = false;
            qrButton.innerHTML = '📱 Generate QR Code';
        }
    }

    showStatus(message, type = 'info') {
        const statusElement = document.getElementById('status');
        statusElement.textContent = message;
        statusElement.className = `status ${type}`;
        
        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                statusElement.textContent = '';
                statusElement.className = 'status';
            }, 5000);
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SolanaPayQRGenerator();
});
