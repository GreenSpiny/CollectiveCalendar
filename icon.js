function gmail_change(){
  console.log(document.getElementById('gmail').src);
  if (document.getElementById('gmail').alt === "Gmail Color Icon") {
      console.log("here");
      document.getElementById('gmail').src = "resources/images/gmail_icon_b.png";
      document.getElementById('gmail').alt = "Gmail Grey Icon";
  } else {
      console.log("else");
      document.getElementById('gmail').src = "resources/images/gmail_icon.png";
      document.getElementById('gmail').alt = "Gmail Color Icon";
  }
}

function fb_change(){
  console.log(document.getElementById('gmail').src);
  if (document.getElementById('fb').alt === "Facebook Color Icon") {
      console.log("here");
      document.getElementById('fb').src = "resources/images/fb_icon_b.png";
      document.getElementById('fb').alt = "Facebook Grey Icon";
  } else {
      console.log("else");
      document.getElementById('fb').src = "resources/images/fb_icon.png";
      document.getElementById('fb').alt = "Facebook Color Icon";
  }
}
