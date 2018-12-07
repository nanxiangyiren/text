Page({
   data:{
      isShow:true
   },
   onLoad:function(){    
      var that = this; 
      wx.getUserInfo({
        success: function (res) {
          var { avatarUrl, nickName } = res.userInfo;
          that.setData({
            avatarUrl,
            nickName,
            isShow:false
          })
        }
      })
    },
    onTap:function(e){
      // console.log(e)
      wx.switchTab({
        url:"/pages/index/index"
      })
    },
    bindGetUserInfo:function(e){
      //console.log(e.detail.userInfo);
      var { avatarUrl, nickName } = e.detail.userInfo;
      this.setData({
        avatarUrl,
        nickName,
        isShow: false
      })
    }
});