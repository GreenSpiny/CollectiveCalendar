// Dynamic data ---------------------------- o

var today = new Date();
var currentMonth = today.getMonth();
var currentYear = today.getFullYear();

var selectedDay = today;

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

function Day(inDate) {
  this.date = inDate;
  this.events = [];
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
  // importJSON(data);

  var string = "";
  for (var i = 0; i < 5; i++) {
    for (var j = 0; j < 7; j++) {
      string += "<div info='' class='container two columns'></div>";
    }
    string += "<br>";
  }
  console.log(string);
  $(".days").html(string);

  var i = 0;
  $(".days div").each(function() {
  
    // Day number
    $(this).html(String(data[i].date.getDate()));
    
    // Color coding
    if (data[i].date.getDate() == today.getDate()) {
      $(this).addClass("todayColor");
    }
    else if (data[i].date.getMonth() == today.getMonth()) {
      $(this).addClass("monthColor");
    }
    else {
      $(this).addClass("offColor");
    }
    
    // Set info attribute 
    $(this).attr("info",(data[i].date).toString());
    
    // Increment counter
    i++;
  });

}

$(document).ready(function() {
  loadMonth(currentYear,currentMonth);
  
  $(".days div").click(function() {
    $(this).addClass("selected");
  });
  
});
