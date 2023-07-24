function attachEvents() {
    const API_URL = "http://localhost:3030/jsonstore/messenger";
    const textArea = document.getElementById("messages");
    const inputName = document.querySelector("#controls input[name=author]");
    const inputMessage = document.querySelector("#controls input[name=content]");
    const btnSend = document.getElementById("submit");
    const btnRefresh = document.getElementById("refresh");

    inputName.focus();

    btnSend.addEventListener("click", sendMessage);

    btnRefresh.addEventListener("click", refreshMessages);

    async function sendMessage() {
        const author = inputName.value;
        const content = inputMessage.value;

        if (author === "") {
            inputName.focus();
            return;
        }

        if (content === "") {
            inputMessage.focus();
            return;
        }

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                author,
                content,
            }),
        });
        const data = await response.json();
        textArea.value += `${data.author}: ${data.content}\n`;
        inputMessage.value = "";
        inputMessage.focus();
    }

    async function refreshMessages() {
        const response = await fetch(API_URL);
        const data = await response.json();
        textArea.value = "";
        console.log(data);
        Object.values(data).forEach((message) => {
            textArea.value += `${message.author}: ${message.content}\n`;
            inputName.value = `${message.author}`;
            inputMessage.value = "";
            inputMessage.focus();
        });
        //For JUDGE cleaning "/n" in the last message to pass the tests
        // const messages = Object.values(data);
        // messages.forEach((message, i) => {
        //     textArea.value += `${message.author}: ${message.content}`;
        //     if (i < messages.length - 1) {
        //         textArea.value += "\n";
        //     }
        // });
    }
}

attachEvents();
