<template>
  <div class="pay_result_wrap">
    <header>
      <Icon class="icon" name="https://b.yzcdn.cn/vant/icon-demo-1126.png" />
      <h1>购买详情</h1>
    </header>
    <div class="pay_info part_wrap">
      <h1 class="title">恭喜你，购买成功</h1>
      <div class="info">
        <span class="title">（1年期）初级会计实务+经济法基础</span>
        <ul class="item_wrap">
          <li class="item">
            <span>科目：二级建造师：1)建设工程施工管理二级建造师 套餐详情</span>
          </li>
          <li class="item">
            <span>题库：金考典</span>
          </li>
          <li class="item">
            <span>题库时长：1 月</span>
          </li>
          <li class="item">
            <span>购买时间：2022-02-14 14:23</span>
          </li>
          <li class="item">
            <span>购买价格：</span>
            <span><i>￥</i>18</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="active_code part_wrap">
      <h1 class="title">激活码</h1>
      <span class="code">{{ code }}</span>
      <Button type="default">复制激活码</Button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { Button, Icon } from "vant";

export default {
  name: "PayResult",
  components: {
    Button,
    Icon,
  },
  setup() {
    const code = ref("2374858658AD4758438548A3898");
    return {
      code,
    };
  },
};
</script>

<style lang="scss" scoped>
.pay_result_wrap {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  background-color: #f2f2f2;
  padding: 138px 13px 20px;
  box-sizing: border-box;
  .part_wrap {
    background-color: #fff;
    border-radius: 10px;
    margin-bottom: 12px;
  }
}
header {
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: fit-content;
  .icon {
    position: absolute;
    left: 21.67px;
    top: 50%;
    transform: translateY(-50%);
    width: 20.33px;
    height: 6.17px;
    ::v-deep .van-icon__image {
      width: 100%;
      height: 100%;
    }
  }
  h1 {
    margin: 0;
    padding: 16px 0;
    font-size: 16px;
    font-weight: bold;
    color: #000000;
  }
}
.pay_info {
  > .title {
    font-size: 24px;
    font-weight: bold;
    color: #1ccf71;
    margin: 0 15.5px;
    border-bottom: 1px dashed #c4c4c4;
    padding: 71px 0 23.33px;
  }
}

/* 
    <div class="pay_info part_wrap">
      <h1 class="title">恭喜你，购买成功</h1>
      <div class="info">
        <span class="title">（1年期）初级会计实务+经济法基础</span>
        <ul class="item_wrap">
          <li class="item">
            <span>科目：二级建造师：1)建设工程施工管理二级建造师 套餐详情</span>
          </li>
          <li class="item">
            <span>题库：金考典</span>
          </li>
          <li class="item">
            <span>题库时长：1 月</span>
          </li>
          <li class="item">
            <span>购买时间：2022-02-14 14:23</span>
          </li>
          <li class="item">
            <span>购买价格：</span>
            <span><i>￥</i>18</span>
          </li>
        </ul>
      </div>
    </div>

 */
</style>
