//reference:https://www.amcharts.com/demos/animated-bullet-at-the-end-of-the-series/
am4core.ready(function() {

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    var chart = am4core.create("chartdiv3", am4charts.XYChart);



    // Add data
    chart.data = [{
        "date": new Date(2001, 1, 1),
        "valueF": 62.1,
        "valueM": 50.4
    }, {
        "date": new Date(2006, 3, 21),
        "valueF": 69.2,
        "valueM": 57.4
    }, {
        "date": new Date(2011, 3, 22),
        "valueF": 84.7,
        "valueM": 84.4
    }, {
        "date": new Date(2016, 3, 25),
        "valueF": 84.8,
        "valueM": 83.1,
        "disabled": false
    }];

    // add title
    var title = chart.titles.create();
    // title.text = "Popotion of respondents attained sufficient sexual education 2001-2016";
    title.fontSize = 22;
    title.marginBottom = 20;

    // var subtitle = chart.chartContainer.createChild(am4core.Label);
    // subtitle.text = "%, 2001-2016";
    // subtitle.align = "right";
    // subtitle.isMeasured = false;
    // subtitle.x = 580;
    // subtitle.y = -20;
    // subtitle.fontSize = 12;
    // subtitle.marginHead = 100;

    // add legend
    var label = chart.chartContainer.createChild(am4core.Label);
    label.text = "Year";
    label.align = "center";

    /* Add legend */

    chart.legend = new am4charts.Legend();
    chart.legend.maxHeight = 150;
    chart.legend.legendposition = top;
    /* Create a cursor */
    chart.cursor = new am4charts.XYCursor();


    let labelsource = chart.createChild(am4core.Label);
    //labelsource.text = "Source: Report on Youth Sexuality Study 2016 by the FPAHK";
    labelsource.fontSize = 10;
    labelsource.align = "center";
    labelsource.isMeasured = false;
    labelsource.x = 50;
    labelsource.y = 0;

    // Create axes
    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());

    // Create value axis
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.max = 100;

    valueAxis.title.text = "%";
    valueAxis.title.rotation = -90;
    valueAxis.title.align = "center";
    valueAxis.title.valign = "top";
    valueAxis.title.dy = 100;
    valueAxis.title.fontWeight = 600;
    // Create series
    var lineSeries = chart.series.push(new am4charts.LineSeries());
    lineSeries.dataFields.valueY = "valueF";
    lineSeries.dataFields.dateX = "date";
    lineSeries.name = "Female";
    lineSeries.strokeWidth = 3;
    lineSeries.strokeDasharray = "5,4";


    var lineSeries2 = chart.series.push(new am4charts.LineSeries());
    lineSeries2.dataFields.valueY = "valueM";
    lineSeries2.dataFields.dateX = "date";
    lineSeries2.name = "Male";
    lineSeries2.strokeWidth = 3;
    lineSeries2.strokeDasharray = "5,4";

    // Add simple bullet
    var bullet = lineSeries.bullets.push(new am4charts.CircleBullet());
    bullet.disabled = true;
    bullet.propertyFields.disabled = "disabled";

    var bullet2 = lineSeries2.bullets.push(new am4charts.CircleBullet());
    bullet2.disabled = true;
    bullet2.propertyFields.disabled = "disabled";

    var secondCircle = bullet.createChild(am4core.Circle);
    secondCircle.radius = 6;
    secondCircle.fill = chart.colors.getIndex(8);


    var secondCircle2 = bullet2.createChild(am4core.Circle);
    secondCircle2.radius = 6;
    secondCircle2.fill = chart.colors.getIndex(8);


    bullet.events.on("inited", function(event) {
        animateBullet(event.target.circle);
    })

    bullet2.events.on("inited", function(event) {
        animateBullet(event.target.circle);
    })


    function animateBullet(bullet) {
        var animation = bullet.animate([{ property: "scale", from: 1, to: 5 }, { property: "opacity", from: 1, to: 0 }], 1000, am4core.ease.circleOut);
        animation.events.on("animationended", function(event) {
            animateBullet(event.target.object);
        })
    }


}); // end am4core.ready()