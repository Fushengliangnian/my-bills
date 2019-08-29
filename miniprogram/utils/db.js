const db = wx.cloud.database()


async function get(collection, query) {
  db.collection(collection).where(query).get({
    success: function (res) {
      console.log(res.data)
    }
  })
}

module.exports.get = get
