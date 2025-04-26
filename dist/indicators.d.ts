/**
 * MACD指标
 * @param CLOSE 收盘价序列
 * @param SHORT 短周期，默认为 12
 * @param LONG 长周期，默认为 26
 * @param M 平滑周期，默认为 9
 * @returns [DIF, DEA, MACD] 序列
 */
export declare function MACD(CLOSE: number[], SHORT?: number, LONG?: number, M?: number): [number[], number[], number[]];
/**
 * KDJ指标
 * @param CLOSE 收盘价序列
 * @param HIGH 最高价序列
 * @param LOW 最低价序列
 * @param N 周期数，默认为 9
 * @param M1 K值平滑周期，默认为 3
 * @param M2 D值平滑周期，默认为 3
 * @returns [K, D, J] 序列
 */
export declare function KDJ(CLOSE: number[], HIGH: number[], LOW: number[], N?: number, M1?: number, M2?: number): [number[], number[], number[]];
/**
 * RSI指标
 * @param CLOSE 收盘价序列
 * @param N 周期数，默认为 24
 * @returns RSI序列
 */
export declare function RSI(CLOSE: number[], N?: number): number[];
/**
 * W&R 威廉指标
 * @param CLOSE 收盘价序列
 * @param HIGH 最高价序列
 * @param LOW 最低价序列
 * @param N 周期数，默认为 10
 * @param N1 周期数1，默认为 6
 * @returns [WR, WR1] 序列
 */
export declare function WR(CLOSE: number[], HIGH: number[], LOW: number[], N?: number, N1?: number): [number[], number[]];
/**
 * BIAS乖离率
 * @param CLOSE 收盘价序列
 * @param L1 周期1，默认为 6
 * @param L2 周期2，默认为 12
 * @param L3 周期3，默认为 24
 * @returns [BIAS1, BIAS2, BIAS3] 序列
 */
export declare function BIAS(CLOSE: number[], L1?: number, L2?: number, L3?: number): [number[], number[], number[]];
/**
 * BOLL指标，布林带
 * @param CLOSE 收盘价序列
 * @param N 周期数，默认为 20
 * @param P 倍数，默认为 2
 * @returns [UPPER, MID, LOWER] 序列
 */
export declare function BOLL(CLOSE: number[], N?: number, P?: number): [number[], number[], number[]];
/**
 * PSY指标
 * @param CLOSE 收盘价序列
 * @param N 周期数，默认为 12
 * @param M 平滑周期，默认为 6
 * @returns [PSY, PSYMA] 序列
 */
export declare function PSY(CLOSE: number[], N?: number, M?: number): [number[], number[]];
/**
 * CCI指标
 * @param CLOSE 收盘价序列
 * @param HIGH 最高价序列
 * @param LOW 最低价序列
 * @param N 周期数，默认为 14
 * @returns CCI序列
 */
export declare function CCI(CLOSE: number[], HIGH: number[], LOW: number[], N?: number): number[];
/**
 * 真实波动N日平均值
 * @param CLOSE 收盘价序列
 * @param HIGH 最高价序列
 * @param LOW 最低价序列
 * @param N 周期数，默认为 20
 * @returns ATR序列
 */
export declare function ATR(CLOSE: number[], HIGH: number[], LOW: number[], N?: number): number[];
/**
 * BBI多空指标
 * @param CLOSE 收盘价序列
 * @param M1 周期1，默认为 3
 * @param M2 周期2，默认为 6
 * @param M3 周期3，默认为 12
 * @param M4 周期4，默认为 20
 * @returns BBI序列
 */
export declare function BBI(CLOSE: number[], M1?: number, M2?: number, M3?: number, M4?: number): number[];
/**
 * 动向指标：结果和同花顺，通达信完全一致
 * @param CLOSE 收盘价序列
 * @param HIGH 最高价序列
 * @param LOW 最低价序列
 * @param M1 周期1，默认为 14
 * @param M2 周期2，默认为 6
 * @returns [PDI, MDI, ADX, ADXR] 序列
 */
export declare function DMI(CLOSE: number[], HIGH: number[], LOW: number[], M1?: number, M2?: number): [number[], number[], number[], number[]];
/**
 * 唐安奇通道交易指标
 * @param HIGH 最高价序列
 * @param LOW 最低价序列
 * @param N 周期数
 * @returns [UP, MID, DOWN] 序列
 */
export declare function TAQ(HIGH: number[], LOW: number[], N: number): [number[], number[], number[]];
/**
 * 三重指数平滑平均线
 * @param CLOSE 收盘价序列
 * @param M1 周期1，默认为 12
 * @param M2 周期2，默认为 20
 * @returns [TRIX, TRMA] 序列
 */
export declare function TRIX(CLOSE: number[], M1?: number, M2?: number): [number[], number[]];
/**
 * VR容量比率
 * @param CLOSE 收盘价序列
 * @param VOL 成交量序列
 * @param M1 周期数，默认为 26
 * @returns VR序列
 */
export declare function VR(CLOSE: number[], VOL: number[], M1?: number): number[];
/**
 * 简易波动指标
 * @param HIGH 最高价序列
 * @param LOW 最低价序列
 * @param VOL 成交量序列
 * @param N 周期数，默认为 14
 * @param M 平滑周期，默认为 9
 * @returns [EMV, MAEMV] 序列
 */
export declare function EMV(HIGH: number[], LOW: number[], VOL: number[], N?: number, M?: number): [number[], number[]];
/**
 * 区间震荡线
 * @param CLOSE 收盘价序列
 * @param M1 周期1，默认为 20
 * @param M2 周期2，默认为 10
 * @param M3 周期3，默认为 6
 * @returns [DPO, MADPO] 序列
 */
export declare function DPO(CLOSE: number[], M1?: number, M2?: number, M3?: number): [number[], number[]];
/**
 * BRAR-ARBR 情绪指标
 * @param OPEN 开盘价序列
 * @param CLOSE 收盘价序列
 * @param HIGH 最高价序列
 * @param LOW 最低价序列
 * @param M1 周期数，默认为 26
 * @returns [AR, BR] 序列
 */
export declare function BRAR(OPEN: number[], CLOSE: number[], HIGH: number[], LOW: number[], M1?: number): [number[], number[]];
/**
 * 平行线差指标
 * @param CLOSE 收盘价序列
 * @param N1 周期1，默认为 10
 * @param N2 周期2，默认为 50
 * @param M 周期3，默认为 10
 * @returns [DIF, DIFMA] 序列
 */
export declare function DMA(CLOSE: number[], N1?: number, N2?: number, M?: number): [number[], number[]];
/**
 * 动量指标
 * @param CLOSE 收盘价序列
 * @param N 周期数，默认为 12
 * @param M 平滑周期，默认为 6
 * @returns [MTM, MTMMA] 序列
 */
export declare function MTM(CLOSE: number[], N?: number, M?: number): [number[], number[]];
/**
 * 变动率指标
 * @param CLOSE 收盘价序列
 * @param N 周期数，默认为 12
 * @param M 平滑周期，默认为 6
 * @returns [ROC, MAROC] 序列
 */
export declare function ROC(CLOSE: number[], N?: number, M?: number): [number[], number[]];
