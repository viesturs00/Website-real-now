# EmailJS Setup Instructions

To enable the contact form to send emails directly from your website, follow these steps:

## 1. Create a Free EmailJS Account
1. Go to https://www.emailjs.com
2. Sign up for a free account (allows 200 emails/month)

## 2. Add Email Service
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose "Gmail" (or your preferred email provider)
4. Connect your Gmail account (atclipworks@gmail.com)
5. Copy the **Service ID**

## 3. Create Email Template
1. Go to "Email Templates"
2. Click "Create New Template"
3. Use this template:

**Subject:** Contact Form Submission from {{from_name}}

**Content:**
```
New message from your website contact form:

Name: {{from_name}}
Email: {{from_email}}

Message:
{{message}}
```

4. Set "To Email" to: atclipworks@gmail.com
5. Copy the **Template ID**

## 4. Get Your Public Key
1. Go to "Account" → "General"
2. Copy your **Public Key**

## 5. Update script.js
Replace these placeholders in `script.js`:
- `YOUR_PUBLIC_KEY` → Your EmailJS Public Key
- `YOUR_SERVICE_ID` → Your Email Service ID  
- `YOUR_TEMPLATE_ID` → Your Email Template ID

## Alternative: Use Formspree (Even Easier)

If you prefer, you can use Formspree instead:

1. Go to https://formspree.io
2. Sign up for free account
3. Create a new form
4. Copy your form endpoint (e.g., `https://formspree.io/f/YOUR_FORM_ID`)
5. Update the form action in `index.html`:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
6. Remove the JavaScript form handler (Formspree handles it automatically)

