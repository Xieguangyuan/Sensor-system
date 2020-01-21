"use strict";
exports.__esModule = true;
var echarts = require("echarts");
var EchartShowSys = /** @class */ (function () {
    function EchartShowSys(htmlShowArea, windowSize) {
        this._echarts_queue = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
        this._echartsOption = {
            tooltip: {},
            xAxis: {},
            yAxis: {},
            series: [{
                    name: 'Chart',
                    type: 'line',
                    data: this._echarts_queue
                }]
        };
        this._echarts_Area = htmlShowArea;
        this._echarts = echarts.init(this._echarts_Area, {
            renderer: 'canvas',
            width: windowSize.width,
            height: windowSize.height
        });
        this._echarts.setOption(this._echartsOption);
    }
    EchartShowSys.prototype.EchartsDataAdd = function (inputData) {
        for (var index = 0; index < 30; index++) {
            this._echarts_queue[index + 1] = this._echarts_queue[index];
        }
        this._echarts_queue[0] = inputData;
        this._echarts.setOption(this._echartsOption);
    };
    return EchartShowSys;
}());
window.onload = function () {
    var ShowEchart = new EchartShowSys(document.getElementById('chartmain'), {
        width: 600,
        height: 300
    });
    for (var index = 50; index < 100; index++) {
        ShowEchart.EchartsDataAdd(index);
    }
    // for (let index = 0; index < 30; index++) {
    //     console.log(ShowEchart._echarts_queue[0]);
    // }
};
