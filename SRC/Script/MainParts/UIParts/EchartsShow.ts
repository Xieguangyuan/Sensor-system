import * as echarts from 'echarts';


export class EchartShowSys {
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

    constructor(htmlShowArea: HTMLElement, name: string,
        windowSize: { width: number, height: number },
        chartsSize: { ymax: number, ymin: number }) {
        this._echarts_Area = <HTMLDivElement>htmlShowArea;
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

//---================================example===============================================---//

// function ChartsStart() {
    // let Gryochart = new EchartShowSys(<HTMLDivElement>document.getElementById('chartGryo'), "Gryo", {
    //     width: 420,
    //     height: 300
    // }, { ymax: 550, ymin: -550 });
    // let GryoPitch = Gryochart.EhcartSeriesAdd({
    //     name: 'Charts',
    //     type: 'line',
    //     showSymbol: false,
    //     hoverAnimation: false,
    //     data: new Array(30)
    // })
    // let GryoRoll = Gryochart.EhcartSeriesAdd({
    //     name: 'Charts',
    //     type: 'line',
    //     showSymbol: false,
    //     hoverAnimation: false,
    //     data: new Array(30)
    // })
    // let GryoYaw = Gryochart.EhcartSeriesAdd({
    //     name: 'Charts',
    //     type: 'line',
    //     showSymbol: false,
    //     hoverAnimation: false,
    //     data: new Array(30)
    // })

    // let Accelchart = new EchartShowSys(<HTMLDivElement>document.getElementById('chartAccel'), "Accel", {
    //     width: 420,
    //     height: 300
    // }, { ymax: 110, ymin: -110 });
    // let AccelPitch = Accelchart.EhcartSeriesAdd({
    //     name: 'Charts',
    //     type: 'line',
    //     showSymbol: false,
    //     hoverAnimation: false,
    //     data: new Array(30)
    // })
    // let AccelRoll = Accelchart.EhcartSeriesAdd({
    //     name: 'Charts',
    //     type: 'line',
    //     showSymbol: false,
    //     hoverAnimation: false,
    //     data: new Array(30)
    // })

    // let FilterChart = new EchartShowSys(<HTMLDivElement>document.getElementById('chartFilter'), "filterCheck", {
    //     width: 420,
    //     height: 300
    // }, { ymax: 10000, ymin: -10000 })
    // let FilterX_UNFixed = FilterChart.EhcartSeriesAdd({
    //     name: 'Charts',
    //     type: 'line',
    //     showSymbol: false,
    //     hoverAnimation: false,
    //     data: new Array(100)
    // })
    // let FilterX_Fixed = FilterChart.EhcartSeriesAdd({
    //     name: 'ChartsUnfix',
    //     type: 'line',
    //     showSymbol: false,
    //     hoverAnimation: false,
    //     data: new Array(100)
    // })


    // let server = new NetServerMain(10086, "192.168.137.1")

    // setInterval(function () {
    //     Gryochart.EchartsDataAdd(<number><unknown>server.deviceRTDataBuffer[1][2], GryoPitch);
    //     Gryochart.EchartsDataAdd(<number><unknown>server.deviceRTDataBuffer[1][3], GryoRoll);
    //     Gryochart.EchartsDataAdd(<number><unknown>server.deviceRTDataBuffer[1][4], GryoYaw);
    //     Accelchart.EchartsDataAdd(<number><unknown>server.deviceRTDataBuffer[1][5], AccelPitch);
    //     Accelchart.EchartsDataAdd(<number><unknown>server.deviceRTDataBuffer[1][6], AccelRoll);
    //     FilterChart.EchartsDataAdd(<number><unknown>server.deviceRTDataBuffer[1][7], FilterX_UNFixed);
    //     FilterChart.EchartsDataAdd(<number><unknown>server.deviceRTDataBuffer[1][8], FilterX_Fixed);
    // }, 50)
// }