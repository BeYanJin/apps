
let GameOver = (function () {

    let _element = document.querySelector("#game-over"),
        _medal = document.querySelector("#game-over #medal"),
        _score = {
            hundred: document.querySelector("#game-over #score .hundred"),
            decades: document.querySelector("#game-over #score .decades"),
            unit: document.querySelector("#game-over #score .unit")
        },
        /*_best = {
            hundred: document.querySelector("#game-over #best .hundred"),
            decades: document.querySelector("#game-over #best .decades"),
            unit: document.querySelector("#game-over #best .unit")
        },*/
        _scoreImg = document.querySelectorAll(".score-img img");

    return {
        show (score) {
            this.getMes(score);
            // _element.style.display = "block";
            _element.className = "show-block";
        },
        getMes (score) {

            /**
            * medalType = 3, 铜牌, 0到25分
            * medalType = 2, 银牌, 25到50分
            * medalType = 1, 金牌, 50到100分
            * medalType = 0, 白金牌, 100分以上
            */
            let medalType = 3;

            if (score <= 25) {
                medalType = 3;
            } else if (score <= 50) {
                medalType = 2;
            } else if (score <= 100) {
                medalType = 1;
            } else {
                medalType = 0;
            }

            // 得到奖牌信息
            _medal.style.backgroundImage =
                    "url(" +
                    document.querySelectorAll(".medal-img img")[medalType].src +
                    ")";

            // 得到分数信息
            _score.hundred.style.backgroundImage =
                    "url(" + _scoreImg[parseInt(score/100)].src + ")";
            _score.decades.style.backgroundImage =
                    "url(" + _scoreImg[parseInt((score%100)/10)].src + ")";
            _score.unit.style.backgroundImage =
                    "url(" + _scoreImg[(score%100)%10].src + ")";

            /**
            * 请求后台, 可以用session, 则只统计自己的最佳成绩
            * 若用appalication, 则统计所有玩家的最佳成绩
            */
            // let bestScore = <% = %>;
            // this.best.hundred.style.backgroundImage = "url("images/" + parseInt(bestScore/100) + ".jpg")";
            // this.best.decades.style.backgroundImage = "url("images/" + parseInt((bestScore%100)/10) + ".jpg")";
            // this.best.unit.style.backgroundImage = "url("images/" + (bestScore%100)%10 + ".jpg")";
        },
        handleClick (callback) {
            _element.querySelector("#ok").onclick = () => {
                // _element.style.display = "none";
                _element.className = "hide";
                callback && callback();
            };
        },
        removeClick () {
            _element.querySelector("#ok").onclick = null;
        }
    };

})();

export { GameOver };

