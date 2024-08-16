document.addEventListener("DOMContentLoaded", function () {
    const countries = {
        "am-ET": "Amharic",
        "ar-SA": "Arabic",
        "be-BY": "Bielarus",
        "bem-ZM": "Bemba",
        "bi-VU": "Bislama",
        "zh-CN": "Chinese (Simplified)",
        "zh-TW": "Chinese (Traditional)",
        "cs-CZ": "Czech",
        "da-DK": "Danish",
        "nl-NL": "Dutch",
        "en-US": "English",
    };

    const sourceText = document.getElementById("source-text");
    const translatedText = document.getElementById("translated-text");
    const translateButton = document.getElementById("translate-button");
    const fromLanguage = document.getElementById("from-language");
    const toLanguage = document.getElementById("to-language");

    const apiEndpoint = "https://api.mymemory.translated.net/get";

    function translateText() {
        const textToTranslate = sourceText.value.trim();
        const sourceLang = fromLanguage.value;
        const targetLang = toLanguage.value;

        if (!textToTranslate) {
            translatedText.value = "Please enter text to translate.";
            return;
        }

        translatedText.value = "Translating...";

        const apiUrl = `${apiEndpoint}?q=${textToTranslate}&langpair=${sourceLang}|${targetLang}`;

        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                if (data.responseData) {
                    translatedText.value = data.responseData.translatedText;
                } else {
                    translatedText.value = "Translation failed. Please try again later.";
                }
            })
            .catch((error) => {
                translatedText.value = "Translation failed. Please try again later.";
            });
    }

    for (const languageCode in countries) {
        const option = document.createElement("option");
        option.value = languageCode;
        option.text = countries[languageCode];

        fromLanguage.appendChild(option);
        toLanguage.appendChild(option.cloneNode(true));
    }

    translateButton.addEventListener("click", translateText);
});
