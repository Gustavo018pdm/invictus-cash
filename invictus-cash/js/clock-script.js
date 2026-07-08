// ===== LISTA DE FUSOS HORÁRIOS PADRÃO =====
const DEFAULT_TIMEZONES = [
    'America/Sao_Paulo',
    'UTC',
    'Europe/London',
    'Asia/Tokyo'
];

const TIMEZONE_INFO = {
    'UTC': { name: 'UTC (Horário Universal)', offset: 0 },
    'America/New_York': { name: 'Nova York (EST/EDT)', offset: -5 },
    'America/Los_Angeles': { name: 'Los Angeles (PST/PDT)', offset: -8 },
    'America/Chicago': { name: 'Chicago (CST/CDT)', offset: -6 },
    'America/Denver': { name: 'Denver (MST/MDT)', offset: -7 },
    'America/Anchorage': { name: 'Anchorage (AKST/AKDT)', offset: -9 },
    'Pacific/Honolulu': { name: 'Honolulu (HST)', offset: -10 },
    'Europe/London': { name: 'Londres (GMT/BST)', offset: 0 },
    'Europe/Paris': { name: 'Paris (CET/CEST)', offset: 1 },
    'Europe/Berlin': { name: 'Berlim (CET/CEST)', offset: 1 },
    'Europe/Moscow': { name: 'Moscou (MSK)', offset: 3 },
    'Asia/Dubai': { name: 'Dubai (GST)', offset: 4 },
    'Asia/Kolkata': { name: 'Índia (IST)', offset: 5.5 },
    'Asia/Bangkok': { name: 'Bangkok (ICT)', offset: 7 },
    'Asia/Hong_Kong': { name: 'Hong Kong (HKT)', offset: 8 },
    'Asia/Shanghai': { name: 'Xangai (CST)', offset: 8 },
    'Asia/Tokyo': { name: 'Tóquio (JST)', offset: 9 },
    'Asia/Seoul': { name: 'Seul (KST)', offset: 9 },
    'Australia/Sydney': { name: 'Sydney (AEDT/AEST)', offset: 10 },
    'Australia/Melbourne': { name: 'Melbourne (AEDT/AEST)', offset: 10 },
    'Pacific/Auckland': { name: 'Auckland (NZDT/NZST)', offset: 12 },
    'America/Sao_Paulo': { name: 'São Paulo (BRT/BRST)', offset: -3 },
    'America/Argentina/Buenos_Aires': { name: 'Buenos Aires (ART)', offset: -3 },
    'Africa/Cairo': { name: 'Cairo (EET)', offset: 2 },
    'Africa/Johannesburg': { name: 'Johannesburgo (SAST)', offset: 2 },
    'Asia/Singapore': { name: 'Singapura (SGT)', offset: 8 }
};

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', () => {
    loadTimezones();
    updateAllClocks();
    // Atualizar relógios a cada 1 segundo
    setInterval(updateAllClocks, 1000);
});

// ===== CARREGAR FUSOS HORÁRIOS DO LOCALSTORAGE =====
function loadTimezones() {
    const stored = localStorage.getItem('selectedTimezones');
    const timezones = stored ? JSON.parse(stored) : DEFAULT_TIMEZONES;
    renderClocks(timezones);
}

