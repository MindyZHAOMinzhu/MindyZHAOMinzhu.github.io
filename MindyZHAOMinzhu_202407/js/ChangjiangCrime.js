am4core.ready(function() {

    // Themes begin
    am4core.useTheme(am4themes_amchartsdark);
    // Themes end

    // Create chart instance
    var chart = am4core.create("chartdiv02", am4charts.XYChart);


    // Add data
    chart.data = [{
        "date": "2013",
        "value": 90
    }, {
        "date": "2014",
        "value": 102
    }, {
        "date": "2015",
        "value": 65
    }, {
        "date": "2016",
        "value": 62
    }, {
        "date": "2017",
        "value": 55
    }, {
        "date": "2018",
        "value": 81
    }, {
        "date": "2019",
        "value": 61
    }, {
        "date": "2020",
        "value": 19
    }];

    // Create axes
    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());

    // Create value axis
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    var lineSeries = chart.series.push(new am4charts.LineSeries());
    lineSeries.dataFields.valueY = "value";
    lineSeries.dataFields.dateX = "date";
    lineSeries.name = "Sales";
    lineSeries.strokeWidth = 3;


    var Label = lineSeries.bullets.push(new am4charts.LabelBullet());
    Label.label.text = "{valueY}";
    Label.label.hideOversized = false;
    Label.label.truncate = false;
    Label.label.horizontalCenter = "center";
    Label.label.dx = -26;
    Label.label.dy = -15;
    Label.label.fill = am4core.color("white");

    // Add simple bullet
    var bullet = lineSeries.bullets.push(new am4charts.Bullet());
    var image = bullet.createChild(am4core.Image);
    image.href = "https://www.amcharts.com/lib/images/star.svg";
    image.width = 30;
    image.height = 30;
    image.horizontalCenter = "middle";
    image.verticalCenter = "middle";

    //Add Title 
    let title = chart.titles.create();
    title.color = "red";
    title.text = "Number of illegal fishing in the Yangtze River from 2013 to 2020";
    // title.color = rgb(0);
    title.fontSize = 14;
    title.marginBottom = 30;
    title.marginTop = 20;


    //Add bottom labels
    let label = chart.chartContainer.createChild(am4core.Label);
    label.text = "Source: Chinese Government Judgement Website";
    label.align = "left";
    label.marginBottom = 10;
    label.marginTop = 10;
    label.fontSize = 8;



    let topContainer = chart.chartContainer.createChild(am4core.Container);
    topContainer.layout = "absolute";
    topContainer.toBack();
    topContainer.paddingBottom = 15;
    topContainer.width = am4core.percent(100);

    let axisTitle = topContainer.createChild(am4core.Label);
    axisTitle.text = "Number of Cases";
    axisTitle.fontWeight = 600;
    axisTitle.align = "left";
    axisTitle.paddingLeft = 10;
    axisTitle.fontSize = 8;

    let dateTitle = topContainer.createChild(am4core.Label);
    dateTitle.text = "January 1st, 2013 -- October 1st, 2020";
    dateTitle.fontWeight = 600;
    dateTitle.fontSize = 8;
    dateTitle.align = "right";
}); // end am4core.ready()