"use strict";
// Ashare SDK 入口文件
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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
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
exports.get_all_stocks = void 0;
exports.get_price = get_price;
const data_1 = require("./data"); // 修改为导入 get_all_stocks
Object.defineProperty(exports, "get_all_stocks", { enumerable: true, get: function () { return data_1.get_all_stocks; } });
/**
 * 获取股票行情数据
 * @param code 股票代码 (例如 'sh000001' 或 '000001.XSHG')
 * @param end_date 结束日期 (YYYY-MM-DD)，默认为空字符串
 * @param count 数据条数，默认为 10
 * @param frequency 频率 ('1d', '1w', '1M', '1m', '5m', '15m', '30m', '60m')，默认为 '1d'
 * @returns 股票数据序列
 */
function get_price(code_1) {
    return __awaiter(this, arguments, void 0, function* (code, end_date = '', count = 10, frequency = '1d') {
        let xcode = code.replace('.XSHG', '').replace('.XSHE', '');
        xcode = code.includes('XSHG') ? 'sh' + xcode : code.includes('XSHE') ? 'sz' + xcode : code;
        if (['1d', '1w', '1M'].includes(frequency)) {
            try {
                // 类型断言，确保传递正确的频率类型
                return yield (0, data_1.get_price_sina)(xcode, end_date, count, frequency);
            }
            catch (error) {
                console.warn('新浪接口获取日线数据失败，尝试腾讯接口:', error);
                // 类型断言，确保传递正确的频率类型
                return yield (0, data_1.get_price_day_tx)(xcode, end_date, count, frequency);
            }
        }
        if (['1m', '5m', '15m', '30m', '60m'].includes(frequency)) {
            if (frequency === '1m') {
                // 类型断言，确保传递正确的频率类型
                return yield (0, data_1.get_price_min_tx)(xcode, end_date, count, frequency);
            }
            try {
                // 类型断言，确保传递正确的频率类型
                return yield (0, data_1.get_price_sina)(xcode, end_date, count, frequency);
            }
            catch (error) {
                console.warn('新浪接口获取分钟线数据失败，尝试腾讯接口:', error);
                // 类型断言，确保传递正确的频率类型
                return yield (0, data_1.get_price_min_tx)(xcode, end_date, count, frequency);
            }
        }
        console.error('不支持的频率:', frequency);
        return [];
    });
}
// 导出技术指标函数
__exportStar(require("./indicators"), exports);
// 导出类型定义
__exportStar(require("./types"), exports);
