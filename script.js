$(document).ready(function () {
  $(".input-number-group").each(function () {
    let $group = $(this);
    let x = 1;

    $group.find("[fs-number-input='up']").on('click', function () {
      $group.find("[fs-number-input='field']").val(++x);
    });

    $group.find("[fs-number-input='down']").on('click', function () {
      if (x > 0) {
        $group.find("[fs-number-input='field']").val(--x);
      }
    });

    $group.find("[fs-number-input='field']").change(function () {
      const num = Number($(this).val());
      if (num >= 0) {
        x = num;
      }
    });
  });

  // ==================
  // Update the items inside of the basket
  const quantityGroupClass = "input-number-group-basket"; // Replace with your actual group class
  const quantityIncrementButtonClass = "increment-btn"; // Replace with your actual increment button class
  const quantityDecrementButtonClass = "decrement-btn"; // Replace with your actual decrement button class
  const quantityNumberFieldClass = "order_qty"; // Replace with your actual input field class

  // Attach click event to document that then delegates to the '+' increase button
  $(document).on('click', `.${quantityIncrementButtonClass}`, function() {
  var $input = $(this).closest(`.${quantityGroupClass}`).find(`.${quantityNumberFieldClass}`);
  var val = parseInt($input.val(), 10);
  $input.val(val + 1);
  $input[0].dispatchEvent(new Event('change'));
  });

  // Attach click event to document that then delegates to the '-' decrease button
  $(document).on('click', `.${quantityDecrementButtonClass}`, function() {
  var $input = $(this).closest(`.${quantityGroupClass}`).find(`.${quantityNumberFieldClass}`);
  var val = parseInt($input.val(), 10);
  $input.val(Math.max(val - 1, 1)); // Ensures value never goes below 1
  $input[0].dispatchEvent(new Event('change'));
  });

});

// // Select all 'select' elements with the attribute 'fs-order="option"'
// var selectElements = document.querySelector('select[fs-order="option"]');

// // Iterate over each select element
// selectElements.forEach(function(selectElement) {
//     // Ensure the select element has at least one option
//     if (selectElement.options.length > 0) {
//         // Access the first 'option' element
//         var firstOption = selectElement.options[0];

//         // Update the properties of the first option
//         // firstOption.value = "newValue"; // Change 'newValue' to whatever value you want to set
//         firstOption.text = "Vælg tidspunkt"; // Change 'New Text' to whatever text you want to display
//     } else {
//         console.log('A select element with fs-order="option" has no options.');
//     }
// });

document.addEventListener('DOMContentLoaded', function () {
  // Step 1: Locate the <select> element with the attribute fs-order="day"
const selectElement = document.querySelector('select[fs-order="day"]');
if (!selectElement) return; // Ensure the select element exists

// Step 2: Find all elements with the attribute fs-order="append-target"
const targetElements = document.querySelectorAll('[fs-order="append-target"]');

// Function to update the button's class based on the select value
const updateButtonClass = (select, button) => {
    if (select && select.value) {
        button.classList.remove('disallowed');
    } else {
        button.classList.add('disallowed');
    }
};

// Step 3: Iterate over each target element and append a clone of the <select> element
targetElements.forEach(target => {
    // Clone the <select> element with all descendants
    const selectClone = selectElement.cloneNode(true);

    // Find the corresponding button in the original select's context
    const originalButton = selectElement.closest('.order_table_column-button-wrapper').querySelector('.button');
    
    // Check if the original select element has a selected value and update the button class accordingly
    updateButtonClass(selectElement, originalButton);

    // Attach the event listener to the cloned select element for change events
    selectClone.addEventListener('change', function(event) {
        // The button related to this cloned select needs to be found each time due to the clone being appended to different targets
        const relatedButton = event.target.closest('[fs-order="append-target"]').querySelector('.order_table_column-button-wrapper .button');
        updateButtonClass(event.target, relatedButton);
    });

    // Append the cloned <select> to the current target element
    target.appendChild(selectClone);
});


});
