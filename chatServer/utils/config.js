const { API_VERSION } = require('./../const')
const ACCESS_KEY = 'frWfpDLauQSLS9pLI5fIQEGTxMFnpqfHCrZXn1da'
const SECRET_KEY = 'otLFopTxILdZf8KX9hg1TCTUB1hXj9_SdhKrq1P_'
const BUCKET = 'chenchao'
const TOKEN_SECRET = 'ronaldo'
const WHITE_LIST = [`${API_VERSION}/user/login`, `${API_VERSION}/user/register`, `${API_VERSION}/user/getcode`, `/`]


module.exports = {
  ACCESS_KEY,
  SECRET_KEY,
  BUCKET,
  TOKEN_SECRET,
  WHITE_LIST
}
