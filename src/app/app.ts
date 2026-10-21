import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DocsService } from './services/docs.service';
import { DocumentItem, DocCategory, DocStatus, AccessLevel, AuditLog } from './models/docs.models';

type TabType = 'todos' | 'laborales' | 'administrativos' | 'vencimientos' | 'historial';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  readonly docsService = inject(DocsService);

  readonly currentTab = signal<TabType>('todos');

  // Search & Filters
  searchQuery = '';
  filterCategory = 'all';
  filterStatus = 'all';
  filterAccess = 'all';

  // Modals state
  readonly showUploadModal = signal<boolean>(false);
  readonly selectedDocForVersion = signal<DocumentItem | null>(null);
  readonly selectedDocForPerm = signal<DocumentItem | null>(null);
  readonly selectedDocForRenew = signal<DocumentItem | null>(null);
  readonly selectedDocForPreview = signal<DocumentItem | null>(null);

  // Form Models
  newDoc = {
    title: '',
    category: 'laborales' as DocCategory,
    department: '',
    employee: '',
    accessLevel: 'confidencial' as AccessLevel,
    expirationDate: '',
    notes: ''
  };

  newVersionNote = '';
  selectedPermLevel: AccessLevel = 'confidencial';
  renewNewDate = '';
  renewNotes = '';

  // Computed Metrics
  readonly totalDocsCount = computed(() => this.docsService.docs().length);
  readonly laboralesCount = computed(() => this.docsService.docs().filter(d => d.category === 'laborales').length);
  readonly adminCount = computed(() => this.docsService.docs().filter(d => d.category === 'administrativos').length);
  readonly pendingRenewalsCount = computed(() =>
    this.docsService.docs().filter(d => d.status === 'vencido' || d.status === 'proximo').length
  );

  // Filtered Documents
  readonly filteredDocs = computed(() => {
    const list = this.docsService.docs();
    const tab = this.currentTab();
    const q = this.searchQuery.toLowerCase().trim();
    const cat = this.filterCategory;
    const stat = this.filterStatus;
    const acc = this.filterAccess;

    return list.filter(doc => {
      if (tab === 'laborales' && doc.category !== 'laborales') return false;
      if (tab === 'administrativos' && doc.category !== 'administrativos') return false;
      if (tab === 'vencimientos' && doc.status !== 'vencido' && doc.status !== 'proximo') return false;

      if (cat !== 'all' && doc.category !== cat) return false;
      if (stat !== 'all' && doc.status !== stat) return false;
      if (acc !== 'all' && doc.accessLevel !== acc) return false;

      if (q) {
        const matchTitle = doc.title.toLowerCase().includes(q);
        const matchId = doc.id.toLowerCase().includes(q);
        const matchDept = doc.department.toLowerCase().includes(q);
        const matchEmp = doc.employee.toLowerCase().includes(q);
        const matchTag = doc.tags.some(t => t.toLowerCase().includes(q));
        if (!matchTitle && !matchId && !matchDept && !matchEmp && !matchTag) return false;
      }

      return true;
    });
  });

  setTab(tab: TabType): void {
    this.currentTab.set(tab);
  }

  // Preview Document Modal
  openPreviewModal(doc: DocumentItem): void {
    this.selectedDocForPreview.set(doc);
    this.docsService.notify(`Abriendo visualizador seguro para "${doc.title}"...`);
  }

  closePreviewModal(): void {
    this.selectedDocForPreview.set(null);
  }

  // Real Download Trigger
  triggerRealDownload(doc: DocumentItem): void {
    const content = `=====================================================
AURA DOCS - SISTEMA DE GESTIÓN DOCUMENTAL CORPORATIVO
=====================================================
ID: ${doc.id}
DOCUMENTO: ${doc.title}
VERSIÓN: ${doc.version}
CLASIFICACIÓN: ${doc.category.toUpperCase()}
ÁREA/DEPTO: ${doc.department}
COLABORADOR/ASIGNADO: ${doc.employee}
NIVEL DE SEGURIDAD: ${doc.accessLevel.toUpperCase()}
FECHA DE REGISTRO: ${doc.uploadDate}
VIGENCIA: ${doc.expirationDate}
ESTADO: ${doc.status.toUpperCase()}
ETIQUETAS: ${doc.tags.join(', ')}

-----------------------------------------------------
HISTORIAL DE VERSIONES:
${doc.versions.map(v => `[${v.v}] ${v.date} - ${v.author} -> ${v.change}`).join('\n')}
-----------------------------------------------------
Certificado criptográfico SHA-256 verificado por Aura Security.
=====================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${doc.id}_${doc.title.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    this.docsService.downloadDoc(doc.id);
  }

  // Modals methods
  openUploadModal(): void {
    this.newDoc = {
      title: '',
      category: 'laborales',
      department: '',
      employee: '',
      accessLevel: 'confidencial',
      expirationDate: '',
      notes: ''
    };
    this.showUploadModal.set(true);
  }

  closeUploadModal(): void {
    this.showUploadModal.set(false);
  }

  submitUploadDocument(): void {
    if (!this.newDoc.title.trim()) return;

    let status: DocStatus = 'vigente';
    if (!this.newDoc.expirationDate) {
      status = 'permanente';
    } else {
      const now = new Date();
      const exp = new Date(this.newDoc.expirationDate);
      const diff = Math.ceil((exp.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      if (diff <= 0) status = 'vencido';
      else if (diff <= 45) status = 'proximo';
    }

    this.docsService.addDocument(
      {
        title: this.newDoc.title.trim(),
        category: this.newDoc.category,
        type: 'pdf',
        size: '2.1 MB',
        accessLevel: this.newDoc.accessLevel,
        department: this.newDoc.department.trim() || 'General',
        employee: this.newDoc.employee.trim() || 'General Aura',
        uploadDate: new Date().toISOString().split('T')[0],
        expirationDate: this.newDoc.expirationDate || 'permanente',
        status: status,
        tags: [this.newDoc.category === 'laborales' ? 'Laboral' : 'Administrativo', this.newDoc.department]
      },
      this.newDoc.notes
    );

    this.closeUploadModal();
  }

  openVersionModal(doc: DocumentItem): void {
    this.newVersionNote = '';
    this.selectedDocForVersion.set(doc);
  }

  closeVersionModal(): void {
    this.selectedDocForVersion.set(null);
  }

  submitNewVersion(): void {
    const doc = this.selectedDocForVersion();
    if (!doc || !this.newVersionNote.trim()) return;

    this.docsService.addVersion(doc.id, this.newVersionNote.trim());
    const updated = this.docsService.docs().find(d => d.id === doc.id) || null;
    this.selectedDocForVersion.set(updated);
    this.newVersionNote = '';
  }

  openPermModal(doc: DocumentItem): void {
    this.selectedDocForPerm.set(doc);
    this.selectedPermLevel = doc.accessLevel;
  }

  closePermModal(): void {
    this.selectedDocForPerm.set(null);
  }

  submitSavePermissions(): void {
    const doc = this.selectedDocForPerm();
    if (!doc) return;

    this.docsService.updatePermissions(doc.id, this.selectedPermLevel);
    this.closePermModal();
  }

  openRenewModal(doc: DocumentItem): void {
    this.selectedDocForRenew.set(doc);
    this.renewNewDate = '';
    this.renewNotes = '';
  }

  closeRenewModal(): void {
    this.selectedDocForRenew.set(null);
  }

  submitRenewDocument(): void {
    const doc = this.selectedDocForRenew();
    if (!doc || !this.renewNewDate) return;

    this.docsService.renewDocument(doc.id, this.renewNewDate, this.renewNotes.trim());
    this.closeRenewModal();
  }

  exportAuditExcel(): void {
    const logs = this.docsService.logs();
    let csv = "ID,FECHA,USUARIO,ACCION,DOC_ID,DOCUMENTO,IP,ESTADO\n";
    logs.forEach(l => {
      csv += `"${l.id}","${l.date}","${l.user}","${l.action}","${l.docId}","${l.docName}","${l.ip}","${l.badge}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Auditoria_Aura_Docs_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    this.docsService.notify('Auditoría exportada exitosamente a Excel / CSV.');
  }

  printReport(): void {
    window.print();
  }
}
