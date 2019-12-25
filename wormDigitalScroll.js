Element.prototype.elementInView = function() {
	var rect = this.getBoundingClientRect()
	var yInView = rect.top < window.innerHeight && rect.bottom > 0
	var xInView = rect.left < window.innerWidth && rect.right > 0
	return yInView && xInView
}

var wormDigitalScroll = function(options) {
	var that = this,
		dqtime
	for (var i in options) this[i] = options[i]

	if (!this.el) {
		console.error('el不能为空！')
		return false
	}

	var strnum = parseInt(this.el.innerHTML)
	var mc = strnum / this.time
	var start = false;

	function update(str) {
		that.el.innerHTML = str
	}

	function startnum() {
		if (that.el.elementInView() && !start) {
			start = true
			var startTimeOut = new Date().getTime()
			var time = setInterval(function() {
				dqtime = new Date().getTime() - startTimeOut
				if (dqtime >= that.time) {
					clearInterval(time)
					update(strnum)
					window.removeEventListener('scroll', scroll, false)
				} else {
					var decimal = String(strnum).split('.')
					if (decimal.length > 1) {
						decimal = String(strnum).split('.')[1].length
					} else {
						decimal = 0
					}
					update((mc * dqtime).toFixed(decimal))
				}
			}, 0)
		}
	}

	function scroll() {
		startnum()
	}
	startnum()
	window.addEventListener('scroll', scroll, false)
}

wormDigitalScroll.prototype = {
	el: null,
	time: 500
}
