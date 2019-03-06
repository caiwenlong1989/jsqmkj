function fullpagefooterinit(){
	//fullpagefooterdrag();
	//fullpagefooterresize();
	//$.showSiteFooterTips();
	$('.fullpage_alllist').each(function(){
		if($('.full_column:not([deleted="deleted"])').length > 0){
	        wp_alert(translate('full_column.already in backplane'));
	    }
	})
	$('.full_pagescroll').each(function(){
		fullpagescrollinit($(this));
	})
        //鐐逛寒婊氫寒鎿嶄綔
        $(document).bind('fullpage_scroll_pro',function(e,section){
            setTimeout(function(){
                if($('#wp-property_settings2').length){
                    //var index=$.parseInteger(section.replace('page',''));
                    var index='';
                    $('#canvas #fullPage-nav li').each(function(e){
                       // if($(this).find('a.active').length>0) index = e + 1;
                    })
                    $('.fullpage_alllist .section').each(function(e){
                        if($(this).hasClass('active')) index = e + 1;
                    })
                    
                    if(index>0){
                        //$('#wp-property_settings2 .wp-manage-panel-album-img:eq('+(index-1)+')').css('border-color','red');
                        $('#all_extra_img_div .wp-manage-panel-album-img').each(function(i){
                            var j = i + 1;
                            if(j==index) $(this).addClass('action');
                            else         $(this).removeClass('action');
                        })
                    }
                }
            },100)
        })
}

function fullpagescrollinit(dom){
	dom.children('.full_width').css({left:0-canv.offset().left-$.parseInteger($('#canvas').css("borderLeftWidth")),width:$('#scroll_container_bg').width()});
	dom.wp_rightkey(); 
	if(dom.is(':not(.isplate)')){
//		fullpagescrolldrag(dom);    
		fullpagescrollresize(dom);
                setTimeout(function(){
                        fullpagescrolldrop(dom);
                },1300);
		//fullpagescrolldrop(dom);
	}
	
}
/*
function fullpagefooterdrag(){
	var maxminusheight=0;
	var curcanvheight=canv.height();
	var Command=Undo.Command.createModuleCommand(function(blockid,val){
			var blockel=$('#'+blockid);
			blockel.css('top',val.top);
			canv.height(val.canvheight);
			$('#scroll_container_bg').css('height',(val.canvheight+blockel.height())+'px');
			$.fullpageupdateselectbgopt();
			$.updatepospropblk();
			$.canvasHeightChange();
	 },null,{returntype:'class'});
	 
	 var undoobj=null;
	$('#site_footer').draggable({
			cursor: 'move',
			axis: "y",
			start: function(event, ui){
				initCanvasHeight();
				var canvasminheight=canv.data('layermaxheight')||0;
				curcanvheight=canv.height();
				maxminusheight=curcanvheight-canvasminheight;
				undoobj=new Command('site_footer');
				undoobj.setOldVal({top:$.parseInteger($(this).css('top')),canvheight:curcanvheight});
			},
			drag: function(event, ui){

				var topmovepx = ui.position.top - ui.originalPosition.top;
				if(topmovepx<0){
					var delta=0-topmovepx;
					if(delta>maxminusheight){
						var canvasminheight=canv.data('layermaxheight')||0;
						ui.position.top=ui.originalPosition.top-maxminusheight;
						canv.height(canvasminheight);
						$('#scroll_container_bg').css('height',(canvasminheight+$(this).height()+100)+'px');
						$.fullpageshowselectbgopt($(this));
						$(this).triggerHandler('drag_progress',[{left:0,top:ui.position.top}]);
						return;
					} 
				}
				$(this).triggerHandler('drag_progress',[{left:0,top:ui.position.top}]);
				canv.height(curcanvheight+topmovepx);
				$.fullpageshowselectbgopt($(this));
				$('#scroll_container_bg').css('height',(curcanvheight+topmovepx+$(this).height()+100)+'px');
			},
			stop:function(event, ui){
				var topmovepx = ui.position.top - ui.originalPosition.top;
				canv.height(curcanvheight+topmovepx);
				$('#scroll_container_bg').css('height',(curcanvheight+topmovepx+$(this).height()+100)+'px');
				$.canvasHeightChange();
				correctFooterPos();
				undoobj.insertWithNewVal({top:$.parseInteger($(this).css('top')),canvheight:curcanvheight+topmovepx});		
				undoobj=null;
				$(this).trigger('drag_stop',[{left:parseInt($(this).css('left')),top:parseInt($(this).css('top'))}]);
			}
			
	});
}
*/

function fullpagescrolldrag(dom){
	dom.wp_drag();
}

