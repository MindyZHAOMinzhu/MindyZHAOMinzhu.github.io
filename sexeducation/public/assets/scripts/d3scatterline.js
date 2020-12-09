// set the dimensions and margins of the graph
var margin = { top: 30, right: 100, bottom: 100, left: 80 },
    width = 800 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#scatterline")
    .append("svg")
    // .attr("width", width + margin.left + margin.right)
    // .attr("height", height + margin.top + margin.bottom)
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 800 500")
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv("./assets/data/firstpregnancy_hk.csv", function(data) {
    // List of groups (here I have one group per column)
    var allGroup = ["Under 18", "19-22", "23 and above"]

    // Reformat the data: we need an array of arrays of {x, y} tuples
    var dataReady = allGroup.map(function(grpName) { // .map allows to do something for each element of the list
        return {
            name: grpName,
            values: data.map(function(d) {
                return { time: d.time, value: +d[grpName] };
            })
        };
    });
    // I strongly advise to have a look to dataReady with
    // console.log(dataReady)

    // A color scale: one color for each group
    var myColor = d3.scaleOrdinal()
        .domain(allGroup)
        .range(d3.schemeSet2);


    //X, Y轴的生成使用的是内置函数，fontsize很难修改，尝试了几种方法都没有成功

    // Add X axis --> it is a date format
    var x = d3.scaleLinear()
        .domain([2000, 2020])
        .range([0, width]);

    //通过生成xaxis的方法以调整text size， d3 axis api ref: https://github.com/d3/d3-axis
    var xaxis = d3.axisBottom(x)
    xaxis.tickValues([2001, 2006, 2011, 2016])
        .tickSize([5])
        // .tickFormat(d3.format("%d"));

    // .timeFormat("%c")
    svg.append("g")
        .attr("class", "axisforscatter")
        .attr("transform", "translate(0," + height + ")")
        .call(xaxis);

    // Add Y axis

    var y = d3.scaleLinear()
        .domain([0, 0.5])
        .range([height, 0]);


    var yaxis = d3.axisLeft(y)
        // .tickSize([2])
        .ticks(15)
        .tickValues([0, 0.1, 0.2, 0.3, 0.4, 0.5])
        // .ticks(every(0.3))
        .tickFormat(d3.format(".0%"));

    svg.append("g")
        .attr("class", "axisforscatter")
        .call(yaxis);
    // .tickValues([2001, 2006]);

    // Add the lines
    var line = d3.line()
        .x(function(d) { return x(+d.time) })
        .y(function(d) { return y(+d.value) })
    svg.selectAll("myLines")
        .data(dataReady)
        .enter()
        .append("path")
        .attr("class", function(d) { return d.name })
        .attr("d", function(d) { return line(d.values) })
        .attr("stroke", function(d) { return myColor(d.name) })
        .style("stroke-width", 4)
        .style("fill", "none")

    // Add the points
    svg
    // First we need to enter in a group
        .selectAll("myDots")
        .data(dataReady)
        .enter()
        .append('g')
        .style("fill", function(d) { return myColor(d.name) })
        .attr("class", function(d) { return d.name })
        // Second we need to enter in the 'values' part of this group
        .selectAll("myPoints")
        .data(function(d) { return d.values })
        .enter()
        .append("circle")
        .attr("cx", function(d) { return x(d.time) })
        .attr("cy", function(d) { return y(d.value) })
        .attr("r", 5)
        .attr("stroke", "white")

    // Add a label at the end of each line
    svg
        .selectAll("myLabels")
        .data(dataReady)
        .enter()
        .append('g')
        .append("text")
        .attr("class", function(d) { return d.name })
        .datum(function(d) { return { name: d.name, value: d.values[d.values.length - 1] }; }) // keep only the last value of each time series
        .attr("transform", function(d) { return "translate(" + x(d.value.time) + "," + y(d.value.value) + ")"; }) // Put the text at the position of the last point
        .attr("x", 12) // shift the text a bit more right
        .text(function(d) { return d.name; })
        .style("fill", function(d) { return myColor(d.name) })
        .style("font-size", 15)

    // Add a legend (interactive)
    svg
        .selectAll("myLegend")
        .data(dataReady)
        .enter()
        .append('g')
        .append("text")
        .attr('x', function(d, i) { return 25 + i * 80 })
        .attr('y', 30)
        .text(function(d) { return d.name; })
        .style("fill", function(d) { return myColor(d.name) })
        .style("font-size", 15)
        .on("click", function(d) {
            // is the element currently visible ?
            currentOpacity = d3.selectAll("." + d.name).style("opacity")
                // Change the opacity: from 0 to 1 or from 1 to 0
            d3.selectAll("." + d.name).transition().style("opacity", currentOpacity == 1 ? 0 : 1)

        })
})