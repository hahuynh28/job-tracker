import api from "../api/api.js";

export async function getApplications({ status, page, limit }) {
  const response = await api.get("/applications", {
    params: { status, page, limit },
  });
  return response.data;
}

export async function createApplication({
  company,
  role,
  status,
  link,
  notes,
  dateApplied,
}) {
  const response = await api.post("/applications", {
    company,
    role,
    status,
    link,
    notes,
    dateApplied,
  });
  return response.data;
}
