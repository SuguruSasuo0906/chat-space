$(function(){

  function buildHTML(message){
    img = message.image ? `<img src = "${message.image}" class = "lower-message__image">`:"";
    var html = `<div class="chat-memory" message-id="${message.id}">
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
                    ${message.text}
                    </p>
                    ${img}
                  </div>
                </div>`
    return html;
  }

  function scroll() {
    $('.messages').animate({scrollTop: $('.message')[0].scrollHeight});
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
      $('.form__submit').attr('disabled',false)
      $('.message-box')[0].reset()
    })

    .fail(function(){
      alert('error')
      $('.form__submit').attr('disabled',false)
    })
  })
  var interval = setInterval(function(){
    if(window.location.href.match(/\/groups\/\d+\/messages/)){
      $.ajax({
        url: location.href,
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function(json){
        var id = $('.chat-memory').attr('message-id');
        var newhtml = '';
        json.forEach(function(message){
          if(message.id > id){
            newhtml += buildHTML(message);
          }
        });
        $('.chat-memory').append(newhtml).animate({
          scrollTop: $('.chat-memory')[0].scrollHeight
        },'fast');
      })
      .fail(function(json){
        alert("自動更新は失敗しました");
      });
    }else{
      clearInterval(interval);
    }},5000);
});
