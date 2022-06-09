const TextCli = require("./TextCli")


new TextCli().register({
    name: 'reverse',
    call: (text) => text.split('').reverse().join("")
}).start();