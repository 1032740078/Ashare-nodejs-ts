"use strict";
// Ashare 数据获取函数
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_price_day_tx = get_price_day_tx;
exports.get_price_min_tx = get_price_min_tx;
exports.get_price_sina = get_price_sina;
exports.get_all_stocks = get_all_stocks;
const axios_1 = __importDefault(require("axios"));
const cheerio = __importStar(require("cheerio")); // 新增导入 cheerio
const iconv_lite_1 = __importDefault(require("iconv-lite")); // 导入 iconv-lite 用于解码
/**
 * 获取腾讯日线/周线/月线数据
 * @param code 股票代码
 * @param end_date 结束日期 (YYYY-MM-DD)
 * @param count 数据条数
 * @param frequency 频率 ('1d', '1w', '1M')
 * @returns 股票数据序列
 */
function get_price_day_tx(code_1) {
    return __awaiter(this, arguments, void 0, function* (code, end_date = '', count = 10, frequency = '1d') {
        const unit = frequency === '1w' ? 'week' : frequency === '1M' ? 'month' : 'day';
        const formatted_end_date = end_date ? end_date.split(' ')[0] : '';
        const today = new Date().toISOString().slice(0, 10);
        const final_end_date = formatted_end_date === today ? '' : formatted_end_date;
        const URL = `http://web.ifzq.gtimg.cn/appstock/app/fqkline/get?param=${code},${unit},,${final_end_date},${count},qfq`;
        try {
            const response = yield axios_1.default.get(URL);
            const data = response.data;
            const ms = 'qfq' + unit;
            const stk = data['data'][code];
            const buf = ms in stk ? stk[ms] : stk[unit]; // 指数返回不是qfqday,是day
            const stockData = buf.map((item) => ({
                time: new Date(item[0]),
                open: parseFloat(item[1]),
                close: parseFloat(item[2]),
                high: parseFloat(item[3]),
                low: parseFloat(item[4]),
                volume: parseFloat(item[5]),
            }));
            return stockData;
        }
        catch (error) {
            console.error('获取腾讯日线数据失败:', error);
            return [];
        }
    });
}
/**
 * 获取腾讯分钟线数据
 * @param code 股票代码
 * @param end_date 结束日期 (YYYY-MM-DD)
 * @param count 数据条数
 * @param frequency 频率 ('1m', '5m', '15m', '30m', '60m')
 * @returns 股票数据序列
 */
function get_price_min_tx(code_1) {
    return __awaiter(this, arguments, void 0, function* (code, end_date = '', count = 10, frequency = '1m') {
        const ts = parseInt(frequency.slice(0, -1)) || 1;
        const formatted_end_date = end_date ? end_date.split(' ')[0] : '';
        const URL = `http://ifzq.gtimg.cn/appstock/app/kline/mkline?param=${code},m${ts},,${count}`;
        try {
            const response = yield axios_1.default.get(URL);
            const data = response.data;
            const buf = data['data'][code]['m' + ts];
            const stockData = buf.map((item) => ({
                time: new Date(item[0]),
                open: parseFloat(item[1]),
                close: parseFloat(item[2]),
                high: parseFloat(item[3]),
                low: parseFloat(item[4]),
                volume: parseFloat(item[5]),
            }));
            // 最新基金数据是3位的，需要特殊处理
            if (data['data'][code]['qt'] && data['data'][code]['qt'][code] && data['data'][code]['qt'][code][3]) {
                if (stockData.length > 0) {
                    stockData[stockData.length - 1].close = parseFloat(data['data'][code]['qt'][code][3]);
                }
            }
            return stockData;
        }
        catch (error) {
            console.error('获取腾讯分钟线数据失败:', error);
            return [];
        }
    });
}
/**
 * 获取新浪全周期数据
 * @param code 股票代码
 * @param end_date 结束日期 (YYYY-MM-DD)
 * @param count 数据条数
 * @param frequency 频率 ('5m', '15m', '30m', '60m', '1d', '1w', '1M')
 * @returns 股票数据序列
 */
