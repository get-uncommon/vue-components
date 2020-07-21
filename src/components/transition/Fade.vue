<template>
  <transition
    @css="false"
    @enter="enter"
    @leave="leave"
  >
    <slot />
  </transition>
</template>

<script>
import { gsap } from 'gsap';

export default {
  name: 'Fade',

  methods: {
    enter(el, done) {
      gsap.fromTo(el, {
        duration: 0.5,
        opacity: 0,
      }, {
        opacity: 1,
        onComplete: done,
      });
    },
    leave(el, done) {
      gsap.to(el, {
        duration: 0.5,
        opacity: 0,
        onComplete: done,
      });
    },
  },
};
</script>
