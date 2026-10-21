/**
 * AURA DOCS - GESTIÓN DOCUMENTAL CORPORATIVA
 * Almacenamiento, Clasificación, Vencimientos, Renovaciones, Versiones, Permisos e Historial.
 */

// Estado inicial / Mock data
const INITIAL_DOCS = [
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
    status: "vigente", // vigente | proximo | vencido | permanente
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
    expirationDate: "2026-10-31", // En menos de 15 días o venciendo
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
    expirationDate: "2026-09-15", // Ya vencido
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
    expirationDate: "2026-11-15", // Próximo a vencer
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
    expirationDate: "2026-11-30", // Próximo a vencer
    status: "proximo",
    tags: ["Alquiler", "Sede Central", "Notaría"],
    versions: [
      { v: "v1.1", date: "2023-12-01 12:00", author: "Gerencia General", change: "Adenda por 36 meses con cláusula de arbitraje" }
    ]
  }
];

const INITIAL_LOGS = [
  { id: "LOG-901", user: "Marcela Rojas", action: "Descarga de documento", docId: "DOC-2026-001", docName: "Contrato Laboral Indeterminado - Carlos Mendoza", date: "2026-10-21 10:14:22", ip: "192.168.1.45", badge: "Acceso Seguro" },
  { id: "LOG-902", user: "Patricia Vega", action: "Carga de nuevo archivo", docId: "DOC-2026-005", docName: "Boletas de Pago Electrónicas - Setiembre 2026", date: "2026-10-21 09:48:10", ip: "192.168.1.88", badge: "Carga Exitosa" },
  { id: "LOG-903", user: "Ing. Jorge Soto", action: "Actualización de alerta", docId: "DOC-2026-003", docName: "SCTR Operaciones - Solicitud de renovación iniciada", date: "2026-10-20 17:30:15", ip: "192.168.2.14", badge: "Trámite Renovación" },
  { id: "LOG-904", user: "Carlos Mendoza", action: "Lectura con firma digital", docId: "DOC-2026-007", docName: "Reglamento Interno de Trabajo (RIT)", date: "2026-10-20 14:15:00", ip: "192.168.1.102", badge: "Firma Conforme" },
  { id: "LOG-905", user: "Administrador Aura", action: "Modificación de permisos", docId: "DOC-2026-008", docName: "Contrato Arrendamiento Oficina Torre Aura", date: "2026-10-19 11:05:40", ip: "192.168.1.10", badge: "Permiso Elevado" }
];

// Estado de la app
class AuraDocsApp {
  constructor() {
    this.docs = this.loadFromStorage('aura_docs_items', INITIAL_DOCS);
    this.logs = this.loadFromStorage('aura_docs_logs', INITIAL_LOGS);
    this.currentTab = 'todos'; // todos | laborales | administrativos | vencimientos | historial
    this.currentFilterCategory = 'all';
    this.currentFilterStatus = 'all';
    this.currentFilterAccess = 'all';
    this.searchTerm = '';
    
    this.init();
  }

  loadFromStorage(key, fallback) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  saveToStorage() {
    try {
      localStorage.setItem('aura_docs_items', JSON.stringify(this.docs));
      localStorage.setItem('aura_docs_logs', JSON.stringify(this.logs));
    } catch (e) {
      console.error("Error guardando en localStorage", e);
    }
  }

  init() {
    this.updateStats();
    this.renderTabs();
    this.renderCurrentView();
    this.bindEvents();
  }

