'use babel';

import Peer from 'peerjs'
import _ from 'underscore-plus'
import { PEER_KEY } from './constants'

import { getStore } from '../utils/render'
import { callRequest, callRequestEnded, callingEnded } from '../actions/session'

export default class Session {

  constructor(username) {
    this.peer = new Peer(username, {key: PEER_KEY})
    console.log("Peer created with username:", username)
    this.connections = []
    this.inSession = false

    this.peer.on('connection', (connection) => {

      connection.on('open', () => {
        console.log("Opened connection with id:", connection.peer)
      })

      connection.on('data', (data) => {
        if(data.type == "callRequest") {
          getStore().dispatch(callRequest(connection.peer))
          if (!this.inSession) {
            // prompt user & set timeout
            connection.send({type: "callAccepted"})

          }else {
            connection.send({type: "callDeclined"})
            //connection.close() TODO test if it is one sided close
          }
        }else if (data.type == "callPeers") {
          console.log("Received peer ids", data.peerIds)
          let peerIds = data.peerIds
          peerIds.push(connection.peer)
          if(peerIds) {
            _.each(peerIds, (id) => {
              if (!this.checkIfConnectionExists(id)) {

                this.getMedia({audio: true, video: true}, (stream) => {
                  var call = this.peer.call(id, stream);
                  //show calling

                  call.on('stream', (stream) => {
                    this.inSession = true
                    console.log("Receiver answered, stream", stream)

                    this.addToConnections(call)
                  })

                  call.on('close', () => {
                    this.removeFromConnections(call)
                    this.inSession = false
                  })

                  call.on('error', () => {
                    this.removeFromConnections(call)
                    call.close()
                    //show error
                  })

                })

              }
            })
          }
        }
      })

      connection.on('close', () => {
        getStore().dispatch(callRequestEnded(connection.peer))
      })

    })

    this.peer.on('call', (call) => {
      // check existing calls if not
      this.getMedia({audio: true, video: true}, (stream) => {

        call.answer(stream)
        this.addToConnections(call)

      })

      call.on('stream', (stream) => {
        console.log("Received caller's stream", stream)
      })

      call.on('close', () => {
        this.removeFromConnections(call)
      })

    })
  }

  connect(peerId) {

    let connection = this.peer.connect(peerId)

    connection.on('open', () => {
      connection.send({type: "callRequest"})
    })

    connection.on('data', (data) => {
      if (data.type == "callAccepted") {
        //show the user its accepted
        console.log("Call request accepted by", connection.peer)
        let peerIds = this.connectionsToPeerIds(this.connections)

        console.log("Sending existing connections", peerIds)
        connection.send({type: "callPeers", peerIds: peerIds})

      }else if (data.type == "callDeclined") {
        getStore().dispatch(callingEnded())
        connection.close()
      }
    })

    connection.on('close', () => {
      getStore().dispatch(callingEnded())
    })

  }

  connectionsToPeerIds(connections) {
    return _.map(connections, (c) => { return c.peer })
  }

  checkIfConnectionExists(id) {
    return _.contains(this.connectionsToPeerIds(this.connections), id);
  }

  addToConnections(connection) {
    this.connections.push(connection)
    console.log("Connections updated (",connection.peer,"added) :", this.connections)
  }

  removeFromConnections(connection) {
    this.connections = _.filter(this.connections, (c) => c.peer != connection.peer)
    console.log("Connections updated (",connection.peer,"removed) :", this.connections)
  }

  getMedia(options, success) {
    navigator.webkitGetUserMedia(options, success, (err) => {console.log(err)});
  }

}
