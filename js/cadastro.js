document.addEventListener('DOMContentLoaded', () => {
    // ===== ELEMENTOS DO FORMULÁRIO =====
    const registerPasswordInput = document.getElementById('register-password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    
    const toggleRegisterPasswordBtn = document.getElementById('toggle-register-password');
    const toggleConfirmPasswordBtn = document.getElementById('toggle-confirm-password');
    
    // Captura as duas mensagens de erro do HTML ajustado
    const lengthErrorSpan = document.getElementById('register-password-length-error');
    const matchErrorSpan = document.getElementById('register-password-match-error');

    // ===== OLHINHO: SENHA =====
    if (toggleRegisterPasswordBtn && registerPasswordInput) {
        toggleRegisterPasswordBtn.addEventListener('click', () => {
            const isPassword = registerPasswordInput.getAttribute('type') === 'password';
            registerPasswordInput.setAttribute('type', isPassword ? 'text' : 'password');
            toggleRegisterPasswordBtn.textContent = isPassword ? '🙈' : '👁️';
        });
    }

    // ===== OLHINHO: CONFIRMAR SENHA =====
    if (toggleConfirmPasswordBtn && confirmPasswordInput) {
        toggleConfirmPasswordBtn.addEventListener('click', () => {
            const isPassword = confirmPasswordInput.getAttribute('type') === 'password';
            confirmPasswordInput.setAttribute('type', isPassword ? 'text' : 'password');
            toggleConfirmPasswordBtn.textContent = isPassword ? '🙈' : '👁️';
        });
    }

    // ===== VALIDAÇÃO EM TEMPO REAL (ENQUANTO DIGITA) =====
    function validarSenhasCadastro() {
        const password = registerPasswordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        // 1. Validação de tamanho mínimo (8 caracteres)
        if (password.length === 0) {
            if (lengthErrorSpan) lengthErrorSpan.style.display = 'none';
            registerPasswordInput.style.borderColor = '';
        } else if (password.length < 8) {
            if (lengthErrorSpan) lengthErrorSpan.style.display = 'block';
            registerPasswordInput.style.borderColor = '#ef4444'; // Borda vermelha
        } else {
            if (lengthErrorSpan) lengthErrorSpan.style.display = 'none';
            registerPasswordInput.style.borderColor = 'var(--success-color, #10b981)'; // Borda verde
        }

        // 2. Validação se as senhas coincidem
        if (confirmPassword.length === 0) {
            if (matchErrorSpan) matchErrorSpan.style.display = 'none';
            confirmPasswordInput.style.borderColor = '';
        } else if (password !== confirmPassword) {
            if (matchErrorSpan) matchErrorSpan.style.display = 'block';
            confirmPasswordInput.style.borderColor = '#ef4444'; // Borda vermelha
        } else {
            if (matchErrorSpan) matchErrorSpan.style.display = 'none';
            confirmPasswordInput.style.borderColor = 'var(--success-color, #10b981)'; // Borda verde
        }
    }

    // Ativa os ouvintes de evento nos inputs para validar dinamicamente
    if (registerPasswordInput && confirmPasswordInput) {
        registerPasswordInput.addEventListener('input', validarSenhasCadastro);
        confirmPasswordInput.addEventListener('input', validarSenhasCadastro);
    }

    // ===== SUBMIT E VALIDAÇÃO FINAL DO FORMULÁRIO =====
    const registerForm = document.querySelector('form[data-redirect]');
    if (registerForm) {
        registerForm.addEventListener('submit', (event) => {
            const password = registerPasswordInput.value;
            const confirmPassword = confirmPasswordInput.value;

            // 1. Segunda barreira de segurança: Senha menor que 8 caracteres no submit
            if (password.length < 8) {
                event.preventDefault(); // Impede o envio do formulário

                if (lengthErrorSpan) {
                    lengthErrorSpan.style.display = 'block';
                }
                registerPasswordInput.style.borderColor = '#ef4444';
                registerPasswordInput.focus();
                return;
            }

            // 2. Terceira barreira de segurança: Senhas diferentes no submit
            if (password !== confirmPassword) {
                event.preventDefault(); // Impede o envio do formulário
                
                if (matchErrorSpan) {
                    matchErrorSpan.style.display = 'block';
                }
                confirmPasswordInput.style.borderColor = '#ef4444';
                
                // Limpa o campo de confirmação e foca nele para redigitar
                confirmPasswordInput.value = '';
                confirmPasswordInput.focus();
                return; 
            }

            // 3. Se tudo estiver correto (8+ caracteres e senhas iguais), faz o redirecionamento planejado
            event.preventDefault();
            const redirectTo = registerForm.getAttribute('data-redirect');
            if (redirectTo) {
                window.location.href = redirectTo;
            }
        });
    }
});
