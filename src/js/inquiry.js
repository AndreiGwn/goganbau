function clearErrors(form) {
    form.querySelectorAll('[data-error-for]').forEach((el) => {
        el.textContent = '';
        el.hidden = true;
    });
    form.querySelectorAll('[aria-invalid]').forEach((el) => el.removeAttribute('aria-invalid'));
    form.querySelector('[data-form-error]').hidden = true;
}

function showErrors(form, errors) {
    let first = null;
    for (const [field, message] of Object.entries(errors)) {
        const el = form.querySelector(`[data-error-for="${field}"]`);
        if (el) {
            el.textContent = message;
            el.hidden = false;
        }
        const input = form.elements[field];
        input.setAttribute('aria-invalid', 'true');
        first ??= input;
    }
    first?.focus();
}

function showGeneralError(form, text) {
    const general = form.querySelector('[data-form-error]');
    general.textContent = text;
    general.hidden = false;
}

// Name plus phone or e-mail — checked before sending by e-mail and by WhatsApp.
function validate(form) {
    const value = (name) => form.elements[name].value.trim();
    const errors = {};
    if (!value('name')) errors.name = 'Bitte geben Sie Ihren Namen an.';
    if (!value('phone') && !value('email')) errors.phone = 'Bitte geben Sie Telefon oder E-Mail an.';
    if (value('phone') && !/^[0-9+()/\-\s]{6,}$/.test(value('phone'))) errors.phone = 'Bitte geben Sie eine gültige Telefonnummer an.';
    if (value('email') && !/^\S+@\S+\.\S+$/.test(value('email'))) errors.email = 'Bitte geben Sie eine gültige E-Mail-Adresse an.';
    return errors;
}

/** The inquiry as plain text, for WhatsApp (bold title) and the mail-app fallback. */
function messageText(form, { bold = false } = {}) {
    const value = (name) => form.elements[name].value.trim();
    const title = 'Neue Anfrage über die Website';

    // null = line left out
    return [
        bold ? `*${title}*` : title,
        '',
        `Name: ${value('name')}`,
        value('phone') ? `Telefon: ${value('phone')}` : null,
        value('email') ? `E-Mail: ${value('email')}` : null,
        value('service') ? `Leistung: ${value('service')}` : null,
        value('place') ? `Ort: ${value('place')}` : null,
        value('area') ? `Fläche: ${value('area')}` : null,
        value('message') ? `\n${value('message')}` : null,
    ]
        .filter((line) => line !== null)
        .join('\n');
}

function showSuccess(form) {
    const success = form.parentElement.querySelector('[data-inquiry-success]');
    form.hidden = true;
    success.hidden = false;
    success.focus();
}

async function sendViaWeb3Forms(form) {
    const button = form.querySelector('[type="submit"]');
    const label = button.innerHTML;
    button.disabled = true;
    button.textContent = 'Wird gesendet …';

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            headers: { Accept: 'application/json' },
            body: new FormData(form),
        });
        const data = await response.json().catch(() => ({}));

        if (response.ok && data.success) {
            showSuccess(form);
        } else if (response.status === 429) {
            showGeneralError(form, 'Zu viele Anfragen in kurzer Zeit. Bitte rufen Sie uns direkt an.');
        } else {
            showGeneralError(form, 'Senden fehlgeschlagen. Bitte erneut versuchen oder per WhatsApp senden.');
        }
    } catch {
        showGeneralError(form, 'Keine Verbindung. Bitte Internet prüfen oder per WhatsApp senden.');
    } finally {
        button.disabled = false;
        button.innerHTML = label;
    }
}

export function initInquiryForms() {
    // Service pages link to /?leistung=<key>#kontakt: preselect that service.
    const preselect = new URLSearchParams(location.search).get('leistung');

    document.querySelectorAll('form[data-inquiry-form]').forEach((form) => {
        const option = preselect && form.querySelector(`option[data-key="${CSS.escape(preselect)}"]`);
        if (option) option.selected = true;

        form.querySelector('[data-send-whatsapp]').addEventListener('click', () => {
            clearErrors(form);
            const errors = validate(form);
            if (Object.keys(errors).length) return showErrors(form, errors);
            window.open(`https://wa.me/${form.dataset.whatsapp}?text=${encodeURIComponent(messageText(form, { bold: true }))}`, '_blank', 'noopener');
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            clearErrors(form);
            const errors = validate(form);
            if (Object.keys(errors).length) return showErrors(form, errors);

            if (form.elements.access_key.value) {
                sendViaWeb3Forms(form);
            } else {
                // No Web3Forms key configured yet (site/content.js): hand over to the visitor's mail app.
                const subject = encodeURIComponent(`Anfrage von ${form.elements.name.value.trim()}`);
                location.href = `mailto:${form.dataset.mailto}?subject=${subject}&body=${encodeURIComponent(messageText(form))}`;
            }
        });
    });
}
