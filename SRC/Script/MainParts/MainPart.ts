import Vue from 'vue'
import * as echarts from 'echarts';

class EchartShowSys {
    echarts_Area: HTMLDivElement;
    echarts: any;
    option = {
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
        yAxis: {
        },
        series: [{
            name: '访问量',
            type: 'line',
            data: [500, 200, 360, 100]
        }]

    };

    constructor(Is_EchartShowRealTime: boolean, HtmlShowArea: HTMLDivElement) {
        if (Is_EchartShowRealTime == false) {
            this.echarts_Area = HtmlShowArea;
            this.echarts = echarts.init(this.echarts_Area);
        }
    }

    EchartsShownow() {
        this.echarts.setOption(this.option);
    }
}


window.onload = function () {
    let ShowEchart = new EchartShowSys(false, <HTMLDivElement>document.getElementById('chartmain'));
    ShowEchart.EchartsShownow();
}