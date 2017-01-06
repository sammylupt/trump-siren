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

const TWITTER_USER_ID = "816025856892141569"
const stream = T.stream("statuses/filter", { follow: TWITTER_USER_ID })

stream.on("connect", () => {
  console.log(colors.underline("Attempting to connect"))
})

stream.on("connected", (response) => {
  console.log(colors.green("Connected!"))
})

stream.on("tweet", (tweet) => {
  console.log(tweet)
})
