import React, { useState } from 'react';
// import type { Sent100Message, SentEditMessage, Contractor, Vehicle, Driver, TransportType } from '@/types';

interface TypeCheck {
  field: string;
  ourType: string;
  expectedType: string;
  status: 'match' | 'mismatch' | 'unknown';
  notes?: string;
}

export const TypeVerification: React.FC = () => {
  const [typeChecks, setTypeChecks] = useState<TypeCheck[]>([
    // SENT 100 Message Structure
    {
      field: 'declaration_number',
      ourType: 'string',
      expectedType: 'string',
      status: 'match',
      notes: 'Numer deklaracji - wymagany'
    },
    {
      field: 'sender',
      ourType: 'Contractor',
      expectedType: 'Contractor',
      status: 'match',
      notes: 'Dane nadawcy - pełny obiekt'
    },
    {
      field: 'receiver',
      ourType: 'Contractor',
      expectedType: 'Contractor',
      status: 'match',
      notes: 'Dane odbiorcy - pełny obiekt'
    },
    {
      field: 'transport_details.type',
      ourType: 'TransportType',
      expectedType: 'enum',
      status: 'match',
      notes: 'Typ transportu: road/rail/air/sea/inland_waterway'
    },
    {
      field: 'transport_details.vehicle',
      ourType: 'Vehicle',
      expectedType: 'Vehicle',
      status: 'match',
      notes: 'Dane pojazdu'
    },
    {
      field: 'transport_details.driver',
      ourType: 'Driver',
      expectedType: 'Driver',
      status: 'match',
      notes: 'Dane kierowcy'
    },
    {
      field: 'goods.description',
      ourType: 'string',
      expectedType: 'string',
      status: 'match',
      notes: 'Opis towarów'
    },
    {
      field: 'goods.quantity',
      ourType: 'number',
      expectedType: 'number',
      status: 'match',
      notes: 'Ilość towarów'
    },
    {
      field: 'goods.unit',
      ourType: 'string',
      expectedType: 'string',
      status: 'match',
      notes: 'Jednostka miary'
    },
    {
      field: 'goods.value',
      ourType: 'number',
      expectedType: 'number',
      status: 'match',
      notes: 'Wartość towarów'
    },
    {
      field: 'goods.currency',
      ourType: 'string',
      expectedType: 'string',
      status: 'match',
      notes: 'Waluta (PLN, EUR, USD)'
    },
    // Contractor Structure
    {
      field: 'contractor.nip',
      ourType: 'string',
      expectedType: 'string',
      status: 'match',
      notes: 'NIP - 10 cyfr'
    },
    {
      field: 'contractor.regon',
      ourType: 'string?',
      expectedType: 'string?',
      status: 'match',
      notes: 'REGON - opcjonalny'
    },
    {
      field: 'contractor.address',
      ourType: 'string',
      expectedType: 'string',
      status: 'match',
      notes: 'Adres pełny'
    },
    // Vehicle Structure
    {
      field: 'vehicle.registration_number',
      ourType: 'string',
      expectedType: 'string',
      status: 'match',
      notes: 'Numer rejestracyjny'
    },
    {
      field: 'vehicle.type',
      ourType: 'VehicleType',
      expectedType: 'enum',
      status: 'match',
      notes: 'Typ pojazdu: truck/trailer/van/car'
    },
    // Driver Structure
    {
      field: 'driver.license_number',
      ourType: 'string',
      expectedType: 'string',
      status: 'match',
      notes: 'Numer prawa jazdy'
    },
    {
      field: 'driver.license_type',
      ourType: 'string',
      expectedType: 'string',
      status: 'match',
      notes: 'Kategoria prawa jazdy'
    }
  ]);

  const [isVerifying, setIsVerifying] = useState(false);

  const verifyTypes = async () => {
    setIsVerifying(true);
    
    // Symulacja weryfikacji typów
    setTimeout(() => {
      const updatedChecks = typeChecks.map(check => {
        // Symulacja różnych wyników weryfikacji
        const randomStatus = Math.random() > 0.8 ? 'mismatch' : 'match';
        
        return {
          ...check,
          status: randomStatus as 'match' | 'mismatch'
        };
      });
      
      setTypeChecks(updatedChecks);
      setIsVerifying(false);
    }, 2000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'match': return '✅';
      case 'mismatch': return '❌';
      case 'unknown': return '❓';
      default: return '❓';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'match': return 'text-green-600';
      case 'mismatch': return 'text-red-600';
      case 'unknown': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  const matchCount = typeChecks.filter(c => c.status === 'match').length;
  const mismatchCount = typeChecks.filter(c => c.status === 'mismatch').length;
  const totalCount = typeChecks.length;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="card">
        <h2 className="text-2xl font-bold mb-6">Weryfikacja Typów TypeScript</h2>
        
        <div className="mb-6">
          <button
            onClick={verifyTypes}
            disabled={isVerifying}
            className="btn-primary disabled:opacity-50"
          >
            {isVerifying ? 'Weryfikowanie...' : 'Weryfikuj Typy'}
          </button>
        </div>

        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-2">Statystyki:</h3>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{matchCount}</div>
              <div className="text-gray-600">Zgodne</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{mismatchCount}</div>
              <div className="text-gray-600">Niezgodne</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{totalCount}</div>
              <div className="text-gray-600">Wszystkie</div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {typeChecks.map((check, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{check.field}</h3>
                <span className={`font-mono ${getStatusColor(check.status)}`}>
                  {getStatusIcon(check.status)} {check.status.toUpperCase()}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Nasz typ:</span>
                  <code className="ml-2 bg-gray-100 px-2 py-1 rounded">{check.ourType}</code>
                </div>
                <div>
                  <span className="font-medium">Oczekiwany:</span>
                  <code className="ml-2 bg-gray-100 px-2 py-1 rounded">{check.expectedType}</code>
                </div>
              </div>
              {check.notes && (
                <p className="text-sm text-gray-600 mt-2">{check.notes}</p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold mb-2">Podsumowanie Weryfikacji:</h3>
          <ul className="text-sm space-y-1">
            <li>• SENT 100 Message: {typeChecks.filter(c => c.field.startsWith('goods') || c.field.startsWith('transport')).filter(c => c.status === 'match').length}/6 pól zgodnych</li>
            <li>• Contractor: {typeChecks.filter(c => c.field.startsWith('contractor')).filter(c => c.status === 'match').length}/3 pól zgodnych</li>
            <li>• Vehicle: {typeChecks.filter(c => c.field.startsWith('vehicle')).filter(c => c.status === 'match').length}/2 pól zgodnych</li>
            <li>• Driver: {typeChecks.filter(c => c.field.startsWith('driver')).filter(c => c.status === 'match').length}/2 pól zgodnych</li>
          </ul>
        </div>
      </div>
    </div>
  );
}; 