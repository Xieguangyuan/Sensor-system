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
            width: "100%"
        }

        public render(): JSX.Element {
            return (
                <div id="MainPage" style={this.MainPageUICSS}>
                    <Barmenu />
                    <div id="MainPageArea">
                        <div id="RTChartRender"></div>
                    </div>
                </div>
            );
        }
    }

    let RenderActiveComponent: number = -1;
    class Barmenu extends React.Component {

        public render(): JSX.Element {
            return (
                <div className="BarmenuShot">
                    <div id="Barmenu">
                        <ul>
                            <li>
                                <a href="#" onClick={this.FlyingMonitorRender}>
                                    <i className="fa fa-rocket"></i>
                                    <span id="FlyingMonitor">FlyingMonitor</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" onClick={this.DroneSettingsRender}>
                                    <i className="fa fa-cog"></i>
                                    <span id="DroneSettings">DroneSettings</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" onClick={this.AdvanceSetting}>
                                    <i className="fa fa-sliders"></i>
                                    <span id="AdvanceSetting">AdvanceSetting</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div >
            )
        }

        private FlyingMonitorRender(): void {
            if (RenderActiveComponent === 0) {
                ReactDOM.unmountComponentAtNode(document.getElementById("RTChartRender"));
                RenderActiveComponent = -1;
            } else if (RenderActiveComponent === -1) {
                ReactDOM.render(
                    <SensorRTChart />,
                    document.getElementById("RTChartRender")
                )
                RenderActiveComponent = 0;
            }
        }

        private DroneSettingsRender(): void {

        }

        private AdvanceSetting(): void {

        }
    }

    //=================================================================================================================================//

    class Map extends React.Component {

    }

    class SensorRTChart extends React.Component {
        private GryoYaw: number;
        private GryoRoll: number;
        private GryoPitch: number;
        private TimerID: NodeJS.Timeout;
        private Gryochart: EchartShowSys;
        private SensorRTChartCSS: React.CSSProperties = {
            backgroundColor: "rgb(253, 253, 253)",
            paddingTop: "43px",
            height: "250px",
            width: "50%"
        };

        public render(): JSX.Element {
            return <div id='SensorRTChart' style={this.SensorRTChartCSS}></div>;
        }

        componentDidMount() {
            this.SensorRTChartInit();
            window.onresize = () => this.Gryochart.EchartAreaUpdate();
            this.TimerID = setInterval(() => {
                this.Gryochart.EchartsDataAdd(Number(server.deviceRTDataBuffer[1][2]), this.GryoPitch);
                this.Gryochart.EchartsDataAdd(Number(server.deviceRTDataBuffer[1][3]), this.GryoRoll);
                this.Gryochart.EchartsDataAdd(Number(server.deviceRTDataBuffer[1][4]), this.GryoYaw);
            }, 100);
        }

        componentWillUnmount() {
            window.onresize = null;
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