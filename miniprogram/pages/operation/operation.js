// miniprogram/pages/operation/operation.js
const db = wx.cloud.database()
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: "",
    title: "",
    show_list: null,
    goods_title: "商品类型",
    goods_list: [
      {
        id: 1,
        name: '香烟',
      }, 
      {
        id: 2,
        name: '饮食'
      }, 
      {
        id: 3,
        name: '服饰'
      }, 
      {
        id: 4,
        name: '住宿'
      }, 
      {
        id: 5,
        name: '通讯'
      }, 
      {
        id: 6,
        name: '娱乐'
      }, 
      {
        id: 7,
        name: '交通'
      }, 
      {
        id: 8,
        name: '大件物品'
      }
    ],
    income_title: "收入来源",
    income_list: [
      {
        id: 1,
        name: '基本工资',
      }, 
      {
        id: 2,
        name: '理财',
      }, 
      {
        id: 3,
        name: '报销',
      }, 
      {
        id: 4,
        name: '兼职',
      }, 
      {
        id: 5,
        name: '其他收入',
      }, 
    ],
    type: null,
    current: '香烟',
    position: 'right',
    amount: null,
    note: '',
    display: "none"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("on load")

    this.setData({
      text: options.title,
      title: (options.title == "新增支出记录") ? "商品类型" : "收入来源",
      show_list: (options.title == "新增支出记录") ? this.data.goods_list : this.data.income_list,
      type: (options.title == "新增支出记录") ? 0 : 1,   // 0: 支出, 1: 收入
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  handleFruitChange({
    detail = {}
  }) {
    this.setData({
      current: detail.value
    });
  },

  subClick({}) {
    this.setData({
      display: "inline"
    })
    let 
      open_id = app.globalData.open_id,
      _this = this



    db.collection("bills").add({
      data: {
        // open_id: open_id,
        amount: this.data.amount,
        source_type: this.data.current,
        note: this.data.note,
        type: this.data.type,
        create_time: Date.parse(new Date()) / 1000
      },
      success: function(res) {
        console.log("success")
        _this.setData({
          display: "none"
        })
        wx.navigateBack({
          delta: 2
        })
      },
      fail: function(err) {
        console.log("fail")
        console.log(err)
      }
    })


  },

  changeAmonut(options) {
    let value = options.detail.detail.value
    this.setData({
      amount: value
    })
  },

  changeNote(options) {
    let value = options.detail.detail.value
    
    this.setData({
      note : value
    })
  }
})