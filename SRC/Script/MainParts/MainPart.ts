import { EchartShowSys } from './EchartsShow'
import { NetServerMain } from './SocketComu'

window.onload = function () {
    let Gryochart = new EchartShowSys(<HTMLDivElement>document.getElementById('chartGryo'), "Gryo", {
        width: 420,
        height: 300
    }, { ymax: 550, ymin: -550 });

    let GryoPitch = Gryochart.EhcartSeriesAdd({
        name: 'Charts',
        type: 'line',
        showSymbol: false,
        hoverAnimation: false,
        data: new Array(30)
    })

    let GryoRoll = Gryochart.EhcartSeriesAdd({
        name: 'Charts',
        type: 'line',
        showSymbol: false,
        hoverAnimation: false,
        data: new Array(30)
    })

    let GryoYaw = Gryochart.EhcartSeriesAdd({
        name: 'Charts',
        type: 'line',
        showSymbol: false,
        hoverAnimation: false,
        data: new Array(30)
    })

    let Accelchart = new EchartShowSys(<HTMLDivElement>document.getElementById('chartAccel'), "Accel", {
        width: 420,
        height: 300
    }, { ymax: 110, ymin: -110 });

    let AccelPitch = Accelchart.EhcartSeriesAdd({
        name: 'Charts',
        type: 'line',
        showSymbol: false,
        hoverAnimation: false,
        data: new Array(30)
    })

    let AccelRoll = Accelchart.EhcartSeriesAdd({
        name: 'Charts',
        type: 'line',
        showSymbol: false,
        hoverAnimation: false,
        data: new Array(30)
    })

    let server = new NetServerMain(10086, "192.168.137.1")

    setInterval(function () {
        Gryochart.EchartsDataAdd(<number><unknown>server.deviceRTDataBuffer[1][2], GryoPitch);
        Gryochart.EchartsDataAdd(<number><unknown>server.deviceRTDataBuffer[1][3], GryoRoll);
        Gryochart.EchartsDataAdd(<number><unknown>server.deviceRTDataBuffer[1][4], GryoYaw);
        Accelchart.EchartsDataAdd(<number><unknown>server.deviceRTDataBuffer[1][5], AccelPitch);
        Accelchart.EchartsDataAdd(<number><unknown>server.deviceRTDataBuffer[1][6], AccelRoll);
    }, 50)
}
