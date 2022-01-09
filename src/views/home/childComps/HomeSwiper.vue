<template>
    <swiper>
      <swiper-item v-for="item in banners">
        <a :href="item.link">
          <img :src="item.image" :alt="item.title" @load="imageLoad">
        </a>
      </swiper-item>
    </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from '@/components/common/swiper/index.js';

  export default {
    name: "HomeSwiper",
    data() {
      return {
       isLoad: true
      }
    },
    props: {
      banners: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    methods: {
      imageLoad() {
        if(this.isLoad) {
          this.$emit('swiperImageLoad')
          this.isLoad = false
        }
      }
    }
  }
</script>

<style scoped>

</style>
