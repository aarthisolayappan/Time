class Ball {
  constructor(x, y, color, drop, index) {
    this.x = x;
    this.y = y;
    this.originalX = x; // Store original x position
    this.originalY = y;
    this.color = color;
    this.drop = drop;
    this.size = 52; // Square size
    this.speed = random(8, 7);
    this.gravity = 0.5;
    this.hitGround = false;
    // this.gradientColor = color;
  }

  draw() {
    let gradient = drawingContext.createRadialGradient(
      this.x, this.y, 0, this.x, this.y, this.size
    );
    gradient.addColorStop(0, ballColor);
    // gradient.addColorStop(1, this.gradientColor);
    
    // Apply the gradient
    drawingContext.fillStyle = gradient;
    noStroke();
    ellipse(this.x, this.y, this.size);

    // Add shadow
    drawingContext.shadowOffsetX = 18;
    drawingContext.shadowOffsetY = 10;
    drawingContext.shadowBlur = 20;
    drawingContext.shadowColor = 'rgba(0, 0, 0, 0.2)';
    }
  

  setDrop(dropped) {
    this.drop = dropped;
  }

  update(x, y) {
    if (this.drop) {
      // Check for collision only if the ball is below half of the page
      if (this.y > height / 2) {
        let colliding = false;
        for (let other of droppedBalls) {
          if (
            other !== this &&
            dist(this.x, this.y, other.x, other.y) < this.size / 2 + other.size / 2 &&
            this.y < other.y
          ) {
            // colliding = true;
            break;
          }
        }
        if (!colliding) {
          this.y += this.speed;
        }
      } else {
        this.y += this.speed;
        // Add random horizontal movement
        this.x += random(-1, 0);
      }
      // Limit the falling height

      this.speed += this.gravity;
      this.y = min(this.y, height - this.size);
    } else {
      // Adjust diagonal movement when dropping
      if (abs(this.originalY - this.y) > 5) {
        // If the ball has moved significantly from its original position
        this.x = lerp(this.x, x, 0.1); // Slow down horizontal movement
      } else {
        this.x = lerp(this.x, x, 0.2); // Continue regular horizontal movement
      }
      this.y = lerp(this.y, y, 0.2); // Continue regular vertical movement
    }
    // Ensure that the squares reach the bottom of the page
    if (this.drop && this.y >= height - this.size) {
      // Align the square to the bottom of the canvas
      this.y = height - this.size;
    }
    // Check for collisions with other squares when they are near the bottom
    if (this.y >= height - this.size) {

      this.hitGround = true;

      if(this.hitGround){
        this.speed = -this.speed * 0.46;
        this.hitGround = false;
      }

      for (let other of allBalls) {
        if (
          other !== this &&
          dist(this.x, this.y, other.x, other.y) < this.size * 1.2 &&
          other.y + this.size / 10 >= this.y + this.size / 20
        ) {
          // Move this square up if it collides with another square
          this.y -= this.speed;
          break;
        }
      }
    }
  }
}


let allBalls = [];
let droppedBalls = [];
let dropAll = false; // 🎨currently using a flag called dropAll to determine

