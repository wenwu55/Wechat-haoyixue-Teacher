//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
  },
  onLoad: function () {
  },
  homework: function () {
    const roleId = wx.getStorageSync('roleId')
    if (!roleId || roleId == 1) {
      wx.showToast({
        title: '权限不足，无法访问！',
        icon: 'none'
      })
      return false
    }
    wx.navigateTo({
      url: '../homework/homework'
    })
  },
  classNotice: function () {
    const roleId = wx.getStorageSync('roleId')
    if (!roleId || roleId == 1) {
      wx.showToast({
        title: '权限不足，无法访问！',
        icon: 'none'
      })
      return false
    }
    wx.navigateTo({
      url: '../classNotice/classNotice'
    })
  },
  studentLeave: function () {
    const roleId = wx.getStorageSync('roleId')
    if (!roleId || roleId == 1) {
      wx.showToast({
        title: '权限不足，无法访问！',
        icon: 'none'
      })
      return false
    }
    wx.navigateTo({
      url: '../studentLeave/studentLeave'
    })
  },
  accessControl: function () {
    const roleId = wx.getStorageSync('roleId')
    if (!roleId || roleId == 1) {
      wx.showToast({
        title: '权限不足，无法访问！',
        icon: 'none'
      })
      return false
    }
    wx.navigateTo({
      url: '../accessControl/accessControl'
    })
  }
})
