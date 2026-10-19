import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Project, NotificationItem, ChatMessage, ContactInquiry, PageView, Language } from '../types';
import { INITIAL_PROJECTS, INITIAL_NOTIFICATIONS, PROFILE_INFO } from '../data/initialData';

interface LightboxState {
  url: string;
  caption?: string;
}

interface ToastState {
  message: string;
  type: 'success' | 'error' | 'info';
}

interface AppContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  language: Language;
  toggleLanguage: () => void;
  currentPage: PageView;
  setCurrentPage: (page: PageView) => void;
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  projects: Project[];
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  resetProjects: () => void;
  notifications: NotificationItem[];
  unreadNotificationsCount: number;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  notificationsOpen: boolean;
  setNotificationsOpen: (open: boolean) => void;
  sendPushTestNotification: () => void;
  chatOpen: boolean;
  setChatOpen: (open: boolean) => void;
  chatMessages: ChatMessage[];
  sendChatMessage: (text: string) => void;
  contactInquiries: ContactInquiry[];
  submitContactInquiry: (inquiry: { name: string; email: string; subject?: string; message: string }) => void;
  cookieConsentAccepted: boolean;
  setCookieConsentAccepted: (val: boolean) => void;
  cookieConsentVisible: boolean;
  setCookieConsentVisible: (val: boolean) => void;
  lightbox: LightboxState | null;
  openLightbox: (url: string, caption?: string) => void;
  closeLightbox: () => void;
  isAdminAuthenticated: boolean;
  loginAdmin: (pass: string) => boolean;
  logoutAdmin: () => void;
  toast: ToastState | null;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
      root.setAttribute('data-theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
      root.setAttribute('data-theme', 'light');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Language state
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('language') as Language) || 'en';
  });

  const toggleLanguage = () => {
    setLanguage(prev => {
      const next = prev === 'en' ? 'bn' : 'en';
      localStorage.setItem('language', next);
      return next;
    });
  };

  // Page routing
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  // Projects store
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('portfolio_projects');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse projects', e);
      }
    }
    return INITIAL_PROJECTS;
  });

  useEffect(() => {
    localStorage.setItem('portfolio_projects', JSON.stringify(projects));
  }, [projects]);

  const addProject = (projectData: Omit<Project, 'id'>) => {
    const id = projectData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '') || `proj-${Date.now()}`;
    const newProject: Project = { ...projectData, id, publishedDate: 'Just now' };
    setProjects(prev => [newProject, ...prev]);

    // Also trigger notification
    const newNotification: NotificationItem = {
      id: String(Date.now()),
      title: `New project: ${newProject.title}`,
      description: newProject.description,
      timeAgo: 'Just now',
      projectId: id,
      read: false,
      type: 'project'
    };
    setNotifications(prev => [newNotification, ...prev]);
    showToast(`Project "${newProject.title}" published!`, 'success');
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects(prev => prev.map(p => (p.id === id ? { ...p, ...updates } : p)));
    showToast('Project updated successfully.', 'success');
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    showToast('Project deleted.', 'info');
  };

  const resetProjects = () => {
    setProjects(INITIAL_PROJECTS);
    localStorage.setItem('portfolio_projects', JSON.stringify(INITIAL_PROJECTS));
    showToast('Sample projects restored.', 'info');
  };

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('portfolio_notifications');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_NOTIFICATIONS;
  });

  useEffect(() => {
    localStorage.setItem('portfolio_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('All notifications marked as read', 'info');
  };

  const sendPushTestNotification = () => {
    const randomProject = projects[Math.floor(Math.random() * projects.length)] || INITIAL_PROJECTS[0];
    const newNotif: NotificationItem = {
      id: String(Date.now()),
      title: `Update: ${randomProject.title}`,
      description: 'System specifications and live demo environment updated.',
      timeAgo: 'Just now',
      projectId: randomProject.id,
      read: false,
      type: 'project'
    };
    setNotifications(prev => [newNotif, ...prev]);
    showToast(`Test push: ${newNotif.title}`, 'success');
  };

  // Live Chat
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('portfolio_chat');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [
      {
        id: '1',
        sender: 'admin',
        text: `Hi! Welcome to ${PROFILE_INFO.name}'s digital space. Feel free to ask about any project, request client work, or drop a message!`,
        timestamp: 'Just now'
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('portfolio_chat', JSON.stringify(chatMessages));
  }, [chatMessages]);

  const sendChatMessage = (text: string) => {
    const userMsg: ChatMessage = {
      id: String(Date.now()),
      sender: 'user',
      text,
      timestamp: 'Just now'
    };
    setChatMessages(prev => [...prev, userMsg]);

    // Simulate friendly automatic developer reply
    setTimeout(() => {
      const lower = text.toLowerCase();
      let replyText = "Thanks for the message! I've logged this in my inbox. For urgent questions, email me directly at " + PROFILE_INFO.email;
      if (lower.includes('hire') || lower.includes('work') || lower.includes('cost') || lower.includes('rate')) {
        replyText = "I'm currently available for thoughtful collaborations and client projects! Check out the Contact tab to send details, or reach out at " + PROFILE_INFO.email;
      } else if (lower.includes('project') || lower.includes('laravel') || lower.includes('react')) {
        replyText = "All project architectures (Laravel, React, POS, E-commerce) are detailed in the Projects section with source code links.";
      }
      const adminReply: ChatMessage = {
        id: String(Date.now() + 1),
        sender: 'admin',
        text: replyText,
        timestamp: 'Just now'
      };
      setChatMessages(prev => [...prev, adminReply]);
    }, 1000);
  };

  // Contact Inquiries
  const [contactInquiries, setContactInquiries] = useState<ContactInquiry[]>(() => {
    const saved = localStorage.getItem('portfolio_inquiries');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('portfolio_inquiries', JSON.stringify(contactInquiries));
  }, [contactInquiries]);

  const submitContactInquiry = (inquiry: { name: string; email: string; subject?: string; message: string }) => {
    const newInquiry: ContactInquiry = {
      id: String(Date.now()),
      ...inquiry,
      createdAt: new Date().toLocaleString(),
      status: 'unread'
    };
    setContactInquiries(prev => [newInquiry, ...prev]);
    showToast('Your message has been sent successfully!', 'success');
  };

  // Cookie Consent
  const [cookieConsentAccepted, setCookieConsentAccepted] = useState(() => {
    return localStorage.getItem('cookie_consent') === 'true';
  });
  const [cookieConsentVisible, setCookieConsentVisible] = useState(() => {
    return localStorage.getItem('cookie_consent') === null;
  });

  // Lightbox
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);
  const openLightbox = (url: string, caption?: string) => setLightbox({ url, caption });
  const closeLightbox = () => setLightbox(null);

  // Admin auth (Password 2448766 from original admin.js)
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return sessionStorage.getItem('admin_auth') === '1';
  });

  const loginAdmin = (pass: string) => {
    // Password '2448766' is from the original project's admin.js
    if (pass === '2448766' || pass === 'admin123') {
      sessionStorage.setItem('admin_auth', '1');
      setIsAdminAuthenticated(true);
      showToast('Admin logged in successfully', 'success');
      return true;
    }
    showToast('Invalid password', 'error');
    return false;
  };

  const logoutAdmin = () => {
    sessionStorage.removeItem('admin_auth');
    setIsAdminAuthenticated(false);
    showToast('Logged out of admin', 'info');
  };

  // Toast
  const [toast, setToast] = useState<ToastState | null>(null);
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        language,
        toggleLanguage,
        currentPage,
        setCurrentPage,
        selectedProject,
        setSelectedProject,
        searchOpen,
        setSearchOpen,
        projects,
        addProject,
        updateProject,
        deleteProject,
        resetProjects,
        notifications,
        unreadNotificationsCount,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        notificationsOpen,
        setNotificationsOpen,
        sendPushTestNotification,
        chatOpen,
        setChatOpen,
        chatMessages,
        sendChatMessage,
        contactInquiries,
        submitContactInquiry,
        cookieConsentAccepted,
        setCookieConsentAccepted,
        cookieConsentVisible,
        setCookieConsentVisible,
        lightbox,
        openLightbox,
        closeLightbox,
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
        toast,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
