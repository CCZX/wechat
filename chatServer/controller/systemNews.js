const SYS_NEWS = require('./../models/systemNews')

const inserSysNews = async (news) => {
  const data = await SYS_NEWS.insertMany(news)
  console.log(data)
}

module.exports = {
  inserSysNews
}
