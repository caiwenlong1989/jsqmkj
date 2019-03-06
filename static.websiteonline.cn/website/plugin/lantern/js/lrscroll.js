(function($){

	$.fn.kxbdMarquee = function(options){
		var opts = $.extend({},$.fn.kxbdMarquee.defaults, options);
		
		return this.each(function(){
			var $marquee = $(this);//濠婃艾濮╅崗鍐鐎圭懓娅�
			var func=function(){
				var _scrollObj = $marquee.get(0);//濠婃艾濮╅崗鍐鐎圭懓娅扗OM
				var scrollW = $marquee.width();//濠婃艾濮╅崗鍐鐎圭懓娅掗惃鍕啍鎼达拷
				var scrollH = $marquee.height();//濠婃艾濮╅崗鍐鐎圭懓娅掗惃鍕彯鎼达拷

				if(!$marquee.is(':visible')){
					setTimeout(func,100);
					return;
				}
				var $element = $marquee.children(); //濠婃艾濮╅崗鍐
				var $kids = $element.children();//濠婃艾濮╃€涙劕鍘撶槐锟�
				var scrollSize=0;//濠婃艾濮╅崗鍐鐏忓搫顕�
				var _type = (opts.direction == 'left' || opts.direction == 'right') ? 1:0;//濠婃艾濮╃猾璇茬€烽敍锟�1瀹革箑褰搁敍锟�0娑撳﹣绗�

				$element.css(_type?'width':'height',10000);
				if (opts.isEqual) {
					scrollSize = $kids[_type?'outerWidth':'outerHeight']() * $kids.length;
				}else{
					$kids.each(function(){
						scrollSize += $(this)[_type?'outerWidth':'outerHeight']();
					});
				}

				if (scrollSize<(_type?scrollW:scrollH)&&scrollSize>0){
					var thesize=(_type?scrollW:scrollH);
					var num=Math.ceil(thesize/scrollSize);
					scrollSize*=num;
					for(var i=0;i<num-1;i++){
						$element.append($kids.clone());
					}
					$kids = $element.children();
				}
				$element.append($kids.clone()).css(_type?'width':'height',scrollSize*2);

				var numMoved = 0;
				function scrollFunc(){
					var _dir = (opts.direction == 'left' || opts.direction == 'right') ? 'scrollLeft':'scrollTop';
					if (opts.loop > 0) {
						numMoved+=opts.scrollAmount;
						if(numMoved>scrollSize*opts.loop){
							_scrollObj[_dir] = 0;
							return clearInterval(moveId);
						} 
					}				
					if(opts.direction == 'left' || opts.direction == 'up'){
						var oldpos=_scrollObj[_dir];
						var newPos = _scrollObj[_dir] + opts.scrollAmount;
						if(newPos>=scrollSize){
							newPos -= scrollSize;
						}
						_scrollObj[_dir] = newPos;
						if(_scrollObj[_dir]==oldpos){
							_scrollObj[_dir] = newPos+1;
						}
					}else{
						var oldpos=_scrollObj[_dir];
						var newPos = _scrollObj[_dir] - opts.scrollAmount;
						if(newPos<=0){
							newPos += scrollSize;
						}
						_scrollObj[_dir] = newPos;
						if(_scrollObj[_dir]==oldpos){
							_scrollObj[_dir] = newPos+1;
						}
					}
				};

				var moveId = setInterval(scrollFunc, opts.scrollDelay);
				$marquee.hover(
					function(){
						clearInterval(moveId);
					},
					function(){
						clearInterval(moveId);
						moveId = setInterval(scrollFunc, opts.scrollDelay);
					}
				);

				if(opts.controlBtn){
					$.each(opts.controlBtn, function(i,val){
						$(val).bind(opts.eventA,function(){
							opts.direction = i;
							opts.oldAmount = opts.scrollAmount;
							opts.scrollAmount = opts.newAmount;
						}).bind(opts.eventB,function(){
							opts.scrollAmount = opts.oldAmount;
						});
					});
				}
			}	
			func();
		});
	};
	$.fn.kxbdMarquee.defaults = {
		isEqual:true,
		loop: 0,
		direction: 'left',
		scrollAmount:1,
		scrollDelay:50,
		newAmount:3,
		eventA:'mousedown',
		eventB:'mouseup'
	};
	
	$.fn.kxbdMarquee.setDefaults = function(settings) {
		$.extend( $.fn.kxbdMarquee.defaults, settings );
	};
	
})(jQuery);
