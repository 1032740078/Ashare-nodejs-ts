# Ashare SDK (TypeScript)

这是一个将 Python 的 Ashare 项目转换为 TypeScript SDK 的项目。它提供了获取股票行情数据和计算技术指标的功能。

## 安装

使用 npm 安装 SDK：

```bash
npm install Ashare-nodejs-ts
```

## 使用方法

### 获取股票行情数据

```typescript
import { get_price } from 'Ashare-nodejs-ts';

async function fetchData() {
  try {
    // 获取某股票的日线数据
    const dayPrice = await get_price('sh000001', '', 1, '1d');
    console.log('上证指数日线数据:', dayPrice);

    // 获取某股票的分钟线数据
    const minPrice = await get_price('sh000001', '', 1, '1m');
    console.log('上证指数分钟线数据:', minPrice);

  } catch (error) {
    console.error('获取数据失败:', error);
  }
}

fetchData();
```

### 计算技术指标

```typescript
import { MA, EMA, MACD } from 'Ashare-nodejs-ts';

const data = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

// 计算 5 日均线
const ma5 = MA(data, 5);
console.log('5日均线:', ma5);

// 计算 10 日指数移动平均线
const ema10 = EMA(data, 10);
console.log('10日指数移动平均线:', ema10);

// 计算 MACD (示例参数)
// 注意：MACD 函数需要 OHLC 数据，这里仅为示例
// const ohlcData = [...]; // 你的 OHLC 数据
// const macdResult = MACD(ohlcData.close, 12, 26, 9);
// console.log('MACD:', macdResult);
```

## API 文档

### `get_price(code: string, end_date: string = '', count: number = 10, frequency: '1d' | '1w' | '1M' | '1m' | '5m' | '15m' | '30m' | '60m' = '1d'): Promise<StockData[]>`

获取股票行情数据。

- `code`: 股票代码 (例如 'sh000001')
- `end_date`: 结束日期 (格式 'YYYY-MM-DD')，默认为空字符串。仅对日线('1d')、周线('1w')、月线('1M')频率有效，用于获取指定日期及之前的数据。对于分钟线频率无效。
- `count`: 获取的数据条数，默认为 10。
- `frequency`: 数据频率，支持 '1d'(日线), '1w'(周线), '1M'(月线), '1m', '5m', '15m', '30m', '60m'(分钟线)，默认为 '1d'。
- 返回: `Promise<StockData[]>` 股票行情数据数组

### 工具函数 (utils.ts)

- `RD(N: number, D: number = 3): number`: 四舍五入取指定位数小数。
- `RET(S: number[], N: number = 1): number | undefined`: 返回序列倒数第N个值。
- `ABS(S: number[]): number[]`: 返回序列中每个数值的绝对值。
- `MAX(S1: number[], S2: number[]): number[]`: 返回两个序列对应位置的最大值。
- `MIN(S1: number[], S2: number[]): number[]`: 返回两个序列对应位置的最小值。
- `MA(S: number[], N: number): number[]`: 求序列的N日平均值，返回序列。
- `REF(S: number[], N: number = 1): number[]`: 对序列整体下移动N,返回序列(shift后会产生NAN)。
- `DIFF(S: number[], N: number = 1): number[]`: 前一个值减后一个值,前面会产生nan。
- `STD(S: number[], N: number): number[]`: 求序列的N日标准差，返回序列。
- `IF(S_BOOL: boolean[], S_TRUE: any[], S_FALSE: any[]): any[]`: 序列布尔判断 res=S_TRUE if S_BOOL==True else S_FALSE。
- `SUM(S: number[], N: number): number[]`: 对序列求N天累计和，返回序列。
- `HHV(S: number[], N: number): number[]`: 最近N天最高价。
- `LLV(S: number[], N: number): number[]`: 最近N天最低价。
- `EMA(S: number[], N: number): number[]`: 指数移动平均。
- `SMA(S: number[], N: number, M: number = 1): number[]`: 中国式的SMA。
- `AVEDEV(S: number[], N: number): number[]`: 平均绝对偏差 (序列与其平均值的绝对差的平均值)。
- `SLOPE(S: number[], N: number, RS: boolean = false): number | number[]`: 返回S序列N周期回线性回归斜率。
- `FORCAST(S: number[], N: number): number`: 返回S序列N周期回线性回归后的预测值。
- `CROSS(S1: number[], S2: number[]): boolean[]`: 判断穿越 CROSS(MA(C,5),MA(C,10))。
- `COUNT(S_BOOL: boolean[], N: number): number[]`: 最近N天满足S_BOO的天数 True的天数。
- `EVERY(S_BOOL: boolean[], N: number): boolean[]`: 最近N天是否都是True。
- `LAST(S_BOOL: boolean[], A: number, B: number): boolean`: 从前A日到前B日一直满足S_BOOL条件。
- `EXIST(S_BOOL: boolean[], N: number = 5): boolean[]`: n日内是否存在一天大于3000点。
- `BARSLAST(S_BOOL: boolean[]): number`: 上一次条件成立到当前的周期。

