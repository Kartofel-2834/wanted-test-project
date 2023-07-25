// Features - [POST]

export async function getFeatures() {
  try {
    return await useAsyncData("features", () => useApiRequest("/", "POST"), {
      transform: (response) => {
        const { assets_domain, features } = response;

        let result = features.filter(
          (feature) =>
            feature?.description &&
            feature?.image &&
            feature?.model_name === "Figaro"
        );

        result = result.map((feature) => ({
          ...feature,
          image: `${assets_domain}${feature.image}`,
        }));

        return result.sort((a, b) => (a.sorting > b.sorting ? 1 : -1));
      },
    });
  } catch (err) {
    console.log(err);
    return { data: [] };
  }
}
