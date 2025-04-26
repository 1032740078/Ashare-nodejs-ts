// 定义股票行情数据接口
export interface StockData {
  time: Date;
  open: number;
  close: number;
  high: number;
  low: number;
  volume: number;
}

// TODO: 添加技术指标结果接口
// 定义股票基本信息接口
export interface StockInfo {
  code: string; // 股票代码
  name: string; // 股票名称
}