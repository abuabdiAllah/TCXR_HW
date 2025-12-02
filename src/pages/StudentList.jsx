import React, { useEffect, useState } from "react";
import { useData } from "../context/DataContext";

export default function StudentList() {
  const { getStudents, studentsCache, loading, errors } = useData();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const loadStudents = async () => {
      try {
        const data = await getStudents();
        setStudents(data || []);
      } catch (error) {
        console.error('Error loading students:', error);
      }
    };
    loadStudents();
  }, [getStudents]);

  // Update local state when cache changes
  useEffect(() => {
    if (studentsCache) {
      setStudents(studentsCache);
    }
  }, [studentsCache]);

  if (loading.students) {
    return <div className="student-list"><p>Loading students...</p></div>;
  }

  if (errors.students) {
    return <div className="student-list"><p>Error: {errors.students}</p></div>;
  }

  return (
    <div className="student-list">
      <h1>All Students</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>ID</th>
            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>First Name</th>
            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Last Name</th>
            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Email</th>
            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Gender</th>
            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Date of Birth</th>
            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Institution</th>
            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Grade</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>{student.id}</td>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>{student.first_name}</td>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>{student.last_name}</td>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>{student.primary_guardian_email}</td>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>{student.gender}</td>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>{student.dob}</td>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>{student.institution}</td>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>{student.grade}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p style={{ marginTop: '20px', color: '#666' }}>Total Students: {students.length}</p>
    </div>
  );
}