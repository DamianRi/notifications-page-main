<script lang="ts">
import { defineComponent } from 'vue';
import Notification from './components/Notification.vue'
import { NotificationType } from './types/Notification';
export default defineComponent({
  components: {
    Notification
  },
  data() {
    return {
      unreadNotifications: [
        true, true, true, false, false, false, false
      ] as Array<Boolean>,
      notificationType: NotificationType
    }
  },
  mounted() {
  },
  computed: {
    unreadNotificationsCounter (): number {
      return this.unreadNotifications.filter((n: boolean) => n).length
    }
  },
  methods: {
    markAsReadNotifications (): void {
      this.unreadNotifications.fill(false)
    }
  }
})
</script>

<template>
  <header>
    <h1>Notifications <span class="unread-notification-counter">{{ unreadNotificationsCounter }}</span></h1>
    <span class="mark-all-as-read">Mark all as read</span>
  </header>
  <main>
    <notification
      :userName="'Mark Webber'"
      :userAvatar="'../src/assets/images/avatar-mark-webber.webp'"
      :notificationType="notificationType.REACTION"
      :location="'My first tournament today!'"
      :time="'1m'"
      :unread="true"
    ></notification>
    <notification
      :userName="'Angela Gray'"
      :userAvatar="'../src/assets/images/avatar-angela-gray.webp'"
      :notificationType="notificationType.FOLLOW"
      :time="'5m'"
      :unread="true"
    ></notification>
    <notification
      :userName="'Jacob Thompson'"
      :userAvatar="'../src/assets/images/avatar-jacob-thompson.webp'"
      :notificationType="notificationType.JOIN_GROUP"
      :location="'Chess Club'"
      :time="'1 day'"
      :unread="true"
    ></notification>
    <notification
    :userName="'Rizky Hasanuddin'"
    :userAvatar="'../src/assets/images/avatar-rizky-hasanuddin.webp'"
    :notificationType="notificationType.PRIVATE_MESSAGE"
    :time="'5 days'"
    :message="'Hello, thanks for setting up the Chess Club. I\'ve been a member for a few weeks now and I\'m already having lots of fun and improving my game.'"
    :unread="false"
    ></notification>
    <notification
      :userName="'Kimberly Smith'"
      :userAvatar="'../src/assets/images/avatar-kimberly-smith.webp'"
      :notificationType="notificationType.COMMENT_PICTURE"
      :location="'Chess Club'"
      :time="'1 week'"
      :picture="'../src/assets/images/image-chess.webp'"
      :unread="false"
    ></notification>
    <notification
      :userName="'Nathan Peterson'"
      :userAvatar="'../src/assets/images/avatar-nathan-peterson.webp'"
      :notificationType="notificationType.REACTION"
      :location="'5 end-game strategies to increase your win rate'"
      :time="'2 weeks'"
      :unread="false"
    ></notification>
    <notification
      :userName="'Anna Kim'"
      :userAvatar="'../src/assets/images/avatar-anna-kim.webp'"
      :notificationType="notificationType.LEFT_GROUP"
      :location="'Chess Club'"
      :time="'2 weeks'"
      :unread="false"
    ></notification>
  </main>
  <footer class="attribution">
    Challenge by
    <a href="https://www.frontendmentor.io?ref=challenge" target="_blank"
      >Frontend Mentor</a
    >. Coded by <a href="https://github.com/DamianRi/" target="_blank">Damián Rivera</a>.
  </footer>
</template>

<style scoped lang="scss">
header {
  display: flex;
  justify-content: space-between;
  padding: 2em 1.6rem 0.8rem;
  background-color: var(--white);
  color: var(--very-dark-blue);

  h1 {
    font-size: 1.8rem;
    font-weight: 800;

    .unread-notification-counter {
      display: inline-block;
      padding: 0rem 1.1rem;
      margin: 0 0 0 0.8rem;
      border-radius: 0.6rem;
      font-size: 1.4rem;
      background-color: var(--blue);
      color: var(--white);
    }
  }
  .mark-all-as-read {
    font-size: 1.4rem;
    cursor: pointer;
  }

}
main {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.6rem;
  background-color: var(--white);
}
</style>
