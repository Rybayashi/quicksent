import React, { useState } from 'react';
import { createSentEditDeclaration } from '../../lib/api/puesc';

interface SentEditFormData {
  originalDeclarationNumber: string;
  editReason: 'CORRECTION' | 'CANCELLATION' | 'COMPLETION';
  editDescription: string;
  changes: {
    sender?: {
      name?: string;
      address?: {
        street?: string;
        buildingNumber?: string;
        postalCode?: string;
        city?: string;
      };
      contactPerson?: string;
      phone?: string;
      email?: string;
    };
    receiver?: {
      name?: string;
      address?: {
        street?: string;
        buildingNumber?: string;
        postalCode?: string;
        city?: string;
      };
      contactPerson?: string;
      phone?: string;
      email?: string;
    };
    transportDetails?: {
      vehicle?: {
        registrationNumber?: string;
        capacity?: number;
      };
      driver?: {
        firstName?: string;
        lastName?: string;
        phone?: string;
        email?: string;
      };
      route?: {
        loadingPlace?: string;
        unloadingPlace?: string;
        plannedDepartureDate?: string;
        plannedArrivalDate?: string;
      };
    };
    goods?: {
      description?: string;
      quantity?: number;
      value?: number;
      commodityCode?: string;
    };
  };
}

export const SentEditForm: React.FC = () => {
  const [formData, setFormData] = useState<SentEditFormData>({
    originalDeclarationNumber: '',
    editReason: 'CORRECTION',
    editDescription: '',
    changes: {
      sender: {},
      receiver: {},
      transportDetails: {},
      goods: {},
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    message: string;
    editRequestId?: string;
  } | null>(null);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleChangesInputChange = (section: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      changes: {
        ...prev.changes,
        [section]: {
          ...prev.changes[section as keyof SentEditFormData['changes']],
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
      const editDeclaration = createSentEditDeclaration(
        formData.originalDeclarationNumber,
        formData.changes,
        formData.editReason
      );

      // Symulacja wysłania do PUESC
      await new Promise(resolve => setTimeout(resolve, 2000));

      setSubmitResult({
        success: true,
        message: 'Wniosek o edycję deklaracji został pomyślnie przygotowany',
        editRequestId: editDeclaration.messageHeader.messageId,
      });
    } catch (error) {
      setSubmitResult({
        success: false,
        message: error instanceof Error ? error.message : 'Błąd podczas przygotowywania wniosku o edycję',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="card">
        <h2 className="text-2xl font-bold mb-6">Edycja Deklaracji SENT</h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Podstawowe informacje */}
          <div className="border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Informacje o Edycji</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Numer oryginalnej deklaracji</label>
                <input
                  type="text"
                  value={formData.originalDeclarationNumber}
                  onChange={(e) => handleInputChange('originalDeclarationNumber', e.target.value)}
                  className="input-field"
                  placeholder="QS_1234567890"
                  required
                />
              </div>
              <div>
                <label className="form-label">Powód edycji</label>
                <select
                  value={formData.editReason}
                  onChange={(e) => handleInputChange('editReason', e.target.value)}
                  className="input-field"
                  required
                >
                  <option value="CORRECTION">Korekta danych</option>
                  <option value="CANCELLATION">Anulowanie</option>
                  <option value="COMPLETION">Uzupełnienie</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="form-label">Opis zmian</label>
                <textarea
                  value={formData.editDescription}
                  onChange={(e) => handleInputChange('editDescription', e.target.value)}
                  className="input-field"
                  rows={3}
                  placeholder="Szczegółowy opis wprowadzanych zmian..."
                  required
                />
              </div>
            </div>
          </div>

          {/* Zmiany w danych nadawcy */}
          <div className="border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Zmiany w Danych Nadawcy</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Nowa nazwa</label>
                <input
                  type="text"
                  value={formData.changes.sender?.name || ''}
                  onChange={(e) => handleChangesInputChange('sender', 'name', e.target.value)}
                  className="input-field"
                  placeholder="Nowa nazwa firmy"
                />
              </div>
              <div>
                <label className="form-label">Nowa ulica</label>
                <input
                  type="text"
                  value={formData.changes.sender?.address?.street || ''}
                  onChange={(e) => handleChangesInputChange('sender', 'address', { ...formData.changes.sender?.address, street: e.target.value })}
                  className="input-field"
                  placeholder="Nowa ulica"
                />
              </div>
              <div>
                <label className="form-label">Nowy numer budynku</label>
                <input
                  type="text"
                  value={formData.changes.sender?.address?.buildingNumber || ''}
                  onChange={(e) => handleChangesInputChange('sender', 'address', { ...formData.changes.sender?.address, buildingNumber: e.target.value })}
                  className="input-field"
                  placeholder="Nowy numer"
                />
              </div>
              <div>
                <label className="form-label">Nowy kod pocztowy</label>
                <input
                  type="text"
                  value={formData.changes.sender?.address?.postalCode || ''}
                  onChange={(e) => handleChangesInputChange('sender', 'address', { ...formData.changes.sender?.address, postalCode: e.target.value })}
                  className="input-field"
                  placeholder="00-000"
                />
              </div>
              <div>
                <label className="form-label">Nowe miasto</label>
                <input
                  type="text"
                  value={formData.changes.sender?.address?.city || ''}
                  onChange={(e) => handleChangesInputChange('sender', 'address', { ...formData.changes.sender?.address, city: e.target.value })}
                  className="input-field"
                  placeholder="Nowe miasto"
                />
              </div>
              <div>
                <label className="form-label">Nowa osoba kontaktowa</label>
                <input
                  type="text"
                  value={formData.changes.sender?.contactPerson || ''}
                  onChange={(e) => handleChangesInputChange('sender', 'contactPerson', e.target.value)}
                  className="input-field"
                  placeholder="Nowa osoba kontaktowa"
                />
              </div>
              <div>
                <label className="form-label">Nowy telefon</label>
                <input
                  type="tel"
                  value={formData.changes.sender?.phone || ''}
                  onChange={(e) => handleChangesInputChange('sender', 'phone', e.target.value)}
                  className="input-field"
                  placeholder="+48 123 456 789"
                />
              </div>
              <div>
                <label className="form-label">Nowy email</label>
                <input
                  type="email"
                  value={formData.changes.sender?.email || ''}
                  onChange={(e) => handleChangesInputChange('sender', 'email', e.target.value)}
                  className="input-field"
                  placeholder="nowy@email.pl"
                />
              </div>
            </div>
          </div>

          {/* Zmiany w danych odbiorcy */}
          <div className="border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Zmiany w Danych Odbiorcy</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Nowa nazwa</label>
                <input
                  type="text"
                  value={formData.changes.receiver?.name || ''}
                  onChange={(e) => handleChangesInputChange('receiver', 'name', e.target.value)}
                  className="input-field"
                  placeholder="Nowa nazwa odbiorcy"
                />
              </div>
              <div>
                <label className="form-label">Nowa ulica</label>
                <input
                  type="text"
                  value={formData.changes.receiver?.address?.street || ''}
                  onChange={(e) => handleChangesInputChange('receiver', 'address', { ...formData.changes.receiver?.address, street: e.target.value })}
                  className="input-field"
                  placeholder="Nowa ulica"
                />
              </div>
              <div>
                <label className="form-label">Nowy numer budynku</label>
                <input
                  type="text"
                  value={formData.changes.receiver?.address?.buildingNumber || ''}
                  onChange={(e) => handleChangesInputChange('receiver', 'address', { ...formData.changes.receiver?.address, buildingNumber: e.target.value })}
                  className="input-field"
                  placeholder="Nowy numer"
                />
              </div>
              <div>
                <label className="form-label">Nowy kod pocztowy</label>
                <input
                  type="text"
                  value={formData.changes.receiver?.address?.postalCode || ''}
                  onChange={(e) => handleChangesInputChange('receiver', 'address', { ...formData.changes.receiver?.address, postalCode: e.target.value })}
                  className="input-field"
                  placeholder="00-000"
                />
              </div>
              <div>
                <label className="form-label">Nowe miasto</label>
                <input
                  type="text"
                  value={formData.changes.receiver?.address?.city || ''}
                  onChange={(e) => handleChangesInputChange('receiver', 'address', { ...formData.changes.receiver?.address, city: e.target.value })}
                  className="input-field"
                  placeholder="Nowe miasto"
                />
              </div>
              <div>
                <label className="form-label">Nowa osoba kontaktowa</label>
                <input
                  type="text"
                  value={formData.changes.receiver?.contactPerson || ''}
                  onChange={(e) => handleChangesInputChange('receiver', 'contactPerson', e.target.value)}
                  className="input-field"
                  placeholder="Nowa osoba kontaktowa"
                />
              </div>
              <div>
                <label className="form-label">Nowy telefon</label>
                <input
                  type="tel"
                  value={formData.changes.receiver?.phone || ''}
                  onChange={(e) => handleChangesInputChange('receiver', 'phone', e.target.value)}
                  className="input-field"
                  placeholder="+48 987 654 321"
                />
              </div>
              <div>
                <label className="form-label">Nowy email</label>
                <input
                  type="email"
                  value={formData.changes.receiver?.email || ''}
                  onChange={(e) => handleChangesInputChange('receiver', 'email', e.target.value)}
                  className="input-field"
                  placeholder="nowy@odbiorca.pl"
                />
              </div>
            </div>
          </div>

          {/* Zmiany w szczegółach transportu */}
          <div className="border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Zmiany w Szczegółach Transportu</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Nowy numer rejestracyjny</label>
                <input
                  type="text"
                  value={formData.changes.transportDetails?.vehicle?.registrationNumber || ''}
                  onChange={(e) => handleChangesInputChange('transportDetails', 'vehicle', { ...formData.changes.transportDetails?.vehicle, registrationNumber: e.target.value })}
                  className="input-field"
                  placeholder="NOWY12345"
                />
              </div>
              <div>
                <label className="form-label">Nowa ładowność</label>
                <input
                  type="number"
                  value={formData.changes.transportDetails?.vehicle?.capacity || ''}
                  onChange={(e) => handleChangesInputChange('transportDetails', 'vehicle', { ...formData.changes.transportDetails?.vehicle, capacity: parseInt(e.target.value) })}
                  className="input-field"
                  placeholder="2000"
                />
              </div>
              <div>
                <label className="form-label">Nowe imię kierowcy</label>
                <input
                  type="text"
                  value={formData.changes.transportDetails?.driver?.firstName || ''}
                  onChange={(e) => handleChangesInputChange('transportDetails', 'driver', { ...formData.changes.transportDetails?.driver, firstName: e.target.value })}
                  className="input-field"
                  placeholder="Nowe imię"
                />
              </div>
              <div>
                <label className="form-label">Nowe nazwisko kierowcy</label>
                <input
                  type="text"
                  value={formData.changes.transportDetails?.driver?.lastName || ''}
                  onChange={(e) => handleChangesInputChange('transportDetails', 'driver', { ...formData.changes.transportDetails?.driver, lastName: e.target.value })}
                  className="input-field"
                  placeholder="Nowe nazwisko"
                />
              </div>
              <div>
                <label className="form-label">Nowy telefon kierowcy</label>
                <input
                  type="tel"
                  value={formData.changes.transportDetails?.driver?.phone || ''}
                  onChange={(e) => handleChangesInputChange('transportDetails', 'driver', { ...formData.changes.transportDetails?.driver, phone: e.target.value })}
                  className="input-field"
                  placeholder="+48 111 222 333"
                />
              </div>
              <div>
                <label className="form-label">Nowy email kierowcy</label>
                <input
                  type="email"
                  value={formData.changes.transportDetails?.driver?.email || ''}
                  onChange={(e) => handleChangesInputChange('transportDetails', 'driver', { ...formData.changes.transportDetails?.driver, email: e.target.value })}
                  className="input-field"
                  placeholder="nowy@kierowca.pl"
                />
              </div>
              <div>
                <label className="form-label">Nowe miejsce załadunku</label>
                <input
                  type="text"
                  value={formData.changes.transportDetails?.route?.loadingPlace || ''}
                  onChange={(e) => handleChangesInputChange('transportDetails', 'route', { ...formData.changes.transportDetails?.route, loadingPlace: e.target.value })}
                  className="input-field"
                  placeholder="Nowe miejsce załadunku"
                />
              </div>
              <div>
                <label className="form-label">Nowe miejsce rozładunku</label>
                <input
                  type="text"
                  value={formData.changes.transportDetails?.route?.unloadingPlace || ''}
                  onChange={(e) => handleChangesInputChange('transportDetails', 'route', { ...formData.changes.transportDetails?.route, unloadingPlace: e.target.value })}
                  className="input-field"
                  placeholder="Nowe miejsce rozładunku"
                />
              </div>
              <div>
                <label className="form-label">Nowa data wyjazdu</label>
                <input
                  type="datetime-local"
                  value={formData.changes.transportDetails?.route?.plannedDepartureDate || ''}
                  onChange={(e) => handleChangesInputChange('transportDetails', 'route', { ...formData.changes.transportDetails?.route, plannedDepartureDate: e.target.value })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="form-label">Nowa data przyjazdu</label>
                <input
                  type="datetime-local"
                  value={formData.changes.transportDetails?.route?.plannedArrivalDate || ''}
                  onChange={(e) => handleChangesInputChange('transportDetails', 'route', { ...formData.changes.transportDetails?.route, plannedArrivalDate: e.target.value })}
                  className="input-field"
                />
              </div>
            </div>
          </div>

          {/* Zmiany w towarach */}
          <div className="border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Zmiany w Opisie Towarów</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="form-label">Nowy opis towarów</label>
                <textarea
                  value={formData.changes.goods?.description || ''}
                  onChange={(e) => handleChangesInputChange('goods', 'description', e.target.value)}
                  className="input-field"
                  rows={3}
                  placeholder="Nowy opis przewożonych towarów..."
                />
              </div>
              <div>
                <label className="form-label">Nowa ilość</label>
                <input
                  type="number"
                  value={formData.changes.goods?.quantity || ''}
                  onChange={(e) => handleChangesInputChange('goods', 'quantity', parseInt(e.target.value))}
                  className="input-field"
                  placeholder="Nowa ilość"
                />
              </div>
              <div>
                <label className="form-label">Nowa wartość</label>
                <input
                  type="number"
                  value={formData.changes.goods?.value || ''}
                  onChange={(e) => handleChangesInputChange('goods', 'value', parseFloat(e.target.value))}
                  className="input-field"
                  placeholder="Nowa wartość"
                />
              </div>
              <div>
                <label className="form-label">Nowy kod towarowy</label>
                <input
                  type="text"
                  value={formData.changes.goods?.commodityCode || ''}
                  onChange={(e) => handleChangesInputChange('goods', 'commodityCode', e.target.value)}
                  className="input-field"
                  placeholder="Nowy kod towarowy"
                />
              </div>
            </div>
          </div>

          {/* Przycisk wysłania */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setFormData({
                originalDeclarationNumber: '',
                editReason: 'CORRECTION',
                editDescription: '',
                changes: { sender: {}, receiver: {}, transportDetails: {}, goods: {} },
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
              {isSubmitting ? 'Przygotowywanie...' : 'Przygotuj Wniosek o Edycję'}
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
            {submitResult.editRequestId && (
              <p className="text-sm mt-2">
                <strong>ID wniosku o edycję:</strong> {submitResult.editRequestId}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}; 