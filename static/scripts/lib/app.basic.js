/***
 * 系统插件
 */
$.extend({
    loading: function() {
	    var _html = "<div class='loading_p' id='mloading'><div class='loading'>";
	    _html += "<div class='img'></div>";
	    _html += "<div class='text'>加载中</div>";
	    _html += "</div></div>";
	    $("body").append(_html);
    }
});


$.fn.extend({
    pullLoad: function(params){
        var _$panle = $(this);
        var _$panle_ctrl = _$panle.find(".pull-control");

        //init初始化
        var _up_html = "<div class='pull-up'>" +
            "<div class='pull-tip-icon'>" +
            "<div class='pull-dot-panle'><div class='pull-dot pull-dot1'></div><div class='pull-dot pull-dot2'></div><div class='pull-dot pull-dot3'></div></div>" +
            "</div>" +
            "<div class='pull-tip-text'>下拉刷新</div>" +
            "<div class='box ver-center text-center pull-tip-complete'>重新加载完成</div></div>";
        _$panle_ctrl.prepend(_up_html);
        var _down_html = "<div class='pull-down'>" +
            "<div class='box ver-center text-center pull-tip-complete'>─ 已到最底，无更多数据 ─</div>" +
            "<div class='pull-tip-text'>正在加载</div>" +
            "<div class='pull-tip-icon'>" +
            "<div class='pull-dot-panle'><div class='pull-dot pull-dot1'></div><div class='pull-dot pull-dot2'></div><div class='pull-dot pull-dot3'></div></div>" +
            "</div></div>";
        _$panle_ctrl.append(_down_html);

        //定义加载变量
        var _start_y = 0, _start_x = 0,  _speed = 1, refresh = false, refresh_callback = 0, loaded = false,
            _$pull_up = _$panle_ctrl.children(".pull-up"), _pull_up_height = _$pull_up.outerHeight(),
            _$pull_down = _$panle_ctrl.children(".pull-down"),
            _$pull_up_icon = _$pull_up.children(".pull-tip-icon"),
            _$pull_up_text = _$pull_up.children(".pull-tip-text"),
            _$pull_tip_complete = _$pull_up.children(".pull-tip-complete"),
            _$pull_down_icon = _$pull_down.children(".pull-tip-icon"),
            _$pull_down_text = _$pull_down.children(".pull-tip-text");
        var trueDelWidth = - $(".delete-list-btn").width(), _$target = null, _target_x = 0,_$status=null, side = false;
        //记录手势方向，默认是0，上下是2，左右是1
        var direStatus = 0;
        //格式初始化
        _$panle_ctrl.css("top", - _pull_up_height);

        //下拉和上拉的开关
        var _down_refresh = true, _up_load = true;
        _$panle[0].addEventListener('touchstart', function (event) {
            //记录开始值
            _start_y = event.touches[0].pageY;
            _start_x = event.touches[0].pageX;
            //获取当前点击的目标对象
            _$target = $(event.target).parents(".touch-box");
            //判断是否关闭侧滑
            side = _$target.attr("side");
            side = !side || side == 'true' ? true : false;
            //当前目标对象的偏移
            if (_$target.length > 0) {
                _target_x = parseInt(_$target[0].style.left);
            }
        }, false);
        _$panle[0].addEventListener('touchmove', function (event) {
            //记录结束值
            var _end_y = event.touches[0].pageY,
                _end_x = event.touches[0].pageX;

            //初始化状态下，判断用户的操作意图
            if (direStatus == 0) {
                //需要改变初始化状态
                if(Math.abs(_end_y - _start_y) > Math.abs(_end_x - _start_x)) {
                    //标注为上下
                    direStatus = 2;
                } else {
                    //标注为左右
                    direStatus = 1;
                }
            }
            if (direStatus == 1 && side) { //侧滑操作，进行删除
                //左滑
                //降低速度
                var _move = (_end_x - _start_x) / _speed;
                _speed = _speed + 0.015;
                if (_move > 0) {
                    _move = _target_x + _move;
                }
                if (_move < 0 && _move >= trueDelWidth) {
                    _$target[0].style.left = _move + "px";
                    //阻止事件冒泡
                    event.preventDefault();
                }
            } else if (direStatus == 2 && _down_refresh) { //刷新操作，刷新状态为开启
                //阻止事件冒泡
                event.stopPropagation();
                var _top = _end_y - _pull_up_height - _start_y;
                if (_$panle.scrollTop() <= 0 && _top >= -_pull_up_height && refresh_callback != 1) {
                    //降低速度
                    _top = _top / _speed;
                    _speed = _speed + 0.015;
                    _$panle_ctrl[0].style.top = _top + 'px';
                    //显示文字
                    if (_top < 50) {
                        _$pull_up_icon.show();
                        _$pull_up_text.show().text("下拉刷新");
                    } else if (_top < 100) {
                        _$pull_up_icon.show();
                        _$pull_up_text.show().text("松开刷新");
                        refresh = true;
                    }
                    //阻止事件冒泡
                    event.preventDefault();
                }
            }
        }, false);
        _$panle[0].addEventListener('touchend', function (event) {
            //侧滑，并存在目标对象
            if (direStatus == 1 && _$target.length > 0) {

                //获取当前目标的偏移
                var _left = parseInt(_$target[0].style.left);
                //小于总偏移量的一半，则自动填充
                if (_left < 0.5 * trueDelWidth) {
                    _$target.stop().animate({"left": trueDelWidth}, 20);
                } else {
                    _$target.stop().animate({"left": 0}, 20);
                }
            } else if (direStatus == 2 && _down_refresh) { //刷新操作，刷新状态为开启
                if (parseInt(_$panle_ctrl[0].style.top) >= - _pull_up_height) {
                    if (!refresh) {
                        _$panle_ctrl.animate({"top": -_pull_up_height}, 100);
                        _$pull_up_icon.hide();
                    } else {
                        _$panle_ctrl.animate({"top": 0}, 100);
                        //执行刷新
                        _$pull_up_text.text("正在刷新").siblings().addClass("pull-tip-running");
                        //触发回调
                        if ($.isFunction(params.down) && refresh_callback != 1) {
                            refresh_callback = 1;
                            //执行加载
                            params.down(_down_callback);
                        }
                    }
                }
            }
            //执行结束，重新初始化用户意图
            direStatus=0;
            _speed = 1;
            _target_x = 0;
            console.log("endnendndnn"+direStatus)
        }, false);

        _$panle[0].addEventListener('scroll', function (event) {
            if (loaded || !_up_load) return;
            var _down = _$panle[0].scrollHeight - _$panle.scrollTop() - _$panle.outerHeight();
            if (_pull_up_height - _down > 0) {
                _$pull_down_text.show();
                _$pull_down_icon.show().addClass("pull-tip-running");
            } else {
                _$pull_down_text.hide();
                _$pull_down_icon.hide();
            }
            if ( _pull_up_height - _down > 10) {
                //触发回调
                if ($.isFunction(params.up)) {
                    loaded = true;
                    //执行加载
                    params.up(_up_callback);
                }
            }

        }, false);

        //刷新回调
        var _down_callback = {
            done: function(){
                _$pull_up_text.stop().fadeOut();
                _$pull_up_icon.stop().fadeOut();
                var _pull_up_width = _$pull_up.outerWidth();
                _$pull_tip_complete.stop().animate({height: _pull_up_height}, 200);
                setTimeout(function(){
                    _$panle_ctrl.animate({"top": -_pull_up_height}, 100, function(){
                        _$pull_tip_complete.removeAttr("style");
                        _$pull_up_text.text("下拉刷新").siblings().removeClass("pull-tip-running");;
                        refresh = false;
                        //刷新回调完成
                        refresh_callback = 2;
                    });
                }, 1000);
            },
            //状态控制
            status: _refresh_load
        };

        //加载更多回调
        var _up_callback = {
            done: function(){
                _$pull_down_text.hide();
                _$pull_down_icon.hide();
                loaded = false;
            },
            //状态控制
            status: _refresh_load
        };

        //上拉和下拉开关
        var _refresh_load = {
            up: function(_status){
                _up_load = _status;
                if (!_status) _$pull_down.addClass("pull-close");
                else _$pull_down.removeClass("pull-close");
            },
            down: function(_status){
                _down_refresh = _status;
                if (!_status) _$pull_up.addClass("pull-close");
                else _$pull_up.removeClass("pull-close");
            }
        }

        //返回状态
        return _refresh_load;
    },

});
$.extend({
    //浮动层
    floatLayer: function(_id, _title, _msg, tool, _fn, _colse_fn) {
        //判断是否存在
        if ( $("#" + _id).length == 0 ) {
            //遮罩层
            var _html = "<div class='flayer-msg-mask box ver active' id='" + _id + "'>";
            //容器头部间隙
            _html += "<div class='flayer-panle-vspace'></div>";
            //浮动容器
            _html += "<div class='flayer-msg-panle box ver f1'>";

            //标题
            _html += "<div class='ub flayer-head'>";
            _html += "<div class='ub ub-f1'>" + _title + "</div>";
            _html += "<div class='iconfont flayer-close'>&#xe62c;</div>";
            _html += "</div>";
            //容器
            _html += "<div class='flayer-panle box bodyer f1' id='flayer-panle-cont'>" + _msg + "</div>";
            //按钮区域
            _html += "<div class='flayer-submit uh-sjwl-center'>";
            if (tool) {
                _html +="<div class='flayer-total uh-sjwl-center' id='subTotalNum'>已选择&nbsp;&nbsp;<span></span></div>"
                _html +="<div class='flayer-submit-a uh-sjwl-center'>"
                _html += "<a class='sjwl-tap-btn sjwl-tap-btn-green uh-sjwl-center' href='javascript:void(0);'>确 定</a>";
                _html += "</div>";
            }
            _html += "</div>";

            _html += "</div>";
            _html += "</div>";
            $("#body").append(_html);

            //事件绑定做一个延迟，防止点击时造成误点
            setTimeout(function(){
                // //关闭和弹出
                $("#" + _id + " .flayer-close").on("tap click", _close);
                // $("#" + _id).on("tap click", function(e){
                //     if (e.target.id != id) {
                //         return false;
                //     }
                //     _close();
                // });
                // $(".flayer-msg-panle").on("tap click", function(){
                //     return false;
                // });
                $("#" + _id).children(".flayer-msg-panle").addClass("flayer-msg-up");
                //提交事件
                $("#" + _id + " .sjwl-tap-btn").on("tap click",function(){
                    if ( $.isFunction(_fn) ) {
                        _fn();
                    }
                    return false;
                });
            }, 200);

            function _close(){
                _closeFlayer(_colse_fn);
            }

            //关闭弹出层
            function _closeFlayer(_colse_fn) {
                $(".par-total").removeClass("hide");
                $("#" + _id).children(".flayer-msg-panle").removeClass("flayer-msg-up")
                    .end().removeClass("active");
                setTimeout(function(){
                    //清楚页面对象
                    $("#" + _id).remove();
                    //关闭时的方法回调
                    if ( $.isFunction(_colse_fn) ) {
                        _colse_fn();
                    }
                }, 150);
            }
        }

        return {close: _close};
    },

});

