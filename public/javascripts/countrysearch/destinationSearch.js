const inputBank = document.getElementById("destination");
const banksList = document.querySelector("#banks-list-container");
banksList.style.textAlign = "left";
const banksNames = [
    "ABSA",
    "Capitect", 
    "FNB",
    "Ned Bank",
    "Shoprite",
    "Spar",
    ];

    banksList.style.display = "none";

inputBank.addEventListener("click", (e) => {
  if (e.target.value === "") {
    banksList.style.display = "block";
    const allCountriesList = banksNames.map((country) => {
      const listItem = document.createElement("li");
      const radioInput = document.createElement("input");
      radioInput.type = "radio";
      radioInput.name = "country";
      radioInput.value = country;
      // listItem.style.textAlign = "left";
      listItem.appendChild(radioInput);
      listItem.appendChild(document.createTextNode(country));
      return listItem;
    });
    banksList.innerHTML = "";
    banksList.append(...allCountriesList);
  }
});

inputBank.addEventListener("input", (e) => {
  const userInput = e.target.value.toLowerCase();
  if (e.target.value !== "") { // check if input is not empty
    banksList.style.display = "block"; // show the list when user starts typing
    const filteredNames = banksNames.filter((country) => country.toLowerCase().includes(userInput));
    banksList.innerHTML = "";
    
    if (filteredNames.length > 0) {
      filteredNames.forEach((country) => {
        const listItem = document.createElement("li");
        const radioInput = document.createElement("input");
        radioInput.type = "radio";
        radioInput.name = "country";
        radioInput.value = country;
        // listItem.style.textAlign = "left";
        listItem.appendChild(radioInput);
        listItem.appendChild(document.createTextNode(country));
        banksList.style.overflow = "scroll";
        banksList.appendChild(listItem);
      });
    } else {
      const listItem = document.createElement('li');
      listItem.appendChild(document.createTextNode("No match found"));
      banksList.appendChild(listItem);
    }
  } else {
    banksList.style.display = "none";
  }
});


banksList.addEventListener("click", (e) => {
  if (e.target.tagName === "LI" && e.target.textContent !== "No match found") {
    const radioInput = e.target.querySelector("input[type='radio']");
    radioInput.checked = true;
    inputBank.value = radioInput.value;
    setTimeout(() => {
      banksList.innerHTML = "";
      banksList.style.display = "none";
      // countryList.style.textAlign = "left";
    }, 1000);
  } else if (e.target.tagName === "INPUT" && e.target.type === "radio") {
    const selectedCountry = e.target.value;
    inputBank.value = selectedCountry;
    setTimeout(() => {
      banksList.innerHTML = "";
    }, 1000);
  }
});

document.addEventListener('click', function(event) {
				if (event.target.id !== "destination") {
						setTimeout(() => {
						banksList.style.display = "none";
					}, 500)
					} else {
						//countryList.style.display = "block";
				}
			}, false);
