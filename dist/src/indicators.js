"use strict";
// MyTT 技术指标函数
Object.defineProperty(exports, "__esModule", { value: true });
exports.MACD = MACD;
exports.KDJ = KDJ;
exports.RSI = RSI;
exports.WR = WR;
exports.BIAS = BIAS;
exports.BOLL = BOLL;
exports.PSY = PSY;
exports.CCI = CCI;
exports.ATR = ATR;
exports.BBI = BBI;
exports.DMI = DMI;
exports.TAQ = TAQ;
exports.TRIX = TRIX;
exports.VR = VR;
exports.EMV = EMV;
exports.DPO = DPO;
exports.BRAR = BRAR;
exports.DMA = DMA;
exports.MTM = MTM;
exports.ROC = ROC;
const utils_1 = require("./utils"); // 确保 DIFF 被正确导入
/**
 * MACD指标
 * @param CLOSE 收盘价序列
 * @param SHORT 短周期，默认为 12
 * @param LONG 长周期，默认为 26
 * @param M 平滑周期，默认为 9
 * @returns [DIF, DEA, MACD] 序列
 */
function MACD(CLOSE, SHORT = 12, LONG = 26, M = 9) {
    const DIF = (0, utils_1.EMA)(CLOSE, SHORT).map((val, i) => val - (0, utils_1.EMA)(CLOSE, LONG)[i]);
    const DEA = (0, utils_1.EMA)(DIF, M);
    const MACD = DIF.map((val, i) => (val - DEA[i]) * 2);
    return [DIF, DEA, MACD];
}
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
function KDJ(CLOSE, HIGH, LOW, N = 9, M1 = 3, M2 = 3) {
    const LLV_N = (0, utils_1.LLV)(LOW, N);
    const HHV_N = (0, utils_1.HHV)(HIGH, N);
    const RSV = CLOSE.map((c, i) => {
        const l = LLV_N[i];
        const h = HHV_N[i];
        if (isNaN(l) || isNaN(h) || h === l)
            return NaN;
        return (c - l) / (h - l) * 100;
    });
    const K = (0, utils_1.EMA)(RSV, (M1 * 2 - 1));
    const D = (0, utils_1.EMA)(K, (M2 * 2 - 1));
    const J = K.map((k, i) => k * 3 - D[i] * 2);
    return [K, D, J];
}
/**
 * RSI指标
 * @param CLOSE 收盘价序列
 * @param N 周期数，默认为 24
 * @returns RSI序列
 */
function RSI(CLOSE, N = 24) {
    const DIF_CLOSE = (0, utils_1.DIFF)(CLOSE, 1);
    const SMA_MAX_DIF = (0, utils_1.SMA)((0, utils_1.MAX)(DIF_CLOSE.map((d) => isNaN(d) ? 0 : d), Array(DIF_CLOSE.length).fill(0)), N); // 添加类型注解
    const SMA_ABS_DIF = (0, utils_1.SMA)((0, utils_1.ABS)(DIF_CLOSE.map((d) => isNaN(d) ? 0 : d)), N); // 添加类型注解
    return SMA_MAX_DIF.map((up, i) => {
        const down = SMA_ABS_DIF[i];
        if (isNaN(up) || isNaN(down) || down === 0)
            return NaN;
        return (up / down) * 100;
    });
}
/**
 * W&R 威廉指标
 * @param CLOSE 收盘价序列
 * @param HIGH 最高价序列
 * @param LOW 最低价序列
 * @param N 周期数，默认为 10
 * @param N1 周期数1，默认为 6
 * @returns [WR, WR1] 序列
 */
function WR(CLOSE, HIGH, LOW, N = 10, N1 = 6) {
    const HHV_N = (0, utils_1.HHV)(HIGH, N);
    const LLV_N = (0, utils_1.LLV)(LOW, N);
    const WR = CLOSE.map((c, i) => {
        const h = HHV_N[i];
        const l = LLV_N[i];
        if (isNaN(h) || isNaN(l) || h === l)
            return NaN;
        return (h - c) / (h - l) * 100;
    });
    const HHV_N1 = (0, utils_1.HHV)(HIGH, N1);
    const LLV_N1 = (0, utils_1.LLV)(LOW, N1);
    const WR1 = CLOSE.map((c, i) => {
        const h = HHV_N1[i];
        const l = LLV_N1[i];
        if (isNaN(h) || isNaN(l) || h === l)
            return NaN;
        return (h - c) / (h - l) * 100;
    });
    return [WR, WR1];
}
/**
 * BIAS乖离率
 * @param CLOSE 收盘价序列
 * @param L1 周期1，默认为 6
 * @param L2 周期2，默认为 12
 * @param L3 周期3，默认为 24
 * @returns [BIAS1, BIAS2, BIAS3] 序列
 */
