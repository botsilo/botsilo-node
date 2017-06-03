

### Example usage

```javascript
var host = 'mqtt://localhost';
var port = 1883;
var botId = '{{ botId }}';   // your bot's ID
var secret = '{{ botSk }}';  // your bot's SK

var botsilo = require('botsilo');

var bot = new botsilo.Bot(host, port, botId, secret);

bot.on('connect', () => {
  console.log('Connected!');
});

bot.on('disconnect', () => {
  console.log('Disconnected!');
  process.exit();
});

bot.on('message', (from, payload) => {
  console.log(`@${from}: ${JSON.stringify(payload)}`);
});

bot.start();
```
