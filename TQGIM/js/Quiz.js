class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    question.hide();
    background("Yellow");
    fill(0);
    textSize(30);
    text("And the results of the following 1 question quick quiz is ",240, 50);
    text("-------------------------------------------------------------------------",240, 65);
    Contestant.getPlayerInfo();
    if(allContestants !== undefined){
      debugger;
      var TAOTFQ = 230;
      fill("Blue");
      textSize(20);
      text("*ThankYou for the participation your name will be highlighted in green if you answered the following questions correctly ;) Stay Safe",130,230);

      for(var plr in allContestants){
        debugger;
        var correctAns = "4";
        if (correctAns === allContestants[plr].answer)
          fill("Green")
        else
          fill("red");

        TAOTFQ+=30;
        textSize(20);
        text(allContestants[plr].name + ": " + allContestants[plr].answer, 250,TAOTFQ)
      }
    }
  }
}
