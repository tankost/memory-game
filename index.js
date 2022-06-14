const section = document.querySelector('.cards-section');

const getData = () => [
    {imgSrc: 'assets/img/1.png', name: '1'},
    {imgSrc: 'assets/img/2.png', name: '2'},
    {imgSrc: 'assets/img/3.png', name: '3'},
    {imgSrc: 'assets/img/4.png', name: '4'},
    {imgSrc: 'assets/img/5.png', name: '5'},
    {imgSrc: 'assets/img/6.png', name: '6'},
    {imgSrc: 'assets/img/7.png', name: '7'},
    {imgSrc: 'assets/img/8.png', name: '8'},
    {imgSrc: 'assets/img/1.png', name: '1'},
    {imgSrc: 'assets/img/2.png', name: '2'},
    {imgSrc: 'assets/img/3.png', name: '3'},
    {imgSrc: 'assets/img/4.png', name: '4'},
    {imgSrc: 'assets/img/5.png', name: '5'},
    {imgSrc: 'assets/img/6.png', name: '6'},
    {imgSrc: 'assets/img/7.png', name: '7'},
    {imgSrc: 'assets/img/8.png', name: '8'},
]


const randomize = () => {
    const cardData = getData();
    cardData.sort(() => Math.random() - 0.5);
    return cardData;
}

randomize();


const cardGenerator = () => {
    const cardData = randomize();
    cardData.forEach((item, index) => {
        const card = document.createElement('div');
        const face = document.createElement('img');
        const back = document.createElement('div');
        card.setAttribute('class', 'card');
        face.setAttribute('class', 'face');
        back.setAttribute('class', 'back');

        face.src = item.imgSrc;
        card.setAttribute('name', item.name);

        section.appendChild(card);
        card.appendChild(face);
        card.appendChild(back);

        card.addEventListener('click', (e) => {
            card.classList.toggle('toggle-card');
            checkCards(e);
        })
    })
}

let step = 0;

const checkCards = (e) => {
    const clickedCard = e.target;
    clickedCard.classList.add('flipped');
    const flippedCards = document.querySelectorAll('.flipped');

    if (flippedCards.length === 2) {
        if (flippedCards[0].getAttribute('name') === flippedCards[1].getAttribute('name')) {
            flippedCards.forEach(card => {
                card.classList.remove('flipped');
                card.style.pointerEvents = 'none';
            })
        } else {
            flippedCards.forEach(card => {
                card.classList.remove('flipped');
                setTimeout(() => card.classList.remove('toggle-card'), 1000);
            })
        }
        step++;
    }
    const toggleCards = document.querySelectorAll('.toggle-card');
    if (toggleCards.length === 16) {
        win();
        restart();
    }
}


const restart = () => {
    let cardData = randomize();
    let faces = document.querySelectorAll('.face');

    section.style.pointerEvents = 'none';

    let cards = document.querySelectorAll('.card');
    cardData.forEach((item, index) => {
        cards[index].classList.remove('toggle-card');

        setTimeout(() => {
            cards[index].style.pointerEvents = 'all';
            faces[index].src = item.imgSrc;
            cards[index].setAttribute('name', item.name);
            section.style.pointerEvents = 'all';
        }, 1000)
    })
}
cardGenerator();


const win = () => {
    const winMessage = document.createElement('div');
    winMessage.setAttribute('class', 'win-message');
    const closeMessage = document.createElement('button');
    closeMessage.setAttribute('class', 'close-message');
    winMessage.innerHTML = `Your score: ${step} steps`;
    winMessage.append(closeMessage);
    section.appendChild(winMessage);

    localStorage.setItem('score', step.toString())
    saveToLocalStorage();
    step = 0;

    closeMessage.addEventListener('click', removeMessage);
}

const removeMessage = (e) => {
    if (e.target.classList.contains('close-message')) {
        e.target.parentElement.remove();
    }
}


const main = document.querySelector('main');
const button = document.querySelector('.button');
const scores = document.createElement('div');
scores.setAttribute('class', 'scores');
const scoreList = document.createElement('ol');
scoreList.setAttribute('class', 'list');


const loadResults = ((e) => {
    if (main.contains(scores)) {
        main.removeChild(scores);
    } else {
        main.appendChild(scores);
    }

})


button.addEventListener('click', loadResults)


const saveToLocalStorage = () => {
    const results = [];
    results.push(JSON.parse(localStorage.getItem('score')))

    scores.append(scoreList);

    for (let i = 0; i < results.length; i++) {
        const scoreItem = document.createElement('li');
        scoreItem.setAttribute('class', 'score-item');
        scoreItem.innerHTML = `${results[i]} steps`;
        scoreList.append(scoreItem);
    }

    const scoreItems = document.querySelectorAll('.score-item');

    if (scoreItems.length === 11) {
        const first = scoreList.firstChild;
        scoreList.removeChild(first);
    }
}
