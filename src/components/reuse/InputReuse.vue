<template>
  <div>
    <div class="field field_v2">
      <input
        :class="[!this.ok ? 'focus' : '', 'field__input']"
        placeholder=" "
        v-model="inputSent"
        ref="input"
        required
        @change="this.$emit('updateInputs', this.inputSent, this.$.vnode.key)"
      />
      <span class="underline"></span>
      <span class="field__label-wrap" aria-hidden="true">
        <span class="field__label">{{ inputText }}</span>
      </span>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ReuseInput",
  props: ["inputText", "ok", "color","width"],

  data() {
    return {
      inputSent: "",
    };
  },

  mounted() {
    this.color? this.$refs.input.style.backgroundColor = "rgb(255, 247, 240)" : "";
    this.width? this.$refs.input.style.width = this.width : "";
  },

  watch: {
    ok: {
      handler() {
        if (!this.ok) {
          this.$refs.input.focus();
        }
      },
    },
  },
});
</script>

<style scoped>
div {
  width: 70%;
}

/* RESET STYLES */

.field_v2 {
  width: 100%;
  margin-top: 1%;
}

.field__input {
  background: var(--ion-color-secondary);
  border-radius: 4dvh;
  border: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  font-family: inherit;
  font-size: inherit;
  color: var(--ion-color-primary-contrast);
  transform: 2s linear;
}

/*
=====
CORE STYLES
=====
*/

.field {
  --uiFieldBorderWidth: var(--fieldBorderWidth, 2px);
  --uiFieldPaddingRight: var(--fieldPaddingRight, 1rem);
  --uiFieldPaddingLeft: var(--fieldPaddingLeft, 1rem);
  display: var(--fieldDisplay, inline-flex);
  position: relative;

  font-size: var(--fieldFontSize, 1rem);
}

.field__input {
  box-sizing: border-box;
  width: var(--fieldWidth, 100%);
  height: var(--fieldHeight, 3rem);
  padding: var(--fieldPaddingTop, 1.25rem) var(--uiFieldPaddingRight)
    var(--fieldPaddingBottom, 0.5rem) var(--uiFieldPaddingLeft);
  border-bottom: var(--uiFieldBorderWidth) solid
    var(--fieldBorderColor, rgba(0, 0, 0, 0.25));
  color: var(--ion-color-primary-contrast);
}

.field__input:focus {
  outline: none;
}

.field__input::-webkit-input-placeholder {
  opacity: 0;
  transition: opacity 0.2s ease-out;
}

.field__input::-moz-placeholder {
  opacity: 0;
  transition: opacity 0.2s ease-out;
}

.field__input:focus::-webkit-input-placeholder {
  opacity: 1;
  transition-delay: 0.2s;
}

.field__input:focus::-moz-placeholder {
  opacity: 1;
  transition-delay: 0.2s;
}

.field__label-wrap {
  box-sizing: border-box;
  pointer-events: none;
  cursor: text;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.field__label-wrap::after {
  content: "";
  box-sizing: border-box;
  width: 100%;
  height: 0;
  opacity: 0;
  position: absolute;
  bottom: 0;
  left: 0;
}

.field__input:focus ~ .field__label-wrap::after {
  opacity: 1;
}

.field__label {
  color: var(--ion-color-medium);
  text-shadow: none;
  font-weight: 700;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: calc(50% - 0.5em);
  line-height: 1;
  font-size: var(--fieldHintFontSize, inherit);
  transition: top 0.2s cubic-bezier(0.9, -0.15, 0.1, 1.15),
    opacity 0.2s ease-out, font-size 0.2s ease-out;
}

.field__input:focus ~ .field__label-wrap .field__label,
.field__input:not(:placeholder-shown) ~ .field__label-wrap .field__label {
  --fieldHintFontSize: var(--fieldHintFontSizeFocused, 0.75rem);
  top: var(--fieldHintTopHover, 0.25rem);
}

/* effect */

.field_v2 .field__label-wrap {
  overflow: hidden;
}

.field_v2 .field__input:focus ~ .field__label-wrap::after {
  transform: translate3d(0, 0, 0);
  transition-delay: 0;
}


.underline{
  transition: all 0.5s;
  display: inline-block;
  bottom: 3%;
  left: 50%;
  transform: translateX(-50%);
  position: absolute;
  width: 0%;
  height: 4%;
  background-color: var(--ion-color-primary-tint);
}
input:focus + .underline{
  width: 83%;
}

.field__input.focus {
  background: #ebdfdf;
}
</style>