function BIAS(CLOSE, L1 = 6, L2 = 12, L3 = 24) {
    const MA_L1 = (0, utils_1.MA)(CLOSE, L1);
    const MA_L2 = (0, utils_1.MA)(CLOSE, L2);
    const MA_L3 = (0, utils_1.MA)(CLOSE, L3);
    const BIAS1 = CLOSE.map((c, i) => {
        const ma = MA_L1[i];
        if (isNaN(ma) || ma === 0)
            return NaN;
        return (c - ma) / ma * 100;
    });
    const BIAS2 = CLOSE.map((c, i) => {
        const ma = MA_L2[i];
        if (isNaN(ma) || ma === 0)
            return NaN;
        return (c - ma) / ma * 100;
    });
    const BIAS3 = CLOSE.map((c, i) => {
        const ma = MA_L3[i];
        if (isNaN(ma) || ma === 0)
            return NaN;
        return (c - ma) / ma * 100;
    });
    return [BIAS1, BIAS2, BIAS3];
}
/**
 * BOLL指标，布林带
 * @param CLOSE 收盘价序列
 * @param N 周期数，默认为 20
 * @param P 倍数，默认为 2
 * @returns [UPPER, MID, LOWER] 序列
 */
function BOLL(CLOSE, N = 20, P = 2) {
    const MID = (0, utils_1.MA)(CLOSE, N);
    const STD_N = (0, utils_1.STD)(CLOSE, N);
    const UPPER = MID.map((mid, i) => {
        const std = STD_N[i];
        if (isNaN(mid) || isNaN(std))
            return NaN;
        return mid + std * P;
    });
    const LOWER = MID.map((mid, i) => {
        const std = STD_N[i];
        if (isNaN(mid) || isNaN(std))
            return NaN;
        return mid - std * P;
    });
    return [UPPER, MID, LOWER];
}
/**
 * PSY指标
 * @param CLOSE 收盘价序列
 * @param N 周期数，默认为 12
 * @param M 平滑周期，默认为 6
 * @returns [PSY, PSYMA] 序列
 */
function PSY(CLOSE, N = 12, M = 6) {
    const CLOSE_REF1 = (0, utils_1.REF)(CLOSE, 1);
    const PSY_COUNT = (0, utils_1.COUNT)(CLOSE.map((c, i) => c > CLOSE_REF1[i]), N);
    const PSY = PSY_COUNT.map(count => isNaN(count) ? NaN : count / N * 100);
    const PSYMA = (0, utils_1.MA)(PSY, M);
    return [PSY, PSYMA];
}
/**
 * CCI指标
 * @param CLOSE 收盘价序列
 * @param HIGH 最高价序列
 * @param LOW 最低价序列
 * @param N 周期数，默认为 14
 * @returns CCI序列
 */
function CCI(CLOSE, HIGH, LOW, N = 14) {
    const TP = CLOSE.map((c, i) => (c + HIGH[i] + LOW[i]) / 3);
    const MA_TP = (0, utils_1.MA)(TP, N);
    const AVEDEV_TP = (0, utils_1.AVEDEV)(TP, N);
    return TP.map((tp, i) => {
        const ma = MA_TP[i];
        const avedev = AVEDEV_TP[i];
        if (isNaN(tp) || isNaN(ma) || isNaN(avedev) || avedev === 0)
            return NaN;
        return (tp - ma) / (0.015 * avedev);
    });
}
/**
 * 真实波动N日平均值
 * @param CLOSE 收盘价序列
 * @param HIGH 最高价序列
 * @param LOW 最低价序列
 * @param N 周期数，默认为 20
 * @returns ATR序列
 */
function ATR(CLOSE, HIGH, LOW, N = 20) {
    const REF_CLOSE_1 = (0, utils_1.REF)(CLOSE, 1);
    const TR = HIGH.map((h, i) => {
        const l = LOW[i];
        const ref_c = REF_CLOSE_1[i];
        if (isNaN(h) || isNaN(l) || isNaN(ref_c))
            return NaN;
        return Math.max(h - l, Math.abs(ref_c - h), Math.abs(ref_c - l));
    });
    return (0, utils_1.MA)(TR, N);
}
/**
 * BBI多空指标
 * @param CLOSE 收盘价序列
 * @param M1 周期1，默认为 3
 * @param M2 周期2，默认为 6
 * @param M3 周期3，默认为 12
 * @param M4 周期4，默认为 20
 * @returns BBI序列
 */