### 技术指标函数 (indicators.ts)

- `MACD(close: number[], short: number = 12, long: number = 26, mid: number = 9): { DIF: number[], DEA: number[], MACD: number[] }`: 计算 MACD 指标。
- `KDJ(close: number[], high: number[], low: number[], N: number = 9, M1: number = 3, M2: number = 3): { K: number[], D: number[], J: number[] }`: 计算 KDJ 指标。
- `RSI(close: number[], N: number = 6): number[]`: 计算 RSI 指标。
- `WR(close: number[], high: number[], low: number[], N: number = 10, N1: number = 6): number[]`: 计算 WR 指标。
- `BIAS(close: number[], N: number = 6): number[]`: 计算 BIAS 指标。
- `BOLL(close: number[], N: number = 20): { MID: number[], UPPER: number[], LOWER: number[] }`: 计算 BOLL 指标。
- `PSY(close: number[], N: number = 12): number[]`: 计算 PSY 指标。
- `CCI(close: number[], high: number[], low: number[], N: number = 14): number[]`: 计算 CCI 指标。
- `ATR(close: number[], high: number[], low: number[], N: number = 14): number[]`: 计算 ATR 指标。
- `BBI(close: number[], M1: number = 3, M2: number = 6, M3: number = 12, M4: number = 24): number[]`: 计算 BBI 指标。
- `DMI(close: number[], high: number[], low: number[], N: number = 14, M: number = 6): { PDI: number[], MDI: number[], ADX: number[], ADXR: number[] }`: 计算 DMI 指标。
- `TAQ(high: number[], low: number[], N: number = 14): number[]`: 计算 TAQ 指标。
- `TRIX(close: number[], N: number = 12, M: number = 20): { TRIX: number[], MATRIX: number[] }`: 计算 TRIX 指标。
- `VR(close: number[], volume: number[], N: number = 26, M: number = 6): { VR: number[], MAVR: number[] }`: 计算 VR 指标。
- `EMV(high: number[], low: number[], volume: number[], N: number = 14, M: number = 9): { EMV: number[], MAEMV: number[] }`: 计算 EMV 指标。
- `DPO(close: number[], N: number = 20, M: number = 6): number[]`: 计算 DPO 指标。
- `BRAR(open: number[], high: number[], low: number[], close: number[], N: number = 26): { BR: number[], AR: number[] }`: 计算 BRAR 指标。
- `DMA(close: number[], A: number = 10, B: number = 50, M: number = 10): { DMA: number[], AMA: number[] }`: 计算 DMA 指标。
- `MTM(close: number[], N: number = 12, M: number = 6): { MTM: number[], MTMMA: number[] }`: 计算 MTM 指标。
- `ROC(close: number[], N: number = 12, M: number = 6): { ROC: number[], ROCMA: number[] }`: 计算 ROC 指标。

## 示例

请参考 `tests/index.test.ts` 文件中的单元测试，了解如何使用各个函数。

## 贡献

欢迎贡献代码！请提交 Pull Request。

## 许可证

本项目采用 MIT 许可证。