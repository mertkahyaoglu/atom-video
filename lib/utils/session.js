'use babel';

import Peer from 'peerjs'
import _ from 'underscore-plus'
import { PEER_KEY } from './constants'

export default class Session {

  constructor(username) {
    this.peer = new Peer(username, {key: PEER_KEY})
    console.log("Peer created with username:", username, " and key:", PEER_KEY)
    this.connections = []

    this.peer.on('connection', (connection) => {
      console.log("New Connection", connection)
      this.connections.push(connection)

      connection.on('open', () => {
        console.log("Opened connection with id:", connection.peer)
      })

    })
  }

  getMedia(options, success) {
    navigator.webkitGetUserMedia(options, success, (err) => {console.log(err)});
  }

  connect(peerId) {
    let connection = this.peer.connect(peerId)
    connection.on('open', () => {
      console.log("Connected with", connection.peer)
    })
  }

}
