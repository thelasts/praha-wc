const getFeatureRendererByIconType = () => {
    return {
        type: "unique-value",
        field: "typIkony",

        defaultSymbol: {
            type: "simple-marker",
            size: 8,
            color: [56, 56, 56],
            outline: {
                color: [255, 255, 255],
                width: 1
            }
        },

        uniqueValueInfos: [
            {
                value: "0",
                symbol: {
                    type: "simple-marker",
                    size: 8,
                    color: [0, 122, 194],
                    outline: { color: [255, 255, 255], width: 1 }
                }
            },
            {
                value: "1",
                symbol: {
                    type: "simple-marker",
                    size: 8,
                    color: [255, 0, 0],
                    outline: { color: [255, 255, 255], width: 1 }
                }
            },
            {
                value: "2",
                symbol: {
                    type: "simple-marker",
                    size: 8,
                    color: [255, 165, 0],
                    outline: { color: [255, 255, 255], width: 1 }
                }
            }
        ]
    };
};

export const FEATURE_LAYER_CONFIG = {
    title: "Bezbariérové WC - Praha",
    icon: "wheelchair",
    geometryType: "point",
    spatialReference: { wkid: 102067 },
    fields: [
        { name: "OBJECTID", alias: "Object ID", type: "oid" },
        { name: "kategorie", alias: "Category", type: "string" },
        { name: "typIkony", alias: "Icon Type", type: "string" },
        { name: "ulice", alias: "Street", type: "string" },
        { name: "mesto", alias: "City", type: "string" },
        { name: "web", alias: "Website", type: "string" },
        { name: "longitude", alias: "Longitude", type: "double" },
        { name: "latitude", alias: "Latitude", type: "double" }
    ],
    objectIdField: "OBJECTID",
    renderer: getFeatureRendererByIconType(),
    labelingInfo: [{
        symbol: {
            type: "text",
            color: [0, 0, 0],
            haloColor: [255, 255, 255],
            haloSize: 1,
            font: {
                size: 9,
                family: "Helvetica"
            }
        },
        minScale: 50000
    }],
    popupTemplate: {
        title: "{kategorie} - {mesto}",
        content: [
            {
                type: "fields",
                fieldInfos: [
                    { fieldName: "OBJECTID", label: "Object ID" },
                    { fieldName: "kategorie", label: "Category" },
                    { fieldName: "ulice", label: "Street" },
                    { fieldName: "mesto", label: "City" },
                    { fieldName: "web", label: "Website" }
                ]
            }
        ]
    }
};