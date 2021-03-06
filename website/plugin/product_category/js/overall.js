var jeditMode = 0;
function layer_prdcat_setvar(params){
    jeditMode = params.isedit;
    if(jeditMode){
        $(function(){
            $("#"+params.layerid+" li a").removeAttr('onclick').click(function(){return false;});
        });
    }
}

function wp_getdefaultHoverCss(layer_id)
{
    var getli='';
    var geta='';
    var cssstyle='';

    if(jeditMode){
        var navStyle = $.trim($("#datasty_"+layer_id).text());
    }else{
        var navStyle = $.trim($("#"+layer_id).data("datasty_"));
    }
    if(navStyle.length > 0)
    {
        var patt1 = new RegExp("#nav_layer[0-9|a-z|A-Z]+\\s+li\.wp_subtop:\\s*hover\\s*{[^}]+}",'i');
        var tmp = patt1.exec(navStyle);
        if(tmp)
        {
            var tmp1 = tmp[0].match(/{[^}]+}/)[0];
            tmp1=tmp1.replace('{','').replace('}','');
            getli=getli+tmp1;
        }

        patt1 = new RegExp("#nav_layer[0-9|a-z|A-Z]+\\s+li\.wp_subtop>a:\\s*hover\\s*{[^}]+}",'i');
        tmp = patt1.exec(navStyle);
        if(tmp)
        {
            var tmp2 = tmp[0].match(/{[^}]+}/)[0];
            tmp2=tmp2.replace('{','').replace('}','');
            geta=geta+tmp2;
        }


    }
    if(jeditMode){
        navStyle = $.trim($("#datastys_"+layer_id).text());
    }else{
        navStyle = $.trim($("#"+layer_id).data("datastys_"));
    }

    var getlia='';
    if(navStyle.length > 0)
    {
        var layidlow=('#nav_'+layer_id+' li.wp_subtop>a:hover').toLowerCase();
        if( ('a'+navStyle).toLowerCase().indexOf(layidlow)>0){
            var parstr="#nav_"+ layer_id +" li.wp_subtop>a:hover";
            getlia = navStyle.split(new RegExp(parstr,"i"));
            var combilestr='';
            for(key in getlia){
                var ervervalue='';
                if(('a'+getlia[key]).indexOf('{')<3 && ('a'+getlia[key]).indexOf('{')>0 ){
                    var parvalue=getlia[key].split('{');
                    if(('a'+parvalue[1]).indexOf('}')>0){
                        ervervalue=parvalue[1].split('}')[0];
                    }
                }
                combilestr=combilestr+ervervalue;
            }
            geta=geta+combilestr;
        }

        layidlow=('#nav_'+layer_id+' li.wp_subtop:hover').toLowerCase();
        if( ('a'+navStyle).toLowerCase().indexOf(layidlow)>0){
            var parstr="#nav_"+ layer_id +" li.wp_subtop:hover";
            getlia = navStyle.split(new RegExp(parstr,"i"));
            var combilestrs='';
            for(key in getlia){
                var ervervalue='';
                if(('a'+getlia[key]).indexOf('{')<3 && ('a'+getlia[key]).indexOf('{')>0 ){
                    var parvalue=getlia[key].split('{');
                    if(('a'+parvalue[1]).indexOf('}')>0){
                        ervervalue=parvalue[1].split('}')[0];
                    }
                }
                combilestrs=combilestrs+ervervalue;
            }
            getli=getli+combilestrs;
        }


    }

    if(getli.length>0){
        getli="#"+layer_id+" li.lihover{"+getli+"} ";
    }
    if(geta.length>0){
        geta="#"+layer_id+" li>a.ahover{"+geta+"} ";
    }
    cssstyle=getli+geta;
    if(cssstyle.length>0){
        cssstyle=""+cssstyle+"";
        cssstyle=cssstyle.replace(/[\r\n]/g, " ").replace(/\s+/g, " ");
        var doms=$('#'+layer_id);
        var oldcssstyle=doms.data('get_layer_hover_css');
        if(oldcssstyle != cssstyle){
            if(jeditMode){
                $("#hover"+layer_id+"").text(""+cssstyle+"");
            }
            doms.data('get_layer_hover_css',cssstyle);
            get_plugin_css('H'+layer_id+'H',cssstyle);
        }
    }
}

