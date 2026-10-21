export type DocCategory = 'laborales' | 'administrativos';
export type DocType = 'pdf' | 'docx' | 'xlsx' | 'zip';
export type DocStatus = 'vigente' | 'proximo' | 'vencido' | 'permanente';
export type AccessLevel = 'confidencial' | 'restringido' | 'publico';

export interface DocVersion {
  v: string;
  date: string;
  author: string;
  change: string;
}

export interface DocumentItem {
  id: string;
  title: string;
  category: DocCategory;
  type: DocType;
  size: string;
  version: string;
  accessLevel: AccessLevel;
  department: string;
  employee: string;
  uploadDate: string;
  expirationDate: string;
  status: DocStatus;
  tags: string[];
  versions: DocVersion[];
}

export interface AuditLog {
  id: string;
  user: string;
  action: string;
  docId: string;
  docName: string;
  date: string;
  ip: string;
  badge: string;
}
