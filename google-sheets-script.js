// Google Apps Script for Contact Form Integration
// Copy this code to: https://script.google.com/

function doPost(e) {
  try {
    // Get the form data
    var data = JSON.parse(e.postData.contents);
    var name = data.from_name;
    var email = data.reply_to;
    var subject = data.subject;
    var message = data.message;
    var timestamp = new Date();
    
    // Get the active spreadsheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Append the data to the sheet
    sheet.appendRow([
      timestamp,
      name,
      email,
      subject,
      message
    ]);
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      "status": "success",
      "message": "Data saved to Google Sheets"
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      "status": "error",
      "message": error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Instructions to set up:
// 1. Go to https://script.google.com/
// 2. Create a new project
// 3. Paste this code
// 4. Create a Google Sheet with headers: Timestamp, Name, Email, Subject, Message
// 5. In the script editor, click "Resources" > "Libraries" and add the spreadsheet
// 6. Deploy as Web App:
//    - Execute as: Me
//    - Who has access: Anyone
// 7. Copy the Web App URL and use it in your JavaScript
