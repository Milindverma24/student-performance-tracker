// Nexus Analytics Engine v4.0

// State Management
let students = JSON.parse(localStorage.getItem('student_tracker_pro_data')) || [
    { name: "John Doe", rollNo: "NX-101", subject: "Mathematics", marks: 85, attendance: 92, date: "2024-03-20" },
    { name: "Alice Smith", rollNo: "NX-102", subject: "Physics", marks: 92, attendance: 98, date: "2024-03-21" },
    { name: "Bob Johnson", rollNo: "NX-103", subject: "Literature", marks: 78, attendance: 65, date: "2024-03-22" },
    { name: "Charlie Brown", rollNo: "NX-104", subject: "Mathematics", marks: 65, attendance: 50, date: "2024-03-23" },
    { name: "Diana Prince", rollNo: "NX-105", subject: "Physics", marks: 95, attendance: 88, date: "2024-03-24" }
];

let selectedIds = new Set();

// Selectors
const mainContent = document.getElementById('main-content');
const tabBtns = document.querySelectorAll('.nav-btn');
const tabPanes = document.querySelectorAll('.tab-pane');
const studentForm = document.getElementById('add-student-form');
const studentListTable = document.getElementById('student-list');
const rosterSearch = document.getElementById('roster-search');
const toastBox = document.getElementById('toast-box');
const exportCsvBtn = document.getElementById('export-csv');
const exportJsonBtn = document.getElementById('export-json');
const bulkDeleteBtn = document.getElementById('bulk-delete');
const bulkActionsArea = document.getElementById('bulk-actions-area');
const selectedCountText = document.getElementById('selected-count');
const selectAllCheckbox = document.getElementById('select-all');

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initTabs();
    updateUI();
    setupCursorGlow();
});

