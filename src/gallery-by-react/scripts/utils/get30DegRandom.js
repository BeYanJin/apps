// 获取0-30°之间一个任意正负值
const get30DegRandom = () => {
    let deg = (Math.random() > 0.5) ? "+" : "-";
    return deg + Math.ceil(Math.random() * 30);
};

export default get30DegRandom;