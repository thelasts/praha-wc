import Map from "@arcgis/core/Map.js";
import MapView from "@arcgis/core/views/MapView.js";
import Extent from "@arcgis/core/geometry/Extent.js";
import Basemap from "@arcgis/core/Basemap.js";

import { MAP_CONFIG } from "../config/mapConfig.js";

export function createMap(layers) {
    const basemapLayer = layers.find((layer) => layer.title === "Vrstva Základní mapa");
    const operationalLayers = layers.filter((layer) => layer.title !== "Vrstva Základní mapa");

    return new Map({
        basemap: new Basemap({
            baseLayers: [basemapLayer]
        }),
        layers: operationalLayers,
        spatialReference: MAP_CONFIG.spatialReference,
        // TODO credit attribution copyright???
        credit: "IPR Praha"
    });
}

export function createMapView(map, containerId) {
    return new MapView({
        container: containerId,
        map: map,
        extent: new Extent(MAP_CONFIG.extent),
        zoom: MAP_CONFIG.zoom,
    });
}