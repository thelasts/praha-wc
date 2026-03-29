// Import ArcGIS theme
import "@arcgis/core/assets/esri/themes/light/main.css";

// IMPORT CALCITE CSS AND COMPONENTS HERE
import "@esri/calcite-components/dist/components/calcite-label";
import "@esri/calcite-components/dist/components/calcite-slider";
import "@esri/calcite-components/dist/components/calcite-select";
import "@esri/calcite-components/dist/components/calcite-option";


import {
    createBasemapLayer,
    createHillshadeLayer,
    createOrtoLayer,
    createFeatureLayer,
    loadBasemapStyle
} from "./services/layerService.js";

import { createMap, createMapView } from "./services/mapService.js";
import { createLayerList, createLegend, createHomeWidget } from "./components/widgets.js";
import { loadGraphics } from "./services/dataService.js";
import { WC_PATH, WC_PATH_IN } from "./config/dataPaths.js";



async function initApp() {
    const basemapLayer = createBasemapLayer();
    const hillshadeLayer = createHillshadeLayer();
    const ortoLayer = createOrtoLayer();

    const graphics = await loadGraphics(WC_PATH);
    const wcLayer = createFeatureLayer(graphics);

    const map = createMap([
        basemapLayer,
        ortoLayer,
        hillshadeLayer,
        wcLayer
    ]);

    const view = createMapView(map, "viewDiv");

    loadBasemapStyle(basemapLayer, "bw");

    const layerListExpand = createLayerList(view, basemapLayer, loadBasemapStyle);
    const legendExpand = createLegend(view);
    const homeWidget = createHomeWidget(view);

    view.ui.add(layerListExpand, "bottom-left");
    view.ui.add(legendExpand, "top-right");
    view.ui.add(homeWidget, "top-left");
}

initApp().catch(console.error);
