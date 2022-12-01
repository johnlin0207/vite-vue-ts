// 首先引入Mock
import Mock from 'mockjs';

// 引入所有的mock文件
import '@/mock/api/home';
import '@/mock/api/login';

// 设置拦截ajax请求的相应时间
Mock.setup({
  timeout: '200-600',
});
