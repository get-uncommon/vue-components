<template>
  <div
    :id="`${name}-item-${index}`"
    ref="item"
    class="accordion__item"
    :class="{ 'is-active' : item.active }"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'AccordionItem',

  props: {
    index: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    item: {
      type: Object,
      default: () => {},
    },
  },

  // mounted() {
  //   this.$on('ontoggle', (data) => {
  //     console.log(data);
  //   });
  // },

  methods: {
    // toggle() {
    //   console.log('toggle');
    // },
  },
};
</script>
