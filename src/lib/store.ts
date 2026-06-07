import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserProfile, JobApplication, Reward, CareerEvent, TrainingProgram } from './mock-data';
import { mockUserProfile, mockApplications, mockRewards, mockCareerEvents, mockTrainingPrograms } from './mock-data';

interface AppState {
  // User state
  user: UserProfile | null;
  isAuthenticated: boolean;
  userRole: 'jobseeker' | 'employer' | 'officer' | null;

  // Application state
  applications: JobApplication[];
  savedJobs: string[];

  // Events & Training
  registeredEvents: string[];
  enrolledTrainings: string[];

  // Rewards
  rewards: Reward[];

  // UI State
  sidebarOpen: boolean;
  chatbotOpen: boolean;
  aiPanelOpen: boolean;
  currentAiContext: any;

  // Notifications
  notifications: Notification[];
  unreadCount: number;

  // Actions
  login: (role: 'jobseeker' | 'employer' | 'officer') => void;
  logout: () => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
  saveJob: (jobId: string) => void;
  unsaveJob: (jobId: string) => void;
  applyToJob: (application: JobApplication) => void;
  updateApplicationStatus: (appId: string, status: JobApplication['status']) => void;
  registerForEvent: (eventId: string) => void;
  unregisterFromEvent: (eventId: string) => void;
  enrollInTraining: (trainingId: string) => void;
  unenrollFromTraining: (trainingId: string) => void;
  claimReward: (rewardId: string) => void;
  useReward: (rewardId: string) => void;
  toggleSidebar: () => void;
  toggleChatbot: () => void;
  toggleAiPanel: (context?: any) => void;
  addNotification: (notification: Notification) => void;
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;
}

interface Notification {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  action?: {
    label: string;
    handler: () => void;
  };
}

