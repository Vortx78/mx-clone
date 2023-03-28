/* check how many characters counter */
let textArea = document.getElementById("iframe-code");

let characterCounter = document.getElementById("charCount");

const maxNumOfChars = 1000;

const countCharacters = () => { 
    let numOfEnteredChars = textArea.value.length;
  counter = numOfEnteredChars;
    characterCounter.textContent = numOfEnteredChars + "/1000";
  
    if (counter>80) { 
      characterCounter.style.color="red";
    } 
}

textArea.addEventListener("input", countCharacters);


/* fix textarea re-size */
function auto_grow(element) {
    element.style.height = "5px";
    element.style.height = (element.scrollHeight)+"px";
}