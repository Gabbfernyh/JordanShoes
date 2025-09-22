function showCustomAlert(message) {
    // Cria o elemento do alerta
    const alertElement = document.createElement('div');
    alertElement.className = 'custom-alert';
    alertElement.textContent = message;

    // Adiciona o alerta ao body
    document.body.appendChild(alertElement);

    // Força o navegador a aplicar o estilo inicial antes de adicionar a classe 'show'
    setTimeout(() => {
        alertElement.classList.add('show');
    }, 10);

    // Remove o alerta depois de 3 segundos
    setTimeout(() => {
        alertElement.classList.remove('show');
        
        // Espera a transição de saída terminar para remover o elemento
        setTimeout(() => {
            document.body.removeChild(alertElement);
        }, 500); // Deve ser igual ao tempo da transição no CSS

    }, 3000);
}
