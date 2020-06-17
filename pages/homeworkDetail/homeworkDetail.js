// pages/homeworkDetail/homeworkDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    createTime: '',
    content: '',
    imageList: [],
    cur: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    const imageList = options.pics.split(',')
    console.log(options.title == 'null')
    const title = options.title == 'null' ? '暂无标题' : options.title
    console.log(title)
    this.setData({
      title: title,
      createTime: options.createTime,
      content: options.content,
      cur: options.cur,
      imageList: imageList
    })
  },
  //预览单个图片
  previewImage: function (e) {
    let that = this;
    let src = e.currentTarget.dataset.src;
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: that.data.imageList // =============重点重点=============
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
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2]; //上一个页面
    console.log(prevPage)
    const cur = this.data.cur
    console.log(cur)
    prevPage.setData({
      currentTab: cur
    })
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