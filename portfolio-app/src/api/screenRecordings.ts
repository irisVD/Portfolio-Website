export async function fetchScreenRecordingById(id: number) {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/${id}`);
    if (!res.ok) throw new Error('Screenrecording not found.');
    return await res.json();
  }