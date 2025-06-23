mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map',
    style: "mapbox://styles/mapbox/streets-v12",
    config: {
        basemap: {
            theme: 'monochrome',
            lightPreset: 'night'
        }
    },
    center: listing.geometry.coordinates,
    zoom: 9
});

// Add default red marker with popup
const marker = new mapboxgl.Marker({ color: "red" })
    .setLngLat(listing.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<h4>${listing.location}</h4><p>Exact location will be provided after booking!</p>`
        )
    )
    .addTo(map);

// When map loads
map.on('load', () => {
    // Load an image from URL
    map.loadImage('https://docs.mapbox.com/mapbox-gl-js/assets/cat.png', (error, image) => {
        if (error) throw error;

        // Add image to map style
        map.addImage('cat', image);

        // Add a data source with a point near your marker
        map.addSource('hover-icon', {
            'type': 'geojson',
            'data': {
                'type': 'FeatureCollection',
                'features': [
                    {
                        'type': 'Feature',
                        'geometry': {
                            'type': 'Point',
                            'coordinates': listing.geometry.coordinates
                        }
                    }
                ]
            }
        });

        // Add the icon layer, but hide it initially
        map.addLayer({
            'id': 'hover-icon-layer',
            'type': 'symbol',
            'source': 'hover-icon',
            'layout': {
                'icon-image': 'cat',
                'icon-size': 0.25,
                'visibility': 'none'  // start hidden











        
            }
        });

        // Show the icon when mouse enters marker area
        marker.getElement().addEventListener('mouseenter', () => {
            map.setLayoutProperty('hover-icon-layer', 'visibility', 'visible');
        });

        // Hide the icon when mouse leaves marker area
        marker.getElement().addEventListener('mouseleave', () => {
            map.setLayoutProperty('hover-icon-layer', 'visibility', 'none');
        });
    });
});
