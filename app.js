const error = document.getElementById("error")
const phoneContainer = document.getElementById("phone-container")
const phoneDetails = document.getElementById("phone-Details")

//Data load funtion and input validation only for string
const PhonesData = () => {
    const inputdata = document.getElementById("input-field")
    const inputField = inputdata.value
    if (!isNaN(inputField)) {
        phoneContainer.textContent = ""
        error.innerHTML = `<h2>Phone name can't be only number!!</h2>`
        document.getElementById("footer").style.display = "none"
    }
    else {
        const url = `https://openapi.programming-hero.com/api/phones?search=${inputField}`
        fetch(url)
            .then(res => res.json())
            .then(data => displayPhone(data))
        error.innerHTML = ""
    }
    inputdata.value = ""
}

/* search phone and show details */
const displayPhone = phones => {
    document.getElementById("footer").style.display = "block"
    console.log(phones.data.length)
    const phonesData = phones.data.slice(0, 20)
    if (phones.status === false) {
        phoneContainer.textContent = ""
        error.innerHTML = `<h2>Result Not Founded!!</h2>`
        document.getElementById("footer").style.display = "none"
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

                    <button onclick="showDetails('${phone.slug}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">See Details</button>
  
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
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetails(data.data))
}
/* Show phone detail in a modal with accorndion */
const displayPhoneDetails = phones => {
    document.getElementById("footer").style.display = "none"
    phoneDetails.textContent = ""
    const sensor = phones.mainFeatures.sensors
    const div = document.createElement("div")
    div.innerHTML = `
        <div class="card shadow">
                 <img src="${phones.image}" class=" w-75 mx-auto card-img-top mt-3" alt="...">
            <div class="card-body mx-auto">
                <h3 class="card-title">${phones.name}</h3>
                <h4 class="card-text mb-3">${phones.releaseDate ? phones.releaseDate : "No release data found"}</h4>

        <div class="accordion accordion-flush" id="accordionFlushExample">
        <div class="accordion-item">
             <h2 class="accordion-header" id="flush-headingOne">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
             Main Feature
            </button>
            </h2>
            <div id="flush-collapseOne"         class="accordion-collapse collapse"         aria-labelledby="flush-headingOne"  data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">
         <p>ChipSet: ${phones.mainFeatures.chipSet}</p>
      <p>Display: ${phones.mainFeatures.displaySize}</p>
      <p>Storage: ${phones.mainFeatures.memory}</p></div>
        </div>
    </div>
    <div class="accordion-item">
        <h2 class="accordion-header" id="flush-headingTwo">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
         Sensor Info
        </button>
        </h2>
        <div id="flush-collapseTwo" class="accordion-collapse collapse"    aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
        <div class="accordion-body">
        <p>${sensor[0]}${sensor[1]}</p>
        <p>${sensor[2]}</p>
        <p>${sensor[3]}</p>
        <p>${sensor[4]}</p>
      </div>
    </div>
    </div>
    <div class="accordion-item">
            <h2 class="accordion-header"       id="flush-headingThree">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
             Others Info
             </button>
         </h2>
         <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
        <div class="accordion-body">
        <p>WLAN: ${phones?.others?.WLAN ? phones?.others?.WLAN : "Data not founded"}</p>
        <p>Bluetooth: ${phones?.others?.Bluetooth ? phones?.others?.Bluetooth : "Data not founded"}</p>
        <p>GPS: ${phones?.others?.GPS ? phones?.others?.GPS : "Data not founded"}</p>
        <p>NFC: ${phones?.others?.NFC ? phones?.others?.NFC : "Data not founded"}</p></div>
    </div>
    </div>
    </div>


</.div>
</div>  
`
    phoneDetails.appendChild(div)
    document.getElementById("footer").style.display = "block"
}