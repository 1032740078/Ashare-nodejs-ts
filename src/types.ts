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