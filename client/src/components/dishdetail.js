import React,{Component} from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem ,Form,FormGroup,Button,Label, Input,ButtonDropdown,Col} from 'reactstrap';
import { Link } from 'react-router-dom';

class Dishdetail extends Component{
constructor(props){
    super(props);
    this.addtocart=this.addtocart.bind(this);
    this.Login=this.Login.bind(this);
}
componentDidMount(){
  this.props.cartitems();
}
Login(e)
{
  this.props.controllogin();
  e.preventDefault();
}
addtocart(Item)
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
           name:Item.name,
           img:Item.img,
           cost:Item.cost,
           itemid:Item.itemid,
           category:Item.category
       }

       fetch('/cart/search',{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({username:this.props.user.username,itemid:Item.itemid})
    })
    .then(res=>res.json())
    .then(data=>{
      if(data.length==0)
     {
      fetch('/cart',{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(item)
    })
    .then(res=>res.json())
    .then(data=>{
      console.log("dishdetail")
      alert("submitted sucessfully");
      this.props.cartitems();
    })
    .catch(err=>{
      console.log(err)
      console.log("error")
     });
     }
      else
      alert("already added");
    })
    .catch(err=>{  console.log("error")})
       

      
   }
}


render(){
 
 
  const items=this.props.item.map((item)=>{
  
    return(

      <div class="item-box-container">
         <Link to={`/home/${item.category}/${item.itemid}`} >
      <div class="item-img">
         <img src={item.img} alt=""/>
      </div>
      </Link>

      <div class="item-details">
        <div class="item-details-text">
         
         <h4 class="item-name-1">{item.name}</h4>
         <div class="item-price">
        <h4><span id="price-value">{item.cost}</span></h4>
       </div>
       <button class="add-to-cart-btn" onClick={()=>this.addtocart(item)}><i class="fa fa-cart-plus"></i>add</button>

      </div>
      </div>
      </div>


    )
  })
  if(this.props.item.length>0)
    {
    return (
     <div className="container">
         <div className="row">
              <Breadcrumb>
               <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
               <BreadcrumbItem active>{this.props.item[0].category}</BreadcrumbItem>
              </Breadcrumb>
            </div>
            <hr/>
            <div class="row ">
                 {items}
            </div>
                  
<div class="popup-box-login" id="login-popup" style={{display: "none"}}>

<div class="popup-box-login-inside" style={{marginTop: "12px"}}>


   <p style={{display: "inline-block", fontSize: "0.9rem", marginLeft: "20px "}}>log in to continue</p>
   <button id="pop-up-a-login" onClick={this.Login}>login</button>


</div>

</div>
            <hr/>
            <p style={{textAlign:"center"}}> --Thats all folks--</p>      
        </div>
        );
    }
    else
    {
        return <div>
          <p style={{textAlign:"center"}}> --Thats all folks--</p>
        </div>
    }
   
}
}
export default Dishdetail;

/*
	<figure class="card card-product ">
		<div class="img-wrap"><img /></div>
		<figcaption class="info-wrap">
    <Link to={`/home/${item.category}/${item.itemid}`} >
				<h4 class="title">{item.name}</h4>
        </Link>
				<p class="desc">{item.brand}</p>
      
				<div class="rating-wrap">
					<div class="label-rating">Quantitiy:{item.quantity}</div>
				</div>
		</figcaption>
		<div class="bottom-wrap">
			<a href="" class="btn btn-sm btn-primary float-right" onClick={()=>this.addtocart(item)}>Add to Cart</a>	
			<div class="price-wrap h5">
				<span class="price-new">{item.amount}</span> <del class="price-old">{+item.amount+ 10}</del>
			</div> 
		</div> 
	</figure>


*/