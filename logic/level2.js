document.addEventListener('DOMContentLoaded', () => {
    // Game constants
    const TOTAL_SAVINGS = 500;
    const MINIMUM_VALUES = {
        emergency: 200,
        investment: 150,
        vacation: 50
    };

    // Get DOM elements
    const sliders = ['emergency', 'investment', 'vacation'];
    const elements = {};
    
    sliders.forEach(id => {
        elements[id] = {
            slider: document.getElementById(id),
            value: document.getElementById(`${id}Value`),
            tooltip: document.getElementById(`${id}ValueTooltip`)
        };
    });

    const remainingElement = document.getElementById('remaining');
    const messageElement = document.getElementById('message');
    const submitButton = document.getElementById('submit-savings');

    function updateValues() {
        let total = 0;
        sliders.forEach(id => {
            const value = parseInt(elements[id].slider.value);
            elements[id].value.textContent = value;
            elements[id].tooltip.textContent = value;
            total += value;
        });
        
        const remaining = TOTAL_SAVINGS - total;
        remainingElement.textContent = remaining;

        // Update UI feedback
        if (remaining < 0) {
            remainingElement.style.color = '#ff0000';
            messageElement.textContent = 'Over your savings limit!';
            messageElement.style.color = '#ff0000';
        } else if (remaining > 0) {
            remainingElement.style.color = '#ffff00';
            messageElement.textContent = `$${remaining} more to save`;
            messageElement.style.color = '#ffff00';
        } else {
            remainingElement.style.color = '#00ff00';
            messageElement.textContent = 'Ready to submit!';
            messageElement.style.color = '#00ff00';
        }

        // Check minimum requirements
        for (const [category, minimum] of Object.entries(MINIMUM_VALUES)) {
            const value = parseInt(elements[category].slider.value);
            if (value < minimum) {
                messageElement.textContent = `${category} needs at least $${minimum}`;
                messageElement.style.color = '#ff0000';
                break;
            }
        }
    }

    // Add event listeners for real-time updates
    sliders.forEach(id => {
        elements[id].slider.addEventListener('input', updateValues);
    });

    // Handle savings submission
    submitButton.addEventListener('click', () => {
        const values = {};
        sliders.forEach(id => {
            values[id] = parseInt(elements[id].slider.value);
        });

        const total = Object.values(values).reduce((sum, val) => sum + val, 0);

        // Validate total savings
        if (total !== TOTAL_SAVINGS) {
            window.location.href = 'FS/fail2.html';
            return;
        }

        // Check minimum requirements
        for (const [category, minimum] of Object.entries(MINIMUM_VALUES)) {
            if (values[category] < minimum) {
                window.location.href = 'FS/fail2.html';
                return;
            }
        }

        // Success case
        window.location.href = 'FS/success2.html';
    });

    // Initialize on page load
    updateValues();
});