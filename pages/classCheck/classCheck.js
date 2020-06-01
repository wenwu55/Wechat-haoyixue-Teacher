// pages/classCheck/classCheck.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orgno: '',
    currentClass: {},
    today: '',
    selectDate: '',
    attendanceList: {},
    schoolName: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 切换班级
  pickClassChange: function (e) {
    const that = this
    const currentClass = that.data.classList[e.detail.value]
    that.setData({
      currentClass: currentClass
    })
  },

  // 获取班级列表
  getClassList: function () {
    const that = this
    const userId = wx.getStorageSync('userId')
    wx.requestProxy({
      url: `${app.globalData.URL}forLeave/getClassByUserId`,
      method: 'POST',
      data: {
        userId: userId,
        type: 2
      },
      success: function (res) {
        console.log(res)
        if (res.data.code == 0) {
          that.setData({
            schoolName: res.data.data.schoolName,
            classList: res.data.data.tscList
          })
        }
      }
    })
  },

  // 选择日期
  pickDateChange: function (e) {
    console.log(e)
    const that = this
    that.setData({
      selectDate: e.detail.value
    })
  },

  search: function () {
    const that = this
    if (!that.data.currentClass || !that.data.currentClass.className) {
      wx.showToast({
        title: '请先选择班级！',
        icon: 'none'
      })
      return false
    }
    const time = that.data.selectDate ? that.data.selectDate : that.data.today
    const param = {
      departId: that.data.currentClass.classId,
      departName: that.data.currentClass.className,
      orgNo: that.data.orgno,
      startTime: time + ' 00:00:00',
      endTime: time + ' 23:59:59'
    }
    wx.requestProxy({
      url: app.globalData.URL + 'classAttendance/getClassAttendanceList',
      method: 'POST',
      data: param,
      success: function (res) {
        console.log(res)
        if (res.data.code == 0) {
          that.setData({
            attendanceList: res.data.data
          })
        }
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
    const orgno = wx.getStorageSync('orgno')
    // 获取当天日期
    const today = new Date()
    const year = today.getFullYear()
    const month = (today.getMonth() + 1) < 10 ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1)
    const day = today.getDate() < 10 ? '0' + today.getDate() : today.getDate()
    console.log(`${year}-${month}-${day}`)
    this.setData({
      orgno: orgno,
      today: `${year}-${month}-${day}`
    })
    this.getClassList()
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