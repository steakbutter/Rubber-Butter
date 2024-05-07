const buttonEl = document.getElementById ('click1');
const buttonEl2 = document.getElementById ('click2');
const textStory = document.getElementById ('changeText');
const imageContainer = document.getElementById ('kitten');

function changeContent() {
    textStory.innerHTML = '<div> hello, I changed when you clicked the button </div>';
}

buttonEl.addEventListener('click', changeContent);
buttonEl2.addEventListener('click', changeContent);


  fetch("http://shibe.online/api/cats?count=[1-100]", 
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

