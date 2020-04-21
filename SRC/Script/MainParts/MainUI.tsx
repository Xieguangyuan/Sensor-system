import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { inflate } from 'zlib';

export function MainPageSet(): void {
    ReactDOM.render(
        (
            <div>
                <MainPageUI name="=-=" />
            </div>
        ),
        document.getElementById('root')
    )
}

interface Person {
    name: string
}

interface States {
    date: Date
}

class MainPageUI extends React.Component<Person, States> {
    timerID: NodeJS.Timeout;

    constructor(props) {
        super(props);
        this.state = { date: new Date() };
    }

    componentDidMount(): void {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount(): void {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    render(): JSX.Element {
        return (
            <div>
                <h1>Hello, world!</h1>
                <h2>It is {this.props.name}</h2>
                <h3>{this.state.date.toLocaleTimeString()}.</h3>
            </div>
        );
    }
}