<template>
  <div style="width: 350px; margin: auto;">
    <t-form
      ref="form"
      :data="formData"
      :colon="true"
      :rules="rules"
      @reset="onReset"
      @submit="onSubmit"
      @validate="onValidate"
    >
      <t-form-item label="用户名" name="name">
        <t-input v-model="formData.name" clearable placeholder="请输入用户名">
        </t-input>
      </t-form-item>

      <t-form-item label="手机号" name="telephone">
        <t-input v-model="formData.telephone" clearable placeholder="请输入手机号">
        </t-input>
      </t-form-item>

      <t-form-item label="密码"  name="password">
        <t-input v-model="formData.password" type="password" clearable placeholder="请输入密码">
        </t-input>
      </t-form-item>

      <t-form-item>
        <t-button theme="primary" type="submit" block>注册</t-button>
      </t-form-item>
    </t-form>
  </div>
</template>
<script>
import { reactive, ref } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import userService from '@/service/userService';
import storageService from '@/service/storageService';
import { useRouter } from 'vue-router';

export default {
  name: 'LoginView',
};
</script>
<script setup>
const router = useRouter();
const form = ref(null);
const formData = reactive({
  telephone: '',
  password: '',
  name: '',
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
  // const api = 'http://localhost:8081/api/auth/register';
  userService.register(formData).then((res) => {
    // 保存token
    console.log(res.data);
    storageService.set(storageService.USER_TOKEN, res.data.data.token);
    userService.info().then((res) => {
      // 保存用户信息
      storageService.set(storageService.USER_INFO, res.data.data.user);
      // 跳转主页
      router.replace({ name: 'home' });
    });
    // 跳转主页
    MessagePlugin.success('注册成功');
  }).catch((err) => {
    console.log('err', err);
    MessagePlugin.error('注册失败');
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
  name: [{ required: true, message: '用户名必填', type: 'error' }],
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
