<template>
  <div>
    <div class="box" style="opacity: 0.8;">🔔 {{ billboard.content }}</div>
    <div>
      <Swiper12></Swiper12>
    </div>
    <div class="columns">
      <div class="column is-three-quarters">
        <TopicList></TopicList>
      </div>
      <div class="column">
        <CardBar></CardBar>
      </div>
    </div>
  </div>
</template>

<script>
import { getBillboard } from "@/api/billboard";
import CardBar from "@/views/card/CardBar"
import PostList from '@/views/post/Index'
import Swiper12 from '@/views/post/swiper-lun'

export default {
  name: "Home",
  components: {CardBar, TopicList: PostList,Swiper12},
  data() {
    return {
      billboard: {
        content: "",
      },
    };
  },
  created() {
    this.fetchBillboard();
  },
  methods: {
    async fetchBillboard() {
      getBillboard().then((value) => {
        const { data } = value;
        this.billboard = data;
      });
    },
  },
};
</script>
