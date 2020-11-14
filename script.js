$(".btn").on("click", function () {
  //First define the API key
  var APIKey = "2cc514a953dcebe642cacc9f80f42e25";
  var searchText = $("#searchbox").val().trim();
  //variable to insert into the query URL to pull the correct data set
  var city = searchText;
  //Now define the URL we're using to talk to the database
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    APIKey +
    "&units=imperial";
  //Ajax Call
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    //set up divs to insert new info into, then append those to the card body
    var cardBody = $(".card-body");
    var cityNameDate = $("<h3>");
    //temperature <p>
    var tempDiv = $("<p>");
    var temp = response.main.temp;
    tempDiv.text("Temperature: " + temp + "°F");
    //humidity
    var humidDiv = $("<p>");
    humidDiv.text("Humidity: " + response.main.humidity);
    //wind speed
    var windDiv = $("<p>");
    windDiv.text("Wind Speed: " + response.wind.speed + " MPH");
    //
    //remove the "Find the weather in your city" text
    cardBody.empty();
    //add city name, date, and current weather icon
    cityNameDate.text(
      response.name + " (" + moment().format("l") + ")" ////////COME BACK TO FIX THIS
    );

    //append everything
    cardBody.append(cityNameDate, tempDiv, humidDiv, windDiv);
    fiveDay();
  });
});
//function to call the forcast api
function fiveDay() {
  //First define the API key
  var APIKey = "2cc514a953dcebe642cacc9f80f42e25";
  //define what city we are searching for
  var searchText = $("#searchbox").val().trim();
  var city = searchText;
  //Now define the URL we're using to talk to the database
  var queryURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&appid=" +
    APIKey +
    "&units=imperial&exclude=hourly,minutely";
  //Ajax call
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    //clear previous search data
    $(".five-day-row").empty();
    $(".day-one-card").empty();
    $(".day-two-card").empty();
    $(".day-three-card").empty();
    $(".day-four-card").empty();
    $(".day-five-card").empty();

    var forecastText = $("<h3>");
    forecastText.text("5-Day Forecast:");
    $(".five-day-row").append(forecastText);

    //define 5 day forecast cards and add classes and styles to get boxes
    var dayOne = $("<div>");
    var dayTwo = $("<div>");
    var dayThree = $("<div>");
    var dayFour = $("<div>");
    var dayFive = $("<div>");
    dayOne.addClass("card").attr("style", "width: 10rem");
    dayTwo.addClass("card").attr("style", "width: 10rem");
    dayThree.addClass("card").attr("style", "width: 10rem");
    dayFour.addClass("card").attr("style", "width: 10rem");
    dayFive.addClass("card").attr("style", "width: 10rem");

    //grab dates from response.list
    var datePlusOne = response.list[3].dt_txt;
    var datePlusTwo = response.list[11].dt_txt;
    var datePlusThree = response.list[19].dt_txt;
    var datePlusFour = response.list[27].dt_txt;
    var datePlusFive = response.list[35].dt_txt;

    //start adding info into the boxes
    var dateOne = $("<h5>").text(datePlusOne);
    var dateTwo = $("<h5>").text(datePlusTwo);
    var dateThree = $("<h5>").text(datePlusThree);
    var dateFour = $("<h5>").text(datePlusFour);
    var dateFive = $("<h5>").text(datePlusFive);

    //temperature of each projected day at noon
    var tempOne = $("<p>");
    tempOne.text("Temp: " + response.list[3].main.temp + "°F");
    var tempTwo = $("<p>");
    tempTwo.text("Temp: " + response.list[11].main.temp + "°F");
    var tempThree = $("<p>");
    tempThree.text("Temp: " + response.list[19].main.temp + "°F");
    var tempFour = $("<p>");
    tempFour.text("Temp: " + response.list[27].main.temp + "°F");
    var tempFive = $("<p>");
    tempFive.text("Temp: " + response.list[35].main.temp + "°F");

    //humidity
    var humOne = $("<p>");
    humOne.text("Hum: " + response.list[3].main.humidity + "%");
    var humTwo = $("<p>");
    humTwo.text("Hum: " + response.list[11].main.humidity + "%");
    var humThree = $("<p>");
    humThree.text("Hum: " + response.list[19].main.humidity + "%");
    var humFour = $("<p>");
    humFour.text("Hum: " + response.list[27].main.humidity + "%");
    var humFive = $("<p>");
    humFive.text("Hum: " + response.list[35].main.humidity + "%");

    //add info into the dayx divs
    dayOne.append(dateOne, tempOne, humOne);
    dayTwo.append(dateTwo, tempTwo, humTwo);
    dayThree.append(dateThree, tempThree, humThree);
    dayFour.append(dateFour, tempFour, humFour);
    dayFive.append(dateFive, tempFive, humFive);
    //append the cards
    $(".day-one-card").append(dayOne);
    $(".day-two-card").append(dayTwo);
    $(".day-three-card").append(dayThree);
    $(".day-four-card").append(dayFour);
    $(".day-five-card").append(dayFive);
  });
  var cityHistory = [];
  cityHistory.push(searchText);
  localStorage.setItem("city", cityHistory);

  for (i = 0; i < cityHistory.length; i++) {
    var pastSearch = localStorage.getItem(cityHistory[i]);
    var cityButton = $("<button>");
    cityButton.addClass("btn btn-primary");
    cityButton.text(pastSearch);
    $(".col-3 searchSection").append(cityButton);
  }
}
