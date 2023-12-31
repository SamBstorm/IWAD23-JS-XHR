( async function(){
    const main = document.querySelector('main');

    const getData = function(url, callback, options = {method : 'GET', async : true, body : null}){

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){
    if(this.readyState == 4){
        console.log(`Status HTTP : ${xhr.status}`);
        if (xhr.status == 200 || xhr.status == 0) {
            let data = JSON.parse(xhr.responseText);
            callback(data);
        }
    }
    } ;

    xhr.open(options.method,
    url,
    options.async);

    xhr.send(options.body);
    }

    const generateCard = function(data){
    let cardDiv = document.createElement('div');
    cardDiv.classList.add('card');
    main.appendChild(cardDiv);
    let lastNameH2 = document.createElement('h2');
    lastNameH2.innerText = data.name.last;
    cardDiv.appendChild(lastNameH2);
    let firstNameH3 = document.createElement('h3');
    firstNameH3.innerText = data.name.first;
    cardDiv.appendChild(firstNameH3);
    cardDiv.appendChild(document.createElement('hr'));
    let birthdateP = document.createElement('p');
    birthdateP.innerText = new Date(data.dob.date).toDateString();
    cardDiv.appendChild(birthdateP);
    let addressAddress = document.createElement('address');
    addressAddress.innerHTML = `${data.location.street.name} ${data.location.street.number}`
                            + `<br>${data.location.postcode} ${data.location.city}`
                            + `<br>${data.location.country.toUpperCase()}`;
    cardDiv.appendChild(addressAddress);
    }

    const personsHandler = function(data){
    for (const person of data.results) {
    generateCard(person);
    }
    }

    //Soit via XHR :
    /*
    getData(
    'https://randomuser.me/api/?nat=fr&results=5',  //URL :    adresse permettant d'avoir accès au service API
    personsHandler,                                 //CALLBACK :    fonction exécuté lors de la récupération
                                                //              des données
    {method : "GET", body : null, async : true}    //OPTIONS :     objet JS avec les différentes options
                                                //(optionnel)   nécessaires (method, async, body, ...)
    );
    */
    //Soit via le fetch().then() avec fonction async:
    /*
    fetch('https://randomuser.me/api/?nat=fr&results=5').then(
        async function (reponse){
            personsHandler(await reponse.json());
        }
    );
    */

    //Soit via le fetch() avec variables intermédiaires :
    /*
    let reponse = await fetch('https://randomuser.me/api/?nat=fr&results=5');
    let json = await reponse.json();
    personsHandler(json);
    */
    //Soit via le fetch().then() avec .then() sur la reponse:
    fetch('https://randomuser.me/api/?nat=fr&results=5')
        .then(reponse => reponse.json()
                                    .then(data => personsHandler(data)));
})();

//Exemple différence entre fonction synchrone et asynchrone
/*
const functionSynchrone = function(){
    return "toto";
}

const functionAsynchrone = async function(){
    return "toto";
}

let syncValue = functionSynchrone();

let asyncValue = await functionAsynchrone();
*/