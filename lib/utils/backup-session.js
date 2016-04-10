'use babel';

import Peer from 'peerjs'
import _ from 'underscore-plus'
import { PEER_KEY } from './constants'

export default class Session {

  constructor(username) {
    this.peer = new Peer(username, {key: PEER_KEY})
    this.connections = []

    this.peer.on('connection', (connection) => {
      console.log("New Connection", connection)
      this.connections.push(connection)

      connection.on('open', (peerId) => {

        console.log(peerId)
        /*let connectionsWithoutNewConnection = _.filter(this.connections, (c) => c.peer != connection.peer)
        let peerIdsWithoutNewConnection = this.connectionsToPeerIds(connectionsWithoutNewConnection)

        if(peerIdsWithoutNewConnection.length) {
          console.log("Sending existing connections", peerIdsWithoutNewConnection)
          connection.send({type: "newConnection", peerIds: peerIdsWithoutNewConnection})
        }*/

      })

      /*connection.on('data', (data) => {

        if(data.type == "newConnection") {
          let peerIds = data.peerIds
          console.log("Connection to new peers", peerIds)
          _.forEach(peerIds, (peerId) => {

            this.peer.connect(peerId)

          })
        }

      })*/

      /*connection.on('close', () => {
        console.log("Deleting the connection", connection.peer)
        this.connections = _.filter(this.connections, (c) => c.peer != connection.peer)
      })*/

    })

    /*peer.on('call', (call) => {
      // TODO: prompt user to answer
      this.getMedia({audio: true, video: true}, (stream) => {

        call.answer(stream)

      })

      // check existing session
      // if no
      call.on('stream', (stream) => {
        //show video stream on video element
      })
    })

    this.peer.on('error', (error) => console.log(error.type))
    */
  }

  getMedia(options, success) {
    navigator.webkitGetUserMedia(options, success, (err) => {console.log(err)});
  }

  connect(peerId) {
    let connection = this.peer.connect(peerId)
    console.log(connection)
    connection.on('open', (peerId) => {
      console.log(peerId)

      //connection.send({type: "newConnection", peerIds: peerIdsWithoutNewConnection})

    })

  }

  /*connectionsToPeerIds(connections) {
    return _.map(connections, (connection) => {return connection.peer})
  }

  call(username, callback) {
    this.getMedia({audio: true, video: true}, (stream) => {
      var call = this.peer.call(username, stream);

      call.on('stream', callback); //onReceiveStream
    }).bind(this);
  }

  onReceiveStream(stream) {
    var video = document.querySelector('.video-call');
    video.src = window.URL.createObjectURL(stream);
  }

  prepareSelfVideo(callback) {
    this.getMedia({audio: false, video: true}, callback, (err) => console.log(err));
  }*/

  disconnect() {
    this.peer.disconnect();
  }

}
