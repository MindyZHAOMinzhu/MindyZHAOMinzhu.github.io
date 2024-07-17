am4core.ready(function() {

    // Themes begin
    am4core.useTheme(am4themes_amchartsdark);
    // Themes end

    // Create map instance
    var chart = am4core.create("AnimationMap", am4maps.MapChart);
    chart.geodata = am4geodata_worldLow;
    chart.projection = new am4maps.projections.Miller();
    chart.homeZoomLevel = 10;
    chart.homeGeoPoint = {
        latitude: 29.4316,
        longitude: 106.9123
    };

    // Create map polygon series
    var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.useGeodata = true;
    polygonSeries.mapPolygons.template.fill = chart.colors.getIndex(0).lighten(0.5);
    polygonSeries.mapPolygons.template.nonScalingStroke = true;
    polygonSeries.exclude = ["AQ"];

    // Add line bullets
    var cities = chart.series.push(new am4maps.MapImageSeries());
    cities.mapImages.template.nonScaling = true;

    var city = cities.mapImages.template.createChild(am4core.Circle);
    city.radius = 6;
    city.fill = chart.colors.getIndex(0).brighten(-0.2);
    city.strokeWidth = 2;
    city.stroke = am4core.color("#fff");

    function addCity(coords, title) {
        var city = cities.mapImages.create();
        city.latitude = coords.latitude;
        city.longitude = coords.longitude;
        city.tooltipText = title;
        return city;
    }

    var Chongqing = addCity({ "latitude": 29.4316, "longitude": 106.9123 }, "Chong Qing");
    var Hubei = addCity({ "latitude": 30.7378, "longitude": 112.2384 }, "Hu Bei");
    var Shandong = addCity({ "latitude": 35.8940, "longitude": 117.9249 }, "Shan Dong");
    var Jiangsu = addCity({ "latitude": 33.1402, "longitude": 119.7889 }, "Jiang Su");
    var Shanghai = addCity({ "latitude": 31.2304, "longitude": 121.4737 }, "Shang Hai");
    var Guangdong = addCity({ "latitude": 23.3790, "longitude": 113.7633 }, "Guang Dong");
    var Zhejiang = addCity({ "latitude": 29.1416, "longitude": 119.7889 }, "Zhe Jiang");
    var Fujian = addCity({ "latitude": 26.4837, "longitude": 117.9249 }, "Fu Jian");
    var Anhui = addCity({ "latitude": 30.6007, "longitude": 117.9249 }, "An Hui");
    var Jiangxi = addCity({ "latitude": 27.0875, "longitude": 114.9042 }, "Jiang Xi");
    var Sichuan = addCity({ "latitude": 30.2638, "longitude": 102.8055 }, "Si Chuan");
    var Hunan = addCity({ "latitude": 27.6253, "longitude": 111.8569 }, "Hu Nan");

    // Add lines
    var lineSeries = chart.series.push(new am4maps.MapArcSeries());
    lineSeries.mapLines.template.line.strokeWidth = 2;
    lineSeries.mapLines.template.line.strokeOpacity = 0.5;
    lineSeries.mapLines.template.line.stroke = city.fill;
    lineSeries.mapLines.template.line.nonScalingStroke = true;
    lineSeries.mapLines.template.line.strokeDasharray = "1,1";
    lineSeries.zIndex = 10;

    var shadowLineSeries = chart.series.push(new am4maps.MapLineSeries());
    shadowLineSeries.mapLines.template.line.strokeOpacity = 0;
    shadowLineSeries.mapLines.template.line.nonScalingStroke = true;
    shadowLineSeries.mapLines.template.shortestDistance = false;
    shadowLineSeries.zIndex = 5;

    function addLine(from, to) {
        var line = lineSeries.mapLines.create();
        line.imagesToConnect = [from, to];
        line.line.controlPointDistance = -0.3;

        var shadowLine = shadowLineSeries.mapLines.create();
        shadowLine.imagesToConnect = [from, to];

        return line;
    }

    addLine(Chongqing, Hubei);
    addLine(Chongqing, Shandong);
    addLine(Chongqing, Jiangsu);
    addLine(Chongqing, Guangdong);
    addLine(Chongqing, Zhejiang);
    addLine(Chongqing, Fujian);
    addLine(Chongqing, Anhui);
    addLine(Chongqing, Jiangxi);
    addLine(Chongqing, Sichuan);
    addLine(Chongqing, Hunan);

    // Add plane
    var plane = lineSeries.mapLines.getIndex(0).lineObjects.create();
    plane.position = 0;
    plane.width = 2;
    plane.height = 2;

    plane.adapter.add("scale", function(scale, target) {
        return 0.5 * (1 - (Math.abs(0.5 - target.position)));
    })

    var planeImage = plane.createChild(am4core.Sprite);
    planeImage.scale = 0.008;
    planeImage.horizontalCenter = "middle";
    planeImage.verticalCenter = "middle";
    planeImage.path = `M940 2167 c-180 -61 -325 -227 -374 -428 -22 -89 -21 -237 2 -325 31
    -117 78 -201 162 -284 115 -115 218 -160 370 -160 243 0 439 162 521 430 29
    95 31 251 5 350 -56 207 -207 369 -395 424 -81 24 -211 21 -291 -7z"/>
    <path d="M580 807 c-80 -51 -201 -127 -270 -169 -69 -42 -144 -96 -167 -120
    -104 -107 -118 -275 -31 -374 l30 -34 960 0 960 0 28 28 c59 60 61 181 5 297
    -41 86 -113 145 -377 310 l-248 155 -62 0 c-44 0 -75 -7 -107 -22 -83 -41
    -360 -36 -428 8 -13 8 -48 14 -85 14 -63 0 -65 -1 -208 -93z`;
    planeImage.fill = chart.colors.getIndex(2).brighten(-0.2);
    planeImage.strokeOpacity = 0;

    var shadowPlane = shadowLineSeries.mapLines.getIndex(0).lineObjects.create();
    shadowPlane.position = 0;
    shadowPlane.width = 8;
    shadowPlane.height = 8;

    var shadowPlaneImage = shadowPlane.createChild(am4core.Sprite);
    shadowPlaneImage.scale = 0.09;
    shadowPlaneImage.horizontalCenter = "middle";
    shadowPlaneImage.verticalCenter = "middle";
    shadowPlaneImage.path = `M940 2167 c-180 -61 -325 -227 -374 -428 -22 -89 -21 -237 2 -325 31
    -117 78 -201 162 -284 115 -115 218 -160 370 -160 243 0 439 162 521 430 29
    95 31 251 5 350 -56 207 -207 369 -395 424 -81 24 -211 21 -291 -7z"/>
    <path d="M580 807 c-80 -51 -201 -127 -270 -169 -69 -42 -144 -96 -167 -120
    -104 -107 -118 -275 -31 -374 l30 -34 960 0 960 0 28 28 c59 60 61 181 5 297
    -41 86 -113 145 -377 310 l-248 155 -62 0 c-44 0 -75 -7 -107 -22 -83 -41
    -360 -36 -428 8 -13 8 -48 14 -85 14 -63 0 -65 -1 -208 -93z`;
    shadowPlaneImage.fill = am4core.color("#000");
    shadowPlaneImage.strokeOpacity = 0;

    shadowPlane.adapter.add("scale", function(scale, target) {
        target.opacity = (0.6 - (Math.abs(0.5 - target.position)));
        return 0.5 - 0.3 * (1 - (Math.abs(0.5 - target.position)));
    })

    // Plane animation
    var currentLine = 0;
    var direction = 1;


}); // end am4core.ready()