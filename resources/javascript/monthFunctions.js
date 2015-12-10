// ----------------------------------------------------------------------------------------------------------------------//
// -------------------------------------------------- MONTH FUNCTIONS -------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------------------------//

// Dynamic data ---------------------------- o

var today = new Date();
var currentMonth = today.getMonth();
var currentYear = today.getFullYear();

var selectedDay;
var currentData;

var googleArray = [];

// Static data ---------------------------- o

var calendarDays = 35;
var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

// Functions ---------------------------- o

function Event(start,end,name,desc) {
  this.startTime = start;
  this.endTime = end;
  this.title = name;
  this.description = desc;
}

function Day(inDate,val) {
  this.date = inDate;
  this.events = [];
}

function sameDay(d1,d2) {
  return (d1.getFullYear() == d2.getFullYear() && d1.getMonth() == d2.getMonth() && d1.getDate() == d2.getDate());
}

function generateMonth(year,month) {
  var dayArray = [];
  var firstDay = new Date(year,month,1);

  for (var i = 0; i < calendarDays; i++) {
    dayArray[i] = new Day(new Date(firstDay.getFullYear(),firstDay.getMonth(),(i+1)-firstDay.getDay()));
  }

  return dayArray;
}

function importGoogle(data) {
    //if (googleArray == []) {return;}
    for (var i = 0; i < googleArray.length; i++) {
      googleArray[i].startTime = (new Date(googleArray[i].startTime));
      googleArray[i].endTime = (new Date(googleArray[i].endTime));
    }

    for (var i = 0; i < data.length; i++) {
      for (var j = 0; j < googleArray.length; j++) {
        if (sameDay(data[i].date,googleArray[j].startTime)) {
          data[i].events.push(googleArray[j]);
        }
      }
    }
}

function loadMonth(year,month) {
  var data = generateMonth(year,month);
  $("#header h2").html(months[currentMonth] + " " + currentYear);

  importGoogle(data);
  // importFaceBook(data);
  // importPHP(data);

  // POPULATE CALENDAR CELLS
  string = "";
  for (var i = 0; i < 5; i++) {
    for (var j = 0; j < 7; j++) {
      string += "<div info='' class='container two columns'></div>";
    }
    string += "<br>";
  }
  $(".days").html(string);

  var i = 0;
  $(".days div").each(function() {

    // Day number
    if (data[i].events.length > 0) {
      $(this).html("<p class='dayNum'>"+String(data[i].date.getDate())+"</p><br>"+"<p class='eventNum'>"+"("+String(data[i].events.length)+")"+"</p>");
    }
    else {
      $(this).html("<p class='dayNum'>"+String(data[i].date.getDate())+"</p><br>"+"<p class='eventNum'></p>");
    }

    // Color coding
    if (sameDay(data[i].date,today)) {
      $(this).addClass("todayColor");
      if (selectedDay == null) {
        $(this).addClass("selected");
        selectedDay = data[i];
      }
    }
    else if (data[i].date.getMonth() == currentMonth) {
      $(this).addClass("monthColor");
    }
    else {
      $(this).addClass("offColor");
    }

    if (selectedDay != null && sameDay(selectedDay.date,data[i].date)) {
      $(this).addClass("selected");
    }

    // Set info attribute
    $(this).attr("info",(data[i].date).toString());

    // Set click function
    $(this).click(function() {
      $(".days div").each(function() {
        $(this).removeClass("selected");
      });

      for (var i = 0; i < currentData.length; i++) {
        if ($(this).attr("info") == currentData[i].date.toString()) {
          selectedDay = currentData[i];
          console.log(selectedDay.events);
        }
      }

      $(this).addClass("selected");

      // POPULATE TO-DO LIST
      $("#date").html("<h3 id='date'>"+selectedDay.date.toDateString()+"</h3>");
      var string = "";
      for (var i = 0; i < selectedDay.events.length; i++) {
        string += "<li class='title'>";
        if (selectedDay.events[i].title) {
          string += selectedDay.events[i].title;
          string += "</li><li class='no_title'>";
        }
        if (selectedDay.events[i].startTime) {
          string += selectedDay.events[i].startTime.getHours();
          string += ":";
          string += selectedDay.events[i].startTime.getMinutes();
          if(selectedDay.events[i].startTime.getMinutes() == '0'){
            string += "0";
          }
        }
        if (selectedDay.events[i].endTime) {
          string += " - ";
          string += selectedDay.events[i].endTime.getHours();
          string += ":";
          string += selectedDay.events[i].endTime.getMinutes();
          if(selectedDay.events[i].endTime.getMinutes() == '0'){
            string += "0";
          }
        }
        if (selectedDay.events[i].description) {string += selectedDay.events[i].description;}
        string += "</li>";
      }
      console.log(string);
      $("#eventsToday").html(string);
    });

    // Increment counter
    i++;
  });

  return data;
}

// Runtime code ---------------------------- o

$(document).ready(function() {
  // Load in the current month
  currentData = loadMonth(currentYear,currentMonth);

  // Click on the gmail icon
  $("#gmail").click(function() {
    loadCalendarApi();
    currentData = loadMonth(currentYear,currentMonth);
  });
  
  $(".monthButton").click(function() {
    var shift = $(this).attr("value");
    var newDate = new Date(currentYear,currentMonth + parseInt(shift),1);
    currentYear = newDate.getFullYear();
    currentMonth = newDate.getMonth();
    
    loadCalendarApi();
    currentData = loadMonth(currentYear,currentMonth);
  });

});

// ---------------------------------------------------------------------------------------------------------------------//
// ---------------------------------------------------- GOOGLE API ---------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------//

var CLIENT_ID = '483530694362-2e8fb2sgqndnsprm63nip0dnmk55dn41.apps.googleusercontent.com';
var SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];

function checkAuth() {
  gapi.auth.authorize(
    {
      'client_id': CLIENT_ID,
      'scope': SCOPES.join(' '),
      'immediate': true
    }, handleAuthResult);
}

function handleAuthResult(authResult) {
  if (authResult && !authResult.error) {
    // Hide auth UI, then load client library.
    loadCalendarApi();
  }
}

function handleAuthClick(event) {
  gapi.auth.authorize(
    {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
    handleAuthResult);
  return false;
}

function loadCalendarApi() {
  gapi.client.load('calendar', 'v3', listUpcomingEvents);
}

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
          'timeMin': (new Date(currentYear,currentMonth,-6)).toISOString(),
          'timeMax': (new Date(currentYear,currentMonth+1, 7)).toISOString(),
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
            googleArray = toReturn;
          }
        });
      }
  });

}
