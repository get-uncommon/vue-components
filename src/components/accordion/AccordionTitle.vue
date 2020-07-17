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

  data() {
    return {
      unCollapsed: true,
    };
  },

  methods: {
    toggle() {
      this.unCollapsed = !this.unCollapsed;
      this.$parent.$emit('ontoggle', this.unCollapsed);
    },
  },
};
</script>
