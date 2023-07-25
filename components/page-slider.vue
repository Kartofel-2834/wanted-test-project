<template>
  <div class="slider-inner">
    <div v-if="withArrows" class="slider__arrow" @click="back">
      <slot name="arrow">
        <icon-arrow />
      </slot>
    </div>

    <div
      ref="slider"
      class="slider"
      :style="{ '--length': length }"
      @mousedown="(event) => startDrag(event.x)"
      @touchstart="(event) => startDrag(event.touches[0].clientX)"
    >
      <div
        class="slider__pipeline"
        :class="{ slider__pipeline_sliding: !isDragging }"
        :style="{ transform: `translateX(${dragProgress}px)` }"
      >
        <div
          v-for="(item, index) in items"
          :key="index"
          class="slider__pipeline__card"
        >
          <slot :item="item" :index="index" name="item" />
        </div>
      </div>
    </div>

    <div v-if="withArrows" class="slider__arrow" @click="forward">
      <slot name="arrow">
        <icon-arrow />
      </slot>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["slide"]);

const props = defineProps({
  slide: { type: Number, required: true },
  length: { type: Number, default: () => 4 },
  withArrows: { type: Boolean, default: false },
  items: { type: Array, default: () => [] },
});

const { abs, floor } = Math;

const slider = ref(null);
const isDragging = ref(false);
const dragProgress = ref(0);

let current = null;
let start = 0;
let offset = 0;
let draggingWidth = 0;

function getSliderInfo() {
  const step = floor(slider.value.clientWidth / props.length);
  const sliderWidth = (props.items.length - props.length + 1) * step;

  return { sliderWidth, step };
}

function reset() {
  isDragging.value = false;
  dragProgress.value = offset;
  draggingWidth = 0;
}

function to(newSlide = 0) {
  const { step } = getSliderInfo();

  const limit = props.items.length - props.length;

  if (newSlide > limit) {
    emit("slide", limit);
    return;
  } else if (newSlide < 0) {
    emit("slide", 0);
    return;
  }

  isDragging.value = false;
  dragProgress.value = step * newSlide * -1;
  offset = dragProgress.value;
  current = newSlide;
}

function back() {
  const { step } = getSliderInfo();
  const update = offset + step;

  if (update > 0) {
    reset();
    return;
  }

  emit("slide", props.slide - 1);
}

function forward() {
  const { sliderWidth, step } = getSliderInfo();
  const update = offset - step;

  if (abs(update) >= sliderWidth) {
    reset();
    return;
  }

  emit("slide", props.slide + 1);
}

function startDrag(startPosition) {
  isDragging.value = true;
  start = startPosition;
}

function finishDrag() {
  if (!isDragging.value) return;

  const { step } = getSliderInfo();
  const distance = abs(draggingWidth);

  if (
    (distance >= 0 && distance <= 10) ||
    abs(step - distance) >= floor(step / 1.25)
  ) {
    reset();
  } else if (draggingWidth > 0) {
    back();
  } else {
    forward();
  }

  isDragging.value = false;
  draggingWidth = 0;
}

function drag(move) {
  if (!isDragging.value || props.length >= props.items.length) return;

  const { sliderWidth, step } = getSliderInfo();

  const update = offset + move;

  if (
    abs(move) > step ||
    update >= 50 ||
    update <= (sliderWidth - step + 50) * -1
  ) {
    return;
  }

  draggingWidth = move;
  dragProgress.value = offset + move;
}

onMounted(async () => {
  window.addEventListener("touchend", finishDrag);

  window.addEventListener("mouseup", finishDrag);

  window.addEventListener("touchmove", (event) => {
    drag(event.touches[0].clientX - start);
  });

  window.addEventListener("mousemove", (event) => {
    drag(event.x - start);
  });
});

watchEffect(() => {
  if (!slider.value || current === props.slide) return;

  to(props.slide);
});
</script>

<style src="~/assets/css/components/slider.css" />
