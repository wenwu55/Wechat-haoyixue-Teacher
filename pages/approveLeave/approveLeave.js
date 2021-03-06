// pages/approveLeave/approveLeave.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData(options)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  refuse: function () {
    const that = this
    wx.requestProxy({
      url: `${app.globalData.URL}forLeave/updateLeaveById`,
      method: 'POST',
      data: {
        forId: that.data.forId,
        forStatus: 2
      },
      success: function (res) {
        if (res.data.code == 0) {
          wx.navigateBack({
            delta: 1
          })
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none'
          })
        }
      }
    })
  },

  agree: function () {
    const that = this
    wx.requestProxy({
      url: `${app.globalData.URL}forLeave/updateLeaveById`,
      method: 'POST',
      data: {
        forId: that.data.forId,
        forStatus: 1
      },      
      success: function (res) {
        if (res.data.code == 0) {
          wx.navigateBack({
            delta: 1
          })
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none'
          })
        }
      }
    })
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