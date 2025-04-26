import { StockData } from './types';
/**
 * 获取腾讯日线/周线/月线数据
 * @param code 股票代码
 * @param end_date 结束日期 (YYYY-MM-DD)
 * @param count 数据条数
 * @param frequency 频率 ('1d', '1w', '1M')
 * @returns 股票数据序列
 */
export declare function get_price_day_tx(code: string, end_date?: string, count?: number, frequency?: '1d' | '1w' | '1M'): Promise<StockData[]>;
/**
 * 获取腾讯分钟线数据
 * @param code 股票代码
 * @param end_date 结束日期 (YYYY-MM-DD)
 * @param count 数据条数
 * @param frequency 频率 ('1m', '5m', '15m', '30m', '60m')
 * @returns 股票数据序列
 */
export declare function get_price_min_tx(code: string, end_date?: string, count?: number, frequency?: '1m' | '5m' | '15m' | '30m' | '60m'): Promise<StockData[]>;
/**
 * 获取新浪全周期数据
 * @param code 股票代码
 * @param end_date 结束日期 (YYYY-MM-DD)
 * @param count 数据条数
 * @param frequency 频率 ('5m', '15m', '30m', '60m', '1d', '1w', '1M')
 * @returns 股票数据序列
 */
export declare function get_price_sina(code: string, end_date?: string, count?: number, frequency?: '5m' | '15m' | '30m' | '60m' | '1d' | '1w' | '1M'): Promise<StockData[]>;
