// pages/accessControl/accessControl.js
import util from '../../utils/util.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: "2019-10-08",
    accessList: [],
    currentClass: {},
    schoolList: [],
    studentList: [],
    currentStudent: {},
    pageSize: 10,
    pageNo: 1,
    accessLoading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      startTime: options.date.replace(RegExp('-', 'g'), '') + "000000",
      endTime: options.date.replace(RegExp('-', 'g'), '') + "235959",
      name: options.name
    })
    this.getAccessList()
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
    // 获取当前时间
    // const date = new Date()
    // const year = date.getFullYear()
    // const month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : `0${(date.getMonth() + 1)}`
    // const day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`
    // const newDate = `${year}-${month}-${day}`
    // this.setData({
    //   start_date: newDate,
    //   end_date: newDate
    // })
    // // 获取班级列表
    // this.getClassList()
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
            setTimeout(() => {
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

  // 时间picker改变
  bindStartDateChange: function (e) {
    const that = this
    that.setData({
      start_date: e.detail.value,
      pageNo: 1,
      accessList: []
    })
    that.getAccessList()
  },

  // 时间picker改变
  bindEndDateChange: function (e) {
    console.log(e.detail.value.replace(/-/g, ''))
    console.log(e)
    const that = this
    that.setData({
      end_date: e.detail.value,
      pageNo: 1,
      accessList: []
    })
    that.getAccessList()
  },

  // 切换班级
  pickClassChange: function (e) {
    const that = this
    const currentClass = that.data.schoolList.tscList[e.detail.value]
    that.setData({
      currentClass: currentClass
    })
    // 获取班级下面的学生
    wx.requestProxy({
      url: `${app.globalData.URL}forLeave/getStuByClassId`,
      method: 'POST',
      data: {
        classId: currentClass.classId,
        className: currentClass.className,
        stuName: ''
      },
      success: function (res) {
        console.log(res)
        if (res.data.code == 0) {
          that.setData({
            studentList: res.data.data
          })
        }
      }
    })
  },

  pickStudentChange: function (e) {
    const that = this
    const currentStudent = that.data.studentList[e.detail.value]
    console.log(currentStudent, that.data.studentList)
    that.setData({
      currentStudent: currentStudent,
      pageNo: 1,
      accessList: []
    })
    that.getAccessList()
  },

  /**
 * 获取门禁列表
 * param {consumerName, startRecordTime, endRecordTime, orgNo, pageSize, pageNum}
 */
  getAccessList: function () {
    // 判断用户是否登录并绑定了学生
    const that = this
    // if (!that.data.currentStudent) {
    //   that.setData({
    //     accessList: []
    //   })
    //   return false
    // }
    const orgno = wx.getStorageSync('orgno')
    const userId = wx.getStorageSync('userId')
    // 计算时间  默认查询近四个月
    // const endRecordTime = `${that.data.end_date.replace(/-/g, '')} 23:59:59`
    // console.log(endRecordTime)
    // const startRecordTime = `${that.data.start_date.replace(/-/g, '')} 00:00:01`
    // 请求门禁
    const param = {
      consumerName: that.data.name,
      orgNo: orgno,
      startRecordTime: that.data.startTime,
      endRecordTime: that.data.endTime,
      pageSize: that.data.pageSize,
      pageNo: that.data.pageNo,
      userId: userId
    }
    wx.requestProxy({
      url: `${app.globalData.URL}app/user/getInoutRecord`,
      method: 'POST',
      data: param,
      success: function (res) {
        if (res.data.code == 1) {
          let list = res.data.data.list
          list.forEach(item => {
            item.createTime = util.formatTime(item.createTime)
          })
          // 如果已经存在accessList并且不是第一页的情况下
          if (that.data.accessList.length > 0 && that.data.pageSize != 1) {
            list = that.data.accessList.concat(list)
          }
          that.setData({
            accessList: list,
            pageNo: res.data.data.page.curPage + 1,
            totalPages: res.data.data.page.totalPages,
            accessLoading: false
          })
        }
      },
      fail: function (err) {
        console.log(err)
      }
    })
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
    const that = this
    that.setData({
      accessLoading: true
    })
    // 加载之前判断是否有更多多数据
    if (that.data.pageNo > that.data.totalPages) {
      that.setData({
        loadText: '暂无更多数据'
      })
    } else {
      that.setData({
        loadText: '加载更多'
      })
      that.getAccessList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})