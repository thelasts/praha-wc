// TODO FIX widgets are deprecated in 5.0, no support later on
import LayerList from "@arcgis/core/widgets/LayerList.js";
import Expand from "@arcgis/core/widgets/Expand.js";
import Legend from "@arcgis/core/widgets/Legend.js";
import Home from "@arcgis/core/widgets/Home.js";

export function createLayerList(view, basemapLayer, loadBasemapStyle) {
    const layerList = new LayerList({
        view: view,
        listItemCreatedFunction: (event) => {
            const { layer, item } = event;

            if (item.layer === basemapLayer) {
                const label = document.createElement("calcite-label");
                label.title = "Basemap style";
                label.scale = "s";
                label.innerText = "Basemap style";

                const select = document.createElement("calcite-select");
                select.scale = "s";

                const options = [
                    { value: "bw", label: "BW" },
                    { value: "color", label: "Color" },
                    { value: "dark", label: "Dark" }
                ];

                options.forEach((opt) => {
                    const option = document.createElement("calcite-option");
                    option.value = opt.value;
                    option.label = opt.label;
                    option.textContent = opt.label;

                    if (opt.value === "bw") {
                        option.selected = true;
                    }

                    select.appendChild(option);
                });

                select.addEventListener("calciteSelectChange", (event) => {
                    loadBasemapStyle(basemapLayer, event.target.value);
                });

                label.appendChild(select);

                item.panel = {
                    content: label,
                    icon: "basemap",
                    title: "Change basemap style"
                };

                item.actionsSections = [];
                return;
            }

            const label = document.createElement("calcite-label");
            label.title = "Layer Opacity";
            label.scale = "s";
            label.innerText = "Layer opacity";

            const slider = document.createElement("calcite-slider");
            slider.labelHandles = true;
            slider.labelTicks = true;
            slider.min = 0;
            slider.minLabel = "0";
            slider.max = 1;
            slider.maxLabel = "1";
            slider.scale = "s";
            slider.step = 0.01;
            slider.value = item.layer.opacity ?? 1;
            slider.ticks = 0.5;

            slider.addEventListener("calciteSliderChange", () => {
                item.layer.opacity = slider.value;
            });

            label.appendChild(slider);

            item.panel = {
                content: label,
                icon: "sliders-horizontal",
                title: "Change layer opacity"
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
        expanded: false
    });
}

export function createHomeWidget(view) {
    return new Home({
        view: view
    });
}
