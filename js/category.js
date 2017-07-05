$.ajax({
    url:url+'api/getcategorytitle',
    type:'get',
    dataType:'json',
    success:function(data){
      // console.log(data)
      var html=template('product_data',data);
      $('#product_list #accordion').html(html);
      $('#product_list #accordion .panel-title a').click(function(){
        var titleid=$(this).data('titleid');
        //获取不同的类名为row的div
        $row=$(this).parent().parent().siblings().find('.panel-body .row')
        console.log($row)
        if($row.children().length==0){
          $.ajax({
            url:url+'api/getcategory?titleid='+titleid,
            type:'get',
            dataType:'json',
            success:function(data){
              console.log(data)
              var html=template('columns',data);
              $row.html(html)
            }
          })
        }
      })
    }

})