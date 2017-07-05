var searchId = getQueryStringArge();
var pageid = parseInt(searchId.pageid) || 1;


$.ajax({
    url: url + 'api/getproduct?productid=' + searchId.productid,
    type: 'get',
    dataType: 'json',
    success: function (data) {
        // console.log(data)
        var html = template('product_info', data);
        $("#product_detail .detail_info").html(html);
        var html1 = template('product_compare', data);
        $("#detail_list .price_compare").html(html1);
        var html2 = template('nav_data', data);
        $("#product_nav .breadcrumb").html(html2);
        
        // console.log(data.result[0].categoryId)
        $.ajax({
            url: url + 'api/getcategorybyid?categoryid=' + data.result[0].categoryId,
            type: 'get',
            dataType: 'json',
            success: function (data){
                $('#product_nav .breadcrumb li:nth-child(2) >a').html(data.result[0].category);
            }
     })
    }
})

$.ajax({
    url: url + 'api/getproductcom?productid=' + searchId.productid,
    type: 'get',
    dataType: 'json',
    success: function (data) {
        // console.log(data)
        var html = template('product_evaluate', data);
        $("#detail_evaluate .evalute").html(html);

    }

})


function getQueryStringArge() {
    var qs = location.search.length > 1 ? location.search.substr(1) : '';

    var items = qs.length > 1 ? qs.split('&') : [];
    var obj = {};
    var key, value, item;
    for (var i = 0; i < items.length; i++) {
        item = items[i].split('=');
        key = item[0];
        value = item[1];
        obj[key] = value;

    }
    return obj;

}