// 1. Particle System
function initParticles() {
    const canvas = document.getElementById('canvas-particles');
    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = 60;
    const connectionDistance = 150;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 1.5 + 0.5;
            this.speedX = Math.random() * 0.4 - 0.2;
            this.speedY = Math.random() * 0.4 - 0.2;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        draw() {
            ctx.fillStyle = "rgba(0, 229, 255, 0.4)";
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function drawLines() {
        for (let a = 0; a < particles.length; a++) {
            for (let b = a; b < particles.length; b++) {
                const dx = particles[a].x - particles[b].x;
                const dy = particles[a].y - particles[b].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < connectionDistance) {
                    const opacity = 1 - (distance / connectionDistance);
                    ctx.strokeStyle = `rgba(0, 229, 255, ${opacity * 0.15})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        drawLines();
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resize);
    resize();
    for (let i = 0; i < particleCount; i++) particles.push(new Particle());
    animate();
}

// 2. Tab Navigation
function initTabs() {
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-target');
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById(target).classList.add('active');
            
            // Refresh charts in target tab
            setTimeout(() => {
                Object.values(charts).forEach(c => c?.resize?.());
            }, 100);
        });
    });
}

// 3. Form Handling
studentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('student-name').value;
    const rollNo = document.getElementById('student-roll').value;
    const subject = document.getElementById('student-subject').value;
    const marks = parseInt(document.getElementById('student-marks').value);
    const attendance = parseInt(document.getElementById('student-attendance').value);
    
    if (students.find(s => s.rollNo === rollNo)) {
        showToast("Roll number already exists!", "error");
        return;
    }

    students.push({
        name, rollNo, subject, marks, attendance,
        date: new Date().toISOString().split('T')[0]
    });

    saveData();
    updateUI();
    studentForm.reset();
    showToast(`Appended ${name} to roster.`);
});

// 4. UI Updates
function updateUI() {
    renderRoster(students);
    updateStats();
    updateAtRisk();
    populatePredictor();
    updateBulkUI();
    generateAIInsights();
    updateAttendanceSummary();
}

function renderRoster(data) {
    studentListTable.innerHTML = '';
    data.forEach(s => {
        const tr = document.createElement('tr');
        const isAtRisk = s.attendance < 75;
        const markColor = s.marks >= 80 ? '#00DC82' : s.marks >= 60 ? '#FFD700' : '#FF3B30';

        tr.innerHTML = `
            <td class="checkbox-col">
                <input type="checkbox" class="student-check" ${selectedIds.has(s.rollNo) ? 'checked' : ''} onchange="toggleSelect('${s.rollNo}')">
            </td>
            <td><code>${s.rollNo}</code></td>
            <td><strong>${s.name}</strong></td>
            <td><span class="text-secondary">${s.subject}</span></td>
            <td>
                <span class="badge-marks" style="background: ${markColor}22; color: ${markColor}; border: 1px solid ${markColor}33">
                    ${s.marks}%
                </span>
            </td>
            <td>
                <span class="badge-attendance ${isAtRisk ? 'badge-at-risk' : ''}">
                    ${s.attendance}%
                </span>
            </td>
            <td>
                <button class="btn-magenta" style="padding: 4px 8px; border-radius: 6px;" onclick="deleteStudent('${s.rollNo}')">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                </button>
            </td>
        `;
        studentListTable.appendChild(tr);
    });
}

function updateStats() {
    if (students.length === 0) {
        document.getElementById('top-performer-val').textContent = "-";
        document.getElementById('top-performer-name').textContent = "Awaiting Data";
        document.getElementById('avg-marks-val').textContent = "0.0";
        document.getElementById('avg-attendance-val').textContent = "0.0";
        document.getElementById('total-students-val').textContent = "0";
        return;
    }

    const topper = [...students].sort((a, b) => b.marks - a.marks)[0];
    const avgMarks = (students.reduce((acc, s) => acc + s.marks, 0) / students.length).toFixed(1);
    const avgAttendance = (students.reduce((acc, s) => acc + s.attendance, 0) / students.length).toFixed(1);

    animateValue('top-performer-val', topper.marks);
    document.getElementById('top-performer-name').textContent = topper.name;
    animateValue('avg-marks-val', avgMarks);
    animateValue('avg-attendance-val', avgAttendance);
    animateValue('total-students-val', students.length);
}

function updateAttendanceSummary() {
    const el = document.getElementById('attendance-summary-text');
    if (!el) return;
    if (students.length === 0) {
        el.innerHTML = "Analysis engine standby. Visit the Roster to update student data.";
        return;
    }
    const avgAtt = (students.reduce((acc, s) => acc + s.attendance, 0) / students.length).toFixed(1);
    const lowAtt = students.filter(s => s.attendance < 75).length;
    el.innerHTML = `Global participation rate is at <span class='text-cyan'>${avgAtt}%</span>. <br>Detected <span class='text-magenta'>${lowAtt}</span> students below the 75% threshold requiring intervention.`;
}

// Charts removed per request.

// 6. Prediction Engine
function populatePredictor() {
    const select = document.getElementById('predict-student-select');
    const currentVal = select.value;
    select.innerHTML = '<option value="" disabled selected>Choose a student...</option>';
    students.forEach(s => {
        const opt = document.createElement('option');
        opt.value = s.rollNo;
        opt.textContent = `${s.name} (${s.rollNo})`;
        select.appendChild(opt);
    });
    if (currentVal && students.find(s => s.rollNo === currentVal)) select.value = currentVal;
}

document.getElementById('run-prediction').addEventListener('click', () => {
    const rollNo = document.getElementById('predict-student-select').value;
    if (!rollNo) return;

    const s = students.find(item => item.rollNo === rollNo);
    const results = document.getElementById('prediction-results');
    results.style.display = 'block';

    // Algo: 70% Marks + 30% Attendance
    const projected = (s.marks * 0.7 + s.attendance * 0.3).toFixed(1);
    document.getElementById('projected-score').textContent = `${projected}%`;

    const txt = document.getElementById('prediction-text');
    const p = parseFloat(projected);
    let msg = "";
    if (p > 85) msg = "Primary node suggests HIGH probability of Academic Excellence (A-Grade). Keep current compliance.";
    else if (p > 70) msg = "Stable trajectory detected. Expected B-Grade outcome. Participation within normal parameters.";
    else if (p > 50) msg = "Caution: Signal degradation. C-Grade outcome projected. Minimal participation impact detected.";
    else msg = "CRITICAL: High failure probability detected. Immediate system override and intervention required.";
    
    txt.innerHTML = msg;
});

// 7. AI Insights
function generateAIInsights() {
    const textEl = document.getElementById('ai-insight-text');
    if (students.length === 0) {
        textEl.innerHTML = "Initializing neural engine... adding student records to begin inference.";
        return;
    }

    const avgAtt = students.reduce((a, b) => a + b.attendance, 0) / students.length;
    const correlations = students.map(s => s.marks - s.attendance);
    const trend = correlations.reduce((a, b) => a + b, 0) / students.length;

    let insight = `SYSTEM_SCAN: Neural engine detects a ${avgAtt > 80 ? 'HIGH' : 'MODERATE'} behavioral compliance sync. `;
    insight += `Academic-Attendance delta is currently ${trend.toFixed(1)} units. <br><br>`;
    
    const lowAtt = students.filter(s => s.attendance < 75);
    if (lowAtt.length > 0) {
        insight += `ALERT: Binary regression identifies ${lowAtt.length} nodes with CRITICAL attendance impedance. Recursive intervention recommended for node ${lowAtt[0].rollNo}.`;
    } else {
        insight += `STATUS: Optimized distribution. No critical anomalies detected in current batch.`;
    }

    typewriter(textEl, insight);
}

function typewriter(el, text) {
    el.innerHTML = "";
    let i = 0;
    const speed = 10;
    
    function type() {
        if (i < text.length) {
            const char = text.charAt(i);
            if (char === '<') {
                const end = text.indexOf('>', i);
                el.innerHTML += text.substring(i, end + 1);
                i = end + 1;
            } else {
                el.innerHTML += char;
                i++;
            }
            setTimeout(type, speed);
        }
    }
    type();
}

// 8. Utility Functions
function updateAtRisk() {
    const list = document.getElementById('at-risk-list');
    list.innerHTML = '';
    students.filter(s => s.attendance < 75).forEach(s => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><code>${s.rollNo}</code></td>
            <td>${s.name}</td>
            <td style="color: var(--accent-danger); font-weight: 600;">${s.attendance}%</td>
            <td><span class="badge-at-risk">Critical</span></td>
        `;
        list.appendChild(tr);
    });
}

function toggleSelect(id) {
    if (selectedIds.has(id)) selectedIds.delete(id);
    else selectedIds.add(id);
    updateBulkUI();
}

function updateBulkUI() {
    const count = selectedIds.size;
    selectedCountText.textContent = count;
    bulkActionsArea.style.display = count > 0 ? 'flex' : 'none';
}

// Bulk Actions Logic
bulkDeleteBtn.addEventListener('click', () => {
    if (confirm(`Purge ${selectedIds.size} records?`)) {
        students = students.filter(s => !selectedIds.has(s.rollNo));
        selectedIds.clear();
        saveData();
        updateUI();
        showToast("Bulk records purged.");
    }
});

selectAllCheckbox.addEventListener('change', (e) => {
    if (e.target.checked) {
        students.forEach(s => selectedIds.add(s.rollNo));
    } else {
        selectedIds.clear();
    }
    updateUI();
});

function deleteStudent(id) {
    students = students.filter(s => s.rollNo !== id);
    saveData();
    updateUI();
    showToast("Record purged from database.", "success");
}

function saveData() {
    localStorage.setItem('student_tracker_pro_data', JSON.stringify(students));
}

function showToast(msg) {
    const toast = document.createElement('div');
    toast.className = 'custom-toast';
    toast.textContent = msg;
    toastBox.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(20px)';
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}

function animateValue(id, end) {
    const obj = document.getElementById(id);
    if (!obj) return;
    const start = parseFloat(obj.textContent.replace(/[^0-9.]/g, '')) || 0;
    const duration = 1200;
    let startTime = null;

    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = start + (end - start) * easeOutQuart;
        
        obj.textContent = id.includes('avg') ? current.toFixed(1) : Math.floor(current);
        if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}

// 9. Export Logic
exportCsvBtn.addEventListener('click', () => {
    const headers = ['RollNo', 'Name', 'Subject', 'Marks', 'Attendance', 'Date'];
    const rows = students.map(s => [s.rollNo, s.name, s.subject, s.marks, s.attendance, s.date]);
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    downloadFile(csvContent, "student_roster.csv", "text/csv");
});

exportJsonBtn.addEventListener('click', () => {
    const jsonContent = JSON.stringify(students, null, 2);
    downloadFile(jsonContent, "student_roster.json", "application/json");
});

function downloadFile(content, fileName, contentType) {
    const a = document.createElement("a");
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

// 10. Advanced Interactivity
function setupCursorGlow() {
    document.addEventListener('mousemove', e => {
        const cards = document.querySelectorAll('.glass-card');
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

// Global scope for HTML handlers
window.deleteStudent = deleteStudent;
window.toggleSelect = toggleSelect;
window.runPrediction = () => document.getElementById('run-prediction').click();
