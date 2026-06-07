# Contact Form Setup Instructions

This portfolio includes a contact form that:
1. Sends messages to your mailbox
2. Sends an automated confirmation message to the sender
3. Saves all contacts to Google Sheets automatically

## Setup Steps

### 1. EmailJS Setup (for Email Sending)

1. **Sign up for EmailJS**
   - Go to https://www.emailjs.com/
   - Create a free account

2. **Create an Email Service**
   - Go to Email Services in the dashboard
   - Add your email service (Gmail, Outlook, etc.)
   - Follow the instructions to connect your email account

3. **Create an Email Template**
   - Go to Email Templates
   - Create a new template
   - Use these variables in your template:
     - `{{from_name}}` - Sender's name
     - `{{reply_to}}` - Sender's email
     - `{{subject}}` - Email subject
     - `{{message}}` - Email message

   **Template for sending to you:**
   ```
   Subject: {{subject}}
   From: {{from_name}} ({{reply_to}})
   
   Message:
   {{message}}
   ```

   **Template for auto-reply to sender:**
   ```
   Subject: Thank you for contacting Gowtham N
   
   Dear {{from_name}},
   
   Thank you for your message! I have received it and will get back to you soon.
   
   Best regards,
   Gowtham N
   ```

4. **Get Your Credentials**
   - Copy your PUBLIC_KEY from: https://dashboard.emailjs.com/admin/integration
   - Copy your SERVICE_ID from: https://dashboard.emailjs.com/admin/integration
   - Copy your TEMPLATE_ID from: https://dashboard.emailjs.com/admin/templates

5. **Update script.js**
   - Open `script.js`
   - Replace `YOUR_PUBLIC_KEY` with your actual public key
   - Replace `YOUR_SERVICE_ID` with your actual service ID
   - Replace `YOUR_TEMPLATE_ID` with your actual template ID
   - Uncomment the line: `emailjs.init("YOUR_PUBLIC_KEY");`

### 2. Google Sheets Setup (for Saving Contacts)

1. **Create a Google Sheet**
   - Go to https://sheets.google.com/
   - Create a new spreadsheet
   - Add these headers in the first row:
     - Timestamp
     - Name
     - Email
     - Subject
     - Message

2. **Create Google Apps Script**
   - In your Google Sheet, go to: Extensions > Apps Script
   - Delete any existing code
   - Copy the code from `google-sheets-script.js` file
   - Paste it into the Apps Script editor
   - Save the script (Ctrl+S or Cmd+S)

3. **Deploy as Web App**
   - Click on "Deploy" > "New deployment"
   - Select type: "Web app"
   - Description: "Contact Form Integration"
   - Execute as: "Me"
   - Who has access: "Anyone"
   - Click "Deploy"
   - Copy the Web App URL (it will look like: https://script.google.com/macros/s/.../exec)

4. **Update script.js**
   - Open `script.js`
   - Replace `YOUR_GOOGLE_SCRIPT_URL` with your actual Web App URL

### 3. Test the Contact Form

1. Open your portfolio in the browser
2. Go to the Contact section
3. Fill out the form with test data
4. Click "Send Message"
5. Check:
   - Your email inbox for the message
   - The sender's email inbox for the confirmation
   - Your Google Sheet for the new entry

## Troubleshooting

### EmailJS Issues
- Make sure you've uncommented the `emailjs.init()` line
- Check that your SERVICE_ID and TEMPLATE_ID are correct
- Verify your email service is properly connected in EmailJS

### Google Sheets Issues
- Make sure the Web App is deployed with "Anyone" access
- Verify the Web App URL is correct in script.js
- Check that your Google Sheet has the correct headers

### CORS Issues
- If you see CORS errors, make sure the Google Apps Script is deployed with "Anyone" access
- The script uses `mode: 'no-cors'` to handle CORS for Google Sheets

## Security Notes

- Never commit your actual API keys to public repositories
- The EmailJS public key is safe to use in client-side code
- Keep your Google Apps Script URL private if needed
- Consider adding CAPTCHA to prevent spam (EmailJS supports reCAPTCHA)

## Additional Features

You can enhance the contact form by:
- Adding form validation
- Implementing file upload support
- Adding CAPTCHA for spam protection
- Creating multiple email templates
- Adding email notifications for new submissions

## Support

For EmailJS support: https://www.emailjs.com/docs/
For Google Apps Script support: https://developers.google.com/apps-script
