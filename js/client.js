//Whether or not that slot of the word is guessed correctly.
Vue.createApp({
    data() {
        return {
            wordGuess: "hello", // Each element is a single character
            previousGuesses: [
            ],
            secretWord: ""
        };
    },
    watch: {
        wordGuess(newWord, oldWord) {
            let shake = false;
            if (newWord.length == 5 && !guessList.includes(newWord)) {
                shake = true;
            }
            if (newWord.length > 5) {
                this.wordGuess = oldWord;
                shake = true;
            }
            if (shake) {
                this.$refs.wordInput.classList.add('error');
                let f = () => { //  () =>  means basically the same as function(), but 'this' is not re-bound.
                    this.$refs.wordInput.classList.remove('error');
                };
                setTimeout(f, 300);
            }
        }
    },
    methods: {
        reset() {
            this.wordGuess = "hello";
            this.previousGuesses = [];
            let randIndex = Math.floor(Math.random() * wordList.length);
            this.secretWord = wordList[randIndex];
            console.log(this.secretWord);
        },
        pushGuess() {
            if (!guessList.includes(this.wordGuess)) return;
            if (!this.gameOver) {
                this.previousGuesses.unshift(this.wordGuess);
                //TODO: Show just the winning word
            }
        },
        checkForCorrectLetters(letter, indexInWord) {
            //See if it is in the right spot (if so, make it green)
            if (letter == this.secretWord[indexInWord]) {
                //Green
                return 2; //RightIn the right spot
            }
            //See if that letter is in the secret word (if so, make it yellow)
            else if (this.secretWord.includes(letter)) {
                //Yellow
                return 1; //Right but in the wrong spot
            }
            else {
                return 0;
            }

        }
    },
    computed: {
        gameOver() {
            return (this.previousGuesses.length >= 5 || this.previousGuesses.includes(this.secretWord));
        }
    },
    mounted() {
        let randIndex = Math.floor(Math.random() * wordList.length);
        this.secretWord = wordList[randIndex];
        console.log(this.secretWord);
    }
}).mount("#app");

