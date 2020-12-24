
class SpeechClass {

    synth = window.speechSynthesis;
    currentUtterance = null;

    //boolean to indicate user paused and is on the same article, so
    //when user presses 'play', resume same article

    isPausedAndValid = false;

    onPlayingChanged = (isPlaying, newString) => {
        if (isPlaying && this.isPausedAndValid) {
            this.synth.resume();
        } else if (isPlaying) {
            this.synth.cancel();
            this.setUtterance(newString);
            this.speak();
        } else {
            this.synth.pause();
            this.isPausedAndValid = true;
        }
    }

    onSwitchNews = (isPlaying, newString) => {
        if (this.currentUtterance && this.currentUtterance.text === newString) {
            this.isPausedAndValid = true;
        } else {
            this.isPauseAndValid = false;
        }

        if (isPlaying) {
            this.synth.cancel();
            this.setUtterance(newString);
            this.speak();
        }
    }

    setUtterance = (newString) => {
        this.currentUtterance = new SpeechSynthesisUtterance(newString);
    }

    speak = () => {
        this.synth.speak(this.currentUtterance);
    }
}

var Speech = (function () {
    var instance;

    function createInstance() {
        var speech = new SpeechClass();
        return speech;
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    }
})();

export default Speech