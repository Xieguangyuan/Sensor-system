import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { EchartShowSys } from './EchartsShow'
import { NetServerMain } from '../SocketComu'

export module MainPageUI {
    let server: NetServerMain;

    export function MainPageSet(): void {
        server = new NetServerMain(10086, "192.168.137.1");
        ReactDOM.render(
            (
                < MainPageUI />
            ),
            document.getElementById("root")
        )
    }

    class MainPageUI extends React.Component {
        private MainPageUICSS: React.CSSProperties = {
            position: "absolute",
            height: "100%",
            width: "100%"
        }

        public render(): JSX.Element {
            return (
                <div id="MainPage" style={this.MainPageUICSS}>
                    <Barmenu />
                    <SensorRTChart />
                </div >
            );
        }
    }

    class Barmenu extends React.Component {

        public render(): JSX.Element {
            return (
                <div className="BarmenuShot">
                    <div id="Barmenu">
                        <ul>
                            <li>
                                <a href=" ">
                                    <i className="fa fa-rocket"></i>
                                    <span id="FlyingMonitor">FlyingMonitor</span>
                                </a>
                            </li>
                            <li>
                                <a href=" ">
                                    <i className="fa fa-cog"></i>
                                    <span id="DroneSettings">DroneSettings</span>
                                </a>
                            </li>
                            <li>
                                <a href=" ">
                                    <i className="fa fa-sliders"></i>
                                    <span id="AdvanceSetting">AdvanceSetting</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div >
            )
        }
    }

    class Map extends React.Component {

    }

    class SensorRTChart extends React.Component {
        private GryoYaw: number;
        private GryoRoll: number;
        private GryoPitch: number;
        private TimerID: NodeJS.Timeout;
        private Gryochart: EchartShowSys;
        private SensorRTChartCSS: React.CSSProperties = {
            position: "absolute",
            transition: "left 0.2s linear",
            WebkitTransition: "left 0.2s linear",
            transform: "translateZ(0) scale(1, 1)",
            WebkitTransform: "translateZ(0) scale(1, 1)",
            height: "50%",
            width: "50%",
            left: "55px"
        };

        public render(): JSX.Element {
            return (
                <div id='SensorRTChart' style={this.SensorRTChartCSS}></div>
            )
        }

        componentDidMount() {
            this.SensorRTChartInit();
            setInterval(() => {
                this.Gryochart.EchartsDataAdd(Number(server.deviceRTDataBuffer[1][2]), this.GryoPitch);
                this.Gryochart.EchartsDataAdd(Number(server.deviceRTDataBuffer[1][3]), this.GryoRoll);
                this.Gryochart.EchartsDataAdd(Number(server.deviceRTDataBuffer[1][4]), this.GryoYaw);
                this.Gryochart.EchartAreaUpdate();
            }, 100);
        }

        componentWillUnmount() {
            clearInterval(this.TimerID);
        }

        private SensorRTChartInit() {
            this.Gryochart = new EchartShowSys(document.getElementById('SensorRTChart'), "Gryo", { ymax: 550, ymin: -550 });
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