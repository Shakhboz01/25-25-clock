import React ,{Component} from 'react';
import './App.css';
import "bootstrap-icons/font/bootstrap-icons.css";


class App extends Component {

  constructor(props){
    super(props);
    this.state={
      stopPlay:true,
      restarted:true,
      minute:25,
      secund:0,
      isPlaying:true,
      sessionCount:25,
      blockCount:25 ,
      clockCount:25*60,
      currentTimer:"Session"
    };
    this.handleStart=this.handleStart.bind(this)
    this.handleReset=this.handleReset.bind(this)
    this.handleStop=this.handleStop.bind(this);
   
  this.handleChange=this.handleChange.bind(this)
  }
    handleStop(){
this.setState({
  isPlaying:false,
  stopPlay:true,
  restarted:false
})
    console.log(this.state.restarted)

    }



  handleReset(){
    this.setState({
      clockCount:25*60,
      isPlaying:false,
      minute:25,
      secund:0,
      stopPlay:true,
      sessionCount:25,
      blockCount:25,
      restarted:true
    });
    console.log(this.state.restarted)
  }


  handleStart(){

    this.setState({
      restarted:false,
    })
    console.log(this.state.restarted)
    //const {minute,secund}=this.state;
    const audio=document.getElementById("beep")
    console.log(this.state.isPlaying)

  const interval=  setInterval(()=>{
    if(this.state.clockCount>-1  ){

  if(this.state.clockCount==-1 || this.state.isPlaying==false){
  clearInterval(interval); 
  this.setState({
    isPlaying:true
  });
  }

  else if(this.state.clockCount===0 && this.state.currentTimer=="Session"){

    this.setState({
      currentTimer:"Break",
      clockCount:this.state.blockCount*60,
      minute:this.state.blockCount,
      secund:0
    })
    audio.play()
  }
  else if(this.state.clockCount===0 && this.state.currentTimer=="Break"){

    this.setState({
      currentTimer:"Session",
      clockCount:this.state.sessionCount*60,
      minute:this.state.sessionCount,
      secund:0
    })
    audio.play()
  }

  else{
  this.setState({
  minute:Math.floor((this.state.clockCount-1)/60),
  secund:((this.state.clockCount-1)%60),
  stopPlay:false,
  clockCount:this.state.clockCount-1,
  });
   
    

  }
}
  },1000);
  
  };

  handleChange=(plus_minus,type)=>{
    if(this.state.restarted==true   ){

      if(plus_minus=="+" && type=="Session" && this.state.sessionCount<60){
        this.setState({
          sessionCount:this.state.sessionCount+1,
          clockCount:this.state.clockCount+60,
        })
      }

      else if(plus_minus=="-" && type=="Session" && this.state.sessionCount>1){
        this.setState({
          sessionCount:this.state.sessionCount-1,
          clockCount:this.state.clockCount-60,
        })
      }

      else if(plus_minus=="+" && type=="Break" &&this.state.blockCount<60){
        this.setState({
          blockCount:this.state.blockCount+1,
        })
      }
      else if(plus_minus=="-" && type=="Break"&&this.state.blockCount>1 ){
        this.setState({
          blockCount:this.state.blockCount-1,
        })
      }
    }
      
  } 




  render(){
 
const {currentTimer,clockCount,stopPlay,isPlaying,minute,secund}=this.state;
const number=Math.floor(clockCount/60);
return (
<div className='container text-center'>
  {/* <div className='flex arr text-center'>
    <div className=' flex text-center'>
    <i className="bi bi-plus-square-fill"></i>
    <pre>Break</pre>
    <i className="bi bi-plus-square-fill"></i>
    </div>
    <div className=' flex text-center'>
    <i className="bi bi-plus-square-fill"></i>
    <pre>Session</pre>
    <i className="bi bi-plus-square-fill"></i>
    </div>
  </div> */}

  <div className='flex'>
    <div>
      <pre><i onClick={()=>this.handleChange('+','Break')} className="bi bi-plus-square-fill"></i></pre>
      <pre>Break:{this.state.blockCount}</pre>
      <pre><i onClick={()=>this.handleChange('-','Break')} className="bi bi-dash-circle-fill"></i></pre>
    </div>
    <div>
      <pre><i onClick={()=>this.handleChange('+','Session')} className="bi bi-plus-square-fill"></i></pre>
      <pre>Session:{this.state.sessionCount}</pre>
      <pre><i onClick={()=>this.handleChange('-','Session')} className="bi bi-dash-circle-fill"></i></pre>
    </div>
  </div>
  
  <div id="display" style={stopPlay?{border:"3px solid white"}:{border:"3px solid green"}}>
    
  {/* {stopPlay?
  <h2>{this.state.sessionCount}:{`0${secund}`}</h2>
  :
   <h2 style={clockCount<60?{color:"red"}:{color:"black"}} className='text-center' > {`${minute<10 ? `0${minute}`:minute}:${secund<10 ? `0${secund}`:secund}`}</h2>
  } */}
   <h2 style={clockCount<60?{color:"red"}:{color:"white"}} className='text-center' > {`${number<10 ? `0${number}`:number}:${secund<10 ? `0${secund}`:secund}`}</h2>

  <h3 className='text-center'>{currentTimer}</h3>
  </div>
<br/>
{stopPlay?
  <button onClick={this.handleStart} className='btn btn-primary' >Play</button>
  :
  <button className='btn btn-danger' onClick={this.handleStop}>Stop</button>
}

<button className='btn btn-info mr-20' onClick={this.handleReset} >reset</button>
<audio id="beep"  src="https://www.pacdv.com/sounds/interface_sound_effects/sound107.wav" />
</div>
);
}
}
export default App;
