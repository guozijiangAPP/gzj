const now = Date.now || function () {
    return new Date().getTime();
};
const base = "https://app.wecanrun.cn/v5/";
const ceshi = function (data) {
    console.log("-------------data:" + data);
    if (data.indexOf('http') == -1) {
        return "show1"
    } else {
        return "hide2"
    }
}

export default {
    now,
    base,
    ceshi
}