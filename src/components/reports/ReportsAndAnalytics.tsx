import React, { useState, useEffect } from 'react';

interface ReportData {
  id: string;
  name: string;
  type: 'periodic' | 'on-demand' | 'real-time';
  format: 'pdf' | 'excel' | 'csv';
  lastGenerated?: Date;
  schedule?: string;
  isActive: boolean;
}

interface AnalyticsData {
  totalDeclarations: number;
  approvedDeclarations: number;
  pendingDeclarations: number;
  rejectedDeclarations: number;
  monthlyTrend: { month: string; count: number }[];
  topRoutes: { route: string; count: number }[];
  topProducts: { product: string; count: number }[];
  userActivity: { user: string; declarations: number }[];
}

interface KPI {
  name: string;
  value: number;
  unit: string;
  change: number;
  trend: 'up' | 'down' | 'stable';
}

export const ReportsAndAnalytics: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'reports' | 'analytics' | 'kpi'>('analytics');
  const [reports, setReports] = useState<ReportData[]>([]);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [kpis, setKpis] = useState<KPI[]>([]);
  const [loading, setLoading] = useState(false);
  // State for future functionality
  // const [selectedReport, setSelectedReport] = useState<ReportData | null>(null);
  const [showReportModal, setShowReportModal] = useState(false);

  // Symulowane dane
  useEffect(() => {
    const mockReports: ReportData[] = [
      {
        id: '1',
        name: 'Raport Miesięczny - Deklaracje',
        type: 'periodic',
        format: 'pdf',
        lastGenerated: new Date('2025-01-01'),
        schedule: 'monthly',
        isActive: true
      },
      {
        id: '2',
        name: 'Raport Tygodniowy - Aktywność',
        type: 'periodic',
        format: 'excel',
        lastGenerated: new Date('2025-01-03'),
        schedule: 'weekly',
        isActive: true
      },
      {
        id: '3',
        name: 'Raport Dzienny - Status',
        type: 'real-time',
        format: 'csv',
        lastGenerated: new Date('2025-01-04'),
        isActive: true
      }
    ];

    const mockAnalyticsData: AnalyticsData = {
      totalDeclarations: 156,
      approvedDeclarations: 134,
      pendingDeclarations: 12,
      rejectedDeclarations: 10,
      monthlyTrend: [
        { month: 'Sty', count: 45 },
        { month: 'Lut', count: 52 },
        { month: 'Mar', count: 48 },
        { month: 'Kwi', count: 61 },
        { month: 'Maj', count: 55 },
        { month: 'Cze', count: 58 },
        { month: 'Lip', count: 62 },
        { month: 'Sie', count: 59 },
        { month: 'Wrz', count: 65 },
        { month: 'Paź', count: 58 },
        { month: 'Lis', count: 52 },
        { month: 'Gru', count: 49 }
      ],
      topRoutes: [
        { route: 'Warszawa - Kraków', count: 45 },
        { route: 'Kraków - Gdańsk', count: 32 },
        { route: 'Warszawa - Poznań', count: 28 },
        { route: 'Gdańsk - Wrocław', count: 25 },
        { route: 'Poznań - Łódź', count: 22 }
      ],
      topProducts: [
        { product: 'Elektronika', count: 67 },
        { product: 'Chemikalia', count: 45 },
        { product: 'Tekstylia', count: 38 },
        { product: 'Maszyny', count: 32 },
        { product: 'Żywność', count: 28 }
      ],
      userActivity: [
        { user: 'Jan Kowalski', declarations: 45 },
        { user: 'Anna Nowak', declarations: 38 },
        { user: 'Piotr Wiśniewski', declarations: 32 },
        { user: 'Maria Wójcik', declarations: 28 },
        { user: 'Tomasz Kowalczyk', declarations: 25 }
      ]
    };

    const mockKPIs: KPI[] = [
      {
        name: 'Deklaracje Zatwierdzone',
        value: 134,
        unit: 'szt.',
        change: 12.5,
        trend: 'up'
      },
      {
        name: 'Średni Czas Przetwarzania',
        value: 2.3,
        unit: 'dni',
        change: -8.2,
        trend: 'down'
      },
      {
        name: 'Wskaźnik Sukcesu',
        value: 85.9,
        unit: '%',
        change: 3.1,
        trend: 'up'
      },
      {
        name: 'Aktywni Użytkownicy',
        value: 24,
        unit: 'osób',
        change: 0,
        trend: 'stable'
      }
    ];

    setReports(mockReports);
    setAnalyticsData(mockAnalyticsData);
    setKpis(mockKPIs);
  }, []);

  const generateReport = async (_report: ReportData) => {
    setLoading(true);
    // Symulacja generowania raportu
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
    setShowReportModal(false);
    // Tutaj byłaby logika pobierania pliku
  };

  const renderReportsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Raporty</h3>
        <button
          onClick={() => setShowReportModal(true)}
          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md"
        >
          Nowy Raport
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => (
          <div key={report.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-medium text-gray-900">{report.name}</h4>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                report.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {report.isActive ? 'Aktywny' : 'Nieaktywny'}
              </span>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <p>Typ: {report.type === 'periodic' ? 'Okresowy' : report.type === 'on-demand' ? 'Na żądanie' : 'Real-time'}</p>
              <p>Format: {report.format.toUpperCase()}</p>
              {report.schedule && <p>Harmonogram: {report.schedule}</p>}
              {report.lastGenerated && (
                <p>Ostatnio: {report.lastGenerated.toLocaleDateString('pl-PL')}</p>
              )}
            </div>
            <div className="mt-4 flex space-x-2">
              <button
                onClick={() => generateReport(report)}
                disabled={loading}
                className="bg-primary-600 hover:bg-primary-700 text-white px-3 py-1 rounded text-sm disabled:opacity-50"
              >
                {loading ? 'Generowanie...' : 'Generuj'}
              </button>
              <button className="text-primary-600 hover:text-primary-900 text-sm">Edytuj</button>
              <button className="text-red-600 hover:text-red-900 text-sm">Usuń</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAnalyticsTab = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Analizy i Wykresy</h3>

      {analyticsData && (
        <>
          {/* Trend miesięczny */}
          <div className="bg-white rounded-lg shadow p-6">
            <h4 className="text-lg font-medium text-gray-900 mb-4">Trend Miesięczny - Deklaracje</h4>
            <div className="flex items-end space-x-2 h-32">
              {analyticsData.monthlyTrend.map((item, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div
                    className="bg-primary-600 rounded-t w-full"
                    style={{ height: `${(item.count / 70) * 100}%` }}
                  />
                  <span className="text-xs text-gray-500 mt-1">{item.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top trasy */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Najpopularniejsze Trasy</h4>
              <div className="space-y-3">
                {analyticsData.topRoutes.map((route, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{route.route}</span>
                    <span className="text-sm font-medium text-gray-900">{route.count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Najczęstsze Produkty</h4>
              <div className="space-y-3">
                {analyticsData.topProducts.map((product, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{product.product}</span>
                    <span className="text-sm font-medium text-gray-900">{product.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Aktywność użytkowników */}
          <div className="bg-white rounded-lg shadow p-6">
            <h4 className="text-lg font-medium text-gray-900 mb-4">Aktywność Użytkowników</h4>
            <div className="space-y-3">
              {analyticsData.userActivity.map((user, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{user.user}</span>
                  <span className="text-sm font-medium text-gray-900">{user.declarations} deklaracji</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );

  const renderKPITab = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Kluczowe Wskaźniki Wydajności (KPI)</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-medium text-gray-500">{kpi.name}</h4>
              <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${
                kpi.trend === 'up' ? 'bg-green-100 text-green-800' :
                kpi.trend === 'down' ? 'bg-red-100 text-red-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {kpi.trend === 'up' ? '↗' : kpi.trend === 'down' ? '↘' : '→'}
                {Math.abs(kpi.change)}%
              </span>
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl font-semibold text-gray-900">{kpi.value}</span>
              <span className="ml-1 text-sm text-gray-500">{kpi.unit}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Szczegółowe statystyki */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Status Deklaracji</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Zatwierdzone</span>
              <span className="text-sm font-medium text-green-600">
                {analyticsData?.approvedDeclarations} ({analyticsData ? Math.round((analyticsData.approvedDeclarations / analyticsData.totalDeclarations) * 100) : 0}%)
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Oczekujące</span>
              <span className="text-sm font-medium text-yellow-600">
                {analyticsData?.pendingDeclarations} ({analyticsData ? Math.round((analyticsData.pendingDeclarations / analyticsData.totalDeclarations) * 100) : 0}%)
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Odrzucone</span>
              <span className="text-sm font-medium text-red-600">
                {analyticsData?.rejectedDeclarations} ({analyticsData ? Math.round((analyticsData.rejectedDeclarations / analyticsData.totalDeclarations) * 100) : 0}%)
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Wydajność Systemu</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Średni czas odpowiedzi</span>
              <span className="text-sm font-medium text-gray-900">1.2s</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Dostępność API</span>
              <span className="text-sm font-medium text-green-600">99.8%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Błędy dzisiaj</span>
              <span className="text-sm font-medium text-red-600">3</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Użytkownicy</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Aktywni dzisiaj</span>
              <span className="text-sm font-medium text-gray-900">12</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Nowe logowania</span>
              <span className="text-sm font-medium text-green-600">8</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Sesje aktywne</span>
              <span className="text-sm font-medium text-blue-600">15</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'reports':
        return renderReportsTab();
      case 'analytics':
        return renderAnalyticsTab();
      case 'kpi':
        return renderKPITab();
      default:
        return renderAnalyticsTab();
    }
  };

  return (
    <div className="space-y-6">
      {/* Nagłówek */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Raporty i Analizy</h2>
        <p className="text-gray-600">Generuj raporty, analizuj dane i monitoruj KPI</p>
      </div>

      {/* Zakładki */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('reports')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'reports'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            📊 Raporty
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'analytics'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            📈 Analizy
          </button>
          <button
            onClick={() => setActiveTab('kpi')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'kpi'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            🎯 KPI
          </button>
        </nav>
      </div>

      {/* Zawartość */}
      {renderTabContent()}

      {/* Modal dla nowego raportu */}
      {showReportModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Nowy Raport</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nazwa raportu</label>
                  <input
                    type="text"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Wprowadź nazwę raportu"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Typ raportu</label>
                  <select className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
                    <option value="periodic">Okresowy</option>
                    <option value="on-demand">Na żądanie</option>
                    <option value="real-time">Real-time</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
                  <select className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
                    <option value="pdf">PDF</option>
                    <option value="excel">Excel</option>
                    <option value="csv">CSV</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowReportModal(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
                >
                  Anuluj
                </button>
                <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md">
                  Utwórz
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 