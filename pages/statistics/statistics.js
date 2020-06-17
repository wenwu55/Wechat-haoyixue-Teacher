// pages/statistics/statistics.js
import * as echarts from '../../ec-canvas/echarts';
const app = getApp()



Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 页面总高度将会放在这里
    windowHeight: 0,
    // navbar的高度
    navbarHeight: 0,
    // header的高度
    infoHeight: 0,
    // tabbar的高度
    tabbarHeight: 0,
    // scroll-view的高度
    scrollViewHeight: 0,
    today: '',
    selectDate: '',
    currentClass: '',
    ec: {
      // 将 lazyLoad 设为 true 后，需要手动初始化图表
      lazyLoad: true
    },
    isLoaded: false,
    studentAccess: [],
    students: [],
    studentNo: [],
    navData: [
      {
        text: '已刷卡'
      },
      {
        text: '未刷卡'
      }
    ],
    currentTab: 0,
    navScrollLeft: 0,
    workList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this
    wx.getSystemInfo({
      success: (r) => {
        // 然后取出navbar和header的高度
        // 根据文档，先创建一个SelectorQuery对象实例
        let query = wx.createSelectorQuery().in(this);
        // 然后逐个取出navbar和header的节点信息
        // 选择器的语法与jQuery语法相同
        query.select('#navbar').boundingClientRect();
        query.select('#main').boundingClientRect();
        query.select('#tabbar').boundingClientRect();
        console.log(1)
        // 执行上面所指定的请求，结果会按照顺序存放于一个数组中，在callback的第一个参数中返回
        query.exec((res) => {
          console.log('res', res)
          // 分别取出navbar和header的高度
          let navbarHeight = res[0].height;
          let mainHeight = res[1].height;
          let tabbarHeight = res[2].height;

          // // 然后就是做个减法
          console.log(r.windowHeight)
          let scrollViewHeight = r.windowHeight - navbarHeight - mainHeight - tabbarHeight;
          that.setData({
            scrollViewHeight: scrollViewHeight,
            pixelRatio: r.pixelRatio,
            windowHeight: r.windowHeight,
            windowWidth: r.windowWidth
          })
        });
      },
    })
    this.getClassList(0)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 获取组件
    this.ecComponent = this.selectComponent('#mychart-dom-pie');
  },

  switchNav(event) {
    var cur = event.currentTarget.dataset.current;
    //每个tab选项宽度占1/2
    var singleNavWidth = this.data.windowWidth / 2;
    //tab选项居中                            
    this.setData({
      navScrollLeft: (cur - 2) * singleNavWidth
    })
    if (this.data.currentTab == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur
      })
    }
  },
  switchTab(event) {
    var cur = event.detail.current;
    var singleNavWidth = this.data.windowWidth / 2;
    this.setData({
      currentTab: cur,
      navScrollLeft: (cur - 2) * singleNavWidth
    });
  },

  setOption: function (chart) {
    const that = this;
    const value1 = that.data.studentAccess.length;
    const value2 = that.data.students.length - that.data.studentAccess.length;
    const name = that.data.studentAccess.length == 0 ? '0%' : Math.floor(that.data.studentAccess.length / that.data.students.length * 100) + '%'
    const name2 = name
    const option = {
      backgroundColor: "#ffffff",
      color: ["#508EF9", "#FCE153"],
      series: [{
        label: {
          position: 'center',
        },
        type: 'pie',
        center: ['50%', '50%'],
        radius: ['40%', '60%'],
        data: [{
          value: value1,
        }, {
          value: value2,
          name: name
        }]
      }]
    };
  chart.setOption(option);
  },

  // 点击按钮后初始化图表
  init: function () {
    const that = this;
    const value1 = that.data.studentAccess.length;
    const value2 = that.data.students.length - that.data.studentAccess.length;
    const name = that.data.studentAccess.length == 0 ? '0%' : (that.data.studentAccess.length / that.data.students.length).toFixed(2) * 100 + '%'
    this.ecComponent.init((canvas, width, height, dpr) => {
      // 获取组件的 canvas、width、height 后的回调函数
      // 在这里初始化图表
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr // new
      });
      that.setOption(chart);

      // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
      this.chart = chart;

      this.setData({
        isLoaded: true,
        isDisposed: false
      });

      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return chart;
    });
  },
  // 获取班级列表
  getClassList: function (type) {
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
        if (res.data.code == 0) {
          that.setData({
            schoolName: res.data.data.schoolName,
            classList: res.data.data.tscList,
            currentClass: res.data.data.tscList[0]
          })
          if (type == 0) {
            that.search()
          }
        }
      }
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
    const param = {
      departId: that.data.currentClass.classId,
      orgNo: that.data.orgno,
      startTime: that.data.selectDate ? that.data.selectDate + ' 00:00:00' : that.data.today + ' 00:00:00',
      endTime: that.data.selectDate ? that.data.selectDate + ' 23:59:59' : that.data.today + ' 23:59:59',
    }
    wx.requestProxy({
      url: app.globalData.URL + 'app/school/toGetStudentReport',
      method: 'POST',
      data: param,
      success: function (res) {
        // 取出未刷卡数组
        let arr = []
        if (res.data.data.studentAccess.length != 0) {
          let a = res.data.data.studentAccess;
          let b = res.data.data.students;
          let arr = [...b].filter(x => [...a].every(y => y.workNo !== x.workNo));
          that.setData({
            students: res.data.data.students,
            studentAccess: res.data.data.studentAccess,
            studentNo: arr
          })
        } else {
          arr = res.data.data.students
          that.setData({
            students: res.data.data.students,
            studentAccess: res.data.data.studentAccess,
            studentNo: arr
          })
        }

        that.init()
        // if (res.data.code == 0) {
        //   that.setData({
        //     attendanceList: res.data.data
        //   })
        // }
      }
    })
  },

  // 切换班级
  pickClassChange: function (e) {
    const that = this
    const currentClass = that.data.classList[e.detail.value]
    that.setData({
      currentClass: currentClass
    })
    that.search()
  },

  goDetail: function (e) {
    wx.navigateTo({
      url: `../accessControl/accessControl?date=${e.currentTarget.dataset.date.substring(0, 10)}&name=${e.currentTarget.dataset.name}`
    })
  },
  // 选择日期
  pickDateChange: function (e) {
    const that = this
    that.setData({
      selectDate: e.detail.value
    })
    that.search()
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
    this.setData({
      orgno: orgno,
      today: `${year}-${month}-${day}`
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})