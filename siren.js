const five = require("johnny-five")
const Twit = require("twit")
const colors = require("colors/safe")

const dotenv = require("dotenv")
dotenv.config()

const T = new Twit({
  consumer_key:         process.env.CONSUMER_KEY,
  consumer_secret:      process.env.CONSUMER_SECRET,
  access_token:         process.env.ACCESS_TOKEN,
  access_token_secret:  process.env.ACCESS_TOKEN_SECRET
})

const TWITTER_ID = process.env.TEST_MODE ? "816025856892141569" : "25073877"

const log = (text) => {
  console.log(`${new Date()}: ${text}`)
}

const board = new five.Board()

board.on("ready", function(){
  const relay = new five.Relay(7)
  log("Relay initialized. Testing light!")
  toggleLight(relay, 1000)

  const stream = T.stream("statuses/filter", { follow: TWITTER_ID })
  stream.on("connect", () => {
    log(colors.underline("Attempting to connect"))
  })

  stream.on("connected", (response) => {
    log(colors.green("Connected! Listening for tweets"))
  })

  stream.on("tweet", (tweet) => {
    toggleLight(relay, 5000)
  })
})

const toggleLight = (relay, ms) => {
  relay.on()
  log(colors.red("Light switched on"))

  setTimeout(() => {
    relay.off()
    log(colors.red("Light switched off"))
  }, ms)
}
