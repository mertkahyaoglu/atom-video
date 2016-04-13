'use babel';

import Peer from 'peerjs'
import _ from 'underscore-plus'
import { PEER_KEY } from './constants'

import { getStore } from '../utils/render'

import {
  callRequest,
  callRequestEnded,
  callingEnded,
} from '../actions/session'

export default class Session {

  constructor(username) {
    this.peer = new Peer(username, {key: PEER_KEY})
    this.username = username
    this.connections = []
    this.inSession = false

    this.peer.on('connection', (connection) => {

      connection.on('open', () => {
        console.log("Opened connection with id:", connection.peer)
      })

      connection.on('data', (data) => {
        if(data.type == "callRequest") {
          getStore().dispatch(callRequest(connection))
          if (this.inSession) {
            console.log("In session, declining..")
            connection.send({type: "callDeclined"})
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

                  call.on('stream', (stream) => {
                    this.inSession = true

                    console.log("Receiver answered, stream", stream)

                    this.addToConnections(call)
                  })

                  call.on('close', () => {
                    this.removeFromConnections(call)
                    this.inSession = false
                  })

                  call.on('error', (err) => {
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

      call.on('error', (err) => {
        this.removeFromConnections(call)
      })

    })

    this.peer.on('error', (err) => {
      console.log(err)
      getStore().dispatch(callingEnded(3))
    })

  }

  connect(peerId) {
    if (this.username == peerId) {
      getStore().dispatch(callingEnded(0))
      return
    }

    let connection = this.peer.connect(peerId)

    connection.on('open', () => {
      connection.send({type: "callRequest"})
    })

    connection.on('data', (data) => {
      if (data.type == "callAccepted") {

        getStore().dispatch(callingEnded(1))
        let peerIds = this.connectionsToPeerIds(this.connections)

        console.log("Sending existing connections", peerIds)
        connection.send({type: "callPeers", peerIds: peerIds})

      }else if (data.type == "callDeclined") {
        getStore().dispatch(callingEnded(2))
        connection.close()
      }
    })

    connection.on('close', () => {
      getStore().dispatch(callingEnded(0))
    })

    connection.on('error', (err) => {
      getStore().dispatch(callingEnded(3))
    })

  }

  answerCall(answerObj) {
    if(answerObj.answer == 1) {
      answerObj.connection.send({type: "callAccepted"})
    }else if(answerObj.answer == 2){
      answerObj.connection.send({type: "callDeclined"})
    }
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
