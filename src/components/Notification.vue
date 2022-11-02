<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import {
  NotificationType,
  NotificationAction,
  NotificationEntity,
} from "../types/Notification";
export default defineComponent({
  props: {
    notificationEntity: {
      type: Object as PropType<NotificationEntity>,
      required: true,
    },
  },
  data() {
    return {};
  },
  setup(props) {
    const getDescriptionFromNotificationType = computed((): string => {
      switch (props.notificationEntity?.notificationType) {
        case NotificationType.COMMENT_PICTURE:
          return NotificationAction.COMMENT_PICTURE;
        case NotificationType.FOLLOW:
          return NotificationAction.FOLLOW;
        case NotificationType.JOIN_GROUP:
          return NotificationAction.JOIN_GROUP;
        case NotificationType.LEFT_GROUP:
          return NotificationAction.LEFT_GROUP;
        case NotificationType.PRIVATE_MESSAGE:
          return NotificationAction.PRIVATE_MESSAGE;
        case NotificationType.REACTION:
          return NotificationAction.REACTION;
        default:
          return "No description";
      }
    });
    const isCommetedPictureNotification = computed(() => {
      return (
        props.notificationEntity?.notificationType ===
        NotificationType.COMMENT_PICTURE
      );
    });
    const isReactedNotification = computed(() => {
      return (
        props.notificationEntity?.notificationType === NotificationType.REACTION
      );
    });
    const isJoinOrLeftGroupNotification = computed(() => {
      return [
        NotificationType.JOIN_GROUP,
        NotificationType.LEFT_GROUP,
      ].includes(props.notificationEntity!.notificationType);
    });
    const isPrivateMessageNotification = computed(() => {
      return [NotificationType.PRIVATE_MESSAGE].includes(
        props.notificationEntity!.notificationType
      );
    });
    return {
      getDescriptionFromNotificationType,
      isCommetedPictureNotification,
      isReactedNotification,
      isJoinOrLeftGroupNotification,
      isPrivateMessageNotification,
    };
  },
});
</script>

<template>
  <div class="notification" :class="{ unread: notificationEntity.unread }">
    <img
      class="notification__avatar"
      :src="'@/' + notificationEntity!.userAvatar"
      :alt="`User avatar of ${notificationEntity?.userName}`"
    />
    <div class="notification__info">
      <p class="notification__details">
        <span class="details__user">{{ notificationEntity?.userName }}</span>
        <span class="details__description">{{
          getDescriptionFromNotificationType
        }}</span>
        <span
          v-if="
            notificationEntity?.location && notificationEntity.location.length
          "
          class="details__location"
          :class="{
            reacted: isReactedNotification,
            'join-left': isJoinOrLeftGroupNotification,
          }"
          >{{ notificationEntity.location }}</span
        >
        <span v-if="notificationEntity!.unread" class="unread-icon"></span>
      </p>
      <p class="notification__time">{{ notificationEntity?.time }} ago</p>
      <p
        v-if="isPrivateMessageNotification && notificationEntity?.message"
        class="notification__message"
      >
        {{ notificationEntity.message }}
      </p>
    </div>
    <img
      v-if="isCommetedPictureNotification && notificationEntity?.picture"
      class="notification__picture"
      :src="'@/' + notificationEntity.picture"
      alt="Picture commented"
    />
  </div>
</template>

<style scoped lang="scss">
.notification {
  display: grid;
  grid-template-columns: 4rem 1fr;
  grid-auto-flow: column;
  justify-content: start;
  gap: 1.6rem;
  padding: 1.6rem;
  width: 100%;
  line-height: 1.8rem;
  border-radius: 1rem;
  color: var(--very-dark-blue);
  &.unread {
    background-color: var(--very-light-grayish-blue);
  }

  .notification__avatar {
    width: 4rem;
    height: 4rem;
  }
  .notification__info {
    .notification__details {
      font-size: 1.4rem;
      span {
        margin: 0 0.4rem 0 0;
      }
      .details__user {
        font-weight: 800;
        &:hover {
          color: var(--blue);
          cursor: pointer;
        }
      }
      .details__location {
        font-weight: 800;
        &.reacted {
          color: var(--dark-grayish-blue);
        }
        &.join-left {
          color: var(--blue);
        }
        &:hover {
          color: var(--blue);
          cursor: pointer;
        }
      }
      .unread-icon {
        display: inline-block;
        width: 0.8rem;
        height: 0.8rem;
        margin: 0 0 0 0.4rem;
        border-radius: 9rem;
        background-color: var(--red);
      }
    }
    .notification__time {
      margin: 0.2rem 0 0 0;
      font-size: 1.4rem;
      color: var(--grayish-blue);
    }
    .notification__message {
      display: inline-block;
      padding: 1.6rem;
      margin: 1rem 0 0 0;
      font-size: 1.4rem;
      border-radius: 0.4rem;
      border: 1px solid var(--grayish-blue);
      color: var(--dark-grayish-blue);
      &:hover {
        border: 1px solid var(--light-grayish-blue-1);
        background-color: var(--light-grayish-blue-1);
      }
    }
  }
  .notification__picture {
    width: 4rem;
    height: 4rem;
    border-radius: 0.5rem;
    cursor: pointer;
    &:hover {
      box-shadow: 0 0 0px 2px var(--light-grayish-blue-1);
    }
  }
}
</style>
