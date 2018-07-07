// 获取图片相关的数据, 利用图片名的信息转成图片URL路径信息
const getImageURL = (imageDatasArr) => {

    let context = "./static/images/";

    imageDatasArr.map(
        (imageData, index) => {
            imageData.imageURL = context + imageData.fileName;
        }
    );

    return imageDatasArr;
};

export default getImageURL;