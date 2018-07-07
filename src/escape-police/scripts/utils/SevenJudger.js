/* global $ */

// 7判别器 工具类单例对象 挂载到 $, 即 jQuery对象 上
$.SevenJudger = {
    check (n) {
        if (n % 7 == 0) {
            // 如果是 7 的倍数, 返回 false
            return false;
        } else if (n.toString().indexOf("7") > -1) {
            // 如果数字中包含 7, 返回 false
            return false;
        } else {
            return true;
        }
    }
};
