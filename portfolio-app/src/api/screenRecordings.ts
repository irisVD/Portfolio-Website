export async function fetchScreenRecordingByFileName(fileName:string) {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/${fileName}`);
    if (!res.ok) throw new Error('Screenrecording not found.');
    return await res.json();
  }