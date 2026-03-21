
// Prague Základní Mapa - ArcGIS Vector Tiles
const map = new maplibregl.Map({
    container: 'map',
    center: [14.421, 50.088],  // Prague
    zoom: 12,
    hash: true
});

// Add vector tile source + style after load
map.on('load', () => {
    // Vector tiles from ArcGIS (PBF format)
    map.addSource('zakladni', {
        type: 'vector',
        url: 'https://tiles.arcgis.com/tiles/SBTXIEUGWbqzUecw/arcgis/rest/services/zakladni_mapa/VectorTileServer'
    });

    // Default style (check /resources/styles/root.json for exact)
    fetch('https://tiles.arcgis.com/tiles/SBTXIEUGWbqzUecw/arcgis/rest/services/zakladni_mapa/VectorTileServer/resources/styles/root.json')
        .then(res => res.json())
        .then(style => {
            map.setStyle(style);
        });

    // Controls
    map.addControl(new maplibregl.NavigationControl());
    map.addControl(new maplibregl.FullscreenControl());
});

console.log('Basemap loaded');
