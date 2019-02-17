
## usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|name|string|null: false|
|email|text|null: false, add_index, foreign_key: true|
|chat_group_id|integer||

### Association
- has_many :chat_groups
- has_many :messages

## chat_groupsテーブル
|Column|Type|Options|
|------|----|-------|
|chat_group_id|integer|null:false, foreign_key: true|
|group_name|string|null: false|

### Association
- has_many :messages
- has_many :users


## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|message_id|integer|null: false, foreign_key: true|
|message|text||
|image|string||
|created_at|string|null: false|
|user_id|integer|null: false, foreign_key: true|
|chat_group_id|integer|null:false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :chat_group
