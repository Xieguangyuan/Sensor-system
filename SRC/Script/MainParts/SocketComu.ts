import * as net from 'net'
import { Socket } from 'dgram';

export class NetServerMain {
    server: net.Server;
    constructor(connectPort: number) {
        this.server = this.ServerInit(connectPort);
        this.server.on('connection', function (socket) {
            socket.setEncoding('utf8');
            console.log('New connection comming! IP is: ' + socket.remoteAddress);
            console.log('RemoteConnectPort is: ' + socket.remotePort);
        });
    }

    ServerRecv() {
        this.server.on('data', function (data) {
            var bread = this.server.bytesRead;
            console.log("remote message recved!");
        });
    }

    private ServerInit(connectPort: number): net.Server {
        let server: net.Server = net.createServer();
        server.listen(connectPort, function () {
            var address: any = server.address();
            console.log('Server is listening at port' + address.port);
            console.log('Server ip :' + address.address);
            console.log('Server is IP4/IP6 : ' + address.family);
        });
        return server;
    }
}