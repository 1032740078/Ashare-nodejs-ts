# Ashare SDK (TypeScript)

中国股市A股股票行情实时数据最简封装API接口，包含日线、分时分钟线，全部格式成DataFrame格式数据，可用于研究、量化分析，证券股票程序化自动化交易系统行情系统包括新浪腾讯双数据核心，自动故障切换，为量化在数据获取方面极大地减少工作量，更加专注于策略和模型的研究与实现。



python原项目地址:https://github.com/mpquant/Ashare

感谢原项目的Ashare作者

## 安装

使用 npm 安装 SDK：

```bash
npm install ashare-sdk-ts
```

## 使用方法

### 获取股票行情数据

```typescript
import { get_price } from 'ashare-sdk-ts';

async function fetchDataExamples() {
  try {
    // 示例 1: 获取上证指数日线数据 (使用默认参数: count=10, frequency='1d')
    const shIndexDefault = await get_price('sh000001');
    console.log('上证指数日线 (默认):', shIndexDefault.slice(0, 3)); // 打印前3条

    // 示例 2: 获取上证指数日线数据 (指定 count=5)
    const shIndex5 = await get_price('sh000001', '', 5);
    console.log('上证指数日线 (count=5):', shIndex5);

    // 示例 3: 获取上证指数历史日线数据 (指定 end_date 和 count)
    // 注意: end_date 仅对 '1d', '1w', '1M' 有效
    const shIndexHist = await get_price('000001.XSHG', '2023-12-31', 5, '1d');
    console.log('上证指数历史日线 (end_date="2023-12-31", count=5):', shIndexHist);

    // 示例 4: 获取贵州茅台15分钟线数据 (指定 count=5, frequency='15m')
    const kweiChow15m = await get_price('sh600519', '', 5, '15m');
    console.log('贵州茅台15分钟线 (count=5):', kweiChow15m.slice(0, 3)); // 打印前3条

  } catch (error) {
    console.error('获取数据时发生错误:', error);
  }
}

fetchDataExamples();
```

### 计算技术指标

```typescript
import { get_price, MA, BOLL, StockData } from 'ashare-sdk-ts'; // 导入所需函数和类型

async function calculateIndicators() {
  try {
    // 1. 获取足够的数据用于计算指标 (例如，获取最近120条日线数据)
    const stockHistory: StockData[] = await get_price('000001.XSHG', '', 120, '1d');

    if (stockHistory.length > 0) {
      // 2. 从获取的数据中提取所需序列 (例如，收盘价)
      const closePrices = stockHistory.map(item => item.close);

      // 3. 使用提取的序列计算指标
      // 计算 MA5 和 MA10
      const ma5 = MA(closePrices, 5);
      const ma10 = MA(closePrices, 10);
      console.log('MA5 (最后5条):', ma5.slice(-5).map(v => v?.toFixed(2)));
      console.log('MA10 (最后5条):', ma10.slice(-5).map(v => v?.toFixed(2)));

      // 计算 BOLL 指标 (默认 N=20)
      const [bollUp, bollMid, bollLower] = BOLL(closePrices);
      console.log('BOLL Upper (最后5条):', bollUp.slice(-5).map(v => v?.toFixed(2)));
      console.log('BOLL Mid (最后5条):', bollMid.slice(-5).map(v => v?.toFixed(2)));
      console.log('BOLL Lower (最后5条):', bollLower.slice(-5).map(v => v?.toFixed(2)));

      // 其他指标计算类似...
      // const kdjResult = KDJ(stockHistory.map(i=>i.close), stockHistory.map(i=>i.high), stockHistory.map(i=>i.low));
      // console.log('KDJ K (最后5条):', kdjResult.K.slice(-5).map(v => v?.toFixed(2)));

    } else {
      console.log('未能获取足够的历史数据来计算指标。');
    }
  } catch (error) {
    console.error('计算指标时发生错误:', error);
  }
}

calculateIndicators();
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