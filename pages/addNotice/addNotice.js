// pages/addNotice/addNotice.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    schoolList: [],
    currentClass: {},
    title: '',
    content: '',
    length: 0,
    type: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const type = options.type
    this.setData({
      type: type
    })
  },

  // 获取班级列表
  getClassList: function () {
    const that = this
    const userId = wx.getStorageSync('userId')
    wx.requestProxy({
      url: `${app.globalData.URL}forLeave/getClassByUserId`,
      method: 'POST',
      data: { userId: userId, type: 2 },
      success: function (res) {
        console.log(res)
        if (res.data.code == 0) {
          if (res.data.data.tscList.length == 0 && userId) {
            wx.showToast({
              title: '您还未绑定班级，请联系管理员进行绑定。',
              icon: 'none'
            })
            setTimeout(()=>{
              wx.navigateBack({
                delta: 1
              })
            }, 2000)
          } else {
            that.setData({
              schoolList: res.data.data
            })
          }
        }
      }
    })
  },

  // 切换班级
  pickClassChange: function (e) {
    const that = this
    const currentClass = that.data.schoolList.tscList[e.detail.value]
    that.setData({
      currentClass: currentClass
    })
  },

  // title 
  changeTitle: function (e) {
    const that = this
    that.setData({
      title: e.detail.value
    })
  },

  // textarea 
  changeInput: function (e) {
    const that = this
    const length = e.detail.value.length
    that.setData({
      length: length,
      content: e.detail.value
    })
  },

  // 提交
  submit: function () {
    const that = this
    if (that.data.type != 2) {
      if (!that.data.currentClass || !that.data.currentClass.className) {
        wx.showToast({
          title: '请选择班级！',
          icon: 'none'
        })
        return false
      }
    }
    if (!that.data.title) {
      wx.showToast({
        title: '请输入标题！',
        icon: 'none'
      })
      return false
    }
    if (!that.data.content || that.data.content.length == 0) {
      wx.showToast({
        title: '请输入通知详情！',
        icon: 'none'
      })
      return false
    }
    const userId = wx.getStorageSync('userId')
    const orgno = wx.getStorageSync('orgno')
    const param = {
      clazz: that.data.currentClass.className,
      title: that.data.title,
      content: that.data.content,
      senderid: userId
    }

    if (that.data.type == 2) {
      delete param.clazz
    }

    console.log(param)

    wx.requestProxy({
      url: `${app.globalData.URL}app/notification/send?orgNo=${orgno}`,
      method: 'POST',
      data: param,
      success: function (res) {
        console.log(res)
        if (res.data.code == 1) {
          wx.showToast({
            title: '发布通知成功！'
          })
          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            })
          }, 2000)
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