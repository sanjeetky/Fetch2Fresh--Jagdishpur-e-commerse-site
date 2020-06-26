import React,{Component} from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,Breadcrumb, BreadcrumbItem ,
    CardTitle ,Button} from 'reactstrap';
    import { Link, Redirect } from 'react-router-dom';

class Cart extends Component{
    constructor(props){
        super(props);
        this.remove=this.remove.bind(this);
        this.minus=this.minus.bind(this);
        this.plus=this.plus.bind(this);
        //this.total=this.total.bind(this);
        this.state={
            fruits:[],
            tamount:20
        }
    }
    componentDidMount()
    {
        let item={
            username:this.props.user.username
        }
        fetch('/cart/display',{
            method:'POST',
            headers:{ 'Content-Type':'application/json'},
            body:JSON.stringify(item)
        })
        .then((res)=>res.json())
        .then((data)=>
        {
            this.setState({fruits:data})
            console.log(data);

        })
        .catch((err)=>console.log(err));
       
    }
minus(item)
{
   if(item.quantity>1)
   {
    const elementsIndex = this.state.fruits.findIndex(element => element.itemid == item.itemid )
    let newArray = [...this.state.fruits]
        newArray[elementsIndex] = {...newArray[elementsIndex], quantity: +newArray[elementsIndex].quantity -1 }
        this.setState({
            fruits: newArray,
            });
    }
};
plus(item)
{
    
    const elementIndex = this.state.fruits.findIndex(element => element.itemid == item.itemid )
    let newArrayy = [...this.state.fruits]
        newArrayy[elementIndex] = {...newArrayy[elementIndex], quantity:  + newArrayy[elementIndex].quantity  +1 }
        this.setState({
            fruits: newArrayy,
            });
        }
    remove=param=>e=>{
        const Item={
            username:this.props.user.username,
            password:this.props.user.password,
            itemid:param
        }
         fetch('/cart',{
             method:"DELETE",
             headers:{"Content-Type":"application/json"},
             body:JSON.stringify(Item)
         })
        .then(res=>res.json())
        .then(data=>{
          console.log(data);
          let item={
            username:this.props.user.username,
            password:this.props.user.password
        }
        fetch('/cart/display',{
            method:'POST',
            headers:{ 'Content-Type':'application/json'},
            body:JSON.stringify(item)
        })
        .then((res)=>res.json())
        .then((data)=>
        {
            this.setState({fruits:data})
            console.log(data);
        })
        .catch((err)=>console.log(err));
           console.log(this.state.fruits);
        })
        .catch(err=>console.log(err));
    }
    /*
                <Card  >
                   <Link to={`/home/${item.category}/${item.itemid}`} >
                    <CardImg width="100%" src={item.itemimg} alt={item.itemname}/>
                    <CardImgOverlay>
                    <CardTitle>{item.itemname}</CardTitle>
                    </CardImgOverlay>
                    </Link>
                    <CardBody>
                        <CardText>Quantity:{item.quantity}</CardText>
                    </CardBody>
                   
                </Card>

    */
    render()
    {

       /* const amount=this.state.fruits.map((item)=>{
            this.setState({tamount:this.state.tamount+ +(item.itemcost* item.quantity)})
        })*/
       
            const fruits=this.state.fruits.map((item)=>{
                return (
                 <div className="col-12">
                     <div className="row">
                        <div className="col-md-3">
                          <img  style={{height:"150px"}} src={item.img}  />
                        </div>
                        <div className="col-md-9">
                         
                               <h5>{item.name}</h5>
                               <p>{item.category}</p>
                             <p> Cost:Rs {item.cost}</p>
                        </div>
                        </div>
                    
                     <div className="row">
                     <div className="col-md-3">
                           <button id="item-minus" onClick={()=>this.minus(item)} > <i class="fa fa-minus"></i></button>
                           <button id="product-count">{item.quantity}</button>
                           <button id="item-plus" onClick={()=>this.plus(item)}> <i class="fa fa-plus"></i></button>
                       </div>
                       <div className="col-md-3">
                       <Button onClick={this.remove(item.itemid)} className="col-12 ">Remove Item</Button>
                       </div>
                      

                     </div>
                     <hr/>
                 </div>
                       );
                   })
                   
              if(this.state.fruits.length==0)
              {
                  return <div><Link   to={'/home'}>
                  <Button  style={{margin:"3px"}} color={"success"}  > Continue Shopping   </Button>
                  </Link></div>

                 
              }
              else
              {
                   return (
                       <div className="container">
                           <h1> Items</h1>
                            <hr/>
                            <div className=" row col-12">
                               <div  className=" row  align-item-start col-mid-9 col-sm-12" >  
                                {fruits}
                               </div>
                               <div className="col-mid-3 col-sm-12  bill">
                                   <h3>PRICE DETAILS</h3>
                                   <hr/>
                                   <div className="row">
                                      <div className="col-8">
                                        <h6>Price</h6>
                                      </div>
                                      <div className="col-4">
                                      <p>{this.state.fruits.reduce((total,item)=>{
                                          return total+ (item.cost*item.quantity)
                                      },0)}</p>
                                      </div>
                                   </div>
                                   <div className="row">
                                      <div className="col-8">
                                        <h6>Delivery Fee</h6>
                                      </div>
                                      <div className="col-4">
                                        <p > <span class="fa fa-rupee-sign"/>0</p>
                                      </div>
                                   </div>
                                   <hr/>
                                   <div className="row">
                                      <div className="col-8">
                                        <h6>Total Amount</h6>
                                      </div>
                                      <div className="col-4">
                                      <p>{this.state.fruits.reduce((total,item)=>{
                                          return total+ (item.cost*item.quantity)
                                      },0)}</p>
                                      </div>
                                   </div>
                               </div>
                           </div>
                           <hr/>
                           <div className="row col-12">
                             <div className="col-4">
                               <Link   to={'/verify'}>
                               <Button className="col-12" color={"primary"}>Buy </Button>
                                </Link>
                              </div>
                              <div className="col-4">
                               <Link   to={'/home'}>
                               <Button className="col-12"  color={"success"}  > Continue Shopping   </Button>
                               </Link>
                              </div>
                           </div>
                       </div>
                   );
                   }
    }
}
export default Cart;