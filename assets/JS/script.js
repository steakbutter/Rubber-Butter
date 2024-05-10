//Variables
const buttonEl = document.getElementById('click1');
const buttonEl2 = document.getElementById('click2');
const textStory = document.getElementById('changeText');
const imageContainer = document.getElementById('kitten');
const modalButton = document.getElementById("modalThing");
const modalCard = document.querySelector(".modal");
let saveUsername = document.getElementById('submit');

let life = 100;

const storyArray = ['a', 'b', 'c', 'd'];
let storyCount = 0

//Functions

function reloadUsername() {
    let username = localStorage.getItem("username")
    let usernameEl = document.querySelector(".card-header-title");

    if (username) {
        usernameEl.textContent = username;
    } else {
        usernameEl.textContent = "Username PlaceHolder"
    }
}

function changeContent(event) {
    //Calls for the function that lowers life first

    //life = 0;

    if (life === 0) {
        textStory.textContent = "Game Over Placeholder"
        changeImage()
        return
    }

    if (storyCount < storyArray.length) {
        changeText()
        changeImage()

    } else {
        let userChoice = confirm("Do you want to stay here or start over - ok = start over, cancel - to stay")
        console.log("The user picked this = ", userChoice)
        startOver(userChoice);
    }

}

function startOver(choice) {
    console.log(choice);
    if (choice === true) {
        storyCount = 0;
        changeText()
        changeImage()
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

function handleModal() {
    modalCard.classList.add("is-active")
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
        const $target = document.getElementById(modal);

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

    localStorage.setItem('username', userData);
    let usernameEl = document.querySelector(".card-header-title");
    usernameEl.textContent = userData;
})

reloadUsername();

//Add a function that lowers the life


//Buttons and Event Listeners
modalButton.addEventListener("click", handleModal);
buttonEl.addEventListener('click', changeContent);
buttonEl2.addEventListener('click', changeContent);
