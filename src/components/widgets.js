// TODO FIX widgets are deprecated in 5.0, no support later on
import LayerList from "@arcgis/core/widgets/LayerList.js";
import Expand from "@arcgis/core/widgets/Expand.js";
import Legend from "@arcgis/core/widgets/Legend.js";
import Print from "@arcgis/core/widgets/Print.js";
import Home from "@arcgis/core/widgets/Home.js";
import FeatureTable from "@arcgis/core/widgets/FeatureTable.js";
import Search from "@arcgis/core/widgets/Search.js";

export function createLayerList(view, basemapLayer, loadBasemapStyle) {
    const layerList = new LayerList({
        view: view,
        listItemCreatedFunction: (event) => {
            const {item} = event;
            item.icon = item.layer.icon;

            if (item.layer === basemapLayer) {
                item.panel = {
                    icon: "basemap",
                    title: "Change basemap style",
                    content: (() => {
                        const container = document.createElement("div");
                        container.style.padding = "6px";

                        const label = document.createElement("calcite-label");
                        label.setAttribute("scale", "s");
                        label.textContent = "Basemap style ";

                        const select = document.createElement("calcite-select");
                        select.setAttribute("scale", "s");

                        const options = [
                            {value: "bw", label: "BW"},
                            {value: "color", label: "Color"},
                            {value: "dark", label: "Dark"}
                        ];

                        options.forEach((opt) => {
                            const option = document.createElement("calcite-option");
                            option.setAttribute("value", opt.value);
                            option.setAttribute("label", opt.label);
                            option.textContent = opt.label;

                            if (opt.value === "bw") {
                                option.setAttribute("selected", "true");
                            }

                            select.appendChild(option);
                        });

                        select.addEventListener("calciteSelectChange", (e) => {
                            loadBasemapStyle(item.layer, e.target.value);
                        });

                        label.appendChild(select);
                        container.appendChild(label);
                        return container;
                    })()
                };

                item.actionsSections = [];
                return;
            }

            item.panel = {
                icon: "sliders-horizontal",
                title: "Change layer opacity",
                content: (() => {
                    const container = document.createElement("div");
                    container.style.padding = "6px";
                    container.title = "Change layer opacity";

                    const label = document.createElement("calcite-label");
                    label.setAttribute("scale", "s");
                    label.textContent = "Layer opacity ";

                    const slider = document.createElement("calcite-slider");
                    slider.setAttribute("label-handles", "true");
                    slider.setAttribute("label-ticks", "true");
                    slider.setAttribute("min", "0");
                    slider.setAttribute("max", "1");
                    slider.setAttribute("scale", "s");
                    slider.setAttribute("step", "0.01");
                    slider.setAttribute("ticks", "0.5");

                    const initialOpacity = item.layer.opacity !== undefined ? item.layer.opacity : 1;
                    slider.setAttribute("value", initialOpacity.toString());

                    slider.addEventListener("calciteSliderChange", (e) => {
                        item.layer.opacity = Number(e.target.value);
                    });

                    label.appendChild(slider);
                    container.appendChild(label);
                    return container;
                })()
            };
        }
    });

    return new Expand({
        content: layerList,
        view,
        expanded: false
    });
}

export function createLegend(view) {
    const legend = new Legend({ view });
    return new Expand({
        content: legend,
        view: view,
        expanded: false,
        placement: "right-end"
    });
}

export function createPrint(view) {
    const print = new Print({
        view: view,
    });
    return new Expand({
        view: view,
        container: "viewDiv"
    });
}

export function createHomeWidget(view) {
    return new Home({
        view: view
    });
}

export function createFeatureTable(view, wcLayer) {
    const featureTable = new FeatureTable({
        view: view,
        layer: wcLayer,
        container: "tableDiv"
    });
    return new Expand({
        content: featureTable,
        view: view,
        expanded: true
    });
}

export function createSearchWidget(view) {
    const search = new Search({
        view: view,
        container: document.createElement("div"),
        autoNavigate: true,
    });
    return new Expand({
        content: search,
        view:view,
        expanded: false,
        icon: "search",
    });
}
