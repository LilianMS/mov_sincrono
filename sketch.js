
var bola, database;
var posicao;


function setup(){
  database = firebase.database();
  console.log(database);
  createCanvas(900,600);

  bola = createSprite(250,250,30,30);
  bola.shapeColor = "red";


  var bola_posicao = database.ref('bola/posicao');
  bola_posicao.on("value", readPosition, showError);
}

function draw(){
  background("white");
  
    if(keyDown(LEFT_ARROW)){
      writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
      writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
      writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
      writePosition(0,+1);
    }
    drawSprites();
  
}

function writePosition(x,y){
  database.ref('bola/posicao').set({
    'x': posicao.x + x ,
    'y': posicao.y + y
  })
}

function readPosition(data){
  posicao = data.val();
  console.log(posicao.x);
  bola.x = posicao.x;
  bola.y = posicao.y;
}

function showError(){
  console.log("Dados não recebidos do banco de dados");
}
