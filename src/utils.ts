// MyTT 核心工具函数

/**
 * 四舍五入取指定位数小数
 * @param N 数值
 * @param D 小数位数，默认为 3
 * @returns 四舍五入后的数值
 */
export function RD(N: number, D: number = 3): number {
  return parseFloat(N.toFixed(D));
}

/**
 * 返回序列倒数第N个值
 * @param S 序列
 * @param N 倒数第N个，默认为 1 (最后一个)
 * @returns 序列倒数第N个值
 */
export function RET(S: number[], N: number = 1): number | undefined {
  if (N > S.length || N <= 0) {
    return undefined; // 或者抛出错误，取决于期望的行为
  }
  return S[S.length - N];
}

/**
 * 返回序列中每个数值的绝对值
 * @param S 序列
 * @returns 绝对值序列
 */
export function ABS(S: number[]): number[] {
  return S.map(s => Math.abs(s));
}

/**
 * 返回两个序列对应位置的最大值
 * @param S1 序列1
 * @param S2 序列2
 * @returns 对应位置的最大值序列
 */
export function MAX(S1: number[], S2: number[]): number[] {
  if (S1.length !== S2.length) {
    throw new Error("序列长度不一致");
  }
  return S1.map((value, index) => {
    const val1 = value;
    const val2 = S2[index];
    if (isNaN(val1)) return val2;
    if (isNaN(val2)) return val1;
    return Math.max(val1, val2);
  });
}

/**
 * 返回两个序列对应位置的最小值
 * @param S1 序列1
 * @param S2 序列2
 * @returns 对应位置的最小值序列
 */
export function MIN(S1: number[], S2: number[]): number[] {
  if (S1.length !== S2.length) {
    throw new Error("序列长度不一致");
  }
  return S1.map((value, index) => {
    const val1 = value;
    const val2 = S2[index];
    if (isNaN(val1)) return val2;
    if (isNaN(val2)) return val1;
    return Math.min(val1, val2);
  });
}

/**
 * 求序列的N日平均值，返回序列
 * @param S 序列
 * @param N 周期数
 * @returns N日平均值序列
 */
export function MA(S: number[], N: number): number[] {
  if (N <= 0 || N > S.length) {
    // 或者抛出错误
    return Array(S.length).fill(NaN);
  }
  const result: number[] = [];
  let currentSum = 0;
  for (let i = 0; i < S.length; i++) {
    currentSum += S[i];
    if (i >= N) {
      currentSum -= S[i - N];
    }
    if (i < N - 1) {
      result.push(NaN); // 或其他表示无效值的标记
    } else {
      result.push(currentSum / N);
    }
  }
  return result;
}

/**
 * 对序列整体下移动N,返回序列(shift后会产生NAN)
 * @param S 序列
 * @param N 移动位数，默认为 1
 * @returns 移动后的序列
 */
export function REF(S: number[], N: number = 1): number[] {
  if (N < 0) {
    throw new Error("移动位数不能为负数");
  }
  if (N > S.length) {
    return Array(S.length).fill(NaN);
  }
  if (N === S.length) {
    const result = Array(S.length - 1).fill(NaN);
    return result.concat(S[0]);
  }
  const result = Array(N).fill(NaN);
  return result.concat(S.slice(0, S.length - N));
}

/**
 * 前一个值减后一个值,前面会产生nan
 * @param S 序列
 * @param N 间隔，默认为 1
 * @returns 差值序列
 */
export function DIFF(S: number[], N: number = 1): number[] {
  if (N <= 0 || N >= S.length) {
    // 或者抛出错误
    return Array(S.length).fill(NaN);
  }
  const result: number[] = [];
  for (let i = 0; i < S.length; i++) {
    if (i < N) {
      result.push(NaN);
    } else {
      result.push(S[i] - S[i - N]);
    }
  }
  return result;
}

/**
 * 求序列的N日标准差，返回序列
 * @param S 序列
 * @param N 周期数
 * @returns N日标准差序列
 */
export function STD(S: number[], N: number): number[] {
  if (N <= 1 || N > S.length) {
    // 或者抛出错误
    return Array(S.length).fill(NaN);
  }
  const result: number[] = [];
  for (let i = 0; i < S.length; i++) {
    if (i < N - 1) {
      result.push(NaN);
    } else {
      const slice = S.slice(i - N + 1, i + 1);
      const mean = slice.reduce((a, b) => a + b, 0) / N;
      const variance = slice.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / N; // ddof=0
      result.push(Math.sqrt(variance));
    }
  }
  return result;
}

/**
 * 序列布尔判断 res=S_TRUE if S_BOOL==True else S_FALSE
 * @param S_BOOL 布尔序列
 * @param S_TRUE 结果序列（True时）
 * @param S_FALSE 结果序列（False时）
 * @returns 判断结果序列
 */
export function IF(S_BOOL: boolean[], S_TRUE: any[], S_FALSE: any[]): any[] {
  if (S_BOOL.length !== S_TRUE.length || S_BOOL.length !== S_FALSE.length) {
    throw new Error("序列长度不一致");
  }
  return S_BOOL.map((condition, index) => condition ? S_TRUE[index] : S_FALSE[index]);
}

