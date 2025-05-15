async function translateText() {
    const text = document.getElementById('input-text').value;
    const targetLang = document.getElementById('language-select').value;
    const outputDiv = document.getElementById('output');
    if (!text.trim()) {
        outputDiv.innerText = "Por favor, escribe un texto.";
        return;
    }

    try {
        const res = await fetch("https://translate.argosopentech.com/translate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                q: text,
                source: "auto",
                target: targetLang,
                format: "text"
            })
        });

        const data = await res.json();
        outputDiv.innerText = data.translatedText;

        addToHistory(text, data.translatedText);
    } catch (error) {
        outputDiv.innerText = "Error al traducir. Intenta de nuevo.";
    }
}

function addToHistory(original, translated) {
    const historyList = document.getElementById("history-list");
    const item = document.createElement("li");
    item.textContent = `"${original}" → "${translated}"`;
    historyList.insertBefore(item, historyList.firstChild);
    if (historyList.children.length > 5) {
        historyList.removeChild(historyList.lastChild);
    }
}
