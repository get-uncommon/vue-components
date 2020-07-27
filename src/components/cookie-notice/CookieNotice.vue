<template>
  <fade>
    <div
      v-if="!isHidden"
      ref="container"
      class="vc-cookie-notice"
    >
      <div class="vc-cookie-notice__content">
        <slot name="content" />
      </div>
      <fade>
        <form
          v-if="settings && settingsEnabled"
          ref="settingsForm"
          class="vc-cookie-notice__form"
        >
          <label
            v-for="(option, optionIndex) in fields"
            :key="optionIndex"
            class="vc-cookie-notice__field"
            :for="option.id"
          >
            <input
              :id="option.id"
              class="vc-cookie-notice__input"
              type="checkbox"
              name="cookie_options[]"
              :value="option.id"
              :checked="option.checked"
              :disabled="option.disabled"
              @input="onInput($event, optionIndex)"
            >
            <span class="vc-cookie-notice__check" />
            <span class="vc-cookie-notice__labeltext">
              {{ option.label }}
            </span>
          </label>
        </form>
      </fade>
      <div class="vc-cookie-notice__btngroup">
        <button
          v-if="settingsEnabled"
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
import { CookieEvent } from '../../library';
import Cookie from '../../utils/cookie';
import Fade from '../transition/Fade.vue';

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
    settingsEnabled: {
      type: Boolean,
      default: true,
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
      settings: false,
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
    CookieEvent.$on('saveCookie', () => this.hide());
    CookieEvent.$on('showCookieNotice', () => {
      this.show();
      this.showSettings();
    });

    // Trigger settings, when cookies are already accepted.
    const triggerSettingsNodes = document
      .querySelectorAll('.js-toggle-cookie-settings, [href="#cookie-settings"]');

    [...triggerSettingsNodes].forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();

        CookieEvent.$emit('showCookieNotice');
      });
    });

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
     * Show settings section
     */
    showSettings() {
      this.settings = true;

      const cookieArr = this.cookie.split(' ');
      for (let i = 0; i < cookieArr.length; i += 1) {
        const fields = this.fields.filter((field) => field.id === cookieArr[i]);
        fields[0].checked = true;
      }
    },

    /**
     * Toggle section for settings
     */
    toggleSettings() {
      this.settings = !this.settings;
      this.updateOptions();
    },

    /**
     * Set cookie notice state
     */
    setState() {
      this.cookie = Cookie.get(this.storageKey);
      if (!this.cookie) this.show();
    },

    /**
     * Method fires on save. Save and submit cookie preferences
     */
    onSave() {
      Cookie.set(this.storageKey, this.options.join(' '), { domain: this.cookieDomain });
      CookieEvent.$emit('saveCookie', this.fields);
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
