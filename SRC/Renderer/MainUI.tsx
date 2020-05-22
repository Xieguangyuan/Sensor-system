import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as fs from 'fs'
import * as ps from 'child_process'
import { MapShow } from './MapShow'
import { EchartShowSys } from './EchartsShow'
import { NetServerMain } from './SocketComu'

export module MainPageUI {
    let JSONConfig: any;
    let server: NetServerMain;
    export function MainPageSet(): void {
        JSONConfig = JSON.parse(String(fs.readFileSync('ACCSSConfig.json')));
        console.log(JSONConfig.nodeServerIP);
        server = new NetServerMain(JSONConfig.nodeServerPort, JSONConfig.nodeServerIP);
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
                    <FootTitle />
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
                this.RenderElement = <DroneSettingsComponent />
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
                </div>
            )
        }
    }

    interface footTitleProps {

    }

    interface footTileState {
        DeviceCount: number;
        deviceListIsShow: boolean;
    }

    class FootTitle extends React.Component<footTitleProps, footTileState> {
        timerID: NodeJS.Timeout;
        deviceList: Array<number>;
        deviceListElement: Array<JSX.Element>;
        constructor(props) {
            super(props);
            this.state = { DeviceCount: 0, deviceListIsShow: false }
            this.showDeviceList = this.showDeviceList.bind(this);
        }

        componentDidMount() {
            this.timerID = setInterval(() => {
                this.setState({ DeviceCount: server.getUseableID().length });
            }, 1000)
        }

        showDeviceList() {
            if (this.state.deviceListIsShow) {
                this.setState({ deviceListIsShow: false })
            } else if (!this.state.deviceListIsShow) {
                this.setState({ deviceListIsShow: true })
            }
            this.deviceList = server.getUseableID();
            for (let index = 0; index < this.deviceList.length; index++) {
                this.deviceListElement.push(<li>
                    <a href="#">
                        <span>{this.deviceList[index]}</span>
                    </a>
                </li>);
            }
        }

        public render(): JSX.Element {
            return (
                <div id="footBar">
                    <div className="deviceListShot" style={{ width: this.state.deviceListIsShow ? "250px" : "0" }}>
                        <div id="deviceList">
                            <ul>
                                {this.deviceListElement}
                            </ul>
                        </div>
                    </div>
                    <div id="footName"> ACCSS by TSKangetsu </div>
                    <div id="footVersion"> Version  0.0.1-Beta </div>
                    <a href="#" onClick={this.showDeviceList} id="footDevice">Connected_Device:{this.state.DeviceCount}</a>
                </div>
            );
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
                    <CVShowArea />
                </div>
            );
        }
    }

    class DroneSettingsComponent extends React.Component {
        public render(): JSX.Element {
            return (
                <div id="settingpanel">
                    <div id="controllertypepanel"></div>
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

    class CVShowArea extends React.Component {
        serverProcess: ps.ChildProcess;

        public render(): JSX.Element {
            this.MJPEGServerINIT();
            return (
                <div id="cvController">
                    <img id="myImage" src={JSONConfig.renderMJPEGServerSRC}></img>
                </div>
            );
        }

        MJPEGServerINIT() {
            this.serverProcess = ps.exec(JSONConfig.renderMJPEGServerBinWin + " -f='192.168.137.240' -fp=10086 ", (error, stdout, stderr) => {
                if (error) {
                    console.log(`error: ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.log(`stderr: ${stderr}`);
                    return;
                }
                console.log(`stdout: ${stdout}`);
            });
        }

        componentWillUnmount() {
            //windows Only
            ps.spawn("taskkill", ["/F", "/IM", "ACCSSVideoServer.exe"]);
            document.getElementById("myImage").setAttribute("src", "");
        }
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