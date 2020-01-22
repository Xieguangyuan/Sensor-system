import { EchartShowSys } from './EchartsShow'
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