class SpeechClass {

    speechTTS = window.speechSynthesis;
    lastUtterance = new SpeechSynthesisUtterance("");

    onPlayingChanged = (isPlaying, utterance) => {
        if (isPlaying) {
            this.lastUtterance.onend = null
            this.speechTTS.cancel();
            this.speak(utterance);
        } else {
            this.lastUtterance.onend = null
            this.speechTTS.cancel();
        }
    }

    onSwitchNews = (continueOverride, utterance) => {
        if (continueOverride) {
            this.lastUtterance.onend = null
            this.speechTTS.cancel();
            this.speak(utterance);
        } else {
            this.lastUtterance.onend = null
            this.speechTTS.cancel();
        }
    }

    speak = (utterance) => {
        try {
            this.lastUtterance = utterance;
            this.speechTTS.speak(utterance);
        } catch (e) {
            alert('There was an error playing your article. Please try Turntable News in a different browser.');
        }
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