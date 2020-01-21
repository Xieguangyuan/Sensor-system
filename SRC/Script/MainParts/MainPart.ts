import Vue from 'vue'
import * as echarts from 'echarts';

class EchartShowSys {
    _echarts_Area: HTMLDivElement;
    _echarts: echarts.ECharts;
    _echarts_queue: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
    _echartsOption = {
        tooltip: {},
        xAxis: {
        },
        yAxis: {
        },
        series: [{
            name: 'Chart',
            type: 'line',
            data: this._echarts_queue
        }]
    }

    constructor(htmlShowArea: HTMLDivElement, windowSize: { width: number, height: number }) {
        this._echarts_Area = htmlShowArea;
        this._echarts = echarts.init(this._echarts_Area, {
            renderer: 'canvas',
            width: windowSize.width,
            height: windowSize.height
        });
        this._echarts.setOption(this._echartsOption);
    }

    EchartsDataAdd(inputData: number) {
        for (let index = 0; index < 30; index++) {
            this._echarts_queue[index + 1] = this._echarts_queue[index];
        }
        this._echarts_queue[0] = inputData;
        this._echarts.setOption(this._echartsOption);
    }
}

window.onload = function () {
    let ShowEchart = new EchartShowSys(<HTMLDivElement>document.getElementById('chartmain'), {
        width: 600,
        height: 300
    });

    for (let index: number = 50; index < 100; index++) {
        ShowEchart.EchartsDataAdd(index);
    }
}