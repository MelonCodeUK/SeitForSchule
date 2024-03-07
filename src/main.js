function buttonHref(href) {
  // Выполняем перенаправление на другой сайт
  window.location.href = href;
}
function getWeather() {
  var cityName = document.getElementById("cityInput").value;
  if (cityName.trim() !== "") {
    document.getElementById("content").innerHTML = "<h1>herunterladen...</h1>";

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=de&appid=7dfa12283ea29c1d35afdb744da914a1`
    )
      .then((response) => {
        if (!response.ok) {
          // Обработка ошибки
          if (response.status === 404) {
            throw new Error("Stadt nicht gefunden.");
          } else {
            throw new Error(`Ошибка сервера: ${response.status}`);
          }
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        // Отображаем только необходимые данные
        var temperatureCelsius = data.main.temp - 273.15;
        var feelsLikeCelsius = data.main.feels_like - 273.15;

        var weatherDataHtml = `
          <h1 class="schonText" style="float: right">Stadt: ${data.name}</h1>
          <h3 class="schonText">Temperatur: ${temperatureCelsius.toFixed(
            2
          )}°C</h3>
          <h3 class="schonText">Es fühlt sich an wie: ${feelsLikeCelsius.toFixed(
            2
          )}°C</h3>
          <h3 class="schonText">Luftfeuchtigkeit: ${data.main.humidity}%</h3>
          <h3 class="schonText">Windgeschwindigkeit: ${data.wind.speed} м/с</h3>

        `;

        // Выводим результат на страницу
        console.log(weatherDataHtml);
        document.getElementById("content").innerHTML = weatherDataHtml;
      })
      .catch((error) => {
        console.log("Ошибка при выполнении запроса:", error.message);
        document.getElementById(
          "content"
        ).innerHTML = `<p class="schonText">${error.message}</p>`;
      });
  } else {
    alert("Bitte geben Sie den Namen der Stadt ein.");
  }
}
function scrollvaluta() {
  const apiUrl = "https://api.exchangerate-api.com/v4/latest/EUR";

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.rates);
      const select1 = document.getElementById("scrollValutaSelect");
      const select2 = document.getElementById("scrollValutaSelect1");
      let options = "";
      for (let currency in data.rates) {
        options += `<option value="${currency}">${currency}</option>`;
      }
      select1.innerHTML = options;
      select2.innerHTML = options;
    })
    .catch((error) => console.error("Error:", error));
}
function convertValute() {
  const select1 = document.getElementById("scrollValutaSelect").value;
  const select2 = document.getElementById("scrollValutaSelect1").value;
  const num = document.getElementById("num").value;
  const result = document.getElementById("result");
  const apiUrl = `https://api.exchangerate-api.com/v4/latest/${select1}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      let returnSumma;
      result.innerHTML = `<p>${num}${select1}->${
        data.rates[select2] * num
      }${select2}</p>`;
    })
    .catch((error) => console.error("Error:", error));
}
