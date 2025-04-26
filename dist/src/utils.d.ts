/**
 * 四舍五入取指定位数小数
 * @param N 数值
 * @param D 小数位数，默认为 3
 * @returns 四舍五入后的数值
 */
export declare function RD(N: number, D?: number): number;
/**
 * 返回序列倒数第N个值
 * @param S 序列
 * @param N 倒数第N个，默认为 1 (最后一个)
 * @returns 序列倒数第N个值
 */
export declare function RET(S: number[], N?: number): number | undefined;
/**
 * 返回序列中每个数值的绝对值
 * @param S 序列
 * @returns 绝对值序列
 */
export declare function ABS(S: number[]): number[];
/**
 * 返回两个序列对应位置的最大值
 * @param S1 序列1
 * @param S2 序列2
 * @returns 对应位置的最大值序列
 */
export declare function MAX(S1: number[], S2: number[]): number[];
/**
 * 返回两个序列对应位置的最小值
 * @param S1 序列1
 * @param S2 序列2
 * @returns 对应位置的最小值序列
 */
export declare function MIN(S1: number[], S2: number[]): number[];
/**
 * 求序列的N日平均值，返回序列
 * @param S 序列
 * @param N 周期数
 * @returns N日平均值序列
 */
export declare function MA(S: number[], N: number): number[];
/**
 * 对序列整体下移动N,返回序列(shift后会产生NAN)
 * @param S 序列
 * @param N 移动位数，默认为 1
 * @returns 移动后的序列
 */
export declare function REF(S: number[], N?: number): number[];
/**
 * 前一个值减后一个值,前面会产生nan
 * @param S 序列
 * @param N 间隔，默认为 1
 * @returns 差值序列
 */
export declare function DIFF(S: number[], N?: number): number[];
/**
 * 求序列的N日标准差，返回序列
 * @param S 序列
 * @param N 周期数
 * @returns N日标准差序列
 */
export declare function STD(S: number[], N: number): number[];
/**
 * 序列布尔判断 res=S_TRUE if S_BOOL==True else S_FALSE
 * @param S_BOOL 布尔序列
 * @param S_TRUE 结果序列（True时）
 * @param S_FALSE 结果序列（False时）
 * @returns 判断结果序列
 */
export declare function IF(S_BOOL: boolean[], S_TRUE: any[], S_FALSE: any[]): any[];
/**
 * 对序列求N天累计和，返回序列
 * @param S 序列
 * @param N 周期数
 * @returns N天累计和序列
 */
export declare function SUM(S: number[], N: number): number[];
/**
 * 最近N天最高价
 * @param S 序列
 * @param N 周期数
 * @returns N天最高价序列
 */
export declare function HHV(S: number[], N: number): number[];
/**
 * 最近N天最低价
 * @param S 序列
 * @param N 周期数
 * @returns N天最低价序列
 */
export declare function LLV(S: number[], N: number): number[];
/**
 * 指数移动平均
 * @param S 序列
 * @param N 周期数
 * @returns 指数移动平均序列
 */
export declare function EMA(S: number[], N: number): number[];
/**
 * 中国式的SMA
 * @param S 序列
 * @param N 周期数
 * @param M 权重，默认为 1
 * @returns SMA序列
 */
export declare function SMA(S: number[], N: number, M?: number): number[];
/**
 * 平均绝对偏差 (序列与其平均值的绝对差的平均值)
 * @param S 序列
 * @param N 周期数
 * @returns 平均绝对偏差序列
 */
export declare function AVEDEV(S: number[], N: number): number[];
/**
 * 返回S序列N周期回线性回归斜率
 * @param S 序列
 * @param N 周期数
 * @param RS 是否返回整个直线序列，默认为 false
 * @returns 斜率或包含斜率和直线序列的元组
 */
export declare function SLOPE(S: number[], N: number, RS?: boolean): number | number[];
/**
 * 返回S序列N周期回线性回归后的预测值
 * @param S 序列
 * @param N 周期数
 * @returns 预测值
 */
export declare function FORCAST(S: number[], N: number): number;
/**
 * 判断穿越 CROSS(MA(C,5),MA(C,10))
 * @param S1 序列1
 * @param S2 序列2
 * @returns 穿越布尔序列
 */
export declare function CROSS(S1: number[], S2: number[]): boolean[];
/**
 * 最近N天满足S_BOO的天数 True的天数
 * @param S_BOOL 布尔序列
 * @param N 周期数
 * @returns 满足条件的天数序列
 */
export declare function COUNT(S_BOOL: boolean[], N: number): number[];
/**
 * 最近N天是否都是True
 * @param S_BOOL 布尔序列
 * @param N 周期数
 * @returns 是否都是True的布尔序列
 */
export declare function EVERY(S_BOOL: boolean[], N: number): boolean[];
/**
 * 从前A日到前B日一直满足S_BOOL条件
 * @param S_BOOL 布尔序列
 * @param A 从前A日
 * @param B 到前B日
 * @returns 是否一直满足条件的布尔值
 */
export declare function LAST(S_BOOL: boolean[], A: number, B: number): boolean;
/**
 * n日内是否存在一天大于3000点
 * @param S_BOOL 布尔序列
 * @param N 周期数，默认为 5
 * @returns 是否存在的布尔序列
 */
export declare function EXIST(S_BOOL: boolean[], N?: number): boolean[];
/**
 * 上一次条件成立到当前的周期
 * @param S_BOOL 布尔序列
 * @returns 周期数
 */
export declare function BARSLAST(S_BOOL: boolean[]): number;
