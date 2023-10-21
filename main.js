let textContent = document.getElementById("text-content");
let typingSection = document.getElementById("text-content").parentElement;
let validChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyxz0123456789!@#$%^&*()_+=-{}[]:";,./<>?';
let elementArray = [];

const numberOfWordsToSelect = 50;
const timer = document.getElementById("timer");
const cursor = document.createElement('div');
cursor.setAttribute('id', 'cursor');

window.setInterval(() => {
    if (!elementArray.length) {
        typingSection.insertBefore(cursor, textContent);
        cursor.style.top = "13px";
    }
}, 450);


function getRandomWords(array, num) {
    const shuffled = array.slice();
    let selectedWords = [];
    let currentIndex = array.length;

    while (currentIndex > 0 && selectedWords.length < num) {
        const randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [shuffled[currentIndex], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[currentIndex]]
    }

    selectedWords = shuffled.slice(0, num);

    return selectedWords;
}

function setWords() {
    if (elementArray.length == 0) {
        typingSection.insertBefore(cursor, textContent);
        cursor.style.top = "10px";
    }

    //const reponse = await fetch(`https://random-word-api.herokuapp.com/word?number=40&&lang=en`);
    const wordList = getRandomWords(wordArray, numberOfWordsToSelect);
    for (let i = 0; i < wordList.length; i++) {
        for (let j = 0; j < wordList[i].length; j++) {
            textContent.innerHTML += `<span>${wordList[i][j]}</span>`;
        }
        textContent.innerHTML += `<span> </span>`;
    }
}

document.body.addEventListener("keydown", ev => {

    if (typingSection.children[0].id === "cursor" && elementArray.length < 1) {
        typingSection.removeChild(typingSection.children[0]);
        console.log(typingSection.children[0]);
    }
 
    console.log(textContent.children.length);
    console.log(elementArray.length);

    if (elementArray.length == (textContent.children.length - 1)) {
        elementArray = [];
        textContent.innerHTML = "";

        setWords();
        return;
    }

    //console.log("Pressed: " + ev.key + ", Required: " + textContent.children[elementArray.length].textContent); // determine the pressed key and required key

    if (ev.key == "Backspace") { // if entered key is backspace and there are elements in element array...

        if (elementArray.length) {
            // removing cursor from current element i.e. lastElementChild
            elementArray[elementArray.length - 1].removeChild(elementArray[elementArray.length - 1].lastElementChild)

            // then we proceed with backspace event...

            // we first clear the classlist and then pop the element from classlist
            elementArray[elementArray.length - 1].classList = "";
            elementArray.pop();
            
            // after removing the element we append the cursor to the current element
            console.log(elementArray[elementArray.length - 1].children[0]);
            elementArray[elementArray.length - 1].innerHTML += `<div id="cursor"></div>`; 
        }

    } else { // if enetered key is not backspace...

        // we determine the char from the DOM and create a char element for the <span> char </span>
        let char = textContent.children[elementArray.length].textContent;
        let charEle = textContent.children[elementArray.length];

        if (validChars.includes(ev.key)) { // we check if the enetered key is valid char or not (" " or "Spacekey" is not a valid char, we determine the event for that separetly)
            if (ev.key === char) {
                // if the char matches the entered key we add .whiteChar class to it and push the whole tag into elementArray
                charEle.classList.add("whiteChar");
                elementArray.push(charEle);
            } else {
                // else we add .redChar class to it and push the whole tag into elementArray
                charEle.classList.add("redChar");
                elementArray.push(charEle);
            }
        } else if (char == " ") { // if char in the dom is a space between two words, we do not do anything and just push the element to the array
            elementArray.push(charEle);
        }

        // after doing everything we determine the previous element in order to remove the cursor
        if (charEle.previousElementSibling) {
            charEle.previousElementSibling.removeChild(charEle.previousElementSibling.lastElementChild);
        }

        // then we insert the cursor onto the current element
        charEle.innerHTML += `<div id="cursor"></div>`;
    }
})

// window.setInterval(() => {
//     timer.textContent = timer.textContent - 1;
// }, 1000);

setWords();