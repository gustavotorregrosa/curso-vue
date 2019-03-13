new Vue({
    el: "#app",
    data:{
        playerHealth: 90,
        monsterHealth: 65,
        gameIsRunning: false,
        turns: []
    },
    methods:{
        startGame: function(){
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        attack: function(){
            let damage =  this.calculateDamage(3, 10);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: "Dano de " + damage + " causado no mostro"
            });
            this.monsterAttacks();
            this.checkWin();
        },
        monsterAttacks: function(){
            let damage = this.calculateDamage(5, 12);
            this.playerHealth -= damage;
            this.turns.unshift({
                isPlayer: false,
                text: "Dano de " + damage + " causado em vc"
            });
        },
        specialAttack: function(){
            let damage = this.calculateDamage(10, 20);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: "Dano de " + damage + " causado no mostro"
            });
            this.monsterAttacks();
            this.checkWin();
        },
        heal: function(){
            if(this.playerHealth < 90){
                this.playerHealth += 10;
            }else{
                this.playerHealth = 100;
            }
            this.turns.unshift({
                isPlayer: true,
                text: "Saude de 10 recuperada "
            });
            this.monsterAttacks();

        },
        giveUp: function(){
            this.gameIsRunning = false;            
        },
        calculateDamage: function(min, max){
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkWin: function(){
            if(this.monsterHealth <= 0){
                if(confirm('Vc ganhou...jogar de novo?')){
                    this.startGame();
                }else{
                    this.gameIsRunning = false;
                    return;
                }
            }

            if(this.playerHealth <= 0){
                if(confirm('Vc perdeu...jogar de novo?')){
                    this.startGame();
                }else{
                    this.gameIsRunning = false;
                    return;
                }
            }
        }
    }
});