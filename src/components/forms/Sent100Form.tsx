import React, { useState } from 'react';
import { createSent100Declaration } from '../../lib/api/puesc';
// import type { Sent100Declaration } from '../../types';

interface Sent100FormData {
  sender: {
    entityType: 'COMPANY' | 'INDIVIDUAL';
    nip: string;
    regon?: string;
    name: string;
    address: {
      street: string;
      buildingNumber: string;
      apartmentNumber?: string;
      postalCode: string;
      city: string;
      country: string;
    };
    contactPerson: string;
    phone: string;
    email: string;
  };
  receiver: {
    entityType: 'COMPANY' | 'INDIVIDUAL';
    nip: string;
    regon?: string;
    name: string;
    address: {
      street: string;
      buildingNumber: string;
      apartmentNumber?: string;
      postalCode: string;
      city: string;
      country: string;
    };
    contactPerson: string;
    phone: string;
    email: string;
  };
  transportDetails: {
    transportType: 'ROAD' | 'RAIL' | 'AIR' | 'SEA' | 'INLAND_WATERWAY';
    vehicle: {
      registrationNumber: string;
      vehicleType: 'TRUCK' | 'TRAILER' | 'VAN' | 'CAR';
      capacity: number;
      capacityUnit: string;
    };
    driver: {
      firstName: string;
      lastName: string;
      licenseNumber: string;
      licenseType: string;
      phone: string;
      email: string;
    };
    route: {
      loadingPlace: string;
      unloadingPlace: string;
      plannedDepartureDate: string;
      plannedArrivalDate: string;
    };
  };
  goods: {
    description: string;
    quantity: number;
    unit: string;
    value: number;
    currency: string;
    customsValue?: number;
    customsCurrency?: string;
    commodityCode?: string;
    packagingType?: string;
    numberOfPackages?: number;
  };
}

