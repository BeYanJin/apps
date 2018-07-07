
// RandomCreator工具类：用于生成随机数
let RandomCreator = {
    random (min, max) {
        return parseInt(Math.random() * (max - min + 1) + min);
    }
};

export { RandomCreator };

