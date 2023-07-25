<template>
  <page-section class="header">
    <page-button filled class="header__button">
      <span>Тест-драйв</span>
      <template #icon>
        <icon-arrow class="header__button__icon" />
      </template>
    </page-button>

    <div class="header__product">
      <nuxt-img src="/car.png" class="header__product__car" />
      <nuxt-img src="/logo.svg" class="header__product__mark" />
    </div>
  </page-section>
</template>

<style src="~/assets/css/sections/header.css" />
