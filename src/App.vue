<template>
  <div class="main_wrap">
    <!-- debug调试界面  路由选择 -->
    <Popover
      v-model:show="showPopover"
      :actions="actions"
      placement="top"
      @select="OnDebugItem"
    >
      <template #reference>
        <Button type="primary" round>!</Button>
      </template>
    </Popover>
    <router-view />
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Popover, Button } from "vant";

export default {
  components: {
    Popover,
    Button,
  },
  setup() {
    const showPopover = ref(false);
    const actions = [
      { text: "登录", path: "/login" },
      { text: "个人中心", path: "/mine" },
      { text: "购买结果", path: "/payResult" },
      { text: "单科毕过", path: "/exam/endPass", params: { type: "single" } },
      { text: "套餐毕过", path: "/exam/endPass", params: { type: "multi" } },
      { text: "金考典题库", path: "/exam/gold" },
      { text: "魔考题库", path: "/exam/magic" },
    ];
    const router = useRouter();
    const OnDebugItem = (action) => {
      console.log("action", action);
      const { path } = action;
      router.push({ path });
    };

    return {
      actions,
      OnDebugItem,
      showPopover,
    };
  },
  methods: {},
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.debug_nav_wrap {
  position: fixed;
  width: 100px;
  height: 100px;
  top: 50px;
  right: 50px;
}
</style>
<style scoped lang="scss">
.main_wrap {
  width: 100vw;
  height: 100vh;
  ::v-deep .van-popover__wrapper {
    z-index: 100;
    position: fixed;
    width: 50px;
    height: 50px;
    bottom: 10px;
    right: 50%;
    transform: translateX(50%);
  }
}
</style>