function fullpagescrollresize(dom){
	var createhandlefunc=function(handle){
		     dom.each(function(){
					 var hname = 'ui-resizable-'+handle;
					var axis = $('<div class="ui-resizable-handle ' + hname + '"><p class="knob "></p></div>');
					
					axis.css({zIndex: 1000});
					$(this).children('.full_width').append(axis);
			 })
				
	}
	var createplaceholderfunc=function(handle){
			  dom.each(function(){
					var hname = 'placeholder-'+handle;
					var axis = $('<div class="li-placeholder  ' + hname + '"></div>');
					axis.css({zIndex: 1000}).hide();
					$(this).children('.full_width').append(axis);
			  })
	}
	createhandlefunc('n');
	createhandlefunc('s');
	createplaceholderfunc('w');
	createplaceholderfunc('e');
	
	var fullpagescrollbuttompos;
	dom.resizable({
			handles: {n: '>.full_width .ui-resizable-n',s: '>.full_width .ui-resizable-s'},
			noinit:true,
			canvascontain: '#canvas',
			distance: 0,
		     concernLock:true,
			scroll: true,
			create:function(){
				$(this).children('.full_width').find('.ui-resizable-handle').hide();
			},
			start: function(event, ui){
				fullpagescrollbuttompos=$.getFullColChildMaxButtomfullpage(dom);
				var self=$(this);
				var resizeundo=new ResizeCommand(self.attr('id'));
				var oldcssarr=['top','height'];
				var oldval={};
				for(var i=0;i<oldcssarr.length;i++){
					oldval[oldcssarr[i]]=self.css(oldcssarr[i]);
				}
				resizeundo.setOldVal(oldval);
				$(document).data('resizeundo',resizeundo);
			},
			resize: function(event, ui){
				
				var curtop=dom.ab_pos_cnter('top');
				var curheight=$.parseInteger(dom.css('height'));
				if($.getElementAreaInf($(this))=='canvas'){
					var maxbuttom=Math.max(curtop+fullpagescrollbuttompos,curtop+curheight);
					$.canvasheightresizeOrigin(maxbuttom);
				}
				
				$(this).children('.full_content,.full_width').height($(this).height());
				$(this).triggerHandler('resize_progress',[{ui:ui}]);
				$.fullpageshowselectbgopt($(this));
				
			},
			stop:function(event, ui){
				$(this).children('.full_content,.full_width').height($(this).height());
				$.fullpageshowselectbgopt($(this));
				var resizeundo=$(document).data('resizeundo');
				$(document).removeData('resizeundo');
				var self=$(this);
				var oldcssarr=['top','height'];
				var newval={};
				for(var i=0;i<oldcssarr.length;i++){
					newval[oldcssarr[i]]=self.css(oldcssarr[i]);
				}
				$(this).triggerHandler('resize_stop',[{ui:ui}]);
				resizeundo.insertWithNewVal(newval);	
			}
			
	});
        //鍒濆鍖杛esize 绗竴灞忚嚜閫傚簲澶勭悊
//        $(this).css({"width":($(window).width()-0) + "px","left":-$.fullpagecanvasleft() + "px"});//娴忚鍣ㄥぇ灏忕缉鏀惧鐞�
//        var $paragraph_image = $(this).find('.section .bg > img');
//        var maxjson = {width:$(window).width(),height:$(window).height()};
//        var json = {width:$paragraph_image.width(),height:$paragraph_image.height()};
//        $.wp_fullpagezoom($(this),maxjson,json,'noresize');
}
/*
function fullpagefooterresize(){
	var createhandlefunc=function(handle){
				var hname = 'ui-resizable-'+handle;
				var axis = $('<div class="ui-resizable-handle ' + hname + '"><p class="knob "></p></div>');
				axis.css({zIndex: 1000});
				$('#site_footer >.full_width').append(axis);
	}
	var createplaceholderfunc=function(handle){
				var hname = 'placeholder-'+handle;
				var axis = $('<div class="li-placeholder  ' + hname + '"></div>');
				axis.css({zIndex: 1000});
				$('#site_footer> .full_width').append(axis);
	}
	createhandlefunc('n');
	createhandlefunc('s');
	createplaceholderfunc('w');
	createplaceholderfunc('e');
	
	
	var maxminusheight=0;
	var curcanvheight=canv.height();
	var canvasminheight=0;
	
	var Command=Undo.Command.createModuleCommand(function(blockid,val){
			var blockel=$('#'+blockid);
			blockel.css('top',val.top);
			blockel.css('height',val.height);
			canv.height(val.canvheight);
			blockel.children('.full_content,.full_width').height(val.height);
			$('#scroll_container_bg').css('height',(val.canvheight+blockel.height())+'px');
			$.fullpageupdateselectbgopt();
			$.updatepospropblk();
			$.canvasHeightChange();
	 },null,{returntype:'class'});
	 
	 var undoobj=null;
	 var resizertimer=null;
	$('#site_footer').resizable({
			handles: {n: '>.full_width .ui-resizable-n',s: '>.full_width .ui-resizable-s'},
			noinit:true,
			distance: 0,
			scroll: true,
			create:function(){
				$(this).children('.full_width').find('.ui-resizable-handle').hide();
			},
			start: function(event, ui){
				initCanvasHeight();
				if(resizertimer){
					clearTimeout(resizertimer);
					resizertimer=null;
				}
				canvasminheight=canv.data('layermaxheight')||0;
				curcanvheight=canv.height();
				maxminusheight=curcanvheight-canvasminheight;
				
				undoobj=new Command('site_footer');
				undoobj.setOldVal({top:$.parseInteger($(this).css('top')),canvheight:curcanvheight,height:$(this).height()});
				$(this).triggerHandler('resize_progress',[{ui:ui}]);
			},
			resize: function(event, ui){
				var resizeobj=$(this).data('resizable');
				var theaxis=resizeobj.axis;
				if(theaxis=='n'){
					var changey= $(this).height()-ui.originalSize.height;
					if(changey>maxminusheight){
						var mintop=canvasminheight;
						$(this).css({top:mintop,height:ui.originalSize.height+maxminusheight});
						var oriscrolltop=$(this).data('resize_oriscrolltop');
						$(this).scrollParent().scrollTop(oriscrolltop);
						$(this).children('.full_content,.full_width').height($(this).height());
						canv.height(canvasminheight);
						$('#scroll_container_bg').css('height',(canvasminheight+$(this).height()+100)+'px');
						$.fullpageshowselectbgopt($(this));
						return;
					}
					canv.height(curcanvheight-changey);
					$(this).children('.full_content,.full_width').height($(this).height());
					$('#scroll_container_bg').css('height',(canv.height()+$(this).height()+100)+'px');
				}else{
					$(this).children('.full_content,.full_width').height($(this).height());
					$('#scroll_container_bg').css('height',(canv.height()+$(this).height()+100)+'px');
				}
				$.fullpageshowselectbgopt($(this));
				$(this).triggerHandler('resize_stop',[{ui:ui}]);
			},
			stop:function(event, ui){
				var self=$(this);
				undoobj.insertWithNewVal({top:$.parseInteger(self.css('top')),canvheight:canv.height(),height:self.height()});		
				undoobj=null;
				$.canvasHeightChange();
			}
			
	});
}
*/
function fullpagescrolldrop(dom){
    if($.wismobile!=1) dom.css({'border':'dashed #AF6935 2px'});
	var createplaceholderfunc=function(handle){
			  dom.each(function(){
					var hname = 'placeholder-'+handle;
					var axis = $('<div class="li-placeholder  ' + hname + '"></div>');
					axis.css({zIndex: 1000});
					$(this).children('.full_content').append(axis);
			  })
	}
	createplaceholderfunc('n');
	createplaceholderfunc('s');
	createplaceholderfunc('w');
	createplaceholderfunc('e');
	
	var contentblock=dom.children('.full_content');
	contentblock.children('.li-placeholder').hide();
	contentblock.children('.placeholder-n').css({'border-top':'#FF9900 dashed 4px'});
	contentblock.children('.placeholder-s').css({'border-bottom':'#FF9900 dashed 4px'});
	contentblock.children('.placeholder-e').css({'border-right':'#FF9900 dashed 4px'});
	contentblock.children('.placeholder-w').css({'border-left':'#FF9900 dashed 4px'});
	contentblock.droppable({
			tolerance: 'pointer',
			accept:'.full_pagescroll,.cstlayer,.wp-new-tool-second-link,.wp-manage-plugin-block',//fullpage鎷栨嫿鍗虫椂鍝嶅簲
			drop: function( event, ui ) {
				var draggable = $.ui.ddmanager.current;
				//寮圭獥瀹瑰櫒浠ュ強寮圭獥瀹瑰櫒鍐呯殑瀛愭彃浠跺湪鎷栨嫿鏃朵笉鏀惧湪鍏ㄥ睆婊氬姩涓�
				if ($(draggable.element).attr('type') == 'pop_up' || $(draggable.element).parents('.cstlayer').attr('type') == 'pop_up') {
					return;
				}
				if($.getElementAreaInf($(draggable.element))==$.getElementAreaInf(dom)){
					if(!dom.hasClass('ui-modselected')||$(draggable.element).is('.wp-new-tool-second-link')||$(draggable.element).is('.wp-manage-plugin-block')){//fullpage鎷栨嫿鍗虫椂鍝嶅簲
						$(this).children('.li-placeholder').hide();
						var existcolumn=$(document).data('layer_final_drop_id');
						var biggercolumn=$.chooseBiggerColumn(existcolumn,dom.attr('id'));

						$(document).data('layer_final_drop_id',biggercolumn);
					}
				}
			},
			over: function(event, ui){
				//鍒ゆ柇鏄惁鍖呭惈閿佸畾鍏冪礌
				var has_layer_lock=false;
				$('.ui-modselected').each(function(){
						if($(this).data('cstlayerstatus') == 'unlock' ){
							has_layer_lock=true;
						}
				});
				if(has_layer_lock) return;
				var draggable = $.ui.ddmanager.current;
				if($.getElementAreaInf($(draggable.element))==$.getElementAreaInf(dom) ||$(draggable.element).is('.wp-new-tool-second-link')||$(draggable.element).is('.wp-manage-plugin-block')){//fullpage鎷栨嫿鍗虫椂鍝嶅簲
					if(!dom.hasClass('ui-modselected')||$(draggable.element).is('.wp-new-tool-second-link')||$(draggable.element).is('.wp-manage-plugin-block')){//fullpage鎷栨嫿鍗虫椂鍝嶅簲
						var thisid=dom.attr('id');
						var existid=$(document).data('layer_drop_over_id');
						if(thisid != existid){
							var biggerid=$.chooseBiggerColumn(existid,thisid);
							if(biggerid == thisid){
								var $this=$(this);
								$(this).children('.li-placeholder').show();
								if(existid){
									var existcolumnel = $('#'+existid);
									var dropobj=existcolumnel.children('.full_content').data('droppable');
									dropobj['isover'] = 0;
									dropobj['isout'] = 1;
									dropobj._out.call(dropobj, event);
								}
								$(document).data('layer_drop_over_id', thisid);
							}else{
								var dropobj1=$(this).data('droppable');
								dropobj1['isover'] = 0;
								dropobj1['isout'] = 1;
							}
						}

					}
				}
			},
			out: function(event, ui){
				//鍒ゆ柇鏄惁鍖呭惈閿佸畾鍏冪礌
				var has_layer_lock=false;
				$('.ui-modselected').each(function(){
						if($(this).data('cstlayerstatus') == 'unlock' ){
							has_layer_lock=true;
						}
				});
				if(has_layer_lock) return;
				var draggable = $.ui.ddmanager.current;
				if($.getElementAreaInf($(draggable.element))==$.getElementAreaInf(dom)){
					if(!dom.hasClass('ui-modselected')||$(draggable.element).is('.wp-new-tool-second-link')||$(draggable.element).is('.wp-manage-plugin-block')){//fullpage鎷栨嫿鍗虫椂鍝嶅簲
						$(this).children('.li-placeholder').hide();
						var curoverid=$(document).data('layer_drop_over_id');
						if(curoverid == dom.attr('id')) $(document).removeData('layer_drop_over_id');
					} 
				}
				
			}
	});

}

