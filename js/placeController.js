import { placeService } from "./services/placeService.js";

window.initMap = initMap;
window.initPlaces = initPlaces;
window.onRemovePlace = onRemovePlace;
window.onZoomPlace = onZoomPlace;
window.onAddPlace = onAddPlace;
window.onExportPlaces = onExportPlaces;

function initMap(name = "Eilat", lat = 29.55724, lng = 34.95294) {
  const location = { lat: lat, lng: lng };
  var elMap = document.querySelector(".map");
  var options = {
    zoom: 8,
    center: location,
  };

  var map = new google.maps.Map(elMap, options);

  var marker = new google.maps.Marker({
    position: location,
    map,
    title: name,
  });

  // Add Listener for panning locations on the map
  map.addListener("click", (event) => {
    var latitude = event.latLng.lat();
    var longitude = event.latLng.lng();
    var name = prompt("enter location name");
    if (name !== "" && name !== null) {
      placeService.addPlace(name, latitude, longitude);
      _renderPlaces();
      initMap(name, latitude, longitude);
    }
  });

  // Create the DIV to hold the control.
  const centerControlDiv = document.createElement("div");
  // Create the control.
  const centerControl = createCenterControl(map);

  // Append the control to the DIV.
  centerControlDiv.appendChild(centerControl);
  map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(centerControlDiv);
}

function initPlaces() {
  _renderPlaces();
}

async function _renderPlaces() {
  let places = await placeService.getPlaces();
  let strHtmls = `<button class="export-button" onClick="onExportPlaces()">Export Places</button>
    <p></p>`;

  strHtmls += places
    .map(
      (place) => `
        <article class="place-preview">
            ${place.name}
            <button title="Delete place" class="btn-remove" onclick="onRemovePlace('${place.id}')">X</button>
            <button title="Zoom Place" class="btn-zoom-place" onclick="onZoomPlace('${place.id}')">Zoom</button>
        </article>
        `
    )
    .join("");

  let placesDiv = document.querySelector(".places-list");
  placesDiv.innerHTML = strHtmls;
}

function onAddPlace(ev) {
  ev.preventDefault();
  const addedPlace = Object.fromEntries(new FormData(ev.target));
  console.log("addedPlace, ", addedPlace);
  placeService.addPlace(addedPlace.placeName, addedPlace.lat, addedPlace.lng);
  _renderPlaces();
}

function onAddPlaceOnMap(name, lat, lng) {
  placeService.addPlace(name, lat, lng);
  _renderPlaces();
}

async function onRemovePlace(placeId) {
  console.log("onRemovePlace!, ", placeId);
  const result = await placeService.removePlace(placeId);
  _renderPlaces();
}

async function onZoomPlace(placeId) {
  try {
    const place = await placeService.getPlaceById(placeId);
    initMap(place.name, place.lat, place.lng);
  } catch (err) {
    console.log("Error", err);
    flashMsg("Cannot zoom place");
  }
}

function createCenterControl(map) {
  const controlButton = document.createElement("button");

  controlButton.style.backgroundColor = "#fff";
  controlButton.style.border = "2px solid #fff";
  controlButton.style.borderRadius = "3px";
  controlButton.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
  controlButton.style.color = "rgb(25,25,25)";
  controlButton.style.cursor = "pointer";
  controlButton.style.fontFamily = "Roboto,Arial,sans-serif";
  controlButton.style.fontSize = "16px";
  controlButton.style.lineHeight = "38px";
  controlButton.style.margin = "8px 10px 22px";
  controlButton.style.padding = "0 5px";
  controlButton.style.textAlign = "center";
  controlButton.textContent = "🎯";

  controlButton.title = "Click to center on your location";
  controlButton.type = "button";

  controlButton.addEventListener("click", () => {
    try {
      navigator.geolocation.getCurrentPosition(function (position) {
        const currentLatitude = position.coords.latitude;
        const currentLongitude = position.coords.longitude;
        const name = "My Location!";

        initMap(name, currentLatitude, currentLongitude);
      });
    } catch (err) {
      console.log(
        "Geolocation is not supported by this browser. error is",
        err
      );
    }
  });
  return controlButton;
}

async function onExportPlaces() {
  console.log("inside onExportPlaces");

  let placesArray = await placeService.getPlaces();

  _downloadPlacesAsCSV(placesArray);

  console.log("placesArray", placesArray);
}

function _downloadPlacesAsCSV(places) {
  let data = `id,name,lat,lng\n`;
  for (let p of places) {
    data += `${p.id},${p.name},${p.lat},${p.lng}\n`;
  }

  let csv_file = new Blob([data], { type: "text/csv" });
  let tmp_link = URL.createObjectURL(csv_file);

  let dlink = document.createElement("a");
  dlink.download = "places.csv";
  dlink.href = tmp_link;
  dlink.click();

  URL.revokeObjectURL(tmp_link); // Delete the tmp_link
  dlink.remove();
}
