// Your Client ID can be retrieved from your project in the Google
// Developer Console, https://console.developers.google.com
var CLIENT_ID = '483530694362-2e8fb2sgqndnsprm63nip0dnmk55dn41.apps.googleusercontent.com';

var SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];

/**
 * Check if current user has authorized this application.
 */
function checkAuth() {
  gapi.auth.authorize(
    {
      'client_id': CLIENT_ID,
      'scope': SCOPES.join(' '),
      'immediate': true
    }, handleAuthResult);
}

/**
 * Handle response from authorization server.
 *
 * @param {Object} authResult Authorization result.
 */
function handleAuthResult(authResult) {
  if (authResult && !authResult.error) {
    // Hide auth UI, then load client library.
    loadCalendarApi();
  }
}

/**
 * Initiate auth flow in response to user clicking authorize button.
 *
 * @param {Event} event Button click event.
 */
function handleAuthClick(event) {
  gapi.auth.authorize(
    {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
    handleAuthResult);
  return false;
}

/**
 * Load Google Calendar client library. List upcoming events
 * once client library is loaded.
 */
function loadCalendarApi() {
  gapi.client.load('calendar', 'v3', listUpcomingEvents);
}

/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */
function listUpcomingEvents() {
  var toReturn = [];
  var calendars = gapi.client.calendar.calendarList.list();
  var resultList;
  
  calendars.execute(function(resp1){
    resultList = resp1.items;
    var count = resultList.length;
    
      for (var i = 0; i < resultList.length; i++) {
      //console.log(resultList[i].description);
        var request = gapi.client.calendar.events.list({
          'calendarId': resultList[i].id,
          'timeMin': (new Date(currentYear,currentMonth,1)).toISOString(),
          'timeMax': (new Date(currentYear,currentMonth+1,0)).toISOString(),
          'showDeleted': false,
          'singleEvents': true,
          'orderBy': 'startTime'
        });

        request.execute(function(resp2) {
          var events = resp2.items;
          
          if (events.length > 0) {
            for (i = 0; i < events.length; i++) {
              var event = events[i];
              
              // GET THE DATA WE NEED
              var startTime = event.start.dateTime;
              if (!startTime) {
                startTime = event.start.date;
              }
              var endTime = event.end.dateTime;
              if (!endTime) {
                endTime = event.end.date;
              }
              
              var title = event.summary;
              var description = event.description;
              
              toReturn.push(new Event(startTime,endTime,title,description));
            }
          }
          count--;
          if (count == 0) {
            console.log(toReturn);
            return toReturn;
          }
        });
      }
  });

}