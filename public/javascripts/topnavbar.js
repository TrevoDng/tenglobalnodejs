function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }
  
    var coll = document.getElementsByClassName('dropbtn');
  
  var i;
  for(i = 0; i < coll.length; i++) {
      coll[i].addEventListener('click', function() {
      this.classList.toggle('active');
          var content = this.nextElementSibling;
          
  if(content.style.maxHeight) {
      content.style.maxHeight = null;
  }
  else {
      content.style.maxHeight = content.scrollHeight+"px";
  }
      });
  }