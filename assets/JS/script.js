//Variables
const buttonEl = document.getElementById ('click1');
const buttonEl2 = document.getElementById ('click2');
const textStory = document.getElementById ('changeText');
const imageContainer = document.getElementById ('kitten');
const modalButton = document.getElementById("modalThing");
const modalCard = document.querySelector(".modal");
console.log(modalButton)

let life = 100;

const storyArray = ['a', 'b', 'c', 'd'];
let storyCount = 0

// buttonEl.addEventListener('click', changeText);
// buttonEl2.addEventListener('click', changeText);

//Functions
function changeContent(event)
{
    //Calls for the function that lowers life first

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
modalCard.setAttribute("class","is-active")
}

//Add a function that lowers the life


modalButton.addEventListener("click",handleModal);
buttonEl.addEventListener('click', changeContent);
buttonEl2.addEventListener('click', changeContent);