function StartWork(){
  Show("background","alarm"); //work art
  if($.temp.drenched){
    narrator("You arrive at work late on account of your accident earlier.");
    narrator("You try to get to your cubicle quickly to make up the lost time.");
    boss("Where were you?");
    if($.loop == 2){
      thought("I can't give him the same excuse I gave yesterday.");
      thought("What can I say?");
      Choose({
    		"As I left my house, a car splashed water on me. So I needed to ...": BossAngry,
    		"I was mugged on the bus.": BossAngry
    	});
    }else{
      Choose({
    		"As I left my house, a car splashed water on me. So I needed to ...": BossAngry
    	});
    }
  }else{
    narrator("You calmly go to your cubicle and begin working quietly.");
    //maybe some chit chat in here
    InCubicle();
  }
}
//pandybat scene
function BossAngry(m){
  //boss appears
  player(m);
  boss("You think I can't tell a lie when I hear one");
  boss("Get to your cubicle.");
  boss("And I expect you to be here extra late today.");
  InCubicle();
}
function InCubicle(){
  Clear();
  //set art to cubicle.
  if($.loop <= 2){
    DoWork();
  }else{
    //talk to other people
    thoughts("I love no consequences");
    EndWork();
  }
}
function DoWork(){
  narrator("You do sit down, and start looking throught the cases for today");
  narrator("Which do you choose?");
  $.temp.cases = {
  		"James White": DoWork2,
  		"Catherine Black": DoWork2,
  		"Jake Brown": DoWork2
  	};
  Choose($.temp.cases);
  console.log('log');
  if($.loop == 2){
    thought("These are the same as from yesterday!");
  }
}
function DoWork2(m){
  console.log('log2');
  player("I'll do " + m);
  //minigame stuff maybe
  $.temp.cases[m] = false;
  var done = 0;
  for(var name in $.temp.cases){ //for each case
    if($.temp.cases[name]){     //add it to the choices if not done
      var tmp = {};
      tmp[name] = $.temp.cases[name];
      Choose(tmp);
    }else{                       //otherwise add it to the done
      done++;
    }
  }
  if(done ===  Object.keys($.temp.cases).length){
    player("All done");
    player("Guess I'll go home now");
    //boss conflict
    EndWork();
  }
  
}
function EndWork(){
  Clear();
	Wakeup();
}