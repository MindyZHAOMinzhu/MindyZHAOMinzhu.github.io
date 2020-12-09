// set the dimensions and margins of the graph
var width = 450
height = 250
margin = 40
    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
var radius = Math.min(width, height) / 2 - margin

// append the svg object to the div called 'my_dataviz'
var svg = d3.select("#d3piechart")
    .append("text")
    //You can add tips for the chart here
    .text("Some tips for the chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
// create 2 data_set
var data1 = { "Yes": 40.1, "No": 59.7, "Not response": 0.2 }
var data2 = { "Yes": 33.7, "No": 66.1, "Not response": 0.2 }

// set the color scale
var color = d3.scaleOrdinal()
    .domain(["Yes", "No", "Not response"])
    .range(d3.schemeDark2);

// A function that create / update the plot for a given variable:


function update(data) {

    // Compute the position of each group on the pie:
    var pie = d3.pie()
        .value(function(d) { return d.value; })
        .sort(function(a, b) { console.log(a); return d3.ascending(a.key, b.key); }) // This make sure that group order remains the same in the pie chart
    var data_ready = pie(d3.entries(data))


    // map to data
    var u = svg.selectAll("path")
        .data(data_ready)

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    u
        .enter()
        .append('path')
        .merge(u)
        .transition()
        .duration(1000)
        .attr('d', d3.arc()
            .innerRadius(0)
            .outerRadius(radius)
        )
        .attr('fill', function(d) { return (color(d.data.key)) })
        .attr("stroke", "white")
        .style("stroke-width", "2px")
        .style("opacity", 1)



    // remove the group that is not present anymore
    u
        .exit()
        .remove()

    // var labelFont = "Helvetica"
    // var currentLabelFontSize = 22

    // svg.append("text")
    //     .attr("transform", "translate(" + -radius / 2 + "," + -radius / 9 + ")")
    //     .style("font-size", currentLabelFontSize)
    //     .style("font-family", labelFont)
    //     .attr("text-anchor", "middle")
    //     .text("test")
    // svg.append("text")
    //     .attr("transform", "translate(" + radius / 2 + "," + -radius / 9 + ")")
    //     .style("font-size", currentLabelFontSize)
    //     .style("font-family", labelFont)
    //     .attr("text-anchor", "middle")
    //     .text(data.value)



}

// Initialize the plot with the first dataset
update(data1)