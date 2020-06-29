import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron,
    Button, Modal, ModalHeader, ModalBody,
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
                      <img src="assets/icon/menuout.png" alt="x" style={{color: "#fff", width:"40px",height:"40px"}}/>
                    </div>
                    <div class="profile-container">
        <div class="profile-user-details">

          <div class="user-profile-img-details">
            <img src="assets/icon/user.png" alt=""/>
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
                         <img src="assets/icon/user.png" alt=""/>
                     </div>



                     <div  onClick={this.clickedcart}  style={{cursor:"pointer"}}  class="main-header-cart" >
                         <img src="assets/icon/cart.png" alt=""/>
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
                    <button class="flipkart-navbar-button col-xs-2" onClick={()=>this.setState({text:""})}>
                        <Link to={`/home/search/${this.state.text}`}>
                        <svg width="15px" height="15px">
                            <path d="M11.618 9.897l4.224 4.212c.092.09.1.23.02.312l-1.464 1.46c-.08.08-.222.072-.314-.02L9.868 11.66M6.486 10.9c-2.42 0-4.38-1.955-4.38-4.367 0-2.413 1.96-4.37 4.38-4.37s4.38 1.957 4.38 4.37c0 2.412-1.96 4.368-4.38 4.368m0-10.834C2.904.066 0 2.96 0 6.533 0 10.105 2.904 13 6.486 13s6.487-2.895 6.487-6.467c0-3.572-2.905-6.467-6.487-6.467 "></path>
                        </svg>
                        </Link>
                    </button>
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
                       
                     <img src="assets/icon/home.png" alt=""/>
                      <span></span>
                
                     </a>
            
                      </div>
                    </div>            
                 
                 
                  
                    <div class="bottom-container-last">
                      <div class="bottom-container-inner">
                    
                     <a href="#" class="home-btn-last bottom-icon-1">
                       
                     <img src="assets/icon/search.png" alt=""/>
                      <span></span>
                     
                     </a>
                    
                      </div>
                    </div>
                  
                  
                    <div class="bottom-container-last">
                      <div class="bottom-container-inner">
                        <a  onClick={this.clickedcart}  style={{cursor:"pointer"}} class="home-btn-last bottom-icon-1">
                        <img src="assets/icon/cart.png" alt=""/>
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
                     
                     <img src="assets/icon/user.png" alt=""/>
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
                                    <Button type="submit" color="primary">
                                   Login
                                    </Button>
                            </Row>
                        </LocalForm>
                      
                      
                         <hr/>
                         <Button onClick={this.togglesignup} color="success">Create New Account </Button>
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
