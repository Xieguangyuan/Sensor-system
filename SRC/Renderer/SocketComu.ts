import * as net from 'net'

export class NetServerMain {

    private deviceID: number = 0;
    private serverMain: net.Server;
    RemotePortList: Array<number> = new Array<number>();
    RemoteAddressList: Array<string> = new Array<string>();
    deviceRTDataBuffer: Array<Array<string>> = new Array<Array<string>>();

    public getUseableID(): number[] {
        let indexid = 0;
        let useableID: Array<number> = new Array<number>();
        for (let index = 0; index < 255; index++) {
            if (this.RemoteAddressList[index] != null) {
                useableID[indexid] = Number(this.IPDeviceIDParese(this.RemoteAddressList[index]));
                indexid++;
            }
        }

        return useableID;
    }

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
            socket.on('close', () => {
                console.log(socket.remoteAddress + " has disconnect");
                this.RemoteAddressList[this.IPDeviceIDParese(socket.remoteAddress)] = null;
            })
        });
    }

    private PreDataExend(DataExe: string, socket: net.Socket) {
        if (DataExe.slice(0, 4) == "4000") {
            socket.write("4010");
        };
        if (DataExe.slice(0, 4) == "4110") {
            let id = this.IPDeviceIDParese(socket.remoteAddress);
            this.RemoteAddressList[id] = socket.remoteAddress;
            this.RemotePortList[id] = socket.remotePort;
            socket.write("4111" + id.toString().padStart(3, "0"));
        };
        if (DataExe.slice(0, 4) == "4200") {
            let id = this.IPDeviceIDParese(socket.remoteAddress);
            let TmpBuffer: string[] = this.SearchAllMatch_str(DataExe.toString());
            this.deviceRTDataBuffer[id] = TmpBuffer;
        }
    }

    private IPDeviceIDParese(ip: string): number {
        let index = 0;
        let count = 0;
        let dataBuff: Array<string> = new Array<string>();
        while (ip.indexOf(".", index + 1) != -1) {
            dataBuff[count] = ip.slice(index, ip.indexOf(".", index + 1));
            dataBuff[count] = dataBuff[count].slice(1);
            index = ip.indexOf(".", index + 1);
            count++;
        }
        dataBuff[3] = ip.slice(index + 1);
        return Number(dataBuff[3]);
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