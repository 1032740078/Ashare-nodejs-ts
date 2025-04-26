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
exports.ROC = exports.MTM = exports.DMA = exports.BRAR = exports.DPO = exports.EMV = exports.VR = exports.TRIX = exports.TAQ = exports.DMI = exports.BBI = exports.ATR = exports.CCI = exports.PSY = exports.BOLL = exports.BIAS = exports.WR = exports.RSI = exports.KDJ = exports.MACD = exports.get_all_stocks = void 0;
exports.get_price = get_price_internal;
// Ashare SDK 入口文件
const data_1 = require("./data");
Object.defineProperty(exports, "get_all_stocks", { enumerable: true, get: function () { return data_1.get_all_stocks; } });
const indicators_1 = require("./indicators");
Object.defineProperty(exports, "MACD", { enumerable: true, get: function () { return indicators_1.MACD; } });
Object.defineProperty(exports, "KDJ", { enumerable: true, get: function () { return indicators_1.KDJ; } });
Object.defineProperty(exports, "RSI", { enumerable: true, get: function () { return indicators_1.RSI; } });
Object.defineProperty(exports, "WR", { enumerable: true, get: function () { return indicators_1.WR; } });
Object.defineProperty(exports, "BIAS", { enumerable: true, get: function () { return indicators_1.BIAS; } });
Object.defineProperty(exports, "BOLL", { enumerable: true, get: function () { return indicators_1.BOLL; } });
Object.defineProperty(exports, "PSY", { enumerable: true, get: function () { return indicators_1.PSY; } });
Object.defineProperty(exports, "CCI", { enumerable: true, get: function () { return indicators_1.CCI; } });
Object.defineProperty(exports, "ATR", { enumerable: true, get: function () { return indicators_1.ATR; } });
Object.defineProperty(exports, "BBI", { enumerable: true, get: function () { return indicators_1.BBI; } });
Object.defineProperty(exports, "DMI", { enumerable: true, get: function () { return indicators_1.DMI; } });
Object.defineProperty(exports, "TAQ", { enumerable: true, get: function () { return indicators_1.TAQ; } });
Object.defineProperty(exports, "TRIX", { enumerable: true, get: function () { return indicators_1.TRIX; } });
Object.defineProperty(exports, "VR", { enumerable: true, get: function () { return indicators_1.VR; } });
Object.defineProperty(exports, "EMV", { enumerable: true, get: function () { return indicators_1.EMV; } });
Object.defineProperty(exports, "DPO", { enumerable: true, get: function () { return indicators_1.DPO; } });
Object.defineProperty(exports, "BRAR", { enumerable: true, get: function () { return indicators_1.BRAR; } });
Object.defineProperty(exports, "DMA", { enumerable: true, get: function () { return indicators_1.DMA; } });
Object.defineProperty(exports, "MTM", { enumerable: true, get: function () { return indicators_1.MTM; } });
Object.defineProperty(exports, "ROC", { enumerable: true, get: function () { return indicators_1.ROC; } });
// Internal get_price implementation
function get_price_internal(code_1) {
    return __awaiter(this, arguments, void 0, function* (code, end_date = '', count = 10, frequency = '1d') {
        let xcode = code.replace('.XSHG', '').replace('.XSHE', '');
        xcode = code.includes('XSHG') ? 'sh' + xcode : code.includes('XSHE') ? 'sz' + xcode : code;
        if (['1d', '1w', '1M'].includes(frequency)) {
            try {
                // Ensure correct frequency type is passed
                return yield (0, data_1.get_price_sina)(xcode, end_date, count, frequency);
            }
            catch (error) {
                console.warn('新浪接口获取日线数据失败，尝试腾讯接口:', error);
                // Ensure correct frequency type is passed
                return yield (0, data_1.get_price_day_tx)(xcode, end_date, count, frequency);
            }
        }
        if (['1m', '5m', '15m', '30m', '60m'].includes(frequency)) {
            if (frequency === '1m') {
                // Ensure correct frequency type is passed
                return yield (0, data_1.get_price_min_tx)(xcode, end_date, count, frequency);
            }
            try {
                // Ensure correct frequency type is passed
                return yield (0, data_1.get_price_sina)(xcode, end_date, count, frequency);
            }
            catch (error) {
                console.warn('新浪接口获取分钟线数据失败，尝试腾讯接口:', error);
                // Ensure correct frequency type is passed
                return yield (0, data_1.get_price_min_tx)(xcode, end_date, count, frequency);
            }
        }
        console.error('不支持的频率:', frequency);
        return [];
    });
}