function BBI(CLOSE, M1 = 3, M2 = 6, M3 = 12, M4 = 20) {
    const MA_M1 = (0, utils_1.MA)(CLOSE, M1);
    const MA_M2 = (0, utils_1.MA)(CLOSE, M2);
    const MA_M3 = (0, utils_1.MA)(CLOSE, M3);
    const MA_M4 = (0, utils_1.MA)(CLOSE, M4);
    return MA_M1.map((ma1, i) => {
        const ma2 = MA_M2[i];
        const ma3 = MA_M3[i];
        const ma4 = MA_M4[i];
        if (isNaN(ma1) || isNaN(ma2) || isNaN(ma3) || isNaN(ma4))
            return NaN;
        return (ma1 + ma2 + ma3 + ma4) / 4;
    });
}
/**
 * 动向指标：结果和同花顺，通达信完全一致
 * @param CLOSE 收盘价序列
 * @param HIGH 最高价序列
 * @param LOW 最低价序列
 * @param M1 周期1，默认为 14
 * @param M2 周期2，默认为 6
 * @returns [PDI, MDI, ADX, ADXR] 序列
 */
function DMI(CLOSE, HIGH, LOW, M1 = 14, M2 = 6) {
    const REF_CLOSE_1 = (0, utils_1.REF)(CLOSE, 1);
    const REF_HIGH_1 = (0, utils_1.REF)(HIGH, 1);
    const REF_LOW_1 = (0, utils_1.REF)(LOW, 1);
    const TR = (0, utils_1.SUM)(HIGH.map((h, i) => {
        const l = LOW[i];
        const ref_c = REF_CLOSE_1[i];
        if (isNaN(h) || isNaN(l) || isNaN(ref_c))
            return NaN;
        return Math.max(h - l, Math.abs(h - ref_c), Math.abs(l - ref_c));
    }), M1);
    const HD = HIGH.map((h, i) => h - REF_HIGH_1[i]);
    const LD = REF_LOW_1.map((ref_l, i) => ref_l - LOW[i]);
    const DMP = (0, utils_1.SUM)((0, utils_1.IF)(HD.map((hd, i) => hd > 0 && hd > LD[i]), HD, Array(HD.length).fill(0)), M1); // 添加类型注解
    const DMM = (0, utils_1.SUM)((0, utils_1.IF)(LD.map((ld, i) => ld > 0 && ld > HD[i]), LD, Array(LD.length).fill(0)), M1); // 添加类型注解
    const PDI = DMP.map((dmp, i) => {
        const tr = TR[i];
        if (isNaN(dmp) || isNaN(tr) || tr === 0)
            return NaN;
        return dmp * 100 / tr;
    });
    const MDI = DMM.map((dmm, i) => {
        const tr = TR[i];
        if (isNaN(dmm) || isNaN(tr) || tr === 0)
            return NaN;
        return dmm * 100 / tr;
    });
    const ADX_RAW = (0, utils_1.ABS)(PDI.map((pdi, i) => pdi - MDI[i])).map((val, i) => {
        const sum_pdi_mdi = PDI[i] + MDI[i];
        if (isNaN(val) || isNaN(sum_pdi_mdi) || sum_pdi_mdi === 0)
            return NaN;
        return val / sum_pdi_mdi * 100;
    });
    const ADX = (0, utils_1.MA)(ADX_RAW, M2); // 对序列进行 MA
    const REF_ADX_M2 = (0, utils_1.REF)(ADX, M2);
    const ADXR = ADX.map((adx, i) => {
        const ref_adx = REF_ADX_M2[i];
        if (isNaN(adx) || isNaN(ref_adx))
            return NaN;
        return (adx + ref_adx) / 2;
    });
    return [PDI, MDI, ADX, ADXR];
}
/**
 * 唐安奇通道交易指标
 * @param HIGH 最高价序列
 * @param LOW 最低价序列
 * @param N 周期数
 * @returns [UP, MID, DOWN] 序列
 */
function TAQ(HIGH, LOW, N) {
    const UP = (0, utils_1.HHV)(HIGH, N);
    const DOWN = (0, utils_1.LLV)(LOW, N);
    const MID = UP.map((up, i) => {
        const down = DOWN[i];
        if (isNaN(up) || isNaN(down))
            return NaN;
        return (up + down) / 2;
    });
    return [UP, MID, DOWN];
}
/**
 * 三重指数平滑平均线
 * @param CLOSE 收盘价序列
 * @param M1 周期1，默认为 12
 * @param M2 周期2，默认为 20
 * @returns [TRIX, TRMA] 序列
 */
