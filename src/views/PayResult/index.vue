<template>
  <div class="pay_result_wrap">
    <header>
      <img class="icon" src="https://b.yzcdn.cn/vant/icon-demo-1126.png" />
      <h1>购买详情</h1>
    </header>
    <div class="pay_info part_wrap">
      <h1 class="title">恭喜你，购买成功</h1>
      <div class="info">
        <h3 class="title">（1年期）初级会计实务+经济法基础</h3>
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
      <span class="title">激活码</span>
      <span class="code">{{ code }}</span>
      <Button
        type="primary"
        class="copy_code"
        :data-clipboard-text="code"
        @click="copyCode"
      >
        复制激活码
      </Button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { Button, Toast } from "vant";
import Clipboard from "clipboard";

export default {
  name: "PayResult",
  components: {
    Button,
  },
  setup() {
    const code = ref("2374858658AD4758438548A3898");
    return {
      code,
    };
  },
  methods: {
    copyCode() {
      console.log(34567);
      var clipboard = new Clipboard(".copy_code");
      clipboard.on("success", () => {
        Toast.success("复制成功");
        //  释放内存
        clipboard.destroy();
      });
      clipboard.on("error", () => {
        // 不支持复制
        Toast.fail("该浏览器不支持复制");
        // 释放内存
        clipboard.destroy();
      });
    },
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
  .info {
    padding-left: 12px;
    .title {
      margin: 18px 0 10px;
      font-size: 14px;
      font-weight: bold;
      color: #000000;
      position: relative;
      line-height: 1;
      text-align: left;
      &::before {
        position: absolute;
        content: "";
        height: 9px;
        width: 3px;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        background-color: #709fff;
        border-radius: 100px;
      }
    }
    .item_wrap {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      padding-bottom: 5px;
      .item {
        line-height: 0;
        padding-bottom: 10px;
        span {
          &:nth-child(1) {
            font-size: 12px;
            font-weight: bold;
            color: #999999;
            display: inline-block;
            text-align: left;
            line-height: 1.5;
          }
          &:nth-child(2) {
            font-size: 18px;
            font-weight: bold;
            color: #ff7700;
            i {
              font-size: 12px;
              font-style: normal;
            }
          }
        }
      }
    }
  }
}
.active_code {
  padding: 10px 0 16px;
  .title {
    display: inline-block;
    margin: 0 auto;
    font-size: 14px;
    font-weight: bold;
    color: #000000;
    position: relative;
    &::before,
    &::after {
      position: absolute;
      content: "";
      width: 76px;
      height: 1px;
      top: 50%;
      transform: translateY(-50%);
      background: linear-gradient(90deg, #ffffff 0%, #808080 100%);
      left: -83px;
    }
    &::after {
      background: linear-gradient(270deg, #ffffff 0%, #808080 100%);
      right: -83px;
      left: unset;
    }
  }
  .code {
    display: inline-block;
    margin: 9px auto 14px;
    font-size: 16px;
    font-weight: bold;
    color: #000000;
    padding: 12px 32px;
    background: #f2f2f2;
    border-radius: 4px;
  }
  .copy_code {
    border-radius: 4px;
    border: unset;
    background: #ff7700;
    font-size: 14px;
    font-weight: bold;
    color: #ffffff;
    padding: 5px 40px;
  }
}
/* 

    <div class="active_code part_wrap">
      <h1 class="title">激活码</h1>
      <span class="code">{{ code }}</span>
      <Button type="default">复制激活码</Button>
    </div>

 */
</style>
