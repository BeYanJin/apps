// 解决用 document.title = "xxx" 动态修改title, 在iOS微信浏览器下无效的问题
let TitleChanger = {
    changeTitle (string) {

        // 获取用户代理消息
        let u = navigator.userAgent;

        // 得到是否ios移动终端的判断标志
        let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

        // 修改title
        document.title = string;

        if (isiOS) {

            // 如果是ios移动终端，执行一下代码
            // 创建一个内容为空的 iframe 元素
            let iframe = document.createElement("iframe");

            // 把 iframe 中的内容设置为 游戏背景图片，防止加到body中出现闪动的情况
            iframe.setAttribute("src", document.querySelector("img#emo2").src);

            iframe.addEventListener("load", () => {
                console.log("haha");
                // 监听 iframe 是否成功完成dom加载加到body中，若成功则执行如下代码
                // 立即出发一个定时器，在body中移除 iframe元素 及其绑定的load事件
                setTimeout( () => {
                    iframe.removeEventListener("load", () => {});
                    document.body.removeChild(iframe);
                }, 0);
            });

            // 把 iframe 插入到body中
            document.body.appendChild(iframe);
        }
    }
};

export { TitleChanger };