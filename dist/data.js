"use strict";
// Ashare 数据获取函数
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
const axios_1 = __importDefault(require("axios"));
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
