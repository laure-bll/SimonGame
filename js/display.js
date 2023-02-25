import Game from "./game.js";

export const MESSAGES = {
    looser: "Wrong, let's try again !",
    winner: "Well played, get ready for the next level !",
    start: "Please, click the start button to start the game.",
    reset: "You reset the game ! Click the start button to try again."
}

export const SOUNDS = {
    applause: "applaudissements.mp3",
    beat: "battement.mp3",
    bell: "cloche.mp3",
    robot: "computer.mp3",
    wrong: "docteur_maboul.mp3",
    ole: "ole.mp3",
    cheer: "ouais.mp3",
    laser: "laser.mp3",
    drum_0: "tambour_eau_medium_aigu.mp3",
    drum_1: "tambour_eau_medium.mp3",
    drum_2: "tambour_eau_medium_grave.mp3",
    drum_3: "tambour_eau_grave.mp3",
}

/**
 * Gère tout ce qui concerne la modification du texte et du style dans le DOM.
 */
class Display extends Game {
    constructor() {
        super();

        // Set les valeurs par défaut dans le DOM.
        this.updateDashBoard();
        this.updateCounter();

        this.listeningClickEvents();
    }

     /**
     * Ecoute tout évènement "click" dans l'élément "playground".
     */
     listeningClickEvents() {
        this.playground.addEventListener("click", (e) => {
            this.dispatchAction(e.target)
        });
    }

    /**
     * Exécute l'action correspondant à l'élément cliqué.
     * @param {Element} el
     */
    dispatchAction(el) {
        // Vérifie si l'élément cliqué à une correspondance...
        switch (el) {
            // ...avec l'un des quartiers
            case this.quarters.find(quarter => el === quarter) :
                this.onPlayerTurn(el);
                break;
            // ...avec le bouton "play"
            case this.startButton:
                this.onComputerTurn();
                break;
            // ...avec le bouton "reset"
            case this.resetButton:
                this.onReset();
            default:
                break;
        }
    }

    /**
     * Si le jeu a commencé, affiche les actions du joueur :
     * la case est colorée. Sinon affiche un message d'erreur.
     * @param {Element} el
     */
    onPlayerTurn(el) {
        if(this.isGameStarted) {
            if(this.isPlayerTurn) {
                this.highlightQuarter(el);
                const selectedQuarter = this.quarters.indexOf(el);
                this.playSound(SOUNDS[`drum_${selectedQuarter}`]);
                const isWrong = this.playerTurn(selectedQuarter);
                isWrong ? this.onLoose() : this.onWin();
            }
        }
        else {
            this.displayMessage(MESSAGES.start);
            this.playSound(SOUNDS.wrong);
        }
    }

    /**
     * Affichage d'erreur quand le joueur se trompe.
     */
    onLoose() {
        this.alertWrongSequence();
        this.updateCounter(this.counter);
        this.playSound(SOUNDS.wrong);
        setTimeout(() => this.playSequence(), 3000);
    }

    /**
     * Affichage du passage au niveau suivant si le joueur gagne.
     */
    onWin() {
        this.updateCounter();

        if (JSON.stringify(this.playerSequence) === JSON.stringify(this.computerSequence)) {
            this.nextLevel();
            // Met à jour la vue avec les nouvelles valeurs.
            this.updateDashBoard();
            this.updateCounter();
            // Déclenche un message de réussite et des applaudissements sonores.
            this.displayMessage(MESSAGES.winner);
            setTimeout(() => this.playSound(SOUNDS.cheer), 1000);
            setTimeout(() => this.playSequence(), 3100);
        }
    }

    /**
     * Si le jeu n'a pas commencé, lance la partie : inverse le bouton 
     * start en reset et lance le tour de l'ordinateur. Sinon, lance
     * simplement le tour de l'ordinateur.
     */
    onComputerTurn() {
        !this.isGameStarted ?
        (
            this.playSound(SOUNDS.robot),
            this.displayButton("reset"),
            setTimeout(() => {
                this.isGameStarted = true;
                this.computerTurn();
                this.playSequence();
            }, 2000)
        )
        : this.computerTurn();
    }

