// set the dimensions and margins of the graph
var margin = { top: 10, right: 10, bottom: 100, left: 50 },
    width = 760 - margin.left - margin.right,
    height = 550 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg3 = d3.select("#linechart")
    .append("svg")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 760 550")
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv("./assets/data/data_dynamiclinechart.csv", function(data) {

    // List of groups (here I have one group per column)
    var allGroup = ["male", "female", "all"]

    // add the options to the button
    d3.select("#selectButton")
        .selectAll('myOptions')
        .data(allGroup)
        .enter()
        .append('option')
        .style("font-family", "Montserrat")
        .text(function(d) { return d; }) // text showed in the menu
        .attr("value", function(d) { return d; }) // corresponding value returned by the button


    // A color scale: one color for each group
    var myColor = d3.scaleOrdinal()
        .domain(allGroup)
        .range(d3.schemeDark2);

    // Add X axis --> it is a date format
    var x = d3.scaleLinear()
        .domain([2000, 2020])
        .range([0, width]);

    var xaxisLine = d3.axisBottom(x)
    xaxisLine.tickValues([2001, 2006, 2011, 2016])
        .tickSize([5])

    svg3.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(xaxisLine);

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, 0.6])
        .range([height, 0]);

    var yaxis = d3.axisLeft(y)
        // .tickSize([2])
        .ticks(10)
        .tickValues([0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6])
        // .ticks(every(0.3))

    .tickFormat(d3.format(".0%"));
    svg3.append("g")
        .call(yaxis);

    // Initialize line with male

    var lineFeMale = svg3
        .append('g')
        .append("path")
        .datum(data)
        .attr("d", d3.line()
            .x(function(d) { return x(+d.time) })
            .y(function(d) { return y(+d.female) })
        )
        .attr("stroke", function(d) { return myColor(230) })
        .style("stroke-width", 4)
        .style("fill", "none")
        .style('opacity', 0);

    // Initialize line with female but hide it at the beginning
    var lineMale = svg3
        .append('g')
        .append("path")
        .datum(data)
        .attr("d", d3.line()
            .x(function(d) { return x(+d.time) })
            .y(function(d) { return y(+d.male) })
        )
        .attr("stroke", function(d) { return myColor(100) })
        .style("stroke-width", 4)
        .style("fill", "none")
        // .style('opacity', 0);


    // A function that update the chart
    function update(selectedGroup) {

        // Create new data with the selection?
        var dataFilter = data.map(function(d) { return { time: d.time, value: d[selectedGroup] } })
            // Give these new data to update line
        line
            .datum(dataFilter)
            .transition()
            .duration(1000)
            .attr("d", d3.line()
                .x(function(d) { return x(+d.time) })
                .y(function(d) { return y(+d.value) })
            )
            .attr("stroke", function(d) { return myColor(selectedGroup) })


    }

    // A function to show male line
    function updateMale() {


        lineMale
            .transition()
            .duration(1000)
            .style('opacity', 5)

        lineFeMale
            .transition()
            .duration(500)
            .style('opacity', 0);

    }

    // A function to show female line
    function updateFemale() {

        lineFeMale
            .transition()
            .duration(1000)
            .style('opacity', 5);
        lineMale
            .transition()
            .duration(500)
            .style('opacity', 0);

    }

    // A function to show two lines to compare
    function updateAll() {


        lineMale
            .transition()
            .duration(1000)
            .style('opacity', 5);

        lineFeMale
            .transition()
            .duration(1000)
            .style('opacity', 5);

    }

    // When the button is changed, run the updateChart function
    d3.select("#selectButton").on("change", function(d) {

        if (d3.select(this).property("value") == "all") {
            updateAll()
        } else if (d3.select(this).property("value") == "female") {
            updateFemale()
        } else {
            updateMale()
        }
    })

})