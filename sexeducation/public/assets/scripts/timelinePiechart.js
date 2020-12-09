//for reference: https://www.amcharts.com/demos/animated-time-line-pie-chart/
am4core.ready(function() {

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    /**
     * Define data for each year
     */
    var chartData = {
        "2001": [
            { "sector": "Under 18", "size": 30.8 },
            { "sector": "19-22", "size": 42 },
            { "sector": "23 and above", "size": 21 },
            { "sector": "No response", "size": 6.2 }
        ],
        "2006": [
            { "sector": "Under 18", "size": 30.2 },
            { "sector": "19-22", "size": 32.7 },
            { "sector": "23 and above", "size": 20.7 },
            { "sector": "No response", "size": 17.2 }
        ],
        "2011": [
            { "sector": "Under 18", "size": 24.1 },
            { "sector": "19-22", "size": 45.2 },
            { "sector": "23 and above", "size": 28.9 },
            { "sector": "No response", "size": 1.9 }
        ],
        "2016": [
            { "sector": "Under 18", "size": 20.1 },
            { "sector": "19-22", "size": 35.5 },
            { "sector": "23 and above", "size": 37.1 },
            { "sector": "No response", "size": 7.3 }
        ]
    };

    // Create chart instance
    var chart = am4core.create("chartdiv4", am4charts.PieChart);

    //add title
    let title = chart.titles.create();
    //title.text = "Distribution of never-married respondents’ experience of sexual intercourse";

    title.fontSize = 15;
    title.marginBottom = 30;

    var subtitle = chart.seriesContainer.createChild(am4core.Label);
    subtitle.text = "by age, 2001-2016";
    subtitle.x = 100;
    subtitle.y = -240;
    subtitle.fontSize = 10;



    // Add data
    chart.data = [
        { "sector": "Under 18", "size": 30.8 },
        { "sector": "19-22", "size": 42 },
        { "sector": "23 and above", "size": 21 },
        { "sector": "No response", "size": 6.2 }
    ];

    // Add legend
    // chart.legend = new am4charts.Legend();
    // // chart.legend.maxHeight = 100;
    // // chart.legend.scrollable = true;
    // // chart.legend.legendposition = "right";
    // chart.legend.fontSize = 12;

    // let marker = chart.legend.markers.template.children.getIndex(0);
    // marker.cornerRadius(12, 12, 12, 12);
    // marker.width = 6;
    // marker.height = 6;
    // marker.strokeWidth = 2;
    // marker.strokeOpacity = 1;
    // Add label

    chart.innerRadius = 100;
    var label = chart.seriesContainer.createChild(am4core.Label);
    label.text = "2001";
    label.horizontalCenter = "middle";
    label.verticalCenter = "middle";
    label.fontSize = 45;


    //Add sub source
    var sourcelegend = chart.seriesContainer.createChild(am4core.Label);
    //sourcelegend.text = "Source: Report on Youth Sexuality Study 2016 by the FPAHK";
    sourcelegend.x = -140;
    sourcelegend.y = 250;
    sourcelegend.fontSize = 10;

    // Add and configure Series
    var pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "size";
    pieSeries.dataFields.category = "sector";

    //Change the fontsize
    pieSeries.fontSize = 10;
    // Animate chart data
    var currentYear = 2001;

    function getCurrentData() {
        label.text = currentYear;
        var data = chartData[currentYear];
        currentYear = currentYear + 5;
        if (currentYear > 2016)
            currentYear = 2001;
        return data;
    }

    function loop() {
        //chart.allLabels[0].text = currentYear;
        var data = getCurrentData();
        for (var i = 0; i < data.length; i++) {
            chart.data[i].size = data[i].size;
        }
        chart.invalidateRawData();
        chart.setTimeout(loop, 2000);
    }

    loop();

}); // end am4core.ready()