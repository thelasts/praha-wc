// src/utils/export-wc.js
import { WC_PATH, WC_PATH_IN } from "../config/dataPaths.js";
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import XLSX from "xlsx";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const input = resolve(__dirname, `../../${WC_PATH_IN}`);
const output = resolve(__dirname, `../../public/${WC_PATH}`);

const wb = XLSX.readFile(input);
const sheetName = wb.SheetNames[0];
const ws = wb.Sheets[sheetName];

const rows = XLSX.utils.sheet_to_json(ws, {
    defval: null,
    raw: false
});
// take url string and get rid of http://http//
const cleanUrl = (value) => {
    if (!value || typeof value !== "string") return null;
    const v = value.trim();
    if (!v) return null;
    if (v === "http://http//") return null;
    if (!/^https?:\/\//i.test(v)) return null;
    return v;
};
// return number, or null if not a number
const num = (value) => {
    const n = Number(value);
    return Number.isFinite(n) ? n : null;
};
// fetch features
const features = rows
    .map((row, i) => ({
        objectId: num(row.OID) ?? i + 1,
        oid: num(row.OID) ?? i + 1,
        kategorie: row.KATEGORIE ?? null,
        typIkony: row.TYP_IKONY != null ? String(row.TYP_IKONY) : null,
        ulice: row.ULICE ?? null,
        mesto: row.MESTO ?? null,
        web: cleanUrl(row.WEB),
        longitude: num(row.ZEM_DELKA),
        latitude: num(row.ZEM_SIRKA),
        x: num(row.X),
        y: num(row.Y)
    }))
    .filter((row) => row.longitude != null && row.latitude != null);

mkdirSync(dirname(output), { recursive: true });
// 1/3 of FeatureLayer routine
writeFileSync(output, JSON.stringify(features, null, 2), "utf8");

console.log(`Generated ${features.length} features to ${output}`);
