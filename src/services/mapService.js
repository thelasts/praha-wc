import Map from "@arcgis/core/Map.js";
import MapView from "@arcgis/core/views/MapView.js";
import Extent from "@arcgis/core/geometry/Extent.js";
import { MAP_CONFIG } from "../config/mapConfig.js";

export function createMap(layers) {
    return new Map({
        layers: layers,
        spatialReference: MAP_CONFIG.spatialReference
    });
}

export function createMapView(map, containerId) {
    return new MapView({
        container: containerId,
        map: map,
        center: MAP_CONFIG.center,
        extent: new Extent(MAP_CONFIG.extent),
        zoom: MAP_CONFIG.zoom
    });
}