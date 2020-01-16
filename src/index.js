const DOGE_URL = "http://localhost:3000/pups"
let clickedValue = 'nothing';

function whoLetTheDogsOut(){
    return fetch(DOGE_URL)
        .then(resp => resp.json())
        .then(json => displayGoodBoys(json))
        .catch(error => console.log("Bork gone wrong!", error.message));
};

function displayGoodBoys(array){
    const findDogBar = document.getElementById('dog-bar');
    for (const val of array){
        let span = document.createElement('span')
        span.id = val.id
        span.innerText = val.name
        findDogBar.append(span)
    };
};

function dogInformation(){
    return fetch(DOGE_URL)
        .then(resp => resp.json())
        .then(json => displaySingleBoy(json))
        .catch(error => console.log("Bjork gone wrong!", error.message));
};

function badOrGood(bool){
    if (bool){ return 'Good Dog' }
    else { return 'Bad Dog' }
};

function displaySingleBoy(array){
    for (const val of array){
        if (val.name === clickedValue){
            let divCont = document.getElementById('dog-info');
            divCont.innerHTML = '';
            let img = document.createElement('img');
            let h2 = document.createElement('h2');
            let btn = document.createElement('button');
            img.src = val.image;
            h2.innerText = val.name;
            btn.innerText = badOrGood(val.isGoodDog);

            divCont.append(img, h2, btn);
        };
    };
};

function booleanBadOrGood(string){
    if (string === "Good Dog"){
        return "GD" 
    } else if (string === "Bad Dog"){
        return "BD"
    };
};

function clickListener(){
    return document.addEventListener('click', function(e){
        const findDogBar = document.getElementById('dog-bar');
        let btnString = e.target.innerText;
        if (e.target.parentElement == findDogBar){
            clickedValue = e.target.innerText;
            dogInformation();
        } else if (booleanBadOrGood(btnString) === "GD") {
            e.target.innerText = "Bad Dog"
        } else if (booleanBadOrGood(btnString) === "BD"){
            e.target.innerText = "Good Dog"
        }
    });
};

document.addEventListener("DOMContentLoaded", function(){
    console.log("Woof! Woof!");
    whoLetTheDogsOut();
    clickListener();
});