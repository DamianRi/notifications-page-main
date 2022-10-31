enum NotificationType {
  COMMENT_PICTURE,
  FOLLOW,
  JOIN_GROUP,
  LEFT_GROUP,
  PRIVATE_MESSAGE,
  REACTION,
}
enum NotificationAction {
    COMMENT_PICTURE = 'commented on your picture',
    FOLLOW = 'followed you',
    JOIN_GROUP = 'has joined your group',
    LEFT_GROUP = 'left the group',
    PRIVATE_MESSAGE = 'sent you a private message',
    REACTION = 'reacted to your recent post',
    UNDEFINED = 'unrecognized action'
}
export {
    NotificationType,
    NotificationAction
}