/*
<div class="result">
    <h1>Nome</h1>
    <p class="type">tipo</p>

    <p>significado :</p>

    <p class="sinonimos">Sinonimos</p>
    <li>sinonimo</li>
    <li>sinonimo</li>
    <li>sinonimo</li>

    <a href="">Careegar main</a>
</div> 
*/

// Elementos

const form = document.querySelector('form')
const result = document.querySelector('.result')

// Funções 
const fetching = async(text) => {
    try {
        result.innerHTML = 'Loading...'

        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${text}`) 
        const data = await response.json()

        result.innerHTML = ''
        console.log(data[0])
        
        const definitions = data[0].meanings[0]

        result.innerHTML = `
            <h2>${data[0].word}</h2>
            <p class="type">${definitions.partOfSpeech}</p>

            <p>${definitions.definitions[0].definition}</p>

            <p class="sinonimos">Synonyms</p>
        `

        if (data[0].meanings[0].synonyms.length > 3) {
            for (let i = 0; i < 3; ++i) {
                result.innerHTML += `<li>${data[0].meanings[0].synonyms[i]}</li>`
            } 
        } else {
            result.innerHTML += 'Not Found'
        }

        result.innerHTML += `<a href="${data[0].sourceUrls}">Load More</a>`

    } catch (error) {
        result.innerHTML = '<p>Sorry, the word could not be found</p>'
    }
}

// Eventos
form.addEventListener('submit', (e) => {
    e.preventDefault()

    fetching(form[0].value)
})

