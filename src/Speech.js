class SpeechClass {

    speechTTS = window.speechSynthesis;
    lastUtterance = new SpeechSynthesisUtterance("");

    onPlayingChanged = (continueOverride, isPlaying, utterance) => {
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
        utterance.lang = this.getLang();
        try {
            this.lastUtterance = utterance;
            this.speechTTS.speak(utterance);
        } catch (e) {
            alert('There was an error playing your article. Please try Turntable News in a different browser.');
        }
    }

    removeUtteranceListener = () => {
        this.lastUtterance.onend = null;
    }

    cancelSpeechSynthesis = () => {
        this.removeUtteranceListener();
        this.speechTTS.cancel();
    }

    getLang = () => {
        return (navigator.language || navigator.userLanguage).replace('_', '-');
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