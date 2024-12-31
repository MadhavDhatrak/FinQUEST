document.addEventListener('DOMContentLoaded', () => {
    // Budget constants
    const TOTAL_BUDGET = 1000;
    const MINIMUM_VALUES = {
        rent: 300,
        groceries: 200,
        transport: 100,
        savings: 100
    };

    // Get DOM elements
    const sliders = ['rent', 'groceries', 'transport', 'savings'];
    const elements = {};
    sliders.forEach(id => {
        elements[id] = {
            slider: document.getElementById(id),
            value: document.getElementById(`${id}Value`)
        };
    });

    const remainingElement = document.getElementById('remaining');
    const messageElement = document.getElementById('message');
    const submitButton = document.getElementById('submit-budget');

    // Update values and remaining budget
    function updateValues() {
        let total = 0;
        sliders.forEach(id => {
            const value = parseInt(elements[id].slider.value);
            elements[id].value.textContent = value;
            total += value;
        });
        
        const remaining = TOTAL_BUDGET - total;
        remainingElement.textContent = remaining;
        
        // Visual feedback
        if (remaining < 0) {
            remainingElement.style.color = '#ff0000';
            messageElement.textContent = 'Over budget!';
        } else if (remaining > 0) {
            remainingElement.style.color = '#ffff00';
            messageElement.textContent = `$${remaining} left to allocate`;
        } else {
            remainingElement.style.color = '#00ff00';
            messageElement.textContent = 'Budget allocated!';
        }
    }

    // Add event listeners
    sliders.forEach(id => {
        elements[id].slider.addEventListener('input', updateValues);
    });

    // Handle budget submission
    submitButton.addEventListener('click', () => {
        const values = {};
        sliders.forEach(id => {
            values[id] = parseInt(elements[id].slider.value);
        });

        const total = Object.values(values).reduce((sum, val) => sum + val, 0);

        // Check if total budget is correct
        if (total !== TOTAL_BUDGET) {
            window.location.href = 'FS/fail1.html';
            return;
        }

        // Check minimum requirements
        for (const [category, minimum] of Object.entries(MINIMUM_VALUES)) {
            if (values[category] < minimum) {
                window.location.href = 'FS/fail1.html';
                return;
            }
        }

        // Success case
        window.location.href = 'FS/success.html';
    });

    // Initialize values on page load
    updateValues();
});