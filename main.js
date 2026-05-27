// Initialize the map
var map = L.map('map', { zoomControl: false }).setView([51, 10], 6); // Center on Europe

// ESRI Background
var Esri_WorldImagery = L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', 
    {attribution: 'Tiles &copy; Esri'}
).addTo(map);


// Locations with descriptions
var locations = [
    { name: "2008-09 - 2013-06, Liceo Scientifico Piccinini, Pesaro (Italy)", lat: 43.920571537400825, lon: 12.90766057099907, desc: "<span style='color: blue;'>Scientific High School Diploma</span><br>Final grade: 100/100", color: "rgba(0,0,255,0.5)" },
    { name: "2011-09 - 2012-06, St. Joseph by-the-Sea, Staten Island (NY)", lat: 40.5258, lon: -74.1774, desc: "<span style='color: blue;'>Senior Year in the US</span>", color: "rgba(0,0,255,0.5)" },
    { name: "2013-10 - 2016-07, Politecnico di Milano (Italy)", lat: 45.5015632602915, lon: 9.154596748402858, desc: "<span style='color: blue;'>BSc in Aerospace Engineering</span><br>Final grade: 102/110<br><br>Major focus: Mathematical and numerical analysis, Physics, Statics and dynamics of rigid bodies and fluids, Structural analysis, Fundamentals of aerospace systems, Thermodynamics, Materials, Electronics, Control theory, Propulsion", color: "rgba(0,0,255,0.5)" },
    { name: "2016-09 - 2022-03, TU Delft (the Netherlands)", lat: 51.99011433034388, lon: 4.375579094773364, desc: "<span style='color: blue;'>MSc in Space Engineering</span><br>Final grade: 7.5/10<br><br>Major focus: Space Systems Engineering, Microsatellites, Mechatronics and Robotics, Space Instrumentation, Space Propulsion, Orbital Mechanics<br><br>MSc Thesis: <a href='https://repository.tudelft.nl/record/uuid:e04fab02-bfa6-47f5-b9be-1e85b2abf416'>Microvibration test bench for tiny reaction wheels</a><br>          Tools: Matlab, CATIA V5, Arduino, MPU6050 Gyroscope, Hall Sensor, Makerbot 3D Printer, Python (OpenCV), ECSS-E-HB-32-26A", color: "rgba(0,0,255,0.5)" },
    { name: "2017-09 - 2018-02, Airbus Defence & Space, Friedrichshafen (Germany)", lat: 47.669501862481646, lon: 9.389315603441345, desc: "<span style='color: red;'>Software Engineering internship (METimage radiometer)</span><br><br>• Development of reference frame management and manipulation toolbox<br>• Integration of DOORS output in the performance database (geometric/radiometric models)<br>• Integration of the reference frames toolbox in PEET (Pointing Error Engineering Tool, by ESA)<br>• Line Of Sight 3D animation with VPython to visualize pointing errors<br>• Unit testing of GPP/IDS (Ground Processor Prototype/Instrument Data Simulator) Software<br><br>Tools: Linux, Python, Matlab, Git, PEET", color: "rgba(255,0,0,0.5)" },
    { name: "2020-06 - 2020-11, Collins Aerospace on behalf of AKKA, Heidelberg (Germany)", lat: 49.42475767051419, lon: 8.637370994524945, desc: "<span style='color: red;'>Mechanical/Electrical Test Engineer</span><br><br>• Test plans for new reaction wheels<br>• Thermal vacuum chamber tests (with thermistors+thermal camera)<br>• Concept generation of blocking mechanisms for the rotor of a magnetic bearing wheel<br>• Electrical measurements on transformers<br>• Re-assembly of a force measurement test bench (Hexapod)<br><br>Tools: TV chamber, Thermal camera, Wheel controller, Oscilloscope,<br>ECSS-E-ST-10-03C, ECSS-E-ST-10-02C, ECSS-Q-ST-70-02C", color: "rgba(255,0,0,0.5)" },
    { name: "2022-01 - now, CNMCA (Italian Air Force) on behalf of Akkodis, Pomezia (Italy)", lat: 41.671332833990675, lon: 12.452481741310592, desc: "<span style='color: red;'>Software Engineer for operational meteorology</span><br><br>• Handling and archiving of satellite (MSG, MTG, Aqua/Terra, SUOMI-NPP, NOAA-POES, GOES, METOP, Himawari, Feng-Yun), radar, and lightning data<br>• Data processing and visualization<br>• Pipeline creation and automation<br>• Software maintenance and modernization<br>• Improvement of meteorological algorithms<br>• Image filtering/processing<br>• Validation and calibration of rain estimation products<br>• Distribution of final products to end users<br>• SW Manuals and Documentation<br><br>Tools: Bash, Python, Fortran90/77, Matlab, C, Satpy (Pytroll), gdal, cartopy, matplotlib, basemap, pyproj, keras/tensorflow, CGI 2met!, NWCGEO/NWCPY, EUMDAC, European Weather Cloud, Image Magick, crontab, ecflow, eccodes, Trello, RT-STPS, CSPP, IPOPP/MODISL1DB, Panoply, McIDAS<br>Data formats: BUFR, GRIB1/2, NETCDF, HDF, HRIT, LRIT, CADU, PDS, XPIF, CSV, ASCII, binary", color: "rgba(255,0,0,0.5)" },
];

