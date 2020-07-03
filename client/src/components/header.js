import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron,
     Modal, ModalHeader, ModalBody,
    Form, FormGroup, Col,Row,Input, Label,Image,View } from 'reactstrap';
    import { Control, LocalForm, Errors } from 'react-redux-form';
    import { withRouter } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
class Header extends Component {
    constructor(props) {
        super(props);
        this.toggleNav = this.toggleNav.bind(this);
        this.togglelogin= this.togglelogin.bind(this);
        this.togglesignup= this.togglesignup.bind(this);
        this.suggestionSelected=this.suggestionSelected.bind(this);
        this.clickedcart=this.clickedcart.bind(this);
        this.clickeduser=this.clickeduser.bind(this);
        this.toggalout=this.toggalout.bind(this);
        this.menutoggle=this.menutoggle.bind(this);
        this.onTextChanged=this.onTextChanged.bind(this);
        this.renderSuggestion=this.renderSuggestion.bind(this);
        this.loginsubmit=this.loginsubmit.bind(this);
        this.signupsubmit=this.signupsubmit.bind(this);
        this.logout=this.logout.bind(this);
        this.itemsnum=this.itemsnum.bind(this);
        
       
        this.state = {
          isNavOpen: false,
          islogin:false,
          issignup:false,
          suggestion:[],
          text:"",
          items:[],
          cartitems:"0",
          user:{
            username:" ",
            password:" "
             }
        };
    }

    componentDidMount()
    {
       
         fetch('/shopping/fruits')
        .then(res=>res.json())
        .then(data=>data.map((item)=>{
             var tt=this.state.items.concat(`${item.name}`)
             this.setState({items:tt})
        })); 
        fetch('/users/session')
        .then(res=>res.json())
        .then(data=>{
        if(data.username==null)
        {
            document.getElementById("login").style.display="block";
            document.getElementById("logout").style.display="none";
            this.setState(prev=>({
            user:{
              ...prev.user,
              username:" ",
              password:" "
            }
          }))
        }
        else{
            document.getElementById("login").style.display="none";
            document.getElementById("logout").style.display="block";
            this.setState(prev=>({
             user:{
               ...prev.user,
               username:data.username,
               password:data.password
             }
           }))
        }
    })

    this.props.onRef(this);
    
}
componentWillUnmount() {
    this.props.onRef(undefined)
  }

clickeduser(e)
{
    if(this.state.user.username==' ')
    {
        document.getElementById('login-popup').style.display="block";
      setTimeout(()=>{

        let y=document.getElementsByClassName('popup-box-login');
        document.getElementById('login-popup').style.display="none";
    },2000)
    }
    else
    {
        this.props.history.push("/activeuser") ;
    }
    
}

clickedcart(e)
{
    if(this.state.user.username==' ')
    {
        document.getElementById('login-popup').style.display="block";
      setTimeout(()=>{

        let y=document.getElementsByClassName('popup-box-login');
        document.getElementById('login-popup').style.display="none";
    },2000)
    }
    else
    {
        this.props.history.push("/cart") ;
    }
    
}

