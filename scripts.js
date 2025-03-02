//Event listener for the form
document.addEventListener('DOMContentLoaded', function () {
    const now = new Date();
    const formattedDateTime = now.toISOString().slice(0, 16);
    document.getElementById('datetime').value = formattedDateTime;

    // Function to populate select options
    function populateSelectOptions(selectId, start, end, selectedValue = null) {
        let selectElement = document.getElementById(selectId);
        for (let i = start; i <= end; i++) {
            let option = document.createElement('option');
            option.value = i;
            option.text = i;
            if (i === selectedValue) {
                option.selected = true;
            }
            selectElement.appendChild(option);
        }
    }

    // Populate select options for u1 to u6
    ['u1', 'u2', 'u3', 'u4', 'u5', 'u6'].forEach(id => populateSelectOptions(id, 0, 50));

    // Populate select options for ajout_retrait
    populateSelectOptions('ajout_retrait', -50, 50, 0);

    // Populate select options for toujeo
    populateSelectOptions('toujeo', 0, 50, 0);

    // Calculate total Apidra
    document.addEventListener('input', function () {
        const u1 = parseFloat(document.getElementById('u1').value) || 0;
        const u2 = parseFloat(document.getElementById('u2').value) || 0;
        const u3 = parseFloat(document.getElementById('u3').value) || 0;
        const u4 = parseFloat(document.getElementById('u4').value) || 0;
        const u5 = parseFloat(document.getElementById('u5').value) || 0;
        const u6 = parseFloat(document.getElementById('u6').value) || 0;
        const ajoutRetrait = parseFloat(document.getElementById('ajout_retrait').value) || 0;
        const totalApidra = u1 + u2 + u3 + u4 + u5 + u6 + ajoutRetrait;
        document.getElementById('total_apidra').value = totalApidra;
    });

    // Submit form
    window.submitForm = function () {
        const form = document.getElementById('suiviForm');
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        fetch('https://script.google.com/macros/s/AKfycbyRelKASpOj5KELX2Pjwe-bjDBBqnBeafBTA4MRoZ0qudOPDO_px6m_IbDWK-YEvBwA/exec', {
            method: 'POST',
            //mode:"no-cors",
            body: new URLSearchParams(data)
        })
            .then(response => response.text())
            .then(result => {
                alert('Données envoyées avec succès');
            })
            .catch(error => {
                console.error('Erreur:', error);
            });
    };
});

//Format de la glycémie
function formatGlycemie(input) {
    input.addEventListener('input', function () {
        let value = input.value.replace(',', '').replace('.', '');
        if (value.length > 2) {
            value = value.slice(0, -2) + ',' + value.slice(-2);
        }
        input.value = value;
    });
}
document.addEventListener('DOMContentLoaded', function () {
    formatGlycemie(document.getElementById('glycemie_avant'));
    formatGlycemie(document.getElementById('glycemie_apres'));
});