/**
 * 对序列求N天累计和，返回序列
 * @param S 序列
 * @param N 周期数
 * @returns N天累计和序列
 */
export function SUM(S: number[], N: number): number[] {
  if (N <= 0 || N > S.length) {
    // 或者抛出错误
    return Array(S.length).fill(NaN);
  }
  const result: number[] = [];
  let currentSum = 0;
  for (let i = 0; i < S.length; i++) {
    currentSum += S[i];
    if (i >= N) {
      currentSum -= S[i - N];
    }
    if (i < N - 1) {
      result.push(NaN); // 或其他表示无效值的标记
    } else {
      result.push(currentSum);
    }
  }
  return result;
}

/**
 * 最近N天最高价
 * @param S 序列
 * @param N 周期数
 * @returns N天最高价序列
 */
export function HHV(S: number[], N: number): number[] {
  if (N <= 0 || N > S.length) {
    // 或者抛出错误
    return Array(S.length).fill(NaN);
  }
  const result: number[] = [];
  for (let i = 0; i < S.length; i++) {
    if (i < N - 1) {
      result.push(NaN); // 或其他表示无效值的标记
    } else {
      const slice = S.slice(i - N + 1, i + 1);
      result.push(Math.max(...slice));
    }
  }
  return result;
}

/**
 * 最近N天最低价
 * @param S 序列
 * @param N 周期数
 * @returns N天最低价序列
 */
export function LLV(S: number[], N: number): number[] {
  if (N <= 0 || N > S.length) {
    // 或者抛出错误
    return Array(S.length).fill(NaN);
  }
  const result: number[] = [];
  for (let i = 0; i < S.length; i++) {
    if (i < N - 1) {
      result.push(NaN); // 或其他表示无效值的标记
    } else {
      const slice = S.slice(i - N + 1, i + 1);
      result.push(Math.min(...slice));
    }
  }
  return result;
}

/**
 * 指数移动平均
 * @param S 序列
 * @param N 周期数
 * @returns 指数移动平均序列
 */
export function EMA(S: number[], N: number): number[] {
  if (N <= 0 || N > S.length) {
    // 或者抛出错误
    return [];
  }
  const result: number[] = [];
  const alpha = 2 / (N + 1);
  let ema = NaN;

  for (let i = 0; i < S.length; i++) {
    if (isNaN(ema)) {
      ema = S[i];
    } else {
      ema = alpha * S[i] + (1 - alpha) * ema;
    }
    result.push(ema);
  }
  return result;
}

/**
 * 中国式的SMA
 * @param S 序列
 * @param N 周期数
 * @param M 权重，默认为 1
 * @returns SMA序列
 */
export function SMA(S: number[], N: number, M: number = 1): number[] {
  if (N <= 0 || M <= 0 || N > S.length) {
    // 或者抛出错误
    return [];
  }
  const result: number[] = [];
  let sma = NaN;

  for (let i = 0; i < S.length; i++) {
    if (i < N - 1) {
      result.push(NaN);
    } else if (i === N - 1) {
      sma = S.slice(0, N).reduce((a, b) => a + b, 0) / N;
      result.push(sma);
    } else {
      sma = (M * S[i] + (N - M) * sma) / N;
      result.push(sma);
    }
  }
  return result;
}

/**
 * 平均绝对偏差 (序列与其平均值的绝对差的平均值)
 * @param S 序列
 * @param N 周期数
 * @returns 平均绝对偏差序列
 */
export function AVEDEV(S: number[], N: number): number[] {
  if (N <= 0 || N > S.length) {
    // 或者抛出错误
    return [];
  }
  const result: number[] = [];
  for (let i = 0; i < S.length; i++) {
    if (i < N - 1) {
      result.push(NaN);
    } else {
      const slice = S.slice(i - N + 1, i + 1);
      const mean = slice.reduce((a, b) => a + b, 0) / N;
      const avedev = slice.reduce((a, b) => a + Math.abs(b - mean), 0) / N;
      result.push(avedev);
    }
  }
  return result;
}

/**
 * 返回S序列N周期回线性回归斜率
 * @param S 序列
 * @param N 周期数
 * @param RS 是否返回整个直线序列，默认为 false
 * @returns 斜率或包含斜率和直线序列的元组
 */
export function SLOPE(S: number[], N: number, RS: boolean = false): number | number[] {
  if (N <= 1 || N > S.length) {
    // 或者抛出错误
    return NaN;
  }
  const slice = S.slice(S.length - N);
  const x = Array.from({ length: N }, (_, i) => i);
  const y = slice;

  // 计算斜率和截距 (使用最小二乘法)
  const n = N;
  const sumX = x.reduce((a, b) => a + b, 0);
  const sumY = y.reduce((a, b) => a + b, 0);
  const sumXY = x.reduce((a, b, i) => a + b * y[i], 0);
  const sumXX = x.reduce((a, b) => a + b * b, 0);

  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  if (RS) {
    const line = x.map(val => slope * val + intercept);
    return line; // 返回直线序列
  }

  return slope; // 返回斜率
}

