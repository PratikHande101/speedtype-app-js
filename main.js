let textContent = document.getElementById("text-content");
let validChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyxz0123456789!@#$%^&*()_+=-{}[]:";,./<>?';
let currentChar = 0;
let elementArray = [];

async function setWords() {
    const reponse = await fetch(`https://random-word-api.herokuapp.com/word?number=40&&lang=en&&length=5`);
    const wordList = await reponse.json();
    
    console.log(wordList);
    for (let i = 0; i < wordList.length; i++) {
        for (let j = 0; j < wordList[i].length; j++) {
            textContent.innerHTML += `<span>${wordList[i][j]}</span>`;
        }
        textContent.innerHTML += `<span> </span>`;
    }
}

document.body.addEventListener("keydown", ev => {

    console.log("Pressed: " + ev.key + ", Required: " + textContent.children[currentChar].textContent);
    
    if (ev.key == "Backspace" && elementArray.length) {
        // console.log(elementArray[currentChar-1].classList);
        elementArray[elementArray.length - 1].classList = "";
        elementArray.pop();
    } else {
        let char = textContent.children[elementArray.length].textContent;
        let charEle = textContent.children[elementArray.length];

        console.log(charEle.classList.value);

        if (validChars.includes(ev.key)) {
            if (ev.key === char) {
                charEle.classList.add("whiteChar");
                elementArray.push(charEle);
            } else {
                charEle.classList.add("redChar");
                elementArray.push(charEle);
            }
        } else if (char == " ") {
            elementArray.push(charEle);;
        }
    }

    console.log(elementArray);
    console.log(currentChar);
})

setWords();