function TRIX(CLOSE, M1 = 12, M2 = 20) {
    const TR = (0, utils_1.EMA)((0, utils_1.EMA)((0, utils_1.EMA)(CLOSE, M1), M1), M1);
    const REF_TR_1 = (0, utils_1.REF)(TR, 1);
    const TRIX = TR.map((tr, i) => {
        const ref_tr = REF_TR_1[i];
        if (isNaN(tr) || isNaN(ref_tr) || ref_tr === 0)
            return NaN;
        return (tr - ref_tr) / ref_tr * 100;
    });
    const TRMA = (0, utils_1.MA)(TRIX, M2);
    return [TRIX, TRMA];
}
/**
 * VR容量比率
 * @param CLOSE 收盘价序列
 * @param VOL 成交量序列
 * @param M1 周期数，默认为 26
 * @returns VR序列
 */
function VR(CLOSE, VOL, M1 = 26) {
    const LC = (0, utils_1.REF)(CLOSE, 1);
    const SUM_UP = (0, utils_1.SUM)((0, utils_1.IF)(CLOSE.map((c, i) => c > LC[i]), VOL, Array(VOL.length).fill(0)), M1);
    const SUM_DOWN = (0, utils_1.SUM)((0, utils_1.IF)(CLOSE.map((c, i) => c <= LC[i]), VOL, Array(VOL.length).fill(0)), M1);
    return SUM_UP.map((up, i) => {
        const down = SUM_DOWN[i];
        if (isNaN(up) || isNaN(down) || down === 0)
            return NaN;
        return up / down * 100;
    });
}
/**
 * 简易波动指标
 * @param HIGH 最高价序列
 * @param LOW 最低价序列
 * @param VOL 成交量序列
 * @param N 周期数，默认为 14
 * @param M 平滑周期，默认为 9
 * @returns [EMV, MAEMV] 序列
 */
function EMV(HIGH, LOW, VOL, N = 14, M = 9) {
    const MA_VOL_N = (0, utils_1.MA)(VOL, N);
    const VOLUME = VOL.map((v, i) => {
        const ma_v = MA_VOL_N[i];
        if (isNaN(v) || isNaN(ma_v) || v === 0)
            return NaN;
        return ma_v / v;
    });
    const REF_HIGH_LOW_1 = (0, utils_1.REF)(HIGH.map((h, i) => h + LOW[i]), 1);
    const MID = HIGH.map((h, i) => {
        const sum_hl = h + LOW[i];
        const ref_sum_hl = REF_HIGH_LOW_1[i];
        if (isNaN(sum_hl) || isNaN(ref_sum_hl) || sum_hl === 0)
            return NaN;
        return 100 * (sum_hl - ref_sum_hl) / sum_hl;
    });
    const HIGH_LOW_DIFF = HIGH.map((h, i) => h - LOW[i]);
    const MA_HIGH_LOW_DIFF_N = (0, utils_1.MA)(HIGH_LOW_DIFF, N);
    const EMV_RAW = MID.map((mid, i) => {
        const vol = VOLUME[i];
        const hl_diff = HIGH_LOW_DIFF[i];
        const ma_hl_diff = MA_HIGH_LOW_DIFF_N[i];
        if (isNaN(mid) || isNaN(vol) || isNaN(hl_diff) || isNaN(ma_hl_diff) || ma_hl_diff === 0)
            return NaN;
        return mid * vol * hl_diff / ma_hl_diff;
    });
    const EMV = (0, utils_1.MA)(EMV_RAW, N);
    const MAEMV = (0, utils_1.MA)(EMV, M);
    return [EMV, MAEMV];
}
/**
 * 区间震荡线
 * @param CLOSE 收盘价序列
 * @param M1 周期1，默认为 20
 * @param M2 周期2，默认为 10
 * @param M3 周期3，默认为 6
 * @returns [DPO, MADPO] 序列
 */
