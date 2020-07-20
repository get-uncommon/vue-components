<template>
  <fade>
    <div
      v-if="!isHidden"
      ref="container"
      class="cookie-notice"
    >
      <div class="cookie-notice__content">
        <slot name="content" />
      </div>
      <fade>
        <form
          v-if="showSettings"
          ref="settingsForm"
          class="cookie-notice__form"
        >
          <label
            v-for="(option, optionIndex) in fields"
            :key="optionIndex"
            :for="option.id"
          >
            <input
              :id="option.id"
              type="checkbox"
              name="cookie_options[]"
              :value="option.id"
              :checked="option.checked"
              :disabled="option.disabled"
              @input="onInput($event, optionIndex)"
            >
            {{ option.label }}
          </label>
        </form>
      </fade>
      <div class="cookie-notice__btngroup">
        <button
          type="button"
          :class="buttonClassSettings"
          @click.prevent="toggleSettings"
        >
          <slot name="settings" />
        </button>
        <button
          type="button"
          :class="buttonClass"
          @click.prevent="onSave"
        >
          {{ buttonText }}
        </button>
      </div>
    </div>
  </fade>
</template>

<script>
import Cookie from '@/utils/cookie';
import Fade from '@/components/transition/Fade.vue';

export default {
  name: 'CookieNotice',

  components: { Fade },

  props: {
    fields: {
      type: Array,
      default: () => [
        {
          id: 'necessary',
          label: 'Necessary',
          disabled: true,
          checked: true,
        },
        { id: 'statistics', label: 'Statistics' },
      ],
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
      default: '',
    },
    buttonClassSettings: {
      type: String,
      default: '',
    },
    buttonText: {
      type: String,
      default: 'Save & close',
    },
  },

  data() {
    return {
      showSettings: false,
      options: null,
      isHidden: true,
      cookie: null,
      selector: null,
    };
  },

  computed: {
    allOptions() {
      return Object.keys(this.fields).map((key) => this.fields[key].id);
    },
  },

  mounted() {
    this.selector = this.$refs.container;
    this.options = this.allOptions;

    // Hide cookie notice if 'saved'
    this.$root.$on('saveCookie', () => this.hide());

    this.setState();
  },

  methods: {
    /**
     * Show cookie notice
     */
    show() {
      this.isHidden = false;
    },

    /**
     * Hide cookie notice
     */
    hide() {
      this.isHidden = true;
    },

    /**
     * Toggle section for settings
     */
    toggleSettings() {
      this.showSettings = !this.showSettings;
      this.updateOptions();
    },

    /**
     * Set cookie notice state
     */
    setState() {
      this.cookie = Cookie.get(this.storageKey);

      if (!this.cookie) {
        this.show();
      }
    },

    /**
     * Method fires on save. Save and submit cookie preferences
     */
    onSave() {
      Cookie.set(this.storageKey, this.options.join(' '), { domain: this.cookieDomain });

      this.$root.$emit('saveCookie', this.cookie);
    },

    /**
     * Watch input event for custom checkboxes
     * Only fires if settings are enabled
     */
    onInput($event, index) {
      if ($event.target.checked) {
        this.fields[index].checked = true;
      } else {
        this.fields[index].checked = false;
      }

      this.updateOptions();
    },

    /**
     * Update options
     */
    updateOptions() {
      const values = [...this.fields].filter((input) => input.checked);
      this.options = Object.keys(values).map((key) => this.fields[key].id);
    },
  },
};
</script>
