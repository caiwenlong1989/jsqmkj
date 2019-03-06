function footerinit(){
	footerdrag();
	footerresize();
	
	$.showSiteFooterTips();
	$('.full_column').each(function(){
		fullcolumninit($(this));
	})
}

function fullcolumninit(dom){
	$('.full_column').children('.full_content').andSelf().css('width',$('#canvas').width()+'px');
	dom.children('.full_width').css({left:0-canv.offset().left-$.parseInteger($('#canvas').css("borderLeftWidth")),width:$('#scroll_container_bg').width()});
	dom.wp_rightkey(); 
	if(dom.is(':not(.isplate)')){
		dom.wp_layerhover();
		fullcolumndrag(dom);
		fullcolumnresize(dom);
		fullcolumndrop(dom);
	}
	
}

function footerdrag(){
	var maxminusheight=0;
	var curcanvheight=canv.height();
	var Command=Undo.Command.createModuleCommand(function(blockid,val){
			var blockel=$('#'+blockid);
			blockel.css('top',val.top);
			canv.height(val.canvheight);
			$('#scroll_container_bg').css('height',(val.canvheight+blockel.height())+'px');
			$.updateselectbgopt();
			$.updatepospropblk();
			$.canvasHeightChange();
	 },null,{returntype:'class'});
	 
	 var undoobj=null;
	$('#site_footer').draggable({
			cursor: 'move',
			axis: "y",
			start: function(event, ui){
				$(this).find('.ui-resizable-handle > .knob').hide();
				$(this).find('.ui-resizable-n').css('border-top-color', '#83c521');
				$(this).find('.ui-resizable-s').css('border-bottom-color', '#83c521');
				$(this).find('.ui-resizable-e').css('border-right-color', '#83c521');
				$(this).find('.ui-resizable-w').css('border-left-color', '#83c521');
				
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
						$.showselectbgopt($(this));
						$('.bgblk').hide();
						$('.posizeblk').html("x:"+(parseFloat($(this).css('left'))||0)+", y:"+ui.position.top).show();
						$(this).triggerHandler('drag_progress',[{left:0,top:ui.position.top}]);
						return;
					} 
				}
				$(this).triggerHandler('drag_progress',[{left:0,top:ui.position.top}]);
				canv.height(curcanvheight+topmovepx);
				$.showselectbgopt($(this));
				$('.bgblk').hide();
				$('.posizeblk').html("x:"+(parseFloat($(this).css('left'))||0)+", y:"+ui.position.top).show();
				$('#scroll_container_bg').css('height',(curcanvheight+topmovepx+$(this).height()+100)+'px');
			},
			stop:function(event, ui){
				$(this).find('.ui-resizable-handle > .knob').show();
				$(this).find('.ui-resizable-n').css('border-top-color', '#ff872e');
				$(this).find('.ui-resizable-s').css('border-bottom-color', '#ff872e');
				$(this).find('.ui-resizable-e').css('border-right-color', '#ff872e');
				$(this).find('.ui-resizable-w').css('border-left-color', '#ff872e');
				
				var topmovepx = ui.position.top - ui.originalPosition.top;
				canv.height(curcanvheight+topmovepx);
				$('#scroll_container_bg').css('height',(curcanvheight+topmovepx+$(this).height()+100)+'px');
				$.canvasHeightChange();
				correctFooterPos();
				undoobj.insertWithNewVal({top:$.parseInteger($(this).css('top')),canvheight:curcanvheight+topmovepx});		
				undoobj=null;
				$('.bgblk').show();
				$('.posizeblk').hide();
				$(this).trigger('drag_stop',[{left:parseInt($(this).css('left')),top:parseInt($(this).css('top'))}]);
			}
			
	});
}

function fullcolumndrag(dom){
	dom.wp_drag();
}

