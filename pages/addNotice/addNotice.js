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
    type: '',
    // 上传图片相关
    files: [],
    imgUrls: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const type = options.type
    this.setData({
      selectFile: this.selectFile.bind(this),
      uplaodFile: this.uplaodFile.bind(this),
      type: type
    })
  },
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        });
      }
    })
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  selectFile(files) {
    console.log('files', files)
    // 返回false可以阻止某次文件上传
  },
  uplaodFile(files) {
    console.log('upload files', files)
    // 文件上传的函数，返回一个promise
    console.log(files.contents[0])
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url: `${app.globalData.URL}web/upload/uploadImg?filedir=classNotice%2F`,
        filePath: files.tempFilePaths[0],
        header: { 'Content-Type': 'multipart/form-data' },
        name: 'file',
        success: function (res) {
          const data = JSON.parse(res.data)
          console.log(data)
          resolve({ urls: [data.data.data] })
        }
      })
    })
  },
  // 删除图片
  uploadDelete(e) {
    console.log(e.detail.index)
    const that = this
    const img = that.data.imgUrls.splice(e.detail.index, 1)
    that.setData({
      imgUrls: img
    })
  },
  uploadError(e) {
    console.log('upload error', e.detail)
    wx.showToast({
      title: e.detail.error,
      icon: 'none'
    })
  },
  uploadSuccess(e) {
    const that = this
    console.log('upload success', e.detail)
    const files = that.data.imgUrls.concat(e.detail.urls)
    console.log(files)
    that.setData({
      imgUrls: files
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
    // 处理图片列表
    let pics = ''
    if (that.data.imgUrls.length == 0) {
      pics = ''
    } else if (that.data.imgUrls.length == 1) {
      pics = that.data.imgUrls[0]
    } else {
      pics = that.data.imgUrls.join(',')
    }
    const userId = wx.getStorageSync('userId')
    const orgno = wx.getStorageSync('orgno')
    const param = {
      clazz: that.data.currentClass.className,
      title: that.data.title,
      content: that.data.content,
      senderid: userId,
      imgUrl: pics
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