import * as express from 'express'
import * as http from 'http'

export class NetServerMain {
    constructor(connectPort: number) {
        http.createServer(express).listen(connectPort, function () { console.log("connectPort is work at: " + connectPort) });
    }
}