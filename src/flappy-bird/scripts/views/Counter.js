// 计分器
let Counter = (function () {

    let _score = 0,
        _element1 = document.querySelector("#counter #num1"),
        _element2 = document.querySelector("#counter #num2"),
        _element3 = document.querySelector("#counter #num3"),
        _counterImg = document.querySelectorAll(".counter-img img");

    return {
        show () {
            _element1.className = "show-inline-block";
        },
        add () {
            _score++;
            if (_score < 10) {
                _element1.style.backgroundImage =
                        "url(" + _counterImg[_score].src + ")";
            } else if (_score < 100) {
                _element2.className = "show-inline-block";
                _element1.style.backgroundImage =
                        "url(" + _counterImg[parseInt(_score/10)].src + ")";
                _element2.style.backgroundImage =
                        "url(" + _counterImg[_score%10].src + ")";
            } else if (_score < 1000) {
                _element3.className = "show-inline-block";
                _element1.style.backgroundImage =
                        "url(" + _counterImg[parseInt(_score/100)].src + ")";
                _element2.style.backgroundImage =
                        "url(" + _counterImg[parseInt((_score%100)/10)].src + ")";
                _element3.style.backgroundImage =
                        "url(" + _counterImg[(_score%100)%10].src + ")";
            }
        },
        hide () {
            _element1.className = "hide";
            _element2.className = "hide";
            _element3.className = "hide";

        },
        clear () {
            _score = 0;
            _element1.style.backgroundImage =
                "url(" + _counterImg[0].src + ")";
            _element2.style.backgroundImage =
                "url(" + _counterImg[0].src + ")";
            _element3.style.backgroundImage =
                "url(" + _counterImg[0].src + ")";
        },
        getScore () {
            return _score;
        }
    };

})();

export { Counter };
