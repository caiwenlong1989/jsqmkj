/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
 
function WaterfallsFlow(parDom,chdDom,options,befCallback,endCallback){    
    
   var uldom = parDom;
   var lidom = chdDom; 

   var mar_right = parseInt(lidom.css("margin-right")) 
     
    var colCount =0;  //瀹氫箟鍒楁暟
    var colHeightArry= []   //瀹氫箟鍒楅珮搴︽暟缁�
    var liWidth = lidom.outerWidth(true)   //瀛愮殑瀹藉害
    var ulWidth = uldom.width(); //鐖剁殑瀹藉害
    var modfalse = 0; //鏈€鍙宠竟杈硅窛璁剧疆鍒ゆ柇
    var tops =  0; //鍒濆涓婇棿璺�
    var lefts = 0; //鍒濆宸﹁竟闂磋窛
    if(options && options.top) tops = options.top;
    if(options && options.left) lefts = options.left;
    
    if(befCallback && $.isFunction(befCallback)) befCallback();
    
    colCount = ulWidth/liWidth   //璁＄畻鍑哄垪鏁�
    colCountfat = parseInt(colCount);
    if(colCount>colCountfat){
      colCount = colCountfat;
      if( liWidth*(colCountfat + 1) - mar_right <= ulWidth ){
          colCount = colCount+1
          modfalse = 1
      }
    }
    
    var colHeight = [];
    for(var i = 0 ; i < colCount; i ++){
        colHeight[i] = tops;
    }
    
   //console.log('ulWidth',ulWidth,liWidth,colCount)
    function reset(){
        var colHeightArry= []
        for(var i = 0 ; i < colCount; i ++){
          colHeightArry[i] = tops
        }
        lidom.each(function(){
          var minValue = colHeightArry[0]
          var minIndex = 0
          for(var i = 0 ; i < colCount; i ++){
            if(colHeightArry[i] < minValue){
              minValue = colHeightArry[i]
              minIndex = i
            }
          }
          
          var mar_rights =  mar_right;
          
          if(minIndex >0 && ( (minIndex+1) % colCount ==0) ){
              mar_rights =0;
          }

          $(this).css({
            left: lefts+minIndex * liWidth,
            top: minValue,
            'margin-right':mar_rights
          })
          colHeightArry[minIndex] += $(this).outerHeight(true)
          colHeight[minIndex] += $(this).outerHeight(true);
        })
    }
    reset(); 
    
    colHeight.sort(function(a,b){return a-b;})
    var max = colHeight[colHeight.length-1];
    
    if(endCallback && $.isFunction(endCallback)) endCallback(max);
 
}

function openImageChooserDialog(options){
		window._imageChooserDefered=new $.Deferred();
		options=$.extend({},options);
		var title=options.title||translate('fileManager.selectImage');
		var width=options.width||883;
		var filetype=options.filetype||'pic';
		var dialogid=options.id||'wp-picmanage_panel';
		var zindex=options.zIndex||1003;
        var multi=options.multi||0;
        var mask = options.overlay;
		if (typeof mask === 'undefined') mask = true;
		//show_dialog(parseToURL("wp_widgets","common_pic_chooser",{filetype:filetype}), title,width, 0);
		wp_floatpanel(parseToURL('wp_widgets','common_pic_chooser',{filetype:filetype,multi:multi}),{
			title: title,
			id: dialogid,
			width: width,
			overlay: mask,
			isCenter: true,
			swfFix: true,
			zIndex: zindex
		});
		if(!options.cancelNotCloseDialog){
			window._imageChooserDefered.fail(function(){
				$.modal.close();
			})
		}
		
		return window._imageChooserDefered.promise();

}

// Add 'link to file' function 2013/02/25
function openMyDocChooserDialog(options){
	window._myDocChooserDefered = new $.Deferred();options = $.extend({},options);
	var title = options.title||translate('fileManager.myFile'),dwidth = options.width||883,icenter = options.isCenter||true,
	dialogid = options.id||'wp-file_explore',zindex = options.zIndex||1003,mask = options.overlay;
	if (typeof mask === 'undefined') mask = true;
	wp_floatpanel(parseToURL('wp_fileexplore', 'file_explore', {"geturl": '1'}), {swfFix: true,
		title: title,width: dwidth,isCenter: icenter,id: dialogid,zIndex: zindex,overlay: mask
	});
	return window._myDocChooserDefered.promise();
}

function transferToPageSetDialog(showdiv,hidediv,options){
		window._pagesetDefered=new $.Deferred();
		options=$.extend({},options);
		var dialogwin=window;
		if(options.iframe) dialogwin=parent;
		var title=options.title||translate('page.add');
		var mode=options.mode||'create';
		var url ='';
		if(mode=='edit'){
			var pageid=options.pageid;
			url =parseToURL("wp_page","editpage",{id:pageid});
		}else{
			var additionparam=options.createparam||{};
			url =parseToURL("wp_page","addpage",additionparam);
		}
		$.get(url, function(data) {	
			$(showdiv).html(data).show();
			$(hidediv).hide();
			wp_update_floatpanel($('#wp-manage_menu'),title,376,function(dom){
				dom.find('.wp-panel_button').hide();
				dom.find('#page_set_prop_div .wp-panel_button').show();
			});
		}).error(function(xhr, textStatus, errorThrown) { 
			wp_alert((errorThrown||textStatus)+"(edit/add a page).<br/>"+translate("Request failed!")); 
		})
		return window._pagesetDefered.promise();
}

function transferToPageSetDialogcur(showdiv,hidediv,options){
		window._pagesetDefered=new $.Deferred();
		options=$.extend({},options);
		var dialogwin=window;
		if(options.iframe) dialogwin=parent;
		var title=options.title||translate('page.add');
		var mode=options.mode||'create';
		var url ='';
		var pageid=options.pageid;
		var modact=options.modact||'navigation';
		
		
		var page_id=options.page_id;
		var supid=options.blockid;

		if(mode=='edit'){			
			url =parseToURL(modact,"editpage",{id:pageid,page_id:page_id,blockid:supid});
		}else{
			var additionparam=options.createparam||{};
			url =parseToURL(modact,"addpage",{page_id:page_id,blockid:supid,parentid:pageid});
		}
		$.post(url, {menudata:$("#"+supid).data("menudata")}, function(data) {									
				$(showdiv).html(data).show();
				$(hidediv).hide();
				/*
				dialogwin.$('#osx-container').css('width',500);
				if(options.iframe) dialogwin.$('#osx-modal-data').find('iframe').width(500).height(480);
				dialogwin.$("#osx-modal-title").data('origin_title',dialogwin.$("#osx-modal-title").html());
				dialogwin.$("#osx-modal-title").html(title);
				dialogwin.$.modal.setPosition();
				*/
		}).error(function(xhr, textStatus, errorThrown) { 
			wp_alert((errorThrown||textStatus)+"(edit/add a navigation page).<br/>"+translate("Request failed!")); 
		})
		return window._pagesetDefered.promise();
}

