function gmail_change(){
  console.log(document.getElementById('gmail').src);
  if (document.getElementById('gmail').alt === "Gmail Color Icon") {
      document.getElementById('gmail').src = "resources/images/gmail_icon_b.png";
      document.getElementById('gmail').alt = "Gmail Grey Icon";
  } else {
      document.getElementById('gmail').src = "resources/images/gmail_icon.png";
      document.getElementById('gmail').alt = "Gmail Color Icon";
  }
}

function fb_change(){
  console.log(document.getElementById('gmail').src);
  if (document.getElementById('fb').alt === "Facebook Color Icon") {
      document.getElementById('fb').src = "resources/images/fb_icon_b.png";
      document.getElementById('fb').alt = "Facebook Grey Icon";
  } else {
      document.getElementById('fb').src = "resources/images/fb_icon.png";
      document.getElementById('fb').alt = "Facebook Color Icon";
  }
}

function settings(){
  document.getElementById('settings').style.display = "inline";
}

function close_settings(){
  document.getElementById('settings').style.display = "none";
}

function green(){
  document.getElementById('navBar').style.backgroundColor = "#22B573";
  //today color changes
  document.getElementById('today').style.border = "1px solid #22B573";
  var h2s = document.getElementById('today').getElementsByTagName( 'h2' );
  h2s[0].style.backgroundColor = "#22B573";
  //calendar otpion color changes
  document.getElementById('calendar_options').style.border = "1px solid #22B573";
  var h2s = document.getElementById('calendar_options').getElementsByTagName( 'h2' );
  h2s[0].style.backgroundColor = "#22B573";
  //calendar color change
  document.getElementById('calendar').style.border = "1px solid #22B573";
  var h2s = document.getElementById('calendar').getElementsByTagName( 'h2' );
  h2s[0].style.backgroundColor = "#22B573";
  document.getElementById('header').style.backgroundColor = "#22B573";
  //change color of the squares
  elements = document.getElementsByClassName('selected');
  for (var i = 0; i < elements.length; i++) {
      elements[i].style.backgroundColor="#22B573";
  }
  elements = document.getElementsByClassName('monthColor');
  for (var i = 0; i < elements.length; i++) {
      elements[i].style.backgroundColor="#C8E6C9";
  }
  document.getElementById('options').style.borderBottom = "5px solid #22B573";
}

function pink(){
  document.getElementById('navBar').style.backgroundColor = "#F28898";
  //today color changes
  document.getElementById('today').style.border = "1px solid #F28898";
  var h2s = document.getElementById('today').getElementsByTagName( 'h2' );
  h2s[0].style.backgroundColor = "#F28898";
  //calendar otpion color changes
  document.getElementById('calendar_options').style.border = "1px solid #F28898";
  var h2s = document.getElementById('calendar_options').getElementsByTagName( 'h2' );
  h2s[0].style.backgroundColor = "#F28898";
  //calendar color change
  document.getElementById('calendar').style.border = "1px solid #F28898";
  var h2s = document.getElementById('calendar').getElementsByTagName( 'h2' );
  h2s[0].style.backgroundColor = "#F28898";
  document.getElementById('header').style.backgroundColor = "#F28898";
  //change color of the squares
  elements = document.getElementsByClassName('selected');
  for (var i = 0; i < elements.length; i++) {
      elements[i].style.backgroundColor="#F28898";
  }
  elements = document.getElementsByClassName('monthColor');
  for (var i = 0; i < elements.length; i++) {
      elements[i].style.backgroundColor="#F4CFD5";
  }
  document.getElementById('options').style.borderBottom = "5px solid #F28898";
}

function blue(){
  document.getElementById('navBar').style.backgroundColor = "#03A9F4";
  //today color changes
  document.getElementById('today').style.border = "1px solid #03A9F4";
  var h2s = document.getElementById('today').getElementsByTagName( 'h2' );
  h2s[0].style.backgroundColor = "#03A9F4";
  //calendar otpion color changes
  document.getElementById('calendar_options').style.border = "1px solid #03A9F4";
  var h2s = document.getElementById('calendar_options').getElementsByTagName( 'h2' );
  h2s[0].style.backgroundColor = "#03A9F4";
  //calendar color change
  document.getElementById('calendar').style.border = "1px solid #03A9F4";
  var h2s = document.getElementById('calendar').getElementsByTagName( 'h2' );
  h2s[0].style.backgroundColor = "#03A9F4";
  document.getElementById('header').style.backgroundColor = "#03A9F4";
  //change color of the squares
  elements = document.getElementsByClassName('selected');
  for (var i = 0; i < elements.length; i++) {
      elements[i].style.backgroundColor="#03A9F4";
  }
  elements = document.getElementsByClassName('monthColor');
  for (var i = 0; i < elements.length; i++) {
      elements[i].style.backgroundColor="#BBDEFB";
  }
  document.getElementById('options').style.borderBottom = "5px solid #03A9F4";
}