function wp_createNavigationgetSubMenuHoverCssFunc(param){
    var layer_id=param.layer_id;
    var editmode=param.editmode;
    function getSubMenuHoverCss(css_pro,type){
        var typeval=type;
        if(typeval==1){
            var regex = "#nav_layer[0-9|a-z|A-Z]+\\s+ul+\\s+li+\\s+a:\\s*hover\\s*{\\s*"+css_pro+"\\s*:[^;]+";
        }else{
            var regex = "#nav_layer[0-9|a-z|A-Z]+\\s+li\.wp_subtop>a:\\s*hover\\s*{\\s*"+css_pro+"\\s*:[^;]+";
        }
        if(editmode){
            var navStyle = $.trim($("#datastys_"+layer_id).text());
        }else{
            var navStyle = $.trim($("#"+layer_id).data("datastys_"));
        }
        if(navStyle.length > 0){
            var patt1 =new RegExp(regex,'i');
            var tmp = patt1.exec($.trim(navStyle));
            if(tmp)
            {
                return $.trim((tmp[0].match(/{[^:]+:[^;]+/)[0]).match(/:[^;]+/)[0].replace(':',''));
            }
        }
        if(editmode){
            navStyle = $.trim($("#datasty_"+layer_id).text());
        }else{
            navStyle = $.trim($("#"+layer_id).data("datasty_"));
        }
        if(navStyle.length > 0)
        {
            if(typeval==1){
                var patt1 = new RegExp("#nav_layer[0-9|a-z|A-Z]+\\s+ul+\\s+li+\\s+a:\\s*hover\\s*{[^}]+}",'i');
            }else{
                var patt1 = new RegExp("#nav_layer[0-9|a-z|A-Z]+\\s+li\.wp_subtop>a:\\s*hover\\s*{[^}]+}",'i');
            }
            var tmp = patt1.exec(navStyle);

            if(tmp)
            {
                var tmp1 = tmp[0].match(/{[^}]+}/)[0];
                var patt2 = new RegExp(css_pro+"\\s*:\\s*[^;]+;",'i');
                tmp = patt2.exec(tmp1);
                if(tmp) return $.trim(tmp[0].replace(/[^:]+:/,'').replace(';',''));
            }
        }
        return $.trim($("#nav_"+layer_id+" ul li a").css(css_pro));
    }
    window[layer_id+'_getSubMenuHoverCss']=getSubMenuHoverCss;
}

function wp_showdefaultHoverCss(layer_id){
    var layertype=$('#'+layer_id).attr('type');
    if(layertype && window['wp_showdefaultHoverCss_'+layertype]){
        return window['wp_showdefaultHoverCss_'+layertype](layer_id);
    }
    return false;
}

function wp_showdefaultHoverCss_product_category(layer_id)
{
    var plugin_name=$("#"+layer_id).attr('type');
    var hover=$("#"+layer_id).find('.nav1').attr('hover');
    if(hover!=1){ return;}

    wp_getdefaultHoverCss(layer_id);
    var n=0;

    if(plugin_name=='new_navigation'){
        var page_id=$("#page_id").val();
        var rootpid=$("#page_id").attr("rpid")*1;
    }else{
        var page_id=$('#'+layer_id+'').find(".default_pid").html();
        if(page_id==0 || page_id.length==0){
            page_id=$('#nav_'+layer_id+'').children('li:first').attr('pid');
        }
    }
    $('#nav_'+layer_id+'').children('li').each(function(){
        var type_pid=$(this).attr('pid');
        if(type_pid==page_id){
            $(this).addClass("lihover").children('a').addClass("ahover");
        }else if(type_pid==rootpid){
            $(this).addClass("lihover").children('a').addClass("ahover");
        }
        if(window.location.href == $(this).find("a").attr("href") || window.location.href == $(this).find("a").attr("href")+"&brd=1"){ $(this).addClass("lihover").children('a').addClass("ahover"); }
        n++;
    });
    if(!$('#nav_'+layer_id+'').children('li.lihover').length){
        $('#nav_'+layer_id+' ul').children('li').each(function(){
            var lochref=window.location.href.replace(/^https?:/,'').replace(/&brd=1$/,'');
            var subahref= $(this).find('a').attr("href").replace(/^https?:/,'').replace(/&brd=1$/,'');
            if(lochref == subahref || lochref ==subahref+"&brd=1"){
                $(this).parents(".wp_subtop").addClass("lihover").children('a').addClass("ahover");
                return;
            }
        })
    }

}

function wp_addMoreButton(layer_id){
    var layertype=$('#'+layer_id).attr('type');
    if(layertype && window['wp_addMoreButton_'+layertype]){
        return window['wp_addMoreButton_'+layertype](layer_id);
    }
    return false;
}

