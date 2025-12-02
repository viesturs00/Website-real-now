document.addEventListener('DOMContentLoaded', function() {
    // Use querySelector to get the form element specifically, not the section
    const form = document.querySelector('form#contact-form') || document.querySelector('.simple-contact-form');
    const popup = document.getElementById("thankyou-popup");
    const closeBtn = document.getElementById("close-popup");
    const formspreeUrl = "https://formspree.io/f/xdkqzdee";

    console.log('Contact form initialized:', { form: !!form, popup: !!popup, closeBtn: !!closeBtn });
    console.log('Form element type:', form ? form.tagName : 'not found');

    if (form && popup && closeBtn) {
        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            event.stopPropagation();

            const formData = new FormData();
            const nameInput = form.querySelector('[name="name"]');
            const emailInput = form.querySelector('[name="email"]');
            const messageInput = form.querySelector('[name="message"]');
            
            if (nameInput) formData.append('name', nameInput.value);
            if (emailInput) formData.append('email', emailInput.value);
            if (messageInput) formData.append('message', messageInput.value);

            // Show popup immediately - we'll send the form in the background
            form.reset();
            popup.classList.remove("hidden");
            console.log('Popup shown immediately');
            console.log('Popup element:', popup);
            console.log('Has hidden class?', popup.classList.contains('hidden'));

            // Auto-hide popup after 5 seconds with fade animation
            setTimeout(() => {
                popup.classList.add("fading");
                setTimeout(() => {
                    popup.classList.add("hidden");
                    popup.classList.remove("fading");
                }, 500); // Wait for fade animation to complete
            }, 5000);

            // Send form in background (don't wait for response)
            fetch(formspreeUrl, {
                method: "POST",
                body: formData,
                headers: {
                    Accept: "application/json",
                },
            }).catch(err => {
                console.error('Background form submission error:', err);
                // Popup already shown, so user sees success message
            });
        });

        // Function to fade out and hide popup
        const fadeOutPopup = () => {
            popup.classList.add("fading");
            setTimeout(() => {
                popup.classList.add("hidden");
                popup.classList.remove("fading");
            }, 500);
        };

        // Close popup on button click
        closeBtn.addEventListener("click", () => {
            fadeOutPopup();
        });

        // Close if user clicks outside
        popup.addEventListener("click", (e) => {
            if (e.target === popup) {
                fadeOutPopup();
            }
        });
    } else {
        console.error('Missing elements:', { form: !!form, popup: !!popup, closeBtn: !!closeBtn });
    }
});
