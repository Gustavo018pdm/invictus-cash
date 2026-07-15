function updateSim() {
    // 1. ADICIONE ESSA VERIFICAÇÃO LOGO NO INÍCIO DA FUNÇÃO:
    const sliderInitial = document.getElementById('sliderInitial');
    if (!sliderInitial) return; // Se não achar o simulador na tela, para a função aqui e não quebra o resto!

    // ... o restante do seu código antigo do simulador continua aqui para baixo ...
    // Exemplo: let initialVal = sliderInitial.value;
}

document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('password');
    const togglePasswordBtn = document.getElementById('toggle-password');
    const passwordError = document.getElementById('password-error'); // Captura o elemento de erro que criamos no HTML

    // 1. Lógica para Mostrar/Esconder a Senha (seu código original com melhoria)
    if (togglePasswordBtn && passwordInput) {
        togglePasswordBtn.addEventListener('click', () => {
            // Alterna o tipo do input entre password e text
            const isPassword = passwordInput.getAttribute('type') === 'password';
            passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
            
            // Alterna o emoji visual do olhinho
            togglePasswordBtn.textContent = isPassword ? '🙈' : '👁️';
        });
    }

    // 2. Lógica para Validar o Mínimo de 8 Caracteres em Tempo Real
    if (passwordInput && passwordError) {
        passwordInput.addEventListener('input', () => {
            const senhaValue = passwordInput.value;

            // Se o campo estiver vazio, não mostra erro ainda
            if (senhaValue.length === 0) {
                passwordError.style.display = 'none';
                passwordInput.style.borderColor = ''; // Volta à cor padrão do seu CSS
                return;
            }

            // Se a senha tiver menos de 8 caracteres, exibe o erro
            if (senhaValue.length < 8) {
                passwordError.style.display = 'block';
                passwordInput.style.borderColor = '#ef4444'; // Deixa a borda vermelha
            } else {
                // Se for válida, esconde o erro e coloca uma borda verde de sucesso
                passwordError.style.display = 'none';
                passwordInput.style.borderColor = 'var(--success-color, #10b981)'; 
            }
        });
    }


      const loginForm = document.querySelector('form[data-redirect]');
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const redirectTo = loginForm.getAttribute('data-redirect');
            if (redirectTo) {
                window.location.href = redirectTo;
            }
        });
    }
});