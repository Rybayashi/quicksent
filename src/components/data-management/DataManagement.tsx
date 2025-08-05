import React, { useState, useEffect } from 'react';

interface Contractor {
  id: string;
  name: string;
  nip: string;
  regon?: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phone?: string;
  email?: string;
  type: 'sender' | 'receiver' | 'both';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  type: 'warehouse' | 'office' | 'terminal' | 'custom';
  isActive: boolean;
}

interface Product {
  id: string;
  name: string;
  description?: string;
  hsCode: string;
  weight: number;
  volume: number;
  dangerous: boolean;
  temperature?: {
    min: number;
    max: number;
  };
  category: string;
  isActive: boolean;
}

interface Vehicle {
  id: string;
  plateNumber: string;
  type: 'truck' | 'trailer' | 'container';
  capacity: number;
  driver?: {
    name: string;
    license: string;
    phone: string;
  };
  isActive: boolean;
}

interface TransportTemplate {
  id: string;
  name: string;
  description?: string;
  senderId: string;
  receiverId: string;
  products: string[];
  route: {
    origin: string;
    destination: string;
    waypoints?: string[];
  };
  vehicleId?: string;
  isActive: boolean;
  usageCount: number;
  lastUsed?: Date;
}

type DataType = 'contractors' | 'locations' | 'products' | 'vehicles' | 'templates';

