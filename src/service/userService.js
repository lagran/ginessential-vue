import request from '@/utils/request';

const BASE_URL = 'http://localhost:8081/api/';
// 用户注册
const register = ({ name, telephone, password }) => request.post(`${BASE_URL}auth/register`, { name, telephone, password });

// 用户信息
const info = () => request.get(`${BASE_URL}auth/info`);
export default {
  register,
  info,
};
