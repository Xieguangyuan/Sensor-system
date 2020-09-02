import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as fs from 'fs'
import * as ps from 'child_process'
import { MapShow } from './MapShow'
import { EchartShowSys } from './EchartsShow'
import { NetServerMain } from './SocketComu'
import '../Common/FlyingMonitor.css'
import '../Common/DroneStatus.css'
import NoSignal from '../Common/IMG/no-signal.jpg';

export module MainPageUI {
    let JSONConfig: any;
    let server: NetServerMain;
    export function MainPageSet(): void {
        JSONConfig = JSON.parse(String(fs.readFileSync('ACCSSConfig.json')));
        console.log(JSONConfig.nodeServerIP);
        server = new NetServerMain(JSONConfig.nodeServerPort, JSONConfig.nodeServerIP);
        ReactDOM.render(
            <>
                <MainPageUI />
            </>,
            document.getElementById("root")
        )
    }

    class MainPageUI extends React.Component {
        public render() {
            return (
                <>
                    <Barmenu />
                    <FootTitle />
                </>
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

        public render() {
            if (this.state.RenaderID == 0) {
                this.RenderElement = <FlyingMonitorComponent />;
            } else if (this.state.RenaderID == 1) {
                this.RenderElement = <DroneStatusComponent />;
            } else if (this.state.RenaderID == 2) {
                this.RenderElement = <DroneSettingsComponent />
            } else if (this.state.RenaderID == 3) {

            }

            return (
                <>
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
                </>
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
        deviceListElement: Array<JSX.Element> = new Array<JSX.Element>();
        constructor(props) {
            super(props);
            this.state = { DeviceCount: 0, deviceListIsShow: false }
            this.showDeviceList = this.showDeviceList.bind(this);
        }

        componentDidMount() {
            this.timerID = setInterval(() => {
                this.setState({ DeviceCount: server.getUseableID().length });
                this.deviceListElement = Array<JSX.Element>();
                this.deviceList = server.getUseableID();
                for (let index = 0; index < this.deviceList.length; index++) {
                    this.deviceListElement.push(
                        <li key={index.toString()}>
                            <a href="#">
                                <div id="deviceId">DeviceID:  {this.deviceList[index]}<br />
                                    <div id="deviceType">[Unkown]</div>
                                    <i className="fa fa-battery-half" aria-hidden="true"></i>
                                </div>
                            </a>
                        </li>
                    );
                }
            }, 1000)
        }

        showDeviceList() {
            if (this.state.deviceListIsShow) {
                this.setState({ deviceListIsShow: false })
            } else if (!this.state.deviceListIsShow) {
                this.setState({ deviceListIsShow: true })
            }
        }

        public render() {
            return (
                <>
                    <div id="footBar">
                        <div className="deviceListShot" style={{ height: this.state.deviceListIsShow ? "400px" : "0" }}>
                            <div id="deviceList">
                                <div id="deviceListHeader">
                                    <i className="fa fa-search" aria-hidden="true"></i>
                                    <input type="text" placeholder="Search"></input>
                                    <a href="#"><i className="fa fa-plus-square" aria-hidden="true"></i></a>
                                </div>
                                <ul>
                                    <div id="deviceListNone">Current not have any device</div>
                                    {this.deviceListElement}
                                </ul>
                            </div>
                        </div>
                        <a href="#" id="footName"> ACCSS by TSKangetsu </a>
                        <a href="#" id="footVersion"> Version  0.0.1-Beta </a>
                        <a href="#" onClick={this.showDeviceList} id="footDevice">Connected Device:{this.state.DeviceCount}</a>
                    </div>
                </>
            )
        }
    }

    //=================================================================================================================================//
    class FlyingMonitorComponent extends React.Component {
        public render() {
            return (
                <>
                    <div id="MapVideoArea">
                        <Map />
                        <VideoShowArea />
                    </div>
                </>
            );
        }
    }

    class DroneStatusComponent extends React.Component {
        public render() {
            return (
                <>
                    <SensorRTChart />
                </>
            );
        }
    }

    class DroneSettingsComponent extends React.Component {
        public render() {
            return (
                <>
                    <div id="controllertypepanel"></div>
                </>
            )
        }
    }
    //=================================================================================================================================//

    interface MapProps {

    }

    interface MapState {
        lat: Number;
        lng: Number;
    }

    class Map extends React.Component<MapProps, MapState>{
        MainMap: MapShow;
        Position: Array<Number> = new Array<Number>();

        constructor(props) {
            super(props);
            this.state = { lat: 0.0000000000, lng: 0.0000000000 };
        }

        public render() {
            return (
                <>
                    <div id="MapArea">
                        <div id="Map"></div>
                        <div id="MapRight">
                            <div id="con">
                                <input type="range" min="0" max="100" step="5" />
                            </div>
                        </div>
                        <div id="MapBottom">
                            <div id="MapBottomTG" style={{ width: "100%", height: "100%" }}>
                                <div id="lat"> Lat:{this.state.lat.toFixed(8)}</div>
                                <div id="lng"> lng:{this.state.lng.toFixed(8)}</div>
                                <div id="Altitude"> Altitude: 0.00m</div>
                            </div>
                        </div>
                    </div>
                </>
            )
        }

        componentDidMount() {
            this.MainMap = new MapShow("Map");
            this.MainMap.Map.addEventListener('move', () => {
                this.Position = this.MainMap.getCurrentCenterPosition();
                this.setState({ lat: this.Position[0], lng: this.Position[1] });
            });
        }

        componentWillUnmount() {
            this.MainMap.Map.clearAllEventListeners();
        }
    }

    interface VideoShowAreaProps {

    }

    interface VideoShowAreaState {
        IMGSRC: any;
        IsSRCErrored: boolean;
    }

    class VideoShowArea extends React.Component<VideoShowAreaProps, VideoShowAreaState> {
        constructor(props) {
            super(props);
            this.MJPEGServerINIT();
            this.state = {
                IMGSRC: JSONConfig.renderMJPEGServerSRC,
                IsSRCErrored: false
            }
            this.MJPEGServerOnError = this.MJPEGServerOnError.bind(this);
        }


        public render() {
            return (
                <>
                    <div id="VideoShowArea">
                        <img id="VideoShow" onError={this.MJPEGServerOnError} src={this.state.IMGSRC}></img>
                    </div>
                </>
            );
        }

        MJPEGServerOnError() {
            if (!this.state.IsSRCErrored) {
                this.setState({
                    IMGSRC: NoSignal,
                    IsSRCErrored: true
                })
            }
        }

        MJPEGServerINIT() {
            ps.exec(JSONConfig.renderMJPEGServerBinWin + " -f='192.168.137.240' -fp=10086 ", (error, stdout, stderr) => {
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
            document.getElementById("VideoShow").setAttribute("src", "");
        }
    }

    interface SensorRTChartProps {

    }

    interface SensorRTChartState {
        DataUpdateFreq: number;
        DataSource: string;
        DataPitch: number;
        DataRoll: number;
        DataYaw: number;
    }

    class SensorRTChart extends React.Component<SensorRTChartProps, SensorRTChartState> {
        private GryoYaw: number;
        private GryoRoll: number;
        private GryoPitch: number;
        private ShowDevID: number = 0;
        private DataUpdateTimer: NodeJS.Timeout;
        private ChartResizeTimer: NodeJS.Timeout;
        private Gryochart: EchartShowSys;

        constructor(props) {
            super(props);
            this.HandleDataShowType = this.HandleDataShowType.bind(this);
            this.state = { DataUpdateFreq: 100, DataSource: "Gryo", DataPitch: 0, DataRoll: 0, DataYaw: 0 }
        }

        public render() {
            return (
                <>
                    <div id="SensorChartArea">
                        <div id="SensorDataShow">
                            <div id="SensorDataShowType" style={{ position: "absolute", top: "50px" }}>
                                <div style={{ position: "absolute", left: "5px", top: "15px", width: "175px", height: "20px" }}>
                                    <div style={{ position: "absolute", fontSize: "12px", textAlign: "center" }}>DataSource:</div>
                                    <select name="ChartType" id="ChartType" style={{ position: "absolute", right: "0", width: "100px", height: "20px", borderRadius: "5px" }} onChange={this.HandleDataShowType}>
                                        <option value="Gryo">Gryo</option>
                                        <option value="Accel">Accel</option>
                                        <option value="RealAngle">RealAngle</option>
                                        <option value="Altitude">Altitude</option>
                                    </select>
                                </div>
                                <div style={{ position: "absolute", left: "5px", top: "50px", width: "175px", height: "20px" }}>
                                    <div style={{ position: "absolute", fontSize: "12px", textAlign: "center" }}> Pitch: </div>
                                    <div style={{ position: "absolute", right: "0", width: "100px", height: "20px", backgroundColor: "pink", borderRadius: "5px" }}>{this.state.DataPitch}</div>
                                </div>
                                <div style={{ position: "absolute", left: "5px", top: "85px", width: "175px", height: "20px" }}>
                                    <div style={{ position: "absolute", fontSize: "12px", textAlign: "center" }}> Roll : </div>
                                    <div style={{ position: "absolute", right: "0", width: "100px", height: "20px", backgroundColor: "pink", borderRadius: "5px" }}>{this.state.DataPitch}</div>
                                </div>
                                <div style={{ position: "absolute", left: "5px", top: "120px", width: "175px", height: "20px" }}>
                                    <div style={{ position: "absolute", fontSize: "12px", textAlign: "center" }}> Yaw  : </div>
                                    <div style={{ position: "absolute", right: "0", width: "100px", height: "20px", backgroundColor: "pink", borderRadius: "5px" }}>{this.state.DataPitch}</div>
                                </div>
                            </div>
                        </div>
                        <div id='SensorRTChart'></div>
                    </div>
                </>
            );
        }

        HandleDataShowType(event: React.ChangeEvent<HTMLSelectElement>) {
            if (event.target.value == "Gryo") {
                this.setState({ DataSource: event.target.value });
            } else if (event.target.value == "Accel") {
                this.setState({ DataSource: event.target.value });
            } else if (event.target.value == "RealAngle") {
                this.setState({ DataSource: event.target.value });
            } else if (event.target.value == "Altitude") {
                this.setState({ DataSource: event.target.value });
            }
        }

        componentDidMount() {
            this.SensorRTChartInit();
            this.DataUpdateTimer = setInterval(() => {
                if (this.state.DataSource == "Gryo") {
                    this.Gryochart.EchartsDataAdd(Number(server.deviceRTDataBuffer[this.ShowDevID][2]), this.GryoPitch);
                    this.Gryochart.EchartsDataAdd(Number(server.deviceRTDataBuffer[this.ShowDevID][3]), this.GryoRoll);
                    this.Gryochart.EchartsDataAdd(Number(server.deviceRTDataBuffer[this.ShowDevID][4]), this.GryoYaw);
                    this.setState({
                        DataYaw: Number(server.deviceRTDataBuffer[this.ShowDevID][4]),
                        DataRoll: Number(server.deviceRTDataBuffer[this.ShowDevID][3]),
                        DataPitch: Number(server.deviceRTDataBuffer[this.ShowDevID][2])
                    });
                } else if (this.state.DataSource == "Accel") {

                } else if (this.state.DataSource == "RealAngle") {

                } else if (this.state.DataSource == "Altitude") {

                }
            }, this.state.DataUpdateFreq);
            this.ChartResizeTimer = setInterval(() => {
                this.Gryochart.EchartAreaUpdate();
            }, 100)
        }

        componentWillUnmount() {
            clearInterval(this.DataUpdateTimer);
            clearInterval(this.ChartResizeTimer);
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


    class GLRTShow extends React.Component {
        canvasElement: WebGLRenderingContext;
        private GLRTMainCSS: React.CSSProperties = {
            position: "absolute",
            width: "323px",
            height: "323px",
            top: "0",
            left: "0",
            backgroundColor: "pink"
        }

        public render() {
            return (
                <>
                    <div id="GLRT" style={this.GLRTMainCSS}>
                        <canvas id="glCanvas" style={{ width: "322px", height: "322px" }}></canvas>
                    </div>
                </>
            );
        }

        componentDidMount() {
            this.canvasElement = (document.getElementById("glCanvas") as HTMLCanvasElement).getContext("webgl");
            this.canvasElement.clearColor(0.0, 0.0, 0.0, 1.0);
            this.canvasElement.clear(this.canvasElement.COLOR_BUFFER_BIT);
        }
    }
}