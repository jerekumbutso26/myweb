/* ==========================================================================
   ICT251 Activity 3 - Interactive Portfolio JavaScript
   Author: Kumbutso Jere
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    initContactFormValidation();
    initThemeSwitch();
    initExpandableContent();
    initProjectSearch();
});

/**
 * 1. COMPULSORY FEATURE: Contact Form Validation & Local Preview Summary
 * Validates Name, Email, and Message. Displays a summary on page without reload.
 */
function initContactFormValidation() {
    const form = document.getElementById("contact-form");
    const nameInput = document.getElementById("user-name");
    const emailInput = document.getElementById("user-email");
    const messageInput = document.getElementById("user-message");

    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const messageError = document.getElementById("message-error");
    const previewBox = document.getElementById("form-preview");

    if (!form) return;

    form.addEventListener("submit", (event) => {
        // Prevent form from sending HTTP request / reloading page
        event.preventDefault();

        // Clear existing errors & summary view
        nameError.textContent = "";
        emailError.textContent = "";
        messageError.textContent = "";
        previewBox.textContent = "";
        previewBox.classList.add("hidden");

        let isValid = true;

        // Validate Name (reject blank or spaces-only)
        const nameValue = nameInput.value.trim();
        if (nameValue === "") {
            nameError.textContent = "Full name is required (cannot be empty or spaces only).";
            isValid = false;
        }

        // Validate Email (standard pattern regex check)
        const emailValue = emailInput.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailValue === "") {
            emailError.textContent = "Email address is required.";
            isValid = false;
        } else if (!emailPattern.test(emailValue)) {
            emailError.textContent = "Please enter a valid email format (e.g. user@example.com).";
            isValid = false;
        }

        // Validate Message (reject blank or spaces-only)
        const messageValue = messageInput.value.trim();
        if (messageValue === "") {
            messageError.textContent = "Message body is required (cannot be empty or spaces only).";
            isValid = false;
        }

        // If form inputs are completely valid, display local summary preview using textContent
        if (isValid) {
            const summaryTitle = document.createElement("h3");
            summaryTitle.textContent = "Form Data Local Validation Summary";

            const summaryNotice = document.createElement("p");
            summaryNotice.style.fontWeight = "bold";
            summaryNotice.textContent = "Your data was validated locally on this page (Browser demonstration only — no message was sent).";

            const nameDisplay = document.createElement("p");
            nameDisplay.textContent = `Submitted Name: ${nameValue}`;

            const emailDisplay = document.createElement("p");
            emailDisplay.textContent = `Submitted Email: ${emailValue}`;

            const messageDisplay = document.createElement("p");
            messageDisplay.textContent = `Submitted Message: ${messageValue}`;

            // Append dynamic elements safely
            previewBox.appendChild(summaryTitle);
            previewBox.appendChild(summaryNotice);
            previewBox.appendChild(nameDisplay);
            previewBox.appendChild(emailDisplay);
            previewBox.appendChild(messageDisplay);

            // Display preview
            previewBox.classList.remove("hidden");

            // Clear input fields
            form.reset();
        }
    });
}

/**
 * 2. CHOSEN FEATURE 1: Theme Switch (Light / Dark Mode)
 * Toggles dark mode styling on document body and updates button text state.
 */
function initThemeSwitch() {
    const themeBtn = document.getElementById("theme-toggle-btn");
    if (!themeBtn) return;

    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            themeBtn.textContent = "Switch to Light Theme";
        } else {
            themeBtn.textContent = "Switch to Dark Theme";
        }
    });
}

/**
 * 3. CHOSEN FEATURE 2: Expandable Content
 * Shows or hides hidden project detail sections on demand.
 */
function initExpandableContent() {
    const detailButtons = document.querySelectorAll(".toggle-details-btn");

    detailButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const parentCard = btn.closest(".project-card");
            const detailsDiv = parentCard.querySelector(".project-details");

            if (detailsDiv) {
                const isHidden = detailsDiv.classList.contains("hidden");

                if (isHidden) {
                    detailsDiv.classList.remove("hidden");
                    btn.textContent = "Hide Details";
                } else {
                    detailsDiv.classList.add("hidden");
                    btn.textContent = "Show Details";
                }
            }
        });
    });
}

/**
 * 4. CHOSEN FEATURE 3: Project Search / Filter
 * Filters project cards based on user input text with empty state messaging and reset capability.
 */
function initProjectSearch() {
    const searchInput = document.getElementById("project-search-input");
    const resetBtn = document.getElementById("reset-search-btn");
    const projectCards = document.querySelectorAll(".project-card");
    const noResultsMsg = document.getElementById("no-search-results");

    if (!searchInput || !resetBtn) return;

    function executeFilter() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        let matchCount = 0;

        projectCards.forEach((card) => {
            const textContent = card.textContent.toLowerCase();

            if (textContent.includes(searchTerm)) {
                card.style.display = "block";
                matchCount++;
            } else {
                card.style.display = "none";
            }
        });

        if (matchCount === 0) {
            noResultsMsg.classList.remove("hidden");
        } else {
            noResultsMsg.classList.add("hidden");
        }
    }

    searchInput.addEventListener("input", executeFilter);

    resetBtn.addEventListener("click", () => {
        searchInput.value = "";
        executeFilter();
    });
}