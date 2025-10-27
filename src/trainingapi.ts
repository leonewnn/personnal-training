import type { TrainingsResponse, TrainingWithCustomer } from "./types";

export const fetchTrainings = () => {
  return fetch(import.meta.env.VITE_API_URL + "/trainings")
    .then(response => {
      if (!response.ok)
        throw new Error("Error when fetching trainings: " + response.statusText);
      return response.json();
    });
}

export const fetchTrainingsWithCustomer = () => {
  return fetch(import.meta.env.VITE_API_URL + "/gettrainings")
    .then(response => {
      if (!response.ok)
        throw new Error("Error when fetching trainings with customer info: " + response.statusText);
      return response.json();
    });
}