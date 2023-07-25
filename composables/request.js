export async function useApiRequest(path = "/", method = "GET", options) {
  const config = useRuntimeConfig();

  return $fetch(path, { baseURL: config.public.baseURL, method, ...options });
}