  bindEvents() {
    // Buscador global
    const searchInput = document.getElementById('globalSearch');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchTerm = e.target.value.toLowerCase().trim();
        this.renderCurrentView();
      });
    }

    // Filtros
    document.getElementById('filterCategory')?.addEventListener('change', (e) => {
      this.currentFilterCategory = e.target.value;
      this.renderCurrentView();
    });
    document.getElementById('filterStatus')?.addEventListener('change', (e) => {
      this.currentFilterStatus = e.target.value;
      this.renderCurrentView();
    });
    document.getElementById('filterAccess')?.addEventListener('change', (e) => {
      this.currentFilterAccess = e.target.value;
      this.renderCurrentView();
    });

    // Pestañas de navegación
    document.querySelectorAll('.nav-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
        const targetTab = e.currentTarget.dataset.tab;
        e.currentTarget.classList.add('active');
        this.currentTab = targetTab;
        this.renderCurrentView();
      });
    });

    // Modal de Carga
    document.getElementById('btnOpenUploadModal')?.addEventListener('click', () => {
      this.openModal('uploadModal');
    });
    document.getElementById('btnCloseUploadModal')?.addEventListener('click', () => {
      this.closeModal('uploadModal');
    });
    document.getElementById('btnCancelUpload')?.addEventListener('click', () => {
      this.closeModal('uploadModal');
    });

    // Formulario de Carga
    document.getElementById('uploadDocForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleUploadDocument();
    });

    // Modal de Historial / Versiones
    document.getElementById('btnCloseVersionModal')?.addEventListener('click', () => {
      this.closeModal('versionModal');
    });

    // Modal de Permisos
    document.getElementById('btnClosePermModal')?.addEventListener('click', () => {
      this.closeModal('permModal');
    });
    document.getElementById('permDocForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSavePermissions();
    });

    // Modal de Renovación
    document.getElementById('btnCloseRenewModal')?.addEventListener('click', () => {
      this.closeModal('renewModal');
    });
    document.getElementById('renewDocForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleRenewDocument();
    });
  }

  updateStats() {
    const total = this.docs.length;
    const laborales = this.docs.filter(d => d.category === 'laborales').length;
    const administrativos = this.docs.filter(d => d.category === 'administrativos').length;
    const proximos = this.docs.filter(d => d.status === 'proximo').length;
    const vencidos = this.docs.filter(d => d.status === 'vencido').length;

    document.getElementById('statTotalDocs').textContent = total;
    document.getElementById('statLaborales').textContent = laborales;
    document.getElementById('statAdmin').textContent = administrativos;
    document.getElementById('statVencimientos').textContent = vencidos + proximos;

    const badgeExp = document.getElementById('badgeVencimientos');
    if (badgeExp) {
      badgeExp.textContent = vencidos + proximos;
      if (vencidos > 0) badgeExp.className = 'badge-count danger';
      else badgeExp.className = 'badge-count neutral';
    }
  }

  renderTabs() {
    // Actualizar contadores si aplica
  }

  getFilteredDocs() {
    return this.docs.filter(doc => {
      // Pestaña
      if (this.currentTab === 'laborales' && doc.category !== 'laborales') return false;
      if (this.currentTab === 'administrativos' && doc.category !== 'administrativos') return false;
      if (this.currentTab === 'vencimientos' && doc.status !== 'vencido' && doc.status !== 'proximo') return false;

      // Filtros desplegables
      if (this.currentFilterCategory !== 'all' && doc.category !== this.currentFilterCategory) return false;
      if (this.currentFilterStatus !== 'all' && doc.status !== this.currentFilterStatus) return false;
      if (this.currentFilterAccess !== 'all' && doc.accessLevel !== this.currentFilterAccess) return false;

      // Búsqueda
      if (this.searchTerm) {
        const matchesTitle = doc.title.toLowerCase().includes(this.searchTerm);
        const matchesId = doc.id.toLowerCase().includes(this.searchTerm);
        const matchesDept = doc.department.toLowerCase().includes(this.searchTerm);
        const matchesEmp = doc.employee.toLowerCase().includes(this.searchTerm);
        const matchesTags = doc.tags.some(t => t.toLowerCase().includes(this.searchTerm));
        if (!matchesTitle && !matchesId && !matchesDept && !matchesEmp && !matchesTags) {
          return false;
        }
      }

      return true;
    });
  }

  renderCurrentView() {
    const container = document.getElementById('viewContainer');
    if (!container) return;

    if (this.currentTab === 'historial') {
      this.renderAuditLogs(container);
      return;
    }

    const filtered = this.getFilteredDocs();

    let titleText = "Gestión Integral de Documentos";
    let subtitleText = "Repositorio central con control de versiones, vencimientos y permisos";

    if (this.currentTab === 'laborales') {
      titleText = "Documentos Laborales y de Personal";
      subtitleText = "Contratos, adendas, convenios colectivos, boletas y reglamentos internos";
    } else if (this.currentTab === 'administrativos') {
      titleText = "Documentos Administrativos e Institucionales";
      subtitleText = "Pólizas, licencias, arrendamientos, actas de directorio y certificaciones";
    } else if (this.currentTab === 'vencimientos') {
      titleText = "Control de Vencimientos y Renovaciones";
      subtitleText = "Monitoreo proactivo de licencias, contratos y pólizas por renovar";
    }

    container.innerHTML = `
      <div class="view-header">
        <div class="view-title-group">
          <h2>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            ${titleText}
          </h2>
          <p>${subtitleText}</p>
        </div>
        <div style="display: flex; gap: 0.75rem;">
          <button class="btn-secondary" onclick="window.print()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
            Imprimir Reporte
          </button>
          <button class="btn-primary" id="btnTriggerModal">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Cargar Documento
          </button>
        </div>
      </div>

      <!-- Filtros interactivos -->
      <div class="filter-bar">
        <div class="filter-group">
          <label>Clasificación:</label>
          <select id="filterCategoryDynamic" class="filter-select">
            <option value="all" ${this.currentFilterCategory === 'all' ? 'selected' : ''}>Todos los Tipos</option>
            <option value="laborales" ${this.currentFilterCategory === 'laborales' ? 'selected' : ''}>Laborales</option>
            <option value="administrativos" ${this.currentFilterCategory === 'administrativos' ? 'selected' : ''}>Administrativos</option>
          </select>
        </div>

        <div class="filter-group">
          <label>Estado / Vencimiento:</label>
          <select id="filterStatusDynamic" class="filter-select">
            <option value="all" ${this.currentFilterStatus === 'all' ? 'selected' : ''}>Todos los Estados</option>
            <option value="vigente" ${this.currentFilterStatus === 'vigente' ? 'selected' : ''}>Vigentes</option>
            <option value="proximo" ${this.currentFilterStatus === 'proximo' ? 'selected' : ''}>Por Vencer (< 60 días)</option>
            <option value="vencido" ${this.currentFilterStatus === 'vencido' ? 'selected' : ''}>Vencidos</option>
            <option value="permanente" ${this.currentFilterStatus === 'permanente' ? 'selected' : ''}>Permanentes</option>
          </select>
        </div>

        <div class="filter-group">
          <label>Nivel de Acceso:</label>
          <select id="filterAccessDynamic" class="filter-select">
            <option value="all" ${this.currentFilterAccess === 'all' ? 'selected' : ''}>Todos los Permisos</option>
            <option value="confidencial" ${this.currentFilterAccess === 'confidencial' ? 'selected' : ''}>Confidencial (RRHH / Gerencia)</option>
            <option value="restringido" ${this.currentFilterAccess === 'restringido' ? 'selected' : ''}>Restringido</option>
            <option value="publico" ${this.currentFilterAccess === 'publico' ? 'selected' : ''}>Público Interno</option>
          </select>
        </div>

        <div style="margin-left: auto; font-size: 0.8rem; color: var(--color-text-muted);">
          Mostrando <strong>${filtered.length}</strong> documentos
        </div>
      </div>

      <!-- Tabla de Documentos -->
      <div class="table-card">
        <div class="table-responsive">
          <table class="aura-table">
            <thead>
              <tr>
                <th>Documento / Nombre</th>
                <th>Clasificación</th>
                <th>Área / Asignado</th>
                <th>Versión</th>
                <th>Vencimiento</th>
                <th>Permisos</th>
                <th style="text-align: right;">Acciones</th>
              </tr>
            </thead>
            <tbody>
              ${filtered.length === 0 ? `
                <tr>
                  <td colspan="7" style="text-align: center; padding: 2.5rem; color: var(--color-text-muted);">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom: 0.5rem; opacity: 0.5;"><circle cx="12" cy="12" r="10"></circle><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                    <p>No se encontraron documentos con los filtros seleccionados.</p>
                  </td>
                </tr>
              ` : filtered.map(doc => this.renderDocRow(doc)).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    // Re-bind listeners locales
    document.getElementById('btnTriggerModal')?.addEventListener('click', () => {
      this.openModal('uploadModal');
    });

    document.getElementById('filterCategoryDynamic')?.addEventListener('change', (e) => {
      this.currentFilterCategory = e.target.value;
      this.renderCurrentView();
    });
    document.getElementById('filterStatusDynamic')?.addEventListener('change', (e) => {
      this.currentFilterStatus = e.target.value;
      this.renderCurrentView();
    });
    document.getElementById('filterAccessDynamic')?.addEventListener('change', (e) => {
      this.currentFilterAccess = e.target.value;
      this.renderCurrentView();
    });
  }

  renderDocRow(doc) {
    let expBadge = '';
    if (doc.status === 'vencido') {
      expBadge = `<span class="exp-badge vencido"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg> Vencido (${doc.expirationDate})</span>`;
    } else if (doc.status === 'proximo') {
      expBadge = `<span class="exp-badge urgente"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg> Renovar (${doc.expirationDate})</span>`;
    } else if (doc.status === 'permanente') {
      expBadge = `<span class="exp-badge permanente">Sin Vencimiento</span>`;
    } else {
      expBadge = `<span class="exp-badge vigente"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Vigente (${doc.expirationDate})</span>`;
    }

    let permBadge = '';
    if (doc.accessLevel === 'confidencial') {
      permBadge = `<span class="perm-badge confidencial"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg> Confidencial</span>`;
    } else if (doc.accessLevel === 'restringido') {
      permBadge = `<span class="perm-badge restringido"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg> Restringido</span>`;
    } else {
      permBadge = `<span class="perm-badge publico"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 14 14"></polyline></svg> Público Int.</span>`;
    }

    return `
      <tr>
        <td>
          <div class="doc-cell">
            <div class="doc-type-icon ${doc.type}">${doc.type.toUpperCase()}</div>
            <div>
              <div class="doc-info-title">${doc.title}</div>
              <div class="doc-info-sub">
                <span>${doc.id}</span>
                <span>•</span>
                <span>${doc.size}</span>
                <span>•</span>
                <span>${doc.tags.map(t => '#' + t).join(' ')}</span>
              </div>
            </div>
          </div>
        </td>
        <td>
          <span class="tag-badge ${doc.category}">
            ${doc.category === 'laborales' ? 'Laboral' : 'Administrativo'}
          </span>
        </td>
        <td>
          <div style="font-weight: 600; font-size: 0.82rem;">${doc.department}</div>
          <div style="font-size: 0.74rem; color: var(--color-text-muted);">${doc.employee}</div>
        </td>
        <td>
          <button class="btn-secondary" style="padding: 0.2rem 0.5rem; font-size: 0.75rem;" onclick="app.showVersionsModal('${doc.id}')" title="Ver versiones del documento">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="1 4 1 10 7 10"></polyline><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path></svg>
            ${doc.version} (${doc.versions.length})
          </button>
        </td>
        <td>${expBadge}</td>
        <td>
          <span style="cursor: pointer;" onclick="app.showPermModal('${doc.id}')" title="Configurar permisos">${permBadge}</span>
        </td>
        <td style="text-align: right;">
          <div class="action-btns" style="justify-content: flex-end;">
            ${(doc.status === 'proximo' || doc.status === 'vencido') ? `
              <button class="icon-btn" style="background: rgba(220, 38, 38, 0.2); color: #f87171; border-color: rgba(220, 38, 38, 0.4);" onclick="app.showRenewModal('${doc.id}')" title="Renovar documento">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M23 4v6h-6"></path><path d="M1 20v-6h6"></path><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
              </button>
            ` : ''}
            <button class="icon-btn" onclick="app.showVersionsModal('${doc.id}')" title="Historial de versiones y cambios">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 8v4l3 3"></path><circle cx="12" cy="12" r="9"></circle></svg>
            </button>
            <button class="icon-btn" onclick="app.showPermModal('${doc.id}')" title="Gestionar permisos y seguridad">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            </button>
            <button class="icon-btn" onclick="app.downloadDoc('${doc.id}')" title="Descargar documento verificado">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            </button>
          </div>
        </td>
      </tr>
    `;
  }

  renderAuditLogs(container) {
    container.innerHTML = `
      <div class="view-header">
        <div class="view-title-group">
          <h2>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            Historial de Acceso y Trazabilidad (Auditoría Aura)
          </h2>
          <p>Registro inmutable de descargas, aperturas, modificaciones de permisos y renovaciones</p>
        </div>
        <div>
          <button class="btn-secondary" onclick="app.clearAuditNotice()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
            Exportar Auditoría a Excel
          </button>
        </div>
      </div>

      <div class="timeline-card">
        <div class="timeline-list">
          ${this.logs.map(log => `
            <div class="timeline-item">
              <div class="timeline-icon-box">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              </div>
              <div class="timeline-content">
                <div class="timeline-header">
                  <div class="timeline-title">${log.user} - <span style="color: var(--color-primary);">${log.action}</span></div>
                  <div class="timeline-time">${log.date}</div>
                </div>
                <div class="timeline-desc">
                  Documento: <strong>${log.docName}</strong> (ID: ${log.docId})
                </div>
                <div>
                  <span class="timeline-badge">${log.badge}</span>
                  <span class="timeline-badge" style="background: rgba(220,38,38,0.1); color: #f87171;">IP: ${log.ip}</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // Métodos de interacción y modales
  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('open');
    }
  }

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('open');
    }
  }

  showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${type === 'success' ? '#10b981' : '#DC2626'}" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
      <span>${message}</span>
    `;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(120%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3800);
  }

  handleUploadDocument() {
    const title = document.getElementById('newDocTitle').value.trim();
    const category = document.getElementById('newDocCategory').value;
    const dept = document.getElementById('newDocDept').value.trim();
    const employee = document.getElementById('newDocEmp').value.trim() || 'General Aura';
    const access = document.getElementById('newDocAccess').value;
    const expDate = document.getElementById('newDocExpDate').value;
    const notes = document.getElementById('newDocNotes').value.trim();

    if (!title) {
      alert("Por favor ingrese el título del documento.");
      return;
    }

    const docId = `DOC-2026-0${this.docs.length + 1}`;
    let status = 'vigente';
    if (!expDate) {
      status = 'permanente';
    } else {
      const now = new Date();
      const exp = new Date(expDate);
      const diffDays = Math.ceil((exp - now) / (1000 * 60 * 60 * 24));
      if (diffDays <= 0) status = 'vencido';
      else if (diffDays <= 45) status = 'proximo';
    }

    const newDoc = {
      id: docId,
      title: title,
      category: category,
      type: "pdf",
      size: "1.5 MB",
      version: "v1.0",
      accessLevel: access,
      department: dept,
      employee: employee,
      uploadDate: new Date().toISOString().split('T')[0],
      expirationDate: expDate || "permanente",
      status: status,
      tags: [category === 'laborales' ? 'Laboral' : 'Administrativo', dept],
      versions: [
        {
          v: "v1.0",
          date: new Date().toLocaleString(),
          author: "Usuario Conectado (Aura)",
          change: notes || "Carga inicial y registro del documento"
        }
      ]
    };

    this.docs.unshift(newDoc);

    // Agregar log
    this.logs.unshift({
      id: `LOG-${Date.now().toString().slice(-4)}`,
      user: "Usuario Conectado",
      action: "Carga de nuevo documento",
      docId: docId,
      docName: title,
      date: new Date().toLocaleString(),
      ip: "192.168.1.15",
      badge: "Registro Exitoso"
    });

    this.saveToStorage();
    this.updateStats();
    this.closeModal('uploadModal');
    this.renderCurrentView();
    this.showToast(`Documento ${docId} registrado y clasificado exitosamente.`);

    document.getElementById('uploadDocForm').reset();
  }

  showVersionsModal(docId) {
    const doc = this.docs.find(d => d.id === docId);
    if (!doc) return;

    const modalBody = document.getElementById('versionModalBody');
    document.getElementById('versionModalTitle').textContent = `Versiones: ${doc.title}`;

    modalBody.innerHTML = `
      <div style="margin-bottom: 1rem; padding: 0.85rem; background: #0d1e34; border-radius: 8px; border: 1px solid var(--color-navy-border);">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-weight: 700; color: #fff;">Versión Actual: ${doc.version}</span>
          <span class="tag-badge ${doc.category}">${doc.category.toUpperCase()}</span>
        </div>
        <p style="font-size: 0.78rem; color: var(--color-text-muted); margin-top: 4px;">ID: ${doc.id} • Clasificación: ${doc.department}</p>
      </div>

      <h4 style="font-size: 0.88rem; margin-bottom: 0.75rem; color: #fff;">Historial Cronológico de Versiones</h4>
      <div class="timeline-list">
        ${doc.versions.map(v => `
          <div class="timeline-item" style="padding-bottom: 1.2rem;">
            <div class="timeline-icon-box" style="width: 28px; height: 28px;">
              <span style="font-size: 0.7rem; font-weight: 800; color: #fff;">${v.v}</span>
            </div>
            <div class="timeline-content">
              <div class="timeline-header">
                <span class="timeline-title">${v.author}</span>
                <span class="timeline-time">${v.date}</span>
              </div>
              <p class="timeline-desc">${v.change}</p>
              <button class="btn-secondary" style="margin-top: 6px; padding: 0.2rem 0.6rem; font-size: 0.72rem;" onclick="app.downloadVersion('${doc.id}', '${v.v}')">
                Descargar esta versión (${v.v})
              </button>
            </div>
          </div>
        `).join('')}
      </div>

      <div style="margin-top: 1rem; border-top: 1px solid var(--color-navy-border); padding-top: 1rem;">
        <h5 style="font-size: 0.85rem; margin-bottom: 0.5rem; color: #fff;">Subir Nueva Versión (Incremento de versión)</h5>
        <div style="display: flex; gap: 0.5rem;">
          <input type="text" id="newVersionNote" class="form-control" placeholder="Motivo del cambio / Actualización..." style="flex: 1;" />
          <button class="btn-primary" onclick="app.submitNewVersion('${doc.id}')">
            Actualizar Versión
          </button>
        </div>
      </div>
    `;

    this.openModal('versionModal');
  }

  submitNewVersion(docId) {
    const note = document.getElementById('newVersionNote')?.value.trim();
    if (!note) {
      alert("Por favor ingrese el motivo o cambio de la nueva versión.");
      return;
    }

    const doc = this.docs.find(d => d.id === docId);
    if (!doc) return;

    const currentMajor = parseInt(doc.version.replace('v', '').split('.')[0]) || 1;
    const currentMinor = parseInt(doc.version.replace('v', '').split('.')[1]) || 0;
    const nextVersion = `v${currentMajor}.${currentMinor + 1}`;

    doc.version = nextVersion;
    doc.versions.unshift({
      v: nextVersion,
      date: new Date().toLocaleString(),
      author: "Usuario Conectado (Aura)",
      change: note
    });

    this.logs.unshift({
      id: `LOG-${Date.now().toString().slice(-4)}`,
      user: "Usuario Conectado",
      action: `Nueva versión subida (${nextVersion})`,
      docId: doc.id,
      docName: doc.title,
      date: new Date().toLocaleString(),
      ip: "192.168.1.15",
      badge: "Nueva Versión"
    });

    this.saveToStorage();
    this.closeModal('versionModal');
    this.renderCurrentView();
    this.showToast(`Documento ${doc.id} actualizado a la versión ${nextVersion}`);
  }

  showPermModal(docId) {
    const doc = this.docs.find(d => d.id === docId);
    if (!doc) return;

    document.getElementById('permDocId').value = doc.id;
    document.getElementById('permDocTitle').textContent = doc.title;
    document.getElementById('permSelectLevel').value = doc.accessLevel;

    this.openModal('permModal');
  }

  handleSavePermissions() {
    const docId = document.getElementById('permDocId').value;
    const newLevel = document.getElementById('permSelectLevel').value;
    const doc = this.docs.find(d => d.id === docId);
    if (!doc) return;

    doc.accessLevel = newLevel;

    this.logs.unshift({
      id: `LOG-${Date.now().toString().slice(-4)}`,
      user: "Usuario Conectado",
      action: `Permisos modificados a ${newLevel.toUpperCase()}`,
      docId: doc.id,
      docName: doc.title,
      date: new Date().toLocaleString(),
      ip: "192.168.1.15",
      badge: "Control de Acceso"
    });

    this.saveToStorage();
    this.closeModal('permModal');
    this.renderCurrentView();
    this.showToast(`Permisos de acceso actualizados para ${doc.id}`);
  }

  showRenewModal(docId) {
    const doc = this.docs.find(d => d.id === docId);
    if (!doc) return;

    document.getElementById('renewDocId').value = doc.id;
    document.getElementById('renewDocTitle').textContent = doc.title;
    document.getElementById('renewCurrentExp').textContent = doc.expirationDate;

    this.openModal('renewModal');
  }

  handleRenewDocument() {
    const docId = document.getElementById('renewDocId').value;
    const newDate = document.getElementById('renewNewDate').value;
    const notes = document.getElementById('renewNotes').value.trim();

    if (!newDate) {
      alert("Por favor seleccione la nueva fecha de vencimiento.");
      return;
    }

    const doc = this.docs.find(d => d.id === docId);
    if (!doc) return;

    doc.expirationDate = newDate;
    doc.status = 'vigente';

    // Generar nueva version por renovación
    const curV = doc.version;
    const major = parseInt(curV.replace('v', '').split('.')[0]) + 1;
    doc.version = `v${major}.0`;
    doc.versions.unshift({
      v: doc.version,
      date: new Date().toLocaleString(),
      author: "Oficina de Renovaciones Aura",
      change: `Renovación de vigencia hasta ${newDate}. Observaciones: ${notes || 'Trámite concluido favorablemente'}`
    });

    this.logs.unshift({
      id: `LOG-${Date.now().toString().slice(-4)}`,
      user: "Usuario Conectado",
      action: `Renovación exitosa hasta ${newDate}`,
      docId: doc.id,
      docName: doc.title,
      date: new Date().toLocaleString(),
      ip: "192.168.1.15",
      badge: "Renovación Aprobada"
    });

    this.saveToStorage();
    this.updateStats();
    this.closeModal('renewModal');
    this.renderCurrentView();
    this.showToast(`Documento ${doc.id} renovado exitosamente hasta ${newDate}`);
  }

  downloadDoc(docId) {
    const doc = this.docs.find(d => d.id === docId);
    if (!doc) return;

    // Registrar en auditoría
    this.logs.unshift({
      id: `LOG-${Date.now().toString().slice(-4)}`,
      user: "Usuario Conectado",
      action: "Descarga de documento oficial",
      docId: doc.id,
      docName: doc.title,
      date: new Date().toLocaleString(),
      ip: "192.168.1.15",
      badge: "Descarga Segura"
    });
    this.saveToStorage();

    this.showToast(`Descargando ${doc.title} (${doc.version})...`);
  }

  downloadVersion(docId, version) {
    this.showToast(`Descargando archivo histórico ${docId} versión ${version}`);
  }

  clearAuditNotice() {
    this.showToast("Generando reporte de auditoría en formato Excel / CSV...");
  }
}

// Inicializar la aplicación cuando cargue la ventana
let app;
window.addEventListener('DOMContentLoaded', () => {
  app = new AuraDocsApp();
});
