import { apiRequest } from 'api/apiRequest.js';
// 模拟开发环境
const isMockEnvironment = process.env.REACT_APP_ENV === 'mock';

// test001 獲取分頁資料
// export const test001API = () => {
//     // 如果不是开发环境，返回实际的 API 调用
//     return {
//         method: 'GET',
//         baseURL: DOMAIN,
//         url: 'products/allpens',
//         headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json'
//         }
//     };
// };

export const test001API = async () => {
    // 如果是开发环境，直接返回模拟数据
    const url = isMockEnvironment ? `/mock/test.json` : `/testing`;
    const res = await apiRequest('GET', url, null, true);
    return res;
};
