import React, { createContext, useContext, useState, useCallback } from 'react';
import { fetchStudents, fetchInstitutionList, fetchInstitutionStudents } from '../apiCalls';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  // In-memory cache (not stored in localStorage/sessionStorage for security)
  const [studentsCache, setStudentsCache] = useState(null);
  const [institutionsCache, setInstitutionsCache] = useState(null);
  const [institutionStudentsCache, setInstitutionStudentsCache] = useState({});
  const [loading, setLoading] = useState({});
  const [errors, setErrors] = useState({});

  const getStudents = useCallback(async (forceRefresh = false) => {
    if (studentsCache && !forceRefresh) {
      return studentsCache;
    }

    const key = 'students';
    if (loading[key]) {
      return studentsCache;
    }

    setLoading(prev => ({ ...prev, [key]: true }));
    setErrors(prev => ({ ...prev, [key]: null }));

    try {
      const data = await fetchStudents();
      setStudentsCache(data);
      return data;
    } catch (error) {
      setErrors(prev => ({ ...prev, [key]: error.message }));
      throw error;
    } finally {
      setLoading(prev => ({ ...prev, [key]: false }));
    }
  }, [studentsCache, loading]);

  const getInstitutions = useCallback(async (forceRefresh = false) => {
    if (institutionsCache && !forceRefresh) {
      return institutionsCache;
    }

    const key = 'institutions';
    if (loading[key]) {
      return institutionsCache;
    }

    setLoading(prev => ({ ...prev, [key]: true }));
    setErrors(prev => ({ ...prev, [key]: null }));

    try {
      const data = await fetchInstitutionList();
      setInstitutionsCache(data);
      return data;
    } catch (error) {
      setErrors(prev => ({ ...prev, [key]: error.message }));
      throw error;
    } finally {
      setLoading(prev => ({ ...prev, [key]: false }));
    }
  }, [institutionsCache, loading]);

  const getInstitutionStudents = useCallback(async (institutionName, forceRefresh = false) => {
    if (institutionStudentsCache[institutionName] && !forceRefresh) {
      return institutionStudentsCache[institutionName];
    }

    const key = `institution-${institutionName}`;
    if (loading[key]) {
      return institutionStudentsCache[institutionName] || null;
    }

    setLoading(prev => ({ ...prev, [key]: true }));
    setErrors(prev => ({ ...prev, [key]: null }));

    try {
      const data = await fetchInstitutionStudents(institutionName);
      setInstitutionStudentsCache(prev => ({
        ...prev,
        [institutionName]: data
      }));
      return data;
    } catch (error) {
      setErrors(prev => ({ ...prev, [key]: error.message }));
      throw error;
    } finally {
      setLoading(prev => ({ ...prev, [key]: false }));
    }
  }, [institutionStudentsCache, loading]);

  const value = {
    studentsCache,
    institutionsCache,
    institutionStudentsCache,
    loading,
    errors,
    getStudents,
    getInstitutions,
    getInstitutionStudents,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

