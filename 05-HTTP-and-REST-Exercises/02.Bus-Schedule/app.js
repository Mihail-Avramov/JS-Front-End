function solve() {
    const API_URL = "http://localhost:3030/jsonstore/bus/schedule/";
    const departButton = document.getElementById("depart");
    const arriveButton = document.getElementById("arrive");
    const spanInfo = document.querySelector("#info > span");

    let stopInfo = { name: "", next: "depot" };

    function depart() {
        fetch(API_URL + stopInfo.next)
            .then((res) => res.json())
            .then((data) => {
                stopInfo = data;
                spanInfo.textContent = `Next stop ${stopInfo.name}`;
                departButton.disabled = true;
                arriveButton.disabled = false;
            })
            .catch((err) => {
                spanInfo.textContent = "Error";
                departButton.disabled = true;
                arriveButton.disabled = true;
            });
    }

    async function arrive() {
        spanInfo.textContent = `Arriving at ${stopInfo.name}`;
        departButton.disabled = false;
        arriveButton.disabled = true;
    }

    return {
        depart,
        arrive,
    };
}

let result = solve();
