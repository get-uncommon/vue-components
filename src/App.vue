<template>
  <div>
    <cookie-notice>
      <template v-slot:content>
        <h5>Cookies</h5>
        <p>
          We use <a href="#">cookies</a> in order to improve the user experience Maecenas fauci
          bus mollis interdum. Donec ullamcorper nulla non
          metus auctor fringilla. Morbi leo risus, porta ac consectetur ac, vestibulum at ero
          s. Cum sociis natoque penatibus et magnis dis
          parturient montes, nascetur ridiculus mus.
        </p>
      </template>
    </cookie-notice>

    <accordion>
      <accordion-item
        v-for="(item, $index) in accordionItems"
        :key="$index"
        :item="item"
        name="info-accordion"
        :index="$index"
      >
        <accordion-title>
          <h4>{{ item.title }}</h4>
        </accordion-title>
        <accordion-body>
          <p>{{ item.body }}</p>
        </accordion-body>
      </accordion-item>
    </accordion>
  </div>
</template>

<script>
export default {
  data() {
    return {
      accordionItems: [
        {
          title: 'Just click to collapse',
          body: 'Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.',
          active: false,
        },
        {
          title: 'Just click to collapse',
          body: 'Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.',
          active: false,
        },
        {
          title: 'Just click to collapse',
          body: 'Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.',
          active: false,
        },
      ],
    };
  },
};
</script>