function openPageSetDialog(options){
		window._pagesetDefered=new $.Deferred();
		options=$.extend({},options);
		var title=options.title||translate('page.add');
		var width=options.width||400;
		var mode=options.mode||'create';
		var url ='';
		if(mode=='edit'){
			var pageid=options.pageid;
			url =parseToURL("wp_page","editpage",{id:pageid});
		}else{
			width = 400;
			var opts={};
			if(options.mtype) opts._mtype=options.mtype;
			if(options.parentid) opts.parentid=options.parentid;
			url =parseToURL("wp_page","addpage",opts);
		}
		//show_dialog(url, title,width, 0);
		wp_floatpanel(url,{
			title: title,
			contentClass: 'wp-site-set_panel_c',
			id: 'wp-add_page',
			overlay: true,
			isCenter: true,
			width: width,
			zIndex: 1002,
			cache:false,
			open: function(dom){
				if(options.callback && $.isFunction(options.callback)){
					$(dom).bind('addPageLink',function(e,url){
						options.callback(url);
					});
				}
			}
		});
		if(!options.cancelDefaultOp){
			window._pagesetDefered.done(function(data){
				if(data.refresh){
			
					$.saveLayout.save(true);
					window.location.reload();
					 $('#wp-add_page').triggerHandler('wpdialogclose');
				}else{
					setTimeout(function(){
						$.saveLayout.save(true);
						window.location.href=data.forward;
					},100);
				}
			})
			window._pagesetDefered.fail(function(){
				$('#wp-add_page').triggerHandler('wpdialogclose');
			})
		}
		
		return window._pagesetDefered.promise();

}

// 鍒涘缓鈥滄枃绔�/浜у搧鍒嗙被銆佸垪琛ㄢ€濋摼鎺ョ浉鍏� 2012/07/16
function setModuleLink(mtype,callback){
	openPageSetDialog({"mtype":mtype,"callback":callback});
}

// IFRAME鑷€傚簲楂樺害 2012/07/12
function initFrame(frame,contentClass,height){
	var self = frame,bh = self.contentWindow.document.body.scrollHeight,
	dh = self.contentWindow.document.documentElement.scrollHeight,max = Math.max;
	var $parent = $(self).closest('.wp-floatpanel_dialog'),otherh = 0,temph = max(bh,dh);
	temph+=1;
	if($.browser.msie){
		temph = temph+25;
	}
	$parent.find('.'+contentClass).siblings().each(function(i,dom){
		otherh += $(dom).outerHeight(true);
	});
	var _float = function(numString){
		var number = parseFloat(numString);
		if(isNaN(number)) return 0;
		return number;
	};
	var seth = _float(height),maxh = seth ? seth : $(document).height(),
	difw = maxh - otherh - 10;// 涓婁笅闂撮殧5鍍忕礌
	if(difw < temph) temph = difw;
	frame.height = max(temph,200);
	$(self).closest('.wp-floatpanel_dialog').triggerHandler('wpdialogsetpos');
}

(function($){
	var cachedtimer={};
	$.multi_exec_once=function(key,func,interval){
		var timer=cachedtimer[key];
		if(timer != null){
			clearTimeout(timer);
			delete cachedtimer[key];
		} 
		timer=setTimeout(func, interval);
		cachedtimer[key]=timer;
	}
	
	// 娉ㄥ唽beforeLoaded鏂规硶 2012/07/11
	var loadedhash = {};
	$.beforeLoaded = {
		add: function(type, event, func){
			if ($.isFunction(func)) {
				if(!loadedhash[type]) loadedhash[type] = {};
				loadedhash[type][event] = func;
			}
		},
		run: function(type, event, data){
			var func = loadedhash[type];
			if(typeof func == 'undefined') return false;
			func = func[event];
			if($.isFunction(func)) return func(data);
			return false;
		}
	};
})(jQuery);
	
// 鏇存柊骞跺畾浣嶆诞鍔ㄧ獥鍙�
function wp_update_floatpanel(dom, title, width, callback){
	var $title = dom.find('.wp-title > h2'),curtitle = $title.html();
	dom.width(width);
	if(title) $title.data('origin_title',curtitle);
	else title = curtitle;
	$title.html(title);
	if(callback && $.isFunction(callback)) callback(dom);
	// setPosition
	var win = window,winw = $(win).width(),winh = $(win).height(),
	floor = Math.floor,newh = dom.outerHeight(true);
	dom.css({'left': floor((winw-width)/2),'top': floor((winh-newh)/2)});
}

/**
 * 涓€у寲涓嬫媺妗�
 */
