

// Implementation with EventEmitter

const
  mqtt = require('mqtt'),
  util = require('util'),
  mqttStart = require('./mqtt-start.js'),
  EventEmitter = require('events').EventEmitter;

/**
 * Bot - Class to abstract connecting to Botsilo MQTT Broker
 *
 * @param  {String}   host   the broker URL
 * @param  {Integer}  port   the broker port number
 * @param  {String}   id     the bot's ID
 * @param  {String}   sk     the bot's password
 */
function Bot(host, port, id, sk) {

  EventEmitter.call(this);
  var mqtt_client = false;

  // start the connection to the MQTT Broker
  this.start = function() {
    var that = this;

    var onConnect = () => {
      that.emit('connect');
    }

    var onDisconnect = () => {
      that.emit('disconnect');
    }

    var onMessage = (from, payload) => {
      that.emit('message', from, payload);
    }

    mqtt_client = mqttStart(host, port, id, sk, onConnect, onDisconnect, onMessage);

  }

  /**
   * stop - close bot connection
   */
  this.stop = function() {
    mqtt_client.end();
  }

  /**
   * send - send a message
   *
   * @param  {String} recipientId description
   * @param  {String} payload     description
   */
  this.send = (recipientId, payload) => {
    mqtt_client.publish(`server/${id}/send`, JSON.stringify({to: recipientId, payload: payload}));
  }

  /**
   * info - get bot info
   */
  this.info = () => {
    mqtt_client.publish(`server/${id}/info`, JSON.stringify({}));
  }

  /**
   * add - add bot to friend list
   *
   * @param  {String} friendId the ID of bot to add to friend list
   */
  this.add = (friendId) => {
    mqtt_client.publish(`server/${id}/add`, JSON.stringify({id: friendId}));
  }

  /**
  * remove - remove bot from friend list
  *
  * @param  {String} friendId the ID of bot to remove from friend list
  */
  this.remove = (friendId) => {
    mqtt_client.publish(`server/${id}/remove`, JSON.stringify({id: friendId}));
  }

  return this;

}

util.inherits(Bot, EventEmitter)
module.exports = Bot;
