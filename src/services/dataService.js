// services/dataService.js
import Graphic from "@arcgis/core/Graphic.js";

// Grabs wc.json from public data and converts it to an array of Graphic objects. 2/3 of FeatureLayer routine.
export async function loadGraphics(path) {
    const response = await fetch(path);
    if (!response.ok) {
        throw new Error(`Failed to load from ${path}: ${response.status}`);
    }

    const rows = await response.json();
    // TODO check coordinate system? ATM Hard way
    // Return plain objects with geometry and attributes
    return rows.map((row, index) => new Graphic({
        geometry: {
            type: "point",
            x: row.x,
            y: row.y,
            spatialReference: { wkid: 102067 }
        },
        attributes: {
            ObjectID: row.objectId ?? row.oid ?? index + 1,
            kategorie: row.kategorie ?? null,
            typIkony: row.typIkony ?? null,
            ulice: row.ulice ?? null,
            mesto: row.mesto ?? null,
            web: row.web ?? null,
            longitude: row.longitude ?? null,
            latitude: row.latitude ?? null
        }
    }));
}