const API_URL = 'http://localhost:5000'; // Cambia a la URL de tu servidor en producción si lo despliegas

export const addProfile = async (profile) => {
  const response = await fetch(`${API_URL}/profiles`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(profile),
  });
  return response.json();
};

export const getProfiles = async () => {
  const response = await fetch(`${API_URL}/profiles`);
  return response.json();
};

export const updateProfile = async (profile) => {
  const response = await fetch(`${API_URL}/profiles/${profile._id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(profile),
  });
  return response.json();
};

export const deleteProfile = async (id) => {
  await fetch(`${API_URL}/profiles/${id}`, {
    method: 'DELETE',
  });
};
