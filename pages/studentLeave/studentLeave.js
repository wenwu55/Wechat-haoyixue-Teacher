// pages/studentLeave/studentLeave.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbarStatus: 1,
    leaveNotList: [],
    leaveList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let isIphoneX = app.globalData.isIphoneX;
    this.setData({
      isIphoneX: isIphoneX
    })
  },

  changeStatus: function (event) {
    let that = this;
    if (event.currentTarget.dataset.status == 1) {
      that.getLeaveNotList()
    } else {
      that.getLeaveList()
    }
    that.setData({
      navbarStatus: event.currentTarget.dataset.status
    })
  },

  // 请求未审批
  getLeaveNotList: function () {
    const that = this
    const userId = wx.getStorageSync('userId')
    const orgNo = wx.getStorageSync('orgno')
    wx.requestProxy({
      url: `${app.globalData.URL}forLeave/getLeaveByUserId`,
      method: 'POST',
      data: { approvalId: userId, forStatus: 0, orgNo: orgNo },
      success: function(res) {
        console.log(res)
        that.setData({
          leaveNotList: res.data.data
        })
      }
    })
  },

  // 请求已审批(通过，拒绝)
  getLeaveList: function () {
    const that = this
    const userId = wx.getStorageSync('userId')
    const orgNo = wx.getStorageSync('orgno')
    wx.requestProxy({
      url: `${app.globalData.URL}forLeave/getLeaveByUserId`,
      method: 'POST',
      data: { approvalId: userId, forStatus: 1, orgNo: orgNo },
      success: function (res) {
        const type1 = res.data.data
        wx.requestProxy({
          url: `${app.globalData.URL}forLeave/getLeaveByUserId`,
          method: 'POST',
          data: { approvalId: userId, forStatus: 2, orgNo: orgNo },
          success: function (data) {
            const arr = type1.concat(data.data.data)
            console.log(arr)
            that.setData({
              leaveList: arr
            })
          }
        })
      }
    })
  },

  // add
  addLeave: function () {
    wx.navigateTo({
      url: '../addLeave/addLeave',
    })
  },

  // 
  goDetail: function (e) {
    console.log(e.currentTarget.dataset)
    const dataset = e.currentTarget.dataset
    wx.navigateTo({
      url: `../approveLeave/approveLeave?content=${dataset.content}&forId=${dataset.forid}&name=${dataset.name}`,
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
    this.getLeaveNotList()
    this.getLeaveList()
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