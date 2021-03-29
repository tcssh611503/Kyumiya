console.clear();
//init canvas element
var canvas = document.getElementById("mycanvas");
var ctx = canvas.getContext("2d");

//定義常用數字
var blockWidth = 200;
const PI = Math.PI;
const PI2 = Math.PI*2;

//正方形畫布 3x3九宮格
canvas.width = blockWidth *3; //600
canvas.height = blockWidth *3; //600

//自訂圓形
ctx.fillCircle = function(x,y,r){
  this.beginPath()
  //0~360度的圓形
  this.arc(x,y,r,0,PI2);
  this.fill();
}


var color={
  red: "#F74456",
  white: "#fff",
  yellow: "#F1DA56",
  blue: "#036FAF"
}

function drawBlock(pos,bgColor,draw,time){
   ctx.save();
   ctx.translate(pos.x*blockWidth, pos.y*blockWidth);
   ctx.fillStyle = bgColor;
   ctx.fillRect(0,0,blockWidth , blockWidth);
   //要從中間畫，因此相對於左上要在(100,100)畫
   ctx.translate(100,100);
   draw();
   ctx.restore()
}

//(0,0)放200*200矩形在(0,0) (1,0) 在(200,0)
// drawBlock( {x:0,y:0} , color.blue, function(){
// }, 0);

