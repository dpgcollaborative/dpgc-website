/* ===== Category palette (aligned with journey.css band colours) ===== */
const CAT = { infra: '#0c7d7d', sect: '#2f80ed', interop: '#7a5af0' };

/* ===== Canonical node geometry (viewBox 700 x 400) =====
   Three bands: SECTORAL (top), INTEROP (mid), INFRA (bottom). */
const NODES = {
  DHIS2:    { cat:'sect',    name:'DHIS2',    x:56,  y:56,  w:160, h:80 },
  OpenSPP:  { cat:'sect',    name:'OpenSPP',  x:270, y:56,  w:160, h:80 },
  OpenCRVS: { cat:'sect',    name:'OpenCRVS', x:484, y:56,  w:160, h:80 },
  OpenFn:   { cat:'interop', name:'OpenFn',   x:270, y:196, w:160, h:80 },
  MOSIP:    { cat:'infra',   name:'MOSIP',    x:270, y:336, w:160, h:80 },
  Mifos:    { cat:'infra',   name:'Mifos',    x:484, y:336, w:160, h:80 },
};

/* ===== Content model ===== */
const EVENTS = [
  { id:'pregnancy', title:'Before birth', sub:'Pregnancy & antenatal care',
    cases:[ {stub:true,title:'Antenatal care registration'}, {stub:true,title:'Maternal cash incentive'} ] },

  { id:'birth', title:'Birth', sub:'A new citizen enters the system', deep:true, cases:[
    {
      title:'Birth notification & registration',
      summary:'A facility-attended birth becomes a legal identity — automatically.',
      description:'When a birth is recorded at a health facility in DHIS2, OpenFn relays the notification to OpenCRVS, which opens a legal civil registration record and authenticates the parent through MOSIP. The family leaves with a registered birth, with no separate trip to a registrar.',
      diagram:{
        nodes:[
          {key:'DHIS2',    as:'Health information'},
          {key:'OpenFn',   as:'Orchestration'},
          {key:'OpenCRVS', as:'Civil registration'},
          {key:'MOSIP',    as:'Parent authentication'},
        ],
        edges:[
          { d:'M136 136 L136 168 L350 168 L350 196', label:'birth notify', lx:243, ly:168, lw:64 },
          { d:'M400 196 L400 168 L564 168 L564 136', label:'register',     lx:482, ly:168, lw:52 },
          { d:'M610 136 L610 306 L380 306 L380 336', label:'UIN creation', lx:498, ly:306, lw:74 },
          { d:'M76 136 L76 356 L270 356', label:'parent auth', lx:165, ly:356, lw:70, dashed:true },
        ]
      }
    },
    {
      title:'Foundational ID enrolment',
      summary:'The verified birth record seeds a lifelong unique identity.',
      description:'OpenCRVS passes the verified birth record through OpenFn to MOSIP, which issues a Unique Identification Number. That number becomes the anchor identity the citizen relies on for every public service that follows.',
      diagram:{
        nodes:[
          {key:'OpenCRVS', as:'Civil registration'},
          {key:'OpenFn',   as:'Orchestration'},
          {key:'MOSIP',    as:'Foundational ID'},
        ],
        edges:[
          { d:'M564 136 L564 168 L350 168 L350 196', label:'verified birth', lx:457, ly:168, lw:84 },
          { d:'M350 276 L350 336', label:'issue UIN', lx:350, ly:306, lw:60 },
        ]
      }
    },
    {
      title:'Child grant enrolment',
      summary:'Eligible families are enrolled into social protection at the point of birth.',
      description:'MOSIP authenticates the parent and OpenCRVS confirms eligibility, OpenFn enrols the family into the OpenSPP social registry, and Mifos disburses the first government-to-person payment. An eligible family can begin receiving a child grant from day one.',
      diagram:{
        nodes:[
          {key:'MOSIP',    as:'Authentication'},
          {key:'OpenCRVS', as:'Civil registration'},
          {key:'OpenFn',   as:'Orchestration'},
          {key:'OpenSPP',  as:'Social registry'},
          {key:'Mifos',    as:'G2P payments'},
        ],
        edges:[
          { d:'M310 336 L310 276', label:'auth', lx:310, ly:306, lw:34, dashed:true },
          { d:'M564 136 L564 168 L400 168 L400 196', label:'eligibility', lx:486, ly:168, lw:62 },
          { d:'M350 196 L350 136', label:'enrol', lx:350, ly:166, lw:44 },
          { d:'M390 136 L390 306 L564 306 L564 336', label:'disburse', lx:478, ly:306, lw:58 },
        ]
      }
    },
    {
      title:'Immunization schedule initiation',
      summary:'Registration kick-starts the child’s preventive health calendar.',
      description:'The birth event in OpenCRVS flows through OpenFn into DHIS2, which creates the child’s health record and schedules the routine immunization calendar. Preventive care is booked before the family even gets home.',
      diagram:{
        nodes:[
          {key:'OpenCRVS', as:'Civil registration'},
          {key:'OpenFn',   as:'Orchestration'},
          {key:'DHIS2',    as:'Immunization registry'},
        ],
        edges:[
          { d:'M564 136 L564 168 L350 168 L350 196', label:'birth event',  lx:457, ly:168, lw:70 },
          { d:'M300 196 L300 168 L136 168 L136 136', label:'create record', lx:218, ly:168, lw:82 },
        ]
      }
    },
  ]},

  { id:'childhood', title:'Early childhood', sub:'Growth, nutrition & immunization',
    cases:[ {stub:true,title:'Growth monitoring'}, {stub:true,title:'Nutrition programme enrolment'}, {stub:true,title:'Routine immunization'} ] },
  { id:'school', title:'School age', sub:'Enrolment & conditional support',
    cases:[ {stub:true,title:'School enrolment'}, {stub:true,title:'Conditional cash transfer'}, {stub:true,title:'School feeding'} ] },
  { id:'youth', title:'Coming of age', sub:'ID upgrade, exams & first account',
    cases:[ {stub:true,title:'Biometric ID upgrade'}, {stub:true,title:'Exam registration'}, {stub:true,title:'First bank account (eKYC)'} ] },
  { id:'work', title:'Working life', sub:'Business, credit & tax',
    cases:[ {stub:true,title:'Microbusiness registration'}, {stub:true,title:'Microloan application'}, {stub:true,title:'Tax registration'} ] },
  { id:'marriage', title:'Marriage', sub:'Registration & record updates',
    cases:[ {stub:true,title:'Marriage registration'}, {stub:true,title:'Record & name updates'} ] },
  { id:'parenthood', title:'Parenthood', sub:'The cycle begins again',
    cases:[ {stub:true,title:'Maternity benefit'}, {stub:true,title:'Next-generation birth registration'} ] },
  { id:'shock', title:'Shock & crisis', sub:'Rapid emergency response',
    cases:[ {stub:true,title:'Emergency cash transfer'}, {stub:true,title:'Disease surveillance'}, {stub:true,title:'Beneficiary re-verification'} ] },
  { id:'oldage', title:'Old age', sub:'Pension & continued care',
    cases:[ {stub:true,title:'Pension enrolment'}, {stub:true,title:'Pension disbursement'}, {stub:true,title:'Chronic care'} ] },
  { id:'death', title:'Death', sub:'Registration, succession & closure',
    cases:[ {stub:true,title:'Death registration'}, {stub:true,title:'Survivor benefits'}, {stub:true,title:'ID deactivation & succession'} ] },
];

