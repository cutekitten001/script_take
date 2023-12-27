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

function openModal(elementId) {
    var modal = document.getElementById('myModal');
    var textarea = document.getElementById('editQuote');
    textarea.value = document.getElementById(elementId).querySelector('.card__desc').innerText;

    modal.setAttribute('data-editing', elementId);

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
        closeModal();
    }
}
