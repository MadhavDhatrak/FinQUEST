document.addEventListener('DOMContentLoaded', () => {
    // Game constants
    const TOTAL_BUDGET = 1000;
    const MIN_INVESTMENT = 500;
    const MIN_STOCKS = 3;
    const PENALTY_RATE = 0.10;
    
    const STOCK_PRICES = {
        stockA: { price: 100, return: 0.05 },
        stockB: { price: 200, return: 0.15 },
        stockC: { price: 300, return: 0.30 },
        stockD: { price: 400, return: 0.40 },
        stockE: { price: 500, return: 0.50 },
        stockF: { price: 600, return: 0.60 }
    };

    // Get DOM elements
    const stockInputs = {};
    Object.keys(STOCK_PRICES).forEach(stock => {
        stockInputs[stock] = document.getElementById(stock);
    });
    const totalElement = document.getElementById('total');
    const messageElement = document.getElementById('message');
    const investButton = document.getElementById('invest-button');

    function calculateInvestment() {
        let total = 0;
        let stockCount = 0;

        Object.entries(stockInputs).forEach(([stock, input]) => {
            const shares = parseInt(input.value) || 0;
            if (shares > 0) stockCount++;
            total += shares * STOCK_PRICES[stock].price;
        });

        // Apply penalty if over budget
        const penalty = total > TOTAL_BUDGET ? total * PENALTY_RATE : 0;
        const finalTotal = total - penalty;

        return { total, finalTotal, stockCount, penalty };
    }

    function updateUI() {
        const { total, finalTotal, stockCount, penalty } = calculateInvestment();
        totalElement.textContent = finalTotal.toFixed(2);

        // Update message based on conditions
        if (total > TOTAL_BUDGET) {
            messageElement.textContent = `Over budget! Penalty: $${penalty.toFixed(2)}`;
            messageElement.style.color = '#ff0000';
        } else if (finalTotal < MIN_INVESTMENT) {
            messageElement.textContent = `Minimum investment: $${MIN_INVESTMENT}`;
            messageElement.style.color = '#ffff00';
        } else if (stockCount < MIN_STOCKS) {
            messageElement.textContent = `Invest in at least ${MIN_STOCKS} stocks`;
            messageElement.style.color = '#ffff00';
        } else {
            messageElement.textContent = 'Ready to invest!';
            messageElement.style.color = '#00ff00';
        }
    }

    // Add input listeners
    Object.values(stockInputs).forEach(input => {
        input.addEventListener('input', updateUI);
    });

    investButton.addEventListener('click', () => {
        const { finalTotal, stockCount } = calculateInvestment();

        if (finalTotal < MIN_INVESTMENT || stockCount < MIN_STOCKS) {
            window.location.href = 'FS/fail4.html';
            return;
        }

        // Calculate returns
        let totalReturn = 0;
        Object.entries(stockInputs).forEach(([stock, input]) => {
            const shares = parseInt(input.value) || 0;
            const investment = shares * STOCK_PRICES[stock].price;
            totalReturn += investment * STOCK_PRICES[stock].return;
        });

        sessionStorage.setItem('investment', finalTotal.toFixed(2));
        sessionStorage.setItem('return', totalReturn.toFixed(2));
        window.location.href = 'FS/success4.html';
    });

    updateUI();
});