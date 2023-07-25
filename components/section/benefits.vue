<template>
  <page-section class="benefits">
    <div class="benefits__line" />

    <h1 class="benefits__title">
      <span>Мы ценим Ваше время и комфорт!</span>
      <span>Запишитесь на сервис Nissan онлайн</span>
    </h1>

    <page-slider
      :items="benefits"
      :slide="slide"
      :length="length"
      :with-arrows="length < 4"
      class="benefits__slider"
      @slide="(v) => (slide = v)"
    >
      <template #item="{ item: benefit }">
        <div class="benefits__slider__card">
          <nuxt-img :src="benefit.src" />
          <h3>{{ benefit.title }}</h3>
          <p>{{ benefit.text }}</p>
        </div>
      </template>
    </page-slider>
  </page-section>
</template>

<script setup>
const slide = ref(0);
const length = ref(1);

const benefits = ref([
  {
    title: "Выгода",
    text: "Узнайте о выгодных сервисных предложениях Nissan именно для вашего автомобиля",
    src: "/benefit.svg",
  },

  {
    title: "Актуальность",
    text: "Выберите актуальные для вас сервисные предложения",
    src: "/relevance.svg",
  },

  {
    title: "Широкий выбор",
    text: "Выберите дилера, который вам подходит",
    src: "/choice.svg",
  },

  {
    title: "Онлайн обслуживание",
    text: "Отправьте дилеру данные о вашем автомобиле в форме удобной анкеты",
    src: "/service.svg",
  },
]);

onMounted(() => {
  const middleScreenQuery = window.matchMedia("(max-width: 1200px)");
  const littleScreenQuery = window.matchMedia("(max-width: 900px)");

  function updateSliderLength() {
    slide.value = 0;

    if (littleScreenQuery.matches) return (length.value = 1);

    length.value = middleScreenQuery.matches ? 2 : 4;
  }

  updateSliderLength();

  middleScreenQuery.addEventListener("change", updateSliderLength);
  littleScreenQuery.addEventListener("change", updateSliderLength);
});
</script>

<style src="~/assets/css/sections/benefits.css" />
