/*
 * SimpleModal 1.4.3 - jQuery Plugin
 * http://simplemodal.com/
 * Copyright (c) 2012 Eric Martin
 * Licensed under MIT and GPL
 * Date: Sat, Sep 8 2012 07:52:31 -0700
 */
(function(b){"function"===typeof define&&define.amd?define(["jquery"],b):b(jQuery)})(function(b){var j=[],l=b(document),m=b.browser.msie&&6===parseInt(b.browser.version)&&"object"!==typeof window.XMLHttpRequest,o=b.browser.msie&&7===parseInt(b.browser.version),n=null,k=b(window),h=[];b.modal=function(a,d){return b.modal.impl.init(a,d)};b.modal.close=function(){b.modal.impl.close()};b.modal.focus=function(a){b.modal.impl.focus(a)};b.modal.setContainerDimensions=function(){b.modal.impl.setContainerDimensions()};
b.modal.setPosition=function(){b.modal.impl.setPosition()};b.modal.update=function(a,d){b.modal.impl.update(a,d)};b.fn.modal=function(a){return b.modal.impl.init(this,a)};b.modal.defaults={appendTo:"body",focus:!0,opacity:50,overlayId:"simplemodal-overlay",overlayCss:{},containerId:"simplemodal-container",containerCss:{},dataId:"simplemodal-data",dataCss:{},minHeight:null,minWidth:null,maxHeight:null,maxWidth:null,autoResize:!1,autoPosition:!0,zIndex:1E3,close:!0,closeHTML:'<a class="modalCloseImg" title="Close"></a>',
closeClass:"simplemodal-close",escClose:!0,overlayClose:!1,fixed:!0,position:null,persist:!1,modal:!0,onOpen:null,onShow:null,onClose:null};b.modal.impl={d:{},init:function(a,d){if(this.d.data)return!1;n=b.browser.msie&&!b.support.boxModel;this.o=b.extend({},b.modal.defaults,d);this.zIndex=this.o.zIndex;this.occb=!1;if("object"===typeof a){if(a=a instanceof b?a:b(a),this.d.placeholder=!1,0<a.parent().parent().size()&&(a.before(b("<span></span>").attr("id","simplemodal-placeholder").css({display:"none"})),
this.d.placeholder=!0,this.display=a.css("display"),!this.o.persist))this.d.orig=a.clone(!0)}else if("string"===typeof a||"number"===typeof a)a=b("<div></div>").html(a);else return alert("SimpleModal Error: Unsupported data type: "+typeof a),this;this.create(a);this.open();b.isFunction(this.o.onShow)&&this.o.onShow.apply(this,[this.d]);return this},create:function(a){this.getDimensions();if(this.o.modal&&m)this.d.iframe=b('<iframe src="javascript:false;"></iframe>').css(b.extend(this.o.iframeCss,
{display:"none",opacity:0,position:"fixed",height:h[0],width:h[1],zIndex:this.o.zIndex,top:0,left:0})).appendTo(this.o.appendTo);this.d.overlay=b("<div></div>").attr("id",this.o.overlayId).addClass("simplemodal-overlay").css(b.extend(this.o.overlayCss,{display:"none",opacity:this.o.opacity/100,height:this.o.modal?j[0]:0,width:this.o.modal?j[1]:0,position:"fixed",left:0,top:0,zIndex:this.o.zIndex+1})).appendTo(this.o.appendTo);this.d.container=b("<div></div>").attr("id",this.o.containerId).addClass("simplemodal-container").css(b.extend({position:this.o.fixed?
"fixed":"absolute"},this.o.containerCss,{display:"none",zIndex:this.o.zIndex+2})).append(this.o.close&&this.o.closeHTML?b(this.o.closeHTML).addClass(this.o.closeClass):"").appendTo(this.o.appendTo);this.d.wrap=b("<div></div>").attr("tabIndex",-1).addClass("simplemodal-wrap").css({height:"100%",outline:0,width:"100%"}).appendTo(this.d.container);this.d.data=a.attr("id",a.attr("id")||this.o.dataId).addClass("simplemodal-data").css(b.extend(this.o.dataCss,{display:"none"})).appendTo("body");this.setContainerDimensions();
this.d.data.appendTo(this.d.wrap);(m||n)&&this.fixIE()},bindEvents:function(){var a=this;b("."+a.o.closeClass).bind("click.simplemodal",function(b){b.preventDefault();a.close()});a.o.modal&&a.o.close&&a.o.overlayClose&&a.d.overlay.bind("click.simplemodal",function(b){b.preventDefault();a.close()});l.bind("keydown.simplemodal",function(b){a.o.modal&&9===b.keyCode?a.watchTab(b):a.o.close&&a.o.escClose&&27===b.keyCode&&(b.preventDefault(),a.close())});k.bind("resize.simplemodal orientationchange.simplemodal",
function(){a.getDimensions();a.o.autoResize?a.setContainerDimensions():a.o.autoPosition&&a.setPosition();m||n?a.fixIE():a.o.modal&&(a.d.iframe&&a.d.iframe.css({height:h[0],width:h[1]}),a.d.overlay.css({height:j[0],width:j[1]}))})},unbindEvents:function(){b("."+this.o.closeClass).unbind("click.simplemodal");l.unbind("keydown.simplemodal");k.unbind(".simplemodal");this.d.overlay.unbind("click.simplemodal")},fixIE:function(){var a=this.o.position;b.each([this.d.iframe||null,!this.o.modal?null:this.d.overlay,
"fixed"===this.d.container.css("position")?this.d.container:null],function(b,f){if(f){var g=f[0].style;g.position="absolute";if(2>b)g.removeExpression("height"),g.removeExpression("width"),g.setExpression("height",'document.body.scrollHeight > document.body.clientHeight ? document.body.scrollHeight : document.body.clientHeight + "px"'),g.setExpression("width",'document.body.scrollWidth > document.body.clientWidth ? document.body.scrollWidth : document.body.clientWidth + "px"');else{var c,e;a&&a.constructor===
Array?(c=a[0]?"number"===typeof a[0]?a[0].toString():a[0].replace(/px/,""):f.css("top").replace(/px/,""),c=-1===c.indexOf("%")?c+' + (t = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"':parseInt(c.replace(/%/,""))+' * ((document.documentElement.clientHeight || document.body.clientHeight) / 100) + (t = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"',a[1]&&(e="number"===typeof a[1]?
a[1].toString():a[1].replace(/px/,""),e=-1===e.indexOf("%")?e+' + (t = document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft) + "px"':parseInt(e.replace(/%/,""))+' * ((document.documentElement.clientWidth || document.body.clientWidth) / 100) + (t = document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft) + "px"')):(c='(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (t = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"',
e='(document.documentElement.clientWidth || document.body.clientWidth) / 2 - (this.offsetWidth / 2) + (t = document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft) + "px"');g.removeExpression("top");g.removeExpression("left");g.setExpression("top",c);g.setExpression("left",e)}}})},focus:function(a){var d=this,a=a&&-1!==b.inArray(a,["first","last"])?a:"first",f=b(":input:enabled:visible:"+a,d.d.wrap);setTimeout(function(){0<f.length?f.focus():d.d.wrap.focus()},
10)},getDimensions:function(){var a="undefined"===typeof window.innerHeight?k.height():window.innerHeight;j=[l.height(),l.width()];h=[a,k.width()]},getVal:function(a,b){return a?"number"===typeof a?a:"auto"===a?0:0<a.indexOf("%")?parseInt(a.replace(/%/,""))/100*("h"===b?h[0]:h[1]):parseInt(a.replace(/px/,"")):null},update:function(a,b){if(!this.d.data)return!1;this.d.origHeight=this.getVal(a,"h");this.d.origWidth=this.getVal(b,"w");this.d.data.hide();a&&this.d.container.css("height",a);b&&this.d.container.css("width",
b);this.setContainerDimensions();this.d.data.show();this.o.focus&&this.focus();this.unbindEvents();this.bindEvents()},setContainerDimensions:function(){var a=m||o,d=this.d.origHeight?this.d.origHeight:b.browser.opera?this.d.container.height():this.getVal(a?this.d.container[0].currentStyle.height:this.d.container.css("height"),"h"),a=this.d.origWidth?this.d.origWidth:b.browser.opera?this.d.container.width():this.getVal(a?this.d.container[0].currentStyle.width:this.d.container.css("width"),"w"),f=this.d.data.outerHeight(!0),
g=this.d.data.outerWidth(!0);this.d.origHeight=this.d.origHeight||d;this.d.origWidth=this.d.origWidth||a;var c=this.o.maxHeight?this.getVal(this.o.maxHeight,"h"):null,e=this.o.maxWidth?this.getVal(this.o.maxWidth,"w"):null,c=c&&c<h[0]?c:h[0],e=e&&e<h[1]?e:h[1],i=this.o.minHeight?this.getVal(this.o.minHeight,"h"):"auto",d=d?this.o.autoResize&&d>c?c:d<i?i:d:f?f>c?c:this.o.minHeight&&"auto"!==i&&f<i?i:f:i,c=this.o.minWidth?this.getVal(this.o.minWidth,"w"):"auto",a=a?this.o.autoResize&&a>e?e:a<c?c:a:
g?g>e?e:this.o.minWidth&&"auto"!==c&&g<c?c:g:c;this.d.container.css({height:d,width:a});this.d.wrap.css({overflow:f>d||g>a?"auto":"visible"});this.o.autoPosition&&this.setPosition()},setPosition:function(){var a,b;a=h[0]/2-this.d.container.outerHeight(!0)/2;b=h[1]/2-this.d.container.outerWidth(!0)/2;var f="fixed"!==this.d.container.css("position")?k.scrollTop():0;this.o.position&&"[object Array]"===Object.prototype.toString.call(this.o.position)?(a=f+(this.o.position[0]||a),b=this.o.position[1]||
b):a=f+a;this.d.container.css({left:b,top:a})},watchTab:function(a){if(0<b(a.target).parents(".simplemodal-container").length){if(this.inputs=b(":input:enabled:visible:first, :input:enabled:visible:last",this.d.data[0]),!a.shiftKey&&a.target===this.inputs[this.inputs.length-1]||a.shiftKey&&a.target===this.inputs[0]||0===this.inputs.length)a.preventDefault(),this.focus(a.shiftKey?"last":"first")}else a.preventDefault(),this.focus()},open:function(){this.d.iframe&&this.d.iframe.show();b.isFunction(this.o.onOpen)?
this.o.onOpen.apply(this,[this.d]):(this.d.overlay.show(),this.d.container.show(),this.d.data.show());this.o.focus&&this.focus();this.bindEvents()},close:function(){if(!this.d.data)return!1;this.unbindEvents();if(b.isFunction(this.o.onClose)&&!this.occb)this.occb=!0,this.o.onClose.apply(this,[this.d]);else{if(this.d.placeholder){var a=b("#simplemodal-placeholder");this.o.persist?a.replaceWith(this.d.data.removeClass("simplemodal-data").css("display",this.display)):(this.d.data.hide().remove(),a.replaceWith(this.d.orig))}else this.d.data.hide().remove();
this.d.container.hide().remove();this.d.overlay.hide();this.d.iframe&&this.d.iframe.hide().remove();this.d.overlay.remove();this.d={}}}}});

