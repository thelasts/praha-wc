import VectorTileLayer from "@arcgis/core/layers/VectorTileLayer.js";
import WMTSLayer from "@arcgis/core/layers/WMTSLayer.js";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js";
import { BASEMAP_SERVICE_URL, BASEMAP_STYLES } from "../config/basemaps.js";
import { FEATURE_LAYER_CONFIG } from "../config/featureLayer.js";

export function createBasemapLayer() {
    return new VectorTileLayer({
        url: BASEMAP_SERVICE_URL,
        title: "Vrstva Základní mapa",
    });
}

export function createHillshadeLayer() {
    return new WMTSLayer({
        url: "https://gs-pub.praha.eu/imgs/rest/services/map/dsm_hls/ImageServer/WMTS?",
        activeLayer: { id: "dsm_hls" },
        blendMode: "multiply",
        opacity: 0.6,
        visible: false,
        title: "Vrstva DSM",
        icon: "hillshade",
    });
}

export function createOrtoLayer() {
    return new WMTSLayer({
        url: "https://gs-pub.praha.eu/imgs/rest/services/ort/letecke_snimkovani/ImageServer/WMTS?",
        visible: false,
        title: "Vrstva Ortofoto",
        icon: "drone-fixed-wing"
    });
}

export function createFeatureLayer(features) {
    return new FeatureLayer({
        ...FEATURE_LAYER_CONFIG,
        source: features  // Array of plain objects with geometry and attributes
    });
}

export function loadBasemapStyle(basemapLayer, styleName) {
    basemapLayer.loadStyle(BASEMAP_STYLES[styleName]).catch(console.error);
}
