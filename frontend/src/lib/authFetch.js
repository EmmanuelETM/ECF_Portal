export const authFetch = async (url, options = {}) => {
  const headers = {
    ...(options.headers || {}),
    Authorization: token ? `Bearer ${token}` : undefined,
  };

  const response = await fetch(url, { ...options, headers });

  if (response.status === 401) {
    logout();
    throw new Error("Unauthorized");
  }

  return response;
};
