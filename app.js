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
                    <img src="${phone.image}" class=" w-75 mx-auto card-img-top" alt="...">
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
    console.log(phones)
    phoneContainer.textContent = ""
    const div = document.createElement("div")
    div.innerHTML = `
        <div class="card shadow">
                 <img src="${phones.image}" class=" w-75 mx-auto card-img-top" alt="...">
            <div class="card-body mx-auto">
                <h3 class="card-title">${phones.name}</h3>
                <h4 class="card-text mb-3">${phones.releaseDate}</h4>
                
                <div class="accordion accordion-flush" id="accordionFlushExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id="flush-headingOne">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
       Main Feature
      </button>
    </h2>
    <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">
                <p>ChipSet: ${phones.mainFeatures.chipSet}</p>
                <p>Display: ${phones.mainFeatures.displaySize}</p>
                <p>Storage: ${phones.mainFeatures.memory}</p>

      </div>
    </div>
  </div>
            </div>
        </div>
     `
    phoneContainer.appendChild(div)
}