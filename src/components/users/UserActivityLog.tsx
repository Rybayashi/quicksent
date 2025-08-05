import React, { useState, useEffect } from 'react';
import type { ActivityLog, AuditTrail } from '../../types/user';

interface UserActivityLogProps {
  userId?: string;
  showAuditTrail?: boolean;
}

export const UserActivityLog: React.FC<UserActivityLogProps> = ({ showAuditTrail = false }) => {
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [auditTrail, setAuditTrail] = useState<AuditTrail[]>([]);
  // State for future functionality
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'activities' | 'audit'>('activities');

  // Symulowane dane aktywności
  const mockActivities: ActivityLog[] = [
    {
      id: '1',
      userId: 'user1',
      userName: 'Jan Kowalski',
      action: 'login',
      resource: 'system',
      details: { ipAddress: '192.168.1.100', userAgent: 'Mozilla/5.0...' },
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      timestamp: new Date('2025-01-04T14:30:00'),
      success: true
    },
    {
      id: '2',
      userId: 'user1',
      userName: 'Jan Kowalski',
      action: 'create_declaration',
      resource: 'sent100',
      details: { declarationId: 'QS_1736012345', type: 'SENT 100' },
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      timestamp: new Date('2025-01-04T12:15:00'),
      success: true
    },
    {
      id: '3',
      userId: 'user1',
      userName: 'Jan Kowalski',
      action: 'edit_declaration',
      resource: 'sentedit',
      details: { declarationId: 'QS_1736012340', changes: ['sender_address', 'receiver_address'] },
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      timestamp: new Date('2025-01-04T10:45:00'),
      success: true
    }
  ];

  // Symulowane dane audytu
  const mockAuditTrail: AuditTrail[] = [
    {
      id: '1',
      userId: 'user1',
      userName: 'Jan Kowalski',
      action: 'update',
      tableName: 'users',
      recordId: 'user1',
      oldValues: { firstName: 'Jan', lastName: 'Kowalski' },
      newValues: { firstName: 'Jan', lastName: 'Nowak' },
      ipAddress: '192.168.1.100',
      timestamp: new Date('2025-01-04T09:30:00')
    },
    {
      id: '2',
      userId: 'user1',
      userName: 'Jan Kowalski',
      action: 'create',
      tableName: 'declarations',
      recordId: 'QS_1736012345',
      newValues: { type: 'SENT 100', status: 'draft' },
      ipAddress: '192.168.1.100',
      timestamp: new Date('2025-01-04T08:15:00')
    }
  ];

  useEffect(() => {
    setActivities(mockActivities);
    setAuditTrail(mockAuditTrail);
  }, []);

  const getActionIcon = (action: string) => {
    const icons: Record<string, string> = {
      login: '🔐',
      logout: '🚪',
      create: '➕',
      update: '✏️',
      delete: '🗑️',
      create_declaration: '📝',
      edit_declaration: '✏️',
      password_change: '🔑'
    };
    return icons[action] || '📋';
  };

  const getActionColor = (action: string) => {
    const colors: Record<string, string> = {
      login: 'bg-green-100 text-green-800',
      logout: 'bg-gray-100 text-gray-800',
      create: 'bg-blue-100 text-blue-800',
      update: 'bg-yellow-100 text-yellow-800',
      delete: 'bg-red-100 text-red-800',
      create_declaration: 'bg-purple-100 text-purple-800',
      edit_declaration: 'bg-orange-100 text-orange-800',
      password_change: 'bg-indigo-100 text-indigo-800'
    };
    return colors[action] || 'bg-gray-100 text-gray-800';
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Przed chwilą';
    if (minutes < 60) return `${minutes} min temu`;
    if (hours < 24) return `${hours} godz. temu`;
    if (days < 7) return `${days} dni temu`;
    return timestamp.toLocaleDateString('pl-PL');
  };

  return (
    <div className="space-y-6">
      {/* Nagłówek */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Historia Aktywności</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('activities')}
            className={`px-4 py-2 rounded-md font-medium ${
              activeTab === 'activities'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Aktywność
          </button>
          {showAuditTrail && (
            <button
              onClick={() => setActiveTab('audit')}
              className={`px-4 py-2 rounded-md font-medium ${
                activeTab === 'audit'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Audyt
            </button>
          )}
        </div>
      </div>

      {/* Zawartość */}
      {activeTab === 'activities' && (
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flow-root">
              <ul className="-mb-8">
                {activities.map((activity, index) => (
                  <li key={activity.id}>
                    <div className="relative pb-8">
                      {index < activities.length - 1 && (
                        <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                      )}
                      <div className="relative flex space-x-3">
                        <div>
                          <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${getActionColor(activity.action)}`}>
                            <span className="text-sm font-medium">{getActionIcon(activity.action)}</span>
                          </span>
                        </div>
                        <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                          <div>
                            <p className="text-sm text-gray-500">
                              <span className="font-medium text-gray-900 capitalize">
                                {activity.action.replace('_', ' ')}
                              </span>
                              {activity.details && (
                                <span className="text-gray-500">
                                  {' '}
                                  {activity.details.declarationId && `- ${activity.details.declarationId}`}
                                  {activity.details.type && ` (${activity.details.type})`}
                                </span>
                              )}
                            </p>
                            {activity.ipAddress && (
                              <p className="text-xs text-gray-400">
                                IP: {activity.ipAddress}
                              </p>
                            )}
                          </div>
                          <div className="text-right text-sm whitespace-nowrap text-gray-500">
                            <time dateTime={activity.timestamp.toISOString()}>
                              {formatTimestamp(activity.timestamp)}
                            </time>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'audit' && showAuditTrail && (
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Akcja
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Zasób
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Zmiany
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Data
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {auditTrail.map((audit) => (
                    <tr key={audit.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getActionColor(audit.action)}`}>
                          {getActionIcon(audit.action)} {audit.action}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {audit.tableName} {audit.recordId && `(${audit.recordId})`}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {audit.oldValues && audit.newValues ? (
                          <div className="text-xs">
                            <div className="text-red-600">
                              - {Object.entries(audit.oldValues).map(([key, value]) => `${key}: ${value}`).join(', ')}
                            </div>
                            <div className="text-green-600">
                              + {Object.entries(audit.newValues).map(([key, value]) => `${key}: ${value}`).join(', ')}
                            </div>
                          </div>
                        ) : (
                          audit.newValues ? 'Utworzono' : 'Usunięto'
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatTimestamp(audit.timestamp)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

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
                  <dt className="text-sm font-medium text-gray-500 truncate">Dzisiejsze logowania</dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {activities.filter(a => a.action === 'login' && a.timestamp.toDateString() === new Date().toDateString()).length}
                  </dd>
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
                  <span className="text-white text-sm font-medium">📝</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Utworzone deklaracje</dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {activities.filter(a => a.action === 'create_declaration').length}
                  </dd>
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
                  <span className="text-white text-sm font-medium">✏️</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Edycje</dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {activities.filter(a => a.action === 'edit_declaration' || a.action === 'update').length}
                  </dd>
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
                  <span className="text-white text-sm font-medium">🔍</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Wszystkie akcje</dt>
                  <dd className="text-lg font-medium text-gray-900">{activities.length}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 