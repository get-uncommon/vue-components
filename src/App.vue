<template>
  <div>
    <cookie-notice
      :fields="cookieFields"
    >
      <template slot="content">
        <h5>Cookies</h5>
        <p>
          We use <a href="#">cookies</a> in order to improve the user experience Maecenas fauci
          bus mollis interdum. Donec ullamcorper nulla non
          metus auctor fringilla. Morbi leo risus, porta ac consectetur ac, vestibulum at ero
          s. Cum sociis natoque penatibus et magnis dis
          parturient montes, nascetur ridiculus mus.
        </p>
      </template>
      <template slot="settings">
        Settings
      </template>
    </cookie-notice>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cookieFields: [
        {
          id: 'necessary',
          label: 'Noodzakelijk',
          disabled: true,
          checked: true,
        },
        { id: 'statistics', label: 'Statistieken', checked: false },
      ],
    };
  },
};
</script>
