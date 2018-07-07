/**
 * jquery.timer.js
 *
 * Copyright (c) 2011 Jason Chavannes <jason.chavannes@gmail.com>
 *
 * http://jchavannes.com/jquery-timer
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use, copy,
 * modify, merge, publish, distribute, sublicense, and/or sell copies
 * of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
 * BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

;(function($) {

	// $.timer 构造函数
	$.timer = function (func, time, autostart) {

		// this 指代 $
	 	this.set = function (func, time, autostart) {

	 		// $.init = true; 表示已经过初始化设置
	 		this.init = true;

	 		// 如果 func 为 对象, 执行以下步骤
	 	 	if (typeof func == 'object') {

	 	 		/**
	 	 		* for 循环中的代码会执行两次, 第一次 arg 为 0, 第二次 为 1;
	 	 		* 检验 func 对象中是否设置了 autostart 或 time 属性
	 	 		  若没有设置, 则 func[paramList[arg]] == undefined;
	 	 		* 其中:
	 	 		* autostart是一个布尔值
	 	 		  	true 表示自动启动计时
	 	 		  	false表示不会自动启动计时, 默认值为 false;
	 	 		* time 是一个数值, 表示多长时间后出发 action 函数
	 	 		* 将 func对象 中设置属性的值 存入 paramList 数组中.
	 	 		*/
		 	 	var paramList = ['autostart', 'time'];
	 	 	 	for(var arg in paramList) {
	 	 	 		if(func[paramList[arg]] != undefined) {
	 	 	 			eval(paramList[arg] + " = func[paramList[arg]]");
	 	 	 		}
	 	 	 	};
	 	 	 	/**
	 	 	 	* action 是 func 对象的一个属性, 它是一个函数
	 	 	 	* 该函数在 计时器 满足设定条件时会被执行
	 	 	 	*/
 	 			func = func.action;
	 	 	}

	 		// 如果func为函数(或func为对象且有action属性, 其值为函数), 执行以下步骤
	 	 	if (typeof func == 'function') {
	 	 		// 用 action 属性 保存该函数
	 	 		this.action = func;
	 	 	}
	 	 	// 如果 time 是数值
		 	if(!isNaN(time)) {
	 	 		// 用 intervalTime 属性 保存该数值
		 		this.intervalTime = time;
		 	}
		 	// 如果autostart被设置为true(自动计时), 且isActive未定义或为false
		 	if(autostart && !this.isActive) {
	 	 		// 把 isActive 属性 设置为 true
			 	this.isActive = true;
			 	this.setTimer();
		 	}
		 	return this;
	 	};
	 	this.once = function(time) {
			var timer = this;
			// 如果 time 为非数值, 则设为0
	 	 	if (isNaN(time)) {
	 	 		time = 0;
	 	 	}
	 	 	// 执行超时调用
			window.setTimeout( function() {
				timer.action();
			}, time);
	 		return this;
	 	};
		this.play = function(reset) {
			// 如果计时器处于暂停状态, 执行以下步骤
			if (!this.isActive) {
				if (reset) {
					this.setTimer();
				} else {
					this.setTimer(this.remaining);
				}
				// 将计时器设置为开启状态
				this.isActive = true;
			}
			return this;
		};
		this.pause = function() {
			// 如果计时器处于开启状态, 执行以下步骤
			if (this.isActive) {
				// 将计时器设置为暂停状态
				this.isActive = false;
				// 保存时间
				this.remaining -= new Date() - this.last;
				// 清除计时器
				this.clearTimer();
			}
			return this;
		};
		// 中止计时器, 可执行 play()方法 重新开启
		this.stop = function() {
			this.isActive = false;
			this.remaining = this.intervalTime;
			this.clearTimer();
			return this;
		};
		// 变换计时器的当前状态
		this.toggle = function(reset) {
			if(this.isActive) {this.pause();}
			else if(reset) {this.play(true);}
			else {this.play();}
			return this;
		};
		// 重启计时器
		this.reset = function() {
			this.isActive = false;
			this.play(true);
			return this;
		};
		// 清楚计时器
		this.clearTimer = function() {
			window.clearTimeout(this.timeoutObject);
		};
	 	this.setTimer = function(time) {
			var timer = this;
			// 如果 action 不是函数, 则直接返回, 方法执行无效果
	 	 	if(typeof this.action != 'function') {return;}
	 	 	if(isNaN(time)) {time = this.intervalTime;}
		 	this.remaining = time;
	 	 	this.last = new Date();
			this.clearTimer();
			this.timeoutObject = window.setTimeout(function() {timer.go();}, time);
		};
	 	// 计时结束后执行 action 函数, 如果设置了autostart等于true, 则进行间歇调用
	 	this.go = function() {
	 		if(this.isActive) {
	 			this.action();
	 			this.setTimer();
	 		}
	 	};



	 	/**
	 	* 这里的 this 指的是 $, 也就是 jQuery 对象
	 	* 若 $.init 等于 false, 表示这是第一次执行 $.timer() 方法，此时
	 	  所有的方法都是直接挂载到 $ 上的, 然后进入 else 语句, 执行 set()
	 	  方法, $.init 被赋值为 true, 返回 $
	 	* 若 $.init 等于 true, 表示之前已执行过 $.timer() 方法, 此时再执行
	 	  $.timer()方法, 会进入 if 语句, 创建一个新的 $.timer 对象实例, 所有
	 	  的方法都会挂载到这个新的 $.timer 对象实例 上, 最后将其返回
	 	  其返回
	 	*/
	 	if(this.init) {
	 		return new $.timer(func, time, autostart);
	 	} else {
			this.set(func, time, autostart);
	 		return this;
	 	}
	};

})(jQuery);