function full_page_block_drop(contentBlock){
    var dom=contentBlock.closest('.full_pagescroll');
    contentBlock.droppable({
			tolerance: 'pointer',
			accept:'.full_pagescroll,.cstlayer,.wp-new-tool-second-link,.wp-manage-plugin-block',//fullpage鎷栨嫿鍗虫椂鍝嶅簲
			drop: function( event, ui ) {
				var draggable = $.ui.ddmanager.current;
				if($.getElementAreaInf($(draggable.element))==$.getElementAreaInf(dom)){
					if(!dom.hasClass('ui-modselected')||$(draggable.element).is('.wp-new-tool-second-link')||$(draggable.element).is('.wp-manage-plugin-block')){
						$(this).children('.li-placeholder').hide();
						var existcolumn=$(document).data('layer_final_drop_id');
						var biggercolumn=$.chooseBiggerColumn(existcolumn,dom.attr('id'));

						$(document).data('layer_final_drop_id',biggercolumn);
					}
				}
			},
			over: function(event, ui){
				//鍒ゆ柇鏄惁鍖呭惈閿佸畾鍏冪礌
				var has_layer_lock=false;
				$('.ui-modselected').each(function(){
						if($(this).data('cstlayerstatus') == 'unlock' ){
							has_layer_lock=true;
						}
				});
                                
				if(has_layer_lock) return;
				var draggable = $.ui.ddmanager.current;
				if($.getElementAreaInf($(draggable.element))==$.getElementAreaInf(dom) ||$(draggable.element).is('.wp-new-tool-second-link')||$(draggable.element).is('.wp-manage-plugin-block')){
					if(!dom.hasClass('ui-modselected')||$(draggable.element).is('.wp-new-tool-second-link')||$(draggable.element).is('.wp-manage-plugin-block')){
						var thisid=dom.attr('id');
						var existid=$(document).data('layer_drop_over_id');
						if(thisid != existid){
							var biggerid=$.chooseBiggerColumn(existid,thisid);
							if(biggerid == thisid){
								var $this=$(this);
								$(this).children('.li-placeholder').show();
								if(existid){
									var existcolumnel = $('#'+existid);
									if(!existcolumnel.is('.wp_droppable')){
										var dropobj=existcolumnel.children('.full_content').data('droppable');
									}else{
										var dropobj=existcolumnel.children('.drop_box').data('droppable');
									}
									dropobj['isover'] = 0;
									dropobj['isout'] = 1;
									dropobj._out.call(dropobj, event);
								}
								$(document).data('layer_drop_over_id', thisid);
							}else{
								var dropobj1=$(this).data('droppable');
								dropobj1['isover'] = 0;
								dropobj1['isout'] = 1;
							}
						}

					}
				}
			},
			out: function(event, ui){
				//鍒ゆ柇鏄惁鍖呭惈閿佸畾鍏冪礌
				var has_layer_lock=false;
				$('.ui-modselected').each(function(){
						if($(this).data('cstlayerstatus') == 'unlock' ){
							has_layer_lock=true;
						}
				});
				if(has_layer_lock) return;
				var draggable = $.ui.ddmanager.current;
				if($.getElementAreaInf($(draggable.element))==$.getElementAreaInf(dom)){
					if(!dom.hasClass('ui-modselected')||$(draggable.element).is('.wp-new-tool-second-link')||$(draggable.element).is('.wp-manage-plugin-block')){
						$(this).children('.li-placeholder').hide();
						var curoverid=$(document).data('layer_drop_over_id');
						if(curoverid == dom.attr('id')) $(document).removeData('layer_drop_over_id');
					} 
				}
				
			}
	});
}

