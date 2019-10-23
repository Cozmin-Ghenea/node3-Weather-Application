const weatherForm = document.querySelector("form")
const searchValue = document.querySelector("input")
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = searchValue.value;
    if (location == "") {
        messageTwo.textContent ="Error: "+ " please don't let this input empty"
    } else {
        messageOne.textContent  ='Loading...'
        messageTwo.textContent = ""
        fetch('http://localhost:3000/weather?address=' + location).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    messageOne.textContent = ""
                    messageTwo.textContent ="Error: "+ data.error
                } else {
                    messageOne.textContent = 'Location:' + data.location
                    messageTwo.textContent  ="The Forecast : " + data.forecastData;
                }
            })
        })
    }
})