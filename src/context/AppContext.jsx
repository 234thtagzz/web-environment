/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // UI States
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // System Modal State
  const [modal, setModal] = useState({
    isOpen: false,
    title: 'Notifikasi',
    message: '',
    type: 'info', // 'success' | 'error' | 'info'
  });

  // IoT Simulation State
  const [isSimulating, setIsSimulating] = useState(true);

  // Theme Toggler effect
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  
  const showModal = (title, message, type = 'info') => {
    setModal({ isOpen: true, title, message, type });
  };

  const closeModal = () => {
    setModal((prev) => ({ ...prev, isOpen: false }));
  };

  const login = (email, role = 'User') => {
    setIsAuthenticated(true);
    setUser({
      email,
      company: 'PT Jaya Abadi Tbk',
      id: 'UMS-JA-2026',
      role,
    });
    showModal('Sukses Masuk', 'Selamat datang kembali di ekosistem EnviroChain!', 'success');
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setActiveTab('dashboard');
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        user,
        isDarkMode,
        activeTab,
        isMobileSidebarOpen,
        modal,
        isSimulating,
        toggleTheme,
        setActiveTab,
        setIsMobileSidebarOpen,
        showModal,
        closeModal,
        setIsSimulating,
        login,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};