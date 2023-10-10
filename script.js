const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

// The value of mins, secs, millisecs are set to zero, which means these values will be zero when the countdown starts
let [milliseconds,seconds,minutes] = [0,0,0];
// int serves as the variable that will contain the setInterval method, which calls a function at specified intervals
// For now, int will be set to null, meaning that it does not have a value now, but will later on
let int = null; 

// Run the timer 
// Reference: https://dev.to/shantanu_jana/create-a-simple-stopwatch-using-javascript-3eoo
function runTimer() {
  // As the timer runs, the value of milliseconds will continue to increase by 10
  milliseconds+=10; 
  
  // 1000 ms = 1 sec
  // When the value of milliseconds is equal to 1000, the millisecond cell in [milliseconds,seconds,minutes] will contain a zaero, and the number of seconds will increase by one
  if(milliseconds == 1000){
    milliseconds = 0;
    seconds++;
  }
    
    // 60 sec = 1 min
    // When the value of seconds is equal to 60, the minute cell in [milliseconds,seconds,minutes] will contain a zero, and the number of minutes will increase by one
    if(seconds == 60){
      seconds = 0;
      minutes++;
    }
  
  // A zero will be to the value of minutes, seconds, and milliseconds if it is less than or equal to 9
  // That value will be stored in m, s, and ms, respectively. 
  let m = minutes <= 9 ? "0" + minutes : minutes;
  let s = seconds <= 9 ? "0" + seconds : seconds;
  let ms = milliseconds <= 9 ? "00" + milliseconds : milliseconds;

  // The value of theTimer variable will be updated as follows, as the timer is running
  // Instead of the default value of 00:00:00 that the theTimer value has, it will be updated with whatever value is stored in m, s, and ms
  theTimer.innerHTML = ` ${m} : ${s} : ${ms} `;

}

// Match the text entered with the provided text on the page:
function checkText() {
  // Reference: https://www.w3schools.com/jsref/prop_text_value.asp
  // The variable inputText is equal to the value of the testArea
  // The value property returns the value of the value attribute, which is testArea, of a text field.
  let inputText = testArea.value;
  // Reference: https://www.w3schools.com/jsref/jsref_split.asp
  // The split function splits the characters, including spaces, of the inputText string into an array called inputTextArr
  let inputTextArr = inputText.split("");
  // The variable providedText is equal to the value of the originText variable 
  let providedText = originText;
  // The split function splits the characters, including spaces, of the originText string into an array called providedTextArr
  let providedTextArr = originText.split("");
  
  // For this function, I iterated through each of the arrays to compare each array element at a specific index.
  // First, the length of the two arrays are compared. If the lengths are not equal to each other, the function proceeds into the if statement
  // I subtracted 32 from the length of the providedTextArr because I noticed that the array contained white spaces for the first 16 elements and the last 16 elements 
  if (inputTextArr.length !== (providedTextArr.length-32)){
    // For the for loop, I used two variables to keep track of indexes; i is used to keep track of the indexes for the inputTextArr and n is used to keep track of the indexes for the providedTextArr
    // i is set to 0, so that the loop begins at the beginning of the area
    // n is set to 17, so that the loop starts at index 17 for the providedTextArr, leaving out the white spaces
    for(let i=0, n=17; i<inputTextArr.length; i++, n++) {
      // if the specified indexes of each of the array do/do not match, the box shadow value of testWrapper will change
      // Reference: https://www.w3schools.com/cssref/css3_pr_box-shadow.php
      // The box shadow property adds a shadow to the element specified which is the testWrapper
      // 10px is the horizontal offset of the shadow; it puts the shadow on the right side of the box
      // 5px is the vertical offset of the shadow; it puts the shadow below the box
      // 5px is the blur radius of the shadow 
      // red or green will be the color of the shadow
      if(inputTextArr[i] != providedTextArr[n]) {
        testWrapper.style.boxShadow = "10px 5px 5px red"; // red if the specified indexes do not match 
      } else {
        testWrapper.style.boxShadow = "10px 5px 5px green"; // green if the specified indexes match 
      }
      }
  } else {
    // Once the for loop finishes, the following takes place
    clearInterval(int); // the clearInterval() method will clear the timer set in the int variable
    // Reference: https://www.w3schools.com/cssref/css3_pr_flex-grow.php
    // The flex-grow property specifies how much the item will grow relative to the rest of the flexible items inside the same container.
    // The reset button within this flex container, will grow
    // The other item within the same flex container is the timer, which will not grow at all (the flexGrow property is set to zero)
    resetButton.style.flexGrow = "1"; // the flexGrow property of the resetButton element is set to 1;
  }
}

// Start the timer:
// Reference: https://dev.to/shantanu_jana/create-a-simple-stopwatch-using-javascript-3eoo
function start() {
  // This function will first check if the variable int is set to null. If not, the clearInterval() method will clear whatever timer was    set with the variable int. The countdown value will be 0.
	if(int!==null){
        clearInterval(int);
    }
    // The int variable will contain the setInterval method, which calls the runTimer function every 10 milliseconds
    int = setInterval(runTimer,10);
}

// Reset everything:
// Reference: https://dev.to/shantanu_jana/create-a-simple-stopwatch-using-javascript-3eoo
function reset() {
  // When the reset button is clicked, following will occur:
  clearInterval(int); // the clearInterval() method will clear the timer set in the int variable
  [milliseconds,seconds,minutes] = [0,0,0,0]; // the value of mins, secs, and millisecs will become zero
	theTimer.innerHTML = "00:00:00"; // the time in the display will return to the previous state, which is 00:00:00
  testArea.value = ""; // the text value of the testArea method, which is what the user typed, will be cleared
	testWrapper.style.borderColor = "grey"; // the border color value of testWrapper, which is where the user typed in the provided text,    will become grey 
  resetButton.style.flexGrow = null; // the flexGrow value of resetButton will be set to null
  testWrapper.style.boxShadow = null; // the boxShadow value of testWrapper will be set to null
}

// Event listeners for keyboard input and the reset button:
// Reference: https://www.w3schools.com/js/js_htmldom_eventlistener.asp
// The addEventListener() method attaches an event handler to a specified element. When a user interacts with this specified element, the event handler will take place. The event handler dictates the actions that follows the event (how the user interacts with the element). 
// The addEventListener() method will call the start() function when the "keypress" event is triggered in the testArea element, which is when the user presses a key down)
testArea.addEventListener("keypress", start, false); 
// The addEventListener() method will call the checkText() function when the "keyup" event is triggered in the testArea element, which is after the user presses a key down)
testArea.addEventListener("keyup", checkText, false);
// The addEventListener() method will call the reset() function when the "click" event is triggered in the resetButton element, which is when the user clicks the reset button)
resetButton.addEventListener("click", reset, false);