// Define positions for the digits from 0 to 9
let digitPositions = [
  //0
  [
    { x: 272.3, y: 144.11 },
    { x: 216.95, y: 175.93 },
    { x: 188.77, y: 232.29 },
    { x: 181, y: 298.37 },
    { x: 182.01, y: 360.82 },
    { x: 201.86, y: 417.18 },
    { x: 242.54, y: 463.82 },
    { x: 303.76, y: 463.82 },
    { x: 349.26, y: 421.88 },
    { x: 367.25, y: 361.64 },
    { x: 378.24, y: 292.77 },
    { x: 372.11, y: 221.69 },
    { x: 336.15, y: 165.33 },
  ],
  //1
  [
    { x: 190.54, y: 196.5 },
    { x: 237, y: 159.16 },
    { x: 289.28, y: 132.66 },
    { x: 289.28, y: 190.38 },
    { x: 289.28, y: 248.42 },
    { x: 289.28, y: 307.94 },
    { x: 289.28, y: 367.34 },
    { x: 289.28, y: 427.03 },
    { x: 229.88, y: 486.72 },
    { x: 289.28, y: 486.72 },
    { x: 348.68, y: 486.72 },
    { x: 289.28, y: 486.72 },
    { x: 348.68, y: 486.72 },
  ],
  //2
  [
    { x: 181.97, y: 217.55 },
    { x: 220.23, y: 171.65 },
    { x: 275.02, y: 145.47 },
    { x: 333.38, y: 159.19 },
    { x: 356.57, y: 217.55 },
    { x: 321.5, y: 270.92 },
    { x: 289.28, y: 322.96 },
    { x: 258.06, y: 373.7 },
    { x: 220.23, y: 420.09 },
    { x: 190.97, y: 472.71 },
    { x: 250.37, y: 472.71 },
    { x: 309.77, y: 472.71 },
    { x: 370.57, y: 472.71 },
  ],
  //3
  [
    { x: 188.33, y: 212.47 },
    { x: 224.66, y: 164.55 },
    { x: 281.02, y: 145.47 },
    { x: 339.38, y: 159.19 },
    { x: 362.57, y: 215.55 },
    { x: 322.74, y: 263.84 },
    { x: 267.38, y: 302.77 },
    { x: 322.74, y: 326.1 },
    { x: 363.57, y: 372.38 },
    { x: 357.97, y: 434.64 },
    { x: 307.2, y: 470.67 },
    { x: 244.69, y: 469.25 },
    { x: 193.01, y: 434.64 },
  ],
  //4
  [
    { x: 279.57, y: 145.69 },
    { x: 246.32, y: 194.33 },
    { x: 215.19, y: 243.89 },
    { x: 187.01, y: 296.84 },
    { x: 244.84, y: 296.84 },
    { x: 303.68, y: 296.84 },
    { x: 362.51, y: 296.84 },
    { x: 362.51, y: 237.23 },
    { x: 362.51, y: 355.1 },
    { x: 362.51, y: 413.53 },
    { x: 362.51, y: 471.96 },
    { x: 362.51, y: 471.96 },
    { x: 362.51, y: 471.96 },
  ],
  //5
  [
    { x: 362.51, y: 145.69 },
    { x: 303.68, y: 145.69 },
    { x: 243.37, y: 145.69 },
    { x: 223.11, y: 202.05 },
    { x: 204.03, y: 262.98 },
    { x: 264.65, y: 258.41 },
    { x: 323.27, y: 276.99 },
    { x: 362.51, y: 324.02 },
    { x: 374.22, y: 383.35 },
    { x: 355.45, y: 440.71 },
    { x: 302.15, y: 469.89 },
    { x: 241.37, y: 469.89 },
    { x: 190.93, y: 434.64 },
  ],
  //6
  [
    { x: 254.51, y: 145.69 },
    { x: 226.33, y: 202.05 },
    { x: 202.83, y: 258.41 },
    { x: 185.01, y: 316.63 },
    { x: 180.11, y: 376.13 },
    { x: 190.93, y: 434.64 },
    { x: 241.37, y: 469.89 },
    { x: 302.15, y: 469.89 },
    { x: 355.45, y: 440.71 },
    { x: 374.33, y: 383.35 },
    { x: 358.51, y: 325.99 },
    { x: 304.15, y: 297.81 },
    { x: 245.79, y: 308.17 },
  ],
  //7
  [
    { x: 186.77, y: 139.33 },
    { x: 245.63, y: 139.33 },
    { x: 304.39, y: 139.33 },
    { x: 365.17, y: 139.33 },
    { x: 352.81, y: 195.7 },
    { x: 336.99, y: 252.06 },
    { x: 321.73, y: 308.42 },
    { x: 304.39, y: 364.78 },
    { x: 288.82, y: 420.64 },
    { x: 265.91, y: 477 },
    { x: 304.39, y: 364.78 },
    { x: 288.82, y: 420.64 },
    { x: 265.91, y: 477 },
  ],
  //8
  [
    { x: 275.45, y: 158.47 },
    { x: 217.79, y: 186.65 },
    { x: 208.38, y: 249.91 },
    { x: 244.51, y: 300.15 },
    { x: 306.4, y: 300.15 },
    { x: 342.51, y: 350.01 },
    { x: 348.44, y: 413.36 },
    { x: 307.4, y: 457.87 },
    { x: 247.27, y: 457.87 },
    { x: 203.5, y: 413.36 },
    { x: 209.38, y: 350.01 },
    { x: 348.44, y: 249.91 },
    { x: 333.58, y: 186.65 },
  ],
  //9
  [
    { x: 342.54, y: 186.55 },
    { x: 293.31, y: 147.5 },
    { x: 233.87, y: 164.61 },
    { x: 211.8, y: 220.97 },
    { x: 239.99, y: 277.99 },
    { x: 301.03, y: 281.79 },
    { x: 357.39, y: 247.81 },
    { x: 357.39, y: 309.97 },
    { x: 357.39, y: 373.23 },
    { x: 342.54, y: 433.39 },
    { x: 293.54, y: 468.84 },
    { x: 233.87, y: 462.72 },
    { x: 194.55, y: 418.04 },
  ],
];