function wp_addMoreButton_product_category(layer_id)
{
    var firstLiTop = 0;
    var hasMore = false;
    $('#nav_'+layer_id).children('li.wp_subtop').each(function(i){
        if(i == 0) {firstLiTop = $(this).offset().top;return true;}
        if($(this).offset().top > firstLiTop)
        {
            $('#'+layer_id).data('hasMore','yes');//閰嶇疆閫昏緫鑾峰彇
            var more = $.trim($('#'+layer_id).children('.wp-product_category_content').children('.nav1').attr('more'));
            var doms = $(this).prev().prev().nextAll().clone();
            var objA = $(this).prev().children('a');
            if(objA.children('span').length > 0) objA.children('span').html(more);
            else objA.html(more);

            if(objA.hasClass('sub'))
            {
                objA.next('ul').empty();
                doms.appendTo(objA.next('ul'));
            }
            else
            {
                objA.after('<ul></ul>');
                doms.appendTo(objA.next('ul'));
                objA.addClass('sub');
            }

            $(this).prev().nextAll().remove();
            objA.next('ul').children('li').removeClass('wp_subtop');
            hasMore = true;

            objA.attr('href','javascript:void(0);');

            //鐐瑰嚮"鏇村"寮瑰嚭鍏ㄧ珯瀵艰埅
            if($("#"+layer_id).find('.nav1').attr('moreshow') == 1)
            {
                objA.click(function (e){
                    $('#'+layer_id).find('#basic-modal-content_'+layer_id).modal({
                        containerId:'wp-product_category-simplemodal-container_'+layer_id,
                        zIndex:9999,
                        close:false,
                        onOpen:function(dialog){
                            dialog.overlay.fadeIn('slow', function(){
                                dialog.container.slideDown('slow',function(){
                                    dialog.data.fadeIn('slow','swing',function(){
                                        $('.wp_menus').not('.wp_thirdmenu0').each(function(){
                                            var left = $(this).parent().parent().children('a').eq(0).outerWidth()+5;
                                            $(this).css({position:'relative',left:left+'px'});
                                        });
                                    });
                                });
                            });
                        },
                        onClose:function(dialog){
                            dialog.data.fadeOut('slow',function (){
                                dialog.container.slideUp('slow', function () {
                                    dialog.overlay.fadeOut('slow', function () {
                                        $.modal.close();
                                    });
                                });
                            });
                        }
                    });
                    return false;
                });
            }
            return false;
        }
    });
    if(!hasMore) $('#'+layer_id).data('hasMore','no');
    wp_showdefaultHoverCss(layer_id);
}

//缂栬緫妯″紡姘村钩鎷栧姩鍔ㄦ€佸埛鏂颁慨鏀筂ore鎸夐挳
function wp_updateMoreButton(layer_id)
{
    var $layer = $('#'+layer_id);
    var $nav1 = $layer.children('.wp-product_category_content').children('.nav1');
    var tmp_css = $.trim($("#datastys_"+layer_id).text());
    var tmp_cssa = $.trim($("#datasty_"+layer_id).text());
    $.post(parseToURL("product_category","refreshNavigator",{menustyle:$.trim($nav1.attr('skin')),saveCss:'yes',page_id:$("#page_id").val(),blockid:layer_id,typeval:$.trim($layer.find(".wp-product_category_content").attr('type')),colorstyle:$.trim($nav1.attr('colorstyle')),direction:$.trim($nav1.attr('direction')),more:$.trim($nav1.attr('more')),hover:$.trim($nav1.attr('hover')),moreshow:$.trim($nav1.attr('moreshow')),morecolor:$.trim($nav1.attr('morecolor'))}),function(data){
        $layer.find('.wp-product_category_content').html(data);
        $("#datastys_"+layer_id).text(tmp_css);

        var setcss=$("#page_set_css").html();
        setcss=setcss.replace(/<style>/i,'').replace(/<\/style>/i,'');
        var reg=new RegExp("(.*)([/][/*]"+layer_id+"[/*][/])(.*)([/][/*]"+layer_id+"[/*][/])(.*)","gmi");
        var url=setcss;
        var rep=url.replace(reg,"$1 $5");
        var tempcss=rep + " /*"+ layer_id +"*/ "+tmp_cssa+" "+tmp_css+" /*"+ layer_id +"*/ ";
        tempcss = tempcss.replace(/[\r\n]/g, " ").replace(/\s+/g, " ");
        $("#page_set_css").html('<style> '+tempcss+ '</style>');
    });
    wp_showdefaultHoverCss(layer_id);
}


function wp_removeLoading(layer_id)
{

    var $nav1 = $('#'+layer_id).find(".nav1");
    var ishorizon=$nav1.attr("ishorizon");
    if(ishorizon=='1'){
        $("#"+layer_id).find('.wp-new_navigation_content').css({height:'auto',overflow:'hidden'});
    }else{
        $("#"+layer_id).find('.wp-new_navigation_content').css({width:'auto',overflow:'hidden'});
    }
    // 淇IE娴忚鍣ㄩ儴鍒嗙増鏈鑸棤娉曟樉绀洪棶棰� 2013/12/26

    var temptimer = setTimeout(function(){
        $("#"+layer_id).find('.wp-new_navigation_content').css("overflow", 'visible');
        clearTimeout(temptimer);
    }, 50);
}