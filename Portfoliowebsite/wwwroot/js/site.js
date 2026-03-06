window.addEventListener('contextmenu', e => e.preventDefault()); 

window.addEventListener('keydown', e => {
    if (e.key === 'Tab') {
        e.preventDefault();
    }
});

function validEmailCheck(email) {
    return /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(email);
}
function checkTLD(email) {
    return /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.(com|net|org|edu|gov|info|biz|io|co|nl|be|de|fr|it|es|pt|at|pl|cz|hu|ro|bg|gr|se|dk|fi|sk|si|lt|lv|ee|ie|hr|cy|lu|mt|eu|uk|ch|no|is)$/i.test(email);
}

function setupValidation() {
    const form = document.getElementById('contactForm');
    const hp = document.getElementById('website');
    const email = document.getElementById('Email');
    const name = document.getElementById('Name');
    const msg = document.getElementById('Message');
    const status = document.getElementById('liveStatus');

    const sendBtn = document.getElementById('send-button');
    sendBtn.style.backgroundColor = 'darkgray';
    sendBtn.disabled = true;

    const isFormValid = () =>
        validEmailCheck(email.value) && checkTLD(email.value) &&
        name.value.length >= 2 && name.value.length <= 25 &&
        msg.value.length >= 5 && msg.value.length <= 150;

    const clearError = (id) => {
        document.getElementById(id).innerHTML = '';
    };

    const problemWithError = (id, value, message) => 
        document.getElementById(id).innerHTML = `\n <span>Probleem met: \'${value}\'  ${message}</span>\n `;
    const genericError = (id, message) =>
        document.getElementById(id).innerHTML = `\n <span> ${message} </span> \n`;

    [email, name, msg].forEach(el => {
        el.addEventListener('input', () => {
            if (el === email) {
                if (!el.value.includes('@')) {
                    problemWithError('emailErr', el.value, 'de email bevat geen \'@\'');
                } else if (!el.value.includes('.')) {
                    problemWithError('emailErr', el.value, 'de email bevat geen \'.\'');
                } else if (!validEmailCheck(el.value)) {
                    genericError('emailErr', 'dit is geen valide email');
                } else if (!checkTLD(el.value)) {
                    genericError('emailErr', 'deze TLD (denk aan .com, .net of .org) is niet toegestaan');
                } else {
                    clearError('emailErr');
                }
            } else if (el === name) {
                if (el.value.length < 2) {
                    genericError('nameErr', 'naam is te kort');
                } else if (el.value.length > 25) {
                    genericError('nameErr', 'naam is te lang');
                } else {
                    clearError('nameErr');
                }
            } else if (el === msg) {
                if (el.value.length < 5) {
                    genericError('msgErr', 'bericht is te klein');
                } else if (el.value.length > 150) {
                    genericError('msgErr', 'bericht is te lang, probeer in te korten');
                } else {
                    clearError('msgErr');
                }
            }

            if (isFormValid()) {
                sendBtn.disabled = false;
                sendBtn.style.backgroundColor = 'green';
                sendBtn.removeAttribute('aria-disabled');
            } else {
                sendBtn.disabled = true;
                sendBtn.style.backgroundColor = 'darkgray';
                sendBtn.removeAttribute('aria-disabled', 'true');
            }

        });
    });

    form.addEventListener('submit', (e) => {
        if (hp.value) {
            e.preventDefault();
            alert('Spam gedetecteerd (client-side)!');
            return false;
        }

        return true;
    });
}

window.addEventListener('DOMContentLoaded', setupValidation);