let state = { eventId:'birth', caseIdx:0 };

/* ===== Render: events ===== */
function renderEvents() {
  const el = document.getElementById('eventsList');
  el.innerHTML = '';
  EVENTS.forEach(ev => {
    const b = document.createElement('button');
    b.className = 'event-item' + (ev.deep ? ' deep' : ' scaffold') + (ev.id === state.eventId ? ' active' : '');
    b.innerHTML = `<span class="ev-title">${ev.title}</span><span class="ev-sub">${ev.sub}</span>`;
    b.onclick = () => { state.eventId = ev.id; state.caseIdx = 0; renderAll(); };
    el.appendChild(b);
  });
}

/* ===== Render: cases ===== */
function renderCases() {
  const ev = EVENTS.find(e => e.id === state.eventId);
  const el = document.getElementById('casesList');
  document.getElementById('caseCount').textContent = ev.cases.length ? '· ' + ev.cases.length : '';
  el.innerHTML = '';
  if (!ev.cases.length) { el.innerHTML = '<div class="cases-empty">No use cases yet.</div>'; return; }
  ev.cases.forEach((c, i) => {
    const b = document.createElement('button');
    b.className = 'case-item' + (c.stub ? ' stub' : '') + (i === state.caseIdx ? ' active' : '');
    b.innerHTML = `<div class="case-title">${c.title}</div>` + (c.summary ? `<div class="case-sum">${c.summary}</div>` : '');
    b.onclick = () => { state.caseIdx = i; renderCases(); renderSchema(); };
    el.appendChild(b);
  });
}

