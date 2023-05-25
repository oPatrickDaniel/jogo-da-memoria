
let game = {

    //  estados iniciais do jogo
    lock_mode: false,
    card1: null,
    card2: null,
    cards: null,
    attempts: 0,

    // tecnologia das cartas 
    techs: [
        "bootstrap",
        "css",
        "electron",
        "firebase",
        "html",
        "javascript",
        "jquery",
        "mongo",
        "node",
        "react",
    ],

    set_card: (id) => {
        // coloca as cartas clicadas na memoria
        let card = game.cards.filter(card => { return card.id === id })[0];

        if (card.flipped || game.lock_mode) {
            return false;
        }

        if (!game.card1) {
            game.card1 = card;
            game.card1.flipped = true;
            return true;

        } else {
            game.card2 = card;
            game.card2.flipped = true;
            game.lock_mode = true;
            return true;
        }
    },

    //checa se são cartas iguais
    check_math: () => {
        game.attempt_counter()
        return game.card1.icon === game.card2.icon;
    },

    attempt_counter: () => {
        game.attempts++
        console.log(game.attempts)
    },

    //desvira as cartas
    unflip: () => {
        game.card2.flipped = false;
        game.card1.flipped = false;
        game.clear_card();
    },

    //esvazia a comparador de cartas
    clear_card: () => {
        game.card1 = null;
        game.card2 = null;
        game.lock_mode = false;
    },

    // checa se o jogo acabou
    check_game_over: () => {
        return game.cards.filter((cards) => { return !cards.flipped }).length === 0
    },

    //cria as cartas do tabuleiro
    create_cards_from_techs: () => {
        game.cards = [];
        for (const tech of game.techs) {
            game.cards.push(game.create_pair_from_techs(tech));
        }
        game.cards = game.cards.flatMap(pair => pair);
        game.shuffle_cards();
    },

    // cria os pares de cartas
    create_pair_from_techs: (tech) => {
        return [{
            id: game.create_id_with_tech(tech),
            icon: tech,
            flipped: false,
        },
        {
            id: game.create_id_with_tech(tech),
            icon: tech,
            flipped: false,
        }]
    },

    //cria o id aleatório pras cartas
    create_id_with_tech: (tech) => {
        return tech + parseInt(Math.random() * 100);
    },

    // embaralha as cartas
    shuffle_cards: () => {

        let current_index = game.cards.length;
        let random_index = 0;

        while (current_index !== 0) {

            random_index = Math.floor(Math.random() * current_index);
            current_index--
            [game.cards[random_index], game.cards[current_index]] = [game.cards[current_index], game.cards[random_index]];
        }
    },
}