;(function($,undefined){
	var namespace = '.wpcstselect';
	$.widget('wp.cstselect',{
		options : {
			selectclass:'wp-diy-selected'//鏍峰紡
		}, // 閰嶇疆椤�
		_create : function(){
			var self = this;
			var selectclass=self.options.selectclass;
			if(selectclass.length==0){ selectclass='wp-diy-selected';}
			// 蹇界暐澶氶€夌殑SELECT鎺т欢
			if(self.element.prop("multiple")) return;
			self._doinit(self).done(function(dom,selopts){
				var $ctarget = dom,$diysel = $ctarget.next('.'+selectclass+'-outside').find('.'+selectclass+'');
				// 璁剧疆榛樿鍊�
				setTimeout(function(){
					var $cursel = $diysel.children('.'+selectclass+'-left'),difw = $cursel.siblings('.'+selectclass+'-button').outerWidth() + 2,
					pad = self._int($cursel.css("paddingLeft")) + self._int($cursel.css("paddingRight")),finalw = $diysel.width() - difw - pad + 1;
					if (finalw <= 0) finalw = Math.max(65, $ctarget.width()) - pad - 16;
					$cursel.width(finalw).attr("val",$ctarget.val()).html($ctarget.find('option:selected').html());$cursel = difw = finalw = null;
				},50);
				// 缁戝畾CLICK浜嬩欢
				$diysel.bind('click'+namespace,function(e){
					if(self.options.disabled || !selopts.length) return;
					var $selectedcnt = $(selopts).appendTo('body'),maxheight = $selectedcnt.outerHeight(true);
					self._selected($selectedcnt, $ctarget.val()); // 璁剧疆榛樿鍊�
					// 缁戝畾LI:HOVER鍙奀LICK浜嬩欢
					if ($selectedcnt.is(':hidden')) {
						var $target = $(this);
						$selectedcnt.find('li').bind('mouseenter'+namespace, function(e){
							$(this).addClass('local').siblings().removeClass('local');
						}).bind('mouseleave'+namespace, function(e){
							$(this).removeClass('local');
						}).bind('click'+namespace, function(e){
							var $li = $(this),selval = $li.attr("val");
							$target.children('.'+selectclass+'-left').html($li.html()).attr("val", selval);
							$ctarget.val(selval).trigger('change');// 鎹曡幏宸茬粦瀹歋ELECT浜嬩欢
						}).end().slideDown('slow',function(){
							var $selcnt = $(this);
							// 瀹氫綅婊氬姩鏉� 2012/11/09
							var selcnt = $selcnt[0],clienth = selcnt.clientHeight,$selected = $selcnt.find('li.local');
							if ($selected.size() > 0) {
								var seltop = $._parseFloat($selcnt.css("top")),
								litop = seltop + $selected[0].offsetTop - selcnt.offsetTop + $selected.height();
								if(clienth < litop) selcnt.scrollTop = litop - clienth;
							}
							// End
							$(document).one('click'+namespace,function(e){
								$selcnt.slideUp().remove();
								return false;
							});
						});
						$selectedcnt.find('input.searchable_txt').click(function(e){
							e.stopPropagation();
						}).bind('keyup',function(e){
							if(e.keyCode==13) search_select_options($selectedcnt);
						})
						$selectedcnt.find('.searchable_button').click(function(e){
							e.stopPropagation();
							search_select_options($selectedcnt);
						})

						var txtw=$selectedcnt.find('.searchable_div').width()-10;
						$selectedcnt.find('input.searchable_txt').css('width',txtw+'px');

						setSeloptsPos($target,$selectedcnt,maxheight);
						// 缁戝畾RESIZE浜嬩欢
						$(window).resize(function(){
							setSeloptsPos($target,$selectedcnt,maxheight);
						});
					}
				});
				function setSeloptsPos(target,dom,maxh){
					var $target = target,pos = $target.offset();
					dom.css({
						"top": function(i,val){
							var wnh = window.innerHeight||self.innerHeight||document.documentElement.clientHeight||document.body.clientHeight,
							_top = self._int(pos.top),_oh = $target.outerHeight(true),newtop = 0;
							if (wnh < _top + maxh + _oh) {
								newtop = Math.max(0, _top - maxh - 1);
								$(this).css({"border-bottom": 'none',"border-top": '1px solid #B5B5B5'});
							} else newtop = _top + _oh + 1;
							wnh = _top = _oh = null;
							return newtop+'px';
						},"left": function(i,val){
							return self._int(pos.left)+'px';
						}
					});
				}
				function search_select_options($selectedcnt){
					var search_value=$selectedcnt.find('input.searchable_txt').val();
					$selectedcnt.find('li').each(function(){
						var li_lel=$(this);
						var li_val= li_lel.html();
						if(li_val.indexOf(search_value)===-1){
							li_lel.hide();
						}else{
							li_lel.show();
						}
					})
				}
			});
		},
	    value : function(value){
	    	var self = this;
			var selectclass=self.options.selectclass;
			if(selectclass.length==0){ selectclass='wp-diy-selected';}
			var $target = self.element,$select = $target.next('.'+selectclass+'-outside');
	    	$target.val(value);
	    	$select.find('.'+selectclass+'-left').attr("val",value).html($target.children('option:selected').html());
	    },
		_doinit : function(dom){
			var dtd = $.Deferred(),self = dom,$target = self.element;
			var isSearchable=self.element.hasClass('wp_hassearchable');
			var selectclass=self.options.selectclass,_stripslashes = function(str){
				return (str + '').replace(/\\(.?)/g, function(s, $1){
				    switch ($1) {
				    	case '\\': return '\\';
				    	case '0': return '\u0000';
				    	case '': return '';
				    	default: return $1;
				    }
			  	});
			};
			if(selectclass.length==0){ selectclass='wp-diy-selected';}
			$target.hide();// 闅愯棌SELECT鎺т欢
			// 鑷畾涔夌被SELECT
			var selopt = '',selw = Math.max($target.width(), 65);
			var selhtm = '<div class="'+selectclass+'-outside overz" style="float:left;width:'+selw+'px;"><div class="'+selectclass+'">';
			var search_html='';var search_class='';
			if(isSearchable){
				var imgsrc=relativeToAbsoluteURL('template/default/images/searchico.png');
				search_html ='<div class="searchable_div"><input type="text" value="" class="searchable_txt" ><div class="searchable_button"><img src="'+imgsrc+'" ></div></div>';
				search_class=' hassearchable ';
			}
			$target.children('option').each(function(i,c){
				var self = c;
				selopt += '<li val="'+self.value+'">'+_stripslashes(self.innerHTML)+'</li>';
			});
			selhtm += '<div class="'+selectclass+'-left" val="0">&nbsp;</div><div class="'+selectclass+'-button"><a href="###" onclick="return false;"></a></div></div></div>';
			$target.after(selhtm);
			dtd.resolve($target,'<div class="'+selectclass+'-content '+search_class+'overz" style="width:'+(selw-2)+'px;">'+search_html+'<ul>'+selopt+'</ul></div>');
			return dtd.promise();
		},
		_int : function(numstr){
			var number = parseInt(numstr);
			if(isNaN(number)) return 0;
			return number;
		},
		_selected : function(dom,value){
			dom.find('li').each(function(i,c){
				var $target = $(c),ent = '';
				ent = ($target.attr("val") == value)?'addClass':'removeClass';
				$target[ent]('local');
			});
			return true;
		},
		enable : function(){
			var self = this;
			var selectclass=self.options.selectclass;
			if(selectclass.length==0){ selectclass='wp-diy-selected';}
			var $select = self.element.next('.'+selectclass+'-outside');
			$select.find('.'+selectclass+'-left').css("color","#5A5A5A");
			$select.find('.'+selectclass+'-button > a').removeClass('disabled');
			$.Widget.prototype.enable.call(self);
		},
		disable : function(){
			var self = this;
			var selectclass=self.options.selectclass;
			if(selectclass.length==0){ selectclass='wp-diy-selected';}
			var $target = self.element,$select = $target.next('.'+selectclass+'-outside');
			// 杩樺師SELECT鎺т欢榛樿鍊�
			var firstopt = $target.find('option')[0];
			$target[0].selectedIndex = 0;
			$select.find('.'+selectclass+'-left').css("color","#7C7C7C").attr("val",firstopt.value).html(firstopt.innerHTML);
			$select.find('.'+selectclass+'-button > a').addClass('disabled');
			$.Widget.prototype.disable.call(self);
		},
		destroy : function(){
			var self = this;
			var selectclass=self.options.selectclass;
			if(selectclass.length==0){ selectclass='wp-diy-selected';}
			$(document).unbind(namespace);
			self.element.next('.'+selectclass+'-outside').unbind(namespace).remove();
			$.Widget.prototype.destroy.call(self);
		}
	});
})(jQuery);