/**
 * Confirm瀵硅瘽妗�
 * (String)message - 娆叉樉绀虹殑鍐呭
 * (Function)callback - 鍥炶皟鍑芥暟
 */
function wp_confirm(message, callback, cancelBack){
	if ($('#wp-confirmpnl_overlay,#wp-confirm_panel').size()) return;
	var width = 286,pnl = '',ol = '<div id="wp-confirmpnl_overlay"></div>';
	pnl = '<div id="wp-confirm_panel" class="overz wp-manage_panel wp-alert-panel" style="position:absolute;width:'+width+'px;z-index:10001;">'
	+'<div class="wp-panel_outpadding overz"><div class="wp-manage_panel_block_one wp-manage-link overz"><h2 class="overz">'+message+'</h2></div>'
	+'<div class="wp-alert_button overz"><a href="javascript:;" class="wp-alert-sure">'+translate('Sure')+'</a><a href="javascript:;" class="wp-alert-cancel">'+translate('Cancel')+'</a></div></div></div>';
	$(ol+pnl).appendTo('body');
	var $cpnl = $('#wp-confirm_panel');
		// 鍔ㄦ€佽缃畐p-alert_button瀹藉害
	var resetWtimer = setTimeout(function(){
		var $altbtn = $cpnl.find('.wp-alert_button');
		$altbtn.width($altbtn.outerWidth());
//		var maxw = 0,$altbtn = $cpnl.find('.wp-alert_button');
//		$altbtn.children('a').each(function(i,a){
//			maxw += $(this).outerWidth(true);
//		});
//		if(maxw) $altbtn.width(maxw);
	},30);
	// 瀹氫綅Dialog
	panel_position($cpnl,width,'auto',true,'wp-confirmpnl_overlay');
	// Bind window resize
	$(window).resize(function(){
		panel_position($cpnl,width,'auto',true,'wp-confirmpnl_overlay');
	});
	$cpnl.bind('rename',function(e,name){
		if (name.length) {
			var self = this;			
			if(name.match(/,/)){
				var  btnstr = '<a href="javascript:;" class="wp-alert-sure">'+translate('Sure')+'</a><a href="javascript:;" style="margin-right:10px" class="wp-alert-edit">'+translate('Edit')+'</a><a href="javascript:;" class="wp-alert-cancel">'+translate('Cancel')+'</a>';
				//var str_edit =  $('.wp-manage-link',self).html();		
				var page = message.match(/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/);
					page = page[0];
				var edit = name.split(',')[1];
				var sure = name.split(',')[0];
				$('.wp-alert_button',self).html(btnstr);
				$('a.wp-alert-edit',self).html(edit);
				$('a.wp-alert-sure',self).html(sure);
				$('a.wp-alert-edit',self).css("background","url(../images/wp-button-black-bg.gif) repeat-x #383838");
				$('a.wp-alert-edit',self).hover(function(){
					$('a.wp-alert-sure',self).css("background","url(../images/wp-button-black-bg.gif) repeat-x #383838");
					$('a.wp-alert-edit',self).css({ "color":"#FFF", "background":"url(../images/wp-button-bg-hover.gif) repeat-x #366bbc"});
					$('a.wp-alert-cancel',self).css("background","url(../images/wp-button-black-bg.gif) repeat-x #383838");
				});
				$('a.wp-alert-sure',self).hover(function(){
					$('a.wp-alert-edit',self).css("background","url(../images/wp-button-black-bg.gif) repeat-x #383838");
					$('a.wp-alert-sure',self).css({ "color":"#FFF", "background":"url(../images/wp-button-bg-hover.gif) repeat-x #366bbc"});
					$('a.wp-alert-cancel',self).css("background","url(../images/wp-button-black-bg.gif) repeat-x #383838");
				
				});
				$('a.wp-alert-cancel',self).hover(function(){
					$('a.wp-alert-cancel',self).css({ "color":"#FFF", "background":"url(../images/wp-button-bg-hover.gif) repeat-x #366bbc"});
					$('a.wp-alert-sure',self).css("background","url(../images/wp-button-black-bg.gif) repeat-x #383838");
					$('a.wp-alert-edit',self).css("background","url(../images/wp-button-black-bg.gif) repeat-x #383838");

				});
				var timerid = setTimeout(function(){
					var newidth = $('a.wp-alert-edit',self).outerWidth(true) +$('a.wp-alert-sure',self).outerWidth(true) + $('a.wp-alert-cancel',self).outerWidth(true);
					$('.wp-alert_button',self).width(newidth);newidth = null;
					clearTimeout(timerid);
				}, 50);
				// 缁戝畾"OK|Cancel"鎸夐挳
				$cpnl.find('a.wp-alert-sure').click(function(e){
					if(callback && $.isFunction(callback)) callback();
					$cpnl.add('#wp-confirmpnl_overlay').remove();
					if(resetWtimer) clearTimeout(resetWtimer);
					e.preventDefault();
				}).end().find('a.wp-alert-cancel').click(function(e){
					if(cancelBack && $.isFunction(cancelBack)) cancelBack();
					$cpnl.add('#wp-confirmpnl_overlay').remove();
					if(resetWtimer) clearTimeout(resetWtimer);
					e.preventDefault();
				}).end().find('a.wp-alert-edit').click(function(e){
					if(page){
						window.location.href = page;
					}
				});
		}else{
			$('a.wp-alert-sure',self).html(name);
			var timerid = setTimeout(function(){
				var newidth = $('a.wp-alert-sure',self).outerWidth(true) + $('a.wp-alert-cancel',self).outerWidth(true);
				$('.wp-alert_button',self).width(newidth);newidth = null;clearTimeout(timerid);
			}, 50);
		}
	}
	});
	// 缁戝畾"OK|Cancel"鎸夐挳
	$cpnl.find('a.wp-alert-sure').click(function(e){
		if(callback && $.isFunction(callback)) callback();
		$cpnl.add('#wp-confirmpnl_overlay').remove();
		if(resetWtimer) clearTimeout(resetWtimer);
		e.preventDefault();
	}).end().find('a.wp-alert-cancel').click(function(e){
		if(cancelBack && $.isFunction(cancelBack)) cancelBack();
		$cpnl.add('#wp-confirmpnl_overlay').remove();
		if(resetWtimer) clearTimeout(resetWtimer);
		e.preventDefault();
	});
	// 缁戝畾Enter浜嬩欢
	$(document).keydown(function(e){
		if(e.keyCode == 13) $cpnl.find('a.wp-alert-sure').trigger('click');
	});
	return false;
}

