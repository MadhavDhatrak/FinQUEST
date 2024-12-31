document.addEventListener('DOMContentLoaded', () => {
    // Game constants
    const TOTAL_BUDGET = 1000;
    const STOCK_PRICES = {
        stockA: { price: 100, return: 0.05 },
        stockB: { price: 200, return: 0.15 },
        stockC: { price: 300, return: 0.30 }
    };

    // Get DOM elements
    const stockInputs = {
        stockA: document.getElementById('stockA'),
        stockB: document.getElementById('stockB'),
        stockC: document.getElementById('stockC')
    };
    const totalElement = document.getElementById('total');
    const messageElement = document.getElementById('message');
    const investButton = document.getElementById('invest-button');

    function updateTotal() {
        let total = 0;
        for (const [stock, input] of Object.entries(stockInputs)) {
            total += (parseInt(input.value) || 0) * STOCK_PRICES[stock].price;
        }
        totalElement.textContent = total;
        
        // Update UI feedback
        if (total > TOTAL_BUDGET) {
            messageElement.textContent = 'Over budget!';
            messageElement.style.color = '#ff0000';
        } else if (total < 500) {
            messageElement.textContent = 'Invest at least $500';
            messageElement.style.color = '#ffff00';
        } else {
            messageElement.textContent = 'Ready to invest!';
            messageElement.style.color = '#00ff00';
        }
    }

    // Add input listeners
    Object.values(stockInputs).forEach(input => {
        input.addEventListener('input', updateTotal);
    });

    investButton.addEventListener('click', () => {
        let totalInvestment = 0;
        let totalReturn = 0;

        for (const [stock, input] of Object.entries(stockInputs)) {
            const shares = parseInt(input.value) || 0;
            const investment = shares * STOCK_PRICES[stock].price;
            totalInvestment += investment;
            totalReturn += investment * STOCK_PRICES[stock].return;
        }

        if (totalInvestment > TOTAL_BUDGET) {
            window.location.href = 'FS/fail3.html';
            return;
        }

        if (totalInvestment < 500) {
            window.location.href = 'FS/fail3.html';
            return;
        }

        sessionStorage.setItem('investment', totalInvestment);
        sessionStorage.setItem('return', totalReturn.toFixed(2));
        window.location.href = 'FS/success3.html';
    });

    updateTotal();
});