export const Sent100Form: React.FC = () => {
  const [formData, setFormData] = useState<Sent100FormData>({
    sender: {
      entityType: 'COMPANY',
      nip: '',
      regon: '',
      name: '',
      address: {
        street: '',
        buildingNumber: '',
        apartmentNumber: '',
        postalCode: '',
        city: '',
        country: 'PL',
      },
      contactPerson: '',
      phone: '',
      email: '',
    },
    receiver: {
      entityType: 'COMPANY',
      nip: '',
      regon: '',
      name: '',
      address: {
        street: '',
        buildingNumber: '',
        apartmentNumber: '',
        postalCode: '',
        city: '',
        country: 'PL',
      },
      contactPerson: '',
      phone: '',
      email: '',
    },
    transportDetails: {
      transportType: 'ROAD',
      vehicle: {
        registrationNumber: '',
        vehicleType: 'TRUCK',
        capacity: 0,
        capacityUnit: 'kg',
      },
      driver: {
        firstName: '',
        lastName: '',
        licenseNumber: '',
        licenseType: '',
        phone: '',
        email: '',
      },
      route: {
        loadingPlace: '',
        unloadingPlace: '',
        plannedDepartureDate: '',
        plannedArrivalDate: '',
      },
    },
    goods: {
      description: '',
      quantity: 0,
      unit: 'kg',
      value: 0,
      currency: 'PLN',
      customsValue: 0,
      customsCurrency: 'PLN',
      commodityCode: '',
      packagingType: '',
      numberOfPackages: 0,
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    message: string;
    declarationNumber?: string;
  } | null>(null);

  const handleInputChange = (section: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof Sent100FormData],
        [field]: value,
      },
    }));
  };

  const handleNestedInputChange = (section: string, subsection: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof Sent100FormData],
        [subsection]: {
          ...(prev[section as keyof Sent100FormData] as any)[subsection],
          [field]: value,
        },
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const declaration = createSent100Declaration({
        declaration_number: `QS_${Date.now()}`,
        sender: formData.sender,
        receiver: formData.receiver,
        transport_details: formData.transportDetails,
        goods: formData.goods,
      });

      // Symulacja wysłania do PUESC
      await new Promise(resolve => setTimeout(resolve, 2000));

      setSubmitResult({
        success: true,
        message: 'Deklaracja SENT 100 została pomyślnie przygotowana',
        declarationNumber: declaration.declaration.declarationNumber,
      });
    } catch (error) {
      setSubmitResult({
        success: false,
        message: error instanceof Error ? error.message : 'Błąd podczas przygotowywania deklaracji',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="card">
        <h2 className="text-2xl font-bold mb-6">Nowa Deklaracja SENT 100</h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Nadawca */}
          <div className="border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Dane Nadawcy</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Typ podmiotu</label>
                <select
                  value={formData.sender.entityType}
                  onChange={(e) => handleInputChange('sender', 'entityType', e.target.value)}
                  className="input-field"
                >
                  <option value="COMPANY">Firma</option>
                  <option value="INDIVIDUAL">Osoba fizyczna</option>
                </select>
              </div>
              <div>
                <label className="form-label">NIP</label>
                <input
                  type="text"
                  value={formData.sender.nip}
                  onChange={(e) => handleInputChange('sender', 'nip', e.target.value)}
                  className="input-field"
                  placeholder="1234567890"
                />
              </div>
              <div>
                <label className="form-label">REGON</label>
                <input
                  type="text"
                  value={formData.sender.regon}
                  onChange={(e) => handleInputChange('sender', 'regon', e.target.value)}
                  className="input-field"
                  placeholder="123456789"
                />
              </div>
              <div>
                <label className="form-label">Nazwa</label>
                <input
                  type="text"
                  value={formData.sender.name}
                  onChange={(e) => handleInputChange('sender', 'name', e.target.value)}
                  className="input-field"
                  placeholder="Nazwa firmy"
                />
              </div>
              <div>
                <label className="form-label">Ulica</label>
                <input
                  type="text"
                  value={formData.sender.address.street}
                  onChange={(e) => handleNestedInputChange('sender', 'address', 'street', e.target.value)}
                  className="input-field"
                  placeholder="ul. Przykładowa"
                />
              </div>
              <div>
                <label className="form-label">Numer budynku</label>
                <input
                  type="text"
                  value={formData.sender.address.buildingNumber}
                  onChange={(e) => handleNestedInputChange('sender', 'address', 'buildingNumber', e.target.value)}
                  className="input-field"
                  placeholder="1"
                />
              </div>
              <div>
                <label className="form-label">Kod pocztowy</label>
                <input
                  type="text"
                  value={formData.sender.address.postalCode}
                  onChange={(e) => handleNestedInputChange('sender', 'address', 'postalCode', e.target.value)}
                  className="input-field"
                  placeholder="00-001"
                />
              </div>
              <div>
                <label className="form-label">Miasto</label>
                <input
                  type="text"
                  value={formData.sender.address.city}
                  onChange={(e) => handleNestedInputChange('sender', 'address', 'city', e.target.value)}
                  className="input-field"
                  placeholder="Warszawa"
                />
              </div>
              <div>
                <label className="form-label">Osoba kontaktowa</label>
                <input
                  type="text"
                  value={formData.sender.contactPerson}
                  onChange={(e) => handleInputChange('sender', 'contactPerson', e.target.value)}
                  className="input-field"
                  placeholder="Jan Kowalski"
                />
              </div>
              <div>
                <label className="form-label">Telefon</label>
                <input
                  type="tel"
                  value={formData.sender.phone}
                  onChange={(e) => handleInputChange('sender', 'phone', e.target.value)}
                  className="input-field"
                  placeholder="+48 123 456 789"
                />
              </div>
              <div>
                <label className="form-label">Email</label>
                <input
                  type="email"
                  value={formData.sender.email}
                  onChange={(e) => handleInputChange('sender', 'email', e.target.value)}
                  className="input-field"
                  placeholder="kontakt@firma.pl"
                />
              </div>
            </div>
          </div>

          {/* Odbiorca */}
          <div className="border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Dane Odbiorcy</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Typ podmiotu</label>
                <select
                  value={formData.receiver.entityType}
                  onChange={(e) => handleInputChange('receiver', 'entityType', e.target.value)}
                  className="input-field"
                >
                  <option value="COMPANY">Firma</option>
                  <option value="INDIVIDUAL">Osoba fizyczna</option>
                </select>
              </div>
              <div>
                <label className="form-label">NIP</label>
                <input
                  type="text"
                  value={formData.receiver.nip}
                  onChange={(e) => handleInputChange('receiver', 'nip', e.target.value)}
                  className="input-field"
                  placeholder="0987654321"
                />
              </div>
              <div>
                <label className="form-label">Nazwa</label>
                <input
                  type="text"
                  value={formData.receiver.name}
                  onChange={(e) => handleInputChange('receiver', 'name', e.target.value)}
                  className="input-field"
                  placeholder="Nazwa odbiorcy"
                />
              </div>
              <div>
                <label className="form-label">Ulica</label>
                <input
                  type="text"
                  value={formData.receiver.address.street}
                  onChange={(e) => handleNestedInputChange('receiver', 'address', 'street', e.target.value)}
                  className="input-field"
                  placeholder="ul. Odbiorcza"
                />
              </div>
              <div>
                <label className="form-label">Numer budynku</label>
                <input
                  type="text"
                  value={formData.receiver.address.buildingNumber}
                  onChange={(e) => handleNestedInputChange('receiver', 'address', 'buildingNumber', e.target.value)}
                  className="input-field"
                  placeholder="2"
                />
              </div>
              <div>
                <label className="form-label">Kod pocztowy</label>
                <input
                  type="text"
                  value={formData.receiver.address.postalCode}
                  onChange={(e) => handleNestedInputChange('receiver', 'address', 'postalCode', e.target.value)}
                  className="input-field"
                  placeholder="30-001"
                />
              </div>
              <div>
                <label className="form-label">Miasto</label>
                <input
                  type="text"
                  value={formData.receiver.address.city}
                  onChange={(e) => handleNestedInputChange('receiver', 'address', 'city', e.target.value)}
                  className="input-field"
                  placeholder="Kraków"
                />
              </div>
              <div>
                <label className="form-label">Osoba kontaktowa</label>
                <input
                  type="text"
                  value={formData.receiver.contactPerson}
                  onChange={(e) => handleInputChange('receiver', 'contactPerson', e.target.value)}
                  className="input-field"
                  placeholder="Anna Nowak"
                />
              </div>
              <div>
                <label className="form-label">Telefon</label>
                <input
                  type="tel"
                  value={formData.receiver.phone}
                  onChange={(e) => handleInputChange('receiver', 'phone', e.target.value)}
                  className="input-field"
                  placeholder="+48 987 654 321"
                />
              </div>
              <div>
                <label className="form-label">Email</label>
                <input
                  type="email"
                  value={formData.receiver.email}
                  onChange={(e) => handleInputChange('receiver', 'email', e.target.value)}
                  className="input-field"
                  placeholder="kontakt@odbiorca.pl"
                />
              </div>
            </div>
          </div>

          {/* Szczegóły transportu */}
          <div className="border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Szczegóły Transportu</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Typ transportu</label>
                <select
                  value={formData.transportDetails.transportType}
                  onChange={(e) => handleNestedInputChange('transportDetails', 'transportType', 'transportType', e.target.value)}
                  className="input-field"
                >
                  <option value="ROAD">Drogowy</option>
                  <option value="RAIL">Kolejowy</option>
                  <option value="AIR">Lotniczy</option>
                  <option value="SEA">Morski</option>
                  <option value="INLAND_WATERWAY">Śródlądowy</option>
                </select>
              </div>
              <div>
                <label className="form-label">Numer rejestracyjny</label>
                <input
                  type="text"
                  value={formData.transportDetails.vehicle.registrationNumber}
                  onChange={(e) => handleNestedInputChange('transportDetails', 'vehicle', 'registrationNumber', e.target.value)}
                  className="input-field"
                  placeholder="ABC12345"
                />
              </div>
              <div>
                <label className="form-label">Typ pojazdu</label>
                <select
                  value={formData.transportDetails.vehicle.vehicleType}
                  onChange={(e) => handleNestedInputChange('transportDetails', 'vehicle', 'vehicleType', e.target.value)}
                  className="input-field"
                >
                  <option value="TRUCK">Ciężarówka</option>
                  <option value="TRAILER">Naczepa</option>
                  <option value="VAN">Furgonetka</option>
                  <option value="CAR">Samochód osobowy</option>
                </select>
              </div>
              <div>
                <label className="form-label">Ładowność</label>
                <input
                  type="number"
                  value={formData.transportDetails.vehicle.capacity}
                  onChange={(e) => handleNestedInputChange('transportDetails', 'vehicle', 'capacity', parseInt(e.target.value))}
                  className="input-field"
                  placeholder="1000"
                />
              </div>
              <div>
                <label className="form-label">Imię kierowcy</label>
                <input
                  type="text"
                  value={formData.transportDetails.driver.firstName}
                  onChange={(e) => handleNestedInputChange('transportDetails', 'driver', 'firstName', e.target.value)}
                  className="input-field"
                  placeholder="Jan"
                />
              </div>
              <div>
                <label className="form-label">Nazwisko kierowcy</label>
                <input
                  type="text"
                  value={formData.transportDetails.driver.lastName}
                  onChange={(e) => handleNestedInputChange('transportDetails', 'driver', 'lastName', e.target.value)}
                  className="input-field"
                  placeholder="Kowalski"
                />
              </div>
              <div>
                <label className="form-label">Numer prawa jazdy</label>
                <input
                  type="text"
                  value={formData.transportDetails.driver.licenseNumber}
                  onChange={(e) => handleNestedInputChange('transportDetails', 'driver', 'licenseNumber', e.target.value)}
                  className="input-field"
                  placeholder="ABC123456"
                />
              </div>
              <div>
                <label className="form-label">Kategoria prawa jazdy</label>
                <input
                  type="text"
                  value={formData.transportDetails.driver.licenseType}
                  onChange={(e) => handleNestedInputChange('transportDetails', 'driver', 'licenseType', e.target.value)}
                  className="input-field"
                  placeholder="C"
                />
              </div>
              <div>
                <label className="form-label">Telefon kierowcy</label>
                <input
                  type="tel"
                  value={formData.transportDetails.driver.phone}
                  onChange={(e) => handleNestedInputChange('transportDetails', 'driver', 'phone', e.target.value)}
                  className="input-field"
                  placeholder="+48 111 222 333"
                />
              </div>
              <div>
                <label className="form-label">Email kierowcy</label>
                <input
                  type="email"
                  value={formData.transportDetails.driver.email}
                  onChange={(e) => handleNestedInputChange('transportDetails', 'driver', 'email', e.target.value)}
                  className="input-field"
                  placeholder="jan.kowalski@firma.pl"
                />
              </div>
              <div>
                <label className="form-label">Miejsce załadunku</label>
                <input
                  type="text"
                  value={formData.transportDetails.route.loadingPlace}
                  onChange={(e) => handleNestedInputChange('transportDetails', 'route', 'loadingPlace', e.target.value)}
                  className="input-field"
                  placeholder="Warszawa, PL"
                />
              </div>
              <div>
                <label className="form-label">Miejsce rozładunku</label>
                <input
                  type="text"
                  value={formData.transportDetails.route.unloadingPlace}
                  onChange={(e) => handleNestedInputChange('transportDetails', 'route', 'unloadingPlace', e.target.value)}
                  className="input-field"
                  placeholder="Kraków, PL"
                />
              </div>
              <div>
                <label className="form-label">Planowana data wyjazdu</label>
                <input
                  type="datetime-local"
                  value={formData.transportDetails.route.plannedDepartureDate}
                  onChange={(e) => handleNestedInputChange('transportDetails', 'route', 'plannedDepartureDate', e.target.value)}
                  className="input-field"
                />
              </div>
              <div>
                <label className="form-label">Planowana data przyjazdu</label>
                <input
                  type="datetime-local"
                  value={formData.transportDetails.route.plannedArrivalDate}
                  onChange={(e) => handleNestedInputChange('transportDetails', 'route', 'plannedArrivalDate', e.target.value)}
                  className="input-field"
                />
              </div>
            </div>
          </div>

          {/* Towary */}
          <div className="border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Opis Towarów</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="form-label">Opis towarów</label>
                <textarea
                  value={formData.goods.description}
                  onChange={(e) => handleInputChange('goods', 'description', e.target.value)}
                  className="input-field"
                  rows={3}
                  placeholder="Szczegółowy opis przewożonych towarów..."
                />
              </div>
              <div>
                <label className="form-label">Ilość</label>
                <input
                  type="number"
                  value={formData.goods.quantity}
                  onChange={(e) => handleInputChange('goods', 'quantity', parseInt(e.target.value))}
                  className="input-field"
                  placeholder="100"
                />
              </div>
              <div>
                <label className="form-label">Jednostka</label>
                <select
                  value={formData.goods.unit}
                  onChange={(e) => handleInputChange('goods', 'unit', e.target.value)}
                  className="input-field"
                >
                  <option value="kg">kg</option>
                  <option value="t">tony</option>
                  <option value="szt">sztuki</option>
                  <option value="m3">m³</option>
                  <option value="l">litry</option>
                </select>
              </div>
              <div>
                <label className="form-label">Wartość</label>
                <input
                  type="number"
                  value={formData.goods.value}
                  onChange={(e) => handleInputChange('goods', 'value', parseFloat(e.target.value))}
                  className="input-field"
                  placeholder="1000"
                />
              </div>
              <div>
                <label className="form-label">Waluta</label>
                <select
                  value={formData.goods.currency}
                  onChange={(e) => handleInputChange('goods', 'currency', e.target.value)}
                  className="input-field"
                >
                  <option value="PLN">PLN</option>
                  <option value="EUR">EUR</option>
                  <option value="USD">USD</option>
                </select>
              </div>
              <div>
                <label className="form-label">Kod towarowy</label>
                <input
                  type="text"
                  value={formData.goods.commodityCode}
                  onChange={(e) => handleInputChange('goods', 'commodityCode', e.target.value)}
                  className="input-field"
                  placeholder="8708.99"
                />
              </div>
              <div>
                <label className="form-label">Typ opakowania</label>
                <input
                  type="text"
                  value={formData.goods.packagingType}
                  onChange={(e) => handleInputChange('goods', 'packagingType', e.target.value)}
                  className="input-field"
                  placeholder="PALETES"
                />
              </div>
              <div>
                <label className="form-label">Liczba opakowań</label>
                <input
                  type="number"
                  value={formData.goods.numberOfPackages}
                  onChange={(e) => handleInputChange('goods', 'numberOfPackages', parseInt(e.target.value))}
                  className="input-field"
                  placeholder="10"
                />
              </div>
            </div>
          </div>

          {/* Przycisk wysłania */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setFormData({
                sender: { entityType: 'COMPANY', nip: '', regon: '', name: '', address: { street: '', buildingNumber: '', apartmentNumber: '', postalCode: '', city: '', country: 'PL' }, contactPerson: '', phone: '', email: '' },
                receiver: { entityType: 'COMPANY', nip: '', regon: '', name: '', address: { street: '', buildingNumber: '', apartmentNumber: '', postalCode: '', city: '', country: 'PL' }, contactPerson: '', phone: '', email: '' },
                transportDetails: { transportType: 'ROAD', vehicle: { registrationNumber: '', vehicleType: 'TRUCK', capacity: 0, capacityUnit: 'kg' }, driver: { firstName: '', lastName: '', licenseNumber: '', licenseType: '', phone: '', email: '' }, route: { loadingPlace: '', unloadingPlace: '', plannedDepartureDate: '', plannedArrivalDate: '' } },
                goods: { description: '', quantity: 0, unit: 'kg', value: 0, currency: 'PLN', customsValue: 0, customsCurrency: 'PLN', commodityCode: '', packagingType: '', numberOfPackages: 0 }
              })}
              className="btn-secondary"
            >
              Wyczyść
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary disabled:opacity-50"
            >
              {isSubmitting ? 'Przygotowywanie...' : 'Przygotuj Deklarację SENT 100'}
            </button>
          </div>
        </form>

        {/* Wynik wysłania */}
        {submitResult && (
          <div className={`mt-6 p-4 rounded-lg border ${
            submitResult.success 
              ? 'bg-green-50 border-green-200' 
              : 'bg-red-50 border-red-200'
          }`}>
            <h3 className="font-semibold">
              {submitResult.success ? '✅ Sukces' : '❌ Błąd'}
            </h3>
            <p className="text-sm mt-2">{submitResult.message}</p>
            {submitResult.declarationNumber && (
              <p className="text-sm mt-2">
                <strong>Numer deklaracji:</strong> {submitResult.declarationNumber}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}; 