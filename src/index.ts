// Ashare SDK 入口文件

import { get_price_day_tx, get_price_min_tx, get_price_sina } from './data';
import { StockData } from './types';

/**
 * 获取股票行情数据
 * @param code 股票代码 (例如 'sh000001' 或 '000001.XSHG')
 * @param end_date 结束日期 (YYYY-MM-DD)，默认为空字符串
 * @param count 数据条数，默认为 10
 * @param frequency 频率 ('1d', '1w', '1M', '1m', '5m', '15m', '30m', '60m')，默认为 '1d'
 * @returns 股票数据序列
 */
export async function get_price(code: string, end_date: string = '', count: number = 10, frequency: '1d' | '1w' | '1M' | '1m' | '5m' | '15m' | '30m' | '60m' = '1d'): Promise<StockData[]> {
  let xcode = code.replace('.XSHG', '').replace('.XSHE', '');
  xcode = code.includes('XSHG') ? 'sh' + xcode : code.includes('XSHE') ? 'sz' + xcode : code;

  if (['1d', '1w', '1M'].includes(frequency)) {
    try {
      // 类型断言，确保传递正确的频率类型
      return await get_price_sina(xcode, end_date, count, frequency as '1d' | '1w' | '1M');
    } catch (error) {
      console.warn('新浪接口获取日线数据失败，尝试腾讯接口:', error);
      // 类型断言，确保传递正确的频率类型
      return await get_price_day_tx(xcode, end_date, count, frequency as '1d' | '1w' | '1M');
    }
  }

  if (['1m', '5m', '15m', '30m', '60m'].includes(frequency)) {
    if (frequency === '1m') {
      // 类型断言，确保传递正确的频率类型
      return await get_price_min_tx(xcode, end_date, count, frequency as '1m' | '5m' | '15m' | '30m' | '60m');
    }
    try {
      // 类型断言，确保传递正确的频率类型
      return await get_price_sina(xcode, end_date, count, frequency as '5m' | '15m' | '30m' | '60m');
    } catch (error) {
      console.warn('新浪接口获取分钟线数据失败，尝试腾讯接口:', error);
      // 类型断言，确保传递正确的频率类型
      return await get_price_min_tx(xcode, end_date, count, frequency as '1m' | '5m' | '15m' | '30m' | '60m');
    }
  }

  console.error('不支持的频率:', frequency);
  return [];
}

// 导出技术指标函数
export * from './indicators';

// 导出类型定义
export * from './types';