<template>
  <page-section class="features">
    <h2>Уникальные особенности модели</h2>

    <div class="features__list">
      <div
        v-for="(feature, index) of features"
        :key="index"
        class="features__list__card"
      >
        <div class="features__list__card__preview">
          <nuxt-img :src="feature.image" :alt="feature.image_alt" />
        </div>

        <p class="features__list__card__description">
          {{ feature.description || "Нет описания" }}
        </p>
      </div>
    </div>

    <page-button
      :disabled="isFeatureAddLocked"
      class="features__button"
      @click="addFeature"
    >
      Добавить особенность
    </page-button>
  </page-section>
</template>

<script setup>
const isFeatureAddLocked = ref(false);

const features = ref([]);
const { data } = await getFeatures();

features.value = data.value;

function addFeature() {
  isFeatureAddLocked.value = true;

  features.value.splice(1, 0, {
    image: "/additionalFeature.png",
    image_alt: "нестационарный гироскопический стабилизатор",
    description:
      "Вращение стационарно заставляет иначе взглянуть на то, что такое нестационарный гироскопический стабилизатор",
  });
}
</script>

<style src="~/assets/css/sections/features.css" />