function fullcolumnresize(dom){
	var createhandlefunc=function(handle){
		     dom.each(function(){
					 var hname = 'ui-resizable-'+handle;
					var down_arrow = '';
					if(handle=='n'){
						down_arrow = '<p class="knob down_arrow"></p>';
					}else if(handle=='s'){
						down_arrow = '<p class="knob up_arrow"></p>';
					}
					var axis = $('<div class="ui-resizable-handle ' + hname + '"><p class="knob "></p>'+down_arrow+'</div>');
					
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
	dom.modpressable({});
	var fullcolumnbuttompos;
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
				fullcolumnbuttompos=$.getFullColChildMaxButtom(dom);
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
					var maxbuttom=Math.max(curtop+fullcolumnbuttompos,curtop+curheight);
					$.canvasheightresizeOrigin(maxbuttom);
				}
				$(this).find('.fullwidth_vdiv,.fullwidth_bg,.fullwidth_video').height($(this).height());
				$(this).find('.content_bg,.content_video').height($(this).height());
				var myvobj=$(this).find('.fullwidth_video');
				var $fullDiv=$(this).find('.fullwidth_vdiv');
				var videoH = myvobj[0].videoHeight;
				var videoW = myvobj[0].videoWidth;
				var videoRatio = videoH / videoW;
				var newWidth=$.parseInteger($(this).height()/videoRatio);
				var newHeight=$('.full_width').width()*videoRatio;
				var maxwidth=$('#scroll_container_bg').width();
				var left=$.parseInteger((maxwidth-newWidth)/2);
				var twidth=$('.full_width').width(),
					widthRatio=newWidth/twidth,
					widthRatio=widthRatio.toFixed(2)*100;
				var newWidthR=widthRatio+'%';


				$fullDiv.attr('data-wratio',newWidthR);
				$fullDiv.attr('data-vwidth',videoW);
				$fullDiv.attr('data-vheight',videoH);
				if(newWidth<=twidth){
					$(this).find('.fullwidth_bg').width(newWidthR);
					$fullDiv.width(newWidthR);
				}

				if($(this).height()>newHeight){
					$(this).find('.fullwidth_vdiv').height($.parseInteger(newHeight));
					$(this).find('.fullwidth_bg').height($.parseInteger(newHeight));
					$(this).find('.fullwidth_video').height($.parseInteger(newHeight));
				}

                var cmyvobj=$(this).find('.content_video');
                var cvideoH = cmyvobj[0].videoHeight;
                var cvideoW = cmyvobj[0].videoWidth;
                var cvideoRatio = cvideoH / cvideoW;
                var cnewWidth=$.parseInteger($(this).height()/cvideoRatio);
                var cnewHeight=$('.full_content').width()*cvideoRatio;
                var cleft=$.parseInteger(($(this).width()-cnewWidth)/2);
                if(cnewWidth<=$('.full_content').width()){
                    $(this).find('.content_bg').css('margin-left',cleft);
                    $(this).find('.content_bg').width(cnewWidth);
                }
                if($(this).height()>cnewHeight){
                    $(this).find('.content_bg').height($.parseInteger(cnewHeight));
                    $(this).find('.content_video').height($.parseInteger(cnewHeight));
                }

				$(this).children('.full_content,.full_width').height($(this).height());
				$(this).triggerHandler('resize_progress',[{ui:ui}]);
				$.showselectbgopt($(this));
				$('.bgblk').hide();
				$('.posizeblk').html("W:"+$(this).width()+", H:"+$(this).height()).show();
			},
			stop:function(event, ui){
				$(this).find('.fullwidth_vdiv,.fullwidth_bg,.fullwidth_video').height($(this).height());
				$(this).children('.full_content,.full_width').height($(this).height());
				var myvobj=$(this).find('.fullwidth_video');
				var $fullDiv=$(this).find('.fullwidth_vdiv');
				var videoH = myvobj[0].videoHeight;
				var videoW = myvobj[0].videoWidth;
				var videoRatio = videoH / videoW;
			    var newWidth=$.parseInteger($(this).height()/videoRatio);
				var newHeight=$('.full_width').width()*videoRatio;

				var twidth=$('.full_width').width(),
				 widthRatio=newWidth/twidth,
				 widthRatio=widthRatio.toFixed(2)*100;
				if(widthRatio>100){
					var newWidthR='100%';
				}else{
					var newWidthR=widthRatio+'%';
				}
				$fullDiv.attr('data-wratio',newWidthR);
				$fullDiv.attr('data-vwidth',videoW);
				$fullDiv.attr('data-vheight',videoH);
				if(newWidth<twidth){
					$(this).find('.fullwidth_bg').width(newWidthR);
					$fullDiv.width(newWidthR);
				}else{
					$(this).find('.fullwidth_bg').width(twidth);
					$fullDiv.width(twidth);
				}

				if($(this).height()>newHeight){
					$(this).find('.fullwidth_vdiv').height($.parseInteger(newHeight));
					$(this).find('.fullwidth_bg').height($.parseInteger(newHeight));
					$(this).find('.fullwidth_video').height($.parseInteger(newHeight));
				}

				$.showselectbgopt($(this));
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
				$('.bgblk').show();
				$('.posizeblk').hide();
			}
			
	});
}

