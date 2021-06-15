<template>
  <div>
    <Switcher :value="val" :onClick="test"></Switcher>
  </div>
</template>
<script>
import Switcher from '@/components/Switcher'
export default {
  name: 'test',
  data (){
    return {
      val: '测试'
    }
  },
  components: {
    Switcher
  },
  created(){},
  mounted(){},
  methods:{
    test(checked){
      console.log(checked)
    }
  }
}
</script>