/**
 * 鏂囨湰妗嗙粦瀹氱殑浜嬩欢
 * event(鍙傛暟) - 瑙﹀彂鍥炶皟鐨勬湰鍦颁簨浠跺璞�
 * -> onkeydown: function(event){
 * -> 	// do something
 * -> }
 * -> onkeyup: function(event){
 * -> 	// do something
 * -> }
 * -> onchange: function(event){
 * -> 	// do something
 * -> }
 * -> onfocus: function(event){
 * -> 	// do something
 * -> }
 * -> onblur: function(event){
 * -> 	// do something
 * -> }
 */
;(function($,undefined){
	var readyToOnBlur = true,
	  eventNamespace = '.wpcstinput';
	
	$.widget('wp.cstinput',{
		options : {
			value : '', // 鏂囨湰榛樿鍊�,
			regexp : /^\d+(\.\d+)?$/, // 杈撳叆鍊奸獙璇佹鍒�
			range : [0], // 鍙緭鍏ュ€艰寖鍥碵min,max](澶т簬0)
			maxlength : 4, // 鍙緭鍏ュ€奸暱搴�
			unit : 'px', // 鍙緭鍏ュ€煎崟浣�(鍍忕礌)
			step : 1, // 閫掑/鍑忔闀�
			style : '', // 鏄剧ず鍖哄煙鏍峰紡
			nmnode_style : '', // 鏂囨湰妗嗙埗鑺傜偣鏍峰紡
			btnnode_style : '', // 绠ご鐖惰妭鐐规牱寮�
			upbtn_style : '', // 涓婄澶磋妭鐐规牱寮�
			downbtn_style : '', // 涓嬬澶磋妭鐐规牱寮�
			complete : function(){} // 鏂瑰悜閿殑鍥炶皟鍑芥暟(绗竴涓弬鏁颁负褰撳墠瀵硅薄,绗簩涓弬鏁颁负閫掑/鍑忕殑鍊�)
		},
			
		_create : function(){
			var $this = this,
			  $input = $this.element,
			  options = $this.options;
			var uistyle = (options.hasOwnProperty('style') && options.style.length) ? ' style="'+options.style+'"' : '',
			nmstyle = (options.hasOwnProperty('nmnode_style') && options.nmnode_style.length) ? ' style="'+options.nmnode_style+'"' : '',
			btnstyle = (options.hasOwnProperty('btnnode_style') && options.btnnode_style.length) ? ' style="'+options.btnnode_style+'"' : '',
			upstyle = (options.hasOwnProperty('upbtn_style') && options.upbtn_style.length) ? ' style="'+options.upbtn_style+'"' : '',
			downstyle = (options.hasOwnProperty('downbtn_style') && options.downbtn_style.length) ? ' style="'+options.downbtn_style+'"' : '';
			$input.wrap('<div class="wp_cstinput_helper"'+uistyle+' unselectable="on"><div class="nminput_helper"'+nmstyle+' unselectable="on"></div>'
			+'<div class="minplus_helper"'+btnstyle+' unselectable="on"><span class="up"'+upstyle+' unselectable="on"></span><span class="down"'+downstyle+' unselectable="on"></span></div></div>');
			// Default value
			if(options.hasOwnProperty('value') && options.regexp.test(options.value)) $input.focus().val(options.value);
			// Maxlength
			if(options.hasOwnProperty('maxlength') && /^[1-9]{1}\d*$/.test(options.maxlength)) $input.attr('maxlength',options.maxlength);
			// Unit(鍍忕礌)
			if(options.hasOwnProperty('unit') && options.unit.length)
			  $input.closest('.wp_cstinput_helper').after('<div class="wp_cstunit_helper" unselectable="on">'+options.unit+'</div>');
			
			// Bind input events
			$.each(['keydown','keyup','change','focus','blur'],function(i,event){
				$input.bind(event+eventNamespace,function(e){
					if(!readyToOnBlur && (event == 'blur')) return false;
					$this._trigger('on'+event, e, null);
				});
			});

			// Bind buttons events
			var $buttons, upbtn, downbtn;
			$buttons = $this.buttons = $input.closest('.wp_cstinput_helper').find('.minplus_helper > span');
			upbtn = $buttons[0];
			downbtn = $buttons[1];
			$buttons.mousedown(mouseDown).mouseup(mouseUp).mouseout(mouseUp);
			
			function mouseDown(){
				if(options.disabled) return;
				var step = (this === upbtn) ? options.step : -options.step;	
				$input.focus();
				$input.select();
				
				readyToOnBlur = false;
				$this._doCount(step);
				return false;
			}
			
			function mouseUp(){
				if (!readyToOnBlur) {
				//	$this._stopCount();					
					readyToOnBlur = true;
				}
				return false;
			}
		},
		
		_doCount : function(step){
			var newval,
			  range = this.options.range,
			  curval = this.element[0].value;
			if(!curval.length){ 
				// input鍊间负绌烘椂锛岀偣鍑诲€煎彉涓�0 leiminglin 2014/4/22 
				curval = this.element[0].value = 0;
			}
			newval = this._parseValue(curval) + step;
			if($.isFunction(range)){
				range=range.apply(this.element[0])
			}
			// 鑼冨洿闄愬畾
			if ($.isArray(range) && (range.length > 0)) {
				var min,max;
				if(typeof range[0] != 'undefined') min = range[0];
				if(typeof range[1] != 'undefined') max = range[1];
				// 婧㈠嚭鍒ゆ柇
				if((step < 0) && (typeof min === 'number') && (newval < min)) newval = min;
				if((step > 0) && (typeof max === 'number') && (newval > max)) newval = max;
			}
			this.element[0].value = newval;
			// 缁戝畾鏂瑰悜閿殑鍥炶皟鍑芥暟
			if($.isFunction(this.options.complete)) this.options.complete(this.element,newval);
		},
			
		_parseValue : function(numString){
			var number = parseFloat(numString);
			if(isNaN(number)) return 0;
			return number;
		},
		
		enable : function(){
			this.buttons.removeClass('cstinput_disabled');
			$.Widget.prototype.enable.call(this);
		},
		
		disable : function(){
			this.buttons.addClass('cstinput_disabled');
			$.Widget.prototype.disable.call(this);
		},
		
		destroy : function(){
			var $this = this.element,
			  $cstinput_helper = $this.closest('.wp_cstinput_helper');
			$this.removeAttr('maxlength').unbind(eventNamespace);
			$cstinput_helper.before($this[0]);
			$cstinput_helper.siblings('.wp_cstunit_helper').remove().end().remove();
			$.Widget.prototype.destroy.call(this);
		}
	});
})(jQuery);