function footerresize(){
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
			blockel.find('.fullwidth_bg').css('margin-left',val.margin-left);
			$('#scroll_container_bg').css('height',(val.canvheight+blockel.height())+'px');
			$.updateselectbgopt();
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
						$.showselectbgopt($(this));
						$('.bgblk').hide();
						$('.posizeblk').html("W:"+$(this).width()+", H:"+$(this).height()).show();
						return;
					}
					canv.height(curcanvheight-changey);
					$(this).children('.full_content,.full_width').height($(this).height());
					$('#scroll_container_bg').css('height',(canv.height()+$(this).height()+100)+'px');
				}else{
					$(this).children('.full_content,.full_width').height($(this).height());
					$('#scroll_container_bg').css('height',(canv.height()+$(this).height()+100)+'px');
				}
				$.showselectbgopt($(this));
				$('.bgblk').hide();
				$('.posizeblk').html("W:"+$(this).width()+", H:"+$(this).height()).show();
				$(this).triggerHandler('resize_stop',[{ui:ui}]);
			},
			stop:function(event, ui){
				var self=$(this);
				undoobj.insertWithNewVal({top:$.parseInteger(self.css('top')),canvheight:canv.height(),height:self.height()});		
				undoobj=null;
				$('.bgblk').show();
				$('.posizeblk').hide();
				$.canvasHeightChange();
			}
			
	});
}

