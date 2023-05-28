# Google Sheet as CMS

This is a project which I made to use Google Sheet as CMS.    
You can even use this project to create a Google Sheet Management System which would filter your data. And this is what I did to show an example of.


Note: In this exemple I am using Vue.js to fetch the Google Sheet API, but feel free to use whatever you feel confortable with, such as React.   
    
# How to use the example file

Create a Google Sheet with the following columns:   
1. title
2. content
3. alt
4. category
5. tag

    
 After done so, open the app.js and add the URL of your Google Sheet JSON to the endPoint const.
 ```JavaScript
 const endPoint = 'THE_URL_OF_YOUR_GOOGLE_SHEETS_JSON';
  ```
    
Now you should see your data being fetched by Vue.js on your front-end!
    
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
