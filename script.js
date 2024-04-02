document.addEventListener("DOMContentLoaded", function () {
    const bill_input = document.getElementById('bill_input');
    const btn_discount = document.querySelectorAll('.btn_discount');
    const custom_tip = document.getElementById('custom_tip');
    const people_number = document.getElementById('people_number');
    const tipAmountElement = document.querySelector('.part_one .portion_two span');
    const totalAmountElement = document.querySelector('.part_two .portion_two span');
    const warningMessage = document.querySelector('.warning');
    const bill_container = document.getElementById('bill_input_container_id');
    const people_input_container = document.querySelector('.people_input_container')

    let lastClickedTipPercentage = 0;

    function calculateTip() {
        const billAmount = parseFloat(bill_input.value);
        const tipPercentage = custom_tip.value ? parseFloat(custom_tip.value) : lastClickedTipPercentage;
        const numberOfPeople = parseInt(people_number.value);

        if (billAmount && numberOfPeople && !isNaN(tipPercentage)) {
            const tipAmount = (billAmount * tipPercentage) / 100 / numberOfPeople;
            const totalAmount = (billAmount / numberOfPeople) + tipAmount;

            tipAmountElement.textContent = tipAmount.toFixed(2);
            totalAmountElement.textContent = totalAmount.toFixed(2);
        } else {
            tipAmountElement.textContent = "0.00";
            totalAmountElement.textContent = "0.00";
        }
    }

    function activateButton(button) {
        btn_discount.forEach(btn => {
            btn.classList.remove('btn_discount_active');
        });
        button.classList.add('btn_discount_active');
    }

    function resetCalculator() {
        bill_input.value = '';
        custom_tip.value = '';
        people_number.value = '';
        tipAmountElement.textContent = '0.00';
        totalAmountElement.textContent = '0.00';
        warningMessage.style.color = 'transparent';
        btn_discount.forEach(btn => {
            btn.classList.remove('btn_discount_active');
        });
    }

    function tip_deactive() {
        btn_discount.forEach(btn => {
            btn.classList.remove('btn_discount_active');
        });
    }

    function handleZeroInput() {
        const numberOfPeople = parseInt(people_number.value);
        if (numberOfPeople === 0) {
            warningMessage.style.color = 'red';
        } else {
            warningMessage.style.color = 'transparent';
        }
    }

    function handleFocus(event) {
        const element = event.target;
        const borderColor = event.type === 'focusin' ? 'hsl(172, 67%, 45%)' : 'white';

        if (element === bill_input) {
            bill_container.style.border = `1px solid ${borderColor}`;
        } else if (element === custom_tip) {
            custom_tip.style.border = `1px solid ${borderColor}`;
        } else if (element === people_number) {
            people_input_container.style.border = `1px solid ${borderColor}`;
        }
    }

    bill_input.addEventListener('focusin', handleFocus);
    bill_input.addEventListener('focusout', handleFocus);
    custom_tip.addEventListener('focusin', handleFocus);
    custom_tip.addEventListener('focusout', handleFocus);
    people_number.addEventListener('focusin', handleFocus);
    people_number.addEventListener('focusout', handleFocus);

    btn_discount.forEach(button => {
        button.addEventListener('click', function () {
            lastClickedTipPercentage = parseFloat(this.textContent);
            custom_tip.value = '';
            calculateTip();
            activateButton(this);
        });
    });

    custom_tip.addEventListener('input', function () {
        lastClickedTipPercentage = parseFloat(this.value);
        tip_deactive();
        calculateTip();
    });

    bill_input.addEventListener('input', calculateTip);
    people_number.addEventListener('input', function () {
        calculateTip();
        handleZeroInput();
    });

    const resetButton = document.getElementById('reset_btn');
    resetButton.addEventListener('click', resetCalculator);

    // Hide results initially
    tipAmountElement.textContent = "0.00";
    totalAmountElement.textContent = "0.00";
});
