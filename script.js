class Ball {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    // Add any additional properties or methods here
  }

  draw() {
    // Implement the drawing logic for the ball
    fill(this.color);
    rect(this.x, this.y, 55, 55); // Example size, adjust as needed
  }

  update(x, y) {
    // Update the position of the ball
    this.x = lerp(this.x, x, 0.1);
        this.y = lerp(this.y, y, 0.1);
  }

}

let allBalls = [];
let curMinute = 0;

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
            { x: 190.54 , y: 196.5 },
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
          { x: 342.54, y: 433.39},
          { x: 293.54, y: 468.84 },
          { x: 233.87, y: 462.72 },
          { x: 194.55, y: 418.04 },
      ]
    ];
    
    function setup() {
      createCanvas(windowWidth, windowHeight);
    
      // Initialize the balls with random positions
      for (let i = 0; i < digitPositions.length; i++) {
        for (let j = 0; j < digitPositions[i].length; j++) {
          allBalls.push(new Ball(digitPositions[i][j].x, digitPositions[i][j].y, color(255, 0, 0))); // Example color, adjust as needed
        }
      }
    }
    
  
    function draw() {
      background(220);
    
      // Initialize the balls for the current time
      let curHour = hour();
      let curMinute = minute();
      
      let tensHour = Math.floor(curHour / 10);
      let onesHour = curHour % 10;
      let tensMinute = Math.floor(curMinute / 10);
      let onesMinute = curMinute % 10;
      
      let digitIndices = [tensHour, onesHour, -1, tensMinute, onesMinute]; // Use -1 to represent the colon
    
      // Adjust spacing between tens hour and ones hour
      let digitSpacing = 200;
    
      for (let i = 0; i < digitIndices.length; i++) {
        if (digitIndices[i] === -1) { // If it's a colon
          let colonX = (i - 1) * digitSpacing * 2.7 + digitPositions[0][0].x ; // Adjusted x position for the colon
          let colonY = digitPositions[0][0].y + 142; // Adjusted y position for the colon
          textAlign(CENTER, CENTER);
          textSize(142);
          fill(255, 0, 0);
          text(":", colonX, colonY); // Draw colon as text element
        } else { // If it's a digit
          let digit = digitIndices[i];
          let digitPos = digitPositions[digit];
    
          // Adjust spacing between tens hour and ones hour
          let digitSpacing = (i === 0 || i === 9) ? 60 : 84;
    
          for (let j = 0; j < digitPos.length; j++) {
            let ballIndex = i * digitPos.length + j;
            let digitX = (i - 1) * digitSpacing * 3 + digitPos[j].x + digitSpacing; // Adjusted x position for the digit
            
            if (i === 0 || i === 1 || i === 4 || i === 3  ) {
              digitX += 175; // Adjust this value as needed
            }
            
            let digitY = digitPos[j].y; // Adjusted y position for the digit
        

      
            allBalls[ballIndex].draw();
            allBalls[ballIndex].update(digitX, digitY);
    
        }
      }
    }
  }
  





    // function draw() {
    //   background(220);
    
    //   // Initialize the balls for the current time
    //   let curHour = hour();
    //   let curMinute = minute();
      
    //   let tensHour = Math.floor(curHour / 10);
    //   let onesHour = curHour % 10;
    //   let tensMinute = Math.floor(curMinute / 10);
    //   let onesMinute = curMinute % 10;
      
    //   let digitIndices = [tensHour, onesHour, tensMinute, onesMinute];
    //   let digitSpacing = 300;

      
    //   for (let i = 0; i < digitIndices.length; i++) {
    //     let digit = digitIndices[i];
    //     let digitPos = digitPositions[digit];
        
    //     for (let j = 0; j < digitPos.length; j++) {
    //       let ballIndex = i * digitPos.length + j;
    //       allBalls[ballIndex].draw();
    //       allBalls[ballIndex].update(digitPos[j].x + i * digitSpacing + 100, digitPos[j].y); // Adjusted x position
    //     }
    //   }
    // }
    
