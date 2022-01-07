import { terminal, TCPHost, RESTHost } from "@skylixgh/luxjs-server";
import initRest from "./rest/init";

terminal.info("Starting TCP based API server and REST based API server");

const tcp = new TCPHost({
    port: 1790,
    host: "0.0.0.0"
});

let rest = new RESTHost({
    port: 9017,
    host: "0.0.0.0",
    routes: {
        get: [ "info" ]
    }
});

initRest(rest);

rest.start().then(() => {
    terminal.success("REST based API server is ready");
});

tcp.start().then(() => {
    terminal.success("TCP based API server is ready");
});
