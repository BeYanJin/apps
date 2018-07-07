// 获取区间内的一个随机值, 左闭右开
const getRangeRandom = (low, high) =>
                        Math.floor(Math.random() * (high - low) + low);

export default getRangeRandom;