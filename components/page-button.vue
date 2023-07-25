<template>
  <button
    class="button"
    :disabled="disabled"
    :class="{
      button_empty: !slots?.default,
      button_icon: !!slots?.icon,
      button_filled: filled,
      button_reverse: reverse,
    }"
  >
    <span class="button__content"><slot /></span>

    <slot name="icon" />
  </button>
</template>

<script setup>
import { defineProps, useSlots } from "vue";

const slots = useSlots();

const props = defineProps({
  icon: { type: String, default: "" },
  disabled: { type: Boolean, default: false },
  filled: { type: Boolean, default: false },
  reverse: { type: Boolean, default: false },
});
</script>

<style src="~/assets/css/components/button.css" />
