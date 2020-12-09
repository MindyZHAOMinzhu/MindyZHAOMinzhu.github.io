let Gauge = function(configuration) {
    let that = {}

    let config = {
        size: 200,
        arcInset: 150,
        arcWidth: 60,

        pointerWidth: 8,
        pointerOffset: 0,
        pointerHeadLengthPercent: 0.9,

        minValue: 0,
        maxValue: 100,

        minAngle: -90,
        maxAngle: 90,

        //tips below the chart
        tips: "You can add anything you want",

        //animation transition
        transitionMs: 750,


        //Font 
        currentLabelFontSize: 20,
        currentLabelInset: 20,
        labelFont: "Montserrat",
        labelFontSize: 12,

        labelFormat: (numberToFormat) => {
            let prefix = d3.formatPrefix(numberToFormat)
            console.log(prefix)

            return prefix.scale(numberToFormat) + '' + prefix.symbol.toUpperCase()
        },

        arcColorFn: function(value) {
            let ticks = [{
                tick: 0,
                color: '#1d82ff'
            }]
            let ret;
            ticks.forEach(function(tick) {

                if (value > tick.tick) {
                    ret = tick.color
                    return
                }
            });
            return ret;
        }
    }

    function configure(configuration) {
        for (let prop in configuration) {
            config[prop] = configuration[prop]
        }
    }
    configure(configuration);

    let foreground, arc, svg, current;
    let cur_color;
    let new_color, hold;

    var oR = config.size - config.arcInset;
    var iR = config.size - oR - config.arcWidth;

    function deg2rad(deg) {
        return deg * Math.PI / 180
    }

    function render(value) {

        //oR = 30;
        //iR = 10;



        // Arc Defaults
        arc = d3.svg.arc()
            .innerRadius(iR)
            .outerRadius(oR)
            .startAngle(deg2rad(-90))

        // Place svg element
        svg = d3.select("#d3Gauge1").append("svg")
            .attr("width", config.size)
            .attr("height", config.size)
            .append("g")
            .attr("transform", "translate(" + config.size / 2 + "," + config.size / 2 + ")")



        // Append background arc to svg
        var background = svg.append("path")
            .datum({
                endAngle: deg2rad(90)
            })
            .attr("class", "gaugeBackground")
            .attr("d", arc)

        // Append foreground arc to svg
        foreground = svg.append("path")
            .datum({
                endAngle: deg2rad(-90)
            })
            //.style("fill", cur_color)
            .attr("d", arc);

        // Display Max value
        var max = svg.append("text")
            .attr("transform", "translate(" + (iR + ((oR - iR) / 2)) + ",15)") // Set between inner and outer Radius
            .attr("text-anchor", "middle")
            .style("font-family", config.labelFont)
            .style("font-size", config.labelFontSize)
            .text(config.labelFormat(config.maxValue) + "%")


        // Display Min value
        var min = svg.append("text")
            .attr("transform", "translate(" + -(iR + ((oR - iR) / 2)) + ",15)") // Set between inner and outer Radius
            .attr("text-anchor", "middle")
            .style("font-size", config.labelFontSize)
            .style("font-family", config.labelFont)
            .text(config.minValue)

        // Display Current value  
        current = svg.append("text")
            .attr("transform", "translate(0," + -(-config.currentLabelInset + iR / 4) + ")") // Push up from center 1/4 of innerRadius
            .attr("text-anchor", "middle")
            .style("font-size", config.currentLabelFontSize)
            .style("font-family", config.labelFont)
            .text(config.labelFormat(current))
            // .text("*")

        // Display Your Discription of the data visulasation 
        tip = svg.append("text")
            .attr("transform", "translate(0," + -(-config.currentLabelInset - iR / 4) + ")") // Push up from center 1/4 of innerRadius
            .attr("text-anchor", "middle")
            .style("font-size", config.currentLabelFontSize - 3)
            .style("font-family", config.labelFont)
            .text(config.tips)
            //     // .text("*")

    }


    function update(value) {
        // Get new color
        new_color = config.arcColorFn(value)
        console.log(new_color)

        var numPi = deg2rad(Math.floor(value * 180 / config.maxValue - 90));

        // Display Current value
        current.transition()
            .text(value + "%")
            // .text(config.labelFormat(value))

        // Arc Transition
        foreground.transition()
            .duration(config.transitionMs)
            .styleTween("fill", function() {
                return d3.interpolate(new_color, cur_color);
            })
            .call(arcTween, numPi);

        // Set colors for next transition
        hold = cur_color;
        cur_color = new_color;
        new_color = hold;
    }

    // Update animation
    function arcTween(transition, newAngle) {
        transition.attrTween("d", function(d) {
            var interpolate = d3.interpolate(d.endAngle, newAngle);
            return function(t) {
                d.endAngle = interpolate(t);
                return arc(d);
            };
        });
    }

    render();
    that.update = update;
    that.configuration = config;
    return that;
}

//develop three chart into svg
let g1 = new Gauge({
    size: 200,
    tips: "Aided schools"
});
console.log(g1)
g1.update(77);


let g2 = new Gauge({
    size: 200,
    tips: "Co-educational"
});
console.log(g2)
g2.update(87);

// g2.update(100);

let g3 = new Gauge({
    size: 200,
    tips: "Religious background"
});
console.log(g3)
g3.update(56);