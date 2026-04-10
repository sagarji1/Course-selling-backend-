export async function apiFetch(url, options = {}) {
  const customHeaders = options.headers || {};
  const isFormData = options.body instanceof FormData;

  const headers = {
    ...customHeaders,
  };

  if (!isFormData && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  const finalOptions = {
    ...options,
    headers,
  };

  const response = await fetch(url, finalOptions);

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    if (data.errors && data.errors.length > 0) {
      throw new Error(`${data.msg}: ${data.errors[0].message}`);
    }
    throw new Error(data.msg || data.mas || "Request failed");
  }

  return data;
}
