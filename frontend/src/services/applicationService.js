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

export async function updateApplication({
  id,
  company,
  role,
  status,
  link,
  notes,
  dateApplied,
}) {
  const response = await api.patch(`/applications/${id}`, {
    company,
    role,
    status,
    link,
    notes,
    dateApplied,
  });
  return response.data;
}

export async function deleteApplication({ id }) {
  const response = await api.delete(`/applications/${id}`);
  return response.data;
}
