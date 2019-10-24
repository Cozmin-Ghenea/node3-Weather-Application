const weatherForm = document.querySelector("form")
const searchValue = document.querySelector("input")
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')
const messageFive = document.querySelector('#message-5')
const messageSix = document.querySelector('#message-6')
const messageSeven = document.querySelector('#message-7')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = searchValue.value;
    if (location == "") {
        messageTwo.textContent ="Error: "+ " please don't let this input empty"
    } else {
        messageOne.textContent  ='Loading...'
        messageTwo.textContent = ""
        messageThree.textContent= ""
        messageFour.textContent= ""
        messageFive.textContent= ""
        messageSix.textContent= ""
        messageSeven.textContent= ""
        fetch('/weather?address=' + location).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    messageOne.textContent = ""
                    messageTwo.textContent ="Error: "+ data.error
                } else {
                    messageOne.textContent = 'Locatia :' + data.location
                    messageTwo.textContent  ="Prognoza meteo pentru ziua de astazi : " + data.Progrnoza;
                    messageThree.textContent= "Temperatura in momentul acesta este de : " + data.Temperatura +" grade Celsius";
                    messageFour.textContent= "Sanse de precipitatii de "+ data.Precipitatii + " %"
                    messageFive.textContent= "Umiditatea va fi de "+ data.Umiditate + " %"
                    messageSix.textContent= "Temperatura maxima in decursul zilei va fi de "+ data.Maxima +" grade Celsius"
                    messageSeven.textContent="Temperatura minima in decursul zilei va fi de "+ data.Minima +" grade Celsius"
                }
            })
        })
    }
})