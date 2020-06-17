// pages/schoolNotice/schoolNotice.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noticeList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    let isIphoneX = app.globalData.isIphoneX;
    that.setData({
      isIphoneX: isIphoneX
    })
  },

  querySchoolNotice: function () {
    const orgno = wx.getStorageSync('orgno')
    const userId = wx.getStorageSync('userId')
    const that = this
    wx.requestProxy({
      url: `${app.globalData.URL}app/notification/getUserNotifications?orgNo=${orgno}`,
      method: 'POST',
      data: {
        pageSize: 20,
        pageNum: 1,
        type: 3
      },
      success: function (res) {
        if (res.data.code == 1) {
          that.setData({
            noticeList: res.data.data.pageData
          })
        }
      }
    })
  },

  // 新增通知
  addNotice: function () {
    wx.navigateTo({
      url: '../addNotice/addNotice?type=2'
    })
  },

  // 查看详情
  viewDetail: function (e) {
    const dataset = e.currentTarget.dataset
    wx.navigateTo({
      url: `../noticeDetail/noticeDetail?title=${dataset.title}&createtime=${dataset.createtime}&content=${dataset.content}&pics=${dataset.pics}`,
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
    this.querySchoolNotice()
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