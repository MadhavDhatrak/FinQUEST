document.addEventListener('DOMContentLoaded', () => {
    const MIN_CONTRIBUTION = 10; // Minimum 10% contribution
    const IDEAL_STOCK_RANGE = { min: 60, max: 80 }; // Ideal stock allocation range
    
    const elements = {
        contribution: document.getElementById('contribution'),
        stocks: document.getElementById('stocks'),
        bonds: document.getElementById('bonds'),
        contributionValue: document.getElementById('contributionValue'),
        stocksValue: document.getElementById('stocksValue'),
        bondsValue: document.getElementById('bondsValue'),
        expectedReturn: document.getElementById('expectedReturn'),
        riskLevel: document.getElementById('riskLevel'),
        message: document.getElementById('message'),
        submitButton: document.getElementById('submit-plan')
    };

    function calculateExpectedReturn(stocks, bonds) {
        const stockReturn = stocks * 0.10; // 10% expected return from stocks
        const bondReturn = bonds * 0.04; // 4% expected return from bonds
        return ((stockReturn + bondReturn) / 100).toFixed(1);
    }

    function evaluateRiskLevel(stocks) {
        if (stocks < 40) return 'Too Conservative';
        if (stocks > 85) return 'Too Aggressive';
        return 'Balanced';
    }

    function updateValues() {
        const values = {
            contribution: parseInt(elements.contribution.value),
            stocks: parseInt(elements.stocks.value),
            bonds: parseInt(elements.bonds.value)
        };

        // Update display values
        elements.contributionValue.textContent = values.contribution;
        elements.stocksValue.textContent = values.stocks;
        elements.bondsValue.textContent = values.bonds;

        // Calculate expected return
        const expectedReturn = calculateExpectedReturn(values.stocks, values.bonds);
        elements.expectedReturn.textContent = expectedReturn;

        // Evaluate risk level
        const riskLevel = evaluateRiskLevel(values.stocks);
        elements.riskLevel.textContent = riskLevel;

        // Validate allocation total
        if (values.stocks + values.bonds !== 100) {
            elements.message.textContent = 'Total allocation must be 100%';
            elements.message.style.color = '#ff0000';
            return;
        }

        // Validate contribution
        if (values.contribution < MIN_CONTRIBUTION) {
            elements.message.textContent = 'Increase your contribution rate';
            elements.message.style.color = '#ffff00';
            return;
        }

        // Check stock allocation range
        if (values.stocks < IDEAL_STOCK_RANGE.min || values.stocks > IDEAL_STOCK_RANGE.max) {
            elements.message.textContent = 'Adjust stock allocation to 60-80%';
            elements.message.style.color = '#ffff00';
            return;
        }

        elements.message.textContent = 'Looking good!';
        elements.message.style.color = '#00ff00';
    }

    // Add event listeners
    elements.contribution.addEventListener('input', updateValues);
    elements.stocks.addEventListener('input', updateValues);
    elements.bonds.addEventListener('input', updateValues);

    elements.submitButton.addEventListener('click', () => {
        const values = {
            contribution: parseInt(elements.contribution.value),
            stocks: parseInt(elements.stocks.value),
            bonds: parseInt(elements.bonds.value)
        };

        if (values.contribution < MIN_CONTRIBUTION || 
            values.stocks + values.bonds !== 100 ||
            values.stocks < IDEAL_STOCK_RANGE.min || 
            values.stocks > IDEAL_STOCK_RANGE.max) {
            window.location.href = 'FS/fail7.html';
            return;
        }

        window.location.href = 'FS/success7.html';
    });

    // Initialize
    updateValues();
});