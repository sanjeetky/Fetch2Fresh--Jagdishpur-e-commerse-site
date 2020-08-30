import React,{Component} from 'react'
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
var id=null;
class Verify extends Component{
    constructor(props){
        super(props);
        this.state={
            number:"",
            text:"",
            password:""
          }
          this.Submit=this.Submit.bind(this);
          this.verify=this.verify.bind(this);
          this.counter=this.counter.bind(this);
          this.resend=this.resend.bind(this);
    }
    counter(temp)
    {
     
       id=setInterval(function(){ 
          if(temp<0)
          {
            clearInterval(id);
            document.getElementById('otp-timer-59').textContent="Resend";
            document.getElementById('otp-timer-59').style.backgroundColor="#525188"
            document.getElementById('otp-timer-59').disabled=false;
            document.getElementById('otp-timer-59').style.color="white"
          }
           else{
            document.getElementById('otp-timer-59').textContent=temp;
            document.getElementById('otp-timer-59').style.backgroundColor="#e9d8d8"
            document.getElementById('otp-timer-59').style.color="black"
            temp--;
            document.getElementById('otp-timer-59').disabled=true;
           }
        }, 1000);
       
    }
    

    resend(e)
    {
      var number=this.state.number;
      var val = Math.floor(1000 + Math.random() * 9000);
      
      this.setState({text:val});
      var obj={
      number:number,
      text:val
    }
   
    fetch('/message',{
      method:"POST",
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(obj)
    })
    .then(res=>res.json())
    .then(data=>
      {
        alert(val);
      })
    .catch(err=>console.log(err));
    this.counter(60);
    e.preventDefault();
    }





  Submit(event)
  {
    var number=this.state.number;
    var val = Math.floor(1000 + Math.random() * 9000);
    this.setState({text:val});
    var obj={
    number:number,
    text:val
  }
  alert(val);
  document.getElementById('otp-mob-number').setAttribute('readonly','');
  document.getElementById('otp-mob-number').style.color="grey";
  document.getElementById('otp-sent-number').style.display="block";
  document.getElementById('otp-timer-59').style.display="block";
  document.getElementById('otpsend-btn').style.display="none";
  document.getElementById('submit-btn').style.display="block";
  document.getElementById('otp-timer-59').style.boxShadow="0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)"
    this.counter(60);
  fetch('/message',{
    method:"POST",
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify(obj)
  })
  .then(res=>res.json())
  .then(data=>console.log(data))
  .catch(err=>console.log(err));
  event.preventDefault();
  }

  verify()
  {
     if(this.state.text==this.state.password)
     {
         clearInterval(id);
         this.props.history.push("/billing") 
     }
     else
     {
     alert("wrong password");
     }
  }
  
    render()
    {
        return (
            <div>
                <div class="otp-verification-page">

                    <img  src="assets/images/cart.png" alt=""/>

                       <h3>Verify</h3>

 <div class="otp-input-section">

    <input id="otp-mob-number" class="otp-input" type="number" placeholder="phone" value={this.state.number} onChange={(e)=>this.setState({number:e.target.value})} />
    <input id="otp-sent-number" class="otp-input" type="number" style={{display:"none"}} placeholder="ENTER OTP" value={this.state.password}  onChange={(e)=>this.setState({password:e.target.value})}  />

 </div>

 <div class="otp-button-section">
     <button class="otp-btn" onClick={this.resend} style={{display:"none"}} id="otp-timer-59"><span id="timer"></span></button>
     <button class="otp-btn"  id="otpsend-btn" type="submit" onClick={this.Submit} >send OTP</button>
     <button class="otp-btn" onClick={this.verify} style={{display:"none"}} id="submit-btn">Submit</button>
    
 </div>

</div>
               
            </div>
        )
    }
}
export default withRouter( Verify);

/*

<div>
                   <input type="text" placeholder="type the number" value={this.state.number} onChange={(e)=>this.setState({number:e.target.value})}/>
                   <button onClick={this.Submit}>submit</button>
                   <hr/>
                   <input type="text" placeholder="enter the password"  value={this.state.password}  onChange={(e)=>this.setState({password:e.target.value})} />
                   <button onClick={this.verify}>submit</button>
                </div>
                */