function fullpagescroll_propblk_init(){
	var lvtimer;
	for(var key in $.fullpagebackgroundPropDefaults){
		(function(){	
			var curkey=key;
			var otherfunc=null;
			if($.inArray(curkey,['fullpage_moveto_prevop','fullpage_moveto_nextop']) != -1){
				var innertxt ='', lvtype = '';
				switch(curkey){
					case 'fullpage_moveto_prevop':
						lvtype = 'top';
						innertxt = '<div class="wp-moveto_fstlevel"><a class="property-bar-top" href="###" title="'+translate('Move to top')+'"><span>&nbsp;</span></a></div>';
						break;
					case 'fullpage_moveto_nextop':
						lvtype = 'bottom';
						innertxt = '<div class="wp-moveto_lstlevel"><a class="property-bar-bottom" href="###" title="'+translate('Move to bottom')+'"><span>&nbsp;</span></a></div>';
						break;
				}
				otherfunc={
					mousedown:function(){
						var $target = $(this)
						var apos =$target.offset();
						var scrollctner=$('#scroll_container');
						var scrolltop=scrollctner.scrollTop();

						$(innertxt).appendTo(scrollctner).css({
							top: function(){
								return (apos.top+scrolltop - 25-39)+'px'
							},left: apos.left+'px'
						}).click(function(e){
							$('#'+$.bgselectedid).wp_setorder(lvtype,$.bgselectedid);
							$(this).remove();
							$target.removeClass('local');
							e.preventDefault();
						});

					},
					mouseup:function(){

					}
				}
			}
			$('#'+curkey).mousedown(function(e){
					var $target = $(this);	
					$target.addClass('local');
					if($('.wp-moveto_fstlevel,.wp-moveto_lstlevel').size()) $('.wp-moveto_fstlevel,.wp-moveto_lstlevel').remove();
					if(otherfunc != null){
						otherfunc.mousedown.apply(this);
					}
					e.preventDefault();
			}).mouseup(function(e){
					var self = this,$target = $(self);
					$target.removeClass('local');
					$.fullpagebackgroundPropDefaults[curkey].apply(this);
					if(otherfunc != null){
						otherfunc.mouseup.apply(this);
					}
					e.preventDefault();
			})
		})();
	}
}

