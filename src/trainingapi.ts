import type { TrainingsResponse, TrainingWithCustomer, TrainingForm } from "./types";

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

export const saveTraining = (training: TrainingForm) => {
  return fetch(import.meta.env.VITE_API_URL + "/trainings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(training)
  })
  .then(response => {
    if (!response.ok)
      throw new Error("Error when adding a new training");
    return response.json();
  })
}

export const deleteTraining = (id: number) => {
  return fetch(import.meta.env.VITE_API_URL + "/trainings/" + id, {
    method: "DELETE"
  })
  .then(response => {
    if (!response.ok)
      throw new Error("Error when deleting training: " + response.statusText);
    return response;
  })
}