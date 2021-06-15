<template>
  <div class="hello">
    <div :class="['switch', act ? 'switch-active':'']" @click="toggle">
      <div class="switch-handle"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'test',
  data (){
    return {
      name: 'test',
      act: false
    }
  },
  methods: {
    toggle(){
      this.act = !this.act
    }
  }
}
</script>

<style lang="scss" scoped>
$switch_w: 120px;
$switch_h: 60px;
$switch_handle_w: 60px;
$switch_handle_h: 60px;
$color: coral;

.hello{
  font-size: 24px;
  width: 100%;
  height: 100vh;
  background-color: #efefef;
  .switch{
    position: relative;
    display: block;
    width: $switch_w;
    height: $switch_h;
    -webkit-transition-timing-function: ease-in-out;
    transition-timing-function: ease-in-out;
    -webkit-transition-duration: .2s;
    transition-duration: .2s;
    -webkit-transition-property: background-color,border;
    transition-property: background-color,border;
    border: 2px solid #ddd;
    border-radius: 40px;
    background-color: #fff;
    background-clip: padding-box;
    cursor: pointer;
    .switch-handle{
      position: absolute;
      z-index: 1;
      top: 0;
      left: 0;
      width: $switch_handle_w;
      height: $switch_handle_h;
      -webkit-transition: .2s ease-in-out;
      transition: .2s ease-in-out;
      -webkit-transition-property: -webkit-transform,width,left;
      transition-property: transform,width,left;
      border-radius: 50%;
      background-color: #fff;
      background-clip: padding-box;
      -webkit-box-shadow: 0 2px 5px rgba(0,0,0,.4);
      box-shadow: 0 2px 5px rgba(0,0,0,.4);
    }
    &.switch-active{
      background: $color;
      border-color: $color;
      .switch-handle{
        left: $switch_w - $switch_handle_w;
      }
    }
  }
}
</style>
