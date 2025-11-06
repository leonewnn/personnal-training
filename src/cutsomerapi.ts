import type { CustomersResponse, CustomerForm } from "./types";

export const fetchCustomers = () => {
  return fetch(import.meta.env.VITE_API_URL + "/customers")
    .then(response => {
      if (!response.ok)
        throw new Error("Error when fetching customers: " + response.statusText);
      return response.json();
    });
}

export const saveCustomer = (customer: CustomerForm) => {
  return fetch(import.meta.env.VITE_API_URL + "/customers", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(customer)
  })
  .then(response => {
    if (!response.ok)
      throw new Error("Error when adding a new customer");
    return response.json();
  })
}

export const updateCustomer = (url: string, customer: CustomerForm) => {
  return fetch(url, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(customer)
  })
  .then(response => {
    if (!response.ok)
      throw new Error("Error when updating customer");
    return response.json();
  })
}

export const deleteCustomer = (url: string) => {
  return fetch(url, {
    method: "DELETE"
  })
  .then(response => {
    if (!response.ok)
      throw new Error("Error when deleting customer: " + response.statusText);
    return response.json();
  })
}