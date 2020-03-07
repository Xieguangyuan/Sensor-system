import * as net from 'net'
import { stringify } from 'querystring';

export class NetServerMain {
    RemotePortList: Array<number> = new Array<number>();
    RemoteAddressList: Array<string> = new Array<string>();
    private deviceID: number = 0;
    private serverMain: net.Server;
    constructor(localport: number, localaddress: string) {
        this.serverMain = net.createServer();
        this.serverMain.listen(localport, localaddress);
        this.serverMain.on("connection", (socket) => {
            socket.on('data', (data) => {
                this.PreDataExend(<string><unknown>data, socket);
            });
        });
    }

    private PreDataExend(DataExe: string, socket: net.Socket) {
        if (DataExe.slice(0, 4) == "4000") {
            socket.write("4010");
        };
        if (DataExe.slice(0, 4) == "4110") {
            if (this.deviceID < 999) {
                this.deviceID += 1;
                this.RemoteAddressList[this.deviceID] = socket.remoteAddress;
                this.RemotePortList[this.deviceID] = socket.remotePort;
                let tmp: string = this.deviceID.toString();
                socket.write("4111" + tmp.padStart(3, "0"));
            }
        };
    }
}