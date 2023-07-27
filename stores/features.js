const useFeaturesStore = defineStore("features", () => {
  const data = ref([]);

  async function fetch() {
    const response = await getFeatures();
    data.value = response.data.value;
  }

  function add(newFeature) {
    data.value.splice(1, 0, newFeature);
  }

  return {
    data,
    fetch,
    add,
  };
});

export default useFeaturesStore;
