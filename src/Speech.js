import SpeechTTS from 'speak-tts'; // es6

class SpeechClass {

    speechTTS = new SpeechTTS()
    synth = window.speechSynthesis;
    currentUtterance = null;
    lastSpokenUtteranceText = "";

    //boolean to indicate user paused and is on the same article, so
    //when user presses 'play', resume same article

    onPlayingChanged = (isPlaying, newString) => {
        if (isPlaying) {
            this.speechTTS.cancel();
            this.lastSpokenUtteranceText = newString;
            this.speak(newString);
        } else {
            this.speechTTS.cancel();
        }
    }

    onSwitchNews = (isPlaying, newString) => {
        if (isPlaying) {
            this.speechTTS.cancel();
            this.speak();
        } else {
            this.speechTTS.cancel();
        }
    }

    speak = (newString) => {
        this.speechTTS.speak({ text: newString, queue: false });
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