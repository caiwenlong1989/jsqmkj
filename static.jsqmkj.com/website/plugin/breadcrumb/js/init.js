function layer_breadcrumb_ready_func(layerid, showorder){
    if (showorder == '2') {
        var $span_home=$("#"+layerid).find(".breadcrumb_plugin span").eq(0).clone();
        var $span_fuhao=$("#"+layerid).find(".breadcrumb_plugin span").eq(1).clone();
        $("#"+layerid).find(".breadcrumb_plugin span").eq(0).remove();
        $("#"+layerid).find(".breadcrumb_plugin span").eq(0).remove();
        $("#"+layerid).find(".breadcrumb_plugin").append($span_fuhao).append($span_home);
    }

    var fuhao1=['>>','鈥�','鈼�','鈫�','鈥�','鈭�','鈯�','鈽�','銆�','锝�','锛�','锛�','鈽�','锟�','#','鈮�'];
    var fuhao2=['<<','鈥�','鈼�','鈫�','鈥�','鈭�','鈯�','鈽�','銆�','锝�','<','锛�','鈽�','锟�','#','鈮�'];
    window['ShowOrder'] = function(gzfuhao,plugin_id){
        $span_html=$($("#"+plugin_id).find(".breadcrumb_plugin").html()).clone();
        $("#"+plugin_id).find(".breadcrumb_plugin").html('');
        $.each($span_html,function(i,n){
            $("#"+plugin_id).find(".breadcrumb_plugin").prepend($(n));
        });
        $("#"+plugin_id).find(".breadcrumb_plugin").find("span:odd").html(gzfuhao);
    };
    window['ShowOrder2'] = function(plugin_id){
        if($("#"+plugin_id).find(".breadcrumb_plugin").find('span').last().attr('gzdata')!='gzorder') {
            ShowOrder(fuhao2[$('#'+plugin_id).find(".breadcrumbfuhao").attr("gz")],plugin_id);
        }
    };
    window['ShowOrder1'] = function(plugin_id){
        if($("#"+plugin_id).find(".breadcrumb_plugin").find('span').last().attr('gzdata')=='gzorder') {
            ShowOrder(fuhao1[$('#'+plugin_id).find(".breadcrumbfuhao").attr("gz")],plugin_id);
        }
    };
}