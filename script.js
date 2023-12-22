function copyText(elementId) {
    var copyTextElement = document.getElementById(elementId).querySelector('.quote');
    var copyText = copyTextElement.innerText.trim().replace(/^["']|["']$/g, ''); // Remove as aspas no início e no final
    var range = document.createRange();
    range.selectNode(copyTextElement);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);

    try {
        document.execCommand('copy');
        window.getSelection().removeAllRanges();

        showAlert('Texto copiado: ' + copyText);
    } catch (err) {
        console.log('Erro ao copiar texto: ', err);
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
    textarea.value = document.getElementById(elementId).querySelector('.quote').innerText;

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
        var quoteElement = document.getElementById(elementId).querySelector('.quote');
        quoteElement.innerText = textarea.value;
        closeModal();
    }
}
