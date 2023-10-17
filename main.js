let textContent = document.getElementById("text-content");
let newArray = [];
let validChars = /[qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM,./;'"]/;
let currentWord = 0;
let currentChar = 0;

async function setWords() {
    const reponse = await fetch(`https://random-word-api.herokuapp.com/word?number=35&&lang=en&&length=5`);
    const wordList = await reponse.json();
    
    console.log(wordList);
    for (let i = 0; i < wordList.length; i++) {
        // for (let j = 0; wordList[i].length; j++) {
        //     textContent.innerHTML += `<span>${wordList[i][j]}</span>`;
        // }
        textContent.innerHTML += `<span>${wordList[i]}</span>`;
        textContent.innerHTML += `<span> </span>`;
    }
}

setWords();