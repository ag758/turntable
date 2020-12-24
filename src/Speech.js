
class SpeechClass {

    synth = window.speechSynthesis;
    currentUtterance = null;

    onPlayingChanged = (isPlaying, newString) => {
        if (!isPlaying) {
            if (this.currentUtterance && newString === this.currentUtterance.text) {
                this.synth.resume();
            } else {
                this.setUtterance(newString);
            }
        } else {
            this.synth.pause();
        }
    }

    onSwitchNews = (isPlaying, newString) => {
        if (isPlaying) {
            this.setUtterance(newString);
        }
    }

    setUtterance = (newString) => {
        if (this.currentUtterance) {
            this.currentUtterance.onend = null;
        }

        this.synth.cancel();

        const utterance = new SpeechSynthesisUtterance(newString);
        this.currentUtterance = utterance;

        this.synth.speak(utterance);
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