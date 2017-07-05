'use strict';
$.ajax({
    url:url+'api/getindexmenu',
    type:'get',
    dataType:'json',
    success:function(data){
        var list=data.result;
        var str='';
        list.forEach(function(item,index){
          str+=' <div class="col-xs-3">'
            +'<a href="'+item.titlehref+'">'+item.img+'</a>'
            +'<p>'+item.name+'</p>'
        +'</div>';
    });
    $('#nav_menu .row').html(str);
    //下拉菜单
    $('#nav_menu .row >div:nth-last-child(-n+4)').hide();
    $('#nav_menu .row >div:nth-last-child(5)').click(function(){
        $('#nav_menu .row >div:nth-last-child(-n+4)').toggle(200)
    })
    }
})
$.ajax({
    url:url+"api/getmoneyctrl",
    type:'get',
    dataType:'json',
    success:function(data){
       var html = template("low_price_list",data);
       $("#product_list .list_container").html(html);

    }
})