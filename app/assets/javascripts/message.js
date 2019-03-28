$(document).on('turbolinks:load', function(){
  $(function(){

    function buildHTML(message){
      img = message.image ? `<img src = "${message.image}" class = "lower-message__image">`:"";

      var html = `<div class="chat-memory" data-message-id="${message.id}">
                    <div class="right-chat-user">
                      <div class="right-chat-name">
                      ${message.user_name}
                      </div>
                      <div class="chat-time">
                      ${message.created_at}
                      </div>
                    </div>
                    <div class="right-chat-message">
                      <p class="right-chat-message__content">
                      ${message.content}
                      </p>
                      ${img}
                    </div>
                  </div>`
      return html;
    }

    function scroll() {
      $('.right-middle-contents').animate({scrollTop: $('.right-middle-contents')[0].scrollHeight},'fast');
    }

    $('#new_message').on('submit', function(e){
      e.preventDefault();
      var formData = new FormData(this);
      var url = $(this).attr('action')

      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })

      .done(function(data){
        var html = buildHTML(data)
        $('.right-middle-contents').append(html)
        scroll();
        $('.form__submit').attr('disabled',false)
        $('.message-box')[0].reset()
      })

      .fail(function(){
        alert('error')
        $('.form__submit').attr('disabled',false)
      })
    })

  // 自動更新
    var interval = setInterval(function(){
      if(location.pathname.match(/\/groups\/\d+\/messages/)){
        var last_message_id = $('.chat-memory').last().data('message-id')

        $.ajax({
          url: location.pathname,
          data:{id: last_message_id},
          type:'GET',
          dataType:'json'
        })

        .done(function(json){
          json.messages.forEach(function(message){
            $('.right-middle-contents').append(buildHTML(message));
            scroll();
          });
        })
        .fail(function(json){
          alert('自動更新に失敗しました');
        });
      }else{
        clearInterval(interval);
      }}, 5*1000)

  });
});
