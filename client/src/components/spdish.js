import React,{Component} from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem ,Form,FormGroup,Button,Label, Input,ButtonDropdown,Col} from 'reactstrap';
import { Link } from 'react-router-dom';
import Select from 'react-select';
class Specificdish extends Component{
constructor(props){
    super(props);
    this.addtocart=this.addtocart.bind(this);
    this.Login=this.Login.bind(this);
}
Login(e)
{
  this.props.controllogin();
  e.preventDefault();
}
addtocart(event)
{
   if(this.props.user.username==" ")
   {
    document.getElementById('login-popup').style.display="block";
    setTimeout(()=>{

      let y=document.getElementsByClassName('popup-box-login');
      document.getElementById('login-popup').style.display="none";
     },2000)
   }
   else{
      
       var item={
           username:this.props.user.username,
           name:this.props.item.name,
           img:this.props.item.img,
           cost:this.props.item.cost,
           itemid:this.props.item.itemid,
           category:this.props.item.category
       }
       fetch('/cart',{
           method:"POST",
           headers:{"Content-Type":"application/json"},
           body:JSON.stringify(item)
       })
       .then(res=>res.json())
       .then(data=>{
        console.log("dishdetail")
        alert("submitted sucessfully");
      })
       .catch(err=>console.log(err));
   }
   event.preventDefault();
}

render(){
  if(this.props.item!=null)
    {
      console.log("lelo")
      console.log(this.props.item)
    return (
     <div className="container" style={{marginBottom:"10px"}}>
         <div className="row">
              <Breadcrumb>
               <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
               <BreadcrumbItem><Link to={`/home/${this.props.item.category}`}>{this.props.item.category}</Link></BreadcrumbItem>
               <BreadcrumbItem active>{this.props.item.name}</BreadcrumbItem>
              </Breadcrumb>
            </div>
                      
             <div className="row">
              <div className="col-12 col-md-4 m-1">
                <Card>
                    <CardImg  style={{height:"300px"}} top src={this.props.item.img} alt= {this.props.item.name} />
                    <CardBody>
                    </CardBody>
                </Card>
               
              </div>
              <div className="col-12 col-md-6 m-1">
              <div className="col-12">
                <h3>{this.props.item.name}</h3>
                 <hr />
              </div> 
              <div>
                   <p>{this.props.item.description}</p>
                </div>  
                <div>
                  <h6>Sold By:{this.props.item.shop}</h6>
                </div>
                <hr />
                <div class="popup-box-login" id="login-popup" style={{display: "none"}}>
                          <div class="popup-box-login-inside" style={{marginTop: "12px"}}>
                              <p style={{display: "inline-block", fontSize: "0.9rem", marginLeft: "20px "}}>log in to continue</p>
                              <Button id="pop-up-a-login" onClick={this.Login} >login</Button>
                           </div>
                       </div>
                <div class="bottom-wrap">
			             <a href="" class="btn btn-sm btn-primary " onClick={this.addtocart}>Add to Cart</a>	
             </div>
              </div>
           </div>  
        </div>
        );
    }
    else
   {
        return <div></div>
   }
}
}

export default Specificdish;