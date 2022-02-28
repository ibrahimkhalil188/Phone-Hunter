const error = document.getElementById("error")

//Data load funtion and input validation only for string
const PhonesData = () => {
    const inputField = document.getElementById("input-field").value
    if (!isNaN(inputField)) {
        error.innerHTML = `<h2>Phone name can't be only number!!</h2>`
    }
    else {
        const url = `https://openapi.programming-hero.com/api/phones?search=${inputField}`
        fetch(url)
            .then(res => res.json())
            .then(data => displayPhone(data))
    }
}


const displayPhone = phones => {
    const phonesData = phones.data
    if (phones.status === false) {
        error.innerHTML = `<h2>Result Not Founded!!</h2>`
    }
    else {
        const phoneContainer = document.getElementById("phone-container")
        console.log(phonesData)
        phonesData.forEach(phone => {
            console.log(phone)
            const div = document.createElement("div")
            div.classList.add(col)
            div.innerHTML = `
            
            
            `

        });
    }
}