export const DataManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<DataType>('contractors');
  const [contractors, setContractors] = useState<Contractor[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [templates, setTemplates] = useState<TransportTemplate[]>([]);
  // State for future functionality
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState<string>('');
  // const [showModal, setShowModal] = useState(false);
  // const [editingItem, setEditingItem] = useState<any>(null);

  // Symulowane dane
  useEffect(() => {
    const mockContractors: Contractor[] = [
      {
        id: '1',
        name: 'DB Schenker Sp. z o.o.',
        nip: '5260300311',
        regon: '012345678',
        address: 'ul. Puławska 17',
        city: 'Warszawa',
        postalCode: '02-515',
        country: 'PL',
        phone: '+48 22 123 45 67',
        email: 'kontakt@dbschenker.pl',
        type: 'both',
        isActive: true,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01')
      },
      {
        id: '2',
        name: 'ABC Logistics',
        nip: '1234567890',
        address: 'ul. Transportowa 5',
        city: 'Kraków',
        postalCode: '30-001',
        country: 'PL',
        phone: '+48 12 345 67 89',
        email: 'info@abclogistics.pl',
        type: 'sender',
        isActive: true,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01')
      }
    ];

    const mockLocations: Location[] = [
      {
        id: '1',
        name: 'Magazyn Centralny Warszawa',
        address: 'ul. Puławska 17',
        city: 'Warszawa',
        postalCode: '02-515',
        country: 'PL',
        coordinates: { lat: 52.2297, lng: 21.0122 },
        type: 'warehouse',
        isActive: true
      },
      {
        id: '2',
        name: 'Terminal Kraków',
        address: 'ul. Transportowa 5',
        city: 'Kraków',
        postalCode: '30-001',
        country: 'PL',
        coordinates: { lat: 50.0647, lng: 19.9450 },
        type: 'terminal',
        isActive: true
      }
    ];

    const mockProducts: Product[] = [
      {
        id: '1',
        name: 'Elektronika',
        description: 'Urządzenia elektroniczne',
        hsCode: '8517.12.00',
        weight: 100,
        volume: 0.5,
        dangerous: false,
        category: 'Electronics',
        isActive: true
      },
      {
        id: '2',
        name: 'Chemikalia',
        description: 'Substancje chemiczne',
        hsCode: '2815.11.00',
        weight: 50,
        volume: 0.2,
        dangerous: true,
        temperature: { min: 15, max: 25 },
        category: 'Chemicals',
        isActive: true
      }
    ];

    const mockVehicles: Vehicle[] = [
      {
        id: '1',
        plateNumber: 'WA 12345',
        type: 'truck',
        capacity: 24000,
        driver: {
          name: 'Jan Kowalski',
          license: 'C+E',
          phone: '+48 123 456 789'
        },
        isActive: true
      },
      {
        id: '2',
        plateNumber: 'KR 67890',
        type: 'trailer',
        capacity: 24000,
        isActive: true
      }
    ];

    const mockTemplates: TransportTemplate[] = [
      {
        id: '1',
        name: 'Warszawa - Kraków (Elektronika)',
        description: 'Standardowa trasa dla elektroniki',
        senderId: '1',
        receiverId: '2',
        products: ['1'],
        route: {
          origin: 'Warszawa',
          destination: 'Kraków'
        },
        vehicleId: '1',
        isActive: true,
        usageCount: 15,
        lastUsed: new Date('2025-01-03')
      }
    ];

    setContractors(mockContractors);
    setLocations(mockLocations);
    setProducts(mockProducts);
    setVehicles(mockVehicles);
    setTemplates(mockTemplates);
  }, []);

  const tabs = [
    { id: 'contractors', name: 'Kontrahenci', icon: '👥', description: 'Nadawcy i odbiorcy' },
    { id: 'locations', name: 'Lokalizacje', icon: '📍', description: 'Adresy i punkty' },
    { id: 'products', name: 'Produkty', icon: '📦', description: 'Towary i klasyfikacje' },
    { id: 'vehicles', name: 'Pojazdy', icon: '🚛', description: 'Samochody i kierowcy' },
    { id: 'templates', name: 'Szablony', icon: '📋', description: 'Szablony przewozów' }
  ];

  const renderContractorsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Kontrahenci</h3>
        <button
                          onClick={() => {
                  // setEditingItem(null);
                  // setShowModal(true);
                }}
          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md"
        >
          Dodaj Kontrahenta
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nazwa
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                NIP
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Typ
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Akcje
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {contractors.map((contractor) => (
              <tr key={contractor.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{contractor.name}</div>
                  <div className="text-sm text-gray-500">{contractor.city}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {contractor.nip}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    contractor.type === 'sender' ? 'bg-blue-100 text-blue-800' :
                    contractor.type === 'receiver' ? 'bg-green-100 text-green-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {contractor.type === 'sender' ? 'Nadawca' :
                     contractor.type === 'receiver' ? 'Odbiorca' : 'Oba'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    contractor.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {contractor.isActive ? 'Aktywny' : 'Nieaktywny'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-primary-600 hover:text-primary-900 mr-3">Edytuj</button>
                  <button className="text-red-600 hover:text-red-900">Usuń</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderLocationsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Lokalizacje</h3>
        <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md">
          Dodaj Lokalizację
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {locations.map((location) => (
          <div key={location.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-medium text-gray-900">{location.name}</h4>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                location.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {location.isActive ? 'Aktywna' : 'Nieaktywna'}
              </span>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <p>{location.address}</p>
              <p>{location.postalCode} {location.city}</p>
              <p>{location.country}</p>
              <p className="text-xs text-gray-500 capitalize">{location.type}</p>
            </div>
            <div className="mt-4 flex space-x-2">
              <button className="text-primary-600 hover:text-primary-900 text-sm">Edytuj</button>
              <button className="text-red-600 hover:text-red-900 text-sm">Usuń</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderProductsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Produkty</h3>
        <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md">
          Dodaj Produkt
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nazwa
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kod HS
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Waga/Objętość
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Niebezpieczny
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Akcje
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{product.name}</div>
                  <div className="text-sm text-gray-500">{product.description}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {product.hsCode}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {product.weight}kg / {product.volume}m³
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    product.dangerous ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {product.dangerous ? 'Tak' : 'Nie'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-primary-600 hover:text-primary-900 mr-3">Edytuj</button>
                  <button className="text-red-600 hover:text-red-900">Usuń</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderVehiclesTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Pojazdy</h3>
        <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md">
          Dodaj Pojazd
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map((vehicle) => (
          <div key={vehicle.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-medium text-gray-900">{vehicle.plateNumber}</h4>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                vehicle.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {vehicle.isActive ? 'Aktywny' : 'Nieaktywny'}
              </span>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <p>Typ: {vehicle.type}</p>
              <p>Ładowność: {vehicle.capacity}kg</p>
              {vehicle.driver && (
                <div>
                  <p>Kierowca: {vehicle.driver.name}</p>
                  <p>Prawo jazdy: {vehicle.driver.license}</p>
                  <p>Tel: {vehicle.driver.phone}</p>
                </div>
              )}
            </div>
            <div className="mt-4 flex space-x-2">
              <button className="text-primary-600 hover:text-primary-900 text-sm">Edytuj</button>
              <button className="text-red-600 hover:text-red-900 text-sm">Usuń</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTemplatesTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Szablony Przewozów</h3>
        <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md">
          Dodaj Szablon
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {templates.map((template) => (
          <div key={template.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-medium text-gray-900">{template.name}</h4>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                template.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {template.isActive ? 'Aktywny' : 'Nieaktywny'}
              </span>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <p>{template.description}</p>
              <p>Trasa: {template.route.origin} → {template.route.destination}</p>
              <p>Użycia: {template.usageCount}</p>
              {template.lastUsed && (
                <p>Ostatnio użyty: {template.lastUsed.toLocaleDateString('pl-PL')}</p>
              )}
            </div>
            <div className="mt-4 flex space-x-2">
              <button className="text-primary-600 hover:text-primary-900 text-sm">Użyj</button>
              <button className="text-primary-600 hover:text-primary-900 text-sm">Edytuj</button>
              <button className="text-red-600 hover:text-red-900 text-sm">Usuń</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'contractors':
        return renderContractorsTab();
      case 'locations':
        return renderLocationsTab();
      case 'products':
        return renderProductsTab();
      case 'vehicles':
        return renderVehiclesTab();
      case 'templates':
        return renderTemplatesTab();
      default:
        return renderContractorsTab();
    }
  };

  return (
    <div className="space-y-6">
      {/* Nagłówek */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Zarządzanie Danymi</h2>
        <p className="text-gray-600">Zarządzaj kontrahentami, lokalizacjami, produktami i szablonami</p>
      </div>

      {/* Zakładki */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as DataType)}
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

      {/* Zawartość */}
      {renderTabContent()}

      {/* Statystyki */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                  <span className="text-white text-sm font-medium">👥</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Kontrahenci</dt>
                  <dd className="text-lg font-medium text-gray-900">{contractors.length}</dd>
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
                  <span className="text-white text-sm font-medium">📍</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Lokalizacje</dt>
                  <dd className="text-lg font-medium text-gray-900">{locations.length}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                  <span className="text-white text-sm font-medium">📦</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Produkty</dt>
                  <dd className="text-lg font-medium text-gray-900">{products.length}</dd>
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
                  <span className="text-white text-sm font-medium">🚛</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Pojazdy</dt>
                  <dd className="text-lg font-medium text-gray-900">{vehicles.length}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-indigo-500 rounded-md flex items-center justify-center">
                  <span className="text-white text-sm font-medium">📋</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Szablony</dt>
                  <dd className="text-lg font-medium text-gray-900">{templates.length}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 