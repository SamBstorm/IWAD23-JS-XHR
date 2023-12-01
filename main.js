const main = document.querySelector('main');

const getData = function(){

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){
        if(this.readyState == 4){
            console.log(`Status HTTP : ${xhr.status}`);
            if (xhr.status == 200 || xhr.status == 0) {
                let data = JSON.parse(xhr.responseText);
                for (const person of data.results) {
                    generateCard(person);
                }
            }
        }
    } ;

    xhr.open('GET','https://randomuser.me/api/?nat=fr&results=5',true);

    xhr.send();
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

getData();
