/** 
    栅格组件
    使用方式：
    传入栅格数组，格式如下
    grids: [
      { icon: 'icon-plus', name: '测试', path: { path: '/pages/client/home/main', isTab: true },openType:'' },
    ]
*/
<template>
  <div class="grids">
    <block v-for="(item,index) in grids" :key="index">
      <button
        class="grid"
        :style="{width:width+'%;'}"
        @click="onClick(item)"
        :open-type="item.openType"
      >
        <i v-if="item.icon" class="iconfont" :class="item.icon" style="margin:30rpx 35rpx"></i>
        <!-- <van-image
          v-if="item.img"
          :src="item.img"
          style="margin:30rpx 35rpx"
          width="20rem"
          height="20rem"
          fit="cover"
          use-error-slot
          lazy-load
        >
          <van-icon name="failure" />
        </van-image> -->
        <!-- <van-image
        round
          :src="item.img"          
          width="20rem"
          height="20rem"
        >
          <van-icon name="failure" />
        </van-image> -->
        <van-card :tag="item.name" desc="描述信息" title="商品标题" :thumb="item.img">
         <view slot="footer">
            <van-button size="mini">按钮</van-button>
            <van-button size="mini">按钮</van-button>
          </view>
        </van-card>
      </button>
    </block>
  </div>
</template>

<script>
export default {
  props: {
    grids: {
      type: Array,
      require: true
    },
    limit: {
      type: Number,
      default: 5
    }
  },
  computed: {
    width() {
      this.$nextTick(() => {
        if (Number(this.grids.length) > Number(this.limit)) {
          return 150 / Number(this.limit)
        }
        return 150 / Number(this.grids.length)
      })
    }
  },
  methods: {
    onClick(item) {
      if (item.path) {
        this.WXP.navigateTo({
          url: item.path
        })
      }
      if (item.voiceSrc) {
        this.$emit('playVoice', item.voiceSrc)
      }
    }
  }
}
</script>

<style scoped lang="scss">
button::after {
  border: none;
}
button {
  // position: static; 修改之后会导致button页面的click监听扩大到整个页面

  margin: 0;
  padding: 0;
  font-size: 18px;
  text-align: inherit;
  text-decoration: none;
  line-height: 1;
  border-radius: 0;
  -webkit-tap-highlight-color: transparent;
  overflow: hidden;
  color: #000000;
  background-color: transparent;
}
input {
  outline: none;
  border: none;
  list-style: none;
}
.grids {
  display: flex;
  flex-wrap: wrap;
  .grid {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    .iconfont {
      font-size: 1.5em;
    }
  }
}
</style>
