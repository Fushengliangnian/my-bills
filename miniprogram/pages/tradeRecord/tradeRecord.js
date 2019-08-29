// miniprogram/pages/tradeRecord/tradeRecord.js
const db = wx.cloud.database()
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [],
    total_amount: 0,
    title: "",
    show: "",
    avatarUrl: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let 
      _this = this,
      type = parseInt(options.type),
      total_amount = 0,
      _data = {},
      query = {},
      openid = app.globalData.openid

    if (type == 0){
      _data = {
        title: "支出账单",
        show: "商品",
        avatarUrl: app.globalData.userInfo.avatarUrl
      }

      query = {
        type: type,
        _openid: openid
      }
    } else if (type == 1) {
      _data = {
        title: "收入账单",
        show: "来源",
        avatarUrl: app.globalData.userInfo.avatarUrl
      }

      query = {
        type: type,
        _openid: openid
      }
    } else {
      _data = {
        title: "总账单",
        show: "来源-商品",
        avatarUrl: app.globalData.userInfo.avatarUrl
      }

      query = {
        _openid: openid
      }
    }

    this.setData(_data)

    db.collection("bills").where(query).orderBy(
      "create_time", "desc"
    ).get({
      success: function (res) {
        console.log("success")
        for(let i=0; i < res.data.length; i++) {
          let item = res.data[i]
          total_amount += item.amount
          item.create_time = new Date(parseInt(item.create_time) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ')
        }

        _this.setData({
          listData: res.data,
          total_amount: total_amount
        })


      },
      fail: function (err) {
        console.log("fail")
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})