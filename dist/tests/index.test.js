"use strict";
// 单元测试
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../src/utils");
// 测试 utils.ts 中的核心工具函数
describe('Utils Functions', () => {
    test('RD should round a number to specified decimal places', () => {
        expect((0, utils_1.RD)(123.456789, 2)).toBe(123.46);
        expect((0, utils_1.RD)(123.456789)).toBe(123.457);
        expect((0, utils_1.RD)(100, 0)).toBe(100);
        expect((0, utils_1.RD)(123.456, 2)).toBe(123.46); // 测试四舍五入
        expect((0, utils_1.RD)(123.454, 2)).toBe(123.45); // 测试不四舍五入
    });
    test('RET should return the Nth last element of an array', () => {
        const arr = [1, 2, 3, 4, 5];
        expect((0, utils_1.RET)(arr)).toBe(5);
        expect((0, utils_1.RET)(arr, 2)).toBe(4);
        expect((0, utils_1.RET)(arr, 5)).toBe(1);
        expect((0, utils_1.RET)(arr, 6)).toBeUndefined();
        expect((0, utils_1.RET)(arr, 0)).toBeUndefined();
        expect((0, utils_1.RET)([], 1)).toBeUndefined(); // 测试空数组
    });
    test('ABS should return the absolute values of a number array', () => {
        const arr = [1, -2, 3, -4, 0, -0.5];
        expect((0, utils_1.ABS)(arr)).toEqual([1, 2, 3, 4, 0, 0.5]);
        expect((0, utils_1.ABS)([])).toEqual([]); // 测试空数组
    });
    test('MAX should return the maximum of two numbers or arrays element-wise', () => {
        expect((0, utils_1.MAX)([5], [10])).toEqual([10]); // 修改为传入数组
        expect((0, utils_1.MAX)([1, 5, 2], [3, 4, 6])).toEqual([3, 5, 6]);
        expect((0, utils_1.MAX)([1, 5, NaN], [3, 4, 6])).toEqual([3, 5, 6]); // 测试 NaN 处理
        expect((0, utils_1.MAX)([], [])).toEqual([]); // 测试空数组
    });
    test('MIN should return the minimum of two numbers or arrays element-wise', () => {
        expect((0, utils_1.MIN)([5], [10])).toEqual([5]); // 修改为传入数组
        expect((0, utils_1.MIN)([1, 5, 2], [3, 4, 6])).toEqual([1, 4, 2]);
        expect((0, utils_1.MIN)([1, 5, NaN], [3, 4, 6])).toEqual([1, 4, 6]); // 测试 NaN 处理
        expect((0, utils_1.MIN)([], [])).toEqual([]); // 测试空数组
    });
    test('MA should calculate the simple moving average', () => {
        const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        expect((0, utils_1.MA)(arr, 3)).toEqual([NaN, NaN, 2, 3, 4, 5, 6, 7, 8, 9]);
        expect((0, utils_1.MA)(arr, 5)).toEqual([NaN, NaN, NaN, NaN, 3, 4, 5, 6, 7, 8]);
        expect((0, utils_1.MA)([], 3)).toEqual([]); // 测试空数组
        expect((0, utils_1.MA)(arr, 0)).toEqual(Array(arr.length).fill(NaN)); // 测试周期为0
        expect((0, utils_1.MA)(arr, arr.length + 1)).toEqual(Array(arr.length).fill(NaN)); // 测试周期大于数组长度
    });
    test('REF should return the element N periods ago', () => {
        const arr = [1, 2, 3, 4, 5];
        expect((0, utils_1.REF)(arr, 1)).toEqual([NaN, 1, 2, 3, 4]);
        expect((0, utils_1.REF)(arr, 3)).toEqual([NaN, NaN, NaN, 1, 2]);
        expect((0, utils_1.REF)(arr, 0)).toEqual(arr); // 测试周期为0
        expect((0, utils_1.REF)(arr, arr.length)).toEqual([NaN, NaN, NaN, NaN, 1]); // 测试周期等于数组长度
        expect((0, utils_1.REF)(arr, arr.length + 1)).toEqual(Array(arr.length).fill(NaN)); // 测试周期大于数组长度
        expect((0, utils_1.REF)([], 1)).toEqual([]); // 测试空数组
    });
    test('DIFF should calculate the difference between current and previous elements', () => {
        const arr = [1, 2, 3, 4, 5];
        expect((0, utils_1.DIFF)(arr)).toEqual([NaN, 1, 1, 1, 1]);
        expect((0, utils_1.DIFF)(arr, 2)).toEqual([NaN, NaN, 2, 2, 2]);
        expect((0, utils_1.DIFF)([], 1)).toEqual([]); // 测试空数组
        expect((0, utils_1.DIFF)(arr, 0)).toEqual(Array(arr.length).fill(NaN)); // 测试周期为0
        expect((0, utils_1.DIFF)(arr, arr.length)).toEqual(Array(arr.length).fill(NaN)); // 测试周期等于数组长度
    });
    test('STD should calculate the standard deviation', () => {
        const arr = [1, 2, 3, 4, 5];
        // 这里的期望值需要根据具体的标准差计算方法（样本标准差或总体标准差）来确定
        // 假设是总体标准差 (ddof=0)
        // 使用 jest-extended 库的 toBeCloseTo 来比较浮点数
        // expect(STD(arr, 2)[1]).toBeCloseTo(0.5);
        // expect(STD(arr, 3)[2]).toBeCloseTo(Math.sqrt((Math.pow(1-2,2) + Math.pow(2-2,2) + Math.pow(3-2,2))/3));
        // TODO: 补充更全面的 STD 测试用例和精确的期望值
    });
    test('IF should return value based on condition array', () => {
        const condition = [true, false, true, false];
        const arr1 = [1, 2, 3, 4];
        const arr2 = [5, 6, 7, 8];
        expect((0, utils_1.IF)(condition, arr1, arr2)).toEqual([1, 6, 3, 8]);
        expect((0, utils_1.IF)([], [], [])).toEqual([]); // 测试空数组
        // TODO: 补充更多 IF 测试用例，包括不同长度的数组和非布尔条件
    });
    test('SUM should calculate the cumulative sum', () => {
        const arr = [1, 2, 3, 4, 5];
        expect((0, utils_1.SUM)(arr, 3)).toEqual([NaN, NaN, 6, 9, 12]);
        expect((0, utils_1.SUM)(arr, 5)).toEqual([NaN, NaN, NaN, NaN, 15]);
        expect((0, utils_1.SUM)([], 3)).toEqual([]); // 测试空数组
        expect((0, utils_1.SUM)(arr, 0)).toEqual(Array(arr.length).fill(NaN)); // 测试周期为0
        expect((0, utils_1.SUM)(arr, arr.length + 1)).toEqual(Array(arr.length).fill(NaN)); // 测试周期大于数组长度
    });
    test('HHV should calculate the highest value in a period', () => {
        const arr = [1, 5, 2, 6, 3, 7, 4, 8];
        expect((0, utils_1.HHV)(arr, 3)).toEqual([NaN, NaN, 5, 6, 6, 7, 7, 8]);
        expect((0, utils_1.HHV)([], 3)).toEqual([]); // 测试空数组
        expect((0, utils_1.HHV)(arr, 0)).toEqual(Array(arr.length).fill(NaN)); // 测试周期为0
        expect((0, utils_1.HHV)(arr, arr.length + 1)).toEqual(Array(arr.length).fill(NaN)); // 测试周期大于数组长度
    });
    test('LLV should calculate the lowest value in a period', () => {
        const arr = [8, 4, 7, 3, 6, 2, 5, 1];
        expect((0, utils_1.LLV)(arr, 3)).toEqual([NaN, NaN, 4, 3, 3, 2, 2, 1]);
        expect((0, utils_1.LLV)([], 3)).toEqual([]); // 测试空数组
        expect((0, utils_1.LLV)(arr, 0)).toEqual(Array(arr.length).fill(NaN)); // 测试周期为0
        expect((0, utils_1.LLV)(arr, arr.length + 1)).toEqual(Array(arr.length).fill(NaN)); // 测试周期大于数组长度
    });
    test('EMA should calculate the exponential moving average', () => {
        const arr = [1, 2, 3, 4, 5];
        // 这里的期望值需要根据具体的 EMA 计算方法来确定
        // 例如，对于 N=3，alpha = 2/(3+1) = 0.5
        // EMA[0] = 1
        // EMA[1] = 0.5 * 2 + (1-0.5) * 1 = 1 + 0.5 = 1.5
        // EMA[2] = 0.5 * 3 + (1-0.5) * 1.5 = 1.5 + 0.75 = 2.25
        // ...
        // 需要根据实际计算结果调整期望值，并使用 toBeCloseTo
        // expect(EMA(arr, 3)[0]).toBeCloseTo(1);
        // expect(EMA(arr, 3)[1]).toBeCloseTo(1.5);
        // expect(EMA(arr, 3)[2]).toBeCloseTo(2.25);
        // TODO: 补充更全面的 EMA 测试用例和精确的期望值
    });
    test('SMA should calculate the simple moving average with a weight', () => {
        const arr = [1, 2, 3, 4, 5];
        // 这里的期望值需要根据具体的 SMA 计算方法来确定
        // 例如，对于 N=3, M=1
        // SMA[i] = (arr[i] * M + SMA[i-1] * (N-M)) / N
        // SMA[0] = arr[0] = 1
        // SMA[1] = (arr[1] * 1 + SMA[0] * (3-1)) / 3 = (2 * 1 + 1 * 2) / 3 = 4 / 3 = 1.333...
        // SMA[2] = (arr[2] * 1 + SMA[1] * (3-1)) / 3 = (3 * 1 + 1.333 * 2) / 3 = (3 + 2.666) / 3 = 5.666 / 3 = 1.888...
        // 需要根据实际计算结果调整期望值，并使用 toBeCloseTo
        // expect(SMA(arr, 3, 1)[0]).toBeCloseTo(1);
        // expect(SMA(arr, 3, 1)[1]).toBeCloseTo(1.333);
        // expect(SMA(arr, 3, 1)[2]).toBeCloseTo(1.888);
        // TODO: 补充更全面的 SMA 测试用例和精确的期望值
    });
    // TODO: 为其他 utils 函数添加测试 (AVEDEV, SLOPE, FORCAST, CROSS, COUNT, EVERY, LAST, EXIST, BARSLAST)
});
// 测试 indicators.ts 中的技术指标函数
describe('Indicators Functions', () => {
    // TODO: 为 MACD, KDJ, RSI, WR, BIAS, BOLL, PSY, CCI, ATR, BBI, DMI, TAQ, TRIX, VR, EMV, DPO, BRAR, DMA, MTM, ROC 函数添加测试
    // 可以使用已知的股票数据和对应的指标计算结果进行比对
});
// 测试 data.ts 中的数据获取函数
describe('Data Functions', () => {
    // TODO: 为 get_price_day_tx, get_price_min_tx, get_price_sina 添加测试
    // 这些测试可能需要 mock axios 来模拟网络请求和响应
    // 可以使用 jest.mock('axios') 来 mock axios
    // 例如：
    // test('get_price should fetch data successfully', async () => {
    //   const mockData: StockData[] = [{ trade_date: '2023-01-01', open: 10, high: 12, low: 9, close: 11, volume: 1000, code: 'sh000001', name: '股票A' }];
    //   jest.mock('axios', () => ({
    //     get: jest.fn(() => Promise.resolve({ data: { data: mockData } })),
    //   }));
    //   const result = await get_price('sh000001', '', 1, '1d');
    //   expect(result).toEqual(mockData);
    // });
});
