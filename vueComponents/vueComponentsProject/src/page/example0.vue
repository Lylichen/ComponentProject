<template>
  <div>
    <div class="header">
      <carousel :list="urllist" :dialogflag="true"></carousel>
    </div>
  </div>
</template>
<script>
import Carousel from '@/component/carousel.vue'
const imgurl = []
export default {
  name: 'carouseltest',
  components: { Carousel },
  data(){
    return {
      urllist: imgurl 
    }
  },
  created(){},
  mounted(){},
  methods: {
    
  }
}
</script>
<style lang="scss" scoped>
.header{
  width: 100%;
  height: 20rem;
  padding: 1rem 2rem;
}
</style>

