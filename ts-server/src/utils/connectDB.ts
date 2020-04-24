import mongoose from 'mongoose'

const DB_URL = 'mongodb://127.0.0.1:27017/chat'

mongoose.set('useCreateIndex', true)
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log(`>>> congratulations!!! mongoDB has successfully connected at ${DB_URL}!!!`)
})

mongoose.Promise = global.Promise

export default mongoose