function wp_editPicOnline(param)
{
	var imgtype=parseInt(getImageProcessType())||0; //鍥剧墖澶勭悊  0 浣跨敤aviary澶勭悊  1 浣跨敤缇庡浘绉€绉€澶勭悊
	var imgprocess=['feather','xiuxiu'];
	if(imgtype >= imgprocess.length) imgtype=0;
	var imgtypestr=imgprocess[imgtype];
	
	$LAB.script(relativeToAbsoluteURL('script/wopop2_'+imgtypestr+'.js'))
	.wait(function(){
		wp_editPicOnlineActual(param);
	})
}

/**
 * Alert瀵硅瘽妗�
 * (String)message - 娆叉樉绀虹殑鍐呭
 */
function wp_alert(message,callback){
	if ($('#wp-alertpnl_overlay,#wp-alert_panel').size()) return;
	var width = 286,pnl = '',ol = '<div id="wp-alertpnl_overlay"></div>';	
	pnl = '<div id="wp-alert_panel" class="overz wp-manage_panel wp-alert-panel" style="position:absolute;width:'+width+'px;z-index:10001;">'
	+'<div class="wp-panel_outpadding overz"><div class="wp-manage_panel_block_one wp-manage-link overz"><h2 class="overz">'+message+'</h2></div>'
	+'<div class="wp-alert_button overz" style="width:55px;"><a href="javascript:;" class="wp-alert-sure">'+translate('Sure')+'</a></div></div></div>';
	$(ol+pnl).appendTo('body');
	var $apnl = $('#wp-alert_panel');
	// 瀹氫綅Dialog
	panel_position($apnl,width,'auto',true,'wp-alertpnl_overlay');
	// Bind window resize
	$(window).resize(function(){
		panel_position($apnl,width,'auto',true,'wp-alertpnl_overlay');
	});
	// 缁戝畾"OK"鎸夐挳
	$apnl.find('a.wp-alert-sure').click(function(e){
		$apnl.add('#wp-alertpnl_overlay').remove();
		if($.isFunction(callback)) callback();
		e.preventDefault();
	});
	// 缁戝畾Enter浜嬩欢
	$(document).keydown(function(e){
		if(e.keyCode == 13) $apnl.find('a.wp-alert-sure').trigger('click');
	});

	return false;
}

