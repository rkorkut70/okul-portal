export type UserRole = 'instructor' | 'cpd_manager' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  title: string;
  department: string;
  role: UserRole;
  avatarUrl?: string;
  isFirstLogin?: boolean;
}

export interface AcademicUnit {
  id: string;
  name: string;
  shortName: string;
  code: string;
  description: string;
  icon: string;
  status: 'active' | 'planning';
  managerName?: string;
  managerEmail?: string;
  documentCount: number;
  activityCount: number;
}

export interface DriveDocument {
  id: string;
  title: string;
  folderId: string;
  folderName: string;
  unitId: string;
  fileType: 'pdf' | 'doc' | 'xls' | 'folder' | 'ppt' | 'zip';
  size: string;
  updatedAt: string;
  driveUrl: string;
  description?: string;
  tags: string[];
  isPinned?: boolean;
}

export interface ActivityItem {
  id: string;
  unitId: string;
  title: string;
  date: string;
  category: 'Eğitim & Atölye' | 'Seminer & Konferans' | 'Akreditasyon' | 'Toplantı & Karar' | 'Yayın & Rehber';
  summary: string;
  targetAudience: string;
  participantCount?: number;
  status: 'completed' | 'upcoming';
  driveDocUrl?: string;
  driveDocTitle?: string;
  organizer: string;
  location?: string;
}

export interface TemplateDocument {
  id: string;
  title: string;
  category: 'Dilekçe & İzin' | 'Ders & Sınav' | 'Kurumsal Kimlik' | 'Komisyon & Tutanak' | 'Genel' | string;
  format: 'DOCX' | 'PDF' | 'XLSX' | 'PPTX' | 'DİĞER' | string;
  size: string;
  updatedAt: string;
  driveUrl: string;
  description: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  startDate: string;
  endDate?: string;
  category: 'Ders Dönemi' | 'Sınavlar' | 'Kayıt & Harç' | 'Resmi Tatil' | 'Senato & Kurul' | string;
  term: string;
  isImportant?: boolean;
}