  menutoggle()
  {

     let slid=document.getElementsByClassName('slider-header');
     slid[0].classList.toggle('slider-header-123');
    }

toggalout(){

    let slid=document.getElementsByClassName('slider-header');
   
    slid[0].classList.toggle('slider-header-123');

}

   
   
itemsnum()
{
    
    fetch('/users/session')
    .then(res=>res.json())
    .then(data=>{
        var item={username:data.username};
    fetch('/cart/display',{
        method:'POST',
        headers:{ 'Content-Type':'application/json'},
        body:JSON.stringify(item)
    })
    .then((res)=>res.json())
    .then((data)=>{ 
        this.setState({cartitems:data.length})})
    .catch((err)=>console.log(err));
})
}

//toggling function
  togglelogin()
  {
      this.setState({
          islogin:!this.state.islogin
      })
  }
      toggleNav() {
        this.setState({
          isNavOpen: !this.state.isNavOpen
        });
      }
    togglesignup()
    {
        this.setState({
            issignup:!this.state.issignup,
            islogin:!this.state.islogin
        })
    }
//searching
onTextChanged=(e)=>{
    const value=e.target.value;
    let suggestion=[];
    if(value.length>0&&this.state.items!=null)
    {
        const regex=new RegExp(`^${value}`,'i');
        suggestion=this.state.items.sort().filter(v=>regex.test(v));
    }
   this.setState(()=>({suggestion,text:value}));
   
}

suggestionSelected(value){
    this.setState(()=>({
        text:value,
        suggestion:[],
    }))
}
renderSuggestion(){
    const {suggestion}=this.state;
    if(suggestion.length===0){
        return null;
    }
    return (
      
      <ul>
          {[...new Set(suggestion)].map((item)=><li onClick={()=>this.suggestionSelected(item)}>{item}</li>) }
      </ul>
    )
}
//searching submit and send it to itempage


//login
loginsubmit(values)
{
    this.togglelogin();
    var user={
        username:values.username,
        password:values.password
    }
    fetch('/users/login',{
        method:"POST",
        headers:{ "Content-Type":"application/json"},
        body:JSON.stringify(user)
    })
    .then(res=>res.json())
    .then(data=>{
       console.log(data);
      window.location.reload(false);
    })
   
    .catch(err=>console.log(err));
}

signupsubmit(values)
{ 
    this.setState({
        issignup:!this.state.issignup
    })
    
    var user={
        name:values.sname,
        username:values.susername,
        password:values.spassword
    }
  
    fetch('/users/signup',{
        method:"POST",
        headers:{ "Content-Type":"application/json"},
        body:JSON.stringify(user)
    })
    .then(res=>res.json())
    .then(data=>{
      if(data.status == 'err')
      {
        alert("username already exist");
      }
      else{
        console.log(data.status);
        window.location.reload(false);
      }
       
    })
    .catch(err=>console.log(err));
}
logout()
{
    fetch('/users/logout')
    .then(res=>res.json())
    .then(data=>{
        console.log("logout")
        window.location.reload(false);
    })
    .catch(err=>console.log(err))
}

