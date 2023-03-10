import storageService from '@/service/storageService';
import axios from 'axios';

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 1000 * 5,
  headers: { Authorization: `Bearer ${storageService.get(storageService.USER_TOKEN)}` },
});

export default service;