(function($){
function fullpagegetAllParents(el){
	var parents={};
	parents[el.prop('id')]='null';
	var curel=el;
	while(true){
		var parentid=$.getElementFatherid(curel);
		if(parentid =='none') break;
		parents[parentid]=curel.prop('id');
		curel=$('#'+parentid);
	}
	return parents;
}

$.chooseBiggerColumn=function(existcolumnid,newcolumnid){
	var biggercolumnid=newcolumnid;
	if(existcolumnid==newcolumnid) return biggercolumnid;
	if(existcolumnid){
		var existcolumnel=$('#'+existcolumnid);
		var newcolumnel=$('#'+newcolumnid);
		
		var existcolumnfathers=fullpagegetAllParents(existcolumnel);
		var newcolumnfathers=fullpagegetAllParents(newcolumnel);
		var rootid='canvas';
		if(!existcolumnfathers[rootid])  rootid='site_footer';
		var existdifffather=rootid;
		var newdifffather=rootid;
		while(existdifffather == newdifffather){
			existdifffather =existcolumnfathers[existdifffather];
			newdifffather =newcolumnfathers[newdifffather];
			if(existdifffather=='null' || newdifffather=='null') break;
		}
		if(existdifffather=='null') biggercolumnid=newcolumnid;
		else if(newdifffather=='null') biggercolumnid=existcolumnid;
		else{
			var existfatherzindex=$.parseInteger($('#'+existdifffather).css('z-index'));
			var newfatherzindex=$.parseInteger($('#'+newdifffather).css('z-index'));
			if(existfatherzindex > newfatherzindex) biggercolumnid=existcolumnid;
		}
	}
	return biggercolumnid;
}	

$.transferToColumn=function(dom,fathercolid){
	var oldfatherid=$.getElementFatherid(dom);
	if(oldfatherid!=fathercolid){
		var newfatherel=$('#'+fathercolid);
		var domabpos=dom.ab_pos('top');
		var newfatherabpos=newfatherel.ab_pos('top');
		var domableft=dom.ab_pos('left');
		var newfatherl=newfatherel.ab_pos('left');
		var contentblock=newfatherel;
		if(fathercolid!='canvas'){
			if(newfatherel.is('.wp_droppable')){
				contentblock=newfatherel.children('.drop_box');
			}else contentblock=newfatherel.children('.full_content');
		}
		dom.detach().attr('fatherid',fathercolid).css({'top':(domabpos-newfatherabpos),'left':(domableft-newfatherl)}).appendTo(contentblock);
		if(fathercolid=='site_footer'||fathercolid=='canvas') dom.removeAttr('fatherid');
	}
}

$.getElementAreaInf=function(dom){
	return dom.attr('inbuttom')=='1'?'site_footer':'canvas';
}


$.addFullPagescroll=function(top){
    if($.wisplate){
        wp_alert(translate('fullpage.plate do not support add'));
        return false;
    }
    if($('.fullpage_alllist:not([deleted="deleted"])').length > 0){
        wp_alert(translate('fullpage.already plugin'));
        return false;
    }
    if($('.cstlayer[type="mads"]:not([deleted="deleted"])').length>0){
        wp_alert(translate('Multi-filter and fullpage.already plugin'));
        return false;
	}
    if($('.full_column:not([deleted="deleted"])').length > 0){
        wp_alert(translate('full_column.already Please remove'));
        return false;
    }
    //瀛樺湪椤佃剼鍏冪礌鏃剁Щ闄ゅ鐞�
    setTimeout(function(){
//    if($.wismobile){
    if($('#site_footer').length > 0){
        var fullpageClass='fullpage';
        if($.wismobile) fullpageClass='mfullpage';
        if (confirm(translate('fullpage.Please hide site_footer'))) {
                $.post(parseToURL(fullpageClass,"prosf"), {pid:$.page_id},function(response){
                    var o_result = $.parseJSON(response);
                    if(o_result.result == "OK") {
                        $('#site_footer').remove();
                    }else{
                        location.reload();
                        return false;
                    }
                }).error(function() {
                        location.reload();
                        return false;
                });
        }else{
            return false;
        }
    }
//    }
    },500)
         var successfunc=function(resp,needchangeid){
				var fullpagescrollhtml=resp;
				if(needchangeid){
					var fullpagescrollels=$(fullpagescrollhtml).filter('.full_pagescroll');
					var nowid=fullpagescrollels.prop('id');
					var newid='layer'+fGuid();
					fullpagescrollhtml=fullpagescrollhtml.replace(new RegExp(nowid,"g"),newid);
				}
				var fullpagescrollel=$(fullpagescrollhtml).appendTo('#canvas');
//				fullpagescrollel=fullpagescrollel.filter('.full_pagescroll');
                                fullpagescrollel.find('.full_pagescroll').each(function(){
                                    fullpagescrollinit($(this));
                                })
                                
				//鍒濆鍖栧姞鎴� 榛樿妯″潡鍐�,鍐呭妯″潡鍔犺浇鏍峰紡
				fullpagescrollel.css('z-index',100);
				var titlecss=relativeToAbsoluteURL('plugin/title/css/title.css');
                                if($('body').data('title') !=titlecss){
						$('body').data('title',titlecss);
						var head = document.getElementsByTagName('head').item(0);
					    var css = document.createElement('link');
					    css.href = titlecss;
					    css.rel = 'stylesheet';
					    css.type = 'text/css';
					    head.appendChild(css);					 
				 }          
            
				$('.ui-modselected').each(function(){
					$.hidWidgetBorder($(this));
					// 鍥炬枃妯″潡鐩稿叧 2012/2/14
					if($(this).hasClass('graphic_edited')) actived_graphic();
				});	
				$.fullpageunselectbgdiv(fullpagescrollel);
                                //鏄剧ず灞炴€� 鍒濆鏄剧ず灞炴€�.ui-modselected缁戝畾鑷崇涓€灞忎笂.鍐嶆牴id .fullpage_alllist鍒濆瀛樺湪闂
                                $.fullpageselectbgdiv(fullpagescrollel.find('.full_pagescroll:eq(0)'));
//                                $.showWidgetBorder(fullpagescrollel);
				new AddCommand(fullpagescrollel.prop('id')).insert();
				
				var objarray=new Array();
				objarray[0]=new Array(parseInt($('#'+fullpagescrollel.prop('id')).css('z-index')),fullpagescrollel.prop('id'));
				$.zindexsort_new(objarray);				
		}	
		//浣跨敤缂撳瓨鏈夐棶棰� 鍋滅敤
		if($.addFullPagescroll.html_cache){
			successfunc($.addFullPagescroll.html_cache,true);
			return;
		}
		
		$.ajax({
	        type: "GET",
	        url: parseToURL("wp_widgets","gtfullpagescroll"),
	        success: function(response){
//				$.addFullPagescroll.html_cache=response;
				successfunc(response,false);
			},
			error: function(xhr, textStatus, errorThrown){
				wp_alert((errorThrown||textStatus)+"(add a fullpagescroll).<br/>"+translate("Request failed!"));
				return false;
			}
	    });
           
}

$.curSelectableFather=function(){
	var selmods=$('.ui-modselected');
	if(selmods.length==0){
		$(document).data('cur_selectable_father',null);
		return null;
	}else{
		var fatherid=$.getElementFatherid(selmods.filter(':first'));
		$(document).data('cur_selectable_father',fatherid);
		return fatherid;
		
	}
}

$.getElementFatherid=function(dom){
	if(dom.prop('id')=='canvas'||dom.prop('id')=='site_footer') return 'none';
	var fatherid=dom.attr('fatherid');
	if(!fatherid||fatherid==''){
		if(dom.closest('#canvas').length>0){
			fatherid='canvas';
		}else if(dom.closest('#site_footer').length>0){
			fatherid='site_footer';
		}
	}
	if(!$('#'+fatherid).length){
		if(dom.closest('#canvas').length>0){
			fatherid='canvas';
		}else if(dom.closest('#site_footer').length>0){
			fatherid='site_footer';
		}
		dom.removeAttr('fatherid');
	}
	return fatherid;
}


/*
$.fn.ab_pos=function(direct){
	var dom=$(this);
	if(dom.prop('id')=='canvas'||dom.prop('id')=='site_footer') return 0;
	if(direct=='left'||direct=='top'){
		if(!dom.attr('fatherid')||dom.attr('fatherid')=='') return dom.rel_pos(direct);
		return dom.rel_pos(direct)+$('#'+dom.attr('fatherid')).ab_pos(direct);
	}
}

$.fn.ab_pos_cnter=function(direct){
	var abpos=$(this).ab_pos(direct);
	if($(this).closest('#site_footer').length>0&&direct=='top'){
		return abpos+$.parseInteger($('#site_footer').css(direct));
	}
	return abpos;
}

$.fn.rel_pos=function(direct){
	if(direct=='left'||direct=='top'){
		return $.parseInteger($(this).css(direct));
	}
}
*/
$.getFullColChildMaxButtomfullpage=function(dom){
		var parenttoppos=dom.ab_pos_cnter('top');
		var maxbuttompos=parenttoppos;
		dom.find('.cstlayer,.full_pagescroll').each(function(){
			var el=$(this);
			var buttompos=0;
			if(el.hasClass('cstlayer')) buttompos=$.divrotate.getDegreeModMaxPoint(el,null,'buttom');
			else buttompos=el.ab_pos_cnter('top')+$.parseInteger(el.css('height'));
			if(maxbuttompos<buttompos) maxbuttompos=buttompos
		})
		return maxbuttompos-parenttoppos;
	
}

$.getFullPagescrollButtomPos=function(dom){
	if(dom.hasClass('cstlayer')){
		return $.divrotate.getDegreeModMaxPoint(dom,null,'buttom');
	}else if(dom.hasClass('full_pagescroll')){
		var maxbuttompos=0;
		dom.find('.cstlayer,.full_pagescroll').andSelf().each(function(){
			var el=$(this);
			var buttompos=0;
			if(el.hasClass('cstlayer')) buttompos=$.divrotate.getDegreeModMaxPoint(el,null,'buttom');
			else buttompos=el.ab_pos_cnter('top')+$.parseInteger(el.css('height'));
			if(maxbuttompos<buttompos) maxbuttompos=buttompos
		})
		return maxbuttompos;
	}
}


$.saveFullPagescrollObj=function(dom){
	var footerheight=dom.height();
	var otherparam={};
	if(dom.prop('id') != 'site_footer') otherparam={fullpageext:dom.data('fullpageext'),top:$.parseInteger(dom.css('top'))};
	return $.extend({
		footerheight:footerheight
	},otherparam);
}
$.fullpagecanvasleft=function(){
    if($(window).width()<=$('#canvas').width()) return '0';
    else return ($(window).width()-$('#canvas').width())/2;
}
//fullpage 鍒囧睆鍥剧墖鑷€傚簲澶勭悊
$.wp_fullpagezoom=function(dom,size,originalSize,status){
        // 鑾峰彇padding鎴朾order淇℃伅
        var $target = dom;
        var extw = 0,exth = 0,neww = size.width,newh = size.height;
        // 鑾峰彇缂╂斁淇℃伅
        var $img = $target.find('.fullimgc');
        $img.css("position", 'relative');// fixed bug#4459
        var lastw = neww - extw,lasth = newh - exth;
        var difw = neww - originalSize.width,difh = newh - originalSize.height;
        // 鑷€傚簲澶勭悊
        var curdifw = 0,curdifh = 0;
        if (difw || (difw > difh)) {
                $img.width(lastw).height('auto');
                // 鑷姩淇楂樺害
                curdifh = lasth - $img.height();
//                if(curdifh < 0) $img.css({top:Math.ceil(curdifh/2)+'px',left:'0px',position:'relative'});
                if(curdifh < 0) $img.css({top:Math.ceil(curdifh/2)+'px',left:'0px'});
                else if(curdifh > 0){
                        $img.height(lasth).width('auto');
                        curdifw = lastw - $img.width();
//                        $img.css({top:'0px',left:Math.ceil(curdifw/2)+'px',position:'relative'});
                        $img.css({top:'0px',left:Math.ceil(curdifw/2)+'px'});
                }else $img.css({top:'',left:'',position:''});
        } else if (difh || (difw < difh)) {
                $img.height(lasth).width('auto');
                // 鑷姩淇瀹藉害
                curdifw = lastw - $img.width();
                //if(curdifw < 0) $img.css({top:'0px',left:Math.ceil(curdifw/2)+'px',position:'relative'});
                if(curdifw < 0) $img.css({top:'0px',left:Math.ceil(curdifw/2)+'px'});
                else if(curdifw > 0){
                        $img.width(lastw).height('auto');
                        curdifh = lasth - $img.height();
                        //$img.css({top:Math.ceil(curdifh/2)+'px',left:'0px',position:'relative'});
                        $img.css({top:Math.ceil(curdifh/2)+'px',left:'0px'});
                }else $img.css({top:'',left:'',position:''});
        }
}
//鍒ゆ柇娴忚锛圥C锝滄墜鏈猴級
$.wp_fullpag_mobile=function(){
    return (/iphone|ipod|ipad|Macintosh|android|Windows phone/i.test(navigator.userAgent.toLowerCase()));
}

//鍒濆鍖杛esize 绗竴灞忚嚜閫傚簲澶勭悊 鎵嬫満棰勮锛岀紪杈戜笉澶勭悊
setTimeout(function(){
    if($.wismobile&&$.wisviewmode){}else{
        var maxjson = {width:320,height:$(window).height()};
        if(!$.wiseditmode){
            maxjson = {width:$(window).width(),height:$(window).height()};
            var fullnode = $('.fullpage_alllist');
            var $paragraph_image = fullnode.find('.section.active .bg > img');
            //var maxjson = {width:$(window).width(),height:$(window).height()};
            var json = {width:0,height:0};
            $.wp_fullpagezoom(fullnode,maxjson,json,'noresize');
        }
    }
},800);

})(jQuery)