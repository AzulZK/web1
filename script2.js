document.addEventListener('DOMContentLoaded', () => {
    // Modal
    const modal = document.getElementById('contact-modal');
    const contactButton = document.querySelector('.contato');
    const closeButton = document.querySelector('.close-button');

    // Abre o modal ao clicar em "Entre em Contato"
    contactButton.addEventListener('click', function() {
        modal.style.display = 'block';
    });

    // Fecha o modal ao clicar no botão de fechar
    closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Fecha o modal se o usuário clicar fora dele
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Envia o formulário ao ser submetido
    document.querySelector('form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const form = e.target;
        const status = document.querySelector('.form-status');
        try {
            let response = await fetch(form.action, {
                method: form.method,
                body: new FormData(form),
                headers: {
                    'Accept': 'application/json'
                }
            });
            if (response.ok) {
                status.textContent = "Mensagem enviada com sucesso!";
                form.reset();
            } else {
                status.textContent = "Ocorreu um problema ao enviar a mensagem.";
            }
        } catch (error) {
            status.textContent = "Ocorreu um problema ao enviar a mensagem.";
        }
    });
});
