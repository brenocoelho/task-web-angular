import { Injectable } from '@angular/core';

import { Socket } from "phoenix"

// declare var Socket: any;
// declare var Channel: any;

@Injectable({
  providedIn: 'root'
})
export class ChannelService {
  socket: any;
  channel: any;

  constructor() {
    // console.log("Channel Service - constructor");
    // var ROOT_SOCKET = 'ws://localhost:4001/socket';
    // this.socket = new Socket(ROOT_SOCKET,
    // {params: {token: "breno"}} 
    // // {logger: ((kind, msg, data) => { console.log(`${kind}: ${msg}`, data) })}
    // );
    // this.socket.connect();
    // this.channel = this.socket.channel("room:lobby", {})
    // // this.channel.push("new_msg", {body: "Oi, sou Angular"})
    // this.channel.join()
    // .receive("ok", resp => { console.log("Joined successfully", resp) })
    // .receive("error", resp => { console.log("Unable to join", resp) })    

    // setTimeout(() => {
    //   console.log("teste")
    //   this.channel.push("new_msg", {body: "Oi, sou Angular"})
    // }, 3000)
   }
}
