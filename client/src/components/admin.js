import React,{Component} from 'react';
import { Breadcrumb, BreadcrumbItem,
    Button, Row, Col, Label } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);
class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newitems:[],
            activeorders:[],
            pastorders:[],
            cancelledorders:[],
          
           
        };
        this.handleSubmit = this.handleSubmit.bind(this);  
        this.Messages=this.Messages.bind(this);
      
       // this.deleteshopitem=this.deleteshopitem.bind(this);
    }


   Messages(values,item)
   {
    
        var message=values.message;
        var status=values.status;
        var object={
            message:message,
            status:status,
            id:item._id
        }
        console.log(object);
           fetch('/shopitem',{
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
    
    handleSubmit(values,item) {
        var obj={
            name:item.name,
            brand:item.brand,
            cost:item.cost,
            weight:item.weight,
            quantity:item.quantity,
            shop:item.shop,
            description:values.description,
            img: values.image,
            itemid: values.itemid,
            category: values.category,
        }
        fetch('/shopping/dalo',{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(obj)
        })
        .then(res=>res.json())
        .then(data=>{
            window.location.reload(false);
            alert("Added successfully")
            console.log(data);
        })
        .catch(err=>{
            console.log(err);
        });
    };
     

componentDidMount()
{

    fetch('/shopitem')
    .then(res=>res.json())
    .then(data=>{
    // alert(JSON.stringify(data));

        this.setState({newitems:data})
    } )
    .catch(err=>console.log(err))
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

    render() {
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
        const items=this.state.newitems.map((item)=>{
            return(
                <div className="bill row" >
                    <div className="col-3">
                     <p>Name:{item.name}</p>
                     <p>Brand:{item.brand}</p>
                     <p>Cost:{item.cost}</p>
                     <p>Weight: {item.weight}</p>
                     <p>Quantity: {item.quantity}</p>
                     <p>Shop:{item.shop}</p>
                     <p>Status:{item.status}</p>
                     </div>
                     <div className="col-9">
                     <div className="container">
                     <div className="row row-content">
                     <div className="col-12">
                      <h3>Item Information</h3>
                      <hr/>
                   </div>
                    <div className="col-12 col-md-9">
                    <LocalForm  onSubmit={(values)=> this.handleSubmit(values,item)}>
                            <Row className="form-group">
                                <Label htmlFor="itemid" md={2}> Itemid</Label>
                                <Col md={10}>
                                    <Control.text model=".itemid" id="itemid" name="itemid"
                                        placeholder=" Itemid"
                                        className="form-control"
                                        validators={{
                                            required
                                        }}
                                         />
                                         <Errors
                                        className="text-danger"
                                        model=".itemid"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                        }}
                                     />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="brand" md={2}>Description</Label>
                                <Col md={10}>
                                    <Control.text model=".description" id="description" name="description"
                                        placeholder="description"
                                        className="form-control"
                                        validators={{
                                            required
                                        }}
                                         />
                                         <Errors
                                        className="text-danger"
                                        model=".description"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                        }}
                                     />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="category" md={2}>Category</Label>
                                <Col md={10}>
                                    <Control.text model=".category" id="category" name="category"
                                        placeholder="Category"
                                        className="form-control"
                                        validators={{
                                            required
                                        }}
                                         />
                                         <Errors
                                        className="text-danger"
                                        model=".category"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                        }}
                                     />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="weight" md={2}>Image</Label>
                                <Col md={10}>
                                    <Control.text model=".image" id="image" name="image"
                                        placeholder="image"
                                        className="form-control"
                                        validators={{
                                            required
                                        }}
                                         />
                                         <Errors
                                        className="text-danger"
                                        model=".image"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                        }}
                                     />
                                </Col>
                            </Row>
                            
                           
                            <Row className="form-group">
                                <Col md={{size:10, offset: 2}}>
                                    <Button type="submit" color="primary">
                                    Submit Item
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </div>
                    </div>
                    <h3>Message</h3>
                    <hr/>
                    <div className="col-12 col-md-9">
                    <LocalForm  onSubmit={(values)=> this.Messages(values,item)}>
                            <Row className="form-group">
                                <Label htmlFor="messsage" md={2}> message</Label>
                                <Col md={10}>
                                    <Control.text model=".message" id="message" name="message"
                                        placeholder="message"
                                        className="form-control"
                                        validators={{
                                            required
                                        }}
                                         />
                                         <Errors
                                        className="text-danger"
                                        model=".message"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                        }}
                                     />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="brand" md={2}>Status</Label>
                                <Col md={10}>
                                    <Control.text model=".status" id="status" name="status"
                                        placeholder="status"
                                        className="form-control"
                                        validators={{
                                            required
                                        }}
                                         />
                                         <Errors
                                        className="text-danger"
                                        model=".status"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                        }}
                                     />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10, offset: 2}}>
                                    <Button type="submit" color="success">
                                    Submit Message
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </div>
               
               </div>
              </div>
             </div>
            )
        })
       
        return(
            <div className="col-12">
                <h2>Items</h2>
                <hr/>
                {items}
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
                    <div className="cancelled-orders">
                      {cancelledorders}
                    </div>
              </div>
        );
    }

}
   


export default Admin;

 /*



 */