var  searchId=getQueryStringArge();
var pageid=parseInt(searchId.pageid)||1;

$.ajax({
url:url+'api/getcategorybyid?categoryid='+searchId.categoryid,
type:'get',
dataType:'json',
success:function(data){
    console.log(data)
    $('#product_nav .breadcrumb li:nth-child(3)').html(data.result[0].category);
}

})


$.ajax({
    url:url+'api/getproductlist?categoryid='+searchId.categoryid+'&pageid='+pageid,
    type:'get',
    dataType:'json',
    success:function(data){
        console.log(data)
        var html=template('product_data',data);
        $("#product_list").html(html);
        
        var pages=Math.ceil(data.totalCount/data.pagesize)
        console.log(pages);

//点击上下页
        var prev_href='productList.html?categoryid='+searchId.categoryid+'&pageid='+(pageid-1>1?pageid-1:1);
        var next_href="productList.html?categoryid="+searchId.categoryid+"&pageid="+(pageid+1<pages?pageid+1:pages);
        $("#pagination .prev").attr('href',prev_href);
        $("#pagination .next").attr('href',next_href);


//点击分页
for(var i=1;i<=pages;i++){
     // console.log(i);
     $li=$('<li></li>');
     $a=$('<a></a>');
     $a.html('第'+i+'页');
     $li.append($a);
     $(".dropdown-menu").append($li);

    var a_href='productList.html?categoryid='+searchId.categoryid+'&pageid='+i;
    $a.attr('href',a_href)
}
    }
})


function getQueryStringArge(){
var qs=location.search.length>1? location.search.substr(1):'';

var items=qs.length>1?qs.split('&'):[];
var obj={};
var key,value,item;
for(var i = 0;i<items.length;i++){
    item=items[i].split('=');
    key=item[0];
    value=item[1];
    obj[key]=value;

}
return obj;

}
