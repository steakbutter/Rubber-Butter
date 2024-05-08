//Variables
const buttonEl = document.getElementById ('click1');
const buttonEl2 = document.getElementById ('click2');
const textStory = document.getElementById ('changeText');
const imageContainer = document.getElementById ('kitten');
const modalButton = document.getElementById("modalThing");
const modalCard = document.querySelector(".modal");

let life = 100;

const storyArray = ['a', 'b', 'c', 'd'];
let storyCount = 0

//Functions
function changeContent(event)
{
    //Calls for the function that lowers life first
    //life = 0;

    if(life === 0)
    {
        textStory.textContent = "Game Over Placeholder"
        changeImage()
        return
    }

    changeText()
    changeImage()

}

function changeText() {
    if(storyCount < storyArray.length)
    {
        textStory.textContent = storyArray[storyCount];
        storyCount++
    }
    console.log(storyCount)
}

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
    modalCard.classList.add("is-active")

    //When the close button is pushed
    //modalCard.classList.remove("is-active")
}

//Add a function that lowers the life


//Buttons and Event Listeners
modalButton.addEventListener("click",handleModal);
buttonEl.addEventListener('click', changeContent);
buttonEl2.addEventListener('click', changeContent);