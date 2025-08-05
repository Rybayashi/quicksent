import React, { useState } from 'react';
import { PuescApiTest } from './PuescApiTest';
import { PuescDocumentation } from './PuescDocumentation';
import { TypeVerification } from './TypeVerification';
import { PuescLoginTest } from './PuescLoginTest';

type TestTab = 'api' | 'documentation' | 'types' | 'login';

export const PuescIntegrationTest: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TestTab>('api');
  const tabs = [
    { id: 'api', name: 'API Test', icon: '🔌' },
    { id: 'login', name: 'Logowanie PUESC', icon: '🔐' },
    { id: 'documentation', name: 'Dokumentacja', icon: '📚' },
    { id: 'types', name: 'Weryfikacja Typów', icon: '🔍' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'api':
        return <PuescApiTest />;
      case 'login':
        return <PuescLoginTest />;
      case 'documentation':
        return <PuescDocumentation />;
      case 'types':
        return <TypeVerification />;
      default:
        return <PuescApiTest />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="card">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">QuickSent - Test Integracji PUESC</h1>
          <p className="text-gray-600">Kompleksowe testy integracji z systemem PUESC SENT zgodnie z oficjalną specyfikacją</p>
        </div>
        
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TestTab)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
        
        <div className="min-h-[600px]">
          {renderTabContent()}
        </div>
        
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-2">Status Integracji PUESC:</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
              <span>Proxy CORS skonfigurowany</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
              <span>API Endpoints gotowe</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
              <span>Typy TypeScript zdefiniowane</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
              <span>Konto testowe dostępne</span>
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold mb-2">Następne Kroki:</h3>
          <ol className="text-sm space-y-1 list-decimal list-inside">
            <li>Przetestuj logowanie do rzeczywistego systemu PUESC</li>
            <li>Zweryfikuj endpointy SENT 100 i SENT EDIT</li>
            <li>Sprawdź integrację z GUS API</li>
            <li>Przetestuj wysyłanie deklaracji</li>
            <li>Zaimplementuj obsługę błędów i walidację</li>
            <li>Dodaj testy jednostkowe i integracyjne</li>
          </ol>
        </div>
      </div>
    </div>
  );
}; 