<template>
  <div class="swiper-css2">
    <swiper>
      <swiper-slider><img :src="lb1Img" alt="" class="swiper-css"></swiper-slider>
      <swiper-slider><img :src="lb2Img" alt="" class="swiper-css"></swiper-slider>
      <swiper-slider><img :src="lb3Img" alt="" class="swiper-css"></swiper-slider>
    </swiper>
  </div>
</template>

<script>

//引入组件
import Swiper from '@/components/swiper'
import SwiperSlider from '@/components/swiper-slide'

export default {
  name: 'Swiper12',
  components: {
    Swiper,
    SwiperSlider
  },
  data() {
    return {
       lb1Img: require('@/assets/image/lb12.jpg'),
       lb2Img: require('@/assets/image/lb22.jpg'),
       lb3Img: require('@/assets/image/lb32.jpg'),
    }
  }
}
</script>

<style scoped>

</style>