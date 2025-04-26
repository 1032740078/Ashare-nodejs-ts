"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// Ashare SDK TypeScript Demo
// 导入 Ashare SDK 函数
const dist_1 = require("./dist"); // 从构建后的 dist 目录导入
const utils_1 = require("./dist/utils"); // 从包的 utils 模块导入 MA
// 辅助函数：打印数据摘要
function printDataSummary(title, data) {
    console.log(`\n--- ${title} ---`);
    if (Array.isArray(data) && data.length > 0) {
        if (typeof data[0] === 'object' && data[0] !== null && 'time' in data[0]) { // 检查 StockData
            // 打印 StockData[] 的前几条和后几条
            const stockData = data;
            console.log('数据条数:', stockData.length);
            console.log('前 3 条数据:');
            console.table(stockData.slice(0, 3));
            if (stockData.length > 3) {
                console.log('后 3 条数据:');
                console.table(stockData.slice(-3));
            }
        }
        else if (typeof data[0] === 'object' && data[0] !== null && 'code' in data[0] && 'name' in data[0]) { // 检查 StockInfo
            // 打印 StockInfo[] 的前几条和后几条
            const stockInfoData = data;
            console.log('数据条数:', stockInfoData.length);
            console.log('前 3 条数据:');
            console.table(stockInfoData.slice(0, 3));
            if (stockInfoData.length > 3) {
                console.log('后 3 条数据:');
                console.table(stockInfoData.slice(-3));
            }
        }
        else if (Array.isArray(data[0])) {
            // 打印指标数组 [number[], number[], ...] 或 number[][]
            const indicatorData = data;
            console.log('指标组数量:', indicatorData.length);
            indicatorData.forEach((indicator, index) => {
                console.log(`指标 ${index + 1} (前 5 条):`, indicator.slice(0, 5).map(v => (typeof v === 'number' && !isNaN(v)) ? v.toFixed(2) : 'NaN'));
                if (indicator.length > 5) {
                    console.log(`指标 ${index + 1} (后 5 条):`, indicator.slice(-5).map(v => (typeof v === 'number' && !isNaN(v)) ? v.toFixed(2) : 'NaN'));
                }
            });
        }
        else if (typeof data[0] === 'number') { // 检查 number[]
            // 打印 number[] 的前几条和后几条
            const numberData = data;
            console.log('数据条数:', numberData.length);
            console.log('前 5 条数据:', numberData.slice(0, 5).map(v => (typeof v === 'number' && !isNaN(v)) ? v.toFixed(2) : 'NaN'));
            if (numberData.length > 5) {
                console.log('后 5 条数据:', numberData.slice(-5).map(v => (typeof v === 'number' && !isNaN(v)) ? v.toFixed(2) : 'NaN'));
            }
        }
        else {
            console.log('数据格式无法识别'); // 处理未知格式
        }
    }
    else {
        console.log('无数据');
    }
    console.log('--- End ---');
}
// 主函数
function runDemo() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('开始运行 Ashare SDK TypeScript Demo...');
        // --- 复现 Demo1.py ---
        // 获取上证指数日线行情 (默认 count=10, frequency='1d')
        const shIndexDaily = yield (0, dist_1.get_price)('sh000001');
        printDataSummary('上证指数日线行情 (默认)', shIndexDaily);
        // 获取上证指数日线行情 (指定 count=5)
        const shIndexDaily5 = yield (0, dist_1.get_price)('sh000001', '', 5);
        printDataSummary('上证指数日线行情 (count=5)', shIndexDaily5);
        // 获取上证指数历史日线行情 (指定 end_date 和 count)
        const shIndexHist = yield (0, dist_1.get_price)('000001.XSHG', '2023-12-31', 5, '1d');
        printDataSummary('上证指数历史日线行情 (end_date="2023-12-31", count=5)', shIndexHist);
        // 获取贵州茅台15分钟线行情 (count=5)
        const kweiChow15m = yield (0, dist_1.get_price)('sh600519', '', 5, '15m');
        printDataSummary('贵州茅台15分钟线 (count=5)', kweiChow15m);
        // 获取贵州茅台60分钟线行情 (count=6)
        const kweiChow60m = yield (0, dist_1.get_price)('600519.XSHG', '', 6, '60m');
        printDataSummary('贵州茅台60分钟线 (count=6)', kweiChow60m);
        // --- 复现 Demo2.py (数据处理部分) ---
        // 获取上证指数日线行情 (count=120)
        const shIndexDaily120 = yield (0, dist_1.get_price)('000001.XSHG', '', 120, '1d');
        printDataSummary('上证指数日线行情 (count=120)', shIndexDaily120);
        if (shIndexDaily120.length > 0) {
            // 提取收盘价序列
            const closePrices = shIndexDaily120.map(item => item.close);
            printDataSummary('提取的收盘价序列', closePrices);
            // 计算 MA 指标
            const ma5 = (0, utils_1.MA)(closePrices, 5);
            const ma10 = (0, utils_1.MA)(closePrices, 10);
            printDataSummary('MA5 指标', ma5);
            printDataSummary('MA10 指标', ma10);
            // 计算 BOLL 指标
            const [bollUp, bollMid, bollLower] = (0, dist_1.BOLL)(closePrices); // 默认 N=20, P=2
            printDataSummary('BOLL 指标 (UP, MID, LOWER)', [bollUp, bollMid, bollLower]);
        }
        else {
            console.log('\n无法计算指标，因为未能获取到足够的行情数据。');
        }
        // --- 获取所有股票列表 ---
        console.log('\n尝试获取所有股票列表...');
        const allStocks = yield (0, dist_1.get_all_stocks)();
        printDataSummary('所有股票列表', allStocks);
        console.log('\nAshare SDK TypeScript Demo 运行结束。');
    });
}
// 执行 Demo
runDemo().catch(error => {
    console.error('运行 Demo 时出错:', error);
});
