const error = document.getElementById("error")
const phoneContainer = document.getElementById("phone-container")

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
        error.innerHTML = ""
    }
}

/* search phone and show details */
const displayPhone = phones => {
    const phonesData = phones.data
    if (phones.status === false) {
        error.innerHTML = `<h2>Result Not Founded!!</h2>`
    }
    else {
        phoneContainer.textContent = ""
        phonesData.forEach(phone => {
            const div = document.createElement("div")
            div.classList.add("col")
            div.innerHTML = `
            <div class="card shadow">
                    <img src="${phone.image}" class=" w-75 mx-auto card-img-top mt-3" alt="...">
                <div class="card-body mx-auto">
                    <h3 class="card-title">${phone.phone_name}</h3>
                    <h4 class="card-text mb-3">${phone.brand}</h4>
                    <button onclick="showDetails('${phone.slug}')" type="button" class="btn btn-info fs-5">See Details</button>
                </div>
            </div>
            `
            phoneContainer.appendChild(div)
        });
    }
}
/* Show full details of phone by using id */

const showDetails = phonesId => {
    const url = ` https://openapi.programming-hero.com/api/phone/${phonesId}`
    console.log(url)
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetails(data.data))
}

const displayPhoneDetails = phones => {
    console.log(phones.others)

    phoneContainer.textContent = ""
    const div = document.createElement("div")
    div.innerHTML = `
        <div class="card shadow">
                 <img src="${phones.image}" class=" w-75 mx-auto card-img-top mt-3" alt="...">
            <div class="card-body mx-auto">
                <h3 class="card-title">${phones.name}</h3>
                <h4 class="card-text mb-3">${phones.releaseDate}</h4>

                <div class="w-75">
                <h4>Main Feature</h4>
                <p>ChipSet: ${phones.mainFeatures.chipSet}</p>
                <p>Display: ${phones.mainFeatures.displaySize}</p>
                <p>Storage: ${phones.mainFeatures.memory}</p>
                </div>


                <div class="w-75">
                <h4>Sensor Info</h4>
                <p>Sensor: ${phones.mainFeatures.sensors}</p>
                </div>
                

                <div class="w-75">
                <h4>Others Info</h4>
                <p>WALN: ${phones.others.WLAN}</p>
                <p>Bluetooth: ${phones.others.Bluetooth}</p>
                <p>GPS: ${phones.others.GPS}</p>
                <p>NFC: ${phones.others.NFC}</p>
                </div>


            </.div>
        </div>  
        
        
      
     `
    phoneContainer.appendChild(div)
}