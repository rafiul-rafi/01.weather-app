const weatherData = document.querySelector('form')
const searchData = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
messageOne.textContent = 'Loading Data......'
messageTwo.textContent = ''
weatherData.addEventListener('submit',(event)=>{
    event.preventDefault()
    const location = searchData.value
    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
           messageOne.textContent = data.error
           }else{
                 messageOne.textContent = data.location
                 messageTwo.textContent = data.forecast

                }
    })
  })
})