<template>
  <div style="width: 350px; margin: auto;">
    <t-form
      ref="form"
      :data="formData"
      :colon="true"
      :label-width="0"
      :rules="rules"
      @reset="onReset"
      @submit="onSubmit"
      @validate="onValidate"
    >
      <t-form-item label="手机号" name="telephone">
        <t-input v-model="formData.telephone" clearable placeholder="请输入手机号">
          <template #prefix-icon>
            <desktop-icon />
          </template>
        </t-input>
      </t-form-item>

      <t-form-item label="密码"  name="password">
        <t-input v-model="formData.password" type="password" clearable placeholder="请输入密码">
          <template #prefix-icon>
            <lock-on-icon />
          </template>
        </t-input>
      </t-form-item>

      <t-form-item>
        <t-button theme="primary" type="submit" block>登录</t-button>
      </t-form-item>
    </t-form>
  </div>
</template>
<script>
import { reactive, ref } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import { DesktopIcon, LockOnIcon } from 'tdesign-icons-vue-next';
import axios from 'axios';

export default {
  name: 'LoginView',
};
</script>
<script setup>

const form = ref(null);
const formData = reactive({
  telephone: '',
  password: '',
});

const onReset = () => {
  MessagePlugin.success('重置成功');
};

const onSubmit = ({ validateResult, firstError, e }) => {
  // 验证数据
  e.preventDefault();
  if (validateResult !== true) {
    console.log('Validate Errors: ', firstError, validateResult);
    MessagePlugin.warning(firstError);
    return;
  }
  // 请求
  const api = 'http://localhost:8081/api/auth/login';
  axios.post(api, { ...formData }).then((res) => {
    // 保存token
    console.log(res.data);
    // 跳转主页
    MessagePlugin.success('登录成功');
  }).catch((err) => {
    console.log('err', err);
    MessagePlugin.error('登录失败');
  });
};

const rules = {
  telephone: [
    {
      required: true, message: '手机号必填', type: 'error', trigger: 'blur',
    },
    {
      required: true, message: '手机号必填', type: 'error', trigger: 'change',
    },
    { whitespace: true, message: '手机号不能为空' },
    { validator: (val) => val?.length === 11, message: '手机号需要为11位' },
  ],
  password: [{ required: true, message: '密码必填', type: 'error' }],
};

const onValidate = ({ validateResult, firstError }) => {
  if (validateResult === true) {
    console.log('Validate Success');
  } else {
    console.log('Validate Errors: ', firstError, validateResult);
  }
};

</script>

<style>

</style>
