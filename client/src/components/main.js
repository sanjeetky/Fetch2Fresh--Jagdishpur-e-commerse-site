import React, { Component } from 'react';
import Header from './header.js';
import Footer from './footer.js';
import Home from './home';
import Contact from './contact'
import DishDetail from './dishdetail.js'
import Cart from './mycart.js'
import Specificdish from './spdish.js'
import Itemsearchpage from './itemsearchpage';
import Billing from './billing.js';
import Admin from './admin.js';
import Shopkeeper from './shopkeeper.js';
import Verify from './verify.js';
import Activeuser from './activeuser.js';
import { Switch, Route, Redirect } from 'react-router-dom';
import Deliveryperson from './deliveryperson.js';
import { Circular } from 'styled-loaders-react';

class Main extends Component {

    constructor(props){
        super(props);
        this.state={
          fruits:[],
          loading:true,
          user:{
            username:" ",
            password:" "
             },
             flag:"user"
      } 
      this.controllogin=this.controllogin.bind(this);
      this.cartitems=this.cartitems.bind(this);
    }

    controllogin(e)
    {
      this.child.togglelogin();
    }
    
     cartitems()
      {
        if(this.state.loading==false)
        {
        this.child.itemsnum(); 
        }
      }
    componentDidMount(){ 
     this.cartitems()
      fetch('/shopping/fruits')
      .then(res=>res.json())
      .then(items=>{ 
        this.setState({loading:false})
        this.setState({fruits:items}) 
      }); 
      fetch('/users/session')
      .then(res=>res.json())
      .then(data=>{
        
      if(data.username==null)
      {
        this.setState(prev=>({
          user:{
            ...prev.user,
            username:" ",
            password:" "
          }
        }))
      }
      else{
         this.setState(prev=>({
           user:{
             ...prev.user,
             username:data.username,
             password:data.password
           }
         }))
         
      }
      console.log(this.state.user.username);
      })
      .then((abc)=>{
    
      fetch('/users',{
        method:"POST",
        headers:{'Content-Type':"application/json"},
        body:JSON.stringify({username:this.state.user.username})
    })
    .then(res=>res.json())
    .then(data=>{
      this.setState({flag:data[0].admin})
    })
    .catch(err=>console.log(err))
  })
      
    }
      
    render() {
        const HomePage = () => {
            return(
                <Home  />
            );
          };
         
          const contactpage = () => {
            return(
                <Contact user={this.state.user} />
            );
          }
          const billing= () => {
            return(
                <Billing user={this.state.user} />
            );
          }
          const DishWithcat = ({match}) => {
            return(
                <DishDetail cartitems={()=>this.cartitems()} controllogin={()=>this.controllogin()} item={this.state.fruits.filter((dish) => dish.category ==match.params.category)} user={this.state.user} />);
          }
          const DishWithId = ({match}) => {
            return(
                <Specificdish cartitems={()=>this.cartitems()} controllogin={()=>this.controllogin()} item={this.state.fruits.filter((dish) => dish.itemid ==match.params.itemid)[0]} user={this.state.user} />
            );
          }
          const cart = () => {
            return(
              <Cart cartitems={()=>this.cartitems()}  user={this.state.user} />
            );
          };
          const shopkeeper = () => {
            if(this.state.flag=='shopkeeper')
            {
                return(
                 <Shopkeeper user={this.state.user} />
                )
            }
            else
            {
              return(
              <Home/>
              )
            }
          };
          const admin = () => {
            if(this.state.flag=='admin')
            {
            return(
             <Admin  user={this.state.user}/>
            )
            }
            else{
              return(
              <Home/>
              )
            }
      };
         const verify=()=>{
           return (
             <Verify/>
           )
         }
              
          const Itemsearch=({match})=>{
            return (
             < Itemsearchpage  cartitems={()=>this.cartitems()} controllogin={()=>this.controllogin()} item={this.state.fruits.filter((dish)=>dish.name==match.params.name)} user={this.state.user}/>
            )
          }

          const activeuser=()=>{
            return (
              <Activeuser user={ this.state.user}/>
            )
            
          }
          const deliveryperson=()=>{
            if(this.state.flag=='deliveryperson')
            {
            return (
              <Deliveryperson user={ this.state.user}/>
            )
            }
            else{
              return (
                <Home/>
              )
            }
          }
        return (
         
          <div>
          { this.state.loading ?
              <Circular color="red" size="60px"  duration="2s" />
              :
         
            <div>

                 <Header onRef={ref => (this.child = ref)} />
                 <Switch>
                   <Route exact path='/home' component={HomePage} />
                   <Route exact path='/contactus' component={contactpage} />
                   <Route exact path='/billing' component={billing} />
                   <Route exact path='/shopkeeper' component={shopkeeper} />
                   <Route exact path='/admin' component={admin} />
                   <Route exact path='/verify' component={verify} />
                   <Route exact path='/activeuser' component={activeuser} />
                   <Route exact path='/deliveryperson' component={deliveryperson} />
                   <Route exact path='/home/search/:name' component={Itemsearch} />
                   <Route exact path='/home/:category' component={DishWithcat} />
                   <Route exact path='/home/:category/:itemid' component={DishWithId} />
                   <Route path ='/cart' component={cart} />
                   <Redirect to="/home" />
                   </Switch>
                 <Footer/>
            </div>
    }
    </div>
        );
    }
}
export default Main;