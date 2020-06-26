import React,{Component} from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem ,Form,FormGroup,Button,Label, Input,ButtonDropdown,Col} from 'reactstrap';
    var temp=null;
class Activeuser extends Component{
constructor(props){
    super(props);
    this.cancelit=this.cancelit.bind(this);
    this.state={
       activeorders:[],
       pastorders:[],
       cancelledorders:[]
    }
}
componentDidMount()
    {
        let item={
            username:this.props.user.username,
            status:'Inprogress'
        }
        fetch('/delivery/display',{
            method:'POST',
            headers:{ 'Content-Type':'application/json'},
            body:JSON.stringify(item)
        })
        .then((res)=>res.json())
        .then((data)=>
        {
            this.setState({activeorders:data})
        })
        .catch((err)=>console.log(err));

        let Item={
            username:this.props.user.username,
            status:'completed'
        }
        fetch('/delivery/display',{
            method:'POST',
            headers:{ 'Content-Type':'application/json'},
            body:JSON.stringify(Item)
        })
        .then((res)=>res.json())
        .then((data)=>
        {
            this.setState({pastorders:data})
        })
        .catch((err)=>console.log(err));  
        
        let Iitem={
            username:this.props.user.username,
            status:'cancelled'
        }
        fetch('/delivery/display',{
            method:'POST',
            headers:{ 'Content-Type':'application/json'},
            body:JSON.stringify(Iitem)
        })
        .then((res)=>res.json())
        .then((data)=>
        {
            this.setState({cancelledorders:data})
        })
        .catch((err)=>console.log(err));  
    }
    cancelit(item)
    {
        var status="cancelled";
        var object={
            status:status,
            id:item._id
        }
        console.log(object);
           fetch('/delivery',{
               method:"PUT",
               headers:{"Content-Type":"application/json"},
               body:JSON.stringify(object)
           })
           .then(res=>res.json())
           .then(data=>{
               console.log(data)
               alert("submitted successfully");
               window.location.reload(false);
            })
           .catch(err=>{
               console.log(err)
            });
    }
render()
{
    const activeorders=this.state.activeorders.map((item)=>{
        return(
            <div className="row" style={{border:"2px solid black"}}>
           {item.order.map((hello)=>{
            return(
        <div class="item-box-container">
        <div class="item-img">
           <img src={hello.img} alt=""/>
        </div>
        <div class="item-details">
          <div class="item-details-text">
           <h4 class="item-brand-1">{hello.name}</h4>
           <h5 class="item-name-1">Quantity:{hello.quantity}</h5>
           <div class="item-price">
          <h4>Cost:<span id="price-value">{hello.cost}</span></h4>
         </div>
        </div>
        </div>
        </div>
            )
       })}
      
       <div className="col-12">
    <h2 style={{textAlign:"center"}}>Date:  {item.updatedAt[0]+item.updatedAt[1]+item.updatedAt[2]+item.updatedAt[3]+item.updatedAt[4]+item.updatedAt[5]+item.updatedAt[6]+item.updatedAt[7]+item.updatedAt[8]+item.updatedAt[9]}</h2>
       </div>
       <div className="col-12">
           <button className="btn btn-danger" onClick={()=>this.cancelit(item)} style={{width:"100%",height:"30px"}}>Cancel</button>
       </div>
       </div>
        )
    });

    const pastorders=this.state.pastorders.map((item)=>{
        return(
            <div className="row" style={{border:"2px solid black"}}>
           {item.order.map((hello)=>{
            return(
        <div class="item-box-container">
        <div class="item-img">
           <img src={hello.img} alt=""/>
        </div>
        <div class="item-details">
          <div class="item-details-text">
           <h4 class="item-brand-1">{hello.name}</h4>
           <h5 class="item-name-1">Quantity:{hello.quantity}</h5>
           <div class="item-price">
          <h4>Cost:<span id="price-value">{hello.cost}</span></h4>
         </div>
        </div>
        </div>
        </div>
            )
       })}
        <div className="col-12">
    <h2 style={{textAlign:"center"}}>Date:  {item.updatedAt[0]+item.updatedAt[1]+item.updatedAt[2]+item.updatedAt[3]+item.updatedAt[4]+item.updatedAt[5]+item.updatedAt[6]+item.updatedAt[7]+item.updatedAt[8]+item.updatedAt[9]}</h2>
       </div>
       </div> )
    });

    const cancelledorders=this.state.cancelledorders.map((item)=>{
        return(
            <div className="row" style={{border:"2px solid black"}}>
           {item.order.map((hello)=>{
            return(
        <div class="item-box-container">
        <div class="item-img">
           <img src={hello.img} alt=""/>
        </div>
        <div class="item-details">
          <div class="item-details-text">
           <h4 class="item-brand-1">{hello.name}</h4>
           <h5 class="item-name-1">Quantity:{hello.quantity}</h5>
           <div class="item-price">
          <h4>Cost:<span id="price-value">{hello.cost}</span></h4>
         </div>
        </div>
        </div>
        </div>
            )
       })}
        <div className="col-12">
    <h2 style={{textAlign:"center"}}>Date:  {item.updatedAt[0]+item.updatedAt[1]+item.updatedAt[2]+item.updatedAt[3]+item.updatedAt[4]+item.updatedAt[5]+item.updatedAt[6]+item.updatedAt[7]+item.updatedAt[8]+item.updatedAt[9]}</h2>
       </div>
       </div>
        )
    });
    return(
      
               <div class="activeuser-page container" >

                  <img  src="assets/icon/user.png" alt=""/>
                    <h3>Welcome {this.props.user.username}</h3>
                   
                    <h3 style={{margin:'0px'}}>Active Orders</h3>
                    <hr/>
                        <div  >
                            {activeorders}
                        </div>
                        <h3 style={{margin:'0px'}}>Successfully Delivered</h3>
                    <hr/>
                    <div className="past-orders">
                      {pastorders}
                    </div>
                    <h3 style={{margin:'0px'}}>Cancelled Orders</h3>
                    <hr/>
                    <div className="cancelled-orders" >
                      {cancelledorders}
                    </div>

           </div>
      
    )
}

}
export default Activeuser;