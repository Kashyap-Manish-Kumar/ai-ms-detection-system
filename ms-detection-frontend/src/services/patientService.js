const API_URL =
  `${import.meta.env.VITE_BACKEND_URL}/api/patients`;

export const getPatients = async () => {

    const response = await fetch(API_URL);
    return response.json();
};

export const createPatient = async (patient) => {

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(patient),
    });

    return response.json();
};

export const deletePatient = async (id) => {

    await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });
};

export const updatePatient = async (id, patient) => {

    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(patient),
    });

    return response.json();
};