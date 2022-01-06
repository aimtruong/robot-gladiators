
// function "randomNumber" to choose random number
var randomNumber = function(min, max){
    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
};

// function "fightOrSkip" to 
var fightOrSkip = function(){
    // ask to fight or skip
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

    // conditional recursive function call
    if(promptFight === "" || promptFight === null){
        window.alert("You need to provide a valid answer! Please try again.");
        return fightOrSkip();
    }

    promptFight = promptFight.toLowerCase();

    // if player chose skip
    if(promptFight === "skip"){
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");
        if (confirmSkip){
            window.alert(playerInfo.name + " has decided to skip thise fight. Goodbye!");
            playerInfo;playerMoney = playerInfo.money - 10;
            return true;
        }
    }

    return false;
}

// function "fight" for player-robot to fight enemy-robot
var fight = function(enemy){
    // keep track of who goes first
    var isPlayerTurn = true;
    if(Math.random() > 0.5){
        isPlayerTurn = false;
    }

    while(playerInfo.health > 0 && enemy.health > 0){
        // if player attacks first
        if(isPlayerTurn){
            // if player choose to skip, then skip
            if (fightOrSkip()){
                // confirm player wants to skip
                break;
            }

            // generate random damage value based on player's attack power
            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
            enemy.health = Math.max(0, enemy.health - damage);
            // Log a resulting message to the console so we know that it worked.
            console.log(
                playerInfo.name + 
                " attacked " + 
                enemy.name + 
                ". " + 
                enemy.name + 
                " now has " + 
                enemy.health + 
                " health remaining."
            );
                
            // Check enemy's health
            if (enemy.health <= 0){
                window.alert(enemy.name + " has died!");
                    
                // award player money for winning
                playerInfo.money = playerInfo.money + 20;
                break;
            }
            else{
                window.alert(enemy.name + 
                " still has " + 
                enemy.health + 
                " health left.");
            }
        }
        // if enemy-robot attacks first
        else{
            var damage = randomNumber(enemy.attack - 3, enemy.attack);
            
            playerInfo.health = Math.max(0, playerInfo.health - damage);
            // Log a resulting message to the console so we know that it worked.
            console.log(
                enemy.name + 
                " attacked " + 
                playerInfo.name + 
                ". " + 
                playerInfo.name + 
                " now has " + 
                playerInfo.health + 
                " health remaining."
                );
                    
                // check player's health
                if (playerInfo.health <= 0){
                    window.alert(playerInfo.name + " has died!");
                    break;
                }
                else{
                    window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
                }
        }
    
        // switch turn order for next round
    isPlayerTurn = !isPlayerTurn;
    }
};

// fight enemy-robot
var startGame = function(){
    // reset player stats
    playerInfo.reset();

    for (var i = 0; i < enemyInfo.length; i++){
        if (playerInfo.health > 0){
            // what round is current
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));

            // new enemy to fight
            var pickedEnemyObj = enemyInfo[i];
            // reset enemyHealth before starting new fight
            pickedEnemyObj.health = randomNumber(40,60);
        
            // debugger;
        
            fight(pickedEnemyObj);
            // if there is still enemies
            if(playerInfo.health > 0 && i < enemyInfo.length - 1){
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

                // if yes(true),
                if (storeConfirm){
                    shop();
                }
            }
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
    window.alert("The game has now ended. Let's see how you did!");

    // check localStorage for high score
    var highScore = localStorage.getItem("highscore");
    if(highScore === null){
        highScore = 0;
    }

    // if player has more money than highscore
    if(playerInfo.money > highScore){
        localStorage.setItem("highscore", playerInfo.money);
        localStorage.setItem("name", playerInfo.name);

        alert(playerInfo.name +
            " now has the high score of " +
            playerInfo.money + 
            "!"
            );       
    }
    else{
        alert(playerInfo.name +
            " did not beat the high score of " +
            highScore +
            ". Maybe next time!"
            );
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
};

var shop = function(){
    var shopOptionPrompt = window.prompt("Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE.");
    
    // change shopOptionPrompt's string to int
    shopOptionPrompt = parseInt(shopOptionPrompt);

    switch (shopOptionPrompt){
        case 1:
            playerInfo.refillHealth();
            break;
    
        case 2:
            playerInfo.upgradeAttack();
            break;
    
        case 3:
            // do nothing, so function will end
            window.alert("Leaving the store.");
            break;
    
        default:
            // call shop() again to force player to pick a valid option
            window.alert("You did not pick a valid option. Try again.");
            shop();
            break;
    }
};


// function to set name
var getPlayerName = function(){
    var name = "";

    while(name === "" || name === null){
        name = prompt("What is your robot's name?");
    }
    
    console.log("Your robot's name is " + name);
    return name;
};

// player-robot
var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function(){
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function(){
        if(this.money >= 7){
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
        }
        else{
            window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function(){
        if(this.money >= 7){
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -= 7;
        }
        else{
            window.alert("You don't have enough money!");
        }
    }
};

// enemy-robots
var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10,14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10,14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10,14)
    }
];

console.log(enemyInfo);
console.log(enemyInfo[0]);
console.log(enemyInfo[0].name);
console.log(enemyInfo[0]["attack"]);

startGame();