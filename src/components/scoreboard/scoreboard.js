class Scoreboard {

    constructor(initialscore, intitialtime) {
        this.element = document.createElement("DIV");
        this.element.innerText = "SCORE: " + initialscore + "   Time Left: " + intitialtime;
        document.body.appendChild(this.element);
        this.element.style.color = "black";

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
            window.alert("You Ran Out of Time!");
        }

        this.element.innerText = "SCORE: " + this.getScore() + "   Time Left: " + newTime;
        this.time = newTime;
    }

    getTime() {
        return this.time;
    }
}

export default Scoreboard;