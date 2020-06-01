// pages/bindPhone/bindPhone.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  getPhoneNumber(e) {
    const session_key = wx.getStorageSync('session_key')
    const openid = wx.getStorageSync('openid')
    // 如果存在session_key
    if (session_key) {
      wx.requestProxy({
        url: app.globalData.URL + 'miniProgram/getPhoneNumber',
        method: 'POST',
        data: {
          openId: openid,
          iv: e.detail.iv,
          encrypted: e.detail.encryptedData,
          sessionKey: session_key,
          type: 2
        },
        success: function (r) {
          console.log(r)
          wx.setStorageSync('roleId', r.data.data.role)
          wx.setStorageSync('userId', r.data.data.userId)
          wx.setStorageSync('phone', r.data.data.phone)
          wx.setStorageSync('orgno', r.data.data.orgno)
          wx.navigateBack({
            delta: 1
          })
        }
      })
    } else {
      wx.login({
        success(res) {
          if (res.code) {
            //发起网络请求
            wx.requestProxy({
              url: app.globalData.URL + "miniProgram/getOpenId",
              method: "POST",
              data: {
                appId: 'wx83b40d404ab0f066',
                secret: '44f80e1b0d190339d2378209faee9d02',
                js_code: res.code,
                type: 2
              },
              success(response) {
                if (response.data.code == -1) {
                  wx.showToast({
                    title: response.data.message,
                    icon: 'none'
                  })
                  return false
                }
                if (response.data.data.role && response.data.data.role == 1) {
                  wx.showToast({
                    title: '您还不是学校教师或管理员，请使用好易学家长端',
                    icon: 'none'
                  })
                  return false
                }
                wx.requestProxy({
                  url: app.globalData.URL + 'miniProgram/getPhoneNumber',
                  method: 'POST',
                  data: {
                    openId: response.data.data.openid,
                    iv: e.detail.iv,
                    encrypted: e.detail.encryptedData,
                    sessionKey: response.data.data.session_key,
                    type: 2
                  },
                  success: function (r) {
                    console.log(r)
                    wx.setStorageSync("openid", response.data.data.openid)
                    wx.setStorageSync("session_key", response.data.data.session_key)
                    wx.setStorageSync('roleId', r.data.data.role)
                    wx.setStorageSync('userId', r.data.data.userId)
                    wx.setStorageSync('phone', r.data.data.phone)
                    wx.setStorageSync('orgno', r.data.data.orgno)
                    wx.navigateBack({
                      delta: 1
                    })
                  }
                })
              }
            })
            console.log(res)
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
    }
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