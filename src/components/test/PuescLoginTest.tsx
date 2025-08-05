import React, { useState } from 'react';

interface LoginResult {
  success: boolean;
  sessionId?: string;
  userInfo?: any;
  error?: string;
  message: string;
}

export const PuescLoginTest: React.FC = () => {
  const [loginResult, setLoginResult] = useState<LoginResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showCredentials, setShowCredentials] = useState(false);

  const testPuescLogin = async () => {
    setIsLoading(true);
    setLoginResult(null);

    try {
      // Symulacja logowania do PUESC
      const loginData = {
        username: 'bartlomiej.rybacha@dbschenker.com',
        password: 'BlastedBart1410!',
        environment: 'test'
      };

      // W rzeczywistej implementacji tutaj byłby request do PUESC
      await new Promise(resolve => setTimeout(resolve, 2000)); // Symulacja opóźnienia

      const result: LoginResult = {
        success: true,
        sessionId: `puesc_session_${Date.now()}`,
        userInfo: {
          username: loginData.username,
          company: 'DB Schenker Sp. z o.o.',
          companyId: 'DB_SCHENKER_001',
          permissions: [
            'SENT_100_CREATE',
            'SENT_100_EDIT',
            'SENT_100_VIEW',
            'SENT_EDIT_CREATE',
            'SENT_EDIT_VIEW',
            'GUS_VALIDATION',
            'DECLARATION_HISTORY',
            'REPORTS_VIEW'
          ],
          role: 'TRANSPORT_MANAGER',
          lastLogin: new Date().toISOString(),
          sessionExpiry: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString() // 8 godzin
        },
        message: 'Zalogowano pomyślnie do systemu PUESC'
      };

      setLoginResult(result);
    } catch (error) {
      setLoginResult({
        success: false,
        error: error instanceof Error ? error.message : 'Nieznany błąd',
        message: 'Błąd logowania do systemu PUESC'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const testPuescLogout = async () => {
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLoginResult({
        success: true,
        message: 'Wylogowano pomyślnie z systemu PUESC'
      });
    } catch (error) {
      setLoginResult({
        success: false,
        error: error instanceof Error ? error.message : 'Nieznany błąd',
        message: 'Błąd wylogowania z systemu PUESC'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="card">
        <h2 className="text-2xl font-bold mb-6">Test Logowania PUESC</h2>
        
        <div className="mb-6">
          <div className="flex space-x-4">
            <button
              onClick={testPuescLogin}
              disabled={isLoading}
              className="btn-primary disabled:opacity-50"
            >
              {isLoading ? 'Logowanie...' : 'Zaloguj do PUESC'}
            </button>
            
            {loginResult?.success && (
              <button
                onClick={testPuescLogout}
                disabled={isLoading}
                className="btn-secondary disabled:opacity-50"
              >
                {isLoading ? 'Wylogowywanie...' : 'Wyloguj z PUESC'}
              </button>
            )}
          </div>

          <div className="mt-4">
            <button
              onClick={() => setShowCredentials(!showCredentials)}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              {showCredentials ? 'Ukryj' : 'Pokaż'} dane logowania
            </button>
            
            {showCredentials && (
              <div className="mt-2 p-3 bg-gray-50 rounded border">
                <p className="text-sm text-gray-600">
                  <strong>Login:</strong> bartlomiej.rybacha@dbschenker.com<br/>
                  <strong>Hasło:</strong> BlastedBart1410!<br/>
                  <strong>Środowisko:</strong> test.puesc.gov.pl
                </p>
              </div>
            )}
          </div>
        </div>

        {loginResult && (
          <div className={`p-4 rounded-lg border ${
            loginResult.success 
              ? 'bg-green-50 border-green-200' 
              : 'bg-red-50 border-red-200'
          }`}>
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">
                {loginResult.success ? '✅ Sukces' : '❌ Błąd'}
              </h3>
              <span className="text-sm text-gray-500">
                {new Date().toLocaleTimeString()}
              </span>
            </div>
            
            <p className="text-sm mt-2">{loginResult.message}</p>
            
            {loginResult.error && (
              <p className="text-sm text-red-600 mt-2">
                <strong>Błąd:</strong> {loginResult.error}
              </p>
            )}

            {loginResult.userInfo && (
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Informacje o użytkowniku:</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>Firma:</strong> {loginResult.userInfo.company}
                  </div>
                  <div>
                    <strong>ID Firmy:</strong> {loginResult.userInfo.companyId}
                  </div>
                  <div>
                    <strong>Rola:</strong> {loginResult.userInfo.role}
                  </div>
                  <div>
                    <strong>Ostatnie logowanie:</strong> {new Date(loginResult.userInfo.lastLogin).toLocaleString()}
                  </div>
                </div>
                
                <div className="mt-4">
                  <h5 className="font-semibold mb-2">Uprawnienia:</h5>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {loginResult.userInfo.permissions.map((permission: string, index: number) => (
                      <div key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {permission}
                      </div>
                    ))}
                  </div>
                </div>

                {loginResult.sessionId && (
                  <div className="mt-4 p-3 bg-gray-100 rounded">
                    <p className="text-xs font-mono">
                      <strong>Session ID:</strong> {loginResult.sessionId}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      <strong>Wygasa:</strong> {new Date(loginResult.userInfo.sessionExpiry).toLocaleString()}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold mb-2">Informacje o Teście:</h3>
          <ul className="text-sm space-y-1">
            <li>• Test symuluje logowanie do rzeczywistego systemu PUESC</li>
            <li>• Wykorzystuje konto testowe DB Schenker</li>
            <li>• Sprawdza uprawnienia użytkownika</li>
            <li>• Symuluje sesję użytkownika</li>
            <li>• W rzeczywistej implementacji będzie używać prawdziwego API PUESC</li>
          </ul>
        </div>
      </div>
    </div>
  );
}; 