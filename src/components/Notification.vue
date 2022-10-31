<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { NotificationType, NotificationAction } from "../types/Notification";
export default defineComponent({
  props: {
    userName: {
      type: String,
      required: true,
    },
    userAvatar: {
      type: String,
      required: true,
    },
    notificationType: {
      type: Number as PropType<NotificationType>,
      required: true,
    },
    location: {
      type: String,
    },
    message: {
      type: String,
    },
    picture: {
      type: String,
    },
    time: {
      type: String, // this could be in milliseconds to be more dinamically
    },
    unread: {
      type: Boolean,
    },
  },
  data() {
    return {};
  },
  setup(props) {
    const getDescriptionFromNotificationType = computed((): string => {
      switch (props.notificationType) {
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
      return props.notificationType === NotificationType.COMMENT_PICTURE;
    });
    const isReactedNotification = computed(() => {
      return props.notificationType === NotificationType.REACTION;
    });
    const isJoinOrLeftGroupNotification = computed(() => {
      return [
        NotificationType.JOIN_GROUP,
        NotificationType.LEFT_GROUP,
      ].includes(props.notificationType);
    });
    const isPrivateMessageNotification = computed(() => {
      return [NotificationType.PRIVATE_MESSAGE].includes(
        props.notificationType
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
  <div class="notification" :class="{ unread }">
    <img
      class="notification__avatar"
      :src="userAvatar"
      :alt="`User avatar of ${userName}`"
    />
    <div class="notification__info">
      <p class="notification__details">
        <span class="details__user">{{ userName }}</span>
        <span class="details__description">{{
          getDescriptionFromNotificationType
        }}</span>
        <span
          v-if="location && location.length"
          class="details__location"
          :class="{
            reacted: isReactedNotification,
            'join-left': isJoinOrLeftGroupNotification,
          }"
          >{{ location }}</span
        >
        <span v-if="unread" class="unread-icon"></span>
      </p>
      <p class="notification__time">{{ time }} ago</p>
      <p
        v-if="isPrivateMessageNotification && message"
        class="notification__message"
      >
        {{ message }}
      </p>
    </div>
    <img
      v-if="isCommetedPictureNotification && picture"
      class="notification__picture"
      :src="picture"
      alt="Picture commented"
    />
  </div>
</template>

<style scoped lang="scss">
.notification {
  display: flex;
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
  }
}
</style>
