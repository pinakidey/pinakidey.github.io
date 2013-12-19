/*

Better(?) Image cross fader (C)2004 Patrick H. Lauke aka redux

Inspired by Steve at Slayeroffice http://slayeroffice.com/code/imagecrossfade1/ 

preInit "Scheduler" idea by Cameron Adams aka The Man in Blue
http://www.themaninblue.com/writing/perspective/2004/09/29/ 

Tweaked to deal with empty nodes 19 Feb 2006

*/

/* general variables */

var gallery1Id = 'gallery1'; /* change this to the ID of the gallery1 list */
var	gallery1; /* this will be the object reference to the list later on */
var gallery1Images; /* array that will hold all child elements of the list */
var currentImage1; /* keeps track of which image should currently be showing */
var previousImage1;
var preInit1Timer;
preInit1();

/* functions */

function preInit1() {
	/* an inspired kludge that - in most cases - manages to initially hide the image gallery1 list
	   before even onload is triggered (at which point it's normally too late, and the whole list already
	   appeared to the user before being remolded) */
	if ((document.getElementById)&&(gallery1=document.getElementById(gallery1Id))) {
		gallery1.style.visibility = "hidden";
		if (typeof preInit1Timer != 'undefined') clearTimeout(preInit1Timer); /* thanks to Steve Clay http://mrclay.org/ for this small Opera fix */
	} else {
		preInit1Timer = setTimeout("preInit1()",2);
	}
}

function fader1(imageNumber,opacity) {
	/* helper function to deal specifically with images and the cross-browser differences in opacity handling */
	var obj=gallery1Images[imageNumber];
	if (obj.style) {
		if (obj.style.MozOpacity!=null) {  
			/* Mozilla's pre-CSS3 proprietary rule */
			obj.style.MozOpacity = (opacity/100) - .001;
		} else if (obj.style.opacity!=null) {
			/* CSS3 compatible */
			obj.style.opacity = (opacity/100) - .001;
		} else if (obj.style.filter!=null) {
			/* IE's proprietary filter */
			obj.style.filter = "alpha(opacity="+opacity+")";
		}
	}
}

function fadeInit1() {
	if (document.getElementById) {
		preInit1(); /* shouldn't be necessary, but IE can sometimes get ahead of itself and trigger fadeInit first */
		gallery1Images = new Array;
		var node = gallery1.firstChild;
		/* instead of using childNodes (which also gets empty nodes and messes up the script later)
		we do it the old-fashioned way and loop through the first child and its siblings */
		while (node) {
			if (node.nodeType==1) {
				gallery1Images.push(node);
			}
			node = node.nextSibling;
		}
		for(i=0;i<gallery1Images.length;i++) {
			/* loop through all these child nodes and set up their styles */
			gallery1Images[i].style.position='absolute';
			gallery1Images[i].style.top=0;
			gallery1Images[i].style.zIndex=0;
			/* set their opacity to transparent */
			fader1(i,0);
		}
		/* make the list visible again */
		gallery1.style.visibility = 'visible';
		/* initialise a few parameters to get the cycle going */
		currentImage1=0;
		previousImage1=gallery1Images.length-1;
		opacity=100;
		fader1(currentImage1,100);
		/* start the whole crossfade1 process after a second's pause */
		window.setTimeout("crossfade1(100)", 3000);
	}
}

function crossfade1(opacity) {
		if (opacity < 100) {
			/* current image not faded up fully yet...so increase its opacity */
			fader1(currentImage1,opacity);
			/* fader(previousImage1,100-opacity); */
			opacity += 10;
			window.setTimeout("crossfade1("+opacity+")", 30);
		} else {
			/* make the previous image - which is now covered by the current one fully - transparent */
			fader1(previousImage1,0);
			/* make sure the current image is on top of the previous one */
			gallery1Images[previousImage1].style.zIndex = 0;
			gallery1Images[currentImage1].style.zIndex = 100;
			/* current image is now previous image, as we advance in the list of images */
			previousImage1=currentImage1;
			currentImage1+=1;
			if (currentImage1>=gallery1Images.length) {
				/* start over from first image if we cycled through all images in the list */
				currentImage1=0;
			}
			/* and start the crossfade1 after a second's pause */
			opacity=0;
			window.setTimeout("crossfade1("+opacity+")", 3000);
		}
		
}

/* initialise fader by hiding image object first */
addEvent(window,'load',fadeInit1)



/* 3rd party helper functions */

/* addEvent handler for IE and other browsers */
function addEvent(elm, evType, fn, useCapture) 
// addEvent and removeEvent
// cross-browser event handling for IE5+,  NS6 and Mozilla
// By Scott Andrew
{
 if (elm.addEventListener){
   elm.addEventListener(evType, fn, useCapture);
   return true;
 } else if (elm.attachEvent){
   var r = elm.attachEvent("on"+evType, fn);
   return r;
 }
} 
