const buttonEl = document.getElementById ('click1');
const buttonEl2 = document.getElementById ('click2');
const textStory = document.getElementById ('changeText');

function changeContent() {
    textStory.innerHTML = '<div> hello, I changed when you clicked the button </div>';
}

buttonEl.addEventListener('click', changeContent);
buttonEl2.addEventListener('click', changeContent);


