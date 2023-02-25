<template>
    <div>
      <t-head-menu v-model="menu1Value" theme="light" @change="changeHandler">
        <template #logo>
          <img height="28" src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" alt="logo" />
        </template>
        <t-menu-item value="item1"> 菜单1 </t-menu-item>
        <t-menu-item value="item2"> 菜单2 </t-menu-item>
        <t-menu-item value="item4" :disabled="true"> 禁用菜单 </t-menu-item>
        <template #operations>
          <t-button variant="text" shape="square">
            <template #icon><t-icon name="search" /></template>
          </t-button>
          <t-button variant="text" shape="square">
            <template #icon><t-icon name="mail" /></template>
          </t-button>
          <t-button variant="text" shape="square">
            <template #icon><t-icon name="user" /></template>
          </t-button>
          <t-button variant="text" shape="square">
            <template #icon><t-icon name="ellipsis" /></template>
          </t-button>
        </template>
      </t-head-menu>
    </div>
</template>
<script>
import { ref } from 'vue';

export default {
  name: 'NavBar',
};
</script>

<script setup>

const menu1Value = ref('item2');

const changeHandler = (active) => {
  console.log('change', active);
};
</script>

  <style lang="less" scoped>
  .t-menu__operations {
    .t-button {
      margin-left: 8px;
    }
  }
  .t-demo-menu--dark {
    .t-button {
      color: #fff;
      &:hover {
        background-color: #4b4b4b;
        border-color: transparent;
        --ripple-color: #383838;
      }
    }
  }
  </style>
