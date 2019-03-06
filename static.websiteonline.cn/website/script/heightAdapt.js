/*
 * 妯″潡楂樺害鑷€傚簲锛屽澶栨帴鍙ｏ紝鍔熻兘寰呮墿灞�
 * 
 */

/**
 * 楂樺害鑷€傚簲妯″潡,棰勮妯″紡涓嬭Е鍙� TODO:闈㈠悜瀵硅薄鍐欐硶
 */
function wp_heightAdapt(dom,oldHeight)
{	
	if(dom== undefined) return false;
	if ($.inArray(dom.attr("type"), ['bslider']) != -1) return;
	var heightfunc=function(){
		var before=dom.data('oriheight');
		if(!before){
			before=dom.children('div').eq(0).height();
			dom.data('oriheight',before);
		}
		return before;
	}
	
	var resetPos=function(el){
		var oritop=el.data('adaptoritop');
		var oriheight=el.data('adaptoriheight');
		var pressArr=el.data('adaptpress');
		var wrapArr=el.data('adaptwrap');
		var id=dom.prop('id');
		var toppos=$.parseInteger(el.css('top'));
		if(el.data('wopop_effect_oristyle')){
			var style=el.data('wopop_effect_oristyle');
			var topregexp=/(?:^|;)\s*top\s*:\s*(\d+)px/;
			var topmatches=style.match(topregexp);
			if(topmatches){
				toppos=parseInt(topmatches[1]);
			}
          }
		if(!oritop&&oritop !==0){
			el.data('adaptoritop',toppos);
			el.data('adaptoriheight',el.height());
			return;
		}

		if(pressArr && pressArr.length){
			for(var i=0;i<pressArr.length;i++){
				var press=pressArr[i];
				if(press.id !=id){
					oritop+=press.diffY;
				}
			}
		}
		
		if(wrapArr && wrapArr.length){
			var h=oriheight;
			for(var i=0;i<wrapArr.length;i++){
				var wrap=wrapArr[i];
				if(wrap.id !=id){
					h+=wrap.diffH;
				}
			}
			if(h!=el.height()){
				el.css('height',h+'px');
				var wrapListPadding = parseInt(el.children('div').eq(0).css('padding-top')) + parseInt(el.children('div').eq(0).css('padding-bottom'));
				var wrapListBorder = parseInt(el.children('div').eq(0).css('border-top-width')) + parseInt(el.children('div').eq(0).css('border-bottom-width'));
				el.children('div').eq(0).height(el.height() - wrapListPadding - wrapListBorder);
			}
		}
		if(oritop!=toppos){ 
			el.css('top',oritop+'px');
		}
	}
	
	var canvheight=$('#canvas').data('adaptoriheight');
	if(!canvheight){
		$('#canvas').data('adaptoriheight',$('#canvas').height());
		canvheight=$('#canvas').data('adaptoriheight');
	}
	var adaptModuleBefore = heightfunc();//鑷€傚簲涔嬪墠鍘熷楂樺害
	var actualContentHeight=dom.children('div').eq(0).height();
	resetPos(dom);
//	dom.children().eq(0).css('height','auto');//妯″潡鑷€傚簲
     //鏈変簺妯″潡绗竴涓厓绱犱笉鏄痙iv锛屾瘮濡傦細浜у搧璇︽儏
	dom.children('div').eq(0).css('height','auto');//妯″潡鑷€傚簲
	var adaptModuleAfter = dom.children('div').eq(0).height();//鑷€傚簲涔嬪悗楂樺害
	if(adaptModuleAfter < adaptModuleBefore){ 
		dom.children('div').eq(0).css('height',adaptModuleBefore+'px');
		if(adaptModuleBefore==actualContentHeight) return;
	}//杩樺師
	else{
//		var borderwidth=parseInt(dom.children('div').eq(0).css('border-top-width'))+parseInt(dom.children('div').eq(0).css('border-bottom-width'));
//		if(borderwidth>0){
//			adaptModuleAfter=adaptModuleAfter-borderwidth;
//		}
		dom.children('div').eq(0).css('height',adaptModuleAfter+'px');
		if(adaptModuleAfter==actualContentHeight) return;
	}

	//bug 7531 鐗规畩澶勭悊  闄愬畾mbox鍐� 涓旈珮搴﹀樊涓嶉珮浜�10
	var adaptdoms=$('#canvas').data('heightadaptdoms');
	if(!adaptdoms) adaptdoms=[];
	var domfatherid=dom.attr('fatherid');
	var sameTopDiff=0;
	if(domfatherid&&domfatherid!=''&&domfatherid!='canvas' && domfatherid!='site_footer'){
		if(adaptdoms && adaptdoms.length){
			for(var i=0;i<adaptdoms.length;i++){
				var adaptid=adaptdoms[i].id;
				if(dom.prop('id')!=adaptid){
					var adaptdomfatherid=$('#'+adaptid).attr('fatherid');
					if(adaptdomfatherid&&$('#'+adaptdomfatherid).is('[type=mbox]')){
						var adaptdomtop=$('#'+adaptid).ab_pos_cnter('top');
						var domtop=dom.ab_pos_cnter('top');
						if(Math.abs(adaptdomtop-domtop)<10){
							if(sameTopDiff<adaptdoms[i].diff){
								sameTopDiff=adaptdoms[i].diff;
							}
						}
					}
				}
			}
		}
		adaptdoms.push({id:dom.prop('id'),diff:adaptModuleAfter-adaptModuleBefore});
		$('#canvas').data('heightadaptdoms',adaptdoms);
	}
	

	var domPadding = parseInt(dom.children('div').eq(0).css('padding-top')) + parseInt(dom.children('div').eq(0).css('padding-bottom'));
	var domBorder = parseInt(dom.children('div').eq(0).css('border-top-width')) + parseInt(dom.children('div').eq(0).css('border-bottom-width'));
	var moduleLayerHeight = oldHeight || adaptModuleBefore+domPadding+domBorder;
	var moduleHeight = dom.children('div').eq(0).outerHeight();//妯″潡鍙� wp-妯″潡鍚峗content灞傜殑楂樺害
	var moduleWidth = dom.outerWidth();
	var moduleTop = dom.ab_pos_cnter('top');//鑾峰彇鐢诲竷鍧愭爣绯粂鍊�
	
	var left_boundray = dom.ab_pos_cnter('left');//宸﹀彸杈圭晫
	var right_boundray = left_boundray + dom.outerWidth();
	
	var offsetY = 0;//鍙戠敓閲嶅悎鍚庡線涓嬪帇浣嶇疆涓庨珮搴﹁嚜閫傚簲妯″潡绌哄嚭鍘熸湁楂樺害
	var pressList = new Array();//璁板綍寰€涓嬪帇鐨勬ā鍧楀垪琛�
	var wrapList = new Array();//鍖呭湪楂樺害鑷€傚簲澶栧眰妯″潡鍒楄〃
	
	var minTop = 0,minId = 0;
	//椤甸潰涓婄殑妯″潡鍙兘鏈変笉鍚屽潗鏍囩郴锛屼絾寰€涓嬪帇澶氬皯鍍忕礌鐨勭浉瀵瑰亸绉婚噺閮界浉鍚岀殑锛岃幏鍙栬繖浜涘亸绉婚噺
	var diffY = 0;//鍚戜笅绉诲姩鍋忕Щ閲�
	
	$("#canvas").find('.cstlayer,.full_column').each(function(){
		//鍒ゆ柇椤甸潰妯″潡鏄笉鏄湪楂樺害鑷€傚簲妯″潡宸﹀彸杈圭晫涓�,閫氭爮妯″潡鑲畾鍦�,涓嶉渶瑕佸垽鏂�
		resetPos($(this));
		var tmp_left = $(this).ab_pos_cnter('left'),tmp_top =$(this).ab_pos_cnter('top'),tmp_width = $(this).outerWidth(),tmp_height = $(this).outerHeight();
		if($(this).hasClass('cstlayer'))
		{
			if(tmp_left + tmp_width < left_boundray) return true;
			if(tmp_left > right_boundray) return true;
			if(dom.attr('id') == $(this).attr('id'))  return true;//鑷繁闄ゅ
			
			//鍖呭湪楂樺害鑷€傚簲妯″潡澶栭潰鐨勬ā鍧椾篃瑕佹敼鍙橀珮搴�
			if((tmp_left <= left_boundray && tmp_left+tmp_width >= right_boundray) && (tmp_top <= moduleTop && tmp_top+tmp_height >= moduleTop+moduleLayerHeight))
			{
				wrapList.push($(this).attr('id'));
				return true;
			}
			
			if($(this).parent().hasClass('full_content') || $(this).parent().hasClass('footer_content') || $(this).parent().hasClass('drop_box')) return true;//閫氭爮鍜屽簳閮ㄥ厓绱犳殏鏃朵笉鑰冭檻
		}

		if(tmp_top >= (moduleTop + moduleLayerHeight))
		{
			pressList.push($(this).attr('id'));
			if(minTop == 0) {minTop = tmp_top;minId = $(this).attr('id');}
			else
			{
				if(minTop > tmp_top) {minTop = tmp_top;minId = $(this).attr('id');}
			}
		}
	});
	//ceshi
	offsetY = $("#"+minId).ab_pos_cnter('top') - (moduleTop + moduleLayerHeight);

	if(pressList.length > 0 && (moduleTop + moduleHeight) >= minTop)
	{
		diffY = moduleTop + moduleHeight + offsetY - minTop;
		for(var i = 0;i < pressList.length;i++)
		{
			var theel=$("#"+pressList[i]);
			var eltop=parseInt(theel.ab_pos_cnter('top'))+diffY-sameTopDiff;
			theel.css('top',eltop+'px');
			//bug 5996 鑷€傚簲瀵艰嚧妯″潡style鍙樺寲浜嗭紝鍔ㄧ敾鍑洪敊
			if(theel.data('wopop_effect_oristyle')){
				var style=theel.data('wopop_effect_oristyle');
				style=style.replace(/((?:^|;)\s*top\s*:\s*)\d+px;/,'$1'+eltop+'px;');
				theel.data('wopop_effect_oristyle',style);
			}
			var pressArrOld=theel.data('adaptpress');
			if(!pressArrOld) pressArrOld=[];
			var pressArr=[];
			for(var j=0;j<pressArrOld.length;j++){
				if(pressArrOld[j].id != dom.prop('id')) pressArr.push(pressArrOld[j]);
			}
			pressArr.push({id:dom.prop('id'),diffY:diffY-sameTopDiff});
			theel.data('adaptpress',pressArr);
		}
	}
	
	if(wrapList.length > 0)
	{
		for(var i = 0;i < wrapList.length;i++)
		{
			var diffH=moduleHeight-moduleLayerHeight;
			var theel=$("#"+wrapList[i]);
			theel.height($("#"+wrapList[i]).height()+(diffH));
			var wrapListPadding = parseInt(theel.children('div').eq(0).css('padding-top')) + parseInt($("#"+wrapList[i]).children('div').eq(0).css('padding-bottom'));
			var wrapListBorder = parseInt(theel.children('div').eq(0).css('border-top-width')) + parseInt($("#"+wrapList[i]).children('div').eq(0).css('border-bottom-width'));
			theel.children('div').eq(0).height(theel.height() - wrapListPadding - wrapListBorder);
			var wrapArrOld=theel.data('adaptwrap');
			if(!wrapArrOld) wrapArrOld=[];
			var wrapArr=[];
			for(var j=0;j<wrapArrOld.length;j++){
				if(wrapArrOld[j].id != dom.prop('id')) wrapArr.push(wrapArrOld[j]);
			}
			wrapArr.push({id:dom.prop('id'),diffH:diffH});
			theel.data('adaptwrap',wrapArr);
			// fixed bug#4119 - Add 'custom-listener-event'
			var events = theel.data("events") || {};
			if (events.hasOwnProperty("wrapmodheightadapt"))
				theel.triggerHandler("wrapmodheightadapt");
		}
	}
	
	if(dom.attr("type")=='fxdp'){
		dom.height(dom.children('div').eq(0).height() + domPadding + domBorder);
	}else{
		dom.height(dom.children('div').eq(0).height() + domPadding + domBorder);
	}
	var nowcanvheight=$('#canvas').height();
	if(nowcanvheight != canvheight) $('#canvas').css('height',canvheight);
	setTimeout(function(){
		scroll_container_adjust();
	},100);
	
}