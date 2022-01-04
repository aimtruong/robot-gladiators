
// player-robot
var playerName = window.prompt("what is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

// enemy-robots
var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

// function "fight"
var fight = function(enemyName){
    while(playerHealth > 0 && enemyHealth > 0){
        
        // to fight or not?
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
        
        // if player choose to skip, then skip
        if (promptFight === "skip" || promptFight === "SKIP"){
            // confirm player wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");
            
            // if yes(true), leave fight
            if (confirmSkip){
                window.alert(playerName + " has decided to skip the fight. Goodbye!");
                // subtract money from playerMoney for skipping
                playerMoney = playerMoney - 10;
                console.log("playerMoney", playerMoney);
                break;
            }
        }
        
        enemyHealth = enemyHealth - playerAttack;
        
        // Log a resulting message to the console so we know that it worked.
        console.log(
            playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
            );
            
            // Check enemy's health
            if (enemyHealth <= 0){
                window.alert(enemyName + " has died!");
                
                // award player money for winning
                playerMoney = playerMoney + 20;
                break;
            }
            else{
                window.alert(enemyName + " still has " + enemyHealth + " health left.");
            }
            
            // Subtract the value of `enemyAttack` from the value of `playerHealth` and use that result to update the value in the `playerHealth` variable.
            playerHealth = playerHealth - enemyAttack;
            
            // Log a resulting message to the console so we know that it worked.
            console.log(
                enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
                );
                
                // check player's health
                if (playerHealth <= 0){
                    window.alert(playerName + " has died!");
                    break;
                }
                else{
                    window.alert(playerName + " still has " + playerHealth + " health left.");
                }
    }
};

// fight enemy-robot
var startGame = function(){
    // reset player stats
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;

    for (var i = 0; i < enemyNames.length; i++){
        if (playerHealth > 0){
            // what round is current
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
        
            // new enemy to fight
            var pickedEnemyName = enemyNames[i];
        
            // reset enemyHealth before starting new fight
            enemyHealth = 50;
        
            // debugger;
        
            fight(pickedEnemyName);
        }
        else{
            window.alert("You have lost your robot in battle! Game over!");
            break;
        }
    }

    // player will either die or win, so run function endGame
    endGame();
};

// function to end the entire game
var endGame = function(){
    // player wins
    if(playerHealth > 0){
        window.alert("Great job, you've survived the game! You now have a score of " + playerMoney + ".");
    }
    else{
        window.alert("You've lost your robot in battle.");
    }

    // ask player to play again
    var playAgainConfirm = window.confirm("Would you like to play again?");

        if (playAgainConfirm){
            // restart game
            startGame();
        }
        else{
            window.alert("Thank you for playing Robot Gladiators! Come back soon!");
        }

}



startGame();



