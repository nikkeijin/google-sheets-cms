# Outputting JSON with Google Sheet

1. Open your Google Sheet and go to "Extensions" > "Apps Script" to open the Apps Script editor.    
2. In the Apps Script editor, delete any existing code and replace it with the following code.    
3. Save the script and deploy it as a web app by going to "Publish" > "Deploy as web app".    
4. In the deployment dialog, select "Anyone, even anonymous" under "Who has access to the app".   
5. Choose the desired project version and click "Deploy".   
6. Once deployed, you will be provided with a URL for your web app. This URL will serve as the endpoint to access the JSON data from your Google Sheet.   

```JavaScript
function doGet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();
  
  var jsonData = [];
  var headers = data[0];
  
  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    var rowData = {};
    
    for (var j = 0; j < headers.length; j++) {
      rowData[headers[j]] = row[j];
    }
    
    jsonData.push(rowData);
  }
  
  return ContentService.createTextOutput(JSON.stringify(jsonData))
    .setMimeType(ContentService.MimeType.JSON);
}
```