// 鑷畾涔夊瀭鐩存粴鍔ㄦ潯 2014/02/07
;(function($, undefined){
	var namespace = 'simroll',
	getMscrollWidth = function(){
		var noScroll,scroll,oDiv = document.createElement("DIV");
		oDiv.style.cssText = "position:absolute;top:-1000px;width:100px;height:100px;overflow:hidden;";
		noScroll = document.body.appendChild(oDiv).clientWidth;
		oDiv.style.overflowY = "scroll";
		scroll = oDiv.clientWidth;
		document.body.removeChild(oDiv);
		return noScroll - scroll;
	};
	$.widget('wp.mscroll', {
		options : {
			difleft: 0,/*婊氬姩鏉¤嚜瀹氫箟鍋忕Щ閲�*/
			maskleft: 0,/*婊氬姩鏉￠伄缃╁眰left*/
			barleft: 0,/*婊氬姩鏉℃粦鍧條eft*/
			height: 0,/*婊氬姩鏉eight*/
			maskbg: '#fff',
			maskcname: 'wp-mobile-device-mask',/*婊氬姩鏉￠伄缃╁眰class*/
			barcname: 'wp-mobile-scrollbar'/*婊氬姩鏉℃粦鍧梒lass*/
		},
		_create : function(){
			var self = this,creatid = '-'+self._getRandomStr(),maskbg = (self.options.maskbg||'').length?'background:'+self.options.maskbg:'',
			barstr = '<div id="'+namespace+creatid+'-mask" class="'+self.options.maskcname+'" style="'+maskbg+'"></div>';
			barstr += '<div id="'+namespace+creatid+'-bar" class="'+self.options.barcname+'"><span class="pane"></span></div>';
			self.options.creatid = creatid;
			self.element.before(barstr);
			self._setScrollPos(creatid);
			self._bindScroll(creatid);
		},
		_setScrollPos : function(id){
			var prefid = namespace+id,barleft = 0,self = this,$target = self.element,
			$mask = $target.prevAll('#'+prefid+'-mask'),$bar = $target.prevAll('#'+prefid+'-bar');
			$mask.add($bar).css({"left": function(){
				var curtype = $(this).attr("id").replace(prefid+'-', '');
				if (self.options[curtype+'left']) barleft = self.options[curtype+'left'];
				else {
					var swidth = getMscrollWidth() || 16;
					barleft = self._parseFloat($target.css("left")) + $target.width() - swidth;
				}
				return barleft+'px';
			},"height": ($target.height() + 1)+'px',"visibility": 'visible'});
			$bar.css("left", function(){return (barleft + self._parseFloat(self.options.difleft||0))+'px'});
		},
		_bindScroll : function(id){
			var self = this,$target = self.element,$bar = $target.prevAll('#'+namespace+id+'-bar'),paneH = 0,
			$spane = $bar.children('span.pane'),containerH = $target.height(),paneContainerH = 0;
			$target.bind("scroll."+namespace, function(e){
		  		var contentH = this.scrollHeight;$bar.height(self.options.height||containerH);
		  		if (containerH < contentH) paneH = self._parseFloat(containerH*containerH / contentH);
		  		$spane.height(paneH);
		  		var maxtop = containerH - paneH,
		  		movey = self._parseFloat(this.scrollTop * containerH / contentH);
		  		$spane.css("top", Math.min(movey, maxtop)+'px');
		  	}).triggerHandler("scroll."+namespace);
			// Pane Handler
		  	(function(){
		  		var curtop,curpagey;
		        $spane.bind("mousedown."+namespace, function(e){
		            e.preventDefault();curpagey = e.pageY;
		            curtop = self._parseFloat($spane.css("top"));
		            $spane.addClass("scrolling");
		            $(document).bind("mousemove."+namespace, function(e){
			        	if (! $spane.hasClass("scrolling")) return;
			        	var newtop = curtop + e.pageY - curpagey,panetop = Math.max(0, newtop),
			        	target = $target.get(0),contentH = target.scrollHeight;
			        	// Reset pane-top
			        	var scrltop = self._parseFloat(panetop * contentH / containerH),
			        	maxtop = containerH - $spane.height();
			        	if (panetop >= maxtop) scrltop = contentH - target.clientHeight;
			        	$target.scrollTop(scrltop);return false;
			        }).bind("mouseup."+namespace, function(e){
			        	e.preventDefault();$(document).unbind("."+namespace);
			        	$(parent.document).unbind(".rmscroll");
			        	if (! $spane.hasClass("scrolling")) return;
			        	$spane.removeClass("scrolling");
			        });
			        $(parent.document).bind("mouseup.rmscroll",function(){$(document).unbind("."+namespace)});
		        }).bind("mouseup."+namespace, function(e){
		        	$(document).unbind("."+namespace);
		        	$(parent.document).unbind(".rmscroll");return false;
		        });
		  	})();
		},
		_getRandomStr : function(len){
		    len = len || 16;
		    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
		    maxlen = chars.length,result = '';
		    for(var i = 0; i < len; i++){
		        result += chars.charAt(Math.floor(Math.random() * maxlen));
		    }
		    return result;
		},
		_parseFloat : function(numstr){
			var number = parseFloat(numstr);
			if (isNaN(number)) return 0;
			return number;
		},
		destroy : function(){
			var self = this,prefid = '#'+namespace+self.options.creatid;
			$(document).add(self.element).unbind("."+namespace);
			self.element.prevAll(prefid+'-mask,'+prefid+'-bar').remove();
			$.Widget.prototype.destroy.call(self);
		}
	});
})(jQuery);

