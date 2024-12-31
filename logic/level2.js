document.addEventListener('DOMContentLoaded', () => {
    // Game constants
    const TOTAL_SAVINGS = 500;
    const MINIMUM_VALUES = {
        emergency: 200,    // Emergency fund minimum
        investment: 150,   // Investment minimum
        vacation: 50       // Vacation minimum
    };

    // Get DOM elements
    const sliders = ['emergency', 'investment', 'vacation'];
    const elements = {};
    
    sliders.forEach(id => {
        elements[id] = {
            slider: document.getElementById(id),
            value: document.getElementById(`${id}Value`)
        };
    });

    const remainingElement = document.getElementById('remaining');
    const messageElement = document.getElementById('message');
    const submitButton = document.getElementById('submit-savings');

    // Update requirements display
    function updateRequirements() {
        Object.entries(MINIMUM_VALUES).forEach(([category, minimum]) => {
            const value = parseInt(elements[category].slider.value);
            const reqElement = document.getElementById(`${category}-req`);
            const valueSpan = reqElement.querySelector('span');
            valueSpan.textContent = `$${value}`;
            
            if (value >= minimum) {
                reqElement.classList.remove('text-gray-400');
                reqElement.classList.add('text-green-400');
            } else {
                reqElement.classList.remove('text-green-400');
                reqElement.classList.add('text-gray-400');
            }
        });
    }

    // Update values and validate
    function updateValues() {
        let total = 0;
        sliders.forEach(id => {
            const value = parseInt(elements[id].slider.value);
            elements[id].value.textContent = value;
            total += value;
        });
        
        const remaining = TOTAL_SAVINGS - total;
        remainingElement.textContent = remaining;

        // Update UI feedback based on allocation
        if (remaining < 0) {
            remainingElement.style.color = '#ff0000';
            messageElement.textContent = 'Over your savings limit!';
            messageElement.style.color = '#ff0000';
        } else if (remaining > 0) {
            remainingElement.style.color = '#ffff00';
            messageElement.textContent = `$${remaining} left to save`;
            messageElement.style.color = '#ffff00';
        } else {
            remainingElement.style.color = '#00ff00';
            messageElement.textContent = 'Ready to submit your savings plan!';
            messageElement.style.color = '#00ff00';
        }

        // Check if any minimum requirements are not met
        for (const [category, minimum] of Object.entries(MINIMUM_VALUES)) {
            const value = parseInt(elements[category].slider.value);
            if (value < minimum) {
                messageElement.textContent = `${category} needs at least $${minimum}`;
                messageElement.style.color = '#ff0000';
                break;
            }
        }

        updateRequirements();
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

        if (total !== TOTAL_SAVINGS) {
            window.location.href = 'FS/fail2.html';
            return;
        }

        // Validate minimum requirements
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