const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      userRole: null,
      applications: [],
      savedJobs: [],
      registeredEvents: [],
      enrolledTrainings: [],
      rewards: [],
      sidebarOpen: true,
      chatbotOpen: false,
      aiPanelOpen: false,
      currentAiContext: null,
      notifications: [],
      unreadCount: 0,

      // Actions
      login: (role) => {
        // Set mock data based on role
        const mockData = {
          jobseeker: {
            user: mockUserProfile,
            applications: mockApplications,
            rewards: mockRewards,
            registeredEvents: ['event-001'],
            enrolledTrainings: ['training-001']
          },
          employer: {
            user: {
              ...mockUserProfile,
              role: 'employer' as const,
              name: 'Sarah Chen',
              email: 'sarah.chen@petronas.com'
            },
            applications: [],
            rewards: [],
            registeredEvents: [],
            enrolledTrainings: []
          },
          officer: {
            user: {
              ...mockUserProfile,
              role: 'officer' as const,
              name: 'Officer Tan',
              email: 'tan.officer@perkeso.gov.my'
            },
            applications: [],
            rewards: [],
            registeredEvents: [],
            enrolledTrainings: []
          }
        };

        const data = mockData[role];

        set({
          user: data.user,
          isAuthenticated: true,
          userRole: role,
          applications: data.applications,
          rewards: data.rewards,
          registeredEvents: data.registeredEvents,
          enrolledTrainings: data.enrolledTrainings
        });

        // Add welcome notification
        get().addNotification({
          id: Date.now().toString(),
          type: 'success',
          title: 'Welcome back!',
          message: `Logged in as ${data.user.name}`,
          timestamp: new Date(),
          read: false
        });
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          userRole: null,
          applications: [],
          savedJobs: [],
          registeredEvents: [],
          enrolledTrainings: [],
          rewards: [],
          notifications: []
        });
      },

      updateProfile: (profile) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...profile } : null
        }));

        get().addNotification({
          id: Date.now().toString(),
          type: 'success',
          title: 'Profile Updated',
          message: 'Your profile has been successfully updated',
          timestamp: new Date(),
          read: false
        });
      },

      saveJob: (jobId) => {
        set((state) => ({
          savedJobs: [...state.savedJobs, jobId]
        }));

        get().addNotification({
          id: Date.now().toString(),
          type: 'info',
          title: 'Job Saved',
          message: 'Job has been added to your saved list',
          timestamp: new Date(),
          read: false
        });
      },

      unsaveJob: (jobId) => {
        set((state) => ({
          savedJobs: state.savedJobs.filter(id => id !== jobId)
        }));
      },

      applyToJob: (application) => {
        set((state) => ({
          applications: [...state.applications, application]
        }));

        get().addNotification({
          id: Date.now().toString(),
          type: 'success',
          title: 'Application Submitted',
          message: `Successfully applied to ${application.job.title}`,
          timestamp: new Date(),
          read: false,
          action: {
            label: 'View Application',
            handler: () => {
              // Navigate to application
            }
          }
        });
      },

      updateApplicationStatus: (appId, status) => {
        set((state) => ({
          applications: state.applications.map(app =>
            app.id === appId ? { ...app, status } : app
          )
        }));

        const statusMessages = {
          'Reviewing': 'Your application is being reviewed',
          'Interview': 'Congratulations! You\'ve been invited for an interview',
          'KIV': 'Your application has been kept in view',
          'Offered': 'Congratulations! You\'ve received a job offer',
          'Rejected': 'Your application status has been updated'
        };

        get().addNotification({
          id: Date.now().toString(),
          type: status === 'Offered' ? 'success' : status === 'Interview' ? 'info' : 'info',
          title: 'Application Update',
          message: statusMessages[status] || 'Application status updated',
          timestamp: new Date(),
          read: false
        });
      },

      registerForEvent: (eventId) => {
        set((state) => ({
          registeredEvents: [...state.registeredEvents, eventId]
        }));

        // Find event name from mock data
        const event = mockCareerEvents.find(e => e.id === eventId);

        get().addNotification({
          id: Date.now().toString(),
          type: 'success',
          title: 'Event Registration',
          message: `Successfully registered for ${event?.title || 'event'}`,
          timestamp: new Date(),
          read: false
        });

        // Add a reward for event registration
        if (event?.type === 'Career Fair') {
          set((state) => ({
            rewards: [...state.rewards, {
              id: `reward-${Date.now()}`,
              title: 'Event Registration Bonus',
              description: 'Thank you for registering!',
              type: 'Transport',
              value: 10,
              expiryDate: event.date,
              code: `EVENT${Date.now()}`,
              isUsed: false,
              conditions: ['Valid on event day only']
            }]
          }));
        }
      },

      unregisterFromEvent: (eventId) => {
        set((state) => ({
          registeredEvents: state.registeredEvents.filter(id => id !== eventId)
        }));
      },

      enrollInTraining: (trainingId) => {
        set((state) => ({
          enrolledTrainings: [...state.enrolledTrainings, trainingId]
        }));

        const training = mockTrainingPrograms.find(t => t.id === trainingId);

        get().addNotification({
          id: Date.now().toString(),
          type: 'success',
          title: 'Training Enrollment',
          message: `Successfully enrolled in ${training?.title || 'training'}`,
          timestamp: new Date(),
          read: false
        });
      },

      unenrollFromTraining: (trainingId) => {
        set((state) => ({
          enrolledTrainings: state.enrolledTrainings.filter(id => id !== trainingId)
        }));
      },

      claimReward: (rewardId) => {
        const reward = mockRewards.find(r => r.id === rewardId);
        if (reward) {
          set((state) => ({
            rewards: [...state.rewards, reward]
          }));

          get().addNotification({
            id: Date.now().toString(),
            type: 'success',
            title: 'Reward Claimed',
            message: `${reward.title} has been added to your rewards`,
            timestamp: new Date(),
            read: false
          });
        }
      },

      useReward: (rewardId) => {
        set((state) => ({
          rewards: state.rewards.map(reward =>
            reward.id === rewardId ? { ...reward, isUsed: true } : reward
          )
        }));

        get().addNotification({
          id: Date.now().toString(),
          type: 'info',
          title: 'Reward Used',
          message: 'Your reward has been successfully redeemed',
          timestamp: new Date(),
          read: false
        });
      },

      toggleSidebar: () => {
        set((state) => ({ sidebarOpen: !state.sidebarOpen }));
      },

      toggleChatbot: () => {
        set((state) => ({ chatbotOpen: !state.chatbotOpen }));
      },

      toggleAiPanel: (context) => {
        set((state) => ({
          aiPanelOpen: context ? true : !state.aiPanelOpen,
          currentAiContext: context || state.currentAiContext
        }));
      },

      addNotification: (notification) => {
        set((state) => ({
          notifications: [notification, ...state.notifications],
          unreadCount: state.unreadCount + 1
        }));

        // Auto-remove notification after 5 seconds
        setTimeout(() => {
          set((state) => ({
            notifications: state.notifications.filter(n => n.id !== notification.id)
          }));
        }, 5000);
      },

      markNotificationRead: (id) => {
        set((state) => ({
          notifications: state.notifications.map(n =>
            n.id === id ? { ...n, read: true } : n
          ),
          unreadCount: Math.max(0, state.unreadCount - 1)
        }));
      },

      clearNotifications: () => {
        set({ notifications: [], unreadCount: 0 });
      }
    }),
    {
      name: 'myfuturejobs-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        userRole: state.userRole,
        savedJobs: state.savedJobs,
        registeredEvents: state.registeredEvents,
        enrolledTrainings: state.enrolledTrainings,
        applications: state.applications,
        rewards: state.rewards
      })
    }
  )
);

export default useStore;