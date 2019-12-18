const landmark = {
    lat:39.706848,
    lon: -75.110462
};
const crown = {
    lat: 39.706184,
    lon: -75.108006
};
const bunce_cirle = {
    lat:39.706073,
    lon: -75.121396
};
const glassboro = {
    lat: 39.702892,
    lon: -75.111839
};
const alcyon = {
    lat:39.729042,
    lon: -75.145095
};
const orchard = {
    lat: 39.703843,
    lon: -75.078589
};
const cadence = {
    lat: 39.755542,
    lon: -75.271213
};
const chickies = {
    lat: 39.705682,
    lon: -75.113835
};
const bonesaw = {
    lat: 39.713252,
    lon: -75.135965
};
var mapCoords = {
    x: 0,
    y: 0,
    zoom: 13
};
var waypoint = {
    lon: 0,
    lat: 0
};
var waypoints;
//TODO: transform via geocoords
var geoCoords = {
    lat:39.706073,
    lon: -75.121396,
    zoom: 13
};
var hannah = {
    lat: 39.420357,
    lon: -74.978147
};
//TODO:refactor to use geo coords natively
function updateOrigin(lat,lon,zoom) {
    geoCoords.lat = lat;
    geoCoords.lon = lon;
    geoCoords.zoom = zoom;
    mapCoords.x = long2tile(lon,zoom);
    mapCoords.y = lat2tile(lat,zoom);
    mapCoords.zoom = zoom;
}
async function request_path_async(point_a,point_b) {
    return (await fetch(`https://api.openrouteservice.org/v2/directions/foot-walking?api_key=5b3ce3597851110001cf62484bf1694d7cec49f6bb7482f9d4ac8153&start=${point_a.lon},${point_a.lat}&end=${point_b.lon},${point_b.lat}`))
        .json().then(data => {return data.features[0].geometry.coordinates});
}
async function request_tile_async(x,y,zoom,element){
    return (await fetch(`https://api.openrouteservice.org/mapsurfer/${zoom}/${x}/${y}.png?api_key=5b3ce3597851110001cf62484bf1694d7cec49f6bb7482f9d4ac8153`))
        .then( x =>{console.log(x)});
}
function request_tile(x,y,zoom,element) {
    var request = new XMLHttpRequest();
    var request_url = new URL(`https://api.openrouteservice.org/mapsurfer/${zoom}/${x}/${y}.png?api_key=5b3ce3597851110001cf62484bf1694d7cec49f6bb7482f9d4ac8153`);
    //TODO: hide url/api key in php script
    request.open('GET',request_url);

    request.setRequestHeader('Accept', 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8');

    request.onreadystatechange = function () {
        if (this.readyState === 4) {
            element.setAttribute('src', this.responseURL);
        }
    };

    request.send();
}
window.onload = function(){
    let canvas = document.getElementById("canvas");
    setCanvasSize(canvas);
    updateOrigin(geoCoords.lat,geoCoords.lon,geoCoords.zoom);
    loadMap(canvas);
};
async function drawPath_async(begin,end,canvas){
    await request_path_async(begin,end).then(x => drawPath(x));
}
function drawPath(path) {
    let canvas = document.getElementById("canvas");
    let geo_lon_low_bound = tile2long(mapCoords.x - 1,mapCoords.zoom);
    let geo_lon_high_bound = tile2long(mapCoords.x + 3,mapCoords.zoom);
    let geo_lat_high_bound = tile2lat(mapCoords.y - 1,mapCoords.zoom);
    let geo_lat_low_bound = tile2lat(mapCoords.y + 2,mapCoords.zoom);
    console.log(path);
    path.forEach(function (item,index,array) {
        if(index === array.size) return;
        if(item[1] > geo_lat_low_bound && item[1] < geo_lat_high_bound
            && item[0] > geo_lon_low_bound && item[0] < geo_lon_high_bound) {
            drawSegment(getPoint(array[index]), getPoint(array[index + 1]), canvas);
        }
    });
}
function panLeft() {
    let canvas = document.getElementById("canvas");
    setCanvasSize(canvas);
    mapCoords.x -= 1;
    loadMap(canvas);
};
function panRight() {
    let canvas = document.getElementById("canvas");
    setCanvasSize(canvas);
    mapCoords.x += 1;
    loadMap(canvas);
};
function panUp() {
    let canvas = document.getElementById("canvas");
    setCanvasSize(canvas);
    mapCoords.y -= 1;
    loadMap(canvas);
};
function panDown() {
    let canvas = document.getElementById("canvas");
    setCanvasSize(canvas);
    mapCoords.y += 1;
    loadMap(canvas);
};
function zoomIn() {
    let canvas = document.getElementById("canvas");
    setCanvasSize(canvas);
    let origin = find_map_center();
    updateOrigin(origin.lat,origin.lon,geoCoords.zoom + 1);
    loadMap(canvas);
}
function zoomOut() {
    let canvas = document.getElementById("canvas");
    setCanvasSize(canvas);
    let origin = find_map_center();
    updateOrigin(origin.lat,origin.lon,geoCoords.zoom - 1);
    loadMap(canvas);
}
function find_map_center(){
    let lat_arc = tile2lat(mapCoords.y + 1, mapCoords.zoom) - tile2lat(mapCoords.y, mapCoords.zoom);
    let lon_arc = tile2long(mapCoords.x + 1, mapCoords.zoom) - tile2long(mapCoords.x,mapCoords.zoom);
    let center_x = lon_arc/2 + tile2long(mapCoords.x,mapCoords.zoom);
    let center_y = lat_arc/2 + tile2lat(mapCoords.y,mapCoords.zoom);
    return {lat: center_y, lon: center_x};
}
function loadMap(canvas) {
    request_tile(mapCoords.x - 1, mapCoords.y - 1, mapCoords.zoom, document.getElementById('image00'));
    request_tile(mapCoords.x, mapCoords.y - 1, mapCoords.zoom, document.getElementById('image01'));
    request_tile(mapCoords.x + 1, mapCoords.y - 1, mapCoords.zoom, document.getElementById('image02'));
    request_tile(mapCoords.x + 2, mapCoords.y - 1, mapCoords.zoom, document.getElementById('image03'));
    request_tile(mapCoords.x - 1, mapCoords.y, mapCoords.zoom, document.getElementById('image10'));
    request_tile(mapCoords.x, mapCoords.y, mapCoords.zoom, document.getElementById('image11'));
    request_tile(mapCoords.x + 1, mapCoords.y, mapCoords.zoom, document.getElementById('image12'));
    request_tile(mapCoords.x + 2, mapCoords.y, mapCoords.zoom, document.getElementById('image13'));
    request_tile(mapCoords.x - 1, mapCoords.y + 1, mapCoords.zoom, document.getElementById('image20'));
    request_tile(mapCoords.x, mapCoords.y + 1, mapCoords.zoom, document.getElementById('image21'));
    request_tile(mapCoords.x + 1, mapCoords.y + 1, mapCoords.zoom, document.getElementById('image22'));
    request_tile(mapCoords.x + 2, mapCoords.y + 1, mapCoords.zoom, document.getElementById('image23'));
    setCanvasSize(canvas);
    drawRoutes();
    //drawPath_async(glassboro, hannah, canvas);
    //drawPath_async(cadence,landmark,canvas);
}
function long2tile(lon,zoom) { return (Math.floor((lon+180)/360*Math.pow(2,zoom))); };
function lat2tile(lat,zoom)  { return (Math.floor((1-Math.log(Math.tan(lat*Math.PI/180) + 1/Math.cos(lat*Math.PI/180))/Math.PI)/2 *Math.pow(2,zoom))); };

function tile2long(x,z) {
    return (x/Math.pow(2,z)*360-180);
}
function tile2lat(y,z) {
    var n=Math.PI-2*Math.PI*y/Math.pow(2,z);
    return (180/Math.PI*Math.atan(0.5*(Math.exp(n)-Math.exp(-n))));
}
function getPoint(point) {
    let geo_lon_low_bound = tile2long(mapCoords.x - 1,mapCoords.zoom);
    let geo_lon_high_bound = tile2long(mapCoords.x + 3,mapCoords.zoom);
    let geo_lat_high_bound = tile2lat(mapCoords.y - 1,mapCoords.zoom);
    let geo_lat_low_bound = tile2lat(mapCoords.y + 2,mapCoords.zoom);
    let lat_offset = point[1] - geo_lat_high_bound;
    let lat_arc = geo_lat_low_bound - geo_lat_high_bound;
    let lon_offset = point[0] - geo_lon_low_bound;
    let lon_arc = geo_lon_high_bound - geo_lon_low_bound;
    let x_offset = lon_offset/lon_arc;
    let y_offset = lat_offset/lat_arc;
    //TODO:fix to use absolute landmarks
    //console.log("offset", x_offset,",",y_offset);
    return [x_offset,y_offset];

}
function drawSegment([x1,y1], [x2,y2], canvas){
    let ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(x1*canvas.width,y1*canvas.height);
    ctx.lineTo(x2*canvas.width,y2*canvas.height);
    ctx.stroke();
}
function setCanvasSize(canvas) {
    canvas.height = 256 * document.getElementById("images").childElementCount;
    canvas.width = 256 * document.getElementById("row1").childElementCount;
}
function drawRoutes() {
    let routes = calculateAllRoutes();
    console.log(routes);
    console.log(routes[0]);
    routes.forEach(x => x.then(x => drawPath(x)));
}
function getChecked() {
    return Array.from(document.getElementsByClassName("check"))
        .filter(element => {return element.checked}).map(elem => elem.id);
}
function calculateAllRoutes(){
    const checkedSet = getChecked();
    let promArr = [];
    for (i = 0; i < checkedSet.length; i++){
        for (j = 0; j < checkedSet.length; j++){
            if (i !== j) {
                promArr.push(request_path_async(getPointById(checkedSet[i]), getPointById(checkedSet[j])));
            }
        }
    }
    return promArr;
}
//arr is an array containing path info
function cacheLen() {
    let routes = calculateAllRoutes()
}
function getPointById(id) {
    if(id === "Landmark")
        return landmark;
    if(id === "Chickies")
        return chickies;
    if(id === "Bonesaw")
        return bonesaw;
    throw "Invalid ID";
}