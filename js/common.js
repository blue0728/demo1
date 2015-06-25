/**
 *
 * @authors serge
 * @date    2015-06-23 13:33:45
 * @海蜜
 */

var hm = {};

hm.global = {
    winScrW: window.screen.width,
    winScrH: window.screen.height
}

hm.dialog = {

    //loading 转圈
    loading: function() {
        if ($('.loading').length > 0) {
            return;
        }
        var bodyH = document.body.clientHeight;

        var html = '<div class="mask" style="height:' + bodyH + 'px;">' +
            '<div class="loading">' +
            '<p class="iconfont">&#xe617;</p>' +
            '<p>正在加载</p>' +
            '</div>' +
            '</div>';

        $(html).appendTo('body')
    },

    closeLoading: function() {
        $('.loading').remove();
    },

    //消息框
    msg: function(msg) {

        var time = new Date().getTime() + '' + Math.floor(Math.random() * 10 + 1);
        var html = '<div class="dialog-msg" id="' + time + '">' + msg + '</div>';

        $(html).appendTo('body');

        var $time = $('#' + time),
            _w = $time.width(),
            _h = $time.height();
        $time.css({
            'marginLeft': -_w / 2,
            'marginTop': -_h / 2
        });

        setTimeout(function() {
            $time.fadeOut(function() {
                $(this).remove();
            });
        }, 1200)
    },
    //对话框
    show: function(opts) {
        var that = this;
        var bodyH = document.body.clientHeight;

        var time = new Date().getTime() + '' + Math.floor(Math.random() * 10 + 1);

        var def = {
            text: '海蜜',
            html: '',
            ok: '好的',
            okFn: function() {
                that.close();
            },
            cancel: '取消',
            cancelFn: function() {
                that.close();
            },
            onshow: function(){

            }
        };

        var setting = $.extend({}, def, opts);

        var btn = '';

        if (opts.okFn !== undefined && (typeof opts.okFn) === 'function') {
            btn = '<div class="dialog-cancel" style="border-right:1px solid #ddd;" >' + setting.cancel + '</div><div class="dialog-ok">' + setting.ok + '</div>';
        } else {
            btn = '<div class="dialog-ok">' + setting.ok + '</div>'
        }

        if (setting.html == '') {
            setting.html = '<div class="dialog-content">' +
                '<div class="dialog-text">' + setting.text + '</div>' +
                '<div class="dialog-foot">' + btn + '</div>' +
                '</div>';
        }

        var html = '<div class="dialog-mask" id="dialog-mask-' + time + '" style="height:' + bodyH + 'px;"></div>' +
            '<div class="dialog-box" id="dialog-box-' + time + '">' + setting.html + '</div>';

        $(html).appendTo('body');

        setting.onshow && setting.onshow();

        var $dialogMask = $('#dialog-mask-' + time),
            $dialogBox = $('#dialog-box-' + time);

        var _w = $dialogBox.width(),
            _h = $dialogBox.height();

        $dialogBox.css({
            'marginTop': -_h / 2,
            'marginLeft': -_w / 2
        });

        $dialogMask.on('tap',function(){
            that.close();
        })

        $dialogBox.on('tap', 'div.dialog-ok', function() {
            setting.okFn();
        }).on('tap', 'div.dialog-cancel', function() {
            setting.cancelFn();
        })

        return that;
    },
    close: function() {
        $('.dialog-mask,.dialog-box').remove();
    }
}



$(function() {
    //通用跳转
    $('body *').on('tap', function() {
        var url = $(this).data('url');
        if (url === '' || url === undefined) {
            return;
        }
        hm.dialog.loading();
        setTimeout(function() {
            location.href = url;
        }, 300)

    })

})