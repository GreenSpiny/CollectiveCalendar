// Dynamic data ---------------------------- o

var today = new Date();
var currentMonth = today.getMonth();
var currentYear = today.getYear();

// Static data ---------------------------- o

var calendarDays = 35;
var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

// Functions ---------------------------- o

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
  // importGoogle(data);
  // importFaceBook(data);
  
  var i = 0;
  $("#calendar .cell").each(function() {
    cells[i].html(String(data[i].date.getDate()));
    i++;
  });

}

// Code ---------------------------- o

// var test = generateMonth(2015,9);
// for (var i = 0; i < calendarDays; i++) {
  // console.log(test[i].date.getDate());
// }