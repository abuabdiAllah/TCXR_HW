import React, { useEffect, useState, useRef } from "react";
import { useData } from "../context/DataContext";
import Plotly from 'plotly.js-dist-min';

export default function Dashboard() {
  const { getStudents, getInstitutions, studentsCache, institutionsCache } = useData();
  const [students, setStudents] = useState([]);
  const [institutions, setInstitutions] = useState([]);
  const studentsPerInstitutionRef = useRef(null);
  const genderDistributionRef = useRef(null);
  const gradeDistributionRef = useRef(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const studentsData = await getStudents();
        const institutionsData = await getInstitutions();
        setStudents(studentsData || []);
        setInstitutions(institutionsData || []);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      }
    };
    loadData();
  }, [getStudents, getInstitutions]);

  // Update local state when cache changes
  useEffect(() => {
    if (studentsCache) {
      setStudents(studentsCache);
    }
  }, [studentsCache]);

  useEffect(() => {
    if (institutionsCache) {
      setInstitutions(institutionsCache);
    }
  }, [institutionsCache]);

  // Create Students per Institution chart
  useEffect(() => {
    if (students.length === 0 || institutions.length === 0) return;

    const institutionCounts = {};
    students.forEach(student => {
      const inst = student.institution || 'Unknown';
      institutionCounts[inst] = (institutionCounts[inst] || 0) + 1;
    });

    const institutionNames = Object.keys(institutionCounts);
    const studentCounts = institutionNames.map(name => institutionCounts[name]);

    const data = [{
      x: institutionNames,
      y: studentCounts,
      type: 'bar',
      marker: {
        color: 'rgb(55, 83, 109)'
      }
    }];

    const layout = {
      title: 'Students per Institution',
      xaxis: { title: 'Institution' },
      yaxis: { title: 'Number of Students' },
      margin: { l: 50, r: 50, t: 50, b: 50 }
    };

    Plotly.newPlot(studentsPerInstitutionRef.current, data, layout, { responsive: true });
  }, [students, institutions]);

  // Create Gender Distribution chart
  useEffect(() => {
    if (students.length === 0) return;

    const genderCounts = {};
    students.forEach(student => {
      const gender = student.gender || 'Unknown';
      genderCounts[gender] = (genderCounts[gender] || 0) + 1;
    });

    const genders = Object.keys(genderCounts);
    const counts = genders.map(gender => genderCounts[gender]);

    const data = [{
      labels: genders,
      values: counts,
      type: 'pie',
      marker: {
        colors: ['#FF6384', '#36A2EB', '#FFCE56']
      }
    }];

    const layout = {
      title: 'Gender Distribution',
      margin: { l: 50, r: 50, t: 50, b: 50 }
    };

    Plotly.newPlot(genderDistributionRef.current, data, layout, { responsive: true });
  }, [students]);

  // Create Grade Distribution chart
  useEffect(() => {
    if (students.length === 0) return;

    const gradeCounts = {};
    students.forEach(student => {
      const grade = student.grade || 'Unknown';
      gradeCounts[grade] = (gradeCounts[grade] || 0) + 1;
    });

    const grades = Object.keys(gradeCounts).sort();
    const counts = grades.map(grade => gradeCounts[grade]);

    const data = [{
      x: grades,
      y: counts,
      type: 'bar',
      marker: {
        color: 'rgb(75, 192, 192)'
      }
    }];

    const layout = {
      title: 'Grade Distribution',
      xaxis: { title: 'Grade' },
      yaxis: { title: 'Number of Students' },
      margin: { l: 50, r: 50, t: 50, b: 50 }
    };

    Plotly.newPlot(gradeDistributionRef.current, data, layout, { responsive: true });
  }, [students]);

  return (
    <div className="dashboard" style={{ padding: '20px' }}>
      <h1>Admin Dashboard</h1>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', 
        gap: '30px',
        marginTop: '30px'
      }}>
        <div>
          <div ref={studentsPerInstitutionRef} style={{ width: '100%', height: '400px' }}></div>
        </div>
        
        <div>
          <div ref={genderDistributionRef} style={{ width: '100%', height: '400px' }}></div>
        </div>
        
        <div style={{ gridColumn: '1 / -1' }}>
          <div ref={gradeDistributionRef} style={{ width: '100%', height: '400px' }}></div>
        </div>
      </div>

      <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
        <h2>Summary Statistics</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '20px' }}>
          <div>
            <h3 style={{ margin: '0', color: '#666' }}>Total Students</h3>
            <p style={{ fontSize: '2em', margin: '10px 0', fontWeight: 'bold' }}>{students.length}</p>
          </div>
          <div>
            <h3 style={{ margin: '0', color: '#666' }}>Total Institutions</h3>
            <p style={{ fontSize: '2em', margin: '10px 0', fontWeight: 'bold' }}>{institutions.length}</p>
          </div>
          <div>
            <h3 style={{ margin: '0', color: '#666' }}>Average Students per Institution</h3>
            <p style={{ fontSize: '2em', margin: '10px 0', fontWeight: 'bold' }}>
              {institutions.length > 0 ? Math.round(students.length / institutions.length) : 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

