/**
 * @require zepto
 * @authors serge
 * @date    2015-06-18 10:29:57
 * @version 1.0
 * @demo 
 * $('#slide').TouchSlide({
 *    btn: $('#btn')
 * });
 */
;
(function($) {
    //下标
    var i = 0;

    //默认配置
    var settings = {
        auto: true,
        speed: 500,
        delay: 4000,
        btn: null,
        timing: 'ease-in'
    }

    //构造函数
    function TouchSlide(elem, opts) {
        this.elem = elem;
        this.opts = opts;
        this.init();

    }

    //异步加载图片
    function loadImg(obj, i) {
        var $obj = obj.eq(i),
            _src = $obj.find('img').data('src');
        if (_src) {
            $obj.find('img').attr('src', _src).removeAttr('data-src');
        }
    }

    //原型方法
    TouchSlide.prototype = {

        init: function() {
            this.Slide();
        },

        //获取rem比例
        getRem: function() {
            var $elem = this.elem,
                _width = $elem.css('width').split('px')[0],
                _fontSize = $('html').css('font-size').split('px')[0],
                _rem = _width / _fontSize;
            return _rem;
        },

        //核心动画
        Slide: function() {
            var that = this,
                $elem = that.elem,
                flag = true,
                timer = null,
                rem = that.getRem();

            $elem.prepend($elem.children().clone().addClass('clone'));

            var $child = $elem.children(),
                len = $child.length;

            i = i + len / 2;

            if (that.opts.btn) {

                var $btn = $(btn);

                for (var j = 0; j < len / 2; j++) {
                    $btn.append('<i></i>');
                }

            }

            //初始位置
            function reset(index) {
                $elem.animate({
                    translate3d: '-' + (index * rem) + 'rem' + ',0,0'
                }, 0);
                $btn.children().eq(0).addClass('current');
                loadImg($child, i);
            }

            reset(i);

            //核心动画
            function move() {

                flag = false;

                loadImg($child, i);

                $elem.animate({

                    translate3d: '-' + (i * rem) + 'rem' + ',0,0'

                }, that.opts.speed, that.opts.timing, function() {
                    if (i == 0) {
                        i = len / 2;
                        reset(i);
                    }

                    if (i == len - 1) {
                        i = len / 2 - 1;
                        reset(i);
                    }

                    $btn.children().eq(i - 6).addClass('current').siblings().removeClass('current');

                    flag = true;

                });

            }

            $elem.on('touchmove', function(e) {

                e.preventDefault();

            }).on('swipeLeft', function(e) {
                if (!flag) {
                    return;
                }
                i++;
                move();

            }).on('swipeRight', function(e) {
                if (!flag) {
                    return;
                }
                i--;
                move();

            })

            //自动播放
            if (that.opts.auto) {

                timer = setInterval(function() {

                    $elem.trigger('swipeLeft');

                }, that.opts.delay);

                $elem.on('touchstart', function(e) {

                    clearInterval(timer);

                }).on('touchend', function() {

                    timer = setInterval(function() {

                        $elem.trigger('swipeLeft');

                    }, that.opts.delay);

                });
            }
        }

    }

    $.fn.TouchSlide = function(options) {

        return this.each(function() {

            var opts = $.extend({}, settings, options);

            new TouchSlide($(this), opts);

        });
    }

})(Zepto);