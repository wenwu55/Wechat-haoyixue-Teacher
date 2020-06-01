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
    
  },
  
  querySchoolNotice: function () {
    const orgno = wx.getStorageSync('orgno')
    const userId = wx.getStorageSync('userId')
    const that = this
    console.log(orgno)
    wx.requestProxy({
      url: `${app.globalData.URL}app/notification/getUserNotifications?orgno=${orgno}`,
      method: 'POST',
      data: {
        pageSize: 20,
        pageNum: 1,
        type: 2,
        senderid: userId
      },
      success: function (res) {
        console.log(res)
        if (res.data.code == 1) {
          if (res.data.data && res.data.data.pageData) {
            res.data.data.pageData.forEach(item => {
              const date = new Date(item.createtime).toJSON()
              item.createtime = new Date(+new Date(date) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
            })
          }
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
      url: '../addNotice/addNotice'
    })
  },

  // 查看详情
  viewDetail: function (e) {
    const dataset = e.currentTarget.dataset
    wx.navigateTo({
      url: `../noticeDetail/noticeDetail?title=${dataset.title}&createtime=${dataset.createtime}&content=${dataset.content}`,
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