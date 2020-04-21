import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { EchartShowSys } from './EchartsShow'
import { NetServerMain } from '../SocketComu'

export function MainPageSet(): void {
    ReactDOM.render(
        (
            <div>
                <h1>hello</h1>
                <MainPageUI />
            </div>
        ),
        document.getElementById('root')
    )
}

class MainPageUI extends React.Component {
    MapArea: JSX.Element;
    SensorRTChart: JSX.Element;
    SensorRTDashBorad: JSX.Element;

    public render(): JSX.Element {
        return (
            <div id="MainPage">
                <div id="RTChart"><SensorRTChart /></div>
                <div id="SensorRTChart"></div>
                <div id="SensorRTDashBorad"></div>
            </div>
        );
    }
}

class SensorRTChart extends React.Component {
    private TimerID: NodeJS.Timeout;
    private Gryochart: EchartShowSys;
    private server: NetServerMain;
    private GryoPitch;
    private GryoRoll;
    private GryoYaw;

    public render(): JSX.Element {
        const css = "#chartGryo{ width: 600px;height: 400px;}";
        return (
            <div>
                <style>
                    {css}
                </style>
                <div id='chartGryo'></div>
            </div >
        )
    }

    componentDidMount() {
        this.SensorRTChartInit();
        this.server = new NetServerMain(10086, "192.168.137.1")
        setInterval(() => {
            this.Gryochart.EchartsDataAdd(Number(this.server.deviceRTDataBuffer[1][2]), this.GryoPitch);
            this.Gryochart.EchartsDataAdd(Number(this.server.deviceRTDataBuffer[1][3]), this.GryoRoll);
            this.Gryochart.EchartsDataAdd(Number(this.server.deviceRTDataBuffer[1][4]), this.GryoYaw);
        }, 50);
    }

    componentWillUnmount() {
        clearInterval(this.TimerID);
    }

    private SensorRTChartInit() {
        this.Gryochart = new EchartShowSys(document.getElementById('chartGryo'), "Gryo", {
            width: 600,
            height: 400
        }, { ymax: 550, ymin: -550 });
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

// interface Person {
//     name: string
// }

// interface States {
//     date: Date
// }

// class MainPageUI extends React.Component<Person, States> {
//     timerID: NodeJS.Timeout;

//     constructor(props) {
//         super(props);
//         this.state = { date: new Date() };
//     }

//     componentDidMount(): void {
//         this.timerID = setInterval(
//             () => this.tick(),
//             1000
//         );
//     }

//     componentWillUnmount(): void {
//         clearInterval(this.timerID);
//     }

//     tick() {
//         this.setState({
//             date: new Date()
//         });
//     }

//     render(): JSX.Element {
//         return (
//             <div>
//                 <h1>Hello, world!</h1>
//                 <h2>It is {this.props.name}</h2>
//                 <h3>{this.state.date.toLocaleTimeString()}.</h3>
//             </div>
//         );
//     }
// }