function DPO(CLOSE, M1 = 20, M2 = 10, M3 = 6) {
    const MA_CLOSE_M1 = (0, utils_1.MA)(CLOSE, M1);
    const REF_MA_CLOSE_M1_M2 = (0, utils_1.REF)(MA_CLOSE_M1, M2);
    const DPO = CLOSE.map((c, i) => {
        const ref_ma = REF_MA_CLOSE_M1_M2[i];
        if (isNaN(c) || isNaN(ref_ma))
            return NaN;
        return c - ref_ma;
    });
    const MADPO = (0, utils_1.MA)(DPO, M3);
    return [DPO, MADPO];
}
/**
 * BRAR-ARBR 情绪指标
 * @param OPEN 开盘价序列
 * @param CLOSE 收盘价序列
 * @param HIGH 最高价序列
 * @param LOW 最低价序列
 * @param M1 周期数，默认为 26
 * @returns [AR, BR] 序列
 */
function BRAR(OPEN, CLOSE, HIGH, LOW, M1 = 26) {
    const SUM_HIGH_OPEN = (0, utils_1.SUM)(HIGH.map((h, i) => h - OPEN[i]), M1);
    const SUM_OPEN_LOW = (0, utils_1.SUM)(OPEN.map((o, i) => o - LOW[i]), M1);
    const AR = SUM_HIGH_OPEN.map((sum_ho, i) => {
        const sum_ol = SUM_OPEN_LOW[i];
        if (isNaN(sum_ho) || isNaN(sum_ol) || sum_ol === 0)
            return NaN;
        return sum_ho / sum_ol * 100;
    });
    const REF_CLOSE_1 = (0, utils_1.REF)(CLOSE, 1);
    const SUM_MAX_HIGH_REFCLOSE1 = (0, utils_1.SUM)((0, utils_1.MAX)(HIGH.map((h, i) => h - REF_CLOSE_1[i]), Array(HIGH.length).fill(0)), M1);
    const SUM_MAX_REFCLOSE1_LOW = (0, utils_1.SUM)((0, utils_1.MAX)(REF_CLOSE_1.map((ref_c, i) => ref_c - LOW[i]), Array(LOW.length).fill(0)), M1);
    const BR = SUM_MAX_HIGH_REFCLOSE1.map((sum_h_refc, i) => {
        const sum_refc_l = SUM_MAX_REFCLOSE1_LOW[i];
        if (isNaN(sum_h_refc) || isNaN(sum_refc_l) || sum_refc_l === 0)
            return NaN;
        return sum_h_refc / sum_refc_l * 100;
    });
    return [AR, BR];
}
/**
 * 平行线差指标
 * @param CLOSE 收盘价序列
 * @param N1 周期1，默认为 10
 * @param N2 周期2，默认为 50
 * @param M 周期3，默认为 10
 * @returns [DIF, DIFMA] 序列
 */
function DMA(CLOSE, N1 = 10, N2 = 50, M = 10) {
    const MA_CLOSE_N1 = (0, utils_1.MA)(CLOSE, N1);
    const MA_CLOSE_N2 = (0, utils_1.MA)(CLOSE, N2);
    const DIF = MA_CLOSE_N1.map((ma1, i) => {
        const ma2 = MA_CLOSE_N2[i];
        if (isNaN(ma1) || isNaN(ma2))
            return NaN;
        return ma1 - ma2;
    });
    const DIFMA = (0, utils_1.MA)(DIF, M);
    return [DIF, DIFMA];
}
/**
 * 动量指标
 * @param CLOSE 收盘价序列
 * @param N 周期数，默认为 12
 * @param M 平滑周期，默认为 6
 * @returns [MTM, MTMMA] 序列
 */
function MTM(CLOSE, N = 12, M = 6) {
    const REF_CLOSE_N = (0, utils_1.REF)(CLOSE, N);
    const MTM = CLOSE.map((c, i) => {
        const ref_c = REF_CLOSE_N[i];
        if (isNaN(c) || isNaN(ref_c))
            return NaN;
        return c - ref_c;
    });
    const MTMMA = (0, utils_1.MA)(MTM, M);
    return [MTM, MTMMA];
}
/**
 * 变动率指标
 * @param CLOSE 收盘价序列
 * @param N 周期数，默认为 12
 * @param M 平滑周期，默认为 6
 * @returns [ROC, MAROC] 序列
 */
function ROC(CLOSE, N = 12, M = 6) {
    const REF_CLOSE_N = (0, utils_1.REF)(CLOSE, N);
    const ROC = CLOSE.map((c, i) => {
        const ref_c = REF_CLOSE_N[i];
        if (isNaN(c) || isNaN(ref_c) || ref_c === 0)
            return NaN;
        return 100 * (c - ref_c) / ref_c;
    });
    const MAROC = (0, utils_1.MA)(ROC, M);
    return [ROC, MAROC];
}
