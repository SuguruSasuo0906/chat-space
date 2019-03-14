$(function(){

  function buildHTML(message){
    var img = '';

    if (message.image !== null) {
      img = `<img src = "${message.image}" class = "lower-message__image">`
    }

    var html = `<div class="chat-memory">
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
      var html = buildHTML(data);
      $('.right-middle-contents').append(html)
      $('.message').val('')
      $('.form__submit').attr('disabled',false)
    })

      .fail(function(){
        alert('error')
        $('.form__submit').attr('disabled',false)
    })
  })
});
