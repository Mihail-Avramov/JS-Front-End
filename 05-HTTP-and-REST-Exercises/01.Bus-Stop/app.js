// async
function getInfo() {
    const API_URL = "http://localhost:3030/jsonstore/bus/businfo/";

    const stopIdInput = document.getElementById("stopId");
    const stopNameContainer = document.getElementById("stopName");
    const busesInfoUl = document.getElementById("buses");

    const stopId = stopIdInput.value;

    stopIdInput.value = "";
    busesInfoUl.innerHTML = "";

    // try {
    //     const data = await (await fetch(API_URL + stopId)).json();
    //     displayInfo(data);
    // } catch (error) {
    //     displayError();
    // }

    fetch(API_URL + stopId)
        .then((res) => res.json())
        .then((data) => displayInfo(data))
        .catch((err) => displayError(err));

    function displayError() {
        stopNameContainer.textContent = "Error";
        stopIdInput.focus();
    }

    function displayInfo(data) {
        stopNameContainer.textContent = data.name;

        Object.entries(data.buses).forEach(([busId, time]) => {
            const busInfo = document.createElement("li");
            busInfo.textContent = `Bus ${busId} arrives in ${time} minutes`;
            busesInfoUl.appendChild(busInfo);
        });
        stopIdInput.focus();
    }
}
