// Dynamic data ---------------------------- o

var today = new Date();
var currentMonth = today.getMonth();
var currentYear = today.getFullYear();

var selectedDay;
var currentData;

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

function loadMonth(year,month) {
  var data = generateMonth(year,month);
  $("#header h2").html(months[currentMonth] + " " + currentYear);
  
  // importGoogle(data);
  // importFaceBook(data);
  // importPHP(data);

  var string = "";
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
    $(this).html(String(data[i].date.getDate()));
    
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
          console.log(selectedDay.date.toString());
        }
      }
      
      $(this).addClass("selected");
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
  
  // Scroll between months
  $(".monthButton").click(function() {
    var shift = $(this).attr("value");
    var newDate = new Date(currentYear, currentMonth + parseInt(shift),1);
    currentYear = newDate.getFullYear();
    currentMonth = newDate.getMonth();
    
    currentData = loadMonth(currentYear,currentMonth);
  });
  
});