// pages/me/me.js
Page({
  data: {
    currentSongIndex:0,
    isPlaying:true,
    musiclist:[
      {
        url: "http://14.29.86.21/amobile.music.tc.qq.com/C4000033uAoA28bm3W.m4a?guid=3239715600&vkey=8807047E1A0E9AE69D732DFDF90280BC02429D9441E35B60DF539AEC8273D274F36AF0145CBAC3C895A838FE81FCE078244FC25B76DA568B&uin=0&fromtag=66",
        title:"戒烟"
      },{
        url: "http://183.60.23.16/amobile.music.tc.qq.com/C400002HDKp71Yy5YO.m4a?guid=3239715600&vkey=7720E7E52595DC9883A2592A9FBDBEC803CA4699BDC308EE4C09D166EBE735A8A9A4FFF9ECCE0CC25E991CE74A1A83DEBB74C9E0F88236D1&uin=0&fromtag=66",
        title:"第二首歌"
      },{
        url: "http://183.60.23.16/amobile.music.tc.qq.com/C400002HDKp71Yy5YO.m4a?guid=3239715600&vkey=7720E7E52595DC9883A2592A9FBDBEC803CA4699BDC308EE4C09D166EBE735A8A9A4FFF9ECCE0CC25E991CE74A1A83DEBB74C9E0F88236D1&uin=0&fromtag=66",
        title:"第三首歌"
      }
    ],
    menulist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;
      wx.request({
        url:"https://api.budejie.com/api/api_open.php?a=square&c=topic",
        success:function(res){
          //console.log(res.data.square_list.splice(0,16));
          that.setData({
            menulist: res.data.square_list.splice(0, 16)
          })
        }
      });  
      this.playSong();
      wx.onBackgroundAudioPause(function(){
        that.setData({
          isPlaying:false
        })
      });
      wx.onBackgroundAudioPlay(function(){
        that.setData({
          isPlaying: true
        })
      })
  },
  playSong:function(){
    var that = this;
    wx.playBackgroundAudio({
      dataUrl: that.data.musiclist[that.data.currentSongIndex].url,
      title: that.data.musiclist[that.data.currentSongIndex].title
    })
  },
  randomPlaySong:function(){
    this.setData({
      currentSongIndex: Math.floor(Math.random() * 3)
    });
    this.playSong();
  },
  musicStateChange:function(){
    this.setData({
      isPlaying:!this.data.isPlaying
    });
    if (this.data.isPlaying){
      this.playSong()
    }else{
      wx.pauseBackgroundAudio()
    }
  }
})