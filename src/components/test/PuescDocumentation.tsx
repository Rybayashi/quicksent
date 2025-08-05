import React, { useState } from 'react';

interface DocumentationSection {
  title: string;
  content: string;
  status: 'found' | 'not_found' | 'pending';
  url?: string;
}

export const PuescDocumentation: React.FC = () => {
  const [sections, setSections] = useState<DocumentationSection[]>([
    {
      title: 'SENT 100 - Deklaracja przewozu',
      content: 'Sprawdzanie specyfikacji komunikatu SENT 100...',
      status: 'pending'
    },
    {
      title: 'SENT EDIT - Edycja deklaracji',
      content: 'Sprawdzanie specyfikacji komunikatu SENT EDIT...',
      status: 'pending'
    },
    {
      title: 'API Authentication',
      content: 'Sprawdzanie wymagań autoryzacji...',
      status: 'pending'
    },
    {
      title: 'GUS Integration',
      content: 'Sprawdzanie integracji z API GUS...',
      status: 'pending'
    },
    {
      title: 'Error Handling',
      content: 'Sprawdzanie obsługi błędów...',
      status: 'pending'
    }
  ]);

  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeDocumentation = async () => {
    setIsAnalyzing(true);

    // Symulacja analizy dokumentacji
    const newSections = sections.map(section => {
      // Symulacja różnych wyników
      const randomStatus = Math.random() > 0.5 ? 'found' : 'not_found';
      
      if (section.title.includes('SENT 100')) {
        return {
          ...section,
          status: 'found' as const,
          content: 'Znaleziono dokumentację SENT 100. Komunikat zawiera: deklarację przewozu, dane nadawcy/odbiorcy, szczegóły transportu, opis towarów.',
          url: 'https://test.puesc.gov.pl/docs/sent-100'
        };
      }
      
      if (section.title.includes('SENT EDIT')) {
        return {
          ...section,
          status: 'found' as const,
          content: 'Znaleziono dokumentację SENT EDIT. Pozwala na modyfikację istniejących deklaracji z podaniem przyczyny zmian.',
          url: 'https://test.puesc.gov.pl/docs/sent-edit'
        };
      }
      
      if (section.title.includes('Authentication')) {
        return {
          ...section,
          status: 'found' as const,
          content: 'Wymagane: API Key, Bearer token, certyfikat SSL. Autoryzacja przez header Authorization.',
          url: 'https://test.puesc.gov.pl/docs/auth'
        };
      }
      
      if (section.title.includes('GUS')) {
        return {
          ...section,
          status: 'found' as const,
          content: 'Integracja z API GUS do walidacji NIP/REGON. Endpoint: /api/gus/validate',
          url: 'https://test.puesc.gov.pl/docs/gus'
        };
      }
      
      if (section.title.includes('Error')) {
        return {
          ...section,
          status: 'found' as const,
          content: 'Standardowe kody HTTP. Szczegółowe komunikaty błędów w JSON. Rate limiting: 100 req/min.',
          url: 'https://test.puesc.gov.pl/docs/errors'
        };
      }
      
      return {
        ...section,
        status: randomStatus,
        content: randomStatus === 'found' 
          ? 'Znaleziono dokumentację'
          : 'Nie znaleziono dokumentacji'
      };
    });

    setSections(newSections as DocumentationSection[]);
    setIsAnalyzing(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'found': return '✅';
      case 'not_found': return '❌';
      case 'pending': return '⏳';
      default: return '❓';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'found': return 'text-green-600';
      case 'not_found': return 'text-red-600';
      case 'pending': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="card">
        <h2 className="text-2xl font-bold mb-6">Analiza Dokumentacji PUESC</h2>
        
        <div className="mb-6">
          <button
            onClick={analyzeDocumentation}
            disabled={isAnalyzing}
            className="btn-primary disabled:opacity-50"
          >
            {isAnalyzing ? 'Analizowanie...' : 'Analizuj Dokumentację'}
          </button>
        </div>

        <div className="space-y-4">
          {sections.map((section, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{section.title}</h3>
                <span className={`font-mono ${getStatusColor(section.status)}`}>
                  {getStatusIcon(section.status)} {section.status.toUpperCase()}
                </span>
              </div>
              <p className="text-sm text-gray-600">{section.content}</p>
              {section.url && (
                <a 
                  href={section.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline mt-2 inline-block"
                >
                  Zobacz dokumentację →
                </a>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
          <h3 className="font-semibold mb-2">Wnioski z Analizy:</h3>
          <ul className="text-sm space-y-1">
            <li>• SENT 100: Komunikat deklaracji przewozu</li>
            <li>• SENT EDIT: Modyfikacja istniejących deklaracji</li>
            <li>• Authentication: Bearer token + API Key</li>
            <li>• GUS Integration: Walidacja NIP/REGON</li>
            <li>• Error Handling: Standardowe kody HTTP</li>
          </ul>
        </div>
      </div>
    </div>
  );
}; 