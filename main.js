const typedContent = document.querySelector(".typed-content");
let textContent = document.querySelector(".text-content ").textContent;

let textArray = textContent.split(" ");

function insertChar(val) {
    typedContent.textContent += val;
}

function removeChar() {
    typedContent.textContent = typedContent.textContent.slice(0, -1);
}

document.body.addEventListener('keypress', ev => {
    if (ev.key != "Enter") {
        insertChar(ev.key);
    }
});

document.body.addEventListener('keydown', ev => {
    if (ev.key == 'Backspace') {
        removeChar();
    }
})