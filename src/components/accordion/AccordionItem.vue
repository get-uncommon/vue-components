<template>
  <div
    ref="item"
    class="accordion__item"
    :class="{ 'is-active' : !unCollapsed }"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'AccordionItem',

  data() {
    return {
      unCollapsed: true,
    };
  },

  mounted() {
    this.$on('ontoggle', (state) => {
      this.unCollapsed = state;
    });
  },
};
</script>
