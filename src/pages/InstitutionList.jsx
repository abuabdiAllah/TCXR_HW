import React, { useEffect, useState } from "react";
import { useData } from "../context/DataContext";
import { useNavigate } from "react-router-dom";

export default function InstitutionList() {
  const { getInstitutions, institutionsCache, loading, errors } = useData();
  const [institutions, setInstitutions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadInstitutions = async () => {
      try {
        const data = await getInstitutions();
        setInstitutions(data || []);
      } catch (error) {
        console.error('Error loading institutions:', error);
      }
    };
    loadInstitutions();
  }, [getInstitutions]);

  // Update local state when cache changes
  useEffect(() => {
    if (institutionsCache) {
      setInstitutions(institutionsCache);
    }
  }, [institutionsCache]);

  const handleViewStudents = (institutionName) => {
    navigate(`/institution/${institutionName}/students`);
  };

  if (loading.institutions) {
    return <div className="institutionList"><p>Loading institutions...</p></div>;
  }

  if (errors.institutions) {
    return <div className="institutionList"><p>Error: {errors.institutions}</p></div>;
  }

  return (
    <div className="institutionList">
      <h1>All Institutions</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>School</th>
            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Institution</th>
            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Principal</th>
            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Phone</th>
            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>District</th>
            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>City</th>
            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Address</th>
            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {institutions.map((institution, index) => (
            <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>{institution.school}</td>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>{institution.institution}</td>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>{institution.principal}</td>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>{institution.phone}</td>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>{institution.district}</td>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>{institution.city}</td>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>{institution.address}</td>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                <button 
                  onClick={() => handleViewStudents(institution.institution)}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  View Students
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p style={{ marginTop: '20px', color: '#666' }}>Total Institutions: {institutions.length}</p>
    </div>
  );
}