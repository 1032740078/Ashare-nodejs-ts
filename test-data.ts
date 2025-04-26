import { get_price } from './src/index'; // 导入 TypeScript 源文件以获得类型提示

async function testGetData() {
  try {
    console.log('正在获取上证指数日线数据...');
    // 获取上证指数 (sh000001) 的日线数据，获取最新一条
    const dayPrice = await get_price('sh000001', '', 1, '1d');
    console.log('获取到的数据:', dayPrice);

  } catch (error) {
    console.error('获取数据失败:', error);
  }
}

testGetData();