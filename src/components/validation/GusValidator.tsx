import React, { useState } from 'react';
import { validateGusData } from '../../lib/api/puesc';

interface GusValidationResult {
  success: boolean;
  data?: {
    nip: string;
    regon: string;
    name: string;
    address: {
      street: string;
      buildingNumber: string;
      postalCode: string;
      city: string;
    };
    status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
    businessType: string;
    registrationDate: string;
  };
  error?: string;
}

export const GusValidator: React.FC = () => {
  const [nip, setNip] = useState('');
  const [regon, setRegon] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<GusValidationResult | null>(null);

  const handleNipValidation = async () => {
    if (!nip.trim()) {
      setValidationResult({
        success: false,
        error: 'Proszę wprowadzić numer NIP'
      });
      return;
    }

    setIsValidating(true);
    setValidationResult(null);

    try {
      const result = await validateGusData(nip.trim());
      setValidationResult(result as unknown as GusValidationResult);
    } catch (error) {
      setValidationResult({
        success: false,
        error: error instanceof Error ? error.message : 'Błąd podczas walidacji NIP'
      });
    } finally {
      setIsValidating(false);
    }
  };

  const handleRegonValidation = async () => {
    if (!regon.trim()) {
      setValidationResult({
        success: false,
        error: 'Proszę wprowadzić numer REGON'
      });
      return;
    }

    setIsValidating(true);
    setValidationResult(null);

    try {
      const result = await validateGusData(regon.trim());
      setValidationResult(result as unknown as GusValidationResult);
    } catch (error) {
      setValidationResult({
        success: false,
        error: error instanceof Error ? error.message : 'Błąd podczas walidacji REGON'
      });
    } finally {
      setIsValidating(false);
    }
  };

  const clearResults = () => {
    setValidationResult(null);
    setNip('');
    setRegon('');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="card">
        <h2 className="text-2xl font-bold mb-6">Walidacja Danych GUS</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Walidacja NIP */}
          <div className="border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Walidacja NIP</h3>
            <div className="space-y-4">
              <div>
                <label className="form-label">Numer NIP</label>
                <input
                  type="text"
                  value={nip}
                  onChange={(e) => setNip(e.target.value)}
                  className="input-field"
                  placeholder="1234567890"
                  maxLength={10}
                />
              </div>
              <button
                onClick={handleNipValidation}
                disabled={isValidating}
                className="btn-primary w-full disabled:opacity-50"
              >
                {isValidating ? 'Walidacja...' : 'Sprawdź NIP'}
              </button>
            </div>
          </div>

          {/* Walidacja REGON */}
          <div className="border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Walidacja REGON</h3>
            <div className="space-y-4">
              <div>
                <label className="form-label">Numer REGON</label>
                <input
                  type="text"
                  value={regon}
                  onChange={(e) => setRegon(e.target.value)}
                  className="input-field"
                  placeholder="123456789"
                  maxLength={9}
                />
              </div>
              <button
                onClick={handleRegonValidation}
                disabled={isValidating}
                className="btn-primary w-full disabled:opacity-50"
              >
                {isValidating ? 'Walidacja...' : 'Sprawdź REGON'}
              </button>
            </div>
          </div>
        </div>

        {/* Wyniki walidacji */}
        {validationResult && (
          <div className={`border rounded-lg p-6 ${
            validationResult.success 
              ? 'bg-green-50 border-green-200' 
              : 'bg-red-50 border-red-200'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">
                {validationResult.success ? '✅ Dane znalezione' : '❌ Błąd walidacji'}
              </h3>
              <button
                onClick={clearResults}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Wyczyść
              </button>
            </div>

            {validationResult.error && (
              <p className="text-red-600 mb-4">{validationResult.error}</p>
            )}

            {validationResult.data && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">NIP</label>
                    <p className="text-lg font-semibold">{validationResult.data.nip}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">REGON</label>
                    <p className="text-lg font-semibold">{validationResult.data.regon}</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium text-gray-500">Nazwa firmy</label>
                    <p className="text-lg font-semibold">{validationResult.data.name}</p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-2">Adres</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Ulica</label>
                      <p>{validationResult.data.address.street}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Numer budynku</label>
                      <p>{validationResult.data.address.buildingNumber}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Kod pocztowy</label>
                      <p>{validationResult.data.address.postalCode}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Miasto</label>
                      <p>{validationResult.data.address.city}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Status</label>
                      <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        validationResult.data.status === 'ACTIVE' 
                          ? 'bg-green-100 text-green-800'
                          : validationResult.data.status === 'SUSPENDED'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {validationResult.data.status === 'ACTIVE' && 'Aktywny'}
                        {validationResult.data.status === 'INACTIVE' && 'Nieaktywny'}
                        {validationResult.data.status === 'SUSPENDED' && 'Zawieszony'}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Typ działalności</label>
                      <p className="text-sm">{validationResult.data.businessType}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Data rejestracji</label>
                      <p className="text-sm">{new Date(validationResult.data.registrationDate).toLocaleDateString('pl-PL')}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <button
                    onClick={() => {
                      // Tutaj można dodać funkcję do automatycznego wypełnienia formularza
                      console.log('Wypełnij formularz danymi:', validationResult.data);
                    }}
                    className="btn-primary"
                  >
                    Użyj danych w formularzu
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Informacje o walidacji */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold mb-2">Informacje o Walidacji GUS:</h3>
          <ul className="text-sm space-y-1">
            <li>• Sprawdzanie danych w rejestrze GUS w czasie rzeczywistym</li>
            <li>• Weryfikacja statusu działalności gospodarczej</li>
            <li>• Automatyczne pobieranie adresu i danych kontaktowych</li>
            <li>• Walidacja poprawności numerów NIP i REGON</li>
            <li>• Możliwość automatycznego wypełnienia formularzy</li>
          </ul>
        </div>
      </div>
    </div>
  );
}; 