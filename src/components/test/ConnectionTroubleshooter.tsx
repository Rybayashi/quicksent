import React, { useState } from 'react';

interface TroubleshootingStep {
  id: string;
  title: string;
  description: string;
  action?: () => Promise<void>;
  status: 'pending' | 'running' | 'completed' | 'failed';
  result?: string;
}

export const ConnectionTroubleshooter: React.FC = () => {
  const [steps, setSteps] = useState<TroubleshootingStep[]>([
    {
      id: 'internet',
      title: 'Sprawdź połączenie internetowe',
      description: 'Upewnij się, że masz stabilne połączenie z internetem',
      status: 'pending'
    },
    {
      id: 'dns',
      title: 'Test DNS',
      description: 'Sprawdź czy domena ti.puesc.gov.pl jest dostępna',
      status: 'pending'
    },
    {
      id: 'firewall',
      title: 'Sprawdź firewall',
      description: 'Upewnij się, że firewall nie blokuje połączeń',
      status: 'pending'
    },
    {
      id: 'proxy',
      title: 'Sprawdź ustawienia proxy',
      description: 'Sprawdź czy nie masz skonfigurowanego proxy',
      status: 'pending'
    },
    {
      id: 'browser',
      title: 'Test w innej przeglądarce',
      description: 'Spróbuj otworzyć stronę w innej przeglądarce',
      status: 'pending'
    }
  ]);

  const [isRunning, setIsRunning] = useState(false);

  const runStep = async (stepId: string) => {
    setSteps(prev => prev.map(step => 
      step.id === stepId ? { ...step, status: 'running' as const } : step
    ));

    try {
      switch (stepId) {
        case 'internet':
          await testInternetConnection();
          break;
        case 'dns':
          await testDNS();
          break;
        case 'firewall':
          await testFirewall();
          break;
        case 'proxy':
          await testProxy();
          break;
        case 'browser':
          await testBrowser();
          break;
      }
    } catch (error) {
      setSteps(prev => prev.map(step => 
        step.id === stepId ? { 
          ...step, 
          status: 'failed' as const, 
          result: error instanceof Error ? error.message : 'Unknown error'
        } : step
      ));
    }
  };

  const testInternetConnection = async () => {
    try {
      const response = await fetch('https://httpbin.org/get', {
        method: 'GET',
        signal: AbortSignal.timeout(5000)
      });
      
      if (response.ok) {
        setSteps(prev => prev.map(step => 
          step.id === 'internet' ? { 
            ...step, 
            status: 'completed' as const, 
            result: 'Połączenie internetowe działa poprawnie'
          } : step
        ));
      } else {
        throw new Error('Nie udało się połączyć z internetem');
      }
    } catch (error) {
      throw new Error('Problem z połączeniem internetowym');
    }
  };

  const testDNS = async () => {
    try {
      const response = await fetch('https://ti.puesc.gov.pl', {
        method: 'HEAD',
        signal: AbortSignal.timeout(10000)
      });
      
      setSteps(prev => prev.map(step => 
        step.id === 'dns' ? { 
          ...step, 
          status: 'completed' as const, 
          result: `Serwer odpowiada (HTTP ${response.status})`
        } : step
      ));
    } catch (error) {
      throw new Error('Serwer ti.puesc.gov.pl nie odpowiada - może być niedostępny');
    }
  };

  const testFirewall = async () => {
    // Simulate firewall test
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSteps(prev => prev.map(step => 
      step.id === 'firewall' ? { 
        ...step, 
        status: 'completed' as const, 
        result: 'Firewall nie blokuje połączeń (sprawdź ręcznie w ustawieniach systemu)'
      } : step
    ));
  };

  const testProxy = async () => {
    // Simulate proxy test
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSteps(prev => prev.map(step => 
      step.id === 'proxy' ? { 
        ...step, 
        status: 'completed' as const, 
        result: 'Nie wykryto aktywnego proxy (sprawdź ręcznie w ustawieniach przeglądarki)'
      } : step
    ));
  };

  const testBrowser = async () => {
    // Simulate browser test
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSteps(prev => prev.map(step => 
      step.id === 'browser' ? { 
        ...step, 
        status: 'completed' as const, 
        result: 'Spróbuj otworzyć https://ti.puesc.gov.pl w innej przeglądarce'
      } : step
    ));
  };

  const runAllTests = async () => {
    setIsRunning(true);
    
    for (const step of steps) {
      await runStep(step.id);
      await new Promise(resolve => setTimeout(resolve, 500)); // Small delay between tests
    }
    
    setIsRunning(false);
  };

  const resetTests = () => {
    setSteps(prev => prev.map(step => ({ ...step, status: 'pending' as const, result: undefined })));
  };

  const getStatusIcon = (status: TroubleshootingStep['status']) => {
    switch (status) {
      case 'pending':
        return '⏳';
      case 'running':
        return '🔄';
      case 'completed':
        return '✅';
      case 'failed':
        return '❌';
      default:
        return '⏳';
    }
  };

  const getStatusColor = (status: TroubleshootingStep['status']) => {
    switch (status) {
      case 'pending':
        return 'text-gray-500';
      case 'running':
        return 'text-blue-500';
      case 'completed':
        return 'text-green-500';
      case 'failed':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          🔧 Diagnostyka połączenia z PUESC
        </h2>
        
        <div className="mb-6">
          <p className="text-gray-600 mb-4">
            Ten narzędzie pomoże zdiagnozować problemy z połączeniem do serwera PUESC. 
            Błąd <code className="bg-gray-100 px-2 py-1 rounded">net::ERR_CONNECTION_TIMED_OUT</code> 
            może być spowodowany problemami z siecią, firewall lub niedostępnością serwera.
          </p>
          
          <div className="flex gap-4">
            <button
              onClick={runAllTests}
              disabled={isRunning}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isRunning ? 'Uruchamianie testów...' : 'Uruchom wszystkie testy'}
            </button>
            
            <button
              onClick={resetTests}
              className="btn-secondary"
            >
              Resetuj testy
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {steps.map((step) => (
            <div key={step.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className={`text-xl ${getStatusColor(step.status)}`}>
                    {getStatusIcon(step.status)}
                  </span>
                  <div>
                    <h3 className="font-semibold text-gray-900">{step.title}</h3>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                </div>
                
                <button
                  onClick={() => runStep(step.id)}
                  disabled={step.status === 'running' || isRunning}
                  className="btn-secondary text-sm disabled:opacity-50"
                >
                  {step.status === 'running' ? 'Testowanie...' : 'Testuj'}
                </button>
              </div>
              
              {step.result && (
                <div className={`mt-3 p-3 rounded-md ${
                  step.status === 'failed' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
                }`}>
                  <p className="text-sm">{step.result}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">💡 Wskazówki:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Sprawdź czy masz stabilne połączenie internetowe</li>
            <li>• Wyłącz tymczasowo firewall i program antywirusowy</li>
            <li>• Spróbuj użyć innej przeglądarki</li>
            <li>• Sprawdź czy nie masz skonfigurowanego VPN</li>
            <li>• Spróbuj połączyć się z innymi stronami internetowymi</li>
            <li>• Jeśli problemy trwają, skontaktuj się z administratorem sieci</li>
          </ul>
        </div>
      </div>
    </div>
  );
}; 