/**
 * --------------------------------------------------------
 * Popup瀵硅瘽妗�(涓存椂鍑芥暟)
 * --------------------------------------------------------
 */
function show_dialog(load_url, title, width, height, callback, opentype){
	var fn = $.extend({}, {
		open: function(d){},
		close: function(d){}
	}, callback || {});
	$('#osx-modal-content').modal({
		overlayId: 'osx-overlay',
		containerId: 'osx-container',
		closeHTML: null,
		zIndex: 1000,
		opacity: 25,
		onOpen: function(d){
			fn.open(d);
			var self = this, $container = d.container, container = $container[0];
			var $data = $('#osx-modal-data', container);
			if (opentype == 'iframe') {								
				$data.html('<iframe src="'+load_url+'" frameborder="0" width="'+width+'" onload="this.height=this.contentWindow.document.documentElement.scrollHeight" scrolling="no"></iframe>');
				d.overlay.show();
				$data.show();
				$('#osx-modal-content,div.close', container).show();
				$('#osx-modal-title', container).html(title).show();
				$container.fadeTo('fast',1).draggable({handle: '#osx-modal-title',cursor: 'move'});
			} else {
				var $ajaxload = $('#wp-ajaxsend_loading2'),$win = $(window);
				if($ajaxload.size()==0)  $('<div id="wp-ajaxsend_loading2" style="width:'+$win.width()+'px;height:'+$win.height()+'px;z-index:9999;"><img src="'+relativeToAbsoluteURL('template/default/images/loading.gif')+'" width="16" height="16" /></div>').appendTo('body');
				$.get(load_url, function(data){
					$data.html(data);
					d.overlay.show();
					$data.show();
					$('#osx-modal-content,div.close', container).show();
					$('#osx-modal-title', container).html(title).show();
					$container.fadeTo('fast',1).draggable({handle: '#osx-modal-title',cursor: 'move'});
					self.setPosition();
					$('#wp-ajaxsend_loading2').remove();
				}).error(function(){
					$('#wp-ajaxsend_loading2').remove();
					alert(translate('Request failed!')); 
					self.close();return;
				});
			}
			if(width > 0) $container.css('width', width);
			$container.css('height', height || '');
			$('#osx-modal-content').bind('add_loading',function(){
				var loading=$data.children('.loading');
				if(loading.size()) loading.remove();
				$('<div class="loading" style="width:'+$data.width()+'px;height:'+$data.outerHeight()+'px;z-index:9999;"><img src="'+relativeToAbsoluteURL('template/default/images/loading.gif')+'" width="16" height="16" /></div>').appendTo($data);
			})

//			d.overlay.fadeIn('slow', function(){
//				$data.show();
//				$('#osx-modal-content,div.close', container).show();
//				$('#osx-modal-title', container).html(title).show();
//
//				$container.fadeTo('fast',1).draggable({handle: '#osx-modal-title',cursor: 'move'});
//			});
		},
		onClose: function(d){
			fn.close(d);
			var self = this;
			d.container.hide();
			d.overlay.hide();
			$("#osx-modal-content").triggerHandler('dialogclose', d);
			$("#osx-modal-content").unbind('dialogclose');
			$('#osx-modal-content').unbind('add_loading');
			setTimeout(function(){
				self.close();
			},500)
			
//			d.container.fadeOut('slow', function(){
//				d.overlay.fadeOut('slow', function(){
//					$("#osx-modal-content").triggerHandler('dialogclose', d);
//					$("#osx-modal-content").unbind('dialogclose');
//					self.close();
//				});
//			});
		}
	});
}

