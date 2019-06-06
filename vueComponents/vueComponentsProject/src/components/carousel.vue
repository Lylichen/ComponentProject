<template>
  <div class="carousel">
    <div v-if="list.length > 0" class="pic-warp" @mouseover="changeDialog" @mouseout="changeDialog">
      <div class="pic-dialog" v-show="dialog"></div>
      <div class="pic" :style="`width:${pic_width}px;transform:translateX(-${translatex}px)`"><img :src="item['url']" :width="warp_width+'px'" alt="" v-for="(item, key) in list" :key="key"></div>
      <div class="pic-desc" v-show="Boolean(desc)">{{ desc }}</div>
      <div class="pic-count">
        <i v-for="(item, key) in list.length" :key="key" :class="active === key ? 'active' : ''" @click="changeAct(key)"></i>
      </div>
      <div class="pre-warp" @mouseover="changeIact(0)" @mouseout="changeIact(0)" @click="goto(0)">
        <i :class="[iact === 0 ? 'act' : '', iacted ? 'acted': '', 'pic-pre']"></i>
      </div>
      <div class="next-warp" @mouseover="changeIact(1)" @mouseout="changeIact(1)" @click="goto(1)">
        <i :class="[iact === 1 ? 'act' : '', iacted ? 'acted': '', 'pic-next']"></i>
      </div>
    </div>
    <div v-else class="nonelist">* 轮播图片集 *</div>
  </div>
</template>
<script>
export default {
  name: 'Carousel',
  data (){
    return {
      start: null,
      desc: '',
      active: -1,
      warp_style:'',
      warp_width: 0,
      pic_width: 0,
      translatex: 0,
      x: 0,
      play: true,
      stop: false,
      dialog: null,
      iact: null,
      iacted: false
    }
  },
  props: {
    list: {
      type: Array,
      default: () => []
    },
    dialogflag: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    list(val){
      this.list = val
    },
    active(val){
      this.active = val
      this.desc = val < 0 ? '' : this.list[val]['desc']
    }
  },
  created(){
      window.requestAnimFrame = (function(){
        return  window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function( callback ){
                  window.setTimeout(callback, 1000 / 60);
                };
      })();
  },
  mounted(){
    this.warp_width = document.querySelector('.carousel').clientWidth || 0
    this.pic_width = this.warp_width * Number(this.list.length)
    this.desc = this.active < 0 ? '' : this.list[this.active]['desc']
    this.dialog = this.dialogflag
    requestAnimFrame(this.init);
  },
  methods: {
    init(timestamp){
      let ww = this.warp_width
      let w = this.pic_width
      let aw = ww * this.active
      //第一次启动
      if (!this.start) this.start = timestamp
      // 点击选择
      if (this.stop){
        this.start = timestamp - aw * 10
        this.stop = false
      }
      //控制频率
      this.x = (timestamp - this.start) / 10 - ww
      // 控制切换图片（这里需要优化）
      if (this.x > aw){
        this.active++
        this.translatex = aw + ww;
        // 轮播完所有图片，从头开始
        if (this.active >= this.list.length){
          this.start = timestamp
          this.active = 0
          this.translatex = 0
        }
      }
      if (this.play) {
        requestAnimFrame(this.init);
      }
    },
    runStop(){
      this.play = false
    },
    changeAct(key){
      this.play = false
      this.active = key
      this.translatex = this.warp_width * this.active;
      this.play = true
      this.stop = true
      this.$nextTick(() => {
        setTimeout(() => {
          requestAnimFrame(this.init)
        }, 300)
      })
    },
    goto(f){
      switch(f){
        case 0: this.active === 0 ? this.changeAct(this.list.length - 1) : this.changeAct(this.active - 1) ; break;
        case 1: this.active === this.list.length + 1 ? this.changeAct(0) : this.changeAct(this.active + 1) ; break;
        default: break;
      }
    },
    changeDialog(){
      this.dialog = !this.dialog
    },
    changeIact(val){
      this.iacted = !this.iacted
      this.iact = this.iacted ? val : ''
    }
  }
}
</script>
<style lang="scss" scoped>
.carousel{
  width: 100%;
  height: 100%;
  .pic-warp{
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    .pic-dialog{
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.2);
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
    }
    .pic{
      height: auto;
      background-position: center;
      background-size: 100%;
      cursor: pointer;
      img{
        display: inline-block;
      }
      z-index: 0;
    }
    .pic-desc{
      position: absolute;
      bottom: 3rem;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(255,255,255,0.7);
      font-size: 1rem;
      color: #222;
      padding: 0 .5rem;
      border-radius: .2rem;
      max-width: 50%;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      z-index: 0;
    }
    .pic-count{
      position: absolute;
      bottom: 1.2rem;
      left: 50%;
      transform: translateX(-50%);
      i{
        display: inline-block;
        width: .9rem;
        height: .9rem;
        background: rgba(0,0,0,0.4);
        border-radius: 50%;
        margin: 0 .3rem;
        cursor: pointer;
      }
      .active{
        background: skyblue;
      }
      z-index: 2;
    }
    .pre-warp, .next-warp{
      width: 3.5rem;
      height: 100%;
      cursor: pointer;
      position: absolute;
      top: 0;
      z-index: 2;
    }
    .pre-warp{
      left: 0;
    }
    .next-warp{
      right: 0;
    }
    .pic-pre, .pic-next{
      display: block;
      position: absolute;
      width: 1.5rem;
      height: 1.5rem;
      top: 50%;
      border-top:skyblue solid .3rem;
      border-right:skyblue solid .3rem;
      z-index: 1;
      &.acted{
        animation: none;
        &.act{
          width: 1.8rem;
          height: 1.8rem;
          border-top:skyblue solid .4rem;
          border-right:skyblue solid .4rem;
        }
      }
    }
    .pic-pre{
      left: 1.5rem;
      transform: translate(0, -50%) rotate(-135deg);
      animation:.6s linear 0s infinite alternate toleft;
    }
    .pic-next{
      right: 1.5rem;
      transform: translate(0, -50%) rotate(45deg);
      animation:.6s linear 0s infinite alternate toright;
    }
  }
  .nonelist{
    box-shadow: 0 0 5px #eeeeee;
    text-align: center;
    padding: 20% 30%;
    margin: auto;
    font-size: 1rem;
    color: #ccc;
  }
}
@keyframes toleft {
  form{
    left: 1.5rem;
    width: 1.5rem;
    height: 1.5rem;
    border-width: .3rem;
  }
  to{
    left: .8rem;
    width: 1.8rem;
    height: 1.8rem;
    border-width: .35rem;
  }
}
@keyframes toright {
  form{
    right: 1.5rem;
    width: 1.5rem;
    height: 1.5rem;
    border-width: .3rem;
  }
  to{
    right: .8rem;
    width: 1.8rem;
    height: 1.8rem;
    border-width: .35rem;
  }
}
</style>
