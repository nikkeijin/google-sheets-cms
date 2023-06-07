# Google Sheet as CMS

This is a project which I made to use Google Sheet as CMS.      
Yes, Google Sheet will be your Database so you can edit the data directly and the data will be rendered in your front-end application automatically!
        
You can even use this project to create a Google Sheet Data Filter System which would filter your data and show the result you filtered. And this is what I did here to show an example of. This example will have category and tag filter.


Note: In this exemple I am using Vue.js to fetch the Google Sheet API, but feel free to use whatever you feel confortable with, such as React.   
    
# How to use the example file

Create a Google Sheet with the following columns:   
1. title
2. content
3. thumbnail (add the img url to display in your post)
4. alt (add the alt of the img)
5. category
6. tag
                
Then fill each column data.
    
 After done so, open the app.js and add the URL of your Google Sheet JSON (see Outputting JSON with Google Sheet to get the URL of) into the endPoint const.
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

# Optional
                
> Preventing the automatic update of JSON data

To prevent the automatic update of JSON data is to use the Properties Service in Google Apps Script to store and retrieve the JSON data. The Properties Service allows you to store KEY-VALUE pairs persistently in the script properties.              

Note: The Google Spreadsheet with the code above will have a Custom Menu with 'Update JSON data' option. You may use to update the JSON data whenever you want!         

Here's an example of how you can implement this approach:               

```JavaScript
// Function to create the custom menu
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Custom Menu')
    .addItem('Update JSON Data', 'updateJSONData')
    .addToUi();
}

// Function to retrieve the cached JSON data from script properties
function getCachedJSONData() {
  var scriptProperties = PropertiesService.getScriptProperties();
  var cachedData = scriptProperties.getProperty('cachedJSONData');
  return cachedData ? JSON.parse(cachedData) : null;
}

// Function to store the JSON data into script properties for caching
function cacheJSONData(jsonData) {
  var scriptProperties = PropertiesService.getScriptProperties();
  scriptProperties.setProperty('cachedJSONData', JSON.stringify(jsonData));
}

// Function to manually update the JSON data by fetching from the spreadsheet
function updateJSONData() {
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

  cacheJSONData(jsonData);

  SpreadsheetApp.getUi().alert('JSON data updated successfully!');
}

// Function to handle HTTP GET requests and serve the JSON data
function doGet() {
  var cachedData = getCachedJSONData();

  if (cachedData === null) {
    // JSON data is not yet cached, fetch it from the spreadsheet
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

    cacheJSONData(jsonData);
    cachedData = jsonData;
  }

  return ContentService.createTextOutput(JSON.stringify(cachedData))
    .setMimeType(ContentService.MimeType.JSON);
}
```
