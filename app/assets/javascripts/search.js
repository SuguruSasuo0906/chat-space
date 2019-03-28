$(document).on('turbolinks:load', function(){
  $(function(){
    var user_list = $("#user-search-result");
    var member_list = $("#chat-group-users");

    function appendUser(user){
      var html =`<div class="chat-group-user clearfix">
                    <p class="chat-group-user__name">
                    ${user.name}</p>
                    <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                  </div>`;

      user_list.append(html);
    }

    function appendMember(name, user_id){
      var html = `
                  <div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${user_id}'>
                    <input name='group[user_ids][]' type='hidden' value=${user_id}>
                    <p class='chat-group-user__name'>${name}</p>
                    <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn data-user-id=${user_id} data-user-name=${name}'>削除</a>
                  </div>
      `
      member_list.append(html);
    }


    $("#user-search-field").on("keyup",function(){
      var input = $("#user-search-field").val();

      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input },
        dataType:'json'
      })

    .done(function(user){
      $("#user-search-result").empty();
      if(user.length !== 0){
        user.forEach(function(user){
          appendUser(user);
        });
      }
    })
      .fail(function(){
        alert('ユーザーの検索に失敗しました。');
      })
    });

    $(document).on('click','.user-search-add',function(){
      $('#chat-group-users').val();
      var name = $(this).data("user-name");
      var user_id = $(this).data("user-id");
      $(this).parent().remove();
      appendMember(name, user_id);
    });
    $(document).on('click','.user-search-remove',function(){
      var user_id = $(this).data("user-id");
      $(this).parent().remove();
    });
  });
});
