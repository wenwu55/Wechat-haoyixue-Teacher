// pages/my/my.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: wx.getStorageSync("userInfo") || app.globalData.userInfo
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  // 获取用户信息
  getUserInfo(res) {
    console.log(res)
    let that = this
    that.setData({
      userInfo: res.detail.userInfo
    })
    app.globalData.userInfo = res.detail.userInfo
    wx.setStorageSync("userInfo", res.detail.userInfo)
  },

  bindPhone: function () {
    const phone = wx.getStorageSync("phone")
    if (!phone) {
      wx.navigateTo({
        url: '../bindPhone/bindPhone'
      })
    } else {
      wx.showToast({
        title: '您已绑定过手机~',
        icon: "none",
        duration: 1000
      })
    }
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
    const role = wx.getStorageSync('roleId')
    console.log(role)
    if (role && role == 1) {
      wx.showToast({
        title: '您还不是学校老师哦~请联系管理员进行处理！',
        icon: 'none',
        duration: 2000
      })
    }
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