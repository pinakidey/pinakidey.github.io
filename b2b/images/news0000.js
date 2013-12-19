var newsText = new Array();

newsText[0] = "Symposium problem statement up";
newsText[1] = "Send in your paper presentation abstracts starting August 9th!";
newsText[2] = "Search 3.0 registration is open!";
newsText[3] = "Check where the Shaastra EP team is headed at the calendar";
newsText[4] = "Check out the Shaastra Blog!";
newsText[5] = "CUDA registrations are now open!";
newsText[6] = "Simchamp problem statement is up";
newsText[7] = "Watch out for Shaastra Car";

var linkURL = new Array();

    linkURL[0]="http://symposium.shaastra.org";
    linkURL[1]="http://shaastra.org/2009/events/paper_presentation";
    linkURL[2]="http://search3.shaastra.org";
    linkURL[3]="http://www.shaastra.org/2009/site/ep_calendar";
    linkURL[4]="http://www.shaastra.org/2009/blog";
    linkURL[5]="http://www.shaastra.org/2009/site/events/workshops/cuda";
    linkURL[6]="http://www.shaastra.org/2009/site/events/coding/simchamp";
    linkURL[7]="http://www.shaastra.org/2009/site/events/demonstrations/shaastra_car"; 

var ttloop = 1;    // Repeat forever? (1 = True; 0 = False)
var tspeed = 150;   // Typing speed in milliseconds (larger number = slower)
var tdelay = 5000; // Time delay between newsTexts in milliseconds

// ------------- NO EDITING AFTER THIS LINE ------------- \\
var dwAText, mylink, cnews=0, eline=0, cchar=0, mxText;

function doNews() {
  mxText = newsText.length - 1;
  dwAText = newsText[cnews];
  mylink = linkURL[cnews];
  setTimeout("addChar()",1000)
}
function addNews() {
  cnews += 1;
  if (cnews <= mxText) {
    dwAText = newsText[cnews];
    mylink = linkURL[cnews];
    if (dwAText.length != 0) {
       document.getElementById('tickerSource').innerHTML = "";
      eline = 0;
 
      setTimeout("addChar()",tspeed)

    }
  }
}
function addChar() {


  if (eline!=1) {
    if (cchar != dwAText.length) {
      nmttxt = "<a href=\""+mylink+"\">"; for (var k=0; k<=cchar;k++) nmttxt += dwAText.charAt(k);
      nmttxt += "</a>";
       document.getElementById('tickerSource').innerHTML = nmttxt;
      cchar += 1;
      if (cchar != dwAText.length)  

document.getElementById('tickerSource').innerHTML += "_";

    } else {
      cchar = 0;
      eline = 1;
    }
    if (mxText==cnews && eline!=0 && ttloop!=0) {
      cnews = 0; 
      setTimeout("addNews()",tdelay);
    } else setTimeout("addChar()",tspeed);
  } else {  
      setTimeout("addNews()",tdelay);
  }
}

doNews()