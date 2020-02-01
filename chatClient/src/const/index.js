export const conversationTypes = {
  friend: 'FRIEND',
  group: 'GROUP'
}

export const APP_VERSION = '1.0.0'

export const VueAMapKey = '704b3b5e984fa3b6185c3f012da42547'

export const searchObjectMap = [
  {id: 1, label: '人', value: 'friend'},
  {id: 2, label: '群', value: 'group'}
]

export const searchTypes = {
  friend: [
    {id: 1, label: 'Chat账号', value: 'code'},
    {id: 2, label: '用户账号', value: 'name'},
    {id: 3, label: '昵称', value: 'nickname'}
  ],
  group: [
    {id: 1, label: 'Chat账号', value: 'code'},
    {id: 2, label: '名称', value: 'title'}
  ]
}
