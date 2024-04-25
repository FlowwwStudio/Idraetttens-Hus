// Function to capture and store URL in session storage
function captureURL() {
  const currentPageURL = window.location.href; // Capture current page URL
  let urls = JSON.parse(sessionStorage.getItem("referrerURLs") || "[]"); // Retrieve stored URLs and parse to array
  if (!urls.includes(currentPageURL)) {
    // Check for duplicate URLs and ignore them
    urls.push(currentPageURL); // Add current page URL to array
    sessionStorage.setItem("referrerURLs", JSON.stringify(urls)); // Store updated array back in session storage as a string
  }
}

// Attach captureURL function to each cart-button
document.querySelectorAll("[fs-checkout='cart-button']").forEach((button) => {
  button.addEventListener("click", captureURL);
});

// Function to retrieve stored URLs and append them to the textarea
function appendURLsToTextarea() {
  const storedURLs = JSON.parse(sessionStorage.getItem("referrerURLs")); // Retrieve stored URLs and parse to array
  if (storedURLs && storedURLs.length > 0) {
    const textarea = document.querySelector("[fs-checkout='target']"); // Query the textarea element
    if (textarea) {
      const currentText = textarea.value.trim(); // Get current text, trimming any leading/trailing whitespace
      const separator = currentText ? "\n\n---\nReferral URLs:\n" : ""; // Determine separator based on current text
      textarea.value = currentText + separator + storedURLs.join("\n"); // Append URLs with separator if needed
    }
  }
}

// Attach appendURLsToTextarea to the checkout-button click event
const checkoutButton = document.querySelector("[fs-checkout='trigger']");
if (checkoutButton) {
  checkoutButton.addEventListener("click", appendURLsToTextarea);
}

// Check for successful redirect to order confirmation page on DOMContentLoaded
document.addEventListener("DOMContentLoaded", function () {
  if (window.location.href.includes("www.idraettenhus.dk/order-confirmation")) {
    sessionStorage.clear(); // Clear session storage on successful redirect
  }
});
