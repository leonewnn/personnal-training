import type { CustomersResponse } from "./types";

export const fetchCustomers = () => {
  return fetch(import.meta.env.VITE_API_URL + "/customers")
    .then(response => {
      if (!response.ok)
        throw new Error("Error when fetching customers: " + response.statusText);
      return response.json();
    });
}