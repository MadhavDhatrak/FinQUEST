document.addEventListener('DOMContentLoaded', () => {
    const MIN_DOWN_PAYMENT = 20;
    const MAX_DTI = 43;
    const MIN_ROI = 8;
    const MIN_PROPERTY_TYPES = 2;

    const elements = {
        downPayment: document.getElementById('downPayment'),
        income: document.getElementById('income'),
        residential: document.getElementById('residential'),
        commercial: document.getElementById('commercial'),
        rental: document.getElementById('rental'),
        reit: document.getElementById('reit'),
        downPaymentValue: document.getElementById('downPaymentValue'),
        incomeValue: document.getElementById('incomeValue'),
        roi: document.getElementById('roi'),
        dti: document.getElementById('dti'),
        message: document.getElementById('message'),
        submitButton: document.getElementById('submit-investment')
    };

    function calculateROI(downPayment, propertyTypes) {
        const baseROI = downPayment * 0.3;
        const diversificationBonus = (propertyTypes - 1) * 2;
        return (baseROI + diversificationBonus).toFixed(1);
    }

    function calculateDTI(income) {
        return ((income * 0.28) / income * 100).toFixed(1);
    }

    function getSelectedPropertyTypes() {
        return ['residential', 'commercial', 'rental', 'reit'].filter(
            type => elements[type].checked
        ).length;
    }

    function updateValues() {
        const values = {
            downPayment: parseInt(elements.downPayment.value),
            income: parseInt(elements.income.value)
        };

        elements.downPaymentValue.textContent = values.downPayment;
        elements.incomeValue.textContent = values.income;

        const propertyTypes = getSelectedPropertyTypes();
        const roi = calculateROI(values.downPayment, propertyTypes);
        const dti = calculateDTI(values.income);

        elements.roi.textContent = roi;
        elements.dti.textContent = dti;

        // Validation checks
        if (values.downPayment < MIN_DOWN_PAYMENT) {
            elements.message.textContent = 'Increase down payment to at least 20%';
            elements.message.style.color = '#ff0000';
            return;
        }

        if (dti > MAX_DTI) {
            elements.message.textContent = 'DTI ratio too high';
            elements.message.style.color = '#ff0000';
            return;
        }

        if (propertyTypes < MIN_PROPERTY_TYPES) {
            elements.message.textContent = 'Diversify with at least 2 property types';
            elements.message.style.color = '#ffff00';
            return;
        }

        if (roi < MIN_ROI) {
            elements.message.textContent = 'Aim for higher ROI';
            elements.message.style.color = '#ffff00';
            return;
        }

        elements.message.textContent = 'Portfolio looking good!';
        elements.message.style.color = '#00ff00';
    }

    // Add event listeners
    elements.downPayment.addEventListener('input', updateValues);
    elements.income.addEventListener('input', updateValues);
    ['residential', 'commercial', 'rental', 'reit'].forEach(type => {
        elements[type].addEventListener('change', updateValues);
    });

    elements.submitButton.addEventListener('click', () => {
        const downPayment = parseInt(elements.downPayment.value);
        const propertyTypes = getSelectedPropertyTypes();
        const dti = parseFloat(elements.dti.textContent);
        const roi = parseFloat(elements.roi.textContent);

        if (downPayment < MIN_DOWN_PAYMENT || 
            dti > MAX_DTI || 
            propertyTypes < MIN_PROPERTY_TYPES || 
            roi < MIN_ROI) {
            window.location.href = 'FS/fail8.html';
            return;
        }

        window.location.href = 'FS/success8.html';
    });

    // Initialize
    updateValues();
});