document.addEventListener('DOMContentLoaded', () => {
    const modalContainer = document.getElementById('modal-container');
    const modalPlaceholder = document.getElementById('modal-content-placeholder');
    const closeButton = document.querySelector('.close-button');
    const productCards = document.querySelectorAll('.product-card');

    // Mostra os detalhes do produto
    const showProductDetails = (card) => {
        const imgSrc = card.querySelector('.product-image-container img').src;
        const productName = card.querySelector('.product-name').textContent;
        const productPrice = card.querySelector('.product-price').textContent;
        const modalHTML = `
            <div class="buy-modal-content">
                <img src="${imgSrc}" alt="${productName}" class="buy-modal-image">
                <div class="buy-modal-details">
                    <h2>${productName}</h2>
                    <p class="buy-modal-price">${productPrice}</p>
                    <p>Selecione o tamanho:</p>
                    <div class="size-selector">
                        <button>39</button><button>40</button><button>41</button><button>42</button><button>43</button>
                    </div>
                    <button class="buy-now-button">Comprar Agora</button>
                </div>
            </div>`;
        modalPlaceholder.innerHTML = modalHTML;
        modalContainer.classList.add('show');
    };

    // Mostra o formulário de pagamento com transição
    const showPaymentForm = () => {
        modalPlaceholder.classList.add('content-fading-out');

        setTimeout(() => {
            fetch('/src/pages/buyshoes.html')
                .then(response => {
                    if (!response.ok) throw new Error('Network response was not ok');
                    return response.text();
                })
                .then(html => {
                    modalPlaceholder.innerHTML = html;
                    modalPlaceholder.classList.remove('content-fading-out');
                })
                .catch(err => {
                    console.error('Falha ao carregar formulário:', err);
                    modalPlaceholder.innerHTML = '<p>Erro ao carregar o formulário. Tente novamente.</p>';
                    modalPlaceholder.classList.remove('content-fading-out');
                });
        }, 200); // Duração da animação de fade-out
    };

    const closeModal = () => {
        modalContainer.classList.remove('show');
        setTimeout(() => {
            modalPlaceholder.innerHTML = '';
        }, 300); // Duração da animação de fade-out do modal
    };

    // Evento de clique nos cards de produto
    productCards.forEach(card => {
        card.addEventListener('click', (event) => {
            event.preventDefault();
            showProductDetails(card);
        });
    });

    // Eventos para fechar o modal
    closeButton.addEventListener('click', closeModal);
    modalContainer.addEventListener('click', (event) => {
        if (event.target === modalContainer) closeModal();
    });

    // Delegação de eventos para botões dentro do modal
    modalPlaceholder.addEventListener('click', (event) => {
        if (event.target.classList.contains('buy-now-button')) {
            showPaymentForm();
        }
        if (event.target.matches('.size-selector button')) {
            modalPlaceholder.querySelectorAll('.size-selector button').forEach(btn => btn.classList.remove('selected'));
            event.target.classList.add('selected');
        }
        if (event.target.id === 'finalize-payment-button') {
            event.preventDefault();
            // Simula um processamento rápido
            setTimeout(() => {
                showCustomAlert('✅ Compra concluída com sucesso!');
                closeModal();
            }, 800);
        }
    });
});