var markers = [];
var currentIndex = 0;

// Function to create a custom numbered icon
function createNumberedIcon(number, color) {
    return L.divIcon({
        className: 'custom-marker',
        html: `<div style="background: ${color}; border: 2px solid rgb(230,230,230); color: white; width: 30px; height: 30px; 
                        border-radius: 50%; display: flex; align-items: center; 
                        justify-content: center; font-size: 16px; font-weight: bold;">
                        ${number}</div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 15]
    });
}

// Add numbered markers
locations.forEach((loc, index) => {
    let marker = L.marker([loc.lat, loc.lon], { icon: createNumberedIcon(index + 1, loc.color) })
        .addTo(map)
        .bindPopup(`<b>${loc.name}</b><br>${loc.desc}`);
    markers.push(marker);
    marker.on('click', () => showNextElement(index));
});

// Function to move the map and center the marker properly
function goToLocation(index) {
    let loc = locations[index];

    // Change section title
    if (loc.color == "rgba(255,0,0,0.5)") {
        document.querySelectorAll(".sections").forEach(el => el.style.display = 'none');
        document.getElementById("experience").style.display = 'block';
    } else if (loc.color == "rgba(0,0,255,0.5)") {
        document.querySelectorAll(".sections").forEach(el => el.style.display = 'none');
        document.getElementById("education").style.display = 'block';
    }

    // Get the map's current zoom level
    let zoomLevel = map.getZoom();
    
    // Move map so that the marker is at the center
    if (window.screen.height >= 1000) {
        map.panTo([loc.lat+2.5, loc.lon]);
    } else {
        map.panTo([loc.lat+3.5, loc.lon]);
    }

    // Open the popup after a short delay to ensure the marker is centered
    setTimeout(() => {
        markers[index].openPopup();
    }, 300);
}

// List of elements (markers + buttons)
const elements = [
    { type: "marker", id: 1 }, 
    { type: "marker", id: 2 }, 
    { type: "marker", id: 3 },
    { type: "marker", id: 4 },
    { type: "marker", id: 5 },
    { type: "marker", id: 6 },
    { type: "marker", id: 7 },
    { type: "button", id: "coding-skills", dropdown: "coding-dropdown" , section: "cs"},
    { type: "button", id: "languages", dropdown: "languages-dropdown", section: "la"},
    { type: "button", id: "additional-courses", dropdown: "courses-dropdown", section: "ac"},
    { type: "button", id: "hobbies", dropdown: "hobbies-dropdown", section: "ho"}
];

function showNextElement(index) {
    if (index < 0) index = elements.length - 1;
    if (index >= elements.length) index = 0;
    currentIndex = index;

    // Close all popups when switching to a new element
    markers.forEach(m => m.closePopup());

    // Hide all dropdowns first
    document.querySelectorAll(".dropdown-info").forEach(el => el.style.display = "none");

    let currentElement = elements[currentIndex];

    if (currentElement.type === "marker") {
        // Show Leaflet popup for normal markers
        goToLocation(currentElement.id - 1);
    } else if (currentElement.type === "button") {
        document.querySelectorAll(".sections").forEach(el => el.style.display = 'none');
        document.getElementById(currentElement.section).style.display = 'block';
        // Show dropdown for buttons
        const mq = window.matchMedia( "(min-width: 1320px)" );
        if (mq.matches) {
            var ddname = currentElement.dropdown
        } else {
            var ddname = currentElement.dropdown + '-mobile'
        }
        let dropdown = document.getElementById(ddname);
        if (dropdown) {
            dropdown.style.display = "block";
        }
    }
}

// Navigation Buttons
document.getElementById('prev').addEventListener('click', () => showNextElement(currentIndex - 1));
document.getElementById('next').addEventListener('click', () => showNextElement(currentIndex + 1));

// Enable scrolling to navigate
document.addEventListener("wheel", (event) => {
    // Prevent scroll if the event started inside a dropdown
    const path = event.composedPath();
    for (const el of path) {
        if (el.classList && el.classList.contains('dropdown-info')) {
            return; // Exit early — don't trigger navigation
        }
    }

    if (event.deltaY > 0) showNextElement(currentIndex + 1); // Scroll down -> Next
    else showNextElement(currentIndex - 1); // Scroll up -> Previous
});

// Allow manual clicks on buttons
document.querySelectorAll(".info-button").forEach(button => {
    button.addEventListener("click", function () {
        let currentId = this.id;
        let newIndex = -1;

        for (let i=0; i<elements.length; i++) {
            if (elements[i].id === currentId) {
                newIndex = i;
                break;
            }
        }

        if (newIndex !== -1) {
            showNextElement(newIndex);
        }
    })
});

// Dynamically position top-buttons below #pagetitle on mobile
function adjustTopButtons() {
    const pagetitle = document.getElementById('pagetitle');
    const topButtons = document.querySelector('.top-buttons');
    if (!pagetitle || !topButtons) return;

    const rect = pagetitle.getBoundingClientRect();
    // rect.bottom is the distance from viewport top to the bottom of #pagetitle
    topButtons.style.top = (rect.bottom + 8) + 'px';
}

// Run on load and on resize
adjustTopButtons();
window.addEventListener('resize', adjustTopButtons);
// Start at the first location
goToLocation(0);