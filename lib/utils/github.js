'use babel';

import octonode from 'octonode'
import _ from 'underscore-plus'

export default class Github {

  constructor(token) {
    this.client = octonode.client(token)
  }

  getUserInfo(cb) {
    this.client.get('/user', {}, function (err, status, body, headers) {
      let username, avatar;
      if(!err) {
        username = body.login
        avatar = body.avatar_url
      }
      cb(err, username, avatar)
    })
  }

  getFollowings(cb) {
    this.client.get('/user/following', {}, function (err, status, body, headers) {
      let followings;
      if(!err) {
        followings = _.map(body, (following) => {
          return following.login
        })
      }
      cb(err, followings)
    })
  }

}
