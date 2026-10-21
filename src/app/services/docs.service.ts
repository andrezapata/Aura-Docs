import { Injectable, signal } from '@angular/core';
import { DocumentItem, AuditLog, DocCategory, DocStatus, AccessLevel } from '../models/docs.models';

const INITIAL_DOCS: DocumentItem[] = [
  {
    id: "DOC-2026-001",
    title: "Contrato Laboral Indeterminado - Carlos Mendoza",
    category: "laborales",
    type: "pdf",
    size: "2.4 MB",
    version: "v1.2",
    accessLevel: "confidencial",
    department: "Recursos Humanos",
    employee: "Carlos Mendoza Quispe",
    uploadDate: "2026-01-15",
    expirationDate: "2028-01-15",
    status: "vigente",
    tags: ["Contrato", "D.L. 728", "Indeterminado"],
    versions: [
      { v: "v1.2", date: "2026-01-15 11:20", author: "Marcela Rojas (RRHH)", change: "Actualización de cláusula de confidencialidad y bono de desempeño" },
      { v: "v1.0", date: "2025-01-10 09:00", author: "Marcela Rojas (RRHH)", change: "Creación y firma inicial de contrato laboral" }
    ]
  },
  {
    id: "DOC-2026-002",
    title: "Convenio Colectivo de Trabajo y Beneficios 2026",
    category: "laborales",
    type: "pdf",
    size: "5.1 MB",
    version: "v2.0",
    accessLevel: "restringido",
    department: "Legal / RRHH",
    employee: "General Corporativo",
    uploadDate: "2026-02-01",
    expirationDate: "2026-12-31",
    status: "vigente",
    tags: ["Convenio", "Sindicato", "Beneficios"],
    versions: [
      { v: "v2.0", date: "2026-02-01 16:30", author: "Dr. Gonzalo Viteri (Legal)", change: "Homologación con Ministerio de Trabajo" }
    ]
  },
  {
    id: "DOC-2026-003",
    title: "Seguro Complementario de Trabajo de Riesgo (SCTR) - Operaciones",
    category: "administrativos",
    type: "pdf",
    size: "1.8 MB",
    version: "v3.1",
    accessLevel: "publico",
    department: "Seguridad y Salud (SST)",
    employee: "Personal de Planta / Campo",
    uploadDate: "2026-09-01",
    expirationDate: "2026-10-31",
    status: "proximo",
    tags: ["Póliza", "SCTR", "Rímac Seguros"],
    versions: [
      { v: "v3.1", date: "2026-09-01 08:45", author: "Ing. Jorge Soto (SST)", change: "Renovación mensual póliza Rimac EPS/Salud" }
    ]
  },
  {
    id: "DOC-2026-004",
    title: "Licencia de Funcionamiento Municipal y Certificado ITSE",
    category: "administrativos",
    type: "pdf",
    size: "3.2 MB",
    version: "v1.0",
    accessLevel: "restringido",
    department: "Administración Central",
    employee: "Sede Principal Aura",
    uploadDate: "2024-03-10",
    expirationDate: "2026-09-15",
    status: "vencido",
    tags: ["Municipalidad", "ITSE", "Defensa Civil"],
    versions: [
      { v: "v1.0", date: "2024-03-10 10:00", author: "Administración Aura", change: "Resolución de Defensa Civil aprobada" }
    ]
  },
  {
    id: "DOC-2026-005",
    title: "Boletas de Pago Electrónicas - Planilla Setiembre 2026",
    category: "laborales",
    type: "zip",
    size: "18.5 MB",
    version: "v1.0",
    accessLevel: "confidencial",
    department: "Nómina / Contabilidad",
    employee: "Nómina Consolidada (148 colaboradores)",
    uploadDate: "2026-09-30",
    expirationDate: "permanente",
    status: "permanente",
    tags: ["Boletas", "Firma Digital", "SUNAT", "PLAME"],
    versions: [
      { v: "v1.0", date: "2026-09-30 18:00", author: "Patricia Vega (Planillas)", change: "Generación de lote de boletas con hash criptográfico" }
    ]
  },
  {
    id: "DOC-2026-006",
    title: "Póliza Responsabilidad Civil y Multiriesgo Corporativo",
    category: "administrativos",
    type: "pdf",
    size: "4.7 MB",
    version: "v2.0",
    accessLevel: "restringido",
    department: "Finanzas y Riesgos",
    employee: "Corporativo Aura",
    uploadDate: "2025-11-15",
    expirationDate: "2026-11-15",
    status: "proximo",
    tags: ["Seguros", "Póliza", "Pacífico Seguros"],
    versions: [
      { v: "v2.0", date: "2025-11-15 14:10", author: "Finanzas Aura", change: "Cobertura ampliada para infraestructura y servidores" }
    ]
  },
  {
    id: "DOC-2026-007",
    title: "Reglamento Interno de Trabajo (RIT) Actualizado 2026",
    category: "laborales",
    type: "docx",
    size: "1.2 MB",
    version: "v4.0",
    accessLevel: "publico",
    department: "Recursos Humanos",
    employee: "Todo el Personal",
    uploadDate: "2026-01-05",
    expirationDate: "permanente",
    status: "permanente",
    tags: ["RIT", "Directiva", "Políticas"],
    versions: [
      { v: "v4.0", date: "2026-01-05 09:30", author: "Marcela Rojas (RRHH)", change: "Adecuación a ley de desconexión digital y teletrabajo" }
    ]
  },
  {
    id: "DOC-2026-008",
    title: "Contrato de Arrendamiento Oficinas Corporativas Torre Aura",
    category: "administrativos",
    type: "pdf",
    size: "6.3 MB",
    version: "v1.1",
    accessLevel: "confidencial",
    department: "Gerencia General",
    employee: "Inmobiliaria Prime",
    uploadDate: "2023-12-01",
    expirationDate: "2026-11-30",
    status: "proximo",
    tags: ["Alquiler", "Sede Central", "Notaría"],
    versions: [
      { v: "v1.1", date: "2023-12-01 12:00", author: "Gerencia General", change: "Adenda por 36 meses con cláusula de arbitraje" }
    ]
  }
];

