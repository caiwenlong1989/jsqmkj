;(function (window) {
	$.WOPOP_EFFECTS={};
	$.WOPOP_EFFECTS['fromleft']=function(dom,options){
		var orileft=parseInt($(dom).css('left'))||0;
		//褰撳脊绐楀鍣ㄨ缃湪鍙宠竟鏃讹紝骞朵笖涓嶅奖鍝嶅叾浠栨彃浠剁殑鍔ㄧ敾鏁堟灉
		if ($(dom).attr('type') == 'pop_up' && $(dom).css('left') == 'auto') {
			orileft = $('#scroll_container_bg').width()-$(dom).width();
		}
		var delay=$.WOPOP_EFFECTS._parseNum(options['delay'],1);
		var duration=$.WOPOP_EFFECTS._parseNum(options['duration'],1);
		
		_getEffectDom(dom).done(function(dom){
			$(dom).css('left',0-$(dom).width());
			dom.velocity({left:orileft+'px'},
			{delay:(delay*1000),duration: (duration*1000),display: "block",easing:'ease',complete:create_complete(options)})
		})
	}
	
	$.WOPOP_EFFECTS['frombottom']=function(dom,options){
		var oritop=parseInt($(dom).css('top'))||0;
		//褰撳脊绐楀鍣ㄨ缃湪搴曢儴鏃讹紝骞朵笖涓嶅奖鍝嶅叾浠栨彃浠剁殑鍔ㄧ敾鏁堟灉
		if ($(dom).attr('type') == 'pop_up' && $(dom).css('top') == 'auto') {
			oritop = $(window).height()-$(dom).height();
		}
		var delay=$.WOPOP_EFFECTS._parseNum(options['delay'],1);
		var duration=$.WOPOP_EFFECTS._parseNum(options['duration'],1);
		if(!$.wismobile||$.WOPOP_EFFECTS._isEditMode()){
			var container=$('#scroll_container');
		}else{
			var container=$(window);
		}
		_getEffectDom(dom).done(function(dom){
			//寮圭獥瀹瑰櫒鍐呭瓙鎻掍欢浠庝笅椋炲嚭鏁堟灉璋冩暣锛屼笉褰卞搷鍏跺畠鎻掍欢
			if ($(dom).parents('.cstlayer').attr('type') == 'pop_up') {
				$(dom).css('top',$(dom).parents('.cstlayer').height());
			} else {
				$(dom).css('top',container.scrollTop()+container.height()+$(dom).height());
			}
			dom.velocity({top:oritop+'px'},
			{delay:(delay*1000),duration: (duration*1000),display: "block",easing:'ease',complete:create_complete(options)})
		})
	}
	
	$.WOPOP_EFFECTS['fromright']=function(dom,options){
		var orileft=parseInt($(dom).css('left'))||0;
		//褰撳脊绐楀鍣ㄨ缃湪鍙宠竟鏃讹紝骞朵笖涓嶅奖鍝嶅叾浠栨彃浠剁殑鍔ㄧ敾鏁堟灉
		if ($(dom).attr('type') == 'pop_up' && $(dom).css('left') == 'auto') {
			orileft = $('#scroll_container_bg').width()-$(dom).width();
		}
		var delay=$.WOPOP_EFFECTS._parseNum(options['delay'],1);
		var duration=$.WOPOP_EFFECTS._parseNum(options['duration'],1);
		if(!$.wismobile||$.WOPOP_EFFECTS._isEditMode()){
			var container=$('#scroll_container');
		}else{
			var container=$(window);
		}
		_getEffectDom(dom).done(function(dom){
			//寮圭獥瀹瑰櫒浠ュ強鍏跺唴瀛愭彃浠朵粠鍙抽鍑烘晥鏋滆皟鏁达紝涓嶅奖鍝嶅叾瀹冩彃浠�
			if ($(dom).attr('type') == 'pop_up') {
				$(dom).css('left',container.width());
			} else if($(dom).parents('.cstlayer').attr('type') == 'pop_up') {
				$(dom).css('left',$(dom).parents('.cstlayer').width());
			} else {
				$(dom).css('left',container.width()-$(dom).width());
			}
			dom.velocity({left:orileft+'px'},
			{delay:(delay*1000),duration: (duration*1000),display: "block",easing:'ease',complete:create_complete(options)})
		})
	}
	
	$.WOPOP_EFFECTS['fromtop']=function(dom,options){
		var oritop=parseInt($(dom).css('top'))||0;
		//褰撳脊绐楀鍣ㄨ缃湪搴曢儴鏃讹紝骞朵笖涓嶅奖鍝嶅叾浠栨彃浠剁殑鍔ㄧ敾鏁堟灉
		if ($(dom).attr('type') == 'pop_up' && $(dom).css('top') == 'auto') {
			oritop = $(window).height()-$(dom).height();
		}
		var delay=$.WOPOP_EFFECTS._parseNum(options['delay'],1);
		var duration=$.WOPOP_EFFECTS._parseNum(options['duration'],1);
		if(!$.wismobile||$.WOPOP_EFFECTS._isEditMode()){
			var container=$('#scroll_container');
		}else{
			var container=$(window);
		}
		_getEffectDom(dom).done(function(dom){
			// 鑰冭檻銆岄€氭爮銆嶅厓绱狅紙bug#4284锛�
			var $layer = $(dom),
			initop = ($layer.attr("fatherid")||"").length ? 0 : (container.scrollTop() - $(dom).height());
			//寮圭獥瀹瑰櫒鍐呭瓙鎻掍欢浠庝笂椋炲嚭鏁堟灉璋冩暣锛屼笉褰卞搷鍏跺畠鎻掍欢
			if ($(dom).parents('.cstlayer').attr('type') == 'pop_up') {
				$layer.css('top',0-($(dom).height()));
			} else {
				$layer.css("top", initop);
			}
			//$(dom).css('top',container.scrollTop()-$(dom).height());
			dom.velocity({top:oritop+'px'},
			{delay:(delay*1000),duration: (duration*1000),display: "block",easing:'ease',complete:create_complete(options)})
		})
	}
	
	$.WOPOP_EFFECTS['fade']=function(dom,options){
		var orival=parseInt($(dom).css('opacity'))||1;
		var delay=$.WOPOP_EFFECTS._parseNum(options['delay'],1);
		var duration=$.WOPOP_EFFECTS._parseNum(options['duration'],1);
		
		_getEffectDom(dom).done(function(dom){
			$(dom).css('opacity',0);
			dom.velocity({opacity:orival},
			{delay:(delay*1000),duration: (duration*1000),display: "block",easing:'ease-out',complete:create_complete(options)})
		})
	}
	
	$.WOPOP_EFFECTS['rotation']=function(dom,options){
		var delay=$.WOPOP_EFFECTS._parseNum(options['delay'],1);
		var duration=$.WOPOP_EFFECTS._parseNum(options['duration'],1);
		$.Velocity.hook($(dom), "rotateY", "180deg");
		$(dom).show();
		_getEffectDom(dom).done(function(dom){
			dom.velocity({rotateY:["0deg","180deg"]},
			{delay:(delay*1000),duration: (duration*1000),display: "block",easing:'ease',complete:create_complete(options)})
		})
	}
	
	$.WOPOP_EFFECTS['rotation2d']=function(dom,options){
		var delay=$.WOPOP_EFFECTS._parseNum(options['delay'],1);
		var duration=$.WOPOP_EFFECTS._parseNum(options['duration'],1);
		$(dom).show();
		_getEffectDom(dom).done(function(dom){
			dom.velocity({rotateZ:["360deg","0deg"]},
			{delay:(delay*1000),duration: (duration*1000),display: "block",easing:'linear'})
			.velocity({rotateZ:["360deg","0deg"]},
			{delay:0,duration: (duration*1000),display: "block",loop:true,easing:'linear',complete:create_complete(options)})
		})
	}
	
	$.WOPOP_EFFECTS['bounceIn']=function(dom,options){
		var delay=$.WOPOP_EFFECTS._parseNum(options['delay'],1);
		var duration=$.WOPOP_EFFECTS._parseNum(options['duration'],1);
		$.Velocity.hook($(dom), "scale", "0.3");
		$(dom).css('opacity',0);
		_getEffectDom(dom).done(function(dom){
			dom
			.velocity({scale:[1.05,0.3],opacity:[1,0]},{delay:(delay*1000),duration: (duration*333),display: "block"})
			.velocity({scale:[0.7,1.05]},{delay:0,duration: (duration*333),display: "block"})
			.velocity({scale:[1,0.7]},{delay:0,duration: (duration*333),display: "block",complete:create_complete(options)})
		})
	}
	
	$.WOPOP_EFFECTS['big2small']=function(dom,options){
		var delay=$.WOPOP_EFFECTS._parseNum(options['delay'],1);
		var duration=$.WOPOP_EFFECTS._parseNum(options['duration'],1);
		$.Velocity.hook($(dom), "scale", "2");
		_getEffectDom(dom).done(function(dom){
			dom.velocity({scale:[1,2],opacity:[1,0]},
			{delay:(delay*1000),duration: (duration*1000),display: "block",easing:'ease-in',complete:create_complete(options)})
		})
	}
	
	$.WOPOP_EFFECTS['small2big']=function(dom,options){
		var delay=$.WOPOP_EFFECTS._parseNum(options['delay'],1);
		var duration=$.WOPOP_EFFECTS._parseNum(options['duration'],1);
		$.Velocity.hook($(dom), "scale", "0.5");
		_getEffectDom(dom).done(function(dom){
			dom.velocity({scale:[1,0.5],opacity:[1,0]},
			{delay:(delay*1000),duration: (duration*1000),display: "block",easing:'ease-in',complete:create_complete(options)})
		})
	}
	
	$.WOPOP_EFFECTS['fadeFromLeft']=function(dom,options){
		var orileft=parseInt($(dom).css('left'))||0;
		//褰撳脊绐楀鍣ㄨ缃湪鍙宠竟鏃讹紝骞朵笖涓嶅奖鍝嶅叾浠栨彃浠剁殑鍔ㄧ敾鏁堟灉
		if ($(dom).attr('type') == 'pop_up' && $(dom).css('left') == 'auto') {
			orileft = $('#scroll_container_bg').width()-$(dom).width();
		}
		var orival=parseInt($(dom).css('opacity'))||1;
		var delay=$.WOPOP_EFFECTS._parseNum(options['delay'],1);
		var duration=$.WOPOP_EFFECTS._parseNum(options['duration'],1);
		
		_getEffectDom(dom).done(function(dom){
			$(dom).css('left',0-$(dom).width());
			$(dom).css('opacity',0);
			dom.velocity({left:orileft+'px',opacity:orival},
			{delay:(delay*1000),duration: (duration*1000),display: "block",easing:'ease',complete:create_complete(options)})
		})
	}
	
	$.WOPOP_EFFECTS['fadeFromBottom']=function(dom,options){
		var oritop=parseInt($(dom).css('top'))||0;
		//褰撳脊绐楀鍣ㄨ缃湪搴曢儴鏃讹紝骞朵笖涓嶅奖鍝嶅叾浠栨彃浠剁殑鍔ㄧ敾鏁堟灉
		if ($(dom).attr('type') == 'pop_up' && $(dom).css('top') == 'auto') {
			oritop = $(window).height()-$(dom).height();
		}
		var orival=parseInt($(dom).css('opacity'))||1;
		var delay=$.WOPOP_EFFECTS._parseNum(options['delay'],1);
		var duration=$.WOPOP_EFFECTS._parseNum(options['duration'],1);
		if(!$.wismobile||$.WOPOP_EFFECTS._isEditMode()){
			var container=$('#scroll_container');
		}else{
			var container=$(window);
		}
		_getEffectDom(dom).done(function(dom){
			//寮圭獥瀹瑰櫒鍐呭瓙鎻掍欢浠庝笅娣″嚭鏁堟灉璋冩暣锛屼笉褰卞搷鍏跺畠鎻掍欢
			if ($(dom).parents('.cstlayer').attr('type') == 'pop_up') {
				$(dom).css('top',$(dom).parents('.cstlayer').height());
			} else {
				$(dom).css('top',container.scrollTop()+container.height()+$(dom).height());
			}
			$(dom).css('opacity',0);
			dom.velocity({top:oritop+'px',opacity:orival},
			{delay:(delay*1000),duration: (duration*1000),display: "block",easing:'ease',complete:create_complete(options)})
		})
	}
	
	$.WOPOP_EFFECTS['fadeFromRight']=function(dom,options){
		var orileft=parseInt($(dom).css('left'))||0;
		//褰撳脊绐楀鍣ㄨ缃湪鍙宠竟鏃讹紝骞朵笖涓嶅奖鍝嶅叾浠栨彃浠剁殑鍔ㄧ敾鏁堟灉
		if ($(dom).attr('type') == 'pop_up' && $(dom).css('left') == 'auto') {
			orileft = $('#scroll_container_bg').width()-$(dom).width();
		}
		var orival=parseInt($(dom).css('opacity'))||1;
		var delay=$.WOPOP_EFFECTS._parseNum(options['delay'],1);
		var duration=$.WOPOP_EFFECTS._parseNum(options['duration'],1);
		if(!$.wismobile||$.WOPOP_EFFECTS._isEditMode()){
			var container=$('#scroll_container');
		}else{
			var container=$(window);
		}
		_getEffectDom(dom).done(function(dom){
			//寮圭獥瀹瑰櫒浠ュ強鍏跺唴瀛愭彃浠朵粠鍙虫贰鍑烘晥鏋滆皟鏁达紝涓嶅奖鍝嶅叾瀹冩彃浠�
			if ($(dom).attr('type') == 'pop_up') {
				$(dom).css('left',container.width());
			} else if ($(dom).parents('.cstlayer').attr('type') == 'pop_up') {
				$(dom).css('left',$(dom).parents('.cstlayer').width());
			} else {
				$(dom).css('left',container.width()-$(dom).width());
			}
			dom.velocity({left:orileft+'px',opacity:orival},
			{delay:(delay*1000),duration: (duration*1000),display: "block",easing:'ease',complete:create_complete(options)})
		})
	}
	
	$.WOPOP_EFFECTS['fadeFromTop']=function(dom,options){
		var oritop=parseInt($(dom).css('top'))||0;
		//褰撳脊绐楀鍣ㄨ缃湪搴曢儴鏃讹紝骞朵笖涓嶅奖鍝嶅叾浠栨彃浠剁殑鍔ㄧ敾鏁堟灉
		if ($(dom).attr('type') == 'pop_up' && $(dom).css('top') == 'auto') {
			oritop = $(window).height()-$(dom).height();
		}
		var orival=parseInt($(dom).css('opacity'))||1;
		var delay=$.WOPOP_EFFECTS._parseNum(options['delay'],1);
		var duration=$.WOPOP_EFFECTS._parseNum(options['duration'],1);
		if(!$.wismobile||$.WOPOP_EFFECTS._isEditMode()){
			var container=$('#scroll_container');
		}else{
			var container=$(window);
		}
		_getEffectDom(dom).done(function(dom){
			//寮圭獥瀹瑰櫒鍐呭瓙鎻掍欢浠庝笂娣″嚭鏁堟灉璋冩暣锛屼笉褰卞搷鍏跺畠鎻掍欢
			if ($(dom).parents('.cstlayer').attr('type') == 'pop_up') {
				$(dom).css('top',0-($(dom).height()));
			} else {
				$(dom).css('top',0-(container.scrollTop()+$(dom).height()+container.height()));
			}
			dom.velocity({top:oritop+'px',opacity:orival},
			{delay:(delay*1000),duration: (duration*1000),display: "block",easing:'ease',complete:create_complete(options)})
		})
	}
	
	$.WOPOP_EFFECTS['light']=function(dom,options){
		var delay=$.WOPOP_EFFECTS._parseNum(options['delay'],1);
		var duration=$.WOPOP_EFFECTS._parseNum(options['duration'],1);

		_getEffectDom(dom).done(function(dom){
			dom.velocity({opacity: 1},
			{delay:(delay*1000),duration:(duration*500),display: "block",easing:'ease-in-out'})
			.velocity({opacity:[0,1]},
			{delay:0,duration: (duration*500),display: "block",loop:true,easing:'ease-in-out',complete:create_complete(options)})
		})
	}

	$.WOPOP_EFFECTS['effect.frombottom']=function(dom,options){
		var reverse_effect=options['effect']+'reverse';
		var oritop=parseInt($(dom).css('top'))||0;
		var delay=$.WOPOP_EFFECTS._parseNum(options['delay'],1);
		var duration=$.WOPOP_EFFECTS._parseNum(options['duration'],1);
        var type=options['type'];
		if(!$.wismobile||$.WOPOP_EFFECTS._isEditMode()){
			var container=$('#scroll_container');
		}else{
			var container=$(window);
		}
		_getEffectDom(dom).done(function(dom){
            var initop=container.scrollTop()+container.height()+$(dom).height();
            if(type=='jfpro_list' || type=='groupon_list' || type=='seckill_list' || type=='product_list' || type=='tb_product_list' || type=='graphic' || type=='article_list'){
                initop =  $(dom).height();
            }

            initop=parseInt(initop);
            oritop=parseInt(oritop);
			$(dom).css('top',initop+'px');
			dom.velocity({top:oritop+'px'},
				{delay:0,duration: duration,display: "block",easing:'ease',begin:create_begin(),complete:create_complete(options)}).velocity("reverse", { queue: reverse_effect })
		})
	}

    $.WOPOP_EFFECTS['effect.fromtop']=function(dom,options){
		var reverse_effect=options['effect']+'reverse';
        var oritop=parseInt($(dom).css('top'))||0;
        var type=options['type'];
        var delay=$.WOPOP_EFFECTS._parseNum(options['delay'],1);
        var duration=$.WOPOP_EFFECTS._parseNum(options['duration'],1);
        if(!$.wismobile||$.WOPOP_EFFECTS._isEditMode()){
            var container=$('#scroll_container');
        }else{
            var container=$(window);
        }
        _getEffectDom(dom).done(function(dom){
            // 鑰冭檻銆岄€氭爮銆嶅厓绱狅紙bug#4284锛�
            var $layer = $(dom),
                initop = ($layer.attr("fatherid")||"").length ? 0 : (container.scrollTop() - $(dom).height());
            if(type=='jfpro_list' || type=='groupon_list' || type=='seckill_list' || type=='product_list' || type=='tb_product_list' || type=='graphic' || type=='article_list'){
                initop =  $(dom).height();
                initop='-'+initop;
            }
            initop=parseInt(initop);
            oritop=parseInt(oritop);
            $layer.css("top", initop+'px');
            // $(dom).css('top',container.scrollTop()-$(dom).height());
            dom.velocity({top:oritop+'px'},
                {delay:0,duration: duration,display: "block",easing:'ease',begin:create_begin(),complete:create_complete(options)}).velocity("reverse", { queue: reverse_effect })
        })
    }
    //鏀惧ぇ
	$.WOPOP_EFFECTS['effect.zoomin']=function(dom,options,hover){
            var display = 'block';
			var is_product_list = false;
            if(options['type']=='tb_product_list' && dom.css("display")){
                display = dom.css("display");
            }
			 if(options['type']=='product_list'){				
				 is_product_list = true;
			 }
		var reverse_effect=options['effect']+'reverse';
		var delay=$.WOPOP_EFFECTS._parseNum(options['delay'],1);
		var duration=$.WOPOP_EFFECTS._parseNum(options['duration'],1);
		_getEffectDom(dom).done(function(dom){
			if(hover==1){
				dom.velocity({scale:[1.1]},
					{delay:0,duration: duration,display: display,easing:'ease',begin:create_begin(),complete:create_complete(options)})
					.velocity({scale:[1]}, { queue: reverse_effect,duration: duration })
			}else{
				dom.velocity({scale:[1.1]},
					{delay:0,duration: duration,display: "block",easing:'ease',begin:create_begin(),complete:create_complete(options)})
					.velocity({scale:[1]}, {duration: duration })
			}
			if(is_product_list){
				var doms = dom.siblings(".imgmask");
				if(doms){
					var dheight = parseInt(dom.height()*1.05),thisheight = doms.height() ;
					if(hover==1){
						doms.css("margin-top",(dheight-thisheight)+'px').velocity({scale:[1.1]},
								{delay:0,duration: duration,display: display,easing:'ease',begin:create_begin(),complete:create_complete(options)})
								.velocity({scale:[1]}, { queue: reverse_effect,duration: duration })
					}else{
						doms.css("margin-top",(dheight-thisheight)+'px').velocity({scale:[1.1]},
							{delay:0,duration: duration,display: "block",easing:'ease',begin:create_begin(),complete:create_complete(options)})
							.velocity({scale:[1]}, {duration: duration })
					}
				}
			}
		})
	}

    //浠庡皬鍒板ぇ
	$.WOPOP_EFFECTS['effect.small2big']=function(dom,options,hover){
		var reverse_effect=options['effect']+'reverse';
		var delay=$.WOPOP_EFFECTS._parseNum(options['delay'],1);
		var duration=$.WOPOP_EFFECTS._parseNum(options['duration'],1);
		$.Velocity.hook($(dom), "scale", [0]);
		_getEffectDom(dom).done(function(dom){
			if(hover==1){
				dom.velocity({scale:[1.1]},
					{delay:0,duration: duration,display: "block",easing:'ease',begin:create_begin(),complete:create_complete(options)})
					.velocity({scale:[0]}, { queue: reverse_effect,duration: duration })
			}else{
				dom.velocity({scale:[1.1]},
					{delay:0,duration: duration,display: "block",easing:'ease',begin:create_begin(),complete:create_complete(options)})
					.velocity({scale:[0]})
			}
		})
	}
	//缂╁皬
	$.WOPOP_EFFECTS['effect.zoomout']=function(dom,options,hover){
		var delay=$.WOPOP_EFFECTS._parseNum(options['delay'],1);
		var duration=$.WOPOP_EFFECTS._parseNum(options['duration'],1);
		var reverse_effect=options['effect']+'reverse';
		_getEffectDom(dom).done(function(dom){
            var dom_display = 'block';
            var old_dom_display = dom.css('display');
            if(old_dom_display) dom_display = old_dom_display;
			if(hover==1){
				dom.velocity({scale:[.9]},
					{delay:0,duration: duration,display: dom_display,easing:'ease-in',begin:create_begin(),complete:create_complete(options)})
					.velocity({scale:[1]}, { queue: reverse_effect,duration: duration})
			}else{
				dom.velocity({scale:[.9]},
					{delay:0,duration: duration,display: dom_display,easing:'ease-in',begin:create_begin(),complete:create_complete(options)})
					.velocity("reverse")
			}
		})
	}
	//浠庡ぇ鍒板皬
	$.WOPOP_EFFECTS['effect.big2small']=function(dom,options,hover){
		var delay=$.WOPOP_EFFECTS._parseNum(options['delay'],1);
		var duration=$.WOPOP_EFFECTS._parseNum(options['duration'],1);
		var reverse_effect=options['effect']+'reverse';
		// $.Velocity.hook($(dom), "scale", [1.3]);
		_getEffectDom(dom).done(function(dom){
			if(hover==1){
				dom.velocity({scale:[.9]},
					{delay:0,duration: duration,display: "block",easing:'ease-in',begin:create_begin(),complete:create_complete(options)})
					.velocity({scale:[1.1]}, { queue: reverse_effect,duration: duration,display: "none"})
			}else{
				dom.velocity({scale:[.9]},
					{delay:0,duration: duration,display: "block",easing:'ease-in',begin:create_begin(),complete:create_complete(options)})
					.velocity({scale:[1.1]}, {duration: duration,display: "none"})
			}
		})
	}

	$.WOPOP_EFFECTS['effect.moveleft']=function(dom,options,hover){
		var delay=$.WOPOP_EFFECTS._parseNum(options['delay'],1);
		var duration=$.WOPOP_EFFECTS._parseNum(options['duration'],1);
		var reverse_effect=options['effect']+'reverse';
		_getEffectDom(dom).done(function(dom){
			if(hover==1){
				dom.velocity({translateX:'-5%'},
					{delay:0,duration: duration,display: "block",easing:'ease-in',begin:create_begin(),complete:create_complete(options)})
					.velocity({translateX:'0'}, { queue: reverse_effect,duration: duration })
			}else{
				dom.velocity({translateX:'-5%'},
					{delay:0,duration: duration,display: "block",easing:'ease-in',begin:create_begin(),complete:create_complete(options)})
					.velocity("reverse")
			}
		})
	}

	$.WOPOP_EFFECTS['effect.moveright']=function(dom,options,hover){
		var delay=$.WOPOP_EFFECTS._parseNum(options['delay'],1);
		var duration=$.WOPOP_EFFECTS._parseNum(options['duration'],1);
		var reverse_effect=options['effect']+'reverse';
		_getEffectDom(dom).done(function(dom){
			if(hover==1){
				dom.velocity({translateX:'5%'},
					{delay:0,duration: duration,display: "block",easing:'ease-in',begin:create_begin(),complete:create_complete(options)})
					.velocity({translateX:"0"}, { queue: reverse_effect,duration: duration })
			}else{
				dom.velocity({translateX:'5%'},
					{delay:0,duration: duration,display: "block",easing:'ease-in',begin:create_begin(),complete:create_complete(options)})
					.velocity("reverse")
			}
		})
	}

	$.WOPOP_EFFECTS['effect.movetop']=function(dom,options,hover){
		var delay=$.WOPOP_EFFECTS._parseNum(options['delay'],1);
		var duration=$.WOPOP_EFFECTS._parseNum(options['duration'],1);
		var reverse_effect=options['effect']+'reverse';
		_getEffectDom(dom).done(function(dom){
			if(hover==1){
				dom.velocity({translateY:'-5%'},
					{delay:0,duration: duration,display: "block",easing:'ease-in',begin:create_begin(),complete:create_complete(options)})
					.velocity({translateY:'0'}, { queue: reverse_effect,duration: duration })
			}else{
				dom.velocity({translateY:'-5%'},
					{delay:0,duration: duration,display: "block",easing:'ease-in',begin:create_begin(),complete:create_complete(options)})
					.velocity("reverse")
			}
		})
	}

	$.WOPOP_EFFECTS['effect.movebottom']=function(dom,options,hover){
		var delay=$.WOPOP_EFFECTS._parseNum(options['delay'],1);
		var duration=$.WOPOP_EFFECTS._parseNum(options['duration'],1);
		var reverse_effect=options['effect']+'reverse';
		_getEffectDom(dom).done(function(dom){
			if(hover==1){
				dom.velocity({translateY:'5%'},
					{delay:0,duration: duration,display: "block",easing:'ease-in',begin:create_begin(),complete:create_complete(options)})
					.velocity({translateY:'0'}, { queue: reverse_effect,duration: duration })
			}else{
				dom.velocity({translateY:'5%'},
					{delay:0,duration: duration,display: "block",easing:'ease-in',begin:create_begin(),complete:create_complete(options)})
					.velocity("reverse")
			}
		})
	}

	$.WOPOP_EFFECTS['effect.rotation']=function(dom,options){
		var delay=$.WOPOP_EFFECTS._parseNum(options['delay'],1);
		var duration=$.WOPOP_EFFECTS._parseNum(options['duration'],1);
		$.Velocity.hook($(dom), "rotateY", "180deg");
		_getEffectDom(dom).done(function(dom){
			dom.velocity({rotateY:["0deg","180deg"]},
				{delay:0,duration: duration,display: "block",easing:'ease',begin:create_begin(),complete:create_complete(options)})
		})
	}

	$.WOPOP_EFFECTS['effect.bounce']=function(dom,options){
		var delay=$.WOPOP_EFFECTS._parseNum(options['delay'],1);
		var duration=$.WOPOP_EFFECTS._parseNum(options['duration'],1);
		$(dom).show();
		_getEffectDom(dom).done(function(dom){
			dom.velocity("callout.bounce",
				{delay:0,duration: duration,display: "block",easing:'ease',begin:create_begin(),complete:create_complete(options)})
		})
	}

	$.WOPOP_EFFECTS['effect.shake']=function(dom,options){
		var delay=$.WOPOP_EFFECTS._parseNum(options['delay'],1);
		var duration=$.WOPOP_EFFECTS._parseNum(options['duration'],1);
		_getEffectDom(dom).done(function(dom){
			dom.velocity("callout.shake",
				{delay:0,duration: duration,display: "block",easing:'ease',begin:create_begin(),complete:create_complete(options)})
		})
	}
	$.WOPOP_EFFECTS['effect.flash']=function(dom,options){
		var delay=$.WOPOP_EFFECTS._parseNum(options['delay'],1);
		var duration=$.WOPOP_EFFECTS._parseNum(options['duration'],1);
		_getEffectDom(dom).done(function(dom){
			dom.velocity("callout.flash",
				{delay:0,duration: duration,display: "block",easing:'ease',begin:create_begin(),complete:create_complete(options)})
		})
	}

	$.WOPOP_EFFECTS['effect.pulse']=function(dom,options){
		var delay=$.WOPOP_EFFECTS._parseNum(options['delay'],1);
		var duration=$.WOPOP_EFFECTS._parseNum(options['duration'],1);
		_getEffectDom(dom).done(function(dom){
			dom.velocity("callout.pulse",
				{delay:0,duration: duration,display: "block",easing:'ease',begin:create_begin(),complete:create_complete(options)})
		})
	}

	$.WOPOP_EFFECTS['effect.swing']=function(dom,options){
		var delay=$.WOPOP_EFFECTS._parseNum(options['delay'],1);
		var duration=$.WOPOP_EFFECTS._parseNum(options['duration'],1);
		_getEffectDom(dom).done(function(dom){
			dom.velocity("callout.swing",
				{delay:0,duration: duration,display: "block",easing:'ease',begin:create_begin(),complete:create_complete(options)})
		})
	}

	$.WOPOP_EFFECTS['effect.tada']=function(dom,options){
		var delay=$.WOPOP_EFFECTS._parseNum(options['delay'],1);
		var duration=$.WOPOP_EFFECTS._parseNum(options['duration'],1);
		_getEffectDom(dom).done(function(dom){
			dom.velocity("callout.tada",
				{delay:0,duration: duration,display: "block",easing:'ease',begin:create_begin(),complete:create_complete(options)})
		})
	}
//transition.fadeIn
	$.WOPOP_EFFECTS['effect.fade']=function(dom,options,hover){
		var reverse_effect=options['effect']+'reverse';
		var delay=$.WOPOP_EFFECTS._parseNum(options['delay'],1);
		var duration=$.WOPOP_EFFECTS._parseNum(options['duration'],1);
		_getEffectDom(dom).done(function(dom){
			if(hover==1){
				dom.velocity("transition.fadeIn", { duration: duration })
					.velocity("transition.fadeOut", { queue: reverse_effect,duration: duration })
			}else{
				dom.velocity("transition.fadeIn", { duration: duration }).velocity("reverse",{delay:500});
			}
		})
	}

	$.WOPOP_EFFECTS['effect.slidedown']=function(dom,options,hover){
		var delay=$.WOPOP_EFFECTS._parseNum(options['delay'],1);
		var duration=$.WOPOP_EFFECTS._parseNum(options['duration'],1);
		var reverse_effect=options['effect']+'reverse';
		_getEffectDom(dom).done(function(dom){
			var domtop=parseInt(dom.css('top'));
			var lasttop='';
			if(domtop){
				lasttop=domtop;
			}else{
				lasttop=0;
			}
			var $top=$(dom).height();
			$(dom).css('top','-'+$top+'px');
			if(hover==1){
				dom.velocity({top:0},
					{delay:0,duration: duration,display: "block",easing:'ease-in',begin:create_begin(),complete:create_complete(options)})
					.velocity({top:-$top}, { queue: reverse_effect,duration: duration })
			}else{
				dom.velocity({top:0},
					{delay:0,duration: duration,display: "block",easing:'ease-in',begin:create_begin(),complete:create_complete(options)})
					.velocity({top:-$top},{delay:600} )
			}

		})
	}

	$.WOPOP_EFFECTS['effect.slidetop']=function(dom,options,hover){
		var delay=$.WOPOP_EFFECTS._parseNum(options['delay'],1);
		var duration=$.WOPOP_EFFECTS._parseNum(options['duration'],1);
		var reverse_effect=options['effect']+'reverse';
		_getEffectDom(dom).done(function(dom){
			var $top=$(dom).height();
                        var org_top = $(dom).attr('data-top');
                        if(!org_top){org_top=0;}
			if(hover==1){
				$(dom).css('top',$top+'px');
				dom.velocity({top:org_top},
					{delay:0,duration: duration,display: "block",easing:'ease-in',begin:create_begin(),complete:create_complete(options)})
					.velocity({top:$top}, { queue: reverse_effect })
			}else{
				$(dom).css('top',$top+'px');
				dom.velocity({top:org_top},
					{delay:0,duration: duration,display: "block",easing:'ease-in',begin:create_begin(),complete:create_complete(options)})
					.velocity({top:$top},{delay:600})
			}
		})
	}

	$.WOPOP_EFFECTS['effect.slideleft']=function(dom,options){
		var delay=$.WOPOP_EFFECTS._parseNum(options['delay'],1);
		var duration=$.WOPOP_EFFECTS._parseNum(options['duration'],1);
		var reverse_effect=options['effect']+'reverse';
		_getEffectDom(dom).done(function(dom){
			var $left=$(dom).width();
			$(dom).css('left','-'+$left+'px');
			dom.velocity({left:0},
				{delay:0,duration: duration,display: "block",easing:'ease-in',begin:create_begin(),complete:create_complete(options)})
				.velocity({left:-$left}, { queue: reverse_effect })
		})
	}


	$.WOPOP_EFFECTS['effect.slideright']=function(dom,options){
		var delay=$.WOPOP_EFFECTS._parseNum(options['delay'],1);
		var duration=$.WOPOP_EFFECTS._parseNum(options['duration'],1);
		var reverse_effect=options['effect']+'reverse';
		_getEffectDom(dom).done(function(dom){
			var $left=$(dom).width();
			$(dom).css('left',$left+'px');
			dom.velocity({left:0},
				{delay:0,duration: duration,display: "block",easing:'ease-in',begin:create_begin(),complete:create_complete(options)})
				.velocity({left:$left}, { queue: reverse_effect })
		})
	}

    $.WOPOP_EFFECTS['shutter.horizontal']=function(dom,options){
        var delay=$.WOPOP_EFFECTS._parseNum(options['delay'],1);
        var duration=$.WOPOP_EFFECTS._parseNum(options['duration'],1);
		var reverse_effect=options['effect']+'reverse';
        $.Velocity.hook($(dom), "transformOriginX", [ "50%", "50%" ]);
        $.Velocity.hook($(dom), "scaleX", 0);
        _getEffectDom(dom).done(function(dom){
            dom.velocity({scaleX: 1},
                {delay:0,duration: duration,display: "block",easing:'ease-out',begin:create_begin(),complete:create_complete(options)})
				.velocity({scaleX:0}, { queue: reverse_effect })
        })
    }

    $.WOPOP_EFFECTS['shutter.vertical']=function(dom,options){
        var delay=$.WOPOP_EFFECTS._parseNum(options['delay'],1);
        var duration=$.WOPOP_EFFECTS._parseNum(options['duration'],1);
		var reverse_effect=options['effect']+'reverse';
        $.Velocity.hook($(dom), "transformOriginY", [ "50%", "50%" ]);
        $.Velocity.hook($(dom), "scaleY", 0);
        _getEffectDom(dom).done(function(dom){
            dom.velocity({scaleY: 1},
                {delay:0,duration: duration,display: "block",easing:'ease-out',begin:create_begin(),complete:create_complete(options)})
				.velocity({scaleY: 0}, { queue: reverse_effect })
        })
    }
	
	var effect_map = 'callout.bounce,callout.shake,callout.flash,callout.pulse,callout.swing,callout.tada,';
	effect_map += 'transition.flipBounceXOut,transition.flipBounceYOut,transition.whirlOut,transition.shrinkOut,transition.perspectiveLeftOut,';
	effect_map += 'transition.expandOut,transition.bounceOut,transition.slideUpBigOut,transition.slideDownBigOut,transition.perspectiveRightOut,';
	effect_map += 'transition.slideLeftBigOut,transition.slideRightBigOut,transition.perspectiveUpOut,transition.perspectiveDownOut';
	$.each(effect_map.split(','), function(i, effect_name){
		$.WOPOP_EFFECTS[effect_name] = function(dom, options){
			var delay = $.WOPOP_EFFECTS._parseNum(options['delay'], 1);
			var duration = $.WOPOP_EFFECTS._parseNum(options['duration'], 1);
			var l = 0,loop = $.WOPOP_EFFECTS._parseNum(options['loop'], 0),
			loop_infinite = $.WOPOP_EFFECTS._parseNum(options['loop_infinite'], 0);
			
			_getEffectDom(dom).done(function(dom){
				(function(){
					var self = arguments.callee;
					dom.velocity(effect_name, {
						delay: (delay * 1000),duration: (duration * 1000),
						display: 'block',complete: function(){
							if (loop_infinite ? true : l < loop) self();
							else create_complete(options).call(this);
							l++;
						}
					});
				})();
			});
		};
	});
	
	function create_complete(effects){
		//杩斿洖conplete鍑芥暟
		return function(){
			var dom=$(this);
            $(dom).data('run',0);
			if(dom.data('wopop_effect_oristyle')){
				dom.attr('style',dom.data('wopop_effect_oristyle')).show();
				dom.removeData('wopop_effect_oristyle');
			}
			dom.trigger('effect_complete');
			dom.removeClass('now_effecting');
			var cancontainer=$('#overflow_canvas_container');
			if(cancontainer.length){
				var stacks=cancontainer.data('stacks');
				if(stacks && stacks.length){
					var newstacks=[];
					for(var i=0;i<stacks.length;i++){
						if(!stacks[i].is(dom)){
							newstacks.push(stacks[i]);
						}
					}
					cancontainer.data('stacks',newstacks);
					if(!newstacks.length){
						cancontainer.css('overflow-y','').css('height','').removeData('is_overflow');
					}
				}
			}
		}
	}
	function create_begin(){
	    return function () {
            var dom=$(this);
            $(dom).data('run',1);
        }
    }
	
	$.fn.showEffects=function(force_show,show_effects){
		$.Velocity.defaults.mobileHA=false;
		var fullpagedom=$('.fullpage_alllist');
		var browsersupport=!($.browser.msie && $.browser.version <9); //IE 9浠ヤ笅涓嶆敮鎸佸姩鐢绘晥鏋�
		if(!fullpagedom.length || force_show){
			return this.each(function() {
				var self = $(this); 
				var effects=show_effects;
				if(!(effects&&effects.effect)) effects=self.data('wopop_effects');
				if(effects&&effects.effect){
					var deg=self.data('deg')||self.attr('deg')||0;
					// 鍥哄畾閫氭爮閲屾樉绀哄姩鐢�
					var infixedparentel=self.closest('.full_column[infixed=1],.cstlayer[infixed=1]');
					if(infixedparentel.length){
						if(infixedparentel.parent().is('#canvas')&&parseInt(infixedparentel.css('top'))==0){
							return;
						}
						if(self.is('.now_effecting')) return;
					}
					var style=self.attr('style').replace(/display:\s*none\s*;?/,'');
					if(!deg){
						style=style.replace(/ (-\w+-)?transform-origin:[^;]+;/g,'');
					}
					if(!self.data('wopop_effect_oristyle')) self.data('wopop_effect_oristyle',style);
					
					$.Velocity.hook($(self), "rotateZ", deg+"deg");
					
					self.hide();
					if($.WOPOP_EFFECTS[effects.effect] && browsersupport){
						self.addClass('now_effecting');
						if(!$.wismobile&&self.closest('#canvas').length ){ 
							_getEffectDom(self).done(function(){
								var cancontainer=$('#overflow_canvas_container');
								if(cancontainer.length && (effects.effect=='frombottom' || effects.effect=='fadeFromBottom')){
									var stacks=cancontainer.data('stacks');
									if(!stacks) stacks=[];
									if(!cancontainer.data('is_overflow')){
										var canh=$('#canvas').outerHeight();
										cancontainer.css('overflow-y','hidden').css('height',(canh+20)+'px').data('is_overflow',true);
										var timer=setInterval(function(){
											if(cancontainer.data('is_overflow')){
												var nowcanh=$('#canvas').outerHeight();
												if(nowcanh != canh){
													canh=nowcanh;
													cancontainer.css('height',(canh+20)+'px');
												}
											}else{
												clearInterval(timer);
											}
										},1000);
									}
									if(effects.effect=='frombottom' || effects.effect=='fadeFromBottom') stacks.push(self);
									cancontainer.data('stacks',stacks);
								}
							})
						}
						//寮圭獥瀹瑰櫒鐨勫姩鐢绘晥鏋滈渶瑕佷綔鐢ㄥ湪layerid_pop_up涓�,鍦ㄧ紪杈戞ā寮忎笅锛屽鏋滃彧浣跨敤pop_up浣滃姩鐢绘晥鏋滅殑璇濓紝浼氬鑷寸偣寮€鍔ㄧ敾鐣岄潰鏃跺脊绐楀鍣ㄦ秷澶憋紝鎵€浠ヤ笉鑳戒娇鐢╡lse
						if (self.attr('type') == 'pop_up') {
							var pop_up = $('#'+self.attr('id')+'_pop_up');
							$.WOPOP_EFFECTS[effects.effect](pop_up,effects);
						}
						$.WOPOP_EFFECTS[effects.effect](self,effects);
					}else{
						self.show();
					}
				}
			});
		}
	}

	$.fn.setimgEffects=function(force_show,show_effects,hover){
		var self='';
		$.Velocity.defaults.mobileHA=false;
		var fullpagedom=$('.fullpage_alllist');
		var browsersupport=!($.browser.msie && $.browser.version <9); //IE 9浠ヤ笅涓嶆敮鎸佸姩鐢绘晥鏋�
		if(!fullpagedom.length || force_show){
			self = $(this);
			var imgeffects=show_effects;
			if(!(imgeffects&&imgeffects.effect)) imgeffects=self.data('wopop_imgeffects');
			if(imgeffects&&imgeffects.effect){
				//hover=1鏃讹紝鎮诞浜嬩欢锛屽璞″垽鏂紝鍗曞浘锛屽浘鐗囧拰鍥炬枃浼犲綋鍓嶆彃浠禗OM锛屽叾浠栨湁閬僵灞傜殑鏁堟灉浼爄mg
				if(hover==1){
					if(imgeffects.type=="media"){
						if(imgeffects.effectrole=='dantu'){
							self=$(this);
						}else{
							self=self.find('img');
						}
					}else{
						self.each(function () {
							if($(this).data('over')==1){
								self=$(this);
							}
						});
					}
				}
				var deg=self.data('deg')||0;
				// 鍥哄畾閫氭爮閲屾樉绀哄姩鐢�
				var infixedparentel=self.closest('.full_column[infixed=1],.cstlayer[infixed=1]');
				if(imgeffects.effectrole=='blur'){
					if(!self.siblings('#imgmask').length) {
						if(imgeffects.type=="graphic" || imgeffects.type=='media'){
							var width = self.closest('.img_over').width()+3,height=self.closest('.img_over').height()+4;
						}else{
							var width = self.width()+3,height=self.height()+4;
						}
						var colorval=imgeffects.popcolor,colorrgb=$.WOPOP_EFFECTS.colorRgb(colorval),opacity=(1-(imgeffects.opacity)/100).toFixed(2);
						var bgcolor='rgba('+colorrgb[0]+','+colorrgb[1]+','+colorrgb[2]+','+opacity+')';
						var imgtop=(height-42)/2,imgsrc=imgeffects.src;
						var offsetleft=0;
						if(imgeffects.type!="graphic" && imgeffects.type!='media'){
							var myoffset=self.offset();
							var myoffsetparent=self.offsetParent();
							if(myoffset && myoffsetparent.length){
								offsetleft=myoffset.left-myoffsetparent.offset().left;
								if(offsetleft<0) offsetleft=0;
							}
						}
                                                var imgexit = '<img style="width:42px;height:42px;margin-top:'+imgtop+'px" src="'+imgsrc+'" alt="">';
                                                if(imgsrc == ''){
                                                   imgexit = '';
                                                }
						self.after('<div id="imgmask" class="imgmask" data-color="'+colorval+'" data-opacity="'+opacity+'" style="text-align:center;position: absolute; top: 0px;left:'+offsetleft+'px; background:'+bgcolor+';z-index: 1002;width:'+width+'px;height:'+height+'px;">' +
							imgexit+'</div>');
					}
					self = self.siblings('#imgmask');
				}
				if(imgeffects.effectrole=='content'){
					var opacity=(1-(imgeffects.opacity)/100).toFixed(2);
					var colorval=imgeffects.popcolor,colorrgb=$.WOPOP_EFFECTS.colorRgb(colorval);
					var bgcolor='rgba('+colorrgb[0]+','+colorrgb[1]+','+colorrgb[2]+','+opacity+')';
					var t_top=imgeffects.top,c_top=imgeffects.ctop;
					var t_align=imgeffects['text-align'],c_align=imgeffects['ctext-align'];
					var t_weight=imgeffects['font-weight'],c_weight=imgeffects['cfont-weight'];
					var t_decoration=imgeffects['text-decoration'],c_decoration=imgeffects['ctext-decoration'];
                    var t_family=imgeffects['font-family'],c_family=imgeffects['cfont-family'];
					var t_fontsize=imgeffects['font-size'],c_fontsize=imgeffects['cfont-size'];
					var cfontcolor=imgeffects['ccolor'],tfontcolor=imgeffects['color'];
					var twordcount=imgeffects['titlecount'],cwordcount=imgeffects['contentcount'];
					if(imgeffects.type=="tb_product_list" || imgeffects.type=="product_list" || imgeffects.type=="seckill_list" || imgeffects.type=="groupon_list" || imgeffects.type=="jfpro_list"){
						self.each(function(){
							var width = self.width()+2,height=self.height()+2;
							var imgparent = $(this).closest('li');
							var effecttitle = $(this).attr('alt');
							var effectcontent = imgparent.find('.product_desc').data('desc');
							if(twordcount){
								effecttitle=subString(effecttitle,twordcount);
							}
							if(cwordcount){
								effectcontent=subString(effectcontent,cwordcount);
							}
							var myoffset=$(this).offset();
							var myoffsetparent=$(this).offsetParent();
							if(myoffset && myoffsetparent.length){
								offsetleft=myoffset.left-myoffsetparent.offset().left;
								if(offsetleft<0) offsetleft=0;
							}
                                                        var img_div = $(this).closest('.img');
                                                        var imgmask_top = (img_div.outerHeight()-height)/2;
							if(!$(this).siblings('#imgmask').length) {
								$(this).after('<div id="imgmask" class="imgmask" data-top="'+imgmask_top+'" data-color="'+colorval+'" data-opacity="'+opacity+'" style=" position: absolute; top: 0px;left:'+offsetleft+'px; background:'+bgcolor+';z-index: 1002; width:'+width+'px;height:'+height+'px;">' +
									'<div class="effecttitle" style="color:'+tfontcolor+';margin-top:'+t_top+'px;text-align:'+t_align+';font-weight:'+t_weight+';text-decoration:'+t_decoration+';font-size:'+t_fontsize+'px;font-family:'+t_family+';">'+effecttitle+'</div>' +
									'<div class="effectcontent" style="color:'+cfontcolor+';margin-top:'+c_top+'px;text-align:'+c_align+';font-weight:'+c_weight+';text-decoration:'+c_decoration+';font-size:'+c_fontsize+'px;font-family:'+c_family+';">'+effectcontent+'</div></div>');
							}
						});
					}
					if(imgeffects.type=='article_list'){
						self.each(function(){
							var imgparent = $(this).closest('li');
							var effecttitle = imgparent.find("input[class=articleid]").data('title');
							var effectcontent = imgparent.find("input[class=abstract]").data('desc');
							if(twordcount){
								effecttitle=subString(effecttitle,twordcount);
							}
							if(cwordcount){
								effectcontent=subString(effectcontent,cwordcount);
							}
							if(!$(this).siblings('#imgmask').length) {
								$(this).after('<div id="imgmask" class="imgmask" data-color="'+colorval+'" data-opacity="'+opacity+'" style=" position: absolute; top: 0px;left:0px; background:'+bgcolor+';z-index: 1002; left: 0px;width:100%;height:100%;">' +
									'<div class="effecttitle" style="color:'+tfontcolor+';margin-top:'+t_top+'px;text-align:'+t_align+';font-weight:'+t_weight+';text-decoration:'+t_decoration+';font-size:'+t_fontsize+'px;font-family:'+t_family+';">'+effecttitle+'</div>' +
									'<div class="effectcontent" style="color:'+cfontcolor+';margin-top:'+c_top+'px;text-align:'+c_align+';font-weight:'+c_weight+';text-decoration:'+c_decoration+';font-size:'+c_fontsize+'px;font-family:'+c_family+';">'+effectcontent+'</div></div>');
							}
						});
					}
					if(imgeffects.type=='media' || imgeffects.type=='graphic'){
						var effecttitle=imgeffects.titledesc,effectcontent=imgeffects.contentdesc;
						if(!self.siblings('#imgmask').length){
							self.after('<div id="imgmask" class="imgmask" data-color="'+colorval+'" data-opacity="'+opacity+'" style=" position: absolute; top: 0px;left:0px; background:'+bgcolor+';z-index: 1002; left: 0px;width:100%;height:100%;">' +
								'<div class="effecttitle" style="line-height:140%;color:'+tfontcolor+';margin-top:'+t_top+'px;text-align:'+t_align+';font-weight:'+t_weight+';text-decoration:'+t_decoration+';font-size:'+t_fontsize+'px;font-family:'+t_family+';">'+effecttitle+'</div>' +
								'<div class="effectcontent" style="color:'+cfontcolor+';margin-top:'+c_top+'px;text-align:'+c_align+';font-weight:'+c_weight+';text-decoration:'+c_decoration+';font-size:'+c_fontsize+'px;font-family:'+c_family+';">'+effectcontent+'</div></div>');
						}
					}

					self = self.siblings('#imgmask');
				}
				if(imgeffects.effectrole=='title'){
					var opacity=(1-(imgeffects.opacity)/100).toFixed(2);
					var colorval=imgeffects.popcolor,colorrgb=$.WOPOP_EFFECTS.colorRgb(colorval);
					var bgcolor='rgba('+colorrgb[0]+','+colorrgb[1]+','+colorrgb[2]+','+opacity+')';
					var t_align=imgeffects['text-align'],t_weight=imgeffects['font-weight'],t_decoration=imgeffects['text-decoration'],t_fontsize=imgeffects['font-size'],t_family=imgeffects['font-family'];
					var tfontcolor=imgeffects['color'];
					var titlecount=imgeffects['titlecount'];
					if(imgeffects.type=="tb_product_list" || imgeffects.type=="product_list" || imgeffects.type=="seckill_list" || imgeffects.type=="groupon_list" || imgeffects.type=="jfpro_list"){
						self.each(function(){
							var imgparent = $(this).closest('li');
							var effecttitle = $(this).attr('alt');
							if(titlecount){
								effecttitle=subString(effecttitle,titlecount);
							}
							var marginLeft=0;
							if(imgeffects.type=="tb_product_list"){var marginLeft=1}else{marginLeft=0}
							var heigth=$(this).height()+1;
							var width=$(this).width();
							var popheight=imgeffects.popheight;
							var margintop=heigth-popheight;
							if(imgeffects.type=="product_list"){
								var p_width = imgparent.find(".img").width()||$(this).width();
								var p_height = imgparent.find(".img").height()||$(this).height();
								marginLeft= (p_width-width)/2;
								margintop= (p_height-popheight);				
							}
							if(!$(this).siblings('#imgmask').length) {
								$(this).after('<div id="imgmask" class="imgmask" data-color="'+colorval+'" data-opacity="'+opacity+'" style="position: absolute; top: 0px;left:0px; background:'+bgcolor+';z-index: 1002; left: 0px;width:100%;max-width:'+width+'px;height:'+popheight+'px;margin-top:'+margintop+'px;margin-left:'+marginLeft+'px;">' +
									'<div class="effecttitle" style="color:'+tfontcolor+';line-height:'+popheight+'px;text-align:'+t_align+';font-weight:'+t_weight+';text-decoration:'+t_decoration+';font-size:'+t_fontsize+'px;font-family:'+t_family+';">'+effecttitle+'</div></div>');
							}
						});
					}
					if(imgeffects.type=='article_list'){
						self.each(function(){
							var heigth=$(this).height();
							var popheight=imgeffects.popheight;
							var margintop=heigth-popheight;
							var imgparent = $(this).closest('li');
							var effecttitle = imgparent.find("input[class=articleid]").data('title');
							if(titlecount){
								effecttitle=subString(effecttitle,titlecount);
							}
							if(!$(this).siblings('#imgmask').length) {
								$(this).after('<div id="imgmask" class="imgmask" data-color="'+colorval+'" data-opacity="'+opacity+'" style=" position: absolute; top: 0px;left:0px; background:'+bgcolor+';z-index: 1002; left: 0px;width:100%;height:'+popheight+'px;margin-top:'+margintop+'px;">' +
									'<div class="effecttitle" style="color:'+tfontcolor+';line-height:'+popheight+'px;text-align:'+t_align+';font-weight:'+t_weight+';text-decoration:'+t_decoration+';font-size:'+t_fontsize+'px;font-family:'+t_family+';">'+effecttitle+'</div></div>');
							}
						});
					}
					if(imgeffects.type=='media' || imgeffects.type=='graphic'){
						var effecttitle=imgeffects.contentdesc;
						if(!self.siblings('#imgmask').length){
							var heigth=self.closest("div.img_over").height()+4;
							var width=self.width();
							var popheight=imgeffects.popheight;
							var margintop=heigth-popheight;
							self.after('<div id="imgmask" class="imgmask" data-color="'+colorval+'" data-opacity="'+opacity+'" style=" position: absolute; top: 0px;left:0px; background:'+bgcolor+';z-index: 1002; left: 0px;width:100%;height:'+popheight+'px;margin-top:'+margintop+'px;">' +
								'<div class="effecttitle" style="color:'+tfontcolor+';line-height:'+popheight+'px;text-align:'+t_align+';font-weight:'+t_weight+';text-decoration:'+t_decoration+';font-size:'+t_fontsize+'px;font-family:'+t_family+';">'+effecttitle+'</div></div>');
						}
					}

					self = self.siblings('#imgmask');
				}
				if(infixedparentel.length){
					if(infixedparentel.parent().is('#canvas')&&parseInt(infixedparentel.css('top'))==0){
						return;
					}
					if(self.is('.now_effecting')) return;
				}
				if($.WOPOP_EFFECTS[imgeffects.effect] && browsersupport){
					self.addClass('now_effecting');
					if(!$.wismobile&&self.closest('#canvas').length ){
						_getEffectDom(self).done(function(){
							var cancontainer=$('#overflow_canvas_container');
							if(cancontainer.length){
								var stacks=cancontainer.data('stacks');
								if(!stacks) stacks=[];
								if(!cancontainer.data('is_overflow')){
									var canh=$('#canvas').outerHeight();
									//cancontainer.css('overflow-y','hidden').css('height',canh+'px').data('is_overflow',true);
									cancontainer.css('height',canh+'px').data('is_overflow',true);
									var timer=setInterval(function(){
										if(cancontainer.data('is_overflow')){
											var nowcanh=$('#canvas').outerHeight();
											if(nowcanh != canh){
												canh=nowcanh;
												cancontainer.css('height',canh+'px');
											}
										}else{
											clearInterval(timer);
										}
									},1000);
								}
								stacks.push(self);
								cancontainer.data('stacks',stacks);
							}
						})
					}
					$.WOPOP_EFFECTS[imgeffects.effect](self,imgeffects,hover);
				}else{
					self.show();
				}
				if(imgeffects.type=='media' && imgeffects.effectrole =='dantu'){
					var leavedom=self;
					if(self.closest('.cstlayer').data('iseffectrotate'))  leavedom=self.closest('.cstlayer');
				}else if(imgeffects.type=='media' && imgeffects.effectrole !='dantu'){
					var leavedom=self.parent();
					if(self.closest('.cstlayer').data('iseffectrotate'))  leavedom=self.closest('.cstlayer');
				}else{
					var leavedom=self.parent();
				}
                // if(imgeffects.type=='media' && imgeffects.effectrole=='title'){
                //     var leavedom=self.parent();
                // }
                // if(imgeffects.type=='media' && imgeffects.effect=='effect.big2small'){
                //     var leavedom=self.parent();
                // }
				leavedom.mouseleave(function(){
					var queue=imgeffects.effect+'reverse';
					// self.velocity("stop");
					self.velocity("finish");
					self.data('run',0);
					self.dequeue(queue);
					if(imgeffects.effectrole !='dantu'){
						setTimeout(function () {
							self.remove();
						}, imgeffects.duration);
					}else{
						self.data('over','');
					}
				});
			}
		}
	}

	$.fn.wopop_effect_command=function(command,args){
		if(command=='stop'){
			return this.each(function() {
				stop_effect($(this));
			});
		}
	}
	
	$.WOPOP_EFFECTS._parseNum=function(num,orival){
		if(num==0) return 0;
		return num || orival;
	}
	
	function stop_effect(dom){
		dom.velocity("stop", true);
		if(dom.data('wopop_effect_oristyle')) {
			$.Velocity.hook($(dom), "scale", "1");
			$.Velocity.hook($(dom), "rotateY", "0deg");
			var deg=dom.data('deg')||0;
			$.Velocity.hook($(dom), "rotateZ", deg+"deg");

			dom.attr('style',dom.data('wopop_effect_oristyle'));
		}

//		if(dom.data('wopop_effect_oristyle')) console.log(dom,dom.data('wopop_effect_oristyle'))
		dom.removeData('wopop_effect_oristyle');
		dom.removeClass('now_effecting');
		dom.trigger('effect_complete');
		var cancontainer=$('#overflow_canvas_container');
		if(cancontainer.length){
			var stacks=cancontainer.data('stacks');
			if(stacks && stacks.length){
				var newstacks=[];
				for(var i=0;i<stacks.length;i++){
					if(!stacks[i].is(dom)){
						newstacks.push(stacks[i]);
					}
				}
				cancontainer.data('stacks',newstacks);
				if(!newstacks.length){
					cancontainer.css('overflow-y','').css('height','').removeData('is_overflow');
				}
			}
		}
	}
	
	function _getEffectDom(dom){
		var fullpagedom=$('.fullpage_alllist');
		var dfd=$.Deferred();
		if(fullpagedom.length){
			dfd.resolve($(dom));
		}else{
			var ismobile=(typeof(MobileUtils)=='object');
			if(!ismobile){
				var container=$('#scroll_container');
				/**
				 * 淇鍥犫€滃浐瀹氳儗鏅€濊€屽鑷碿hrome涓嬪浘鐗囨樉绀哄紓甯搁棶棰橈紙bug#4394锛�
				 * bug#4394,bug#4162,bug#4172,bug#4208,bug#4322,bug#4337鍧囩敱鈥滃浐瀹氳儗鏅€濈殑淇鏂规瀵艰嚧鐨勶紝浼や笉璧峰憖锛侊紒锛�
				 */ 
				if (container.data('chrome_bug')) container = window;
			}else{
				var container=window;
			}
			//濡傛灉璇ユ彃浠朵负寮圭獥瀹瑰櫒鍐呭瓙鎻掍欢锛岄偅涔堢洿鎺ヨ繍琛屽姩鐢伙紝涓嶈繘琛屽垽鏂�
			if(isDomInView($(dom),container) || $(dom).parents('.cstlayer').attr('type') == 'pop_up'){
				dfd.resolve($(dom));
			}else{
				$(container).bind('scroll',function(e){
					if(isDomInView($(dom),container)){
						dfd.resolve($(dom));
						$(this).unbind(e);
					}
				})
			}
		}
		return dfd;
	}
	
	function isDomInView(dom,container){
		var fold=0;var containerheight=0;
		if (container=== undefined || container === window) {
				fold = $(window).scrollTop();
				containerheight=$(window).height();
		} else {
				fold = $(container).scrollTop();
				containerheight=$(container).height();
		}
		var navheight=$('#wp-mobile_navhandler').height()+$('#wp-mobile_navhandler').height();
		return fold+containerheight-navheight > dom.ab_pos('top');//parseInt(dom.css('top'));
	}

	function subString(str, len, hasDot)
	{
		var newLength = 0;
        var hasDot=1;
		var newStr = "";
		var chineseRegex = /[^\x00-\xff]/g;
		var singleChar = "";
		var strLength = str.replace(chineseRegex,"**").length;
		for(var i = 0;i < strLength;i++)
		{
			singleChar = str.charAt(i).toString();
			if(singleChar.match(chineseRegex) != null)
			{
				newLength += 1;
			}
			else
			{
				newLength++;
			}
			if(newLength > len)
			{
				break;
			}
			newStr += singleChar;
		}

		if(hasDot && strLength > len)
		{
			newStr += "...";
		}
		return newStr;
	}

	$.WOPOP_EFFECTS.colorRgb=function(orival){
		var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
		var sColor = orival.toLowerCase();
		if(sColor && reg.test(sColor)){
			if(sColor.length === 4){
				var sColorNew = "#";
				for(var i=1; i<4; i+=1){
					sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1));
				}
				sColor = sColorNew;
			}
			//澶勭悊鍏綅鐨勯鑹插€�
			var sColorChange = [];
			for(var i=1; i<7; i+=2){
				sColorChange.push(parseInt("0x"+sColor.slice(i,i+2)));
			}
			return sColorChange;
		}else{
			return sColor;
		}
	}


	
	$.WOPOP_EFFECTS._hasEffectFilter=function(){
		var self=$(this);
		if(self.attr('deleted')=='deleted') return false;
		var effects=self.data('wopop_effects');
		if(effects&&effects.effect){
			return true;
		}
		return false;
	}
	
	$.WOPOP_EFFECTS._isEditMode=function(){
		if($.saveLayout&&$.isFunction($.saveLayout.save)) return true;
		return false;
	}
	
	var curfullpageindex;
	$.WOPOP_EFFECTS._setindex=function(index){
		curfullpageindex=index;
	}
	
	$.WOPOP_EFFECTS._getindex=function(){
		return curfullpageindex;
	}
	
	var effectparams={
		fromleft:{delay:0,duration:1.20},
		frombottom:{delay:0,duration:1.20},
		fromright:{delay:0,duration:1.20},
		fromtop:{delay:0,duration:1.20},
		fade:{delay:0,duration:0.90},
		rotation:{delay:0,duration:1.20},
		rotation2d:{delay:0,duration:1.20},
		bounceIn:{delay:0,duration:2.20},
		big2small:{delay:0,duration:1.20},
		small2big:{delay:0,duration:1.20},
		fadeFromLeft:{delay:0,duration:1.20},
		fadeFromBottom:{delay:0,duration:1.20},
		fadeFromRight:{delay:0,duration:1.20},
		fadeFromTop:{delay:0,duration:1.20},
		light:{delay:0,duration:1.20}
	}
	$.WOPOP_EFFECTS._getDefaultParam=function(effectname){
		var opts=effectparams[effectname];
		if(!opts) opts={delay:0,duration:1.20}
		return opts;
	}
})(window);
