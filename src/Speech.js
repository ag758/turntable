
class SpeechClass {

    synth = window.speechSynthesis;
    currentUtterance = null;
    lastSpokenUtteranceText = "";

    //boolean to indicate user paused and is on the same article, so
    //when user presses 'play', resume same article

    onPlayingChanged = (isPlaying, newString) => {
        if (isPlaying) {
            this.synth.cancel();
            this.setUtterance(newString);
            this.lastSpokenUtteranceText = newString;
            this.speak();
        } else {
            this.synth.pause();
        }
    }

    onSwitchNews = (isPlaying, newString) => {
        if (isPlaying) {
            this.synth.cancel();
            this.setUtterance(newString);
            this.speak();
        } else {
            this.synth.cancel();
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