const INITIAL_LOGS: AuditLog[] = [
  { id: "LOG-901", user: "Marcela Rojas", action: "Descarga de documento", docId: "DOC-2026-001", docName: "Contrato Laboral Indeterminado - Carlos Mendoza", date: "2026-10-21 10:14:22", ip: "192.168.1.45", badge: "Acceso Seguro" },
  { id: "LOG-902", user: "Patricia Vega", action: "Carga de nuevo archivo", docId: "DOC-2026-005", docName: "Boletas de Pago Electrónicas - Setiembre 2026", date: "2026-10-21 09:48:10", ip: "192.168.1.88", badge: "Carga Exitosa" },
  { id: "LOG-903", user: "Ing. Jorge Soto", action: "Actualización de alerta", docId: "DOC-2026-003", docName: "SCTR Operaciones - Solicitud de renovación iniciada", date: "2026-10-20 17:30:15", ip: "192.168.2.14", badge: "Trámite Renovación" },
  { id: "LOG-904", user: "Carlos Mendoza", action: "Lectura con firma digital", docId: "DOC-2026-007", docName: "Reglamento Interno de Trabajo (RIT)", date: "2026-10-20 14:15:00", ip: "192.168.1.102", badge: "Firma Conforme" },
  { id: "LOG-905", user: "Administrador Aura", action: "Modificación de permisos", docId: "DOC-2026-008", docName: "Contrato Arrendamiento Oficina Torre Aura", date: "2026-10-19 11:05:40", ip: "192.168.1.10", badge: "Permiso Elevado" }
];

@Injectable({
  providedIn: 'root'
})
export class DocsService {
  private readonly storageDocsKey = 'aura_docs_items_ng';
  private readonly storageLogsKey = 'aura_docs_logs_ng';

  readonly docs = signal<DocumentItem[]>(this.loadDocs());
  readonly logs = signal<AuditLog[]>(this.loadLogs());
  readonly notification = signal<string | null>(null);

  private loadDocs(): DocumentItem[] {
    try {
      const data = localStorage.getItem(this.storageDocsKey);
      return data ? JSON.parse(data) : INITIAL_DOCS;
    } catch {
      return INITIAL_DOCS;
    }
  }

  private loadLogs(): AuditLog[] {
    try {
      const data = localStorage.getItem(this.storageLogsKey);
      return data ? JSON.parse(data) : INITIAL_LOGS;
    } catch {
      return INITIAL_LOGS;
    }
  }

  private save(): void {
    try {
      localStorage.setItem(this.storageDocsKey, JSON.stringify(this.docs()));
      localStorage.setItem(this.storageLogsKey, JSON.stringify(this.logs()));
    } catch (e) {
      console.error(e);
    }
  }

  notify(msg: string): void {
    this.notification.set(msg);
    setTimeout(() => {
      this.notification.set(null);
    }, 3800);
  }