      //render
    render() {
       
        return(
          
            
   <div >
                 
               

    <div class="container-header-main">  
      
        <div class="header-container-box">
            <div class="header-container-top">
    

              
                 <div class="top-header-container-1">
                     
                     
                     
                   
                  <div class="slider-header">

                    <div class="line-out-main" id="toggal-out" onClick={this.toggalout}>
                      <svg style={{color: "#fff", width:"40px",height:"40px"}} class="svg-icon" viewBox="0 0 20 20">
							<path d="M10.185,1.417c-4.741,0-8.583,3.842-8.583,8.583c0,4.74,3.842,8.582,8.583,8.582S18.768,14.74,18.768,10C18.768,5.259,14.926,1.417,10.185,1.417 M10.185,17.68c-4.235,0-7.679-3.445-7.679-7.68c0-4.235,3.444-7.679,7.679-7.679S17.864,5.765,17.864,10C17.864,14.234,14.42,17.68,10.185,17.68 M10.824,10l2.842-2.844c0.178-0.176,0.178-0.46,0-0.637c-0.177-0.178-0.461-0.178-0.637,0l-2.844,2.841L7.341,6.52c-0.176-0.178-0.46-0.178-0.637,0c-0.178,0.176-0.178,0.461,0,0.637L9.546,10l-2.841,2.844c-0.178,0.176-0.178,0.461,0,0.637c0.178,0.178,0.459,0.178,0.637,0l2.844-2.841l2.844,2.841c0.178,0.178,0.459,0.178,0.637,0c0.178-0.176,0.178-0.461,0-0.637L10.824,10z"></path>
						</svg>
                    </div>
                    <div class="profile-container">
        <div class="profile-user-details">

          <div class="user-profile-img-details">
          <svg class="svg-icon" viewBox="0 0 20 20" style={{height:"40px",width:"40px",position:"relative",left:"50%"}}>
							<path d="M12.075,10.812c1.358-0.853,2.242-2.507,2.242-4.037c0-2.181-1.795-4.618-4.198-4.618S5.921,4.594,5.921,6.775c0,1.53,0.884,3.185,2.242,4.037c-3.222,0.865-5.6,3.807-5.6,7.298c0,0.23,0.189,0.42,0.42,0.42h14.273c0.23,0,0.42-0.189,0.42-0.42C17.676,14.619,15.297,11.677,12.075,10.812 M6.761,6.775c0-2.162,1.773-3.778,3.358-3.778s3.359,1.616,3.359,3.778c0,2.162-1.774,3.778-3.359,3.778S6.761,8.937,6.761,6.775 M3.415,17.69c0.218-3.51,3.142-6.297,6.704-6.297c3.562,0,6.486,2.787,6.705,6.297H3.415z"></path>
						</svg>
            <p>user</p>

          </div>

          <div class="slider-nav-menu">

            <a class="slider-nav-links" href="#">home</a>
            <a class="slider-nav-links"  onClick={this.clickedcart}  style={{cursor:"pointer"}} >cart</a>
            <a class="slider-nav-links"  onClick={this.clickeduser}  style={{cursor:"pointer"}} >profile</a>
            <a class="slider-nav-links" href="#">contact</a>
            <a class="slider-nav-links" href="#">suggest a product</a>


          </div>

        </div>

      </div>




                  </div>
                 


                  
                

                    <div class="menu-toggal" onClick={this.menutoggle}>
                       <div class="line line-1"></div>
                       <div class="line line-2"></div>
                       <div class="line line-3"></div>
                   </div>

                  
                     <div class="company-logo">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 5.9c1.16 0 2.1.94 2.1 2.1s-.94 2.1-2.1 2.1S9.9 9.16 9.9 8s.94-2.1 2.1-2.1m0 9c2.97 0 6.1 1.46 6.1 2.1v1.1H5.9V17c0-.64 3.13-2.1 6.1-2.1M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"/></svg>
                     </div>



                     <div  onClick={this.clickedcart}  style={{cursor:"pointer"}}  class="main-header-cart" >
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>								
                         <span class='badge badge-warning' id='lblCartCount'>{this.state.cartitems} </span>
                       
                     </div>


                
                     <div class="login-signup" id="login" onClick={this.togglelogin}>
                         <a href="#" >login</a>
                      </div>
                     <div class="logout" id="logout" onClick={this.logout}>
                         <a href="#" id="loginlogout">logout</a>
                     </div>
                                     

                 </div>  
                 <div class="top-header-container-2">
                 <div class="flipkart-navbar-search smallsearch col-sm-8 col-xs-12">
                <div class="row">
                    <input class="flipkart-navbar-input col-xs-10" onChange={this.onTextChanged}  type="text"  value={this.state.text} placeholder="Search for Products, Brands and more" />
                  
                    <Button component={ Link } variant="contained"  to={`/home/search/${this.state.text}`}  class="flipkart-navbar-button col-xs-2" onClick={()=>this.setState({text:""})}>
                        <svg  width="15px" height="15px">
                            <path d="M11.618 9.897l4.224 4.212c.092.09.1.23.02.312l-1.464 1.46c-.08.08-.222.072-.314-.02L9.868 11.66M6.486 10.9c-2.42 0-4.38-1.955-4.38-4.367 0-2.413 1.96-4.37 4.38-4.37s4.38 1.957 4.38 4.37c0 2.412-1.96 4.368-4.38 4.368m0-10.834C2.904.066 0 2.96 0 6.533 0 10.105 2.904 13 6.486 13s6.487-2.895 6.487-6.467c0-3.572-2.905-6.467-6.487-6.467 "></path>
                        </svg>                     
                    </Button>
                  
                  
                         <div className="searchbox">
                                     {this.renderSuggestion()}
                        </div>
                </div>
            </div>
                 </div>

              

            </div>

             
           




         

            <div class="header-container-bottom">
                <div class="container-bottom-header">

 
                    <div class="bottom-container-last">
                      <div class="bottom-container-inner">
                    
                     <a href="/home" class="home-btn-last bottom-icon-1">
                       
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
                      <span></span>
                
                     </a>
            
                      </div>
                    </div>            
                 
                 
                  
                    <div class="bottom-container-last">
                      <div class="bottom-container-inner">
                    
                     <a href="#" class="home-btn-last bottom-icon-1">
                       
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>								
                      <span></span>
                     
                     </a>
                    
                      </div>
                    </div>
                  
                  
                    <div class="bottom-container-last">
                      <div class="bottom-container-inner">
                        <a  onClick={this.clickedcart}  style={{cursor:"pointer"}} class="home-btn-last bottom-icon-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>								
                        </a>
                      </div>
                    </div>
                  
                  
                  
                    <div class="bottom-container-last">
                      <div class="bottom-container-inner">

                      <div class="popup-box-login" id="login-popup" style={{display: "none"}}>
                          <div class="popup-box-login-inside" style={{marginTop: "12px"}}>
                              <p style={{display: "inline-block", fontSize: "0.9rem", marginLeft: "20px "}}>log in to continue</p>
                              <button id="pop-up-a-login" onClick={this.togglelogin}>login</button>
                           </div>
                       </div>

                     <a onClick={this.clickeduser}  style={{cursor:"pointer"}} class="home-btn-last bottom-icon-1">
                     
                     <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="M9 8c1.66 0 2.99-1.34 2.99-3S10.66 2 9 2C7.34 2 6 3.34 6 5s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V16h14v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
                      <span></span>
                     
                     </a>
                    
                      </div>
                    </div>
                  
                  
                  
                  
                  
                   </div>
              </div>

  



        </div>

       </div>
                <Modal isOpen={this.state.islogin} toggle={this.togglelogin} > 
                    <ModalHeader toggle={this.togglelogin}>Login</ModalHeader>
                    <ModalBody>
                    <LocalForm onSubmit={(values) => this.loginsubmit(values)}>
                            <Row className="form-group ">
                                <Label htmlFor="username">Username</Label>
                                    <Control.text model=".username" id="username" name="username"
                                        placeholder="User Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(2), maxLength: maxLength(15)
                                        }}
                                         />
                                         <Errors
                                        className="text-danger"
                                        model=".username"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 1 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="password" >Password</Label>
                                    <Control.text model=".password" id="password" name="password"
                                        placeholder="Password"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                         <Errors
                                        className="text-danger"
                                        model=".password"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                            </Row>
                            <Row className="form-group">
                                    <button type="submit" class="btn btn-primary">
                                   Login
                                    </button>
                            </Row>
                        </LocalForm>
                      
                      
                         <hr/>
                         <button onClick={this.togglesignup} class="btn btn-success">Create New Account </button>
                    </ModalBody>
                </Modal>
                <Modal isOpen={this.state.issignup} toggle={this.togglesignup}>
                    <ModalHeader toggle={this.togglesignup}>SignUp</ModalHeader>
                    <ModalBody>

                    <LocalForm onSubmit={(values) => this.signupsubmit(values)}>
                    <Row className="form-group ">
                                <Label htmlFor="name">Name</Label>
                                    <Control.text model=".sname" id="sname" name="sname"
                                        placeholder=" Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(2), maxLength: maxLength(15)
                                        }}
                                         />
                                         <Errors
                                        className="text-danger"
                                        model=".sname"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 1 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                            </Row>
                            <Row className="form-group ">
                                <Label htmlFor="susername">Username</Label>
                                    <Control.text model=".susername" id="susername" name="susername"
                                        placeholder="User Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(2), maxLength: maxLength(15)
                                        }}
                                         />
                                         <Errors
                                        className="text-danger"
                                        model=".susername"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 1 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="spassword" >Password</Label>
                                    <Control.text model=".spassword" id="spassword" name="spassword"
                                        placeholder="Password"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                         <Errors
                                        className="text-danger"
                                        model=".spassword"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                            </Row>
                            <Row className="form-group">
                                    <Button type="submit" color="success">
                                   Create Account
                                    </Button>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default withRouter(Header);
