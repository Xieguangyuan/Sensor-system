import * as net from 'net'

export class NetServerMain {

    private deviceID: number = 0;
    private serverMain: net.Server;
    RemotePortList: Array<number> = new Array<number>();
    RemoteAddressList: Array<string> = new Array<string>();
    deviceRTDataBuffer: Array<Array<string>> = new Array<Array<string>>();

    constructor(localport: number, localaddress: string) {

        let stringbuffer: Array<string> = new Array<string>();
        for (let index = 0; index < 10; index++) {
            stringbuffer[index] = "0";
        }
        for (let index = 0; index < 10; index++) {
            this.deviceRTDataBuffer[index] = stringbuffer;
        }

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
        if (DataExe.slice(0, 4) == "4200") {
            let TmpBuffer: string[] = this.SearchAllMatch_str(DataExe.toString());
            this.deviceRTDataBuffer[TmpBuffer[1]] = TmpBuffer;
        }
    }

    private SearchAllMatch_str(data: string): string[] {
        let index = 0;
        let count = 0;
        let dataBuff: Array<string> = new Array<string>();
        while (data.indexOf("/", index + 1) != -1) {
            dataBuff[count] = data.slice(index, data.indexOf("/", index + 1));
            dataBuff[count] = dataBuff[count].slice(1);
            index = data.indexOf("/", index + 1);
            count++;
        }
        return dataBuff;
    }
}