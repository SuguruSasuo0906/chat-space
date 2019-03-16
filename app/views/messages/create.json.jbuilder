json.text @message.content
json.user_id @message.user_id
json.group_id @message.group_id
json.created_at @message.created_at.strftime('%Y/%m/%d %H:%M:%S')
json.user_name @message.user.name
json.image @message.image.url
