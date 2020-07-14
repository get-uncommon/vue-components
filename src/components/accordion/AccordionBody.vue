<template>
  <div
    ref="body"
    class="accordion__body"
  >
    <div class="accordion__body__inner">
      <slot />
    </div>
  </div>
</template>

<script>
import { gsap } from 'gsap';

export default {
  name: 'AccordionBody',

  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },

  mounted() {
    this.$parent.$on('ontoggle', () => {
      gsap.to(this.$refs.body, {
        duration: 1,
        ease: 'power4.out',
        force3D: true,
        maxHeight: this.$refs.body.scrollHeight,
      });
    });
  },
};
</script>