let savedCurrentTime;

function isDaytime() {
  let hour = new Date().getHours();
  return hour >= 6 && hour < 20; // Assume daytime from 6 AM to 6 PM
}

function setup() {
  let parentDiv = document.getElementById("sketch-holder");
  let cnv = createCanvas(1700, 1500);
  cnv.parent("sketch-holder");
  

  // Initialize balls based on current time with offset
  initializeBalls();
  // Initialize balls based on current time
  // initializeBalls();
  savedCurrentTime = getCurrentTime();

  setColors();
}

function setColors() {
  if (isDaytime()) {
      // Daytime colors
      // background(220); // Light background color
      ballColor = color(255, 0, 0); // Red balls
  } else {
      // Nighttime colors (dark mode)
      // background(30); // Dark background color
      ballColor = color(0, 0, 120); // Darker red balls
  }
}

function draw() {
  clear();
  // background('green');

  setColors();
  // Draw the balls
  for (let ball of allBalls) {
    ball.draw();
  }

  for (let droppedBall of droppedBalls) {
    droppedBall.draw();
    droppedBall.update();
  }

  if (isTimeUpdated()) {
    //compare the savedCurrentTime to the current time array returned from getCurrenTime, if it's equal then do nothing, if it's not the same which means the time has been updated, then do the following actions:
    savedCurrentTime = getCurrentTime(); // update savedCurrentTime
    dropAllBalls();
    pushDroppedBallsToDroppedBalls();
    initializeBalls();
  }

  updateBalls();
}

function isTimeUpdated(){
  // comparing time to see if it's updated
  return savedCurrentTime[0] != getCurrentTime()[0] || savedCurrentTime[1] != getCurrentTime()[1];
}