    /**
     * Informe visuellement de la fin du jeu :
     * - message d'alerte avec effets sonore et visuel
     * - inverse le bouton reset en start
     * - restaure les valeurs.
     */
    onReset() {
        if(this.isGameStarted) {
            this.resetGame();
            this.playSound(SOUNDS.laser);
            this.displayMessage(MESSAGES.reset);
            this.displayButton("start");
            this.displayRedBackground(false);
            this.restoreDefaultValues();
        }
    }

     /**
     * Met en surbrillance les quartiers un à un avec une intervalle de 500ms.
     * La boucle est arrêtée quand le compteur a atteint la fin de la séquence.
     * A la fin de la séquence, le joueur peut jouer.
     */
     playSequence() {
        let count = 0;
        
        this.createSequence();

        const intvl = setInterval(() => {
            const index = this.computerSequence[count];

            if(this.isGameStarted) {
                count === (this.sequenceLength - 1)
                ? (
                    clearInterval(intvl),
                    this.isPlayerTurn = true
                ) 
                : count += 1;
    
                this.highlightQuarter(this.quarters[index]),
                this.playSound(SOUNDS[`drum_${index}`])
            } else {
                clearInterval(intvl)
            }
        }, 500);
    }

    /**
     * Restaure toutes les valeurs par défaut dans le DOM.
     */
    restoreDefaultValues() {
        this.points = 0;
        this.level = 1;
        this.sequenceLength = 4;

        // Met à jour la vue avec les valeurs restaurées.
        this.updateDashBoard();
        this.updateCounter();
    }

    /**
     * Met à jour le compteur de séquence dans le DOM.
     * Sa valeur par défaut correspondant à la taille de la séquence.
     */
    updateCounter() {
        this.counterElement.innerHTML = this.counter;
    }

    /**
     * Met à jour les valeurs du tableau de bord dans le DOM :
     * - points
     * - niveau
     * - taille de la séquence.
     */
    updateDashBoard() {
        this.pointsElement.innerHTML = this.points;
        this.levelElement.innerHTML = this.level;
        this.sequenceElement.innerHTML = this.sequenceLength;
    }

    /**
     * Met en surbrillance un quartier pendant 1 seconde.
     * @param {Element} quarterElement 
     */
    highlightQuarter(quarterElement) {
        quarterElement.style.opacity = 0;
        setTimeout(() => quarterElement.style.opacity = 1, 200);
    }

    /**
     * Affiche un fond rouge alarmant pendant 3secondes.
     */
    alertWrongSequence() {
        this.displayRedBackground(true);
        this.displayMessage(MESSAGES.looser);
        setTimeout(() => this.displayRedBackground(false), 3000);
    }

    /**
     * Affiche ou supprime un fond rouge alarmant.
     * @param {boolean} show
     */
    displayRedBackground(show) {
        show ? this.body.classList.add("alert") : this.body.classList.remove("alert");
    }

    /**
     * Affiche le contenu du message informatif à l'attention du joueur.
     * @param {string} content
     */
    displayMessage(content) {
        this.message.style.visibility = "visible";
        this.message.innerHTML = content;
    }

    /**
     * Supprime le contenu du message informatif à l'attention du joueur.
     */
    removeMessage() {
        this.message.style.visibility = "hidden";
        this.message.innerHTML = "";
    }

    /**
     * Inverse le bouton "start" et "reset" dans l'affichage.
     * @param {string: "start" | "reset"} btn
     */
    displayButton(btn) {
        if(btn === "start") {
            this.startButton.style.display = "initial"; 
            this.resetButton.style.display = "none";
        }

        if(btn === "reset") {
            this.resetButton.style.display = "initial"; 
            this.startButton.style.display = "none";
        }
    }

    /**
     * Joue un son une fois.
     * @param {string} soundFile
     */
    playSound(soundFile) {
        const filePath = window.location.href + "/sounds/" + soundFile;
        this.soundElement.src = filePath;
        this.soundElement.play();
    }
}

// Instancie une nouvelle partie.
new Display();