/* ===== SVG builders ===== */
function nodeSVG(node) {
  const n = NODES[node.key], col = CAT[n.cat];
  let s = `<rect class="nr" x="${n.x}" y="${n.y}" width="${n.w}" height="${n.h}" rx="3" style="stroke:${col}"/>`;
  s += `<rect x="${n.x}" y="${n.y}" width="${n.w}" height="5" fill="${col}"/>`;
  s += `<text class="ntag" x="${n.x+14}" y="${n.y+26}" fill="${col}">${(node.as||'').toUpperCase()}</text>`;
  s += `<text class="nname" x="${n.x+14}" y="${n.y+54}">${n.name}</text>`;
  return s;
}

function edgeSVG(e) {
  let s = `<path class="fl${e.dashed ? ' dashed' : ''}" d="${e.d}" marker-end="url(#ah)"/>`;
  if (e.label) {
    s += `<rect x="${e.lx - e.lw/2}" y="${e.ly - 7}" width="${e.lw}" height="14" fill="#f6f8fa"/>`;
    s += `<text class="fllabel" x="${e.lx}" y="${e.ly + 3.3}" text-anchor="middle">${e.label}</text>`;
  }
  return s;
}

function diagramSVG(d) {
  let s = `<svg viewBox="0 0 700 460" preserveAspectRatio="xMidYMid meet" style="width:100%;height:auto;display:block">`;
  s += `<defs><marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
    <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></marker></defs>`;
  // layer labels + faint guides
  s += `<text class="glabel" x="16" y="50">SECTORAL</text>`;
  s += `<text class="glabel" x="16" y="240">INTEROP</text>`;
  s += `<text class="glabel" x="16" y="382">INFRA</text>`;
  s += `<line class="gline" x1="16" y1="160" x2="684" y2="160"/>`;
  s += `<line class="gline" x1="16" y1="300" x2="684" y2="300"/>`;
  // edges under nodes
  d.edges.forEach(e => { s += edgeSVG(e); });
  // nodes on top
  d.nodes.forEach(n => { s += nodeSVG(n); });
  // legend
  s += `<g transform="translate(486,24)">
    <line x1="0" y1="6" x2="22" y2="6" stroke="#33475b" stroke-width="1.25"/>
    <text class="fllabel" x="28" y="9">data</text>
    <line x1="78" y1="6" x2="100" y2="6" stroke="#33475b" stroke-width="1.25" stroke-dasharray="4 3"/>
    <text class="fllabel" x="106" y="9">auth</text>
  </g>`;
  s += `</svg>`;
  return s;
}

/* ===== Render: schema ===== */
function renderSchema() {
  const ev = EVENTS.find(e => e.id === state.eventId);
  const c = ev.cases[state.caseIdx];
  const titleEl = document.getElementById('schemaTitle');
  const sumEl = document.getElementById('schemaSummary');
  const body = document.getElementById('schemaBody');

  if (!c) {
    titleEl.textContent = 'Select a use case';
    sumEl.textContent = 'The supporting DPG architecture appears here.';
    body.innerHTML = '';
    return;
  }
  titleEl.textContent = c.title;
  sumEl.textContent = c.summary || ev.sub;

  if (c.stub) {
    body.innerHTML = `<div class="schema-placeholder">
      <div class="big">Architecture not yet detailed</div>
      <div class="mono">${ev.title.toUpperCase()} · ${c.title}</div>
      <div style="max-width:380px">This is where the DPG schematic and system hand-offs for this use case will be mapped out.</div>
    </div>`;
    return;
  }

  const desc = c.description ? `<p class="case-desc">${c.description}</p>` : '';
  body.innerHTML = `${desc}<div class="canvas">
    <div class="canvas-cap">Illustrative reference flow</div>
    ${diagramSVG(c.diagram)}
  </div>`;
}

function renderAll() { renderEvents(); renderCases(); renderSchema(); }
renderAll();