function arraysAreEqual(arr1, arr2) {
  // Check if arrays have the same length
  if (arr1.length !== arr2.length) {
    return false;
  }

  // Iterate over each element of the arrays
  for (let i = 0; i < arr1.length; i++) {
    // If elements at the same index are not equal, arrays are not equal
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  // If all elements are equal, arrays are equal
  return true;
}

function dropAllBalls() {
  for (let ball of allBalls) {
    ball.setDrop(true);
  }
}

function pushDroppedBallsToDroppedBalls() {
  for (let ball of allBalls) {
    droppedBalls.push(ball);
  }

  allBalls = []; // clear out allBalls
}

function initializeBalls() {
  let digitIndices = getCurrentTime();

  // Initialize the balls for the current time
  for (let i = 0; i < digitIndices.length; i++) {
    if (digitIndices[i] !== -1) {
      let digit = digitIndices[i];
      let digitPos = digitPositions[digit];

      // Adjust spacing between tens hour and ones hour
      let digitSpacing = 80; // Fixed spacing for all digits

      for (let j = 0; j < 13; j++) {
        // Display only 13 squares for each digit
        let ballIndex = i * 13 + j;
        let ballPos = digitPos[j % digitPos.length]; // Reuse digit positions

        let ball = new Ball(
          ballPos.x + i * digitSpacing * 4,// Adjusted x position for the digit
          ballPos.y,
          color(255, 0, 0),
          false, // Start dropping initially
          ballIndex
        );
        allBalls.push(ball);
      }
    }
  }
}

function updateBalls() {
  let digitIndices = getCurrentTime();

  for (let i = 0; i < digitIndices.length; i++) {
    if (digitIndices[i] != -1) {
      let digit = digitIndices[i];
      let digitPos = digitPositions[digit];

      // Adjust spacing between tens hour and ones hour
      let digitSpacing = 65; // Fixed spacing for all digits

      for (let j = 0; j < 13; j++) {
        // Display only 13 squares for each digit

        let ballIndex = i * 13 + j;

        if (i > 1) {
          // to account for the colons
          ballIndex -= 13;
        }

        let ballPos = digitPos[j % digitPos.length]; // Reuse digit positions
        allBalls[ballIndex].update(ballPos.x + i * digitSpacing * 4, ballPos.y);
      }
    }
  }
}

// let curMinute = 58
// let curHour = 22

function getCurrentTime() {
  // Update the balls to the positions of the next digits
  curHour = hour();
  curMinute = minute();

  let tensHour = Math.floor(curHour / 10);
  let onesHour = curHour % 10;
  let tensMinute = Math.floor(curMinute / 10);
  let onesMinute = curMinute % 10;

  return [tensHour, onesHour, -1, tensMinute, onesMinute]; // Use -1 to represent the colon
}



// let fastForwardButton = document.getElementById("fast-forward-btn");

// // Define variables to keep track of the current hour and minute
// let curHour = 0;
// let curMinute = 0;

// // Initialize current hour and minute with the current time
// let currentTime = new Date();
// curHour = currentTime.getHours();
// curMinute = currentTime.getMinutes();

// // Increment the minute by 1 when the fast forward button is clicked
// fastForwardButton.addEventListener("click", () => {
//   curMinute += 1;

//   // Check if the minute has reached 60
//   if (curMinute > 59) {
//     curMinute = 0; // Reset minute to 0
//     curHour += 1; // Increment hour by 1

//     // Check if the hour has reached 24
//     if (curHour === 24) {
//       curHour = 0; // Reset hour to 0
//     }
//   }

//   // Update the displayed time
//   updateDisplayedTime();
// });

// let onesMinuteIndex = 0; // Initialize the index for the ones digit
// let tensMinuteIndex = 0; // Initialize the index for the tens digit

// function updateDisplayedTime() {
//   // Update the positions of the ones and tens digits based on the current time
//   let currentTime = getCurrentTime();
//   let onesMinute = currentTime[4]; // Get the ones digit of the minutes
//   let tensMinute = currentTime[3]; // Get the tens digit of the minutes

//   digitPositions[onesMinute] = digitPositions[(onesMinute + onesMinuteIndex) % 10].map(pos => ({ x: pos.x, y: pos.y }));
//   digitPositions[tensMinute] = digitPositions[(tensMinute + tensMinuteIndex) % 6].map(pos => ({ x: pos.x, y: pos.y }));
// }

// function getCurrentTime() {
//   return [Math.floor(curHour / 10), curHour % 10, -1, Math.floor(curMinute / 10), curMinute % 10]; // Use -1 to represent the colon
// }


// Function to generate and append a rectangle
function generateRectangle() {
  // Define the canvas area
  var canvasWidth = document.getElementById("sketch-holder").offsetWidth;
  var canvasHeight = document.getElementById("sketch-holder").offsetHeight;

  // Define the button dimensions and position
  var buttonRect = document.getElementById("fast-forward-btn").getBoundingClientRect();
  var buttonLeft = buttonRect.left;
  var buttonTop = buttonRect.top;
  var buttonWidth = buttonRect.width;
  var buttonHeight = buttonRect.height;

  // Generate random positions for rectangles within the canvas area but not over the button
  var randomX, randomY;
  do {
    randomX = Math.floor(Math.random() * canvasWidth);
    randomY = Math.floor(Math.random() * canvasHeight);
  } while (
    randomX >= buttonLeft && randomX <= buttonLeft + buttonWidth &&
    randomY >= buttonTop && randomY <= buttonTop + buttonHeight
  );

  // Generate a random rotation between -3 to 3 degrees
  var randomRotation = Math.random() * 6 - 3; 

  // Array of different texts
  var texts = [
    "You cannot fast-forward time", 
    "You cannot rewind time", 
    "You cannot pause time", 
    "You can only waste or benefit from time", 
    "There are no short-cuts in life",
    "Time flying can be scary sometimes",
    "The time will never be right",
    "Be in the present. Earn? the future",
    "Everything takes it's time for a reason",
    "Don't rush into anything. Wait for it to happen",
    "Shortcuts are not the answer",
    "Can we skip to next week? No you may not",
    "Use your present time wisely",
    "This is not a movie you can fastforward",
    "Take it slow, you don't want motion sickness",
    "Don't you have better things to do than waste time trying to fastforward time",
    "WHY DO YOU WANT TO DO IT SO BAD",
    "Is this really worth it?"
  ];
  var randomText = texts[Math.floor(Math.random() * texts.length)];
  
  // Create a new rectangle element
  var rect = document.createElement("div");
  rect.classList.add("rect");
  rect.style.left = randomX + "px";
  rect.style.top = randomY + "px";
  rect.textContent = randomText;
  rect.style.transform = "rotate(" + randomRotation + "deg)"; // Apply the random rotation

  // Append the rectangle to the canvas
  document.getElementById("sketch-holder").appendChild(rect);
}

// Event listener for the fast forward button click
document.getElementById("fast-forward-btn").addEventListener("click", function() {
  // Remove existing rectangles
  var rectangles = document.querySelectorAll('.rect');
  rectangles.forEach(function(rect) {
    rect.remove();
  });
  // Generate new rectangle
  generateRectangle();
});

// Event listener for window resize
window.addEventListener("resize", function() {
  // Remove existing rectangles
  var rectangles = document.querySelectorAll('.rect');
  rectangles.forEach(function(rect) {
    rect.remove();
  });
  // Generate new rectangle
  generateRectangle();
});





// function mousePressed() {
//   curMinute += 1;
  
//   if(curMinute > 59){
//     curMinute = 0
//     curHour += 1
//   }
// }




// let droppedBalls = [];

// class Ball {
//   constructor(x, y, color, drop, index) {
//     this.x = x;
//     this.y = y;
//     this.originalX = x; // Store original x position
//     this.originalY = y; 
//     this.color = color;
//     this.drop = drop;
//     this.size = 55; // Square size
//     this.speed = random(8, 7); 
//   }

//   draw() {
//     fill(this.color);
//     rect(this.x, this.y, this.size, this.size);
//   }

//   setDrop(dropped) {
//     this.drop = dropped;
//   }


//   update(x, y) {
//     if (this.drop) {
//         // Check for collision only if the ball is below half of the page
//         if (this.y > height / 2) {
//             let colliding = false;
//             for (let other of allBalls) {
//                 if (other !== this && dist(this.x, this.y, other.x, other.y) < this.size && other.y + this.size / 5 >= this.y + this.size / 2) {
//                     colliding = true;
//                     break;
//                 }
//             }
//             if (!colliding) {
//                 this.y += this.speed;
//             }
//         } else {
//             this.y += this.speed;
//             this.x += random(1, 0);
//         }
//         // Limit the falling height
//         this.y = min(this.y, height - this.size);
//     } else {
//         this.x = lerp(this.x, x, 0.1);
//         this.y = lerp(this.y, y, 0.1);
//     }
//     // Ensure that the squares reach the bottom of the page
//     if (this.drop && this.y >= height - this.size) {
//         // Align the square to the bottom of the canvas
//         this.y = height - this.size;
//     }
//     // Check for collisions with other squares when they are near the bottom
//     if (this.y >= height - this.size * 2.6) {
//         for (let other of allBalls) {
//           if (other !== this && dist(this.x, this.y, other.x, other.y) < this.size * 1.2 && other.y + this.size / 5 >= this.y + this.size / 2) {
//             // Move this square up if it collides with another square
//             this.y -= this.speed;
//             break;
//             }
//         }
//     }
//   }
// }


// let allBalls = [];
// let curMinute = 0;
// let dropAll = false; // 🎨currently using a flag called dropAll to determine

// // Define positions for the digits from 0 to 9
// let digitPositions = [
//   //0
//   [
//     { x: 272.3, y: 144.11 },
//     { x: 216.95, y: 175.93 },
//     { x: 188.77, y: 232.29 },
//     { x: 181, y: 298.37 },
//     { x: 182.01, y: 360.82 },
//     { x: 201.86, y: 417.18 },
//     { x: 242.54, y: 463.82 },
//     { x: 303.76, y: 463.82 },
//     { x: 349.26, y: 421.88 },
//     { x: 367.25, y: 361.64 },
//     { x: 378.24, y: 292.77 },
//     { x: 372.11, y: 221.69 },
//     { x: 336.15, y: 165.33 },
//   ],
//   //1
//   [
//     { x: 190.54, y: 196.5 },
//     { x: 237, y: 159.16 },
//     { x: 289.28, y: 132.66 },
//     { x: 289.28, y: 190.38 },
//     { x: 289.28, y: 248.42 },
//     { x: 289.28, y: 307.94 },
//     { x: 289.28, y: 367.34 },
//     { x: 289.28, y: 427.03 },
//     { x: 229.88, y: 486.72 },
//     { x: 289.28, y: 486.72 },
//     { x: 348.68, y: 486.72 },
//     { x: 289.28, y: 486.72 },
//     { x: 348.68, y: 486.72 },
//   ],
//   //2
//   [
//     { x: 181.97, y: 217.55 },
//     { x: 220.23, y: 171.65 },
//     { x: 275.02, y: 145.47 },
//     { x: 333.38, y: 159.19 },
//     { x: 356.57, y: 217.55 },
//     { x: 321.5, y: 270.92 },
//     { x: 289.28, y: 322.96 },
//     { x: 258.06, y: 373.7 },
//     { x: 220.23, y: 420.09 },
//     { x: 190.97, y: 472.71 },
//     { x: 250.37, y: 472.71 },
//     { x: 309.77, y: 472.71 },
//     { x: 370.57, y: 472.71 },
//   ],
//   //3
//   [
//     { x: 188.33, y: 212.47 },
//     { x: 224.66, y: 164.55 },
//     { x: 281.02, y: 145.47 },
//     { x: 339.38, y: 159.19 },
//     { x: 362.57, y: 215.55 },
//     { x: 322.74, y: 263.84 },
//     { x: 267.38, y: 302.77 },
//     { x: 322.74, y: 326.1 },
//     { x: 363.57, y: 372.38 },
//     { x: 357.97, y: 434.64 },
//     { x: 307.2, y: 470.67 },
//     { x: 244.69, y: 469.25 },
//     { x: 193.01, y: 434.64 },
//   ],
//   //4
//   [
//     { x: 279.57, y: 145.69 },
//     { x: 246.32, y: 194.33 },
//     { x: 215.19, y: 243.89 },
//     { x: 187.01, y: 296.84 },
//     { x: 244.84, y: 296.84 },
//     { x: 303.68, y: 296.84 },
//     { x: 362.51, y: 296.84 },
//     { x: 362.51, y: 237.23 },
//     { x: 362.51, y: 355.1 },
//     { x: 362.51, y: 413.53 },
//     { x: 362.51, y: 471.96 },
//     { x: 362.51, y: 471.96 },
//     { x: 362.51, y: 471.96 },
//   ],
//   //5
//   [
//     { x: 362.51, y: 145.69 },
//     { x: 303.68, y: 145.69 },
//     { x: 243.37, y: 145.69 },
//     { x: 223.11, y: 202.05 },
//     { x: 204.03, y: 262.98 },
//     { x: 264.65, y: 258.41 },
//     { x: 323.27, y: 276.99 },
//     { x: 362.51, y: 324.02 },
//     { x: 374.22, y: 383.35 },
//     { x: 355.45, y: 440.71 },
//     { x: 302.15, y: 469.89 },
//     { x: 241.37, y: 469.89 },
//     { x: 190.93, y: 434.64 },
//   ],
//   //6
//   [
//     { x: 254.51, y: 145.69 },
//     { x: 226.33, y: 202.05 },
//     { x: 202.83, y: 258.41 },
//     { x: 185.01, y: 316.63 },
//     { x: 180.11, y: 376.13 },
//     { x: 190.93, y: 434.64 },
//     { x: 241.37, y: 469.89 },
//     { x: 302.15, y: 469.89 },
//     { x: 355.45, y: 440.71 },
//     { x: 374.33, y: 383.35 },
//     { x: 358.51, y: 325.99 },
//     { x: 304.15, y: 297.81 },
//     { x: 245.79, y: 308.17 },
//   ],
//   //7
//   [
//     { x: 186.77, y: 139.33 },
//     { x: 245.63, y: 139.33 },
//     { x: 304.39, y: 139.33 },
//     { x: 365.17, y: 139.33 },
//     { x: 352.81, y: 195.7 },
//     { x: 336.99, y: 252.06 },
//     { x: 321.73, y: 308.42 },
//     { x: 304.39, y: 364.78 },
//     { x: 288.82, y: 420.64 },
//     { x: 265.91, y: 477 },
//     { x: 304.39, y: 364.78 },
//     { x: 288.82, y: 420.64 },
//     { x: 265.91, y: 477 },
//   ],
//   //8
//   [
//     { x: 275.45, y: 158.47 },
//     { x: 217.79, y: 186.65 },
//     { x: 208.38, y: 249.91 },
//     { x: 244.51, y: 300.15 },
//     { x: 306.4, y: 300.15 },
//     { x: 342.51, y: 350.01 },
//     { x: 348.44, y: 413.36 },
//     { x: 307.4, y: 457.87 },
//     { x: 247.27, y: 457.87 },
//     { x: 203.5, y: 413.36 },
//     { x: 209.38, y: 350.01 },
//     { x: 348.44, y: 249.91 },
//     { x: 333.58, y: 186.65 },
//   ],
//   //9
//   [
//     { x: 342.54, y: 186.55 },
//     { x: 293.31, y: 147.5 },
//     { x: 233.87, y: 164.61 },
//     { x: 211.8, y: 220.97 },
//     { x: 239.99, y: 277.99 },
//     { x: 301.03, y: 281.79 },
//     { x: 357.39, y: 247.81 },
//     { x: 357.39, y: 309.97 },
//     { x: 357.39, y: 373.23 },
//     { x: 342.54, y: 433.39 },
//     { x: 293.54, y: 468.84 },
//     { x: 233.87, y: 462.72 },
//     { x: 194.55, y: 418.04 },
//   ],
// ];

// // function setup() {
// //   createCanvas(windowWidth, windowHeight);

// //   // Initialize the balls with random positions
// //   for (let i = 0; i < digitPositions.length; i++) {
// //     for (let j = 0; j < digitPositions[i].length; j++) {
// //       allBalls.push(
// //         new Ball(
// //           digitPositions[i][j].x,
// //           digitPositions[i][j].y,
// //           color(255, 0, 0),
// //           false //🎨 initialize all the balls with false
// //         )
// //       ); // Example color, adjust as needed
// //     }
// //   }
// // }

// function setup() {
//   createCanvas(windowWidth, windowHeight);

//   // Initialize balls based on current time
//   initializeBalls();

//   // Update balls every second
//   setInterval(updateBalls, 60000); // 1000 milliseconds = 1 second
// }

// function draw() {
//   background(220);

//   // Draw the balls
//   for (let ball of allBalls) {
//     ball.draw();
//     if (dropAll) { // Only update if dropAll is true
//       ball.update();
//     }
//   }

//   // Draw the dropped balls
//   for (let droppedBall of droppedBalls) {
//     droppedBall.draw();
//     if (dropAll) { // Only update if dropAll is true
//       droppedBall.update();
//     }
//   }
// }

// function initializeBalls() {
//   let curHour = hour();
//   let curMinute = minute();

//   let tensHour = Math.floor(curHour / 10);
//   let onesHour = curHour % 10;
//   let tensMinute = Math.floor(curMinute / 10);
//   let onesMinute = curMinute % 10;

//   let digitIndices = [tensHour, onesHour, -1, tensMinute, onesMinute]; // Use -1 to represent the colon

//   // Initialize the balls for the current time
//   for (let i = 0; i < digitIndices.length; i++) {
//     if (digitIndices[i] !== -1) {
//       let digit = digitIndices[i];
//       let digitPos = digitPositions[digit];

//       // Adjust spacing between tens hour and ones hour
//       let digitSpacing = 60; // Fixed spacing for all digits
      
//       for (let j = 0; j < 13; j++) { // Display only 13 squares for each digit
//         let ballIndex = i * 13 + j;
//         let ballPos = digitPos[j % digitPos.length]; // Reuse digit positions

//         let ball = new Ball(
//           ballPos.x + i * digitSpacing * 4, // Adjusted x position for the digit
//           ballPos.y,
//           color(255, 0, 0),
//           true, // Start dropping initially
//           ballIndex
//         );
//         ball.setDrop(true); // Set the drop property
//         allBalls.push(ball);
//       }
//     }
//   }
//   console.log(allBalls.length);
// }

// function updateBalls() {
//   // Update the balls to the positions of the next digits
//   let curHour = hour();
//   let curMinute = minute();

//   let tensHour = Math.floor(curHour / 10);
//   let onesHour = curHour % 10;
//   let tensMinute = Math.floor(curMinute / 10);
//   let onesMinute = curMinute % 10;

//   let digitIndices = [tensHour, onesHour, -1, tensMinute, onesMinute]; // Use -1 to represent the colon

//   for (let i = 0; i < digitIndices.length; i++) {
//     if (digitIndices[i] !== -1) {
//       let digit = digitIndices[i];
//       if (digit >= 0 && digit < digitPositions.length) {
//         let digitPos = digitPositions[digit];
//         if (digitPos) {
//           // Adjust spacing between tens hour and ones hour
//           let digitSpacing = 60; // Fixed spacing for all digits

//           for (let j = 0; j < 13; j++) { // Display only 13 squares for each digit
//             let ballIndex = i * 13 + j;
//             if (ballIndex >= 0 && ballIndex < allBalls.length) {
//               let ball = allBalls[ballIndex];
//               let ballPos = digitPos[j % digitPos.length]; // Reuse digit positions
//               if (ball && ballPos) {
//                 ball.originalX = ballPos.x + i * digitSpacing * 4;
//                 ball.originalY = ballPos.y;

                
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// }

// function mousePressed() {
//   dropAll = !dropAll; // Toggle dropping state
// }


// // function draw() {
// //   background(220);

  
// //   // Initialize the balls for the current time
// //   let curHour = hour();
// //   let curMinute = minute();
// //   let curSecond = second();

// //   let tensHour = Math.floor(curHour / 10);
// //   let onesHour = curHour % 10;
// //   let tensMinute = Math.floor(curMinute / 10);
// //   let onesMinute = curMinute % 10;

// //   let digitIndices = [tensHour, onesHour, -1, tensMinute, onesMinute]; // Use -1 to represent the colon

// //   // Adjust spacing between tens hour and ones hour
// //   let digitSpacing = 200;

// //   for (let i = 0; i < digitIndices.length; i++) {
// //     if (digitIndices[i] === -1) {
// //       // If it's a colon
// //       let colonX = (i - 1) * digitSpacing * 2.7 + digitPositions[0][0].x; // Adjusted x position for the colon
// //       let colonY = digitPositions[0][0].y + 142; // Adjusted y position for the colon
// //       textAlign(CENTER, CENTER);
// //       textSize(142);
// //       fill(255, 0, 0);
// //       text(":", colonX, colonY); // Draw colon as text element
// //     } else {
// //       // If it's a digit
// //       let digit = digitIndices[i];
// //       let digitPos = digitPositions[digit];

// //       // Adjust spacing between tens hour and ones hour
// //       let digitSpacing = i === 0 || i === 9 ? 60 : 84;

// //       for (let j = 0; j < digitPos.length; j++) {
// //         let ballIndex = i * digitPos.length + j;
// //         let digitX = (i - 1) * digitSpacing * 3 + digitPos[j].x + digitSpacing; // Adjusted x position for the digit

// //         if (i === 0 || i === 1 || i === 4 || i === 3) {
// //           digitX += 175; // Adjust this value as needed
// //         }

// //         let digitY = digitPos[j].y; // Adjusted y position for the digit

// //         allBalls[ballIndex].draw();

// //         if (dropAll) {
// //           //🎨 if dropAll is true
// //           allBalls[ballIndex].setDrop(true); //🎨 the ball would change to drop mode
// //         }

// //         allBalls[ballIndex].update(digitX, digitY);
// //       }
// //     }
// //   }
// //   for (let droppedBall of droppedBalls) {
// //     droppedBall.draw();
// //     droppedBall.update();
// // }
// // 
// // }


// // function mousePressed() {
// //   dropAll = !dropAll; // Toggle dropping state

// // }




//     // function draw() {
//     //   background(220);
    
//     //   // Initialize the balls for the current time
//     //   let curHour = hour();
//     //   let curMinute = minute();
      
//     //   let tensHour = Math.floor(curHour / 10);
//     //   let onesHour = curHour % 10;
//     //   let tensMinute = Math.floor(curMinute / 10);
//     //   let onesMinute = curMinute % 10;
      
//     //   let digitIndices = [tensHour, onesHour, tensMinute, onesMinute];
//     //   let digitSpacing = 300;

      
//     //   for (let i = 0; i < digitIndices.length; i++) {
//     //     let digit = digitIndices[i];
//     //     let digitPos = digitPositions[digit];
        
//     //     for (let j = 0; j < digitPos.length; j++) {
//     //       let ballIndex = i * digitPos.length + j;
//     //       allBalls[ballIndex].draw();
//     //       allBalls[ballIndex].update(digitPos[j].x + i * digitSpacing + 100, digitPos[j].y); // Adjusted x position
//     //     }
//     //   }
//     // }
    
