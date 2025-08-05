import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

type DashboardTab = 'overview' | 'sent100' | 'sentedit' | 'validation' | 'tests' | 'troubleshoot' | 'users' | 'activity' | 'data' | 'reports' | 'integrations' | 'ai' | 'security' | 'settings';

interface DashboardStats {
  totalDeclarations: number;
  pendingDeclarations: number;
  approvedDeclarations: number;
  rejectedDeclarations: number;
  activeUsers: number;
  systemHealth: 'excellent' | 'good' | 'warning' | 'critical';
  lastSync: string;
  aiPredictions: number;
  securityAlerts: number;
}

export const EnhancedDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const { user } = useAuth();

  // Mock data
  const stats: DashboardStats = {
    totalDeclarations: 1247,
    pendingDeclarations: 23,
    approvedDeclarations: 1189,
    rejectedDeclarations: 35,
    activeUsers: 12,
    systemHealth: 'excellent',
    lastSync: '2024-01-15T10:30:00Z',
    aiPredictions: 156,
    securityAlerts: 2
  };

  const navigationTabs = [
    { id: 'overview', label: 'Przegląd', icon: '📊' },
    { id: 'sent100', label: 'SENT 100', icon: '📋' },
    { id: 'sentedit', label: 'SENT Edit', icon: '✏️' },
    { id: 'validation', label: 'Walidacja', icon: '✅' },
    { id: 'tests', label: 'Testy', icon: '🧪' },
    { id: 'troubleshoot', label: 'Diagnostyka', icon: '🔧' },
    { id: 'users', label: 'Użytkownicy', icon: '👥' },
    { id: 'activity', label: 'Aktywność', icon: '📈' },
    { id: 'data', label: 'Dane', icon: '🗄️' },
    { id: 'reports', label: 'Raporty', icon: '📊' },
    { id: 'integrations', label: 'Integracje', icon: '🔗' },
    { id: 'ai', label: 'AI', icon: '🤖' },
    { id: 'security', label: 'Bezpieczeństwo', icon: '🛡️' },
    { id: 'settings', label: 'Ustawienia', icon: '⚙️' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'sent100':
        return <Sent100Tab />;
      case 'sentedit':
        return <SentEditTab />;
      case 'validation':
        return <ValidationTab />;
      case 'tests':
        return <TestsTab />;
      case 'troubleshoot':
        return <TroubleshootTab />;
      case 'users':
        return <div>Zarządzanie użytkownikami</div>;
      case 'activity':
        return <ActivityTab />;
      case 'data':
        return <div>Zarządzanie danymi</div>;
      case 'reports':
        return <div>Raporty i analityka</div>;
      case 'integrations':
        return <div>Integracje zewnętrzne</div>;
      case 'ai':
        return <div>Sztuczna inteligencja</div>;
      case 'security':
        return <div>Bezpieczeństwo</div>;
      case 'settings':
        return <SettingsTab />;
      default:
        return <OverviewTab stats={stats} setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">Q</span>
                </div>
              </div>
              <div className="ml-4">
                <h1 className="text-xl font-semibold text-gray-900">QuickSent Dashboard</h1>
                <p className="text-sm text-gray-600">System zarządzania deklaracjami SENT</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {user && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-700">{user?.firstName} {user?.lastName}</span>
                  <button className="text-sm text-gray-500 hover:text-gray-700">
                    Wyloguj
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {navigationTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as DashboardTab)}
                className={`
                  py-4 px-1 border-b-2 font-medium text-sm
                  ${activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderTabContent()}
      </div>
    </div>
  );
};

const OverviewTab: React.FC<{ stats: DashboardStats; setActiveTab: (tab: DashboardTab) => void }> = ({ stats, setActiveTab }) => {
  const quickActions = [
    { label: 'Nowa deklaracja SENT 100', action: () => setActiveTab('sent100'), icon: '📋' },
    { label: 'Edytuj deklarację', action: () => setActiveTab('sentedit'), icon: '✏️' },
    { label: 'Waliduj dane', action: () => setActiveTab('validation'), icon: '✅' },
    { label: 'Uruchom testy', action: () => setActiveTab('tests'), icon: '🧪' },
    { label: 'Diagnostyka', action: () => setActiveTab('troubleshoot'), icon: '🔧' },
    { label: 'Zarządzaj użytkownikami', action: () => setActiveTab('users'), icon: '👥' }
  ];

  return (
    <div className="space-y-6">
      {/* Statystyki główne */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Wszystkie deklaracje</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalDeclarations}</p>
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📋</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Oczekujące</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.pendingDeclarations}</p>
            </div>
            <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">⏳</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Zatwierdzone</p>
              <p className="text-2xl font-bold text-green-600">{stats.approvedDeclarations}</p>
            </div>
            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">✅</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Odrzucone</p>
              <p className="text-2xl font-bold text-red-600">{stats.rejectedDeclarations}</p>
            </div>
            <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">❌</span>
            </div>
          </div>
        </div>
      </div>

      {/* Szybkie akcje */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="pb-4">
          <h3 className="text-lg font-semibold text-gray-900">Szybkie akcje</h3>
          <p className="text-sm text-gray-600 mt-1">Najczęściej używane funkcje systemu</p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              className="w-full h-20 flex flex-col items-center justify-center space-y-2 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400 rounded-md transition-colors"
            >
              <span className="text-2xl">{action.icon}</span>
              <span className="text-sm font-medium">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Status systemu */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="pb-4">
            <h3 className="text-lg font-semibold text-gray-900">Status systemu</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Zdrowie systemu</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                {stats.systemHealth === 'excellent' ? 'Doskonałe' : 'Dobre'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Aktywni użytkownicy</span>
              <span className="text-sm font-medium">{stats.activeUsers}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Ostatnia synchronizacja</span>
              <span className="text-sm font-medium">{new Date(stats.lastSync).toLocaleString('pl-PL')}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="pb-4">
            <h3 className="text-lg font-semibold text-gray-900">AI & Bezpieczeństwo</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Przewidywania AI</span>
              <span className="text-sm font-medium">{stats.aiPredictions}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Alerty bezpieczeństwa</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-red-100 text-red-800">
                {stats.securityAlerts}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Sent100Tab: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="pb-4">
          <h3 className="text-lg font-semibold text-gray-900">Deklaracja SENT 100</h3>
          <p className="text-sm text-gray-600 mt-1">Tworzenie nowej deklaracji SENT 100</p>
        </div>
        <div className="space-y-4">
          <p className="text-gray-600">
            Moduł do tworzenia i zarządzania deklaracjami SENT 100.
          </p>
          <button className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md">
            Nowa deklaracja SENT 100
          </button>
        </div>
      </div>
    </div>
  );
};

const SentEditTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="pb-4">
          <h3 className="text-lg font-semibold text-gray-900">Edytor SENT</h3>
          <p className="text-sm text-gray-600 mt-1">Edycja istniejących deklaracji SENT</p>
        </div>
        <div className="space-y-4">
          <p className="text-gray-600">
            Moduł do edycji i modyfikacji deklaracji SENT.
          </p>
          <button className="bg-gray-100 text-gray-900 hover:bg-gray-200 px-4 py-2 rounded-md">
            Wybierz deklarację do edycji
          </button>
        </div>
      </div>
    </div>
  );
};

const ValidationTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="pb-4">
          <h3 className="text-lg font-semibold text-gray-900">Walidacja danych</h3>
          <p className="text-sm text-gray-600 mt-1">Sprawdzanie poprawności deklaracji SENT</p>
        </div>
        <div className="space-y-4">
          <p className="text-gray-600">
            Moduł do walidacji i sprawdzania poprawności deklaracji SENT.
          </p>
          <div className="flex space-x-2">
            <button className="bg-green-600 text-white hover:bg-green-700 px-4 py-2 rounded-md">
              Uruchom walidację
            </button>
            <button className="border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-md">
              Sprawdź reguły
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const TestsTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="pb-4">
          <h3 className="text-lg font-semibold text-gray-900">Testy systemu</h3>
          <p className="text-sm text-gray-600 mt-1">Uruchamianie testów funkcjonalnych</p>
        </div>
        <div className="space-y-4">
          <p className="text-gray-600">
            Moduł do uruchamiania i zarządzania testami systemu.
          </p>
          <div className="flex space-x-2">
            <button className="bg-yellow-600 text-white hover:bg-yellow-700 px-4 py-2 rounded-md">
              Uruchom testy
            </button>
            <button className="border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-md">
              Historia testów
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const TroubleshootTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="pb-4">
          <h3 className="text-lg font-semibold text-gray-900">Diagnostyka systemu</h3>
          <p className="text-sm text-gray-600 mt-1">Narzędzia diagnostyczne i rozwiązywanie problemów</p>
        </div>
        <div className="space-y-4">
          <p className="text-gray-600">
            Moduł do diagnostyki i rozwiązywania problemów systemu.
          </p>
          <div className="flex space-x-2">
            <button className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md">
              Uruchom diagnostykę
            </button>
            <button className="border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-md">
              Logi systemowe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ActivityTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="pb-4">
          <h3 className="text-lg font-semibold text-gray-900">Aktywność systemu</h3>
          <p className="text-sm text-gray-600 mt-1">Monitorowanie aktywności użytkowników i systemu</p>
        </div>
        <div className="space-y-4">
          <p className="text-gray-600">
            Moduł do monitorowania aktywności użytkowników i systemu.
          </p>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Ostatnie aktywności:</p>
            <ul className="mt-2 space-y-1 text-sm">
              <li>• Użytkownik Jan Kowalski utworzył deklarację SENT 100</li>
              <li>• System zsynchronizował dane z PUESC</li>
              <li>• Walidacja deklaracji #1234 zakończona pomyślnie</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const SettingsTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="pb-4">
          <h3 className="text-lg font-semibold text-gray-900">Ustawienia systemu</h3>
          <p className="text-sm text-gray-600 mt-1">Konfiguracja aplikacji QuickSent</p>
        </div>
        <div className="space-y-4">
          <p className="text-gray-600">Panel ustawień systemu będzie dostępny wkrótce.</p>
        </div>
      </div>
    </div>
  );
}; 