import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useData } from "../context/DataContext";

export default function InstitutionStudents() {
  const { institutionName } = useParams();
  const navigate = useNavigate();
  const { getInstitutionStudents, institutionStudentsCache, loading, errors } = useData();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    if (!institutionName) {
      return;
    }

    const loadStudents = async () => {
      try {
        const data = await getInstitutionStudents(institutionName);
        setStudents(data || []);
      } catch (error) {
        console.error('Error loading institution students:', error);
      }
    };
    loadStudents();
  }, [institutionName, getInstitutionStudents]);

  // Update local state when cache changes
  useEffect(() => {
    if (institutionName && institutionStudentsCache[institutionName]) {
      setStudents(institutionStudentsCache[institutionName]);
    }
  }, [institutionName, institutionStudentsCache]);

  const loadingKey = `institution-${institutionName}`;

  if (loading[loadingKey]) {
    return <div className="institution-students"><p>Loading students...</p></div>;
  }

  if (errors[loadingKey]) {
    return <div className="institution-students"><p>Error: {errors[loadingKey]}</p></div>;
  }

  return (
    <div className="institution-students">
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={() => navigate('/institutions')}
          style={{
            padding: '8px 16px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginBottom: '20px'
          }}
        >
          ← Back to Institutions
        </button>
      </div>
      <h1>Students at {institutionName} Institution</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>ID</th>
            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>First Name</th>
            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Last Name</th>
            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Email</th>
            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Gender</th>
            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Date of Birth</th>
            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Grade</th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ padding: '20px', textAlign: 'center', border: '1px solid #ddd' }}>
                No students found for this institution
              </td>
            </tr>
          ) : (
            students.map((student) => (
              <tr key={student.id} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>{student.id}</td>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>{student.first_name}</td>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>{student.last_name}</td>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>{student.primary_guardian_email}</td>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>{student.gender}</td>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>{student.dob}</td>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>{student.grade}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <p style={{ marginTop: '20px', color: '#666' }}>Total Students: {students.length}</p>
    </div>
  );
}

