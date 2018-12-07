Page({
  data:{
    slider:[],
    tab:[
      {
        name:"全部",
        type:1
      },
      {
        name:"视频",
        type:41
      },
      {
        name: "图片",
        type: 10
      },
      {
        name: "段子",
        type: 29
      },
      {
        name: "声音",
        type: 31
      }
    ],
    currentType:1,
    currentIndex:0
  },
  onLoad:function(){
    var that = this;
    //请求轮播图数据
    wx.request({
      url:"https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1539756999479",
      success:function(res){
        //console.log(res.data.data.slider);
        that.setData({
          slider: res.data.data.slider
        })
      }
    });
    //请求全部类型的数据
    this.requestBS(this.data.currentType)    
  },
  swiperTap:function(e){
      // console.log(e.target.dataset.link);
      getApp().linkUrl = e.target.dataset.link;
      wx.navigateTo({
        url:"./link/link"
      })
  },
  requestBS:function(){
    var that = this;
    //请求百思不得姐数据
    wx.request({
      url: "https://api.budejie.com/api/api_open.php?a=list&c=data&type=" + this.data.currentType,
      success: function (res) {
        //console.log(res.data.list[0])
        that.setData({
          list: res.data.list
        })
      }
    })
  },
  tabTap:function(e){
    //console.log(e.target.dataset.type);
    this.setData({
      currentType: e.target.dataset.type,
      currentIndex: e.target.dataset.index
    });
    this.requestBS();
  },
  commentTap:function(e){
    // console.log(e.currentTarget.dataset.id)
    var { id } = e.currentTarget.dataset;
    wx.navigateTo({
      url: './detail/detail?id=' + id,
    })
  },
  onShareAppMessage: function () {
    return {
      title:"新闻分享"
    }
  }
})