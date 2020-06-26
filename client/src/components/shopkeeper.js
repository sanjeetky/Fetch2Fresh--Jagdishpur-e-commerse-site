import React,{Component} from 'react';
import { Breadcrumb, BreadcrumbItem,
    Button, Row, Col, Label, Input } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);
class Shopkeeper extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);  
        this.deleteshopitem=this.deleteshopitem.bind(this);
        this.removeactiveitem=this.removeactiveitem.bind(this);
        this.updateactiveitem=this.updateactiveitem.bind(this);

        this.state={
            newitems:[],
            activeitems:[]
        }
    }
   
   
    componentDidMount( )
    {
      var vser={
          username:this.props.user.username
      }
        fetch('/shopitem/display',{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify(vser)
        })
        .then(res=>res.json())
        .then(data=>{this.setState({newitems:data})})
        .catch(err=>console.log(err));

        fetch('/shopping/activeitems',{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(vser)
          })
          .then(res=>res.json())
          .then(data=>{this.setState({activeitems:data})})
          .catch(err=>console.log(err));
    }
    
    handleSubmit(values) {
        console.log('Current State is: ' + JSON.stringify(values));
       if(this.props.user.username=='')
       alert("Please Login");
       else
       {
        var obj={
            name:values.name,
            brand: values.brand,
            cost: values.amount,
            weight: values.weight,
            quantity:values.quantity,
            shop:this.props.user.username
          }
          //console.log(obj);
        fetch('/shopitem',{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(obj)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            alert("Thank you for your item!!!")
            window.location.reload(false);
        })
        .catch(err=>console.log(err));
    }
    };
     
deleteshopitem(item)
{
     fetch('/shopitem',{
         method:"DELETE",
         headers:{"Content-Type":"application/json"},
         body:JSON.stringify(item)
     })
     .then(res=>res.json())
     .then(data=>{
        console.log(data);
        alert("Deleted successfully")
        window.location.reload(false);
    })
    .catch(err=>console.log(err));
}
//removing active items
removeactiveitem(item)
{
    fetch('/shopping/fruits',{
        method:"DELETE",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(item)
    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data);
        alert("Removed successfully!!!")
        window.location.reload(false);
    })
    .catch(err=>console.log(err));
}
//update active elements
updateactiveitem(values,item)
{
    var cost=values.cost;
    var quantity=values.quantity;
    var object={
        cost:cost,
        quantity:quantity,
        id:item._id
    }
       fetch('/shopping/fruits',{
           method:"PUT",
           headers:{"Content-Type":"application/json"},
           body:JSON.stringify(object)
       })
       .then(res=>res.json())
       .then(data=>{
        console.log(data);
        alert("updated successfully")
        window.location.reload(false);
    })
    .catch(err=>console.log(err));
}



    render() {
        var shopitem=this.state.newitems.map((item)=>{
            return(
                <div className="bill">
              
                    <div className="col-12">
                     <p>Name:{item.name}</p>
                     <p>Brand:{item.brand}</p>
                     <p>Cost:{item.cost}</p>
                     <p>Weight: {item.weight}</p>
                     <p>Quantity: {item.quantity}</p>
                     <p>Shop:{item.shop}</p>
                     <h3>Status:{item.status}</h3>
                     <h4>{item.message}</h4>
                     </div>
                     <div className="col-12">
                         <Button className="btn btn-danger" onClick={()=>this.deleteshopitem(item)}>Remove</Button>
                     </div>
                </div>
            )
        })
        //activeitems
        const Activeitem= this.state.activeitems.map((item)=>{
            return(
                <div className="row">
                    <div className="col-4">
                     <p>Name:{item.name}</p>
                     <p>Brand:{item.brand}</p>
                     <p>Cost:{item.cost}</p>
                     <p>Weight: {item.weight}</p>
                     <p>Quantity: {item.quantity}</p>
                     <p>Shop:{item.shop}</p>
                     <Button className="btn btn-danger" onClick={()=>{this.removeactiveitem(item)}}>Remove THis Item</Button>
                     </div>
                     <div className="col-8">
                     <LocalForm  onSubmit={(values) => this.updateactiveitem(values,item)}>
                            <Row className="form-group">
                                <Label htmlFor="quantity" md={2}> Quantity</Label>
                                <Col md={10}>
                                    <Control.text model=".quantity" id="quantity" name="quantity"
                                        placeholder=" Quantity"
                                        className="form-control"
                                        validators={{
                                            required
                                        }}
                                         />
                                         <Errors
                                        className="text-danger"
                                        model=".quantity"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                        }}
                                     />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="cost" md={2}> Cost</Label>
                                <Col md={10}>
                                    <Control.text model=".cost" id="cost" name="cost"
                                        placeholder=" Cost"
                                        className="form-control"
                                        validators={{
                                            required
                                        }}
                                         />
                                         <Errors
                                        className="text-danger"
                                        model=".cost"
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
                                    Update Item
                                    </Button>
                                </Col>
                            </Row>
                            </LocalForm>
                     </div>
                    </div>
               
            )
        })
        return(
            <div className="container">
                
                <div className="row row-content">
                   <div className="col-12">
                      <h3>Item Information</h3>
                      <hr/>
                   </div>
                    <div className="col-12 col-md-9">
                    <LocalForm  onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="name" md={2}> Name</Label>
                                <Col md={10}>
                                    <Control.text model=".name" id="name" name="name"
                                        placeholder=" Name"
                                        className="form-control"
                                        validators={{
                                            required
                                        }}
                                         />
                                         <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                        }}
                                     />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="brand" md={2}>Brand</Label>
                                <Col md={10}>
                                    <Control.text model=".brand" id="brand" name="brand"
                                        placeholder="brand"
                                        className="form-control"
                                        validators={{
                                            required
                                        }}
                                         />
                                         <Errors
                                        className="text-danger"
                                        model=".brand"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                        }}
                                     />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="amount" md={2}>Amount</Label>
                                <Col md={10}>
                                    <Control.text model=".amount" id="amount" name="amount"
                                        placeholder="Amount"
                                        className="form-control"
                                        validators={{
                                            required
                                        }}
                                         />
                                         <Errors
                                        className="text-danger"
                                        model=".amount"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                        }}
                                     />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="weight" md={2}>Weight</Label>
                                <Col md={10}>
                                    <Control.text model=".weight" id="weight" name="weight"
                                        placeholder="weight"
                                        className="form-control"
                                        validators={{
                                            required
                                        }}
                                         />
                                         <Errors
                                        className="text-danger"
                                        model=".weight"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                        }}
                                     />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="weight" md={2}>Available Quantity</Label>
                                <Col md={10}>
                                    <Control.text model=".quantity" id="quantity" name="quantity"
                                        placeholder="stock number"
                                        className="form-control"
                                        validators={{
                                            required
                                        }}
                                         />
                                         <Errors
                                        className="text-danger"
                                        model=".quantity"
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
                      <div>
                         <h2>Your Items</h2>
                         <hr/>
                         <div className="row">
                           <div className="col-mid-4">
                             {shopitem}
                             </div>
                         </div>
                      </div>
                      <div>
                         <h2>Your Active Items</h2>
                         <hr/>
                         <div className="col-12">
                          
                             {Activeitem}
                            
                         </div>
                      </div>
               </div>
              
        );
    }
}
   


export default Shopkeeper;

 