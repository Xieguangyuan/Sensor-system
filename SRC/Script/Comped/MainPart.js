"use strict";
exports.__esModule = true;
var echarts = require("echarts");
var EchartShowSys = /** @class */ (function () {
    function EchartShowSys(Is_EchartShowRealTime, HtmlShowArea) {
        this.option = {
            title: {
                text: 'ECharts 数据统计'
            },
            tooltip: {},
            legend: {
                data: ['用户来源']
            },
            xAxis: {
                data: ["Android", "IOS", "PC", "Ohter"]
            },
            yAxis: {},
            series: [{
                    name: '访问量',
                    type: 'line',
                    data: [500, 200, 360, 100]
                }]
        };
        if (Is_EchartShowRealTime == false) {
            this.echarts_Area = HtmlShowArea;
            this.echarts = echarts.init(this.echarts_Area);
        }
    }
    EchartShowSys.prototype.EchartsShownow = function () {
        this.echarts.setOption(this.option);
    };
    return EchartShowSys;
}());
window.onload = function () {
    var ShowEchart = new EchartShowSys(false, document.getElementById('chartmain'));
    ShowEchart.EchartsShownow();
};
