const menu = document.querySelector('.menu')
const dropdownItem = document.querySelector('.item')
const resultsContainer = document.querySelector('.results-container')
const firstAppearance = document.querySelector('.first-appearance')
const apiKey = config.API_KEY
const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
const characterUrl = `https://comicvine.gamespot.com/api/characters/?api_key=${apiKey}&format=json&sort=date_last_modified&field_list=deck,description,first_appeared_in_issue,image,name,origin,real_name`
const issueUrl = `https://comicvine.gamespot.com/api/issues/?api_key=${apiKey}&format=json&filter=id:`

function getCharacters() {
	fetch(proxyUrl + characterUrl)
		.then(response => response.json())
		.then(data => buildCharacter(data.results))
		.catch(error => console.log('Request failed', error))
}

function buildCharacter(data) {
	for (let i = 0; i < data.length; i++) {
		let characterDiv = document.createElement('div')
		characterDiv.textContent = data[i].name
		characterDiv.classList.add('item')
		characterDiv.addEventListener('click', function () {
			buildOrigin(event, data)
		})
		menu.appendChild(characterDiv)
	}
}

function buildOrigin(event, data) {
	resultsContainer.innerHTML = ''
	for (let i = 0; i < data.length; i++) {
		if (event.target.textContent === data[i].name) {
			let character = document.createElement('div')
			character.innerHTML = ` <img class='character-image' src='${data[i].image.original_url}' />
                              <div class='character-name'>
															<h2 class='name'>${data[i].name}</h2>
															<h3>Real Name: ${data[i].real_name}</h3>
                              <p>${data[i].deck}</p>
														  </div>
														 `
			character.classList.add('name-container')
			resultsContainer.appendChild(character)
			let id = data[i].first_appeared_in_issue.id
			fetch(proxyUrl + issueUrl + id)
				.then(response => response.json())
				.then(data => putIdInThePlace(data.results[0]))

			let description = data[i].description
			let regEx = /<h2>Origin<\/h2>(.|)*\/.+?(?=<h2>Character Evolution<\/h2>)/gmi
			let matchDesc = description.match(regEx)
			let originH2 = document.querySelectorAll('h2')
			let origin = document.createElement('div')
			origin.classList.add('origin')
			origin.innerHTML = `<p class='full-description'>${matchDesc}</p>`
			resultsContainer.appendChild(origin)
		}
	}
}

function putIdInThePlace(data) {
	let issueDetails = document.createElement('div')
	issueDetails.classList.add('first-issue')
	issueDetails.innerHTML = `<div class='first-issue-details'>
	<h3 class="first-appearance">First Appearance: <br />${data.name}</h3>
	<h3>Issue Date: <br />${data.cover_date}</h3>
															</div>
															<img class='issue-image' src='${data.image.original_url}' />
				
																<h3>Issue Storyline:</h3>
																<p>${data.description}`
	resultsContainer.appendChild(issueDetails)
}

getCharacters()