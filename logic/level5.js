document.addEventListener('DOMContentLoaded', () => {
    const ANNUAL_INCOME = 100000;
    const TAX_BRACKETS = [
        { threshold: 0, rate: 0.10 },
        { threshold: 9950, rate: 0.12 },
        { threshold: 40525, rate: 0.22 },
        { threshold: 86375, rate: 0.24 },
        { threshold: 164925, rate: 0.32 },
        { threshold: 209425, rate: 0.35 },
        { threshold: 523600, rate: 0.37 }
    ];

    const elements = {
        retirement: document.getElementById('retirement'),
        health: document.getElementById('health'),
        mortgage: document.getElementById('mortgage'),
        retirementValue: document.getElementById('retirementValue'),
        healthValue: document.getElementById('healthValue'),
        mortgageValue: document.getElementById('mortgageValue'),
        taxableIncome: document.getElementById('taxableIncome'),
        taxRate: document.getElementById('taxRate'),
        message: document.getElementById('message'),
        submitButton: document.getElementById('submit-tax')
    };

    function calculateTax(income) {
        let tax = 0;
        let remainingIncome = income;

        for (let i = 0; i < TAX_BRACKETS.length; i++) {
            const currentBracket = TAX_BRACKETS[i];
            const nextBracket = TAX_BRACKETS[i + 1];
            const bracketIncome = nextBracket 
                ? Math.min(remainingIncome, nextBracket.threshold - currentBracket.threshold)
                : remainingIncome;

            if (bracketIncome <= 0) break;

            tax += bracketIncome * currentBracket.rate;
            remainingIncome -= bracketIncome;
        }

        return tax;
    }

    function updateValues() {
        const deductions = {
            retirement: parseInt(elements.retirement.value),
            health: parseInt(elements.health.value),
            mortgage: parseInt(elements.mortgage.value)
        };

        elements.retirementValue.textContent = deductions.retirement;
        elements.healthValue.textContent = deductions.health;
        elements.mortgageValue.textContent = deductions.mortgage;

        const totalDeductions = Object.values(deductions).reduce((sum, val) => sum + val, 0);
        const taxableIncome = ANNUAL_INCOME - totalDeductions;
        const tax = calculateTax(taxableIncome);
        const effectiveRate = (tax / ANNUAL_INCOME * 100).toFixed(1);

        elements.taxableIncome.textContent = taxableIncome;
        elements.taxRate.textContent = effectiveRate;

        if (effectiveRate < 15) {
            elements.message.textContent = 'Try to reduce your tax burden more!';
            elements.message.style.color = '#ffff00';
        } else if (deductions.retirement < 10000) {
            elements.message.textContent = 'Consider saving more for retirement!';
            elements.message.style.color = '#ffff00';
        } else {
            elements.message.textContent = 'Looking good!';
            elements.message.style.color = '#00ff00';
        }
    }

    // Add event listeners
    ['retirement', 'health', 'mortgage'].forEach(id => {
        elements[id].addEventListener('input', updateValues);
    });

    elements.submitButton.addEventListener('click', () => {
        const retirement = parseInt(elements.retirement.value);
        const effectiveRate = parseFloat(elements.taxRate.textContent);

        if (retirement < 10000 || effectiveRate > 20) {
            window.location.href = 'FS/fail5.html';
        } else {
            window.location.href = 'FS/success5.html';
        }
    });

    // Initialize
    updateValues();
});