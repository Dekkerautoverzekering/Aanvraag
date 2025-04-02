let currentStep = 0;
showStep(currentStep);

function showStep(n) {
    let steps = document.getElementsByClassName("step-content");
    steps[n].style.display = "block";
    if (n == 0) {
        document.getElementById("prevBtn").style.display = "none";
    } else {
        document.getElementById("prevBtn").style.display = "inline";
    }
    if (n == (steps.length - 1)) {
        document.getElementById("nextBtn").style.display = "none";
    } else {
        document.getElementById("nextBtn").style.display = "inline";
    }
    updateStepIndicator(n);
}

function nextPrev(n) {
    let steps = document.getElementsByClassName("step-content");
    steps[currentStep].style.display = "none";
    currentStep = currentStep + n;
    if (currentStep >= steps.length) {
        return false; // Geen standaard submit meer
    }
    showStep(currentStep);
}

function updateStepIndicator(n) {
    let indicators = document.getElementsByClassName("step");
    for (let i = 0; i < indicators.length; i++) {
        indicators[i].classList.remove("active-step");
    }
    indicators[n].classList.add("active-step");
}

// Signature Pad
var canvas = document.getElementById('signature-pad');
var signaturePad = new SignaturePad(canvas);
var clearButton = document.getElementById('clear-signature');
clearButton.addEventListener('click', function() {
    signaturePad.clear();
});

// Regelmatige bestuurder logica
document.querySelectorAll('input[name="regelmatige-bestuurder"]').forEach((elem) => {
    elem.addEventListener("change", function(event) {
        const value = event.target.value;
        const info = document.getElementById("regelmatige-bestuurder-info");
        if (value === "no") {
            info.classList.add("active");
        } else {
            info.classList.remove("active");
        }
    });
});

// Dekking logica
document.addEventListener('DOMContentLoaded', function() {
    const dekkingRadios = document.getElementsByName('dekking');
    const dekkingOmschrijving = document.getElementById('dekking-omschrijving');

    dekkingRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'anders') {
                dekkingOmschrijving.style.display = 'block';
            } else {
                dekkingOmschrijving.style.display = 'none';
            }
        });
    });

    const checkedDekking = document.querySelector('input[name="dekking"]:checked');
    if (checkedDekking && checkedDekking.value === 'anders') {
        dekkingOmschrijving.style.display = 'block';
    } else {
        dekkingOmschrijving.style.display = 'none';
    }
});

// Schade-ervaring en schadevrije jaren logica
document.addEventListener('DOMContentLoaded', function() {
    const schadeErvaringRadios = document.getElementsByName('schade-ervaring');
    const schadeErvaringInfo = document.getElementById('schade-ervaring-info');
    
    schadeErvaringRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'yes') {
                schadeErvaringInfo.style.display = 'block';
            } else {
                schadeErvaringInfo.style.display = 'none';
            }
        });
    });

    const schadeVrijeJarenRadios = document.getElementsByName('schadevrije-jaren');
    const schadeVrijeJarenInfo = document.getElementById('schadevrije-jaren-info');
    
    schadeVrijeJarenRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'yes') {
                schadeVrijeJarenInfo.style.display = 'block';
            } else {
                schadeVrijeJarenInfo.style.display = 'none';
            }
        });
    });

    schadeErvaringRadios.forEach(radio => {
        if (radio.checked && radio.value === 'yes') {
            schadeErvaringInfo.style.display = 'block';
        }
    });

    schadeVrijeJarenRadios.forEach(radio => {
        if (radio.checked && radio.value === 'yes') {
            schadeVrijeJarenInfo.style.display = 'block';
        }
    });
});

// Opzegservice logica
const schadevrijeJarenYes = document.getElementById('schadevrije-jaren-yes');
const schadevrijeJarenNo = document.getElementById('schadevrije-jaren-no');
const opzegserviceContainer = document.getElementById('opzegservice-container');
const opzegserviceYes = document.getElementById('opzegservice-yes');
const opzegserviceNo = document.getElementById('opzegservice-no');
const opzegserviceDetails = document.getElementById('opzegservice-details');

function toggleOpzegservice() {
    if (schadevrijeJarenYes.checked) {
        opzegserviceContainer.style.display = 'block';
    } else {
        opzegserviceContainer.style.display = 'none';
        opzegserviceDetails.style.display = 'none';
    }
}

function toggleOpzegserviceDetails() {
    if (opzegserviceYes.checked) {
        opzegserviceDetails.style.display = 'block';
    } else {
        opzegserviceDetails.style.display = 'none';
    }
}

