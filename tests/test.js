const fetch = require('node-fetch');

const res = await fetch("https://libretranslate.com/translate", {
    method: "POST",
    body: JSON.stringify({
        q: "Hello!",
        source: "en",
        target: "es",
    }),
    headers: { "Content-Type": "application/json" },
});

console.log(await res.json());
