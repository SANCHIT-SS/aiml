<script>
  // Initialize and add the map
  function initMap() {
    // Fetch bus data from the backend
    fetch('http://localhost:3000/api/bus')
      .then(response => response.json())
      .then(data => {
        // Update bus information
        document.getElementById('bus-id').innerText = data.id;
        document.getElementById('destination').innerText = data.destination;
        document.getElementById('price').innerText = data.price.toFixed(2);

        // Map options
        const mapOptions = {
          zoom: 13,
          center: data.location,
        };

        // Create the map
        const map = new google.maps.Map(document.getElementById('map'), mapOptions);

        // Add bus marker
        const busMarker = new google.maps.Marker({
          position: data.location,
          map: map,
          title: 'Current Bus Location',
          icon: {
            url: 'http://maps.google.com/mapfiles/ms/icons/bus.png'
          }
        });

        // Draw the route
        const routePath = new google.maps.Polyline({
          path: data.route,
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2,
        });

        routePath.setMap(map);
      })
      .catch(error => console.error('Error fetching bus data:', error));
  }
</script>
function initMap() {
    // Map variable must be accessible in the outer scope
    let map;
    let busMarker;
    let routePath;
  
    function fetchBusData() {
      fetch('http://localhost:3000/api/bus')
        .then(response => response.json())
        .then(data => {
          // Update bus information
          document.getElementById('bus-id').innerText = data.id;
          document.getElementById('destination').innerText = data.destination;
          document.getElementById('price').innerText = data.price.toFixed(2);
  
          if (!map) {
            // Map options
            const mapOptions = {
              zoom: 13,
              center: data.location,
            };
  
            // Create the map
            map = new google.maps.Map(document.getElementById('map'), mapOptions);
  
            // Add bus marker
            busMarker = new google.maps.Marker({
              position: data.location,
              map: map,
              title: 'Current Bus Location',
              icon: {
                url: 'http://maps.google.com/mapfiles/ms/icons/bus.png'
              }
            });
  
            // Draw the route
            routePath = new google.maps.Polyline({
              path: data.route,
              geodesic: true,
              strokeColor: '#FF0000',
              strokeOpacity: 1.0,
              strokeWeight: 2,
            });
  
            routePath.setMap(map);
          } else {
            // Update bus marker position
            busMarker.setPosition(data.location);
  
            // Update the route path
            routePath.setPath(data.route);
          }
        })
        .catch(error => console.error('Error fetching bus data:', error));
    }
  
    // Fetch data initially
    fetchBusData();
  
    // Fetch data every 5 seconds
    setInterval(fetchBusData, 5000);
  }
  