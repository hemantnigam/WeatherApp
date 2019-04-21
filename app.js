window.addEventListener("load", () => {
  let lat;
  let long;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      lat = position.coords.latitude;
      long = position.coords.longitude;
      getdata(lat, long);
    });
  }
});

function getdata(lat, long) {
  let location = document.getElementsByClassName("location")[0];
  let temperature_description = document.getElementsByClassName("temperature")[0];
  let summary_description = document.getElementsByClassName("description")[0];  
  let degree_description = document.getElementsByClassName("degree")[0];

  let proxy = "https://cors-anywhere.herokuapp.com/";
  const url = `${proxy}https://api.darksky.net/forecast/f25b4e1a347a97d30626cd76ad16f93f/${lat},${long}`;
  fetch(url)
    .then(response => {
      return response.json();
    })
    .then(result => {
        location.textContent=result.timezone;
        const {temperature,summary,icon}=result.currently;
        temperature_description.textContent=temperature;
        degree_description.textContent=' F';
        summary_description.textContent=summary;

        let skycons = new Skycons({"color": "white"});
        const skyicon=icon.replace('-','_').toUpperCase();        
        skycons.play();
        skycons.set(document.getElementById("icon"), Skycons[skyicon]);
    })
    .catch(error => {
      console.log(error);
    });
}
function changetemperature(){
    let temperature_description = document.getElementsByClassName("temperature")[0];
    let degree_description = document.getElementsByClassName("degree")[0];
    if(degree_description.textContent===' F'){
        temperature_description.textContent=Math.floor((temperature_description.textContent-32)*5/9);
        degree_description.textContent=' C';
    }
    else if(degree_description.textContent===' C'){
        temperature_description.textContent=((temperature_description.textContent*9)/5)+32;
        degree_description.textContent=' F';
    }
}