// ===== RENDERIZAR RELÓGIOS =====
function renderClocks(timezones) {
    const container = document.getElementById('clocksContainer');
    container.innerHTML = '';

    if (timezones.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <h2>Nenhum fuso horário selecionado</h2>
                <p>Clique em "+ Adicionar Fuso Horário" para começar</p>
            </div>
        `;
        return;
    }

    timezones.forEach((timezone, index) => {
        const info = TIMEZONE_INFO[timezone] || { name: timezone, offset: 0 };
        const card = createClockCard(timezone, info.name, index);
        container.appendChild(card);
    });
}

// ===== CRIAR CARD DO RELÓGIO =====
function createClockCard(timezone, displayName, index) {
    const card = document.createElement('div');
    card.className = 'clock-card';
    card.id = `clock-${index}`;

    card.innerHTML = `
        <div class="clock-header">
            <div>
                <div class="timezone-name">${displayName.split('(')[0].trim()}</div>
                <div class="timezone-offset">${displayName.split('(')[1] || timezone}</div>
            </div>
            <button class="btn-remove" onclick="removeTimezone('${timezone}')">Remover</button>
        </div>
        <div class="clock-display">
            <div class="time" id="time-${index}">--:--:--</div>
            <div class="period" id="period-${index}">--</div>
        </div>
        <div class="clock-info">
            <div class="info-box">
                <div class="info-label">Data</div>
                <div class="info-value" id="date-${index}">--/--</div>
            </div>
            <div class="info-box">
                <div class="info-label">Dia</div>
                <div class="info-value" id="day-${index}">--</div>
            </div>
        </div>
    `;

    return card;
}

// ===== ATUALIZAR TODOS OS RELÓGIOS =====
function updateAllClocks() {
    const stored = localStorage.getItem('selectedTimezones');
    const timezones = stored ? JSON.parse(stored) : DEFAULT_TIMEZONES;

    timezones.forEach((timezone, index) => {
        updateClock(timezone, index);
    });
}

// ===== ATUALIZAR RELÓGIO INDIVIDUAL =====
function updateClock(timezone, index) {
    try {
        // Obter hora atual no fuso horário específico
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('pt-BR', {
            timeZone: timezone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });

        const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
            timeZone: timezone,
            day: '2-digit',
            month: '2-digit'
        });

        const dayFormatter = new Intl.DateTimeFormat('pt-BR', {
            timeZone: timezone,
            weekday: 'long'
        });

        const time = formatter.format(now);
        const date = dateFormatter.format(now);
        const day = dayFormatter.format(now);

        // Determinar AM/PM
        const [hours] = time.split(':');
        const period = parseInt(hours) >= 12 ? 'PM' : 'AM';

        // Atualizar DOM
        const timeElement = document.getElementById(`time-${index}`);
        const periodElement = document.getElementById(`period-${index}`);
        const dateElement = document.getElementById(`date-${index}`);
        const dayElement = document.getElementById(`day-${index}`);

        if (timeElement) timeElement.textContent = time;
        if (periodElement) periodElement.textContent = period;
        if (dateElement) dateElement.textContent = date;
        if (dayElement) dayElement.textContent = day.charAt(0).toUpperCase() + day.slice(1);

    } catch (error) {
        console.error(`Erro ao atualizar relógio ${timezone}:`, error);
    }
}

// ===== ADICIONAR FUSO HORÁRIO VIA MODAL =====
function addTimezone() {
    const select = document.getElementById('timezoneSelect');
    const timezone = select.value;

    if (!timezone) {
        alert('Por favor, selecione um fuso horário');
        return;
    }

    let timezones = JSON.parse(localStorage.getItem('selectedTimezones') || JSON.stringify(DEFAULT_TIMEZONES));

    if (timezones.includes(timezone)) {
        alert('Este fuso horário já está adicionado');
        return;
    }

    timezones.push(timezone);
    localStorage.setItem('selectedTimezones', JSON.stringify(timezones));

    closeTimezoneModal();
    loadTimezones();
    updateAllClocks();

    // Reset select
    select.value = '';
}

// ===== REMOVER FUSO HORÁRIO =====
function removeTimezone(timezone) {
    let timezones = JSON.parse(localStorage.getItem('selectedTimezones') || JSON.stringify(DEFAULT_TIMEZONES));
    timezones = timezones.filter(tz => tz !== timezone);

    localStorage.setItem('selectedTimezones', JSON.stringify(timezones));
    loadTimezones();
    updateAllClocks();
}

// ===== RESTAURAR PADRÃO =====
function resetToDefault() {
    if (confirm('Tem certeza que deseja restaurar os fusos horários padrão?')) {
        localStorage.setItem('selectedTimezones', JSON.stringify(DEFAULT_TIMEZONES));
        loadTimezones();
        updateAllClocks();
    }
}

// ===== FUNÇÕES DO MODAL =====
function addTimezoneModal() {
    const modal = document.getElementById('timezoneModal');
    modal.classList.add('show');
}

function closeTimezoneModal() {
    const modal = document.getElementById('timezoneModal');
    modal.classList.remove('show');
}

// ===== FECHAR MODAL AO CLICAR FORA =====
window.onclick = function (event) {
    const modal = document.getElementById('timezoneModal');
    if (event.target === modal) {
        modal.classList.remove('show');
    }
};

// ===== VALIDAÇÃO COM ENTER NA BUSCA =====
document.addEventListener('DOMContentLoaded', () => {
    const select = document.getElementById('timezoneSelect');
    if (select) {
        select.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                addTimezone();
            }
        });
    }
});

// ===== DARK MODE AUTOMÁTICO =====
function setDarkMode() {
    const hour = new Date().getHours();
    if (hour < 6 || hour > 20) {
        document.body.style.filter = 'brightness(0.9)';
    }
}

// Chamar ao inicializar
setTimeout(setDarkMode, 1000);