/*鑾峰彇鏍峰紡*/
function get_plugin_css(tagid,css){
	var editmode=false;
	if($.saveLayout) editmode=true;
	if ($.trim(tagid||'').length == 0) return;
	var setcss=$("#page_set_css").html();
	setcss=setcss.replace(/<style>/ig,'').replace(/<\/style>/ig,'').replace(/[\r]/g, " ").replace(/[\n]/g, " ").replace(/[\r\n]/g, " ").replace(/\s+/g, " "); 
	var reg = eval("/\\/\\*"+tagid+"\\*\\/(.*)\\/\\*"+tagid+"\\*\\//ig");
	setcss=setcss.replace(reg,'');	
	if(setcss&&$.trim(setcss) != '') css=css.replace(/@charset [^;]+;/i,'');
	var tempcss=setcss + ' /*'+ tagid +'*/ '+css+' /*'+ tagid +'*/ ';
	tempcss=tempcss.replace(/&gt;/ig,'>');
	if(editmode) $("#page_set_css").html('<style> '+tempcss + '</style>');
	else{
		$("#page_set_css").after($("#page_set_css").clone().attr('id','page_set_css2').html('<style> '+tempcss + '</style>'));
		$("#page_set_css").html('').remove();
		$("#page_set_css2").attr('id','page_set_css');
	}
}

