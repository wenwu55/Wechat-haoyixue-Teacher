//app.js
import {completeFetchData} from './utils/completeFetchData'
import {completeKeyMap} from './utils/completeFetchData'
App({
  onLaunch: function () {
    console.log('wx',wx)
    wx.requestProxy = function(config){
      config.data = completeFetchData({
        data:config.data,
        keyMap:completeKeyMap
      })
      wx.request({...config})
    }
    const that = this
    // 获取手机型号
    wx.getSystemInfo({
      success: res => {
        let modelmes = res.model;
        console.log(modelmes)
        if (modelmes.search('iPhone X') != -1) {
          that.globalData.isIphoneX = true
        }
        wx.setStorageSync('modelmes', modelmes)
      }
    })
    // 登录
    wx.checkSession({
      complete(e) {
        wx.login({
          success(res) {
            if (res.code) {
              //发起网络请求
              wx.requestProxy({
                url: that.globalData.URL + "miniProgram/getOpenId",
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
                  console.log(response)
                  wx.setStorageSync("openid", response.data.data.openid)
                  wx.setStorageSync("session_key", response.data.data.session_key)
                  wx.setStorageSync("userId", response.data.data.userId)
                  wx.setStorageSync("phone", response.data.data.phone)
                  wx.setStorageSync("roleId", response.data.data.role)
                  wx.setStorageSync("orgno", response.data.data.orgno)
                  wx.setStorageSync("info", response.data.data)
                }
              })
              console.log(res)
            } else {
              console.log('登录失败！' + res.errMsg)
            }
          }
        })
      }
    })
    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              wx.setStorageSync('userInfo', res.userInfo)

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    isIphoneX: false,
    userInfo: null,
    // URL: 'http://192.168.0.7:9666/'
    URL: 'https://duchengedu.com/wechatHyx/'
    // URL: 'http://192.168.0.176:9666/'
  }
})