schadevrijeJarenYes.addEventListener('change', toggleOpzegservice);
schadevrijeJarenNo.addEventListener('change', toggleOpzegservice);
opzegserviceYes.addEventListener('change', toggleOpzegserviceDetails);
opzegserviceNo.addEventListener('change', toggleOpzegserviceDetails);

toggleOpzegservice();
toggleOpzegserviceDetails();

// Zakelijk aanschaf logica
const particulierRadio = document.getElementById('particulier');
const zakelijkRadio = document.getElementById('zakelijk');
const zakelijkInfo = document.getElementById('zakelijk-info');
const rechtsvormSelect = document.getElementById('rechtsvorm');
const rechtsvormOmschrijvingContainer = document.getElementById('rechtsvorm-omschrijving-container');
const aantalBelanghebbendenInput = document.getElementById('aantal-belanghebbenden');
const belanghebbendenInfo = document.getElementById('belanghebbenden-info');

function toggleZakelijkInfo() {
    if (zakelijkRadio.checked) {
        zakelijkInfo.style.display = 'block';
    } else {
        zakelijkInfo.style.display = 'none';
        rechtsvormOmschrijvingContainer.style.display = 'none';
        belanghebbendenInfo.innerHTML = '';
    }
}

function toggleRechtsvormOmschrijving() {
    const selectedValue = rechtsvormSelect.value;
    if (selectedValue === 'anders') {
        rechtsvormOmschrijvingContainer.style.display = 'block';
    } else {
        rechtsvormOmschrijvingContainer.style.display = 'block';
    }
}

function updateBelanghebbendenInfo() {
    const aantal = aantalBelanghebbendenInput.value;
    belanghebbendenInfo.innerHTML = '';

    for (let i = 1; i <= aantal; i++) {
        const belanghebbendeContainer = document.createElement('div');
        belanghebbendeContainer.classList.add('belanghebbende-container');
        
        const nameLabel = document.createElement('label');
        nameLabel.textContent = `Belanghebbende ${i} Voor- en achternaam:`;
        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.name = `ubo${i}-naam`;
        nameInput.id = `belanghebbende-${i}-naam`;

        const addressLabel = document.createElement('label');
        addressLabel.textContent = `Belanghebbende ${i} Adres:`;
        const addressInput = document.createElement('input');
        addressInput.type = 'text';
        addressInput.name = `ubo${i}-adres`;
        addressInput.id = `belanghebbende-${i}-adres`;

        const postalCodeLabel = document.createElement('label');
        postalCodeLabel.textContent = `Belanghebbende ${i} Postcode en Woonplaats:`;
        const postalCodeInput = document.createElement('input');
        postalCodeInput.type = 'text';
        postalCodeInput.name = `ubo${i}-postcode`;
        postalCodeInput.id = `belanghebbende-${i}-postcode`;

        const birthDateLabel = document.createElement('label');
        birthDateLabel.textContent = `Belanghebbende ${i} Geboortedatum:`;
        const birthDateInput = document.createElement('input');
        birthDateInput.type = 'date';
        birthDateInput.name = `ubo${i}-geboortedatum`;
        birthDateInput.id = `belanghebbende-${i}-geboortedatum`;

        belanghebbendeContainer.appendChild(nameLabel);
        belanghebbendeContainer.appendChild(nameInput);
        belanghebbendeContainer.appendChild(addressLabel);
        belanghebbendeContainer.appendChild(addressInput);
        belanghebbendeContainer.appendChild(postalCodeLabel);
        belanghebbendeContainer.appendChild(postalCodeInput);
        belanghebbendeContainer.appendChild(birthDateLabel);
        belanghebbendeContainer.appendChild(birthDateInput);

        belanghebbendenInfo.appendChild(belanghebbendeContainer);
    }
}

particulierRadio.addEventListener('change', toggleZakelijkInfo);
zakelijkRadio.addEventListener('change', toggleZakelijkInfo);
rechtsvormSelect.addEventListener('change', toggleRechtsvormOmschrijving);
aantalBelanghebbendenInput.addEventListener('input', updateBelanghebbendenInfo);

toggleZakelijkInfo();

