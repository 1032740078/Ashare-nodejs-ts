import { StockData } from './types';
/**
 * 获取股票行情数据
 * @param code 股票代码 (例如 'sh000001' 或 '000001.XSHG')
 * @param end_date 结束日期 (YYYY-MM-DD)，默认为空字符串
 * @param count 数据条数，默认为 10
 * @param frequency 频率 ('1d', '1w', '1M', '1m', '5m', '15m', '30m', '60m')，默认为 '1d'
 * @returns 股票数据序列
 */
export declare function get_price(code: string, end_date?: string, count?: number, frequency?: '1d' | '1w' | '1M' | '1m' | '5m' | '15m' | '30m' | '60m'): Promise<StockData[]>;
export * from './indicators';
export * from './types';
