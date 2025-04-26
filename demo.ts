// Ashare SDK TypeScript Demo
// 导入 Ashare SDK 函数
import { get_price, BOLL, StockData } from './src/index'; // BOLL 等指标从 index 导出
import { MA } from './src/utils'; // MA 等基础工具函数从 utils 导出

// 辅助函数：打印数据摘要
function printDataSummary(title: string, data: StockData[] | number[] | [number[], number[], number[]] | [number[], number[]]) {
  console.log(`\n--- ${title} ---`);
  if (Array.isArray(data) && data.length > 0) {
    if (typeof data[0] === 'object' && data[0] !== null && 'time' in data[0]) { // 修正：检查 'time' 字段
      // 打印 StockData[] 的前几条和后几条
      const stockData = data as StockData[];
      console.log('数据条数:', stockData.length);
      console.log('前 3 条数据:');
      console.table(stockData.slice(0, 3));
      if (stockData.length > 3) {
        console.log('后 3 条数据:');
        console.table(stockData.slice(-3));
      }
    } else if (Array.isArray(data[0])) {
        // 打印指标数组 [number[], number[], ...]
        const indicatorData = data as number[][];
        console.log('指标组数量:', indicatorData.length);
        indicatorData.forEach((indicator, index) => {
            console.log(`指标 ${index + 1} (前 5 条):`, indicator.slice(0, 5).map(v => (typeof v === 'number' && !isNaN(v)) ? v.toFixed(2) : 'NaN'));
            if (indicator.length > 5) {
                console.log(`指标 ${index + 1} (后 5 条):`, indicator.slice(-5).map(v => (typeof v === 'number' && !isNaN(v)) ? v.toFixed(2) : 'NaN'));
            }
        });
    } else {
      // 打印 number[] 的前几条和后几条
      const numberData = data as number[];
      console.log('数据条数:', numberData.length);
      console.log('前 5 条数据:', numberData.slice(0, 5).map(v => (typeof v === 'number' && !isNaN(v)) ? v.toFixed(2) : 'NaN'));
      if (numberData.length > 5) {
        console.log('后 5 条数据:', numberData.slice(-5).map(v => (typeof v === 'number' && !isNaN(v)) ? v.toFixed(2) : 'NaN'));
      }
    }
  } else {
    console.log('无数据或数据格式无法识别');
  }
  console.log('--- End ---');
}


// 主函数
async function runDemo() {
  console.log('开始运行 Ashare SDK TypeScript Demo...');

  // --- 复现 Demo1.py ---
  // 获取上证指数日线行情 (默认 count=10, frequency='1d')
  const shIndexDaily = await get_price('sh000001');
  printDataSummary('上证指数日线行情 (默认)', shIndexDaily);

  // 获取上证指数日线行情 (指定 count=5)
  const shIndexDaily5 = await get_price('sh000001', '', 5);
  printDataSummary('上证指数日线行情 (count=5)', shIndexDaily5);

  // 获取上证指数历史日线行情 (指定 end_date 和 count)
  const shIndexHist = await get_price('000001.XSHG', '2023-12-31', 5, '1d');
  printDataSummary('上证指数历史日线行情 (end_date="2023-12-31", count=5)', shIndexHist);

  // 获取贵州茅台15分钟线行情 (count=5)
  const kweiChow15m = await get_price('sh600519', '', 5, '15m');
  printDataSummary('贵州茅台15分钟线 (count=5)', kweiChow15m);

  // 获取贵州茅台60分钟线行情 (count=6)
  const kweiChow60m = await get_price('600519.XSHG', '', 6, '60m');
  printDataSummary('贵州茅台60分钟线 (count=6)', kweiChow60m);


  // --- 复现 Demo2.py (数据处理部分) ---
  // 获取上证指数日线行情 (count=120)
  const shIndexDaily120 = await get_price('000001.XSHG', '', 120, '1d');
  printDataSummary('上证指数日线行情 (count=120)', shIndexDaily120);

  if (shIndexDaily120.length > 0) {
    // 提取收盘价序列
    const closePrices = shIndexDaily120.map(item => item.close);
    printDataSummary('提取的收盘价序列', closePrices);

    // 计算 MA 指标
    const ma5 = MA(closePrices, 5);
    const ma10 = MA(closePrices, 10);
    printDataSummary('MA5 指标', ma5);
    printDataSummary('MA10 指标', ma10);

    // 计算 BOLL 指标
    const [bollUp, bollMid, bollLower] = BOLL(closePrices); // 默认 N=20, P=2
    printDataSummary('BOLL 指标 (UP, MID, LOWER)', [bollUp, bollMid, bollLower]);

  } else {
    console.log('\n无法计算指标，因为未能获取到足够的行情数据。');
  }

  console.log('\nAshare SDK TypeScript Demo 运行结束。');
}

// 执行 Demo
runDemo().catch(error => {
  console.error('运行 Demo 时出错:', error);
});