<template>
  <div>
    <scroll-view scroll-y style="height:100vh">    
    <div class="voice" style="padding:0 40px;">
      <grids :grids="grids" :limit="5"/>
    </div>
    </scroll-view>
  </div>
</template>

<script>
import Grids from '@/components/Grids'
export default {
  components: {
    Grids
  },
  data () {
    return {
      grids: [],
      percent: 0
    }
  },
  computed: {
  },
  onLoad () {
    this.getData()
  },
  mounted () {
  },
  methods: {
    getData () {
      this.db
        .collection('doctors')
        .get()
        .then(res => {
          console.info(res)
          this.grids = res.data
        })
    }
  }
}
</script>

<style lang="scss">
// .voice-control-click{
//   // background: rgb(247, 247, 247) !important;
//   transform: scale(1.02)
// }
.voice-control {
  background: #fff;
  border-radius: 50%;
  margin: 0 auto;
  position: fixed;
  right:50rpx;
  bottom:50rpx;
  .circle {
    .circle-icon {
      .van-icon {
        font-weight: bold;
        text-align: center;
        vertical-align: middle;
      }
    }
  }
}

.voice {
  .grids {
    button {
      margin: 24rpx 0;
    }
  }
}
</style>
