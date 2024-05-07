const buttonEl = document.getElementById ('click1');
const buttonEl2 = document.getElementById ('click2');
const textStory = document.getElementById ('changeText');
const imageContainer = document.getElementById ('kitten');
const modalButton = document.getElementById("modalThing");
const modalCard = document.querySelector(".modal");
console.log(modalButton)
function changeContent() {
    textStory.innerHTML = '<div> hello, I changed when you clicked the button </div>';
}

buttonEl.addEventListener('click', changeContent);
buttonEl2.addEventListener('click', changeContent);


function changeImage() {
    imageContainer.innerHTML = fetch("http://shibe.online/api/cats?count=[1-100]", 
    {
        cache: 'reload'
    })
    .then(function (response)
    {
        return response.json();
    })
    .then(function (data)
    {
        document.getElementById('kitten').src = data;
        console.log(data)
    });
}

function handleModal(){
modalCard.setAttribute("class","is-active")
}
modalButton.addEventListener("click",handleModal);
buttonEl.addEventListener('click', changeImage);
buttonEl2.addEventListener('click', changeImage);