var time =0;
function draw(){
  time++;
  //動畫時間
  let stime=parseInt(time/20) //速度比較慢
  
  //9個區塊
  //1
  drawBlock( {x:0, y:0} ,color.blue , function(){
    ctx.beginPath()
    //中心圓
    // ctx.arc(0,0,30,0,PI2)
    //圓的大小變動
    ctx.arc(0,0,30/(stime%3+1),0,PI2)
    //填色
    ctx.strokeStyle="white"
    //圓型框線有粗度
    ctx.lineWidth=15
    ctx.stroke()
    //8個長方形
    for(var i=0;i<8;i++){
      //剛好是餘數畫紅色
      ctx.fillStyle= (stime%8==i)?color.red:"white"
      //0和4不畫長方形
      if ((i+stime)%4!=0){
        //往右60 往上-4 一個20*8的長方形
        ctx.fillRect(60,-4,20,8)
      }
      ctx.rotate(PI2/8) //每畫一次旋轉45度
    }
    
  }, time );
  
  //2 9個圓型
  drawBlock( {x:1, y:0} ,color.red , function(){
    ctx.save()
    //先縮放再排位置
    ctx.scale(0.8,0.8)
     //從中間位置開始
    ctx.translate(-60,-60)
    for(var i=0 ; i<3 ; i++){
      //先存起來，還沒移動位置的狀態
      ctx.save();
      for(var o=0 ; o<3 ; o++){
         ctx.beginPath();
         ctx.arc(0,0,20,0,PI2)
         ctx.fillStyle=color.white
         ctx.fill()
         //向下移動60(Y軸)
         ctx.translate(0,60)
        
        // (i%5==0) 餘數為0時 畫黃色圓形
        // if ( (i%5==0) ){
        //加上迴圈的o和stime
        // ((i+o+stime)%5==0) 
        //o*2 不規律
        if ( ((i+o*2+stime)%5==0) ){
        // if ( (i+o*2+stime)% 5 ==0){
          ctx.fillStyle=color.yellow
        }
        
         ctx.fill()
      }
      //恢復向下移動的狀態
      ctx.restore()
      //填完後再向右移動60(X軸)
      ctx.translate(60,0)
    }
     ctx.restore()
  }, time);
  
  //3 風扇
  drawBlock( {x:2, y:0} ,color.yellow , function(){
     for(var i=0 ; i<4 ; i++){
       ctx.beginPath();
       //移動到中心點
       ctx.moveTo(0,0);
       ctx.lineTo(80,20);
       ctx.lineTo(80,80);
       ctx.closePath();
       ctx.fillStyle="white";
       ctx.fill();
       //每次轉90度
       // ctx.rotate(Math.Pi/2);
       //餘數為 0 1 2 3時畫
       if( stime% 4 ==i) {
            ctx.beginPath();
            //小紅圓
            ctx.arc(60,40,6,0, PI2);
            ctx.fillStyle=color.red;
            ctx.fill();
       }
       ctx.rotate(PI/2);
    }
    
  }, time );
  
  //4
  drawBlock( {x:0, y:1} ,color.yellow , function(){
    //第一個方形
    ctx.translate(-60,-60);
    ctx.fillStyle=color.white;
    ctx.fillRect(0,0,60,60);
    
    //畫D
    //到正方形中心
    ctx.translate(30,30)
    //旋轉45度
    //一開始可以設0或註解掉，和座標系一致，來調整
    ctx.rotate(-PI/4); 
    //用路徑畫
    ctx.beginPath();
      ctx.moveTo(0,0)
      ctx.lineTo(40,0)
       //往上90度再到往下90度
      ctx.arc(40,40,40,-Math.PI/2,Math.PI/2)
      ctx.lineTo(0,80)
  
    ctx.fillStyle=color.red;
    ctx.fill();
    
    //畫長方形
    // ctx.translate(-100,60)
    //讓長方形能移動 + Math.sin() 波型移動 10*sin() 幅度變大  (time/10)速度變慢
    ctx.translate(-100+10*Math.sin(time/10),60)
    ctx.beginPath()
      ctx.fillStyle=color.blue
      ctx.fillRect(0,0,100,40)
    //讓長方形能移動 + Math.cos() 波型移動 10*sin() 幅度變大  (time/10)速度變慢,相位不同，製造向位差
    ctx.translate(100+10*Math.cos(time/10),40)
    ctx.beginPath()
      ctx.fillStyle=color.white
      ctx.fillRect(0,0,50,20)
    
      ctx.closePath();
    
  }, time );
  
  //5 44:10
  drawBlock( {x:1, y:1} ,color.white , function(){
    ctx.beginPath();
    ctx.fillStyle=color.red;
    //可以設0看效果
    //(time)/100 角度改變
    //*PI2 換算成角度
    // time % 100 讓數字永遠在0~100
    let angle1 = (time %100)/100*PI2;
    //90度看小果
    // let angle2 = PI/2; 
    // time % 50 讓數字永遠在0~50
    let angle2 = (time %50 )/50*PI2;
    //扇形
    ctx.moveTo(0,0);
    ctx.arc(0,0,80,angle1 ,angle2);
    ctx.fill();
    //小圈圈
    ctx.fillStyle=color.yellow
    //引入自訂的圓
    ctx.fillCircle(60,60,30)
    
  }, time );
  
  //6 黃色圓比紅色圓快兩倍
  drawBlock( {x:2, y:1} ,color.blue , function(){
    //白色圓
    ctx.fillStyle=color.white
    ctx.fillCircle(0,0,80) //50+20+10
    //紅色圓 
      //紅色黃色一起轉
      ctx.rotate(time/10)
      ctx.fillStyle=color.red
      ctx.fillCircle(-30,0,20)
      //黃色圓
      //黃色再旋轉
      ctx.rotate(time/10)
      ctx.fillStyle=color.yellow
      ctx.fillCircle(40,0,50)
  }, time );
  
  //7 環狀陣列
  drawBlock( {x:0, y:2} ,color.red , function(){
    //跟著時間轉
    ctx.rotate(time/100);
    //8個圓
     for(var i=0;i<8;i++){
         //畫之前旋轉 PI2/8
          ctx.rotate(i*PI2/8)
          ctx.fillStyle=color.white
          let r = 16
          //符合01時畫小圓
          if ( ((stime+i)%4)<2){
            r=10
          }
          
          ctx.fillCircle(60,0,r)
          ctx.fillStyle=color.blue
          ctx.fillCircle(30,5,5)
      }
    
  }, time );
  
  //8 黃色由上到下
  drawBlock( {x:1, y:2} ,color.blue  , function(){
      //黃色長方形
      ctx.translate(-80,-100)
      ctx.fillStyle=color.yellow
      // ctx.fillRect(0,0,40,200)
      //時間由上往下
      ctx.fillRect(0,time%200,40,time%200)
     //紅色長方形
     ctx.translate(40,40)
     ctx.fillStyle=color.red
     ctx.fillRect(0,0,120,80)
      //白色長方形
      ctx.fillStyle=color.white;
      ctx.fillCircle(0,40,stime%20)
       ctx.fillCircle(70,40,stime%10)
      //白色長方形
      ctx.translate(70,80)
      ctx.fillRect(0,0,50,80)
    
  }, time );
  
  //9 兩個三角形消失
  drawBlock( {x:2, y:2} ,color.yellow , function(){
    //左上角三角形
    ctx.beginPath()
    ctx.moveTo(-100,-100)
    ctx.lineTo(0,-100)
    ctx.lineTo(-100,100)
    ctx.closePath()
    ctx.fillStyle=color.white;
    ctx.fill();
    
    //轉90度畫右下角三角形
    ctx.rotate(PI)
    
    //紅色三角形
    ctx.save();
    ctx.translate(time%100,0);
    ctx.beginPath()
    ctx.moveTo(-100,-100)
    ctx.lineTo(0,-100)
    ctx.lineTo(-100,100)
    ctx.closePath()
    ctx.fillStyle=color.red;
    ctx.fill();
    ctx.restore();
    
    ctx.save();
    ctx.beginPath()
    ctx.moveTo(-100,-100)
    ctx.lineTo(0,-100)
    ctx.lineTo(-100,100)
    ctx.closePath()
  
    ctx.fillStyle=color.white;
    ctx.fill();
    ctx.restore();
    
  }, time ); 
  
  
  
 //優化版本的setTimeout
  requestAnimationFrame(draw)
}
requestAnimationFrame(draw)