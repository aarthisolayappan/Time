function changeBg() {
    var currentTime = new Date().getHours();
    var isDaytime = (currentTime >= 6 && currentTime < 20);
    
    var sketchHolder = document.getElementById("sketch-holder");

    if (isDaytime) {
        sketchHolder.style.backgroundColor = "rgb(255, 191, 14)"; // Change background color to antique white for daytime
    } else {
        sketchHolder.style.backgroundColor = "rgb(6, 5, 33)"; // Change background color to black for nighttime
    }
}

// Call the function initially to set the background color
changeBg();


// setInterval(changeBg, 1000);
