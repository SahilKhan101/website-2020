var slideIndex = 0;
showSlides(slideIndex);
setInterval(() => { plusSlides(1); }, 5000);
// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex + n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(n);
}

function showSlides(newSlideIndex) {
    var i;
    var slides = document.getElementsByClassName("eventSlides");
    var n = slides.length;
    var eventDots = document.getElementsByClassName("eventDot");
    slides[slideIndex].className = slides[slideIndex].className.replace(" eventSelected", "");
    slides[(slideIndex - 1 + n) % n].className = slides[(slideIndex - 1 + n) % n].className.replace(" eventLeft", "");
    slides[(slideIndex + 1 + n) % n].className = slides[(slideIndex + 1 + n) % n].className.replace(" eventRight", "");
    eventDots[slideIndex].className = eventDots[slideIndex].className.replace(" active", "");
    if (slideIndex != newSlideIndex)
        reset(slides);
    slideIndex = (newSlideIndex + n) % n;
    slides[slideIndex].className += " eventSelected";
    slides[(slideIndex - 1 + n) % n].className += " eventLeft";
    slides[(slideIndex + 1) % n].className += " eventRight";
    eventDots[slideIndex].className += " active";

}

function reset(slides) {
    var n = slides.length;
    var e = slides[slideIndex].children[0].children[1];
    if (e.children[2].className.indexOf("hide") == -1)
        e.children[2].className += " hide";
    e.className = e.className.replace(" show-content", "");
    var e = slides[(slideIndex - 1 + n) % n].children[0].children[1];
    if (e.children[2].className.indexOf("hide") == -1)
        e.children[2].className += " hide";
    e.className = e.className.replace(" show-content", "");
    var e = slides[(slideIndex + 1) % n].children[0].children[1];
    if (e.children[2].className.indexOf("hide") == -1)
        e.children[2].className += " hide";
    e.className = e.className.replace(" show-content", "");

}

$(document).keydown(function(e) {
    switch (e.which) {
        case 37: // eventLeft
            plusSlides(-1);
            break;

        case 39: // eventRight
            plusSlides(1);
            break;

        default:
            return;
    }
    e.preventDefault();
});

function unify(e) { return e.changedTouches ? e.changedTouches[0] : e };

function swipedetect(el, callback) {

    var touchsurface = el,
        swipedir,
        startX,
        startY,
        distX,
        distY,
        threshold = 150, //required min distance traveled to be considered swipe
        restraint = 100, // maximum distance allowed at the same time in perpendicular direction
        allowedTime = 300, // maximum time allowed to travel that distance
        elapsedTime,
        startTime,
        handleswipe = callback || function(swipedir) {}

    touchsurface.addEventListener('touchstart', function(e) {
        var touchobj = unify(e)
        swipedir = 'none'
        dist = 0
        startX = touchobj.clientX
        startY = touchobj.clientY
        startTime = new Date().getTime() // record time when finger first makes contact with surface
        e.preventDefault()
    }, false)

    touchsurface.addEventListener('touchmove', function(e) {
        e.preventDefault() // prevent scrolling when inside DIV
    }, false)

    touchsurface.addEventListener('touchend', function(e) {
        var touchobj = unify(e)
        distX = touchobj.clientX - startX // get horizontal dist traveled by finger while in contact with surface
        distY = touchobj.clientY - startY // get vertical dist traveled by finger while in contact with surface
        elapsedTime = new Date().getTime() - startTime // get time elapsed
        if (elapsedTime <= allowedTime) { // first condition for awipe met
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) { // 2nd condition for horizontal swipe met
                swipedir = (distX < 0) ? 'eventLeft' : 'eventRight' // if dist traveled is negative, it indicates eventLeft swipe
            } else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) { // 2nd condition for vertical swipe met
                swipedir = (distY < 0) ? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
            }
        }
        handleswipe(swipedir)
        e.preventDefault()
    }, false)
    touchsurface.addEventListener('mousedown', function(e) {
        var touchobj = unify(e)
        swipedir = 'none'
        dist = 0
        startX = touchobj.clientX
        startY = touchobj.clientY
        startTime = new Date().getTime() // record time when finger first makes contact with surface
        e.preventDefault()
    }, false)

    touchsurface.addEventListener('mouseup', function(e) {
        var touchobj = unify(e)
        distX = touchobj.clientX - startX // get horizontal dist traveled by finger while in contact with surface
        distY = touchobj.clientY - startY // get vertical dist traveled by finger while in contact with surface
        elapsedTime = new Date().getTime() - startTime // get time elapsed
        if (elapsedTime <= allowedTime) { // first condition for awipe met
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) { // 2nd condition for horizontal swipe met
                swipedir = (distX < 0) ? 'eventLeft' : 'eventRight' // if dist traveled is negative, it indicates eventLeft swipe
            } else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) { // 2nd condition for vertical swipe met
                swipedir = (distY < 0) ? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
            }
        }
        handleswipe(swipedir)
        e.preventDefault()
    }, false)
}

function handleswipe(isSwipe) {
    if (isSwipe == 1)
        plusSlides(1);
    else if (isSwipe == 2)
        plusSlides(-1);
}


swipedetect(document.getElementById("event-slideshow-container"), function(swipedir) {
    console.log(swipedir)
    if (swipedir == "up") {
        e = document.getElementsByClassName("eventSelected")[0].children[0].children[1];
        if (e.className.indexOf(" show-content") == -1)
            e.className += " show-content";
        e.children[2].className = e.children[2].className.replace(" hide", "");
    } else if (swipedir == "down") {
        e = document.getElementsByClassName("eventSelected")[0].children[0].children[1];
        if (e.children[2].className.indexOf("hide") == -1)
            e.children[2].className += " hide";
        e.className = e.className.replace(" show-content", "");
    } else if (swipedir == "eventLeft") {
        plusSlides(1);
    } else if (swipedir == "eventRight") {
        plusSlides(-1);
    }
});