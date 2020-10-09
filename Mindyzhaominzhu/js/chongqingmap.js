var data = [{ "name": "万州区", "value": 74 }, { "name": "涪陵区", "value": 42 }, { "name": "渝中区", "value": 85 }, { "name": "大渡口区", "value": 54 }, { "name": "江北区", "value": 7 }, { "name": "沙坪坝区", "value": 75 }, { "name": "九龙坡区", "value": 62 }, { "name": "南岸区", "value": 1 }, { "name": "北碚区", "value": 65 }, { "name": "綦江区", "value": 44 }, { "name": "大足区", "value": 71 }, { "name": "渝北区", "value": 90 }, { "name": "巴南区", "value": 43 }, { "name": "黔江区", "value": 77 }, { "name": "长寿区", "value": 97 }, { "name": "江津区", "value": 75 }, { "name": "合川区", "value": 32 }, { "name": "永川区", "value": 17 }, { "name": "南川区", "value": 2 }, { "name": "璧山区", "value": 86 }, { "name": "铜梁区", "value": 80 }, { "name": "潼南区", "value": 68 }, { "name": "荣昌区", "value": 95 }, { "name": "开州区", "value": 9 }, { "name": "梁平区", "value": 13 }, { "name": "城口县", "value": 100 }, { "name": "丰都县", "value": 37 }, { "name": "垫江县", "value": 43 }, { "name": "武隆区", "value": 59 }, { "name": "忠县", "value": 96 }, { "name": "云阳县", "value": 32 }, { "name": "奉节县", "value": 49 }, { "name": "巫山县", "value": 14 }, { "name": "巫溪县", "value": 4 }, { "name": "石柱土家族", "value": 45 }, { "name": "秀山", "value": 68 }, { "name": "酉阳", "value": 42 }, { "name": "彭水苗族土家族", "value": 70 }];

var map = new Highcharts.Map('map', {
    title: {
        text: '重庆市'
    },
    colorAxis: {
        min: 0,
        minColor: 'rgb(255,255,255)',
        maxColor: '#006cee'
    },
    series: [{
        data: data,
        name: '随机数据',
        mapData: Highcharts.maps['cn/chongqing'],
        joinBy: 'name'
    }]
});