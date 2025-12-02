export const fetchStudents = async () => {
  const response = await fetch('/api/students');
  if (!response.ok) {
    throw new Error('Failed to fetch students');
  }
  return await response.json();
}

export const fetchInstitutionList = async () => {
  const response = await fetch('/api/institutions');
  if (!response.ok) {
    throw new Error('Failed to fetch institutions');
  }
  return await response.json();
}

export const fetchInstitutionStudents = async (institutionName) => {
  const response = await fetch(`/api/institution/studentRoster?institution=${encodeURIComponent(institutionName)}`);
  if (!response.ok) {
    throw new Error('Failed to fetch institution students');
  }
  return await response.json();
}
