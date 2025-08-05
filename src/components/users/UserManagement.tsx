import React, { useState, useEffect } from 'react';
import type { User, UserRole, UserStatus, RoleDefinition, ActivityLog, Company } from '../../types/user';

interface UserManagementProps {
  currentUser: User;
}

const UserManagement: React.FC<UserManagementProps> = ({ currentUser: _currentUser }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'users' | 'roles' | 'activity' | 'companies'>('users');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<UserRole | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<UserStatus | 'all'>('all');

  // Role definitions with permissions
  const roleDefinitions: RoleDefinition[] = [
    {
      role: 'admin',
      name: 'Administrator',
      description: 'Pełny dostęp do wszystkich funkcji systemu',
      permissions: [
        'users.manage', 'users.view', 'sent.create', 'sent.edit', 'sent.delete', 'sent.view', 'sent.approve',
        'data.manage', 'data.import', 'data.export', 'reports.view', 'reports.create', 'audit.view',
        'settings.manage', 'api.access', 'notifications.send'
      ],
      isDefault: false,
      canBeAssigned: true
    },
    {
      role: 'kierownik',
      name: 'Kierownik',
      description: 'Zarządzanie zespołem i zatwierdzanie zgłoszeń',
      permissions: [
        'users.view', 'sent.create', 'sent.edit', 'sent.view', 'sent.approve',
        'data.manage', 'data.import', 'data.export', 'reports.view', 'reports.create',
        'audit.view', 'notifications.send'
      ],
      isDefault: false,
      canBeAssigned: true
    },
    {
      role: 'spedytor',
      name: 'Spedytor',
      description: 'Tworzenie i zarządzanie zgłoszeniami SENT',
      permissions: [
        'sent.create', 'sent.edit', 'sent.view', 'data.manage', 'reports.view'
      ],
      isDefault: true,
      canBeAssigned: true
    },
    {
      role: 'kierowca',
      name: 'Kierowca',
      description: 'Przeglądanie swoich zgłoszeń',
      permissions: [
        'sent.view'
      ],
      isDefault: false,
      canBeAssigned: true
    },
    {
      role: 'audytor',
      name: 'Audytor',
      description: 'Przeglądanie wszystkich danych i raportów',
      permissions: [
        'users.view', 'sent.view', 'data.manage', 'reports.view', 'reports.create', 'audit.view'
      ],
      isDefault: false,
      canBeAssigned: true
    },
    {
      role: 'klient',
      name: 'Klient',
      description: 'Ograniczony dostęp do własnych danych',
      permissions: [
        'sent.view'
      ],
      isDefault: false,
      canBeAssigned: true
    },
    {
      role: 'support',
      name: 'Wsparcie Techniczne',
      description: 'Pomoc techniczna i podstawowe zarządzanie',
      permissions: [
        'users.view', 'sent.view', 'reports.view', 'audit.view'
      ],
      isDefault: false,
      canBeAssigned: true
    }
  ];

  // Simulated data
  useEffect(() => {
    // Simulate loading users
    const mockUsers: User[] = [
      {
        id: '1',
        email: 'admin@quicksent.pl',
        firstName: 'Jan',
        lastName: 'Kowalski',
        role: 'admin',
        status: 'active',
        permissions: {
          'users.manage': true,
          'users.view': true,
          'sent.create': true,
          'sent.edit': true,
          'sent.delete': true,
          'sent.view': true,
          'sent.approve': true,
          'data.manage': true,
          'data.import': true,
          'data.export': true,
          'reports.view': true,
          'reports.create': true,
          'audit.view': true,
          'settings.manage': true,
          'api.access': true,
          'notifications.send': true
        },
        phone: '+48 123 456 789',
        lastLoginAt: new Date(),
        loginAttempts: 0,
        preferences: {
          language: 'pl',
          timezone: 'Europe/Warsaw',
          theme: 'light',
          notifications: { email: true, sms: false, push: true }
        },
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date()
      },
      {
        id: '2',
        email: 'spedytor@quicksent.pl',
        firstName: 'Anna',
        lastName: 'Nowak',
        role: 'spedytor',
        status: 'active',
        permissions: {
          'sent.create': true,
          'sent.edit': true,
          'sent.view': true,
          'data.manage': true,
          'reports.view': true
        },
        phone: '+48 987 654 321',
        lastLoginAt: new Date(Date.now() - 86400000),
        loginAttempts: 0,
        preferences: {
          language: 'pl',
          timezone: 'Europe/Warsaw',
          theme: 'auto',
          notifications: { email: true, sms: true, push: false }
        },
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date()
      }
    ];

    const mockCompanies: Company[] = [
      {
        id: '1',
        name: 'QuickSent Sp. z o.o.',
        nip: '1234567890',
        regon: '123456789',
        address: {
          street: 'ul. Przykładowa 1',
          city: 'Warszawa',
          postalCode: '00-001',
          country: 'Polska'
        },
        contact: {
          email: 'kontakt@quicksent.pl',
          phone: '+48 22 123 45 67',
          website: 'https://quicksent.pl'
        },
        settings: {
          defaultCurrency: 'PLN',
          timezone: 'Europe/Warsaw',
          language: 'pl',
          notifications: { email: true, sms: true, push: true }
        },
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date()
      }
    ];

    const mockActivityLogs: ActivityLog[] = [
      {
        id: '1',
        userId: '1',
        userName: 'Jan Kowalski',
        action: 'login',
        resource: 'auth',
        details: {},
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        timestamp: new Date(),
        success: true
      },
      {
        id: '2',
        userId: '2',
        userName: 'Anna Nowak',
        action: 'create_sent',
        resource: 'sent',
        resourceId: 'SENT001',
        details: { declarationType: 'SENT100' },
        ipAddress: '192.168.1.101',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        timestamp: new Date(Date.now() - 3600000),
        success: true
      }
    ];

    setUsers(mockUsers);
    setCompanies(mockCompanies);
    setActivityLogs(mockActivityLogs);
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleCreateUser = () => {
    setSelectedUser(null);
    setShowUserModal(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const handleSaveUser = (userData: Partial<User>) => {
    if (selectedUser) {
      // Update existing user
      setUsers(prev => prev.map(u => u.id === selectedUser.id ? { ...u, ...userData } : u));
    } else {
      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        email: userData.email!,
        firstName: userData.firstName!,
        lastName: userData.lastName!,
        role: userData.role!,
        status: 'pending',
        permissions: {
          'sent.view': true
        },
        loginAttempts: 0,
        preferences: {
          language: 'pl',
          timezone: 'Europe/Warsaw',
          theme: 'light',
          notifications: { email: true, sms: false, push: true }
        },
        createdAt: new Date(),
        updatedAt: new Date()
      };
      setUsers(prev => [...prev, newUser]);
    }
    setShowUserModal(false);
  };

  const getStatusColor = (status: UserStatus) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'suspended': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-blue-100 text-blue-800';
      case 'blocked': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'kierownik': return 'bg-purple-100 text-purple-800';
      case 'spedytor': return 'bg-blue-100 text-blue-800';
      case 'kierowca': return 'bg-green-100 text-green-800';
      case 'audytor': return 'bg-orange-100 text-orange-800';
      case 'klient': return 'bg-gray-100 text-gray-800';
      case 'support': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Zarządzanie Użytkownikami</h2>
        <button
          onClick={handleCreateUser}
          className="btn-primary"
        >
          Dodaj Użytkownika
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'users', name: 'Użytkownicy' },
            { id: 'roles', name: 'Role i Uprawnienia' },
            { id: 'activity', name: 'Aktywność' },
            { id: 'companies', name: 'Firmy' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      {activeTab === 'users' && (
        <div className="space-y-4">
          {/* Filters */}
          <div className="flex gap-4 items-center">
            <input
              type="text"
              placeholder="Szukaj użytkowników..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field max-w-md"
            />
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value as UserRole | 'all')}
              className="input-field max-w-xs"
            >
              <option value="all">Wszystkie role</option>
              {roleDefinitions.map(role => (
                <option key={role.role} value={role.role}>{role.name}</option>
              ))}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as UserStatus | 'all')}
              className="input-field max-w-xs"
            >
              <option value="all">Wszystkie statusy</option>
              <option value="active">Aktywny</option>
              <option value="inactive">Nieaktywny</option>
              <option value="suspended">Zawieszony</option>
              <option value="pending">Oczekujący</option>
              <option value="blocked">Zablokowany</option>
            </select>
          </div>

          {/* Users Table */}
          <div className="card">
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Użytkownik</th>
                    <th>Rola</th>
                    <th>Status</th>
                    <th>Ostatnie logowanie</th>
                    <th>Akcje</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map(user => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td>
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-700">
                              {user.firstName[0]}{user.lastName[0]}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {user.firstName} {user.lastName}
                            </div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                          {roleDefinitions.find(r => r.role === user.role)?.name || user.role}
                        </span>
                      </td>
                      <td>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="text-sm text-gray-500">
                        {user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleString('pl-PL') : 'Nigdy'}
                      </td>
                      <td>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditUser(user)}
                            className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                          >
                            Edytuj
                          </button>
                          <button
                            onClick={() => setShowActivityModal(true)}
                            className="text-green-600 hover:text-green-900 text-sm font-medium"
                          >
                            Aktywność
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'roles' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roleDefinitions.map(role => (
              <div key={role.role} className="card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">{role.name}</h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(role.role)}`}>
                    {role.role}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-4">{role.description}</p>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-900">Uprawnienia:</h4>
                  <div className="flex flex-wrap gap-1">
                    {role.permissions.map(permission => (
                      <span
                        key={permission}
                        className="inline-flex items-center px-2 py-1 rounded text-xs bg-blue-100 text-blue-800"
                      >
                        {permission}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'activity' && (
        <div className="space-y-4">
          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Ostatnia Aktywność</h3>
            <div className="space-y-3">
              {activityLogs.map(log => (
                <div key={log.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${log.success ? 'bg-green-400' : 'bg-red-400'}`}></div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {log.userName} - {log.action}
                      </div>
                      <div className="text-xs text-gray-500">
                        {log.resource} • {new Date(log.timestamp).toLocaleString('pl-PL')}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {log.ipAddress}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'companies' && (
        <div className="space-y-4">
          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Firmy</h3>
            <div className="space-y-4">
              {companies.map(company => (
                <div key={company.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">{company.name}</h4>
                      <p className="text-sm text-gray-600">NIP: {company.nip}</p>
                      <p className="text-sm text-gray-600">{company.address.street}, {company.address.city}</p>
                    </div>
                    <button className="text-blue-600 hover:text-blue-900 text-sm font-medium">
                      Edytuj
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* User Modal */}
      {showUserModal && (
        <UserModal
          user={selectedUser}
          onSave={handleSaveUser}
          onClose={() => setShowUserModal(false)}
          roleDefinitions={roleDefinitions}
        />
      )}

      {/* Activity Modal */}
      {showActivityModal && (
        <ActivityModal
          logs={activityLogs}
          onClose={() => setShowActivityModal(false)}
        />
      )}
    </div>
  );
};

// User Modal Component
interface UserModalProps {
  user: User | null;
  onSave: (userData: Partial<User>) => void;
  onClose: () => void;
  roleDefinitions: RoleDefinition[];
}

const UserModal: React.FC<UserModalProps> = ({ user, onSave, onClose, roleDefinitions }) => {
  const [formData, setFormData] = useState({
    email: user?.email || '',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    role: user?.role || 'spedytor',
    phone: user?.phone || '',
    status: user?.status || 'pending'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {user ? 'Edytuj Użytkownika' : 'Dodaj Użytkownika'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="form-label">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="input-field"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="form-label">Imię</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="form-label">Nazwisko</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="input-field"
                  required
                />
              </div>
            </div>
            <div>
              <label className="form-label">Rola</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
                className="input-field"
              >
                {roleDefinitions.map(role => (
                  <option key={role.role} value={role.role}>{role.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="form-label">Telefon</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="input-field"
              />
            </div>
            {user && (
              <div>
                <label className="form-label">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as UserStatus })}
                  className="input-field"
                >
                  <option value="active">Aktywny</option>
                  <option value="inactive">Nieaktywny</option>
                  <option value="suspended">Zawieszony</option>
                  <option value="pending">Oczekujący</option>
                  <option value="blocked">Zablokowany</option>
                </select>
              </div>
            )}
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary"
              >
                Anuluj
              </button>
              <button
                type="submit"
                className="btn-primary"
              >
                {user ? 'Zapisz' : 'Dodaj'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Activity Modal Component
interface ActivityModalProps {
  logs: ActivityLog[];
  onClose: () => void;
}

const ActivityModal: React.FC<ActivityModalProps> = ({ logs, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-10 mx-auto p-5 border w-3/4 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Szczegółowa Aktywność</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="max-h-96 overflow-y-auto">
            <div className="space-y-3">
              {logs.map(log => (
                <div key={log.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium text-gray-900">{log.userName}</div>
                      <div className="text-sm text-gray-600">{log.action}</div>
                      <div className="text-xs text-gray-500">
                        {log.resource} {log.resourceId && `• ID: ${log.resourceId}`}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        log.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {log.success ? 'Sukces' : 'Błąd'}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {new Date(log.timestamp).toLocaleString('pl-PL')}
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    IP: {log.ipAddress} • {log.userAgent}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement; 