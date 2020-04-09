<template>
  <div
    ref="container"
    class="cookie-notice"
    :class="{ 'is-hidden' : isHidden }"
  >
    <div class="cookie-notice__content">
      <slot name="content" />
    </div>

    <div class="cookie-notice__btngroup">
      <button
        type="button"
        :class="buttonClass"
        @click.prevent="onSave"
      >
        {{ buttonText }}
      </button>
    </div>
  </div>
</template>

<script>
import Cookie from '@/utils/cookie';

export default {
  name: 'CookieNotice',

  props: {
    fields: {
      type: Array,
      default: () => [],
    },
    storageKey: {
      type: String,
      default: 'cookiePreferences',
    },
    cookieDomain: {
      type: String,
      default: '',
    },
    buttonClass: {
      type: String,
      default: 'btn',
    },
    buttonText: {
      type: String,
      default: 'Save & close',
    },
  },

  data() {
    return {
      options: null,
      isHidden: true,
      cookie: null,
      selector: null,
      defaultFields: [
        {
          id: 'required',
          label: 'Required',
          disabled: true,
          checked: true,
        },
        { id: 'functional', label: 'Functional' },
        { id: 'performance', label: 'Performance' },
        { id: 'marketing', label: 'Marketing' },
      ],
    };
  },

  computed: {
    mergeFields() {
      return {
        ...this.defaultFields,
        ...this.fields,
      };
    },

    defaultOptions() {
      const values = Object.keys(this.mergeFields)
        .map((key) => this.mergeFields[key].id);

      return values;
    },
  },

  mounted() {
    this.selector = this.$refs.container;
    this.options = this.defaultOptions;

    this.setState();
  },

  methods: {
    show() {
      this.isHidden = false;
    },

    setState() {
      this.cookie = Cookie.get(this.storageKey);

      if (!this.cookie) this.show();
    },

    onSave() {
      Cookie.set(this.storageKey, this.options.join(' '), { domain: this.cookieDomain });

      window.location.reload();
    },
  },
};
</script>
