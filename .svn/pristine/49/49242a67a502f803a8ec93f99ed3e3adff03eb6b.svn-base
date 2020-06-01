// pages/homeworkDetail/homeworkDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    createTime: '',
    content: '',
    imageList: []
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
      imageList: imageList
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