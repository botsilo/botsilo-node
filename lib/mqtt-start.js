
var mqtt = require('mqtt');



/**
 * mqttStart - start connection to MQTT broker and register
 * onConnect and onRequest callbacks.
 *
 * @param  {String} botId     the bot's ID
 * @param  {String} secret    the bot's secret
 * @param  {Function} onConnect the callback to run when connection established
 * @param  {Function} onDisconnect the callback to run when connection broken
 * @param  {Function} onRequest the callback to run when message received
 */
function mqttStart (host, port, botId, secret, onConnect, onDisconnect, onMessage) {

    var url = host;
    var options = {
      port: port,
      clientId: botId,
      username: botId,
      password: secret,
    };
    mqtt_client = mqtt.connect(url, options);

    // Connected to MQTT broker
    mqtt_client.on('connect', function() {
      mqtt_client.subscribe(`client/${botId}`, (err) => {
        if (err) console.log(err);
        onConnect();
      })
    });

    // Received message on subscribed topic
    mqtt_client.on('message', function(topic, buffer, packet) {
      var packet = JSON.parse(packet.payload.toString());
      onMessage(packet['from'], packet['payload']);
    });

    // Disconnected from MQTT broker
    mqtt_client.on('close', function() {
      mqtt_client.end(true);
      onDisconnect();
    });

    return mqtt_client;
}

module.exports = mqttStart;