  addDocument(doc: Omit<DocumentItem, 'id' | 'version' | 'versions'>, initialChange: string): void {
    const nextId = `DOC-2026-0${this.docs().length + 1}`;
    const newDoc: DocumentItem = {
      ...doc,
      id: nextId,
      version: 'v1.0',
      versions: [
        {
          v: 'v1.0',
          date: new Date().toLocaleString(),
          author: 'Usuario Conectado (Aura)',
          change: initialChange || 'Carga inicial y registro del documento'
        }
      ]
    };

    const updated = [newDoc, ...this.docs()];
    this.docs.set(updated);

    this.addLog({
      id: `LOG-${Date.now().toString().slice(-4)}`,
      user: 'Usuario Conectado',
      action: 'Carga de nuevo documento',
      docId: nextId,
      docName: newDoc.title,
      date: new Date().toLocaleString(),
      ip: '192.168.1.15',
      badge: 'Registro Exitoso'
    });

    this.save();
    this.notify(`Documento ${nextId} registrado y clasificado exitosamente.`);
  }

  addVersion(docId: string, note: string): void {
    const list = [...this.docs()];
    const index = list.findIndex(d => d.id === docId);
    if (index === -1) return;

    const doc = { ...list[index] };
    const curV = doc.version;
    const parts = curV.replace('v', '').split('.');
    const nextV = `v${parts[0]}.${parseInt(parts[1] || '0') + 1}`;

    doc.version = nextV;
    doc.versions = [
      {
        v: nextV,
        date: new Date().toLocaleString(),
        author: 'Usuario Conectado (Aura)',
        change: note
      },
      ...doc.versions
    ];

    list[index] = doc;
    this.docs.set(list);

    this.addLog({
      id: `LOG-${Date.now().toString().slice(-4)}`,
      user: 'Usuario Conectado',
      action: `Nueva versión subida (${nextV})`,
      docId: doc.id,
      docName: doc.title,
      date: new Date().toLocaleString(),
      ip: '192.168.1.15',
      badge: 'Nueva Versión'
    });

    this.save();
    this.notify(`Documento ${docId} actualizado a la versión ${nextV}`);
  }

  updatePermissions(docId: string, level: AccessLevel): void {
    const list = [...this.docs()];
    const index = list.findIndex(d => d.id === docId);
    if (index === -1) return;

    const doc = { ...list[index], accessLevel: level };
    list[index] = doc;
    this.docs.set(list);

    this.addLog({
      id: `LOG-${Date.now().toString().slice(-4)}`,
      user: 'Usuario Conectado',
      action: `Permisos modificados a ${level.toUpperCase()}`,
      docId: doc.id,
      docName: doc.title,
      date: new Date().toLocaleString(),
      ip: '192.168.1.15',
      badge: 'Control de Acceso'
    });

    this.save();
    this.notify(`Permisos actualizados para ${docId}`);
  }

  renewDocument(docId: string, newDate: string, notes: string): void {
    const list = [...this.docs()];
    const index = list.findIndex(d => d.id === docId);
    if (index === -1) return;

    const doc = { ...list[index] };
    doc.expirationDate = newDate;
    doc.status = 'vigente';

    const parts = doc.version.replace('v', '').split('.');
    const nextV = `v${parseInt(parts[0]) + 1}.0`;
    doc.version = nextV;
    doc.versions = [
      {
        v: nextV,
        date: new Date().toLocaleString(),
        author: 'Oficina de Renovaciones Aura',
        change: `Renovación de vigencia hasta ${newDate}. ${notes || 'Trámite favorable'}`
      },
      ...doc.versions
    ];

    list[index] = doc;
    this.docs.set(list);

    this.addLog({
      id: `LOG-${Date.now().toString().slice(-4)}`,
      user: 'Usuario Conectado',
      action: `Renovación exitosa hasta ${newDate}`,
      docId: doc.id,
      docName: doc.title,
      date: new Date().toLocaleString(),
      ip: '192.168.1.15',
      badge: 'Renovación Aprobada'
    });

    this.save();
    this.notify(`Documento ${docId} renovado exitosamente hasta ${newDate}`);
  }

  downloadDoc(docId: string): void {
    const doc = this.docs().find(d => d.id === docId);
    if (!doc) return;

    this.addLog({
      id: `LOG-${Date.now().toString().slice(-4)}`,
      user: 'Usuario Conectado',
      action: 'Descarga de documento oficial',
      docId: doc.id,
      docName: doc.title,
      date: new Date().toLocaleString(),
      ip: '192.168.1.15',
      badge: 'Descarga Segura'
    });

    this.save();
    this.notify(`Descargando ${doc.title} (${doc.version})...`);
  }

  private addLog(log: AuditLog): void {
    this.logs.set([log, ...this.logs()]);
  }
}
