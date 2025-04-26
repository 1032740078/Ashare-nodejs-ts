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
const index_1 = require("./src/index"); // 导入 TypeScript 源文件以获得类型提示
function testGetData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('正在获取上证指数日线数据...');
            // 获取上证指数 (sh000001) 的日线数据，获取最新一条
            const dayPrice = yield (0, index_1.get_price)('sh000001', '', 1, '1d');
            console.log('获取到的数据:', dayPrice);
        }
        catch (error) {
            console.error('获取数据失败:', error);
        }
    });
}
testGetData();
