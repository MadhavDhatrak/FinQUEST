document.addEventListener('DOMContentLoaded', () => {
    const MONTHLY_BUDGET = 2000;
    const MONTHLY_INCOME = 5000;
    
    const DEBTS = {
        creditCard: { balance: 5000, minPayment: 200, apr: 0.20 },
        studentLoan: { balance: 20000, minPayment: 150, apr: 0.05 },
        personalLoan: { balance: 10000, minPayment: 300, apr: 0.10 }
    };

    const elements = {
        creditCard: document.getElementById('creditCard'),
        studentLoan: document.getElementById('studentLoan'),
        personalLoan: document.getElementById('personalLoan'),
        creditCardValue: document.getElementById('creditCardValue'),
        studentLoanValue: document.getElementById('studentLoanValue'),
        personalLoanValue: document.getElementById('personalLoanValue'),
        remaining: document.getElementById('remaining'),
        dtiRatio: document.getElementById('dtiRatio'),
        message: document.getElementById('message'),
        submitButton: document.getElementById('submit-plan')
    };

    function calculateDTI(payments) {
        const totalPayments = Object.values(payments).reduce((sum, val) => sum + val, 0);
        return ((totalPayments / MONTHLY_INCOME) * 100).toFixed(1);
    }

    function updateValues() {
        const payments = {
            creditCard: parseInt(elements.creditCard.value),
            studentLoan: parseInt(elements.studentLoan.value),
            personalLoan: parseInt(elements.personalLoan.value)
        };

        elements.creditCardValue.textContent = payments.creditCard;
        elements.studentLoanValue.textContent = payments.studentLoan;
        elements.personalLoanValue.textContent = payments.personalLoan;

        const totalPayments = Object.values(payments).reduce((sum, val) => sum + val, 0);
        const remaining = MONTHLY_BUDGET - totalPayments;
        elements.remaining.textContent = remaining;

        const dti = calculateDTI(payments);
        elements.dtiRatio.textContent = dti;

        // Validation and feedback
        if (remaining < 0) {
            elements.message.textContent = 'Over budget!';
            elements.message.style.color = '#ff0000';
        } else if (dti > 30) {
            elements.message.textContent = 'DTI ratio too high!';
            elements.message.style.color = '#ff0000';
        } else if (payments.creditCard < DEBTS.creditCard.minPayment ||
                   payments.studentLoan < DEBTS.studentLoan.minPayment ||
                   payments.personalLoan < DEBTS.personalLoan.minPayment) {
            elements.message.textContent = 'Make minimum payments!';
            elements.message.style.color = '#ffff00';
        } else if (payments.creditCard < 500) {
            elements.message.textContent = 'Consider paying more on high-interest debt!';
            elements.message.style.color = '#ffff00';
        } else {
            elements.message.textContent = 'Good debt management!';
            elements.message.style.color = '#00ff00';
        }
    }

    // Add event listeners
    Object.keys(DEBTS).forEach(debt => {
        elements[debt].addEventListener('input', updateValues);
    });

    elements.submitButton.addEventListener('click', () => {
        const payments = {
            creditCard: parseInt(elements.creditCard.value),
            studentLoan: parseInt(elements.studentLoan.value),
            personalLoan: parseInt(elements.personalLoan.value)
        };

        const dti = calculateDTI(payments);
        const totalPayments = Object.values(payments).reduce((sum, val) => sum + val, 0);

        if (totalPayments > MONTHLY_BUDGET ||
            dti > 30 ||
            payments.creditCard < DEBTS.creditCard.minPayment ||
            payments.studentLoan < DEBTS.studentLoan.minPayment ||
            payments.personalLoan < DEBTS.personalLoan.minPayment ||
            payments.creditCard < 500) {
            window.location.href = 'FS/fail6.html';
        } else {
            window.location.href = 'FS/success6.html';
        }
    });

    updateValues();
});