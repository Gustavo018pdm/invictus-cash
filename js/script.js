// ===== SMOOTH SCROLL PARA LINKS DE NAVEGAÇÃO =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== ANIMAÇÃO DE ENTRADA DOS ELEMENTOS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar cards e seções
document.querySelectorAll('.feature-card, .solucao-card, .recurso-card').forEach(card => {
    card.classList.add('fade-in');
    observer.observe(card);
});

// ===== ADICIONAR CLASSE ANIMATED PARA EFEITOS CSS =====
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }

    .fade-in.animated {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// ===== BOTÕES DE AÇÃO =====
document.querySelectorAll('.btn-primary, .btn-primary-large').forEach(button => {
    button.addEventListener('click', function() {
        console.log('Botão clicado:', this.textContent);
        // Aqui você pode adicionar lógica adicional, como abrir modal de cadastro
        alert('Redirecionando para página de cadastro...');
    });
});

// ===== EFEITO DE HOVER NOS BOTÕES DE NAVEGAÇÃO =====
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.color = 'var(--primary-color)';
    });

    link.addEventListener('mouseleave', function() {
        this.style.color = 'var(--text-dark)';
    });
});

// ===== MENU RESPONSIVO (OPCIONAL - para versão mobile) =====
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// ===== SCROLL EFFECT PARA HEADER =====
let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        header.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ===== VALIDAÇÃO E ENVIO DE FORMULÁRIO (ADICIONE LATER) =====
function handleFormSubmit(e) {
    e.preventDefault();
    console.log('Formulário enviado');
    // Adicione aqui a lógica de envio
}

// ===== INICIALIZAR TOOLTIPS (OPCIONAL) =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('Invictus Cash - Website carregado com sucesso!');
    
    // Adicione qualquer lógica de inicialização aqui
    initializeAnimations();
});

// ===== FUNÇÃO DE INICIALIZAÇÃO DE ANIMAÇÕES =====
function initializeAnimations() {
    // Animate numbers or counters if needed
    const animateElements = document.querySelectorAll('[data-animate]');
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
}

// ===== EVENT LISTENERS PARA BOTÕES DE LOGIN/SIGNUP =====
const loginBtn = document.querySelector('.btn-login');
const signupBtn = document.querySelector('.btn-signup');

if (loginBtn) {
    loginBtn.addEventListener('click', () => {
        console.log('Redirecionando para login...');
        // window.location.href = '/login';
    });
}

if (signupBtn) {
    signupBtn.addEventListener('click', () => {
        console.log('Redirecionando para cadastro...');
        // window.location.href = '/signup';
    });
}

// ===== FUNÇÃO PARA ANALYTICS (ADICIONE DEPOIS) =====
function trackEvent(eventName, eventData) {
    console.log(`Evento: ${eventName}`, eventData);
    // Integre com Google Analytics ou outro serviço
}

// ===== ADICIONAR CLASSE MOBILE AO BODY EM DISPOSITIVOS MÓVEIS =====
function detectMobileDevice() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
        document.body.classList.add('mobile-device');
    }
}

detectMobileDevice();

// ===== PRELOAD IMAGENS CRÍTICAS =====
function preloadImages() {
    // Deixe o array vazio para o JavaScript não tentar buscar uma imagem que não existe
    const images = [];

    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

window.addEventListener('load', preloadImages);

// ── SIMULATOR ──
function fmt(n) {
  return 'R$ ' + Math.round(n).toLocaleString('pt-BR');
}
 
function updateSim() {
  // PROTEÇÃO: Se não encontrar o sliderInitial na página, sai da função e não quebra o resto do script
  const sliderInitialEl = document.getElementById('sliderInitial');
  if (!sliderInitialEl) return;

  const P = +sliderInitialEl.value;
  const pmt = +document.getElementById('sliderMonthly').value;
  const t = +document.getElementById('sliderYears').value;
  const r = +document.getElementById('sliderRate').value / 100;
 
  document.getElementById('initialVal').textContent = fmt(P);
  document.getElementById('monthlyVal').textContent = fmt(pmt);
  document.getElementById('yearsVal').textContent = t + ' anos';
  document.getElementById('rateVal').textContent = document.getElementById('sliderRate').value + '%';
 
  const rm = r / 12;
  const n = t * 12;
  // FV of lump sum + FV of annuity
  const fv = P * Math.pow(1 + rm, n) + (pmt > 0 ? pmt * (Math.pow(1 + rm, n) - 1) / rm : 0);
  const invested = P + pmt * n;
  const profit = fv - invested;
 
  document.getElementById('simResult').textContent = fmt(fv);
  document.getElementById('simInvested').textContent = fmt(invested);
  document.getElementById('simProfit').textContent = fmt(Math.max(0, profit));
 
  // update range tracks
  ['sliderInitial','sliderMonthly','sliderYears','sliderRate'].forEach(id => {
    const el = document.getElementById(id);
    const pct = ((el.value - el.min) / (el.max - el.min)) * 100;
    el.style.background = `linear-gradient(to right, #7B2FBE ${pct}%, #E5DFF5 ${pct}%)`;
  });
}
// Garante que o simulador só rode se o elemento existir na página atual
if (document.getElementById('sliderInitial')) {
    updateSim();
}
 
// ===== LÓGICA DO MODO CLARO / ESCURO =====
document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const siteLogo = document.getElementById('site-logo');

    // Caminhos das duas imagens da logo
    const logoClara = 'img/Frame 21 copia.PNG';
    const logoEscura = 'img/image 8.png';

    // 1. Verifica se o usuário já tem uma preferência salva e aplica no carregamento
    const savedTheme = localStorage.getItem('theme');

    // Se o tema salvo for escuro, aplica a classe e muda o emoji para o Sol
    if (savedTheme === 'dark') {
        if (body) body.classList.add('dark-theme');
        if (themeToggleBtn) themeToggleBtn.textContent = '☀️';
        if (siteLogo) siteLogo.setAttribute('src', logoEscura); // Aplica a logo escura direto
    } else {
        if (body) body.classList.remove('dark-theme');
        if (themeToggleBtn) themeToggleBtn.textContent = '🌙';
        if (siteLogo) siteLogo.setAttribute('src', logoClara); // Garante a logo clara
    }

    // 2. Escuta o evento de clique no botão para alternar o tema
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            body.classList.toggle('dark-theme');
            
            // Verifica se o modo escuro está ativo após o clique
            const isDarkMode = body.classList.contains('dark-theme');
            
            if (isDarkMode) {
                themeToggleBtn.textContent = '☀️';
                localStorage.setItem('theme', 'dark'); // Salva a escolha de escuro
                if (siteLogo) {
                    siteLogo.setAttribute('src', logoEscura); // Troca para a logo escura
                }
            } else {
                themeToggleBtn.textContent = '🌙';
                localStorage.setItem('theme', 'light'); // Salva a escolha de claro
                if (siteLogo) {
                    siteLogo.setAttribute('src', logoClara); // Troca para a logo clara
                }
            }
        });
    }

    // ===== ADICIONADO: LÓGICA DO OLHINHO DA SENHA =====
    const passwordInput = document.getElementById('password');
    const togglePasswordBtn = document.getElementById('toggle-password');

    if (togglePasswordBtn && passwordInput) {
        togglePasswordBtn.addEventListener('click', () => {
            // Alterna o tipo do input entre password e text
            const isPassword = passwordInput.getAttribute('type') === 'password';
            passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
            
            // Alterna o emoji visual do olhinho
            togglePasswordBtn.textContent = isPassword ? '🙈' : '👁️';
        });
    }
});