// pages/director/director.js
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

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  schoolNotice: function () {
    const roleId = wx.getStorageSync('roleId')
    if (roleId != 3) {
      wx.showToast({
        title: '您还不是学校管理员哦~',
        icon: 'none'
      })
      return false
    }
    wx.navigateTo({
      url: '../schoolNotice/schoolNotice',
    })
  },

  classCheck: function () {
    const roleId = wx.getStorageSync('roleId')
    if (roleId != 3) {
      wx.showToast({
        title: '您还不是学校管理员哦~',
        icon: 'none'
      })
      return false
    }
    wx.navigateTo({
      url: '../classCheck/classCheck',
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