//js鐢熸垚guid
function fGuid(bOrg)
{
//	 try
//	 {
//		 var sGuid=new ActiveXObject('scriptlet.typelib').GUID
//	 } 
//	 catch(e)
//	 { 
//		 var sGuid=fGuidCst();
//	 }
	 var sGuid=fGuidCst();
	 if(bOrg) return sGuid;
	 return (sGuid+'').replace(/\{|\}|-/g,'');
	 
	 function fGuidCst()
	 {
		  var sGuid='';
		  for(var i=1; i<=32; i++)
		  {
			   var nNum=0;
			   nNum=parseInt(Math.random()*16);
			   sGuid+=nNum.toString(16);
			   if(i==8||i==12||i==16||i==20)sGuid+='-';
		  }
		  return '{'+sGuid.toUpperCase()+'}';
	 }
}

(function(window){
	/**
	 * 瀵硅瘽妗嗙紦瀛榓jax璇锋眰
	 */
	var html_caches={};
	// 瀵硅瘽妗咺D
	var dialog_ids = [];
	
	/**
	 * Float瀵硅瘽妗�
	 * (String)load_url - 鍔犺浇鐨勫湴鍧€
	 * (Object)option - 閰嶇疆椤�(title|titlebg|contentClass|id|width|height|left|top|isCenter|overlay|showBottom|zIndex|open|close)
	 */
	function wp_floatpanel(load_url,option){
		var config = $.extend({},{
			title: 'Title',
			titlebg: true,
			contentClass: 'wp-panel_outpadding',
			id: 'wp-float_panel',
			width: 286,
			height: 'auto',
			left: 5,
			top: 60,
			isCenter: false,
			overlay: false,
			isIframe: false,
			contain:$('body'),
			zIndex: 1000,
			showBottom: false,
			cache: true,
			postbody:false,
			swfFix: false,
			open: function(){
				var id = this.id;
				id && dialog_ids.push(id);
			},
			close: function(){},
			data: option['data']||"{}",
		},option||{});
		// Remove old panel
		var pnl,$pnl,wp_timer,id = config.id,$target = id?$('#'+id):$('.wp-floatpanel_dialog'),$contain=config.contain;
		// Init parameters
		var rgx = /^\d+$/i,plw = config.width,plh = config.height,pllt = config.left,pltp = config.top,cc = config.contentClass,
		ct = config.isCenter,ol = config.overlay,z = config.zIndex,sm = config.showBottom,isfrm = config.isIframe;
		if (!$target.size()) {
			// Init overlay
			var ols = '';
			if (ol) {
				var $overlay = $('#wp-floatpanel_overlay');
				if($overlay.size() > 0) $overlay.remove();
				ols = '<div id="wp-floatpanel_overlay" style="z-index:'+z+';"></div>';
				z += 1;
			}
			// Show or not bottom
			var sms = '';
			if (sm) {
				sms += '<div class="wp-show_allpage"><input type="checkbox" name="show_allpage" value="" /><span>'+translate('property.showInBottom')+'</span></div>'
				+ '<div class="wp-coordinate"><span>x:<input type="text" name="xpos" value="0" id="xpos" /></span>'
				+ '<span>y:<input type="text" name="ypos" value="0" id="ypos" /></span>'
				+ '<span class="wp-coordinate-w">w:<input type="text" name="xwidth" value="0" id="xwidth" /></span>'
				+ '<span>h:<input type="text" name="xheight" value="0" id="xheight"/></span>'
				+ '<span class="wp-coordinate-lock overz"><img src="'+relativeToAbsoluteURL('template/default/images/un-lock.png')+'" width="16" height="15" /></span></div>';
			}
			// Loading area
			var $tmpwin = $(window),$load = $('#wp-floatpanel_loading'),loadstr = '<div id="wp-floatpanel_loading" style="z-index:'+(z-1)+';"><img src="'+relativeToAbsoluteURL('template/default/images/loading.gif')+'" width="16" height="16" /></div>';
			if($load.size() > 0) $load.remove();
			// Create panel
			var superid = $.options ? $.options.superid : 0;
			//<img src="'+relativeToAbsoluteURL("template/default/images/wp-help_icon.png")+'" width="16" height="16" class="wp-help" />
			var $ap = $('<div id="'+id+'" class="wp-floatpanel_dialog wp-manage_panel overz" style="display:none;position:absolute;z-index:'+z+';" belong="'+(superid||null)+'"><div class="wp-title overz'+(config.titlebg?' wp-title_black':'')+'"><h2>'+config.title+'</h2>'
			+'<div class="wp-icon" style="width:19px;"><a href="javascript:;" class="close"></a></div></div>'
			+'<div class="'+cc+' overz"></div>'+sms+'</div>'+ols+loadstr).appendTo($contain);
			pnl = $ap[0];$pnl = $(pnl);
			// Loading position
			var winWidth = $tmpwin.width(),pnlWidth = $pnl.width();
			$('#wp-floatpanel_loading').width(winWidth).height($tmpwin.height());
			// Events
			$pnl.draggable({handle: '.wp-title',cancel: '.wp-icon',cursor: 'move',scroll: false,iframeFix: true,start: function(e,ui){
				var $target = $(this),titleH = $target.find('.wp-title').outerHeight();
				$('.wp-diy-selected-content').slideUp().remove();// 鎷栨嫿寮圭獥鏃舵敞閿€鈥滆嚜瀹氫箟SELECT涓嬫媺妗嗏€� 2012/11/09
				// SWF object ghost lines
				if (config.swfFix) {
					var $swf = $target.find('object');
					if ($swf.length > 0) {
						$swf.parent().data("wpswfsize",{"width": $swf.width(),"height": $swf.height()});
						$swf.css({"height": '0',"width": '0',"visibility": 'hidden'});
					}
					$swf = null;
				}
				if ($target.find('iframe').length > 0) {
					var $innerfrm = $target.find('.ui-resizable-innerIframeFix');
					($innerfrm.length > 0) && $innerfrm.remove();
					$('<div class="ui-resizable-innerIframeFix" style="background-color:#FFF;"></div>').css({
						left: 0,top: titleH+'px',position: 'absolute',opacity: '0.001',zIndex: 1000,
						width: $target.width()+'px', height: ($target.height() - titleH)+'px'
					}).appendTo($target);
				}
			},drag: function(e,ui){
				var pos = ui.position;// 闃叉孩鍑� 2012/10/29
				if(pos.top < 0) pos.top = 0;
				if(pos.left <0) pos.left = 0;
				if(winWidth < pnlWidth + pos.left) pos.left = winWidth - pnlWidth;
			},stop: function(){
				var $innerfrm = $('.ui-resizable-innerIframeFix', this);
				($innerfrm.length > 0) && $innerfrm.remove();
				// SWF object ghost lines
				if (config.swfFix) {
					var $swf = $(this).find('object');
					if ($swf.length > 0) {
						var $swfprt = $swf.parent(),swfsize = $swfprt.data('wpswfsize');
						$swf.css({"height": (swfsize.height||24)+'px',"width": (swfsize.width||82)+'px',"visibility": 'visible'});
						$swfprt.removeData('wpswfsize');$swfprt = swfsize = null;
					}
					$swf = null;
				}
			}}).bind('wpdialogclose',function(e){
				$pnl = {};// 娉ㄩ攢$pnl瀵硅薄
				clearTimeout(wp_timer);
				var dom = $(e.target);
				var dialogid = dom.attr("id")||'',
				cancelarr = ['wp-add_page','wp-page-obj-chooser','wp-file_explore','wp_settemplate',
					'wp-filecategory_panel','wp-manage_plugins','wp_multilang_setting','wp-backup',
					'wp-page_setting','wp-seo_setting','wp-watermark_setting','wp-mobile_setting',
					'wp-add_template','wp-ask_page_name','wp-page_save'];
				if(ol) dom = dom.add('#wp-floatpanel_overlay');
				if($.isFunction(config.close)) config.close(dom[0]);
				$(document).trigger('click');//IE8涓棤娉曠Щ闄stselect鎻掍欢鐨刣iv.wp-diy-selected-content
				// Set storage-data
				for(var i = 0,l = dialog_ids.length;i < l;i++){
					if (dialog_ids[i] == dialogid) {
						dialog_ids.splice(i, 1);
						break;
					}
				}
				if (! dialog_ids.length && ($.inArray(dialogid, cancelarr) < 0)
				 && (typeof breakpoint_save != 'undefined')) {
					breakpoint_save.setObj({});/*for 'breakpoint save'*/
				}
				return dom.add('#wp-floatpanel_loading').remove();
			});
		} else {
			$pnl = $target;
			pnl = $target[0];
		}
		// Load content
		$.Deferred(function(dtd){
			// Modal setting
			if (isfrm == false) {
				if(config.cache && html_caches[load_url]){
					var data=html_caches[load_url];
					dtd.resolve(data);
				}else{
					var ajaxopts={};
					if(config.postbody)  ajaxopts={data:config.postbody};
					$.ajax($.extend({
						type: "POST",url: load_url,
						data: config.data,
						beforeSend: function(){
							// 鍙栨秷鍏ㄥ眬璁剧疆灞炴€т互淇IE鈥滈棯灞忊€濋棶棰� 2012/10/30
						},success: function(data){
							if(data.length > 0){
								if(data == 'Session expired')
									window.location.href = getSessionExpiredUrl();
								dtd.resolve(data);
								if(config.cache) html_caches[load_url]=data;
							} 
							else dtd.reject();
						},error: function(xhr, textStatus, errorThrown){
							wp_alert((errorThrown||textStatus)+'('+config.title+')'+".<br/>"+translate('Request failed!')); 
							$pnl.triggerHandler('wpdialogclose');
							return false;
						}
					},ajaxopts));
				}
			} else {
				var frmw = plw - 26/*宸﹀彸padding鍊间负2*13px*/,frame = '<div class="wp-iframe_beforloaded"><img src="'+relativeToAbsoluteURL('template/default/images/loading.gif')+'" width="16" height="16" /></div>'
				+'<iframe id="'+id+'_frame" name="'+id+'_frame" allowtransparency="true" frameborder="0" src="'+load_url+'" scrolling="auto" width="'+frmw+'" onload="this.height=200;$(\'.wp-iframe_beforloaded\',\'#'+id+'\').remove();initFrame(this,\''+cc+'\',\''+plh+'\');"></iframe>';
				dtd.resolve(frame);
			}
			return dtd.promise();
		}).done(function(data){
			$('#wp-floatpanel_loading').remove();
			// Append innerHTML
			var ocs = {};
			$('.'+cc,pnl).html(data);
			if(rgx.test(plw)) ocs['width'] = plw+'px';
			if(rgx.test(plh)) ocs['height'] = plh+'px';
			// Reset position
			if (ct || ol) {
				$pnl.show().css(ocs);
				wp_timer = setTimeout(function(){
					$pnl.triggerHandler('wpdialogsetpos');
				},30);
				// Bind window resize
				var $win = $(window), _winw = $win.width(), _winh = $win.height();
				$(window).resize(function(){
					var _iwinw = $(this).width(), _iwinh = $(this).height();
					if (_winw * _winh == _iwinw * _iwinh) return false;
					_winw = _iwinw;_winh = _iwinh;
					panel_position($pnl,plw,plh,ol,'wp-floatpanel_overlay');
				});
				$pnl.bind('wpdialogsetpos',function(e){
					panel_position($pnl,plw,plh,ol,'wp-floatpanel_overlay');
				});
			} else {
				if(rgx.test(pllt)) ocs['left'] = pllt+'px';
				if(rgx.test(pltp)) ocs['top'] = pltp+'px';
				$pnl.css(ocs).show();//.animate(ocs,'slow');
			}
			config.open(pnl);
		}).fail(function(){
			wp_alert(config.title+"(deferred fail).<br/>"+translate('Request failed!')); 
			$pnl.triggerHandler('wpdialogclose');
			return false;
		});
		// Bind close events
		$('.wp-title a.close',pnl).bind('click',function(e){
			$pnl.triggerHandler('wpdialogclose');
			// IE涓嬬姝㈣Е鍙憃nbeforeunload
			e.preventDefault();
		});
		return null;
	}
	window.wp_floatpanel=wp_floatpanel;
})(window);

