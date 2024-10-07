const baseUrl = `http://api.weatherapi.com/v1/current.json?key=a8c40169c1f04e5d94a142731241209&q=`;

let btn = document.querySelector("#btn");

async function fetchData() {
  try {
    let inputElement = document.querySelector("#search-input");
    let cityName = inputElement.value;
    let fullUrl = `${baseUrl}${cityName}`;

    let data = await fetch(fullUrl);

    if (!data.ok) {
      // Check if the response is OK
      let h2 = document.querySelector("h2");
      h2.innerText = "City not Found";
      throw new Error("City not found");
    }

    let response = await data.json();

    console.log(cityName);

    let img = document.querySelector("#img-icon");
    let weatherMsg = document.querySelector(".msg");
    let h2 = document.querySelector("h2");
    let temp = document.querySelector(".temp-value");
    let humidity = document.querySelector(".humidity-value");
    let wind = document.querySelector(".wind-value");

    // assigned weather data
    h2.innerText = response.location.country;
    temp.innerText = response.current.temp_c + "°C";
    humidity.innerText = response.current.humidity;
    wind.innerText = response.current.wind_kph + "Kph";
    img.classList.add("img-icon");
    img.setAttribute("src", response.current.condition.icon); // Correct usage
    weatherMsg.innerText = response.current.condition.text;

    console.log(response);
    inputElement.value = "";
    console.log("inputElement value is cleared", inputElement);

    console.log("wrong input");
  } catch (err) {
    console.log(err);
  }
}

btn.addEventListener("click", (event) => {
  event.preventDefault();
  fetchData();
  console.log("button was clicked");
});
