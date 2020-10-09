am4core.ready(function() {

    // Themes begin
    am4core.useTheme(am4themes_amchartsdark);
    // Themes end

    // Create chart instance
    var chart = am4core.create("chartdiv01", am4charts.XYChart);

    // Add data
    chart.data = [{
        "years": "2013",
        "freshmen": 2065.94
    }, {
        "years": "2014",
        "freshmen": 2035.04
    }, {
        "years": "2015",
        "freshmen": 2016.96
    }, {
        "years": "2016",
        "freshmen": 1973.41
    }, {
        "years": "2017",
        "freshmen": 1931.85
    }, {
        "years": "2018",
        "freshmen": 1878.68
    }];

    // Create axes

    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "years";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;

    categoryAxis.renderer.labels.template.adapter.add("dy", function(dy, target) {
        if (target.dataItem && target.dataItem.index & 2 == 2) {
            return dy;
        }
        return dy;
    });

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    valueAxis.fontSize = 15;

    // Create series
    var series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "freshmen";
    series.dataFields.categoryX = "years";
    // series.dataFields.categoryX.fontSize = 5;
    series.name = "Freshmen";
    series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
    series.columns.template.fillOpacity = .6;



    var Label = series.bullets.push(new am4charts.LabelBullet());
    Label.label.text = "{valueY}";
    Label.label.hideOversized = false;
    Label.label.truncate = false;
    Label.label.horizontalCenter = "center";
    Label.label.dx = -26;
    Label.label.dy = -10;
    Label.label.fill = am4core.color("white");

    var columnTemplate = series.columns.template;
    columnTemplate.strokeWidth = 1.5;
    columnTemplate.strokeOpacity = 1;

    //Add Title 
    let title = chart.titles.create();
    title.text = "Number of fishmen in the Yangtze River from 2013 to 2018";
    // title.color = rgb(0);
    title.fontSize = 14;
    title.marginBottom = 30;

    //Add bottom labels
    let label = chart.chartContainer.createChild(am4core.Label);
    label.text = "Source: https://www.chyxx.com/industry/201909/783955.html";
    label.marginBottom = 10;
    label.fontSize = 8;
    label.align = "left";

}); // end am4core.ready()