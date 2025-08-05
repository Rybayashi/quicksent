import React, { useState } from 'react';
import { PuescIntegrationTest } from '../test/PuescIntegrationTest';
import { Sent100Form } from '../forms/Sent100Form';
import { SentEditForm } from '../forms/SentEditForm';
import { GusValidator } from '../validation/GusValidator';
import { ConnectionTroubleshooter } from '../test/ConnectionTroubleshooter';
import UserManagement from '../users/UserManagement';
import { UserActivityLog } from '../users/UserActivityLog';
import { DataManagement } from '../data-management/DataManagement';
import { ReportsAndAnalytics } from '../reports/ReportsAndAnalytics';
import { ExternalIntegrations } from '../integrations/ExternalIntegrations';
import { useAuth } from '../../contexts/AuthContext';

type DashboardTab = 'overview' | 'sent100' | 'sentedit' | 'validation' | 'tests' | 'troubleshoot' | 'users' | 'activity' | 'data' | 'reports' | 'integrations' | 'settings';

interface DashboardStats {
  totalDeclarations: number;
  pendingDeclarations: number;
  approvedDeclarations: number;
  rejectedDeclarations: number;
  lastDeclarationDate: string;
}

export const MainDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const { user, logout } = useAuth();
  
  const tabs = [
    { id: 'overview', name: 'Przegląd', icon: '📊', description: 'Podsumowanie i statystyki' },
    { id: 'sent100', name: 'SENT 100', icon: '📝', description: 'Nowa deklaracja' },
    { id: 'sentedit', name: 'SENT EDIT', icon: '✏️', description: 'Edycja deklaracji' },
    { id: 'validation', name: 'Walidacja GUS', icon: '🔍', description: 'Walidacja danych GUS' },
    { id: 'tests', name: 'Testy', icon: '🧪', description: 'Testy integracji PUESC' },
    { id: 'troubleshoot', name: 'Diagnostyka', icon: '🔧', description: 'Diagnostyka połączenia' },
    { id: 'users', name: 'Użytkownicy', icon: '👥', description: 'Zarządzanie użytkownikami', adminOnly: true },
    { id: 'activity', name: 'Aktywność', icon: '📈', description: 'Historia aktywności i audyt', adminOnly: true },
    { id: 'data', name: 'Dane', icon: '🗄️', description: 'Zarządzanie danymi podstawowymi' },
    { id: 'reports', name: 'Raporty', icon: '📊', description: 'Raporty i analizy' },
    { id: 'integrations', name: 'Integracje', icon: '🔗', description: 'Integracje zewnętrzne' },
    { id: 'settings', name: 'Ustawienia', icon: '⚙️', description: 'Konfiguracja systemu' },
  ];

  // Symulowane statystyki
  const stats: DashboardStats = {
    totalDeclarations: 156,
    pendingDeclarations: 12,
    approvedDeclarations: 134,
    rejectedDeclarations: 10,
    lastDeclarationDate: '2025-01-04 14:30',
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab stats={stats} setActiveTab={setActiveTab} />;
      case 'sent100':
        return <Sent100Form />;
      case 'sentedit':
        return <SentEditForm />;
      case 'validation':
        return <GusValidator />;
      case 'tests':
        return <PuescIntegrationTest />;
      case 'troubleshoot':
        return <ConnectionTroubleshooter />;
      case 'users':
        return user ? <UserManagement currentUser={user} /> : <div>Ładowanie...</div>;
      case 'activity':
        return <UserActivityLog showAuditTrail={true} />;
      case 'data':
        return <DataManagement />;
      case 'reports':
        return <ReportsAndAnalytics />;
      case 'integrations':
        return <ExternalIntegrations />;
      case 'settings':
        return <SettingsTab />;
      default:
        return <OverviewTab stats={stats} setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-gray-900">QuickSent</h1>
                <p className="text-sm text-gray-500">System deklaracji SENT</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                <span className="font-medium">{user?.company?.name || 'DB Schenker'}</span>
                <span className="mx-2">•</span>
                <span>{user ? `${user.firstName} ${user.lastName}` : 'Bartłomiej Rybacha'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={logout}
                  className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
                >
                  Wyloguj
                </button>
                <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}` : 'BR'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as DashboardTab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {renderTabContent()}
      </main>
    </div>
  );
};

// Komponenty zakładek
const OverviewTab: React.FC<{ stats: DashboardStats; setActiveTab: (tab: DashboardTab) => void }> = ({ stats, setActiveTab }) => {
  return (
    <div className="space-y-6">
      {/* Statystyki */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                  <span className="text-white text-sm font-medium">📊</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Wszystkie deklaracje</dt>
                  <dd className="text-lg font-medium text-gray-900">{stats.totalDeclarations}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                  <span className="text-white text-sm font-medium">⏳</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Oczekujące</dt>
                  <dd className="text-lg font-medium text-gray-900">{stats.pendingDeclarations}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                  <span className="text-white text-sm font-medium">✅</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Zatwierdzone</dt>
                  <dd className="text-lg font-medium text-gray-900">{stats.approvedDeclarations}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-red-500 rounded-md flex items-center justify-center">
                  <span className="text-white text-sm font-medium">❌</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Odrzucone</dt>
                  <dd className="text-lg font-medium text-gray-900">{stats.rejectedDeclarations}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Szybkie akcje */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Szybkie Akcje</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => setActiveTab('sent100')}
              className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-500 rounded-lg border border-gray-200 hover:border-primary-300 transition-colors"
            >
              <div>
                <span className="rounded-lg inline-flex p-3 bg-primary-50 text-primary-700 ring-4 ring-white">
                  📝
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium">
                  <span className="absolute inset-0" aria-hidden="true" />
                  Nowa Deklaracja SENT 100
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Utwórz nową deklarację transportową zgodnie z formatem PUESC
                </p>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('sentedit')}
              className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-500 rounded-lg border border-gray-200 hover:border-primary-300 transition-colors"
            >
              <div>
                <span className="rounded-lg inline-flex p-3 bg-yellow-50 text-yellow-700 ring-4 ring-white">
                  ✏️
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium">
                  <span className="absolute inset-0" aria-hidden="true" />
                  Edytuj Deklarację
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Wprowadź zmiany w istniejącej deklaracji SENT
                </p>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('validation')}
              className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-500 rounded-lg border border-gray-200 hover:border-primary-300 transition-colors"
            >
              <div>
                <span className="rounded-lg inline-flex p-3 bg-purple-50 text-purple-700 ring-4 ring-white">
                  🔍
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium">
                  <span className="absolute inset-0" aria-hidden="true" />
                  Walidacja GUS
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Sprawdź dane w rejestrze GUS
                </p>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('tests')}
              className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-500 rounded-lg border border-gray-200 hover:border-primary-300 transition-colors"
            >
              <div>
                <span className="rounded-lg inline-flex p-3 bg-blue-50 text-blue-700 ring-4 ring-white">
                  🧪
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium">
                  <span className="absolute inset-0" aria-hidden="true" />
                  Testy Integracji
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Sprawdź połączenie z systemem PUESC
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Ostatnia aktywność */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Ostatnia Aktywność</h3>
          <div className="flow-root">
            <ul className="-mb-8">
              <li>
                <div className="relative pb-8">
                  <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                  <div className="relative flex space-x-3">
                    <div>
                      <span className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center ring-8 ring-white">
                        <span className="text-white text-sm font-medium">✓</span>
                      </span>
                    </div>
                    <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                      <div>
                        <p className="text-sm text-gray-500">
                          Deklaracja <span className="font-medium text-gray-900">QS_1736012345</span> została zatwierdzona
                        </p>
                      </div>
                      <div className="text-right text-sm whitespace-nowrap text-gray-500">
                        <time dateTime="2025-01-04T14:30:00">2 godziny temu</time>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="relative pb-8">
                  <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                  <div className="relative flex space-x-3">
                    <div>
                      <span className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center ring-8 ring-white">
                        <span className="text-white text-sm font-medium">📝</span>
                      </span>
                    </div>
                    <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                      <div>
                        <p className="text-sm text-gray-500">
                          Utworzono nową deklarację <span className="font-medium text-gray-900">QS_1736012346</span>
                        </p>
                      </div>
                      <div className="text-right text-sm whitespace-nowrap text-gray-500">
                        <time dateTime="2025-01-04T12:15:00">4 godziny temu</time>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="relative">
                  <div className="relative flex space-x-3">
                    <div>
                      <span className="h-8 w-8 rounded-full bg-yellow-500 flex items-center justify-center ring-8 ring-white">
                        <span className="text-white text-sm font-medium">✏️</span>
                      </span>
                    </div>
                    <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                      <div>
                        <p className="text-sm text-gray-500">
                          Wniosek o edycję deklaracji <span className="font-medium text-gray-900">QS_1736012340</span>
                        </p>
                      </div>
                      <div className="text-right text-sm whitespace-nowrap text-gray-500">
                        <time dateTime="2025-01-04T10:45:00">6 godzin temu</time>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const SettingsTab: React.FC = () => {
  const [autoSave, setAutoSave] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">Ustawienia Systemu</h2>
        
        <div className="space-y-6">
          {/* Konfiguracja PUESC */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Konfiguracja PUESC</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Środowisko</label>
                <select className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
                  <option value="test">Test (test.puesc.gov.pl)</option>
                  <option value="production">Produkcja (puesc.gov.pl)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">API Key</label>
                <input type="password" className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" placeholder="••••••••••••••••" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Timeout (ms)</label>
                <input type="number" className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" defaultValue="30000" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Retry Attempts</label>
                <input type="number" className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" defaultValue="3" />
              </div>
            </div>
          </div>

          {/* Konfiguracja GUS */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Konfiguracja GUS</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">GUS API URL</label>
                <input type="url" className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" defaultValue="https://api.gus.gov.pl" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">API Key</label>
                <input type="password" className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" placeholder="••••••••••••••••" />
              </div>
            </div>
          </div>

          {/* Ustawienia aplikacji */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Ustawienia Aplikacji</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Automatyczne zapisywanie</h4>
                  <p className="text-sm text-gray-500">Zapisz dane automatycznie co 30 sekund</p>
                </div>
                <button 
                  onClick={() => setAutoSave(!autoSave)}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${autoSave ? 'bg-primary-600' : 'bg-gray-200'}`}
                >
                  <span className={`${autoSave ? 'translate-x-5' : 'translate-x-0'} inline-block h-5 w-5 transform rounded-full bg-white transition duration-200 ease-in-out`} />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Powiadomienia email</h4>
                  <p className="text-sm text-gray-500">Otrzymuj powiadomienia o statusie deklaracji</p>
                </div>
                <button 
                  onClick={() => setEmailNotifications(!emailNotifications)}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${emailNotifications ? 'bg-primary-600' : 'bg-gray-200'}`}
                >
                  <span className={`${emailNotifications ? 'translate-x-5' : 'translate-x-0'} inline-block h-5 w-5 transform rounded-full bg-white transition duration-200 ease-in-out`} />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Tryb ciemny</h4>
                  <p className="text-sm text-gray-500">Użyj ciemnego motywu interfejsu</p>
                </div>
                <button 
                  onClick={() => setDarkMode(!darkMode)}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${darkMode ? 'bg-primary-600' : 'bg-gray-200'}`}
                >
                  <span className={`${darkMode ? 'translate-x-5' : 'translate-x-0'} inline-block h-5 w-5 transform rounded-full bg-white transition duration-200 ease-in-out`} />
                </button>
              </div>
            </div>
          </div>

          {/* Przyciski akcji */}
          <div className="flex justify-end space-x-4">
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md transition-colors duration-200">Anuluj</button>
            <button className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200">Zapisz Ustawienia</button>
          </div>
        </div>
      </div>
    </div>
  );
}; 