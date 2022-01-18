import terminal, { State } from "@skylixgh/nitrojs-terminal";

terminal.animate("Starting server")

// code to start WS server

setTimeout(() =>{
    terminal.stopAnimation(State.success,"Skylix server ready!")
}, 1000)
