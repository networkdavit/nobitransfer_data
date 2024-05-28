document.addEventListener("DOMContentLoaded", function() {
    const tableBody = document.getElementById("tableBody");

    function loadData() {
        fetch('/data')
            .then(response => response.json())
            .then(data => {
                data.forEach((item, index) => createRow(item, index));
                // Save the data globally so we can update it
                window.data = data;
            })
            .catch(error => console.error('Error loading data:', error));
    }

    function saveData(data) {
        fetch('/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.text())
        .then(message => {
            console.log(message);
            alert(message);
        })
        .catch(error => console.error('Error saving data:', error));
    }

    function createRow(item, index) {
        const tr = document.createElement("tr");

        const nameTd = document.createElement("td");
        nameTd.textContent = item.name;
        tr.appendChild(nameTd);

        const inputTd = document.createElement("td");
        const input = document.createElement("input");
        input.type = "text";
        input.value = item.value;
        input.id = `input-${index}`;
        inputTd.appendChild(input);
        tr.appendChild(inputTd);

        const submitTd = document.createElement("td");
        const button = document.createElement("button");
        button.textContent = "Submit";
        button.addEventListener("click", () => {
            item.value = document.getElementById(`input-${index}`).value;
            saveData(window.data);
        });
        submitTd.appendChild(button);
        tr.appendChild(submitTd);

        tableBody.appendChild(tr);
    }

    loadData();
});