// Additional info toggle logica
document.addEventListener('DOMContentLoaded', function() {
    function toggleAdditionalInfo(radioGroupName, infoDivId) {
        const radios = document.getElementsByName(radioGroupName);
        const infoDiv = document.getElementById(infoDivId);
        
        radios.forEach(radio => {
            radio.addEventListener('change', function() {
                if (this.value === 'yes') {
                    infoDiv.style.display = 'block';
                } else {
                    infoDiv.style.display = 'none';
                }
            });
        });
    }

    toggleAdditionalInfo('onverzekerd', 'onverzekerd-info');
    toggleAdditionalInfo('verzekeraar', 'verzekeraar-info');
    toggleAdditionalInfo('failliet', 'failliet-info');
    toggleAdditionalInfo('rijontzegging', 'rijontzegging-info');
    toggleAdditionalInfo('conflict', 'conflict-info');
    toggleAdditionalInfo('beslag', 'beslag-info');
    toggleAdditionalInfo('meer-informatie', 'meer-informatie-info');
});

// Modal en verzend logica
function showModal(event) {
    event.preventDefault(); // Voorkom standaard formulierverzending
    const form = document.getElementById('insurance-form');
    const formData = new FormData(form);
    let summaryHtml = "<strong>Ingevulde gegevens:</strong><ul>";
    const aanschaf = formData.get('aanschaf'); // Haal de waarde van 'aanschaf' op

    for (let [key, value] of formData.entries()) {
        if (value && value !== 'on') {
            // Alleen 'rechtsvorm', 'rechtsvorm-omschrijving' en UBO-gegevens toevoegen als 'aanschaf' zakelijk is
            if ((key === 'rechtsvorm' || key === 'rechtsvorm-omschrijving' || key.startsWith('ubo')) && aanschaf !== 'zakelijk') {
                continue; // Sla deze velden over als 'aanschaf' niet 'zakelijk' is
            }
            summaryHtml += `<li>${key}: ${value}</li>`;
        }
    }
    summaryHtml += "</ul>";

    // Handtekening toevoegen aan de samenvatting in de modal
    if (!signaturePad.isEmpty()) {
        summaryHtml += "<p><strong>Handtekening:</strong> Aanwezig</p>";
    } else {
        summaryHtml += "<p><strong>Handtekening:</strong> Niet aanwezig</p>";
    }

    document.getElementById('summary').innerHTML = summaryHtml;
    document.getElementById('confirmationModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('confirmationModal').style.display = 'none';
    document.getElementById('resultMessage').style.display = 'none';
}

function handleSubmit(isConfirmed) {
    document.getElementById('confirmationModal').style.display = 'none';
    const resultTextElement = document.getElementById('resultText');

    if (isConfirmed) {
        const form = document.getElementById('insurance-form');
        const formData = new FormData(form);
        let emailBody = "Aanvraagformulier Dekkerautoverzekering\n\n";
        const email = formData.get('email');

        // Verzamel alle formuliergegevens
        for (let [key, value] of formData.entries()) {
            if (value && value !== 'on') {
                emailBody += `${key}: ${value}\n`;
            }
        }

        // Log stap 1: Start verzending
        console.log("Start verzending...");

        // E-mail naar jouw service
        emailjs.send("service_37glay9", "template_igkvytp", {
            message: emailBody,
            reply_to: email
        })
        .then(() => {
            console.log("Service e-mail succesvol verzonden");
            // E-mail naar de klant
            return emailjs.send("service_37glay9", "template_vjmqckj", {
                message: emailBody,
                to_email: email
            });
        })
        .then(() => {
            console.log("Klant e-mail succesvol verzonden");
            resultTextElement.innerHTML = `
                <strong>Uw aanvraag is verzonden!</strong><br><br>
                Wij danken u voor het vertrouwen.<br>
                Een bevestiging is gestuurd naar ${email}.<br>
                Uw auto is in voorlopige dekking per ingangsdatum. Binnen 10 werkdagen ontvangt u de polisstukken.
            `;
            document.getElementById('resultMessage').style.display = 'block';
            document.getElementById('insurance-form').style.display = 'none';
            document.querySelector('.navigation-buttons').style.display = 'none';
        })
        .catch((error) => {
            console.error("Fout bij verzenden:", error);
            resultTextElement.innerHTML = `
                Er is een fout opgetreden: ${error.text}<br>
                Controleer de console (F12) voor meer info.
            `;
            document.getElementById('resultMessage').style.display = 'block';
        });
    } else {
        resultTextElement.innerHTML = `
            U wordt teruggeleid naar het formulier om uw antwoorden te controleren.
        `;
        document.getElementById('resultMessage').style.display = 'block';
    }
}

// Voeg event listener toe aan de submit-knop
document.querySelector('.submit-button').addEventListener('click', function(event) {
    event.preventDefault(); // Voorkom herladen
    console.log("Klik op verzenden, modal wordt geopend");
    showModal(event);
});