(function( $, undefined ) {
	var callbackhash={};
	var mod_property={};
	
	$.modplugin={
		addCallBack:function(type,funcname,func){
			if($.isFunction(func)){
				if(!callbackhash[type]) callbackhash[type]={};
				callbackhash[type][funcname]=func;
			}
		},
		fireCallBack:function(type,funcname,dom,data){
			var func=callbackhash[type];
			if(!func) return false;
			func=func[funcname];
			if($.isFunction(func)){
				return func(dom,data);
			}else{
				return false;
			}
		}
	}
	
	$.fn.execPluginCallBack=function(funcname,data){
			return $.modplugin.fireCallBack(this.attr('type'),funcname,this,data);
	}
	
	$.fn.mod_property=function(key,val){
		     if($.isPlainObject(key)){
					for(var inkey in key){
						this.mod_property(inkey,key[inkey]);
					}
					return ;
			 }
			var id=this.prop('id');
			if(!id) return null;
			var propertydata=mod_property[id];
			if(!propertydata){
				mod_property[id]=propertydata={};
			}
			if(val !== undefined){
				propertydata[key]=val;
				return val;
			}else{
				return propertydata[key];
			}
	}
	
	
	var PropertyCommand=null;
	function initPropCommand(){
		if(PropertyCommand) return;
		PropertyCommand=Undo.Command.createModuleCommand(function(blockid,val){
			var blockel=$('#'+blockid);
			if(val.propval!=undefined) blockel.mod_property(val.propkey,val.propval);
			else blockel.del_mod_property(val.propkey);
			blockel.execPluginCallBack('property_undo',val); 
		},null,{returntype:'class'});
	}
	
	var PropertyCommand2=null;
	function initPropCommand2(){
		if(PropertyCommand2) return;
		PropertyCommand2=Undo.Command.createModuleCommand(function(blockid,val){
			var blockel=$('#'+blockid);
			mod_property[blockid]=val.propval;
			blockel.execPluginCallBack('property_undo',val); 
		},null,{returntype:'class'});
	}
	$.fn.autoundo_mod_property2=function(val){
		if(val === undefined) return this.get_mod_property();
		initPropCommand2();
		var oldval=this.get_mod_property();
		mod_property[this.attr("id")]=val;
		var oldvalue={propval:oldval,act:'set',cmdtype:'undo'}
		var newvalue={propval:val,act:'set',cmdtype:'redo'}
		if(!Undo.Command.DefaultEqAct(oldval,val)) new PropertyCommand2(this.attr('id')).insertWithVals(oldvalue, newvalue);
	}
	
	$.fn.autoundo_mod_property=function(key,val){
		if(val === undefined) return this.mod_property(key);
		initPropCommand();
		var oldval=this.mod_property(key);
		this.mod_property(key,val);
		var oldvalue={propkey:key,propval:oldval,act:'set',cmdtype:'undo'}
		var newvalue={propkey:key,propval:val,act:'set',cmdtype:'redo'}
		if(!Undo.Command.DefaultEqAct(oldval,val)) new PropertyCommand(this.attr('id')).insertWithVals(oldvalue, newvalue);
	}
	
	$.fn.autoundo_del_mod_property=function(key){
		initPropCommand();
		var oldval=this.mod_property(key);
		this.del_mod_property(key);
		var oldvalue={propkey:key,propval:oldval,act:'del',cmdtype:'undo'}
		var newvalue={propkey:key,act:'del',cmdtype:'redo'}
		if(oldval != undefined)  new PropertyCommand(this.attr('id')).insertWithVals(oldvalue, newvalue);
	}
	
	$.fn.del_mod_property=function(key){
		var id=this.prop('id');
		if(!id) return null;
		var propertydata=mod_property[id];
		if($.isPlainObject(propertydata)){
			var oldval=propertydata[key];
			delete propertydata[key];
			return oldval;
		}
	}
	
	$.fn.get_mod_property=function(){
		var id=this.prop('id');
		if(!id) return null;
		var propertydata=mod_property[id];
		return propertydata||{};
	}
	
})(jQuery);