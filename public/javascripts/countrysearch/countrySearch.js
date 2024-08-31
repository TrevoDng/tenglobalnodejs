const input = document.getElementById("country-input");
const countryList = document.getElementById("countries-list-container");
countryList.style.textAlign = "left";
const names = [
            "Benin",
            "Brazzaville",
            "Burkina Faso",
            "Burundi",
            "Cameroon",
            "Cape Verde",
            "Central Africa Republic",
            "Chad",
            "Congo",
            "Coted'Ivoire",
            "DR Congo",     
            "Equatoria_ Guinea",
            "Gabon",
            "Gambia",
            "Ghana",
            "Guinea_Bissau",
            "Guinea",
            "Kenya",
            "Liberia",
            "Lesotho",
            "Malawi",
            "Mali",
            "Mozambique",
            "Niger",
            "Rwanda",
    	      "Sao Tome",
     	      "Senegal",
            "Sierra Leone",
            "South Africa",
            "South Sudan",
     	      "Tanzania",
    	      "Togo",
     	      "Uganda",
    	      "Zambia",
    	];

countryList.style.display = "none";

input.addEventListener("click", (e) => {
  if (e.target.value === "") {
    countryList.style.display = "block";
    const allCountriesList = names.map((country) => {
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
    countryList.innerHTML = "";
    countryList.append(...allCountriesList);
  }
});

input.addEventListener("input", (e) => {
  const userInput = e.target.value.toLowerCase();
  if (e.target.value !== "") { // check if input is not empty
    countryList.style.display = "block"; // show the list when user starts typing
    const filteredNames = names.filter((country) => country.toLowerCase().includes(userInput));
    countryList.innerHTML = "";
    
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
        countryList.style.overflow = "scroll";
        countryList.appendChild(listItem);
      });
    } else {
      const listItem = document.createElement('li');
      listItem.appendChild(document.createTextNode("No match found"));
      countryList.appendChild(listItem);
    }
  } else {
    countryList.style.display = "none";
  }
});


countryList.addEventListener("click", (e) => {
  if (e.target.tagName === "LI" && e.target.textContent !== "No match found") {
    const radioInput = e.target.querySelector("input[type='radio']");
    radioInput.checked = true;
    input.value = radioInput.value;
    setTimeout(() => {
      countryList.innerHTML = "";
      countryList.style.display = "none";
      // countryList.style.textAlign = "left";
    }, 1000);
  } else if (e.target.tagName === "INPUT" && e.target.type === "radio") {
    const selectedCountry = e.target.value;
    input.value = selectedCountry;
    setTimeout(() => {
      countryList.innerHTML = "";
    }, 1000);
  }
});

// countryList.addEventListener("click", (e) => {
//     if (e.target.tagName === "LI") {
//         const radioInput = e.target.querySelector("input[type='radio']");
//         radioInput.checked = true;
//         input.value = radioInput.value;
//         setTimeout(() => {
//             countryList.innerHTML = "";
//             countryList.style.display = "none";
//         }, 1000);
//     } else if (e.target.tagName === "INPUT" && e.target.type === "radio") {
//         const selectedCountry = e.target.value;
//         input.value = selectedCountry;
//         setTimeout(() => {
//         countryList.innerHTML = "";
//         }, 1000);
//     }
// });

document.addEventListener('click', function(event) {
				if (event.target.id !== "country-input") {
						setTimeout(() => {
						countryList.style.display = "none";
					}, 500)
					} else {
						//countryList.style.display = "block";
				}
			}, false);
