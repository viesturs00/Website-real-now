# Formspree Setup Instructions (EASIEST METHOD)

## Quick Setup (5 minutes)

1. **Go to https://formspree.io**
2. **Sign up for a free account** (allows 50 submissions/month on free plan)
3. **Create a new form:**
   - Click "New Form"
   - Name it "ClipWorks Contact Form"
   - Set the email to: **atclipworks@gmail.com**
4. **Copy your Form ID** (looks like: `xpwnqjqg` or similar)
5. **Update `index.html`:**
   - Find the line: `<form class="simple-contact-form" id="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">`
   - Replace `YOUR_FORM_ID` with your actual Form ID from Formspree
6. **Done!** The form will now send emails directly to atclipworks@gmail.com

## Example:
If your Form ID is `xpwnqjqg`, the form action should be:
```html
<form action="https://formspree.io/f/xpwnqjqg" method="POST">
```

## That's it!
No backend code needed. Formspree handles everything. Emails will be sent directly to atclipworks@gmail.com when someone submits the form.