function fullcolumndrop(dom){
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
			//寮圭獥瀹瑰櫒浠ュ強寮圭獥瀹瑰櫒鍐呯殑鎻掍欢涓嶈兘鏀惧湪閫氭爮涓�
			accept:'.full_column,.cstlayer:not([type=pop_up],[type=pop_up] .cstlayer)',
			drop: function( event, ui ) {
				var draggable = $.ui.ddmanager.current;
				if($.getElementAreaInf($(draggable.element))==$.getElementAreaInf(dom)){
					if(!dom.hasClass('ui-modselected')){
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
				if($.getElementAreaInf($(draggable.element))==$.getElementAreaInf(dom)){
					if(!dom.hasClass('ui-modselected')){
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
					if(!dom.hasClass('ui-modselected') ){
						$(this).children('.li-placeholder').hide();
						var curoverid=$(document).data('layer_drop_over_id');
						if(curoverid == dom.attr('id')) $(document).removeData('layer_drop_over_id');
					} 
				}
				
			}
	});

}

function fullcolumn_propblk_init(){
	var lvtimer;
	for(var key in $.backgroundPropDefaults){
		(function(){	
			var curkey=key;
			var otherfunc=null;
			if($.inArray(curkey,['bg_moveto_prevop','bg_moveto_nextop']) != -1){
				var innertxt ='', lvtype = '';
				switch(curkey){
					case 'bg_moveto_prevop':
						lvtype = 'top';
						innertxt = '<div class="wp-moveto_fstlevel"><a class="property-bar-top" href="###" title="'+translate('Move to top')+'"><span>&nbsp;</span></a></div>';
						break;
					case 'bg_moveto_nextop':
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
					$.backgroundPropDefaults[curkey].apply(this);
					if(otherfunc != null){
						otherfunc.mouseup.apply(this);
					}
					e.preventDefault();
			})
		})();
	}
}

(function($){
function getAllParents(el){
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
		
		var existcolumnfathers=getAllParents(existcolumnel);
		var newcolumnfathers=getAllParents(newcolumnel);
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

$.transferToArea=function(dom,from,to,isInUndo){
	var domabpos=dom.ab_pos('top');
	var domableft=dom.ab_pos('left');
	var footertop=$.parseInteger($('#site_footer').css('top'));
	if(to=='site_footer'){
		var curmodtop=domabpos-footertop;
		dom.css('top',curmodtop);dom.css('left',domableft);
		dom.attr('inbuttom','1');
		dom.detach().removeAttr('fatherid').appendTo($('#site_footer').children('.full_content'));
		if(dom.hasClass('full_pagescroll')||dom.hasClass('full_column')||dom.hasClass('wp_droppable')){ 
			dom.find('.cstlayer,.full_pagescroll,.full_column').attr('inbuttom','1').attr('data-model', 'edit');
		}
	}else{
		var curmodtop=domabpos+footertop;
		dom.css('top',curmodtop);dom.css('left',domableft);
		var canvheight=$('#canvas').height();
		if(canvheight<curmodtop+dom.height()&&!isInUndo){
			$.canvasheightresizeOrigin(curmodtop+dom.height());
		}
		dom.removeAttr('inbuttom');
		dom.detach().removeAttr('fatherid').appendTo($('#canvas'));
		if(dom.hasClass('full_pagescroll')||dom.hasClass('full_column')||dom.hasClass('wp_droppable')){ 
			dom.find('.cstlayer,.full_pagescroll,.full_column').removeAttr('inbuttom').attr('data-model', 'edit');
		}
	}
	if(dom.is('.ui-modselected')){
		$.hidWidgetBorder(dom);
		$.showWidgetBorder(dom);
	}
	if(dom.is('.full_pagescroll,.full_column,.wp_droppable')){
		dom.find('.cstlayer,.full_pagescroll,.full_column').each(function(){
			if($(this).is('.ui-modselected')){
				$.hidWidgetBorder($(this));
				$.showWidgetBorder($(this));
			}
		})
	}
	// for 'breakpoint save'
	breakpoint_save.setObj({});
}

$.addFullColumn=function(top){
    //fullpage plugin exist 鏃剁fullcolumn 鎷栨嫿.
        if($('.fullpage_alllist:not([deleted="deleted"])').length > 0){
            wp_alert(translate('fullpage.already can not add fullcolumn'));
            return false;
        }
         var successfunc=function(resp,needchangeid){
				var fullcolumnhtml=resp;
				if(needchangeid){
					var fullcolumnels=$(fullcolumnhtml).filter('.full_column');
					var nowid=fullcolumnels.prop('id');
					var newid='layer'+fGuid();
					fullcolumnhtml=fullcolumnhtml.replace(new RegExp(nowid,"g"),newid);
				}
				var fullcolumnel=$(fullcolumnhtml).appendTo('#canvas').css('top',top);
				fullcolumnel=fullcolumnel.filter('.full_column');
				fullcolumninit(fullcolumnel);
				fullcolumnel.css('z-index',100);
				$('.ui-modselected').each(function(){
					$.hidWidgetBorder($(this));
					// 鍥炬枃妯″潡鐩稿叧 2012/2/14
					if($(this).hasClass('graphic_edited')) actived_graphic();
				});	
				$.selectbgdiv(fullcolumnel);
				new AddCommand(fullcolumnel.prop('id')).insert();
				
				var objarray=new Array();
				objarray[0]=new Array(parseInt($('#'+fullcolumnel.prop('id')).css('z-index')),fullcolumnel.prop('id'));
				$.zindexsort_new(objarray);				
		}	
		
		if($.addFullColumn.html_cache){
			successfunc($.addFullColumn.html_cache,true);
			return;
		}
		
		$.ajax({
	        type: "GET",
	        url: parseToURL("wp_widgets","gtfullcolumn"),
	        success: function(response){
				$.addFullColumn.html_cache=response;
				successfunc(response,false);
			},
			error: function(xhr, textStatus, errorThrown){
				wp_alert((errorThrown||textStatus)+"(add a fullcolumn).<br/>"+translate("Request failed!"));
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

$.getFullColChildMaxButtom=function(dom){
		var parenttoppos=dom.ab_pos_cnter('top');
		var maxbuttompos=parenttoppos;
		dom.find('.cstlayer,.full_column').each(function(){
			var el=$(this);
			var buttompos=0;
			if(el.hasClass('cstlayer')) buttompos=$.divrotate.getDegreeModMaxPoint(el,null,'buttom');
			else buttompos=el.ab_pos_cnter('top')+$.parseInteger(el.css('height'));
			if(maxbuttompos<buttompos) maxbuttompos=buttompos
		})
		return maxbuttompos-parenttoppos;
	
}

$.getFullColumnButtomPos=function(dom){
	if(dom.hasClass('cstlayer')){
		return $.divrotate.getDegreeModMaxPoint(dom,null,'buttom');
	}else if(dom.hasClass('full_column')){
		var maxbuttompos=0;
		dom.find('.cstlayer,.full_column').andSelf().each(function(){
			var el=$(this);
			var buttompos=0;
			if(el.hasClass('cstlayer')) buttompos=$.divrotate.getDegreeModMaxPoint(el,null,'buttom');
			else buttompos=el.ab_pos_cnter('top')+$.parseInteger(el.css('height'));
			if(maxbuttompos<buttompos) maxbuttompos=buttompos
		})
		return maxbuttompos;
	}
}

$.saveFullColumnObj=function(dom){
	var fullbackprop=dom.children('.full_width').data('backgroundprops')||{};
	var contentbackprop=dom.find('.full_content').data('backgroundprops')||{};
	var margintopheight=dom.children('.full_width').attr("margintopheight");
	var footerheight=dom.height();
	if(dom.hasClass('full_column')){
		var $bgdiv=dom.find('.fullwidth_bg'),$ctdiv=dom.find('.content_bg'),$fullDiv=dom.find('.fullwidth_vdiv');
		var myvobj=dom.find('.fullwidth_video');
		var myvdiv=dom.find('.fullwidth_vdiv');
		if(myvdiv.css('display')=='block'){
			var videoH = myvobj[0].videoHeight;
			var videoW = myvobj[0].videoWidth;
			var videoRatio = videoH / videoW;
			var newHeight=$('.full_width').width()*videoRatio;
		}
		var bgleft=$bgdiv.css('margin-left'), bgsiteleft=$bgdiv.attr('data-left'),bgwidth=$fullDiv.attr('data-wratio'),bgheight=$bgdiv.height(), bgtop=$bgdiv.css('top'),fvWidth=videoW,fvHeight=videoH;
		var cttop=$ctdiv.css('top'), ctheigth=$ctdiv.height(), ctwidth=$ctdiv.width(),ctleft=$ctdiv.css('margin-left');
	}
	var otherparam={};
	if(dom.prop('id') != 'site_footer'){ 
		var infixed=dom.attr('infixed');
		if(infixed !='1'&&infixed !='2') infixed='';
		if(!$.judgeFixedBottomShow() && infixed =='2') infixed='';
		otherparam={top:$.parseInteger(dom.css('top')),zindex:$.parseInteger(dom.css('z-index')),lock:dom.data('cstlayerstatus'),fixdisplay:infixed};
	}
	return $.extend({
		fullbackgroundprop:fullbackprop,
		contentbackgroundprop:contentbackprop,
		margintopheight:margintopheight,
		footerheight:footerheight,
		bgleft:bgleft,
		bgsiteleft:bgsiteleft,
        bgwidth:bgwidth,
        bgheight:bgheight,
		bgtop:bgtop,
		fvwidth:fvWidth,
		fvheight:fvHeight,
        cttop:cttop,
        ctheigth:ctheigth,
        ctwidth:ctwidth,
        ctleft:ctleft
	},otherparam);
}

$.processDropMask=function(dom){
	if(!dom.is('.wp_droppable')) return;
	var $target=dom;
	if($target.find('.ui-modselected').length || $target.is('.ui-modselected')){
		$target.find('.drop_mask').hide();
		var timer=setInterval(function(){
			if(!$target.find('.ui-modselected').length && !$target.is('.ui-modselected')){
				$target.find('.drop_mask').show();
						clearInterval(timer);
			}
		},300)
	}
}
})(jQuery)

