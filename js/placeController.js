//AIzaSyCaQVlcIeYewnFSmm3xkL2d3HHy9xhYbz4

window.initMap=initMap;


function mapReady() {
    console.log('Map is ready')
}

function initMap(lat=32.0749831, lng=34.9120554) {
    //            if (!lat) lat = 32.0749831
    //            if (!lng) lat = 34.9120554
    console.log("initMap Hi!")
    var elMap = document.querySelector('.map')
    var options = {
        center: { lat, lng },
        zoom: 8
    }

    var map = new google.maps.Map(
        elMap,
        options
    )

    var marker = new google.maps.Marker({
        position: { lat, lng },
        map,
        title: 'Hello World!'
    })

    console.log("marker is", marker)
}