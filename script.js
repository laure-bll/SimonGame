import Playing from "./js/playing.js";

class Start extends Playing {
    constructor(props) {
        super(props);
    }
}

// Instancie une nouvelle partie.
const playing = new Playing();
new Start(playing);