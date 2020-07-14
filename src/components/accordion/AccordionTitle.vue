<template>
  <div
    class="accordion__title"
    @click="toggle"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'AccordionTitle',

  methods: {
    toggle(event) {
      this.$parent.$emit('ontoggle', {
        event,
        index: this.$parent.index,
      });
    },
  },
};
</script>
