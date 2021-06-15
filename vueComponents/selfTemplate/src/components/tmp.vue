<template>
  <div class="hello">
    <!-- <button type="button" @touchstart="touchstart_fn" @touchend="touchend_fn" @click="click_fn">RUN</button> -->
    <button class="copy needsclick" type="button"
                    v-clipboard:copy="'test'"
                    v-clipboard:success="onCopy"
                    v-clipboard:error="onError">复制</button>
  </div>
</template>
<script>
export default {
  name: 'hello',
  data (){
    return {
      name: 'hello'
    }
  },
  methods: {
    touchstart_fn(){
      console.log('touchstart_fn')
    },
    touchend_fn(){
      console.log('touchend_fn')
    },
    click_fn(){
      console.log('click_fn')
    },
    onCopy(){
      console.log('复制成功')
    },
    onError(){
      console.log('复制失败')
    }
  }
}
</script>

<style lang="scss" scoped>
.hello{
  font-size: 24px;
  width: 100%;
  height: 100vh;
  background-color: #cfcfcf;
  button{
    border:none;
    background: none;
    outline: none;
    padding: 10px 20px;
    border-radius: 10px;
    background: #000000;
    color:#ffffff;
    font-weight: 900;
    font-size: 24px;
    cursor: pointer;
  }
}
</style>
