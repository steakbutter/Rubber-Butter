//Variables
const buttonEl = document.getElementById('click1');
const buttonEl2 = document.getElementById('click2');
const textStory = document.getElementById('changeText');
const imageContainer = document.getElementById('kitten');
const modalButton = document.getElementById("modalThing");
const modalCard = document.querySelector(".modal");
const modalBody = document.querySelector(".modal-card-body")
let saveUsername = document.getElementById('submit');

let life = 100;

const storyArray = ['Oh no! A rare breed of cat is staring at you. He looks hungry and ready to attack.',
    'You made it out of the last fight, but as soon as you took a turn in Hoagy’s Alley, a wild cat appeared. She wants to take your eyes out.',
    'Somehow you are still alive, but just as you killed the last creature of evil, his cousin startled you and started chewing on your leg.',
    'You made it! you saved Mexicat city by reaching into the government’s secret hideout and activating the nuke that will destroy every stray cat alive, and possibly every human too.'];
let storyCount = 0

//Functions

function reloadUsername() {
    let username = localStorage.getItem("username")
    let usernameEl = document.querySelector(".card-header-title");

    if (username) {
        usernameEl.textContent = username;
    } else {
        usernameEl.textContent = "Username";
    }

    textStory.innerText = textStory.innerText.replace("username", username)
}

function changeContent() {
    if (life > 0) {
        lifeMod();
        if (storyCount >= storyArray.length || life === 0) {
            textStory.textContent = "Game Over, please refresh to start over";
            buttonEl.disabled = true;
            buttonEl2.disabled = true;
        } else {
            changeText();
            changeImage();
        }
    }

}

function changeText() {
    if (storyCount < storyArray.length) {
        textStory.textContent = storyArray[storyCount];
        storyCount++
    }
}

function changeImage() {
    imageContainer.innerHTML = fetch("https://shibe.online/api/cats?count=[1-100]",
        {
            cache: 'reload'
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            document.getElementById('kitten').src = data;
            console.log(data)
        });
}


function catFacts() {
    fetch("https://meowfacts.herokuapp.com/")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            document.getElementById('catFact').textContent = data.data;

            console.log(data);
        });
}


function openModal() {
    modalCard.classList.add("is-active");
    catFacts();
}

document.addEventListener('DOMContentLoaded', () => {

    function closeModal($el) {
        $el.classList.remove('is-active');
    }

    function closeAllModals() {
        (document.querySelectorAll('.modal') || []).forEach(($modal) => {
            closeModal($modal);
        });
    }


    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
        const modal = $trigger.dataset.target;
        const $target = document.querySelectorAll('.modal');

        $trigger.addEventListener('click', () => {
            openModal($target);
        });
    });

    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
        const $target = $close.closest('.modal');

        $close.addEventListener('click', () => {
            closeModal($target);
        });
    });

    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
        if (event.key === "Escape") {
            closeAllModals();
        }
    });
});

// Add function to get username into the local storage
saveUsername.addEventListener('click', function (event) {
    event.preventDefault()
    const username = document.getElementById('username');
    const userData = username.value
    let pastUser = localStorage.getItem('username')

    localStorage.setItem('username', userData);
    let usernameEl = document.querySelector(".card-header-title");
    usernameEl.textContent = userData;

    textStory.innerText = textStory.innerText.replace(pastUser, userData);
})

reloadUsername();

//Add a function that lowers the life
function lifeMod() {

    let randomHit = Math.floor(Math.random(1) * 40);
    life -= randomHit;
    if (life < 0) {
        life = 0;
    }
    let health = document.querySelector(".lifeCounter");
    health.textContent = life;
};




//Buttons and Event Listeners
modalButton.addEventListener("click", openModal);
buttonEl.addEventListener('click', changeContent);
buttonEl2.addEventListener('click', changeContent);