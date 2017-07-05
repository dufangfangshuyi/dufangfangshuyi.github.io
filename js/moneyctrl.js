//针对商品列表发送请求
$.ajax({
    url: url + 'api/getmoneyctrl',
    type: 'get',
    dataType: 'json',
    success: function (data) {
        // console.log(data)
        //渲染页面
        var html = template('product_data', data);
        $("#product_list .list_container").html(html)

    }
})


var searchId = getQureyStringArge();
var pageid = parseInt(searchId.pageid) || 1;
//针对分页发送ajax请求
$.ajax({
    url: url + 'api/getmoneyctrl?pageid=' + pageid,
    type: 'get',
    dataType: 'json',
    success: function (data) {
        console.log(data)
        //获取总页数
        var pages = Math.ceil(data.totalCount / data.pagesize);
        console.log(pages)
        //点击上下页
        var prev_href = 'moneyctrl.html?pageid=' + (pageid - 1 > 1 ? pageid - 1 : 1);
        var next_href = 'moneyctrl.html?pageid=' + (pageid + 1 < pages ? pageid + 1 :pages);
        $("#pagination .prev").attr('href', prev_href);
        $("#pagination .next").attr('href', next_href);

        //点击下拉页
        for (var i = 1; i <= pages; i++) {
            var a_href = 'moneyctrl.html?pageid=' + i;
            var $a = $("<a></a>");
            $a.attr("href", a_href).html("第" + i + "页");
            var $li = $("<li></li>");
             $li.append($a);
            $(".dropdown .dropdown-menu").append($li);

        }


    }

})




//构造函数
function getQureyStringArge() {
    //判断是否存在location.search，若存在就截取？后面的字符串
    var qs = location.search.length > 1 ? location.search.substr(1) : '';
    console.log(qs);//pageid=1

    //利用split截取成数组的形式
    var items = qs.length > 1 ? qs.split('&') : [];

    var obj = {};//创建一个空对象
    var item, key, value;
    for (var i = 0; i < items.length; i++) {
        item = items[i].split('=');
        value = item[1];
        key = item[0];
        obj[key] = value
    }
    return obj;
}
