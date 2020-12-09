var format = d3.format(",");

// Set tooltips
var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function (d) {
        if (d.population != null) {
            return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span>" + "<strong>Legal Age of Consent: </strong><span class='details-tips'>" + d.population + "</span>";

        }
        return "<strong>Country: </strong><span class='details'>" + d.properties.name;
    })

var margin = {
    top: 20,
    right: 20,
    bottom: 10,
    left: 20
},

    width = 960 - margin.left - margin.right,
    height = 640 - margin.top - margin.bottom;

//The darker the color, higher the age of consent, color is scaled by ages

var color = d3.scaleThreshold()
    .domain([10, 15, 20])
    .range(["rgb (184, 225, 251)", "rgb(87, 178, 227)", "rgb(34, 123, 177)"]);



var path = d3.geoPath();


var svgMap1 = d3.select("#world-map")
    .style("font-family", "Montserrat")
    .append("svg")
    .attr("preserveAspectRatio", "xMinYMin meet")
    //set responsive
    .attr("viewBox", "0 0 " + width + " " + height)
    .classed("svg-content", true)
    // .attr("width", width)
    // .attr("height", height)
    .append('g')
    .attr('class', 'map');


var projection = d3.geoMercator()
    .scale(130)
    .translate([width / 2, (height + 12) / 1.5]);

var path = d3.geoPath().projection(projection);

svgMap1.call(tip);

// import geo data and aage data
queue()
    .defer(d3.json, "./assets/data/world_countries.json")
    .defer(d3.tsv, "./assets/data/world_age.tsv")
    .await(ready);

function ready(error, data, population) {
    var populationById = {};
    var tipsById = {};


    population.forEach(function (d) {
        populationById[d.id] = +d.population;
        tipsById[d.id] = d.tips;
    });


    data.features.forEach(function (d) {
        d.population = populationById[d.id]
        d.tips = tipsById[d.id]

    });

    svgMap1.append("g")
        .attr("class", "countries")
        .selectAll("path")
        .data(data.features)
        .enter().append("path")
        .attr("d", path)
        .style("fill", function (d) {
            if (populationById[d.id]) {
                return color(populationById[d.id]);
            }
            return "#A3C4D7";

        })
        .style('stroke', 'white')
        .style('stroke-width', 1.5)
        .style("opacity", 0.8)
        // tooltips
        .style("stroke", "white")
        .style('stroke-width', 0.3)
        .on('mouseover', function (d) {
            tip.show(d);

            d3.select(this)
                .style("opacity", 1)
                .style("stroke", "white")
                .style("stroke-width", 3);
        })
        .on('mouseout', function (d) {
            tip.hide(d);

            d3.select(this)
                .style("opacity", 0.8)
                .style("stroke", "white")
                .style("stroke-width", 0.3);
        });

    // Add title and explanation
    svgMap1
        .append("text")
        .attr("text-anchor", "middel")
        .style("fill", "black")
        .attr("x", width - 440)
        // .attr("y", height - 415)
        .attr("y", 20 + (margin.top / 2))
        .attr("width", 80)
        .html("The Legal Age of Consent around the World")
        .style("font-size", 22)
        .style("font-family", "Montserrat")

    //append tips bewlow
    svgMap1
        .append("text")
        .attr("text-anchor", "end")
        .style("fill", "black")
        .attr("x", width + 200)
        .attr("y", height + 150)
        .attr("width", 80)
        .html("The Age of Consent is the legal age at which an individual is considered mature enough to consent to sex.")
        .style("font-size", 10)
        .style("font-family", "Montserrat")
    svgMap1
        .append("text")
        .attr("text-anchor", "end")
        .style("fill", "black")
        .attr("x", width + 200)
        .attr("y", height + 160)
        .attr("width", 80)
        .html("The darker the color, higher the age of consent")
        .style("font-size", 10)
        .style("font-family", "Montserrat")

    svgMap1.append("path")
        .datum(topojson.mesh(data.features, function (a, b) {
            return a.id !== b.id;
        }))
        .attr("class", "names")
        .attr("d", path);
}