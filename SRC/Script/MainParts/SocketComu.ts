import * as express from 'express'
import * as http from 'http'

class NetServerMain {
    constructor(connectPort: number) {
        express().get('/', function (req, res) {
            res.send(300);
        });
        http.createServer(express).listen(connectPort, function () { console.log("connectPort is work at: " + connectPort) });
    }
}

export = NetServerMain;