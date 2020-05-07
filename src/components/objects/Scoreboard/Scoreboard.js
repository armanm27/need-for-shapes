class Scoreboard {

    constructor(initialscore, intitialtime) {
        this.element = document.createElement("div");
        this.element.id = "scoreboard";
        this.element.innerText = "SCORE: " + initialscore + "   Time Left: " + intitialtime;
        this.element.style.color = 'white';
        this.element.style.background = '0x7ec0ee';
        this.element.style.fontFamily = 'Andale Mono';
        this.element.style.fontSize = '40px';
        this.element.style.position = 'fixed';
        document.body.append(this.element);
        

        this.score = initialscore;
        this.time = intitialtime;
    }


    updateScore(newScore) {
        this.element.innerText = "SCORE: " + newScore + "   Time Left: " + this.getTime();
        this.score = newScore;
    }

    getScore() {
        return this.score;
    }

    updateTime() {

        var newTime = this.getTime() - 1;
        
        if (newTime == 0) {

            var finalMessage = "You Ran Out of Time! Your final score: " + this.getScore();
            window.alert(finalMessage);
        }

        this.element.innerText = "SCORE: " + this.getScore() + "   Time Left: " + newTime;
        this.time = newTime;
    }

    getTime() {
        return this.time;
    }
}



export default Scoreboard;