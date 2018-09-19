const lottery = (nbPick, max) => {
    let myPicks = []
    for (let i = 0; i < nbPick; i++) {
        do var pick = Math.floor(Math.random() * max) + 1
        while (myPicks.includes(pick))
        myPicks.push(pick)
    }
    return myPicks.sort((a, b) => a - b)
}

const addDiv = (text) => {
    var div = document.createElement('h5')
    div.className = 'mat-h5'
    div.innerHTML = text
    document.body.appendChild(div);
}

onLotoClick = () => {
    addDiv(`${lottery(5, 49)} <i class="material-icons">stars</i> ${lottery(1, 10)}`)
}

onEuroMillionClick = () => {
    addDiv(`${lottery(5, 49)} <i class="material-icons">stars</i> ${lottery(2, 12)}`)
}

onClearClick = () => {
    const removeElements = (elms) => [...elms].forEach(el => el.remove());
    removeElements( document.querySelectorAll(".mat-h5") );
}