praha-wc
-

## Intro
This project is a web-based client-side map application focused on displaying accessible public toilets in Prague. Part of the test task for IPR Praha.
## Project Description
App provides the following features:
* an interactive map, 
* a feature list with a detailed table view, and 
* adjustable UI widgets for exploring the data.

The application is built with `JavaScript` and uses `Vite` as the build tool and development server. It relies on `ArcGIS Maps SDK for JavaScript (5.0)` for map rendering, feature layers, map widgets, and data visualization. The UI also uses `Calcite Components` (same version as the SDK) for consistent interface elements and styling. Additional data handling is done through custom service modules, while the layout and visual behavior are controlled with HTML and CSS.

For consistency, the whole project can also be containerized with the provided `Docker` files. Docker first builds the Vite app with Node 20, runs the data export step node `src/utils/export-wc.js`, and then serves the final static dist output through `Nginx`.
## Run
1. `docker-compose up --build` (requires _Docker Engine_ to be running on the machine)

**OR**
1. `npm install`
2. `npm run dev`

The expected size of `node_modules` folder is **277—327 MB**. 
## Data
Geodata is provided by the [Geoportal Praha](geoportalpraha.cz). Among others, it includes such services as:
* [Základní mapy - vector cache](https://geoportalpraha.cz/en/data-and-services/2c73afefb811435eb7336253228b3ded),
* [Ortofoto](https://geoportalpraha.cz/data-a-sluzby/545d898c0cb44ceabbe0d2606b768683), and
* [Digitální stínovaný model povrchu](https://geoportalpraha.cz/data-a-sluzby/bc87e5727c9b4ea0b740dbbfc67b8854).

`FeatureLayer` data is fetched from the provided original dataset. At the moment, the app’s schemas are tailored to the specific table and its header, but that may be subject to change.

Link (expires 12.04.2026)
: https://drive.proton.me/urls/FS8HY3RP0G#TgdmwdlQjkW7

Password 
: ask me :)

> Data is to be stored in the `./data/` folder. The app will grab it and convert it to suitable json during build.

_02/04/2026_