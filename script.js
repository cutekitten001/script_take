function copyText(cardId) {
    let card = document.getElementById(cardId).querySelector('.card__desc')
    let copyCard = card.innerText.trim().replace(/^["']|["']$/g, ''); // Remove as aspas no início e no final
    let range = document.createRange();
    range.selectNode(card);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);

    try {
        document.execCommand('copy');
        window.getSelection().removeAllRanges;

        showAlert("Texto copiado: " + copyCard);
    } catch (err) {
        console.log("Erro ao copiar texto: ", err)
    }
}

function showAlert() {
    var alertBox = document.createElement('div');
    alertBox.className = 'alert-box';
    alertBox.textContent = 'Copiado';
    document.body.appendChild(alertBox);

    alertBox.classList.add('show');

    setTimeout(function () {
        alertBox.classList.remove('show');
        setTimeout(function () {
            alertBox.remove();
        }, 300);
    }, 1000);
}

function openModal(cardId) {
    var modal = document.getElementById('myModal');
    var textarea = document.getElementById('editQuote');
    let storedText = localStorage.getItem(cardId + '_text') // Recupera o texto armazenado
    textarea.value + storedText || document.getElementById(elementId).querySelector('.card__desc').innerText;
    // textarea.value = document.getElementById(elementId).querySelector('.card__desc').innerText;

    modal.setAttribute('data-editing', cardId);

    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('myModal').style.display = 'none';
}

function saveChanges() {
    var modal = document.getElementById('myModal');
    var textarea = document.getElementById('editQuote');
    var elementId = modal.getAttribute('data-editing');

    if (elementId) {
        var quoteElement = document.getElementById(elementId).querySelector('.card__desc');
        quoteElement.innerText = textarea.value;

        // Salva os dados no localStorage
        localStorage.setItem(elementId, textarea.value);

        closeModal();

            // Carrega novamente os dados salvos
            loadSavedData();
    }
}


// Adicione a função loadSavedData() ao final do script.js
function loadSavedData() {
    // Itera sobre os elementos com a classe 'card' e carrega os dados salvos
    document.querySelectorAll('.card').forEach(function (card) {
        var cardId = card.id;
        var savedData = localStorage.getItem(cardId);

        if (savedData !== null) {
            card.querySelector('.card__desc').innerText = savedData;
        }
    });
}

// Chama a função loadSavedData() quando a página é carregada
document.addEventListener('DOMContentLoaded', function () {
    loadSavedData();
});