// Dialog瀹氫綅
function panel_position(dom,width,height,isoverlay,overlayid){
	if(dom instanceof jQuery == false) return;
	var $target = dom,/*$win = $(window),*/tpw = $target.outerWidth(true),tph = $target.outerHeight(true),
	floor = Math.floor,rgx = /^\d+$/i,ocs = {};
	var scrolltop=$(document).scrollTop();
	// Parse
	if(rgx.test(height)) tph = height;
	tpw = Math.max(tpw,width);
//	var wnw = $win.width(),wnh = $win.height();
	var wnw = window.innerWidth || self.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
	wnh = window.innerHeight || self.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	pltp = floor((wnh - tph)/2);
	pllt = floor((wnw - tpw)/2);
	// Overlay
	if(isoverlay) $('#'+overlayid).width(wnw).height(wnh);
	// Panel
	ocs['left'] = pllt+'px';
	ocs['top'] = ((pltp>0?pltp:0)+scrolltop)+'px';
	$target.css(ocs);//animate(ocs,'slow');
//	return ocs;
}

$._parseFloat = function(numString){
	var number = parseFloat(numString);
	if(isNaN(number)) return 0;
	return number;
}

function fix_img_url_path(imgurl){
	var escapeRegExp = (function () {
		var specials = [ '-','[',']', '/','{', '}', '(',')', '*','+','?', '.','\\', '^','$', '|' ];
		var regex = new RegExp('[' + specials.join('\\') + ']', 'g'); 
		return function escapeRegExp(str) {
			return str.replace(regex, '\\$&');
		};
	})();
	var imgfilenameregxp=/\/([^\/]+)$/;
	var matches=imgurl.match(imgfilenameregxp);
	var codedimgurl='';
	if(matches){
		var oldfilename=matches[1];
		var newfilename=encodeURIComponent(oldfilename);
		var oldfileregexp=new RegExp(escapeRegExp(oldfilename)+'$');
		codedimgurl=imgurl.replace(oldfileregexp,newfilename);
	}else{
		codedimgurl=encodeURIComponent(imgurl);
	}
	return codedimgurl;
}