/**
 * 返回S序列N周期回线性回归后的预测值
 * @param S 序列
 * @param N 周期数
 * @returns 预测值
 */
export function FORCAST(S: number[], N: number): number {
  if (N <= 1 || N > S.length) {
    // 或者抛出错误
    return NaN;
  }
  const slice = S.slice(S.length - N);
  const x = Array.from({ length: N }, (_, i) => i);
  const y = slice;

  // 计算斜率和截距 (使用最小二乘法)
  const n = N;
  const sumX = x.reduce((a, b) => a + b, 0);
  const sumY = y.reduce((a, b) => a + b, 0);
  const sumXY = x.reduce((a, b, i) => a + b * y[i], 0);
  const sumXX = x.reduce((a, b) => a + b * b, 0);

  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  // 预测下一个值 (x值为 N)
  return slope * N + intercept;
}

/**
 * 判断穿越 CROSS(MA(C,5),MA(C,10))
 * @param S1 序列1
 * @param S2 序列2
 * @returns 穿越布尔序列
 */
export function CROSS(S1: number[], S2: number[]): boolean[] {
  if (S1.length !== S2.length || S1.length < 2) {
    // 或者抛出错误
    return [];
  }
  const result: boolean[] = [];
  for (let i = 1; i < S1.length; i++) {
    // 上穿：昨天S1 <= S2 且 今天S1 > S2
    // 下穿：昨天S1 >= S2 且 今天S1 < S2
    const crossUp = S1[i] > S2[i] && S1[i - 1] <= S2[i - 1];
    const crossDown = S1[i] < S2[i] && S1[i - 1] >= S2[i - 1];
    result.push(crossUp || crossDown);
  }
  return [false].concat(result); // 第一个值无法判断，设为 false
}

/**
 * 最近N天满足S_BOO的天数 True的天数
 * @param S_BOOL 布尔序列
 * @param N 周期数
 * @returns 满足条件的天数序列
 */
export function COUNT(S_BOOL: boolean[], N: number): number[] {
  if (N <= 0 || N > S_BOOL.length) {
    // 或者抛出错误
    return [];
  }
  const result: number[] = [];
  let currentCount = 0;
  for (let i = 0; i < S_BOOL.length; i++) {
    if (S_BOOL[i]) {
      currentCount++;
    }
    if (i >= N) {
      if (S_BOOL[i - N]) {
        currentCount--;
      }
    }
    if (i < N - 1) {
      result.push(NaN); // 或其他表示无效值的标记
    } else {
      result.push(currentCount);
    }
  }
  return result;
}

/**
 * 最近N天是否都是True
 * @param S_BOOL 布尔序列
 * @param N 周期数
 * @returns 是否都是True的布尔序列
 */
export function EVERY(S_BOOL: boolean[], N: number): boolean[] {
  if (N <= 0 || N > S_BOOL.length) {
    // 或者抛出错误
    return [];
  }
  const result: boolean[] = [];
  for (let i = 0; i < S_BOOL.length; i++) {
    if (i < N - 1) {
      result.push(false); // 或其他表示无效值的标记
    } else {
      const slice = S_BOOL.slice(i - N + 1, i + 1);
      result.push(slice.every(Boolean));
    }
  }
  return result;
}

/**
 * 从前A日到前B日一直满足S_BOOL条件
 * @param S_BOOL 布尔序列
 * @param A 从前A日
 * @param B 到前B日
 * @returns 是否一直满足条件的布尔值
 */
export function LAST(S_BOOL: boolean[], A: number, B: number): boolean {
  if (A < B) {
    A = B; // 要求A >= B
  }
  if (A > S_BOOL.length || B < 0) {
    // 或者抛出错误
    return false;
  }
  const slice = S_BOOL.slice(S_BOOL.length - A, S_BOOL.length - B);
  return slice.every(Boolean);
}

/**
 * n日内是否存在一天大于3000点
 * @param S_BOOL 布尔序列
 * @param N 周期数，默认为 5
 * @returns 是否存在的布尔序列
 */
export function EXIST(S_BOOL: boolean[], N: number = 5): boolean[] {
  if (N <= 0 || N > S_BOOL.length) {
    // 或者抛出错误
    return [];
  }
  const result: boolean[] = [];
  for (let i = 0; i < S_BOOL.length; i++) {
    if (i < N - 1) {
      result.push(false); // 或其他表示无效值的标记
    } else {
      const slice = S_BOOL.slice(i - N + 1, i + 1);
      result.push(slice.some(Boolean));
    }
  }
  return result;
}

/**
 * 上一次条件成立到当前的周期
 * @param S_BOOL 布尔序列
 * @returns 周期数
 */
export function BARSLAST(S_BOOL: boolean[]): number {
  for (let i = S_BOOL.length - 1; i >= 0; i--) {
    if (S_BOOL[i]) {
      return S_BOOL.length - 1 - i;
    }
  }
  return -1; // 如果从未成立
}