function get_price_sina(code_1) {
    return __awaiter(this, arguments, void 0, function* (code, end_date = '', count = 10, frequency = '60m') {
        let freq = frequency.replace('1d', '240m').replace('1w', '1200m').replace('1M', '7200m');
        const ts = parseInt(freq.slice(0, -1)) || 1;
        let mcount = count;
        if (end_date && ['240m', '1200m', '7200m'].includes(freq)) {
            const endDateObj = new Date(end_date);
            const today = new Date();
            const unit = freq === '1200m' ? 4 : freq === '7200m' ? 29 : 1;
            const diffTime = today.getTime() - endDateObj.getTime();
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            count = count + Math.floor(diffDays / unit);
        }
        const URL = `http://money.finance.sina.com.cn/quotes_service/api/json_v2.php/CN_MarketData.getKLineData?symbol=${code}&scale=${ts}&ma=5&datalen=${count}`;
        try {
            const response = yield axios_1.default.get(URL);
            const dstr = response.data;
            if (!dstr || dstr.length === 0) {
                return [];
            }
            const stockData = dstr.map((item) => ({
                time: new Date(item.day),
                open: parseFloat(item.open),
                close: parseFloat(item.close),
                high: parseFloat(item.high),
                low: parseFloat(item.low),
                volume: parseFloat(item.volume),
            }));
            if (end_date && ['240m', '1200m', '7200m'].includes(freq)) {
                const endDateObj = new Date(end_date);
                return stockData.filter(data => data.time <= endDateObj).slice(-mcount);
            }
            return stockData;
        }
        catch (error) {
            console.error('获取新浪数据失败:', error);
            return [];
        }
    });
}
/**
 * 获取所有股票代码和名称 (数据来源: https://quote.stockstar.com/stock/stock_index.htm)
 * @returns 包含股票代码和名称的对象数组 Promise<StockInfo[]>
 */
function get_all_stocks() {
    return __awaiter(this, void 0, void 0, function* () {
        const targetUrl = 'https://quote.stockstar.com/stock/stock_index.htm'; // 硬编码 URL
        try {
            // 1. 获取 HTML 内容 (指定返回类型为 arraybuffer 以便手动解码)
            const response = yield axios_1.default.get(targetUrl, {
                responseType: 'arraybuffer', // 获取原始二进制数据
                // 模拟浏览器请求头，防止被目标网站屏蔽
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
                }
            });
            // 使用 iconv-lite 将 GBK 编码的 Buffer 解码为 UTF-8 字符串
            const htmlContent = iconv_lite_1.default.decode(response.data, 'gbk');
            // 2. 加载正确解码后的 HTML 内容
            const $ = cheerio.load(htmlContent);
            // 3. 提取股票信息
            const allStocks = [];
            // 遍历可能的父容器 ID (index_data_0 到 index_data_5)
            for (let i = 0; i < 6; i++) {
                const parentSelector = `#index_data_${i} > li`; // 使用正确的 CSS 选择器语法
                $(parentSelector).each((_, element) => {
                    const li = $(element);
                    // 提取代码 (在 span > a 中)
                    const codeElement = li.find('span > a');
                    const code = codeElement.text().trim();
                    // 提取名称 (直接在 li 下的 a 中)
                    const nameElement = li.find('> a'); // 直接子元素 a
                    let name = nameElement.text().trim();
                    // 验证并添加
                    if (code && name) { // 使用正确的逻辑与 &&
                        allStocks.push({ code, name });
                    }
                    else if (code) { // 如果只找到代码，尝试备选名称查找
                        const fallbackNameElement = li.find('a').first(); // 查找 li 下第一个 a
                        const fallbackName = fallbackNameElement.text().trim();
                        // 确保备选名称不是代码本身
                        if (fallbackName && fallbackName !== code) {
                            name = fallbackName;
                            allStocks.push({ code, name });
                        }
                        else {
                            console.warn(`未能从元素提取有效的名称 (代码: ${code}): ${li.html()}`);
                        }
                    }
                    else {
                        console.warn(`未能从元素提取有效的代码或名称: ${li.html()}`);
                    }
                });
            }
            return allStocks;
        }
        catch (error) {
            console.error(`从 URL 获取股票列表失败 (${targetUrl}):`, error); // 使用 targetUrl
            return []; // 返回空数组表示失败
        }
    });
}
