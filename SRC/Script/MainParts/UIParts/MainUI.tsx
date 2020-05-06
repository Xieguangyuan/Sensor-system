import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { MapShow } from './MapShow'
import { EchartShowSys } from './EchartsShow'
import { NetServerMain } from '../SocketComu'
import '../../../CSS/BarmenuUI.css';
import 'font-awesome/css/font-awesome.css';

export module MainPageUI {
    let server: NetServerMain;

    export function MainPageSet(): void {
        server = new NetServerMain(10086, "192.168.137.1");
        ReactDOM.render(
            (
                <MainPageUI />
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
                </div>
            );
        }
    }

    interface BarmenuProps {

    }

    interface BarmenuState {
        RenaderID: number;
    }

    class Barmenu extends React.Component<BarmenuProps, BarmenuState> {
        RenderElement: JSX.Element;
        constructor(props) {
            super(props);
            this.state = { RenaderID: 0 };
            this.FlyingMonitorRender = this.FlyingMonitorRender.bind(this);
            this.DroneStatusRender = this.DroneStatusRender.bind(this);
            this.DroneSettingsRender = this.DroneSettingsRender.bind(this);
            this.AdvanceSettingRender = this.AdvanceSettingRender.bind(this);
        }

        private FlyingMonitorRender(): void {
            if (this.state.RenaderID != 0) {
                this.setState({ RenaderID: 0 })
            }
        }

        private DroneStatusRender(): void {
            if (this.state.RenaderID != 1) {
                this.setState({ RenaderID: 1 })
            }
        }

        private DroneSettingsRender(): void {
            if (this.state.RenaderID != 2) {
                this.setState({ RenaderID: 2 })
            }
        }

        private AdvanceSettingRender(): void {
            if (this.state.RenaderID != 3) {
                this.setState({ RenaderID: 3 })
            }
        }

        public render(): JSX.Element {
            if (this.state.RenaderID == 0) {
                this.RenderElement = <FlyingMonitorComponent />;
            } else if (this.state.RenaderID == 1) {
                this.RenderElement = <DroneStatusComponent />;
            } else if (this.state.RenaderID == 2) {

            } else if (this.state.RenaderID == 3) {

            }

            return (
                <div>
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
                                    <a href="#" onClick={this.DroneStatusRender}>
                                        <i className="fa fa-television"></i>
                                        <span id="DroneStatus">DroneStatus</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" onClick={this.DroneSettingsRender}>
                                        <i className="fa fa-cog"></i>
                                        <span id="DroneSettings">DroneSettings</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" onClick={this.AdvanceSettingRender}>
                                        <i className="fa fa-sliders"></i>
                                        <span id="AdvanceSetting">AdvanceSetting</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div id="MainPageArea">{this.RenderElement}</div>
                    <div id="footBar">
                        <div id="footName"> ACCSS by TSKangetsu </div>
                        <div id="footVersion"> Version  0.0.1-Beta </div>
                    </div>
                </div>
            )
        }
    }

    //=================================================================================================================================//

    class FlyingMonitorComponent extends React.Component {
        public render(): JSX.Element {
            return (
                <div>
                    <Map />
                    <GLRTShow />
                </div>
            );
        }
    }

    class DroneStatusComponent extends React.Component {
        public render(): JSX.Element {
            return (
                <div>
                    <SensorRTChart />
                </div>
            );
        }
    }

    //=================================================================================================================================//

    class Map extends React.Component {
        //height为不安定要素，bug难以复现，须注意
        MainMap: MapShow;
        private MapCSS: React.CSSProperties = {
            height: "200px",
            width: "-webkit-calc(100% - 350px)",
            float: "right"
        };

        public render(): JSX.Element {
            this.MapCSS.height = String(document.getElementById("root").offsetHeight - 18) + "px";
            return (
                <div id="Map" style={this.MapCSS}></div>
            );
        }

        componentDidMount() {
            window.onresize = () => {
                document.getElementById("Map").style.height = String(document.getElementById("root").offsetHeight - 18) + "px";
            }
            this.MainMap = new MapShow("Map");
        }

        componentWillUnmount() {
            window.onresize = null;
        }
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
        private GLRTMainCSS: React.CSSProperties = {
            width: "350px",
            height: "260px"
        }

        public render(): JSX.Element {
            return <div id="GLRT" style={this.GLRTMainCSS}></div>
        }
    }
}