/**
* 鍥剧墖鑷€傚簲 灞呬腑鏄剧ず
*/
function set_pic(obj) {
	var img = new Image();
	img.src =$(obj).attr("src"); 
	var width=img.width;
	var height=img.height;
	if(width==0){
		width=107;
	}
	if(height==0){
		height=107;
	}
	var W=107;
	var H=107;
	var _width=107;
	var _height=107;
	var _top=0;
	if(width>height){
		_height=(height*H)/width;
		_top= (W-_height)/2;
		$(obj).attr('style','width: ' + _width + 'px;height:'+_height+'px;');
		$(obj).parent().css('top', _top);
	}else{
		_width=(width*H)/height;
		_top= (W-_width)/2;
		$(obj).attr('style','width: ' + _width + 'px;height:'+_height+'px;left:'+_top+'px;');
		$(obj).parent().css({'top':0,'left':_top});
	}
	
}	

/**
 * 鎵嬫満绔欏脊绐�(妯℃嫙鏂扮獥鍙ｆ墦寮€) 2014/06/09
 */
function msite_popup(url){
	var $container = $('#scroll_container'),maxh = $(window).height(),
	bgimg = relativeToAbsoluteURL('template/default/images/loading.gif'),
	css = 'position:absolute;top:0;left:0;width:320px;overflow:hidden;z-index:10000',
	ihtml = '<div class="mspopup_mask" style="background:url('+bgimg+') no-repeat 50% 20% #fff;height:'
	+maxh+'px;'+css+'"><iframe allowtransparency="true" frameborder="0" scrolling="no" width="320" height="'
	+maxh+'" src="'+url+'" onload="mspopup_onload(this)"></iframe></div>';
	
	var $mask = $container.children('.mspopup_mask');
	if(! $mask.length) $container.append(ihtml).attr("data-height", $container.height()).height(maxh);
}

function mspopup_onload(win){
	win.height = 'auto';
	var bodh = win.contentWindow.document.body.scrollHeight,
	doch = win.contentWindow.document.documentElement.scrollHeight,
	maxheight = Math.max(bodh, doch);
	
	// Reset height
	win.height = maxheight;
	$(win).parent('.mspopup_mask').height(maxheight)
	.parent('#scroll_container').height(maxheight);
}

function create_pc_media_set_pic(layer_id,editmode){
	var func=function(obj) {
		var callback=function(img){
				img.show();
				img.closest('.img_over').children('.imgloading').remove();
				if(!editmode){
					$(function(){			
						var super_id=layer_id;
						var dom_img=$("#"+super_id).find('.paragraph_image');
						var left_img=parseInt(dom_img.css('left'));
						var top_img=parseInt(dom_img.css('top'));
						var width_img=parseInt(dom_img.css("width"));
						var height_img=parseInt(dom_img.css("height"));
						if(isNaN(left_img)){ left_img=0; }
						if(isNaN(top_img)){ top_img=0; }
						var ii=0;
						$("#"+super_id).find(".wp_mapclass").each(function(){
							var shape="rect";
							shape=$(this).attr('shape');
							if(shape != "circle"){
								shape="rect";
							}

							var leftz=parseInt($(this).css("left"));
							var topz=parseInt($(this).css("top"));
							var widthz=parseInt($(this).css("width"));
							var heightz=parseInt($(this).css("height"));

							if(shape != "circle"){
								var coords='0,0,0,0';
							}else{
								var coords='0,0,0';
							}		
							if( (leftz+widthz) < left_img || (topz+heightz)< top_img){
							}else{
								var cleft=0;
								var ctop=0;
								var r=0;
								if(shape != "circle"){
									cleft=leftz-left_img;
									ctop=topz-top_img;
									coords=cleft+','+ctop+','+(cleft+widthz)+','+(ctop+heightz);
								}else{
									r=widthz/2;
									cleft=leftz-left_img+r;
									ctop=topz-top_img+r;
									coords=cleft+','+ctop+','+r;
								}
							}	

							//var classid=$(this).attr('id');
							var classid="map_arear_"+ii;
							ii++;
							var mapd=$(this).parent().find("."+classid);
							mapd.attr('coords',coords);
							$(this).remove();

						});
					})
				}
		}
		$(obj).each(function() {
			var img=$(this);
			callback(img);
		});      
	}
	window['set_thumb_'+layer_id]=func;
}