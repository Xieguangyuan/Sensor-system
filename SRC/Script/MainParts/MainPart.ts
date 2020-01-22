import * as echarts from 'echarts';

class EchartShowSys {
    _echarts_Area: HTMLDivElement;
    _echartsMain: echarts.ECharts;
    _ehcartsSeriesCount: number = 0;
    _echartsOption = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                animation: false
            }
        },
        xAxis: {
            type: 'category',
            splitLine: {
                show: true
            }
        },
        yAxis: [
            {
                type: 'value',
                name: 'Gryo',
                max: 2000,
                min: -2000,
                boundaryGap: [1, 1]
            }
        ],
        series: []
    }

    constructor(htmlShowArea: HTMLDivElement, name: string,
        windowSize: { width: number, height: number },
        chartsSize: { ymax: number, ymin: number }) {
        this._echarts_Area = htmlShowArea;
        this._echartsMain = echarts.init(this._echarts_Area, {
            renderer: 'canvas',
            width: windowSize.width,
            height: windowSize.height
        });
        this._echartsOption.yAxis[0].name = name;
        this._echartsOption.yAxis[0].max = chartsSize.ymax;
        this._echartsOption.yAxis[0].min = chartsSize.ymin;
        this._echartsMain.setOption(<echarts.EChartOption>this._echartsOption);
    }

    EchartsDataAdd(inputData: number, seriesNumber: number) {
        if (inputData > this._echartsOption.yAxis[0].max) {
            this._echartsOption.series[seriesNumber - 1].data.shift();
            this._echartsOption.series[seriesNumber - 1].data.push(this._echartsOption.yAxis[0].max - 1);
            this._echartsMain.setOption(<echarts.EChartOption>this._echartsOption);
        } else if (inputData < this._echartsOption.yAxis[0].min) {
            this._echartsOption.series[seriesNumber - 1].data.shift();
            this._echartsOption.series[seriesNumber - 1].data.push(this._echartsOption.yAxis[0].min + 1);
            this._echartsMain.setOption(<echarts.EChartOption>this._echartsOption);
        } else {
            this._echartsOption.series[seriesNumber - 1].data.shift();
            this._echartsOption.series[seriesNumber - 1].data.push(inputData);
            this._echartsMain.setOption(<echarts.EChartOption>this._echartsOption);
        }
    }

    EhcartSeriesAdd(option: any): number {
        this._ehcartsSeriesCount += 1;
        this._echartsOption.series.push(option);
        return this._ehcartsSeriesCount;
    }
}

window.onload = function () {
    let ShowEchart = new EchartShowSys(<HTMLDivElement>document.getElementById('chartmain'), "Gryo", {
        width: 420,
        height: 300
    }, { ymax: 2000, ymin: -2000 });

    let i = ShowEchart.EhcartSeriesAdd({
        name: 'Charts',
        type: 'line',
        showSymbol: false,
        hoverAnimation: false,
        data: new Array(30)
    })

    let i2 = ShowEchart.EhcartSeriesAdd({
        name: 'Charts2',
        type: 'line',
        showSymbol: false,
        hoverAnimation: false,
        data: new Array(30)
    })


    let line: number = 1;
    setInterval(function () {
        line += 5;
        ShowEchart.EchartsDataAdd(line, i);
        ShowEchart.EchartsDataAdd(-line * 2, i2);
    }, 100)
}