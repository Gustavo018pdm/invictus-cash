document.addEventListener('DOMContentLoaded', () => {
    // ===== OLHINHO: SENHA =====
    const registerPasswordInput = document.getElementById('register-password');
    const toggleRegisterPasswordBtn = document.getElementById('toggle-register-password');

    if (toggleRegisterPasswordBtn && registerPasswordInput) {
        toggleRegisterPasswordBtn.addEventListener('click', () => {
            const isPassword = registerPasswordInput.getAttribute('type') === 'password';
            registerPasswordInput.setAttribute('type', isPassword ? 'text' : 'password');
            toggleRegisterPasswordBtn.textContent = isPassword ? '🙈' : '👁️';
        });
    }

    // ===== OLHINHO: CONFIRMAR SENHA =====
    const confirmPasswordInput = document.getElementById('confirm-password');
    const toggleConfirmPasswordBtn = document.getElementById('toggle-confirm-password');

    if (toggleConfirmPasswordBtn && confirmPasswordInput) {
        toggleConfirmPasswordBtn.addEventListener('click', () => {
            const isPassword = confirmPasswordInput.getAttribute('type') === 'password';
            confirmPasswordInput.setAttribute('type', isPassword ? 'text' : 'password');
            toggleConfirmPasswordBtn.textContent = isPassword ? '🙈' : '👁️';
        });
    }

    // ===== SUBMIT E VALIDAÇÃO DO FORMULÁRIO =====
    const registerForm = document.querySelector('form[data-redirect]');
    if (registerForm) {
        registerForm.addEventListener('submit', (event) => {
            // 1. Pegamos os valores dos campos de senha atuais
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            const errorSpan = document.getElementById('password-error');

            // Resetamos o estilo do erro a cada tentativa de envio
            if (errorSpan) {
                errorSpan.textContent = '';
                errorSpan.style.display = 'none';
            }

            // 2. Verificamos se as senhas são diferentes
            if (password !== confirmPassword) {
                // Impede o envio do formulário e o redirecionamento
                event.preventDefault(); 
                
                // Exibe o erro de forma amigável na página
                if (errorSpan) {
                    errorSpan.textContent = 'As senhas não coincidem. Digite a mesma senha!';
                    errorSpan.style.display = 'block';
                }
                
                // Limpa o campo de confirmação e foca nele para o usuário digitar novamente
                const confirmInput = document.getElementById('confirm-password');
                if (confirmInput) {
                    confirmInput.value = '';
                    confirmInput.focus();
                }
                return; // Para a execução aqui para não fazer o redirecionamento abaixo
            }

            // 3. Se as senhas forem iguais, o código continua e faz o redirecionamento
            event.preventDefault();
            const redirectTo = registerForm.getAttribute('data-redirect');
            if (redirectTo) {
                window.location.href = redirectTo;
            }
        });
    }
});
