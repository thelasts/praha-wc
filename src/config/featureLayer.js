export const FEATURE_LAYER_CONFIG = {
    title: "Accessible WC Locations",
    geometryType: "point",
    spatialReference: { wkid: 102067 },
    fields: [
        { name: "ObjectID", alias: "Object ID", type: "oid" },
        { name: "kategorie", alias: "Category", type: "string" },
        { name: "typIkony", alias: "Icon Type", type: "string" },
        { name: "ulice", alias: "Street", type: "string" },
        { name: "mesto", alias: "City", type: "string" },
        { name: "web", alias: "Website", type: "string" },
        { name: "longitude", alias: "Longitude", type: "double" },
        { name: "latitude", alias: "Latitude", type: "double" }
    ],
    objectIdField: "ObjectID",
    renderer: {
        type: "simple",
        symbol: {
            type: "simple-marker",
            size: 8,
            color: [0, 122, 194],
            outline: {
                color: [255, 255, 255],
                width: 1
            }
        }
    },
    labelingInfo: [{
        labelExpressionInfo: {
            expression: "$feature.mesto"
        },
        symbol: {
            type: "text",
            color: [0, 0, 0],
            haloColor: [255, 255, 255],
            haloSize: 1,
            font: {
                size: 9,
                family: "Arial"
            }
        },
        minScale: 50000  // Only show labels when zoomed in
    }],
    popupTemplate: {
        title: "WC - {mesto}",
        content: [
            {
                type: "fields",
                fieldInfos: [
                    { fieldName: "kategorie", label: "Category" },
                    { fieldName: "ulice", label: "Street" },
                    { fieldName: "mesto", label: "City" },
                    { fieldName: "web", label: "Website" }
                ]
            }
        ]
    }
};