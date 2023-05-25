
document.addEventListener('DOMContentLoaded', () => {
    game.create_cards_from_techs();
    insert_cards_on_the_board(game.cards);
    restart_game()
})

function insert_cards_on_the_board(cards) {
    // insere as cartas pre montadas no dom
    let board = document.getElementById("board");

    for (let i in cards) {
        let icon = cards[i].icon;
        let id = cards[i].id;

        board.innerHTML += `<div onclick="flipped(event)" id="${id}"class="card" data_icon="${icon}">
            <div class="card_front">
            <img class="icon" src = "./assets/images/${cards[i].icon}.png">
            </div>
            <div div class="card_back">
            <img class="icon" src="./assets/images/logo.png">
            </div>
            </div>`
    }
}

function flipped(event) {
    let card = event.currentTarget;

    if (game.set_card(card.id)) {
        //girar a carta clicada;
        card.classList.add("flip");
        if (game.card2) {

            if (game.check_math()) {
                //limpa a carta das memorias
                game.clear_card()

                if (game.check_game_over()) {
                    // adiciona a tela de game over
                    let endgame_view = document.getElementById("endgame");
                    endgame_view.style.display = "flex"
                    // atualiza tentativas
                    insert_attempts()
                }

            } else {
                // desvira as cartas e zera a memoria
                setTimeout(() => {
                    let card1_view = document.getElementById(game.card1.id);
                    let card2_view = document.getElementById(game.card2.id);
                    card1_view.classList.remove("flip");
                    card2_view.classList.remove("flip");
                    game.unflip();
                }, 1000);
            }
        }
    }
}

function insert_attempts() {
    let attempts = document.getElementById("attempts")
    attempts.innerText = `Tentativas: ${game.attempts}`
}

function restart_game() {
    //reinicia o jogo;
    document.getElementById("restart").addEventListener("click", () => {
        window.location.reload()
    })
}