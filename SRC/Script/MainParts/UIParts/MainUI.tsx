import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { EchartShowSys } from './EchartsShow'
import { NetServerMain } from '../SocketComu'


export module MainPageUI {
    let server: NetServerMain;

    export function MainPageSet(): void {
        server = new NetServerMain(10086, "192.168.137.1")
        ReactDOM.render(
            (
                < MainPageUI />
            ),
            document.getElementById("root")
        )
    }

    class MainPageUI extends React.Component {
        MapArea: JSX.Element;
        SensorRTChart: JSX.Element;
        SensorRTDashBorad: JSX.Element;

        public render(): JSX.Element {
            return (
                <div id="MainPage">
                    <div id="Map"></div>
                    <div id="SensorRTChart"><SensorRTChart /></div>
                    <div id="SensorRTDashBorad"></div>
                    <div id="GLRTShow"></div>
                </div>
            );
        }
    }

    class Map extends React.Component {

    }

    class SensorRTChart extends React.Component {
        private TimerID: NodeJS.Timeout;
        private Gryochart: EchartShowSys;
        private GryoPitch: number;
        private GryoRoll: number;
        private GryoYaw: number;

        public render(): JSX.Element {
            const css = "#chartGryo{ width: 600px;height: 400px;}";
            return (
                <div>
                    <style>{css}</style>
                    <div id='chartGryo'></div>
                </div >
            )
        }

        componentDidMount() {
            this.SensorRTChartInit();
            setInterval(() => {
                this.Gryochart.EchartsDataAdd(Number(server.deviceRTDataBuffer[1][2]), this.GryoPitch);
                this.Gryochart.EchartsDataAdd(Number(server.deviceRTDataBuffer[1][3]), this.GryoRoll);
                this.Gryochart.EchartsDataAdd(Number(server.deviceRTDataBuffer[1][4]), this.GryoYaw);
                this.Gryochart.EchartAreaUpdate();
            }, 50);
        }

        componentWillUnmount() {
            clearInterval(this.TimerID);
        }

        private SensorRTChartInit() {
            this.Gryochart = new EchartShowSys(document.getElementById('chartGryo'), "Gryo", { ymax: 550, ymin: -550 });
            this.GryoPitch = this.Gryochart.EhcartSeriesAdd({
                name: 'Charts',
                type: 'line',
                showSymbol: false,
                hoverAnimation: false,
                data: new Array(30)
            })
            this.GryoRoll = this.Gryochart.EhcartSeriesAdd({
                name: 'Charts',
                type: 'line',
                showSymbol: false,
                hoverAnimation: false,
                data: new Array(30)
            })
            this.GryoYaw = this.Gryochart.EhcartSeriesAdd({
                name: 'Charts',
                type: 'line',
                showSymbol: false,
                hoverAnimation: false,
                data: new Array(30)
            })
        }
    }

    class SensorRTDashBorad extends React.Component {

    }

    class GLRTShow extends React.Component {

    }
}