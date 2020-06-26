import React,{Component} from 'react';
import { Breadcrumb, BreadcrumbItem,
    Button, Row, Col, Label } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));

class Billing extends Component {
    constructor(props) {
        super(props);

        this.state = {
            order:[]
        };

        this.handleSubmit = this.handleSubmit.bind(this);  
        this.alertkaro=this.alertkaro.bind(this);
    }
    alertkaro()
    {
        document.getElementById('alert-box').style.display="block"
        setTimeout(() => { 
            document.querySelector('.alert-box').style.display="none" 
        }, 1500);
    }

    handleSubmit(values) {
       
        
        var User={
            username:this.props.user.username
        }
        fetch('/cart/display',{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(User)
        })
        .then(res=>res.json())
        .then(data=>{
           this.setState({order:data})
          // alert('Current State is: ' + JSON.stringify(values));
         
          var obj={
            fullname:values.fullname,
            pincode: values.pincode,
            telnum: values.telnum,
            landmark: values.landmark,
            village:values.village,
            houseno:values.houseno,
            city:values.city,
            order:data,
            username:this.props.user.username
          }
         
        fetch('/delivery',{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(obj)
        })
        .then(res=>res.json())
        .then(data=>{
           // alert("order placed:will be delivered as soon as possible")
            this.alertkaro();
        })
        .catch(err=>console.log(err));
        fetch('/message',{
            method:"POST",
            headers:{'Content-Type':"application/json"},
            body:JSON.stringify(obj)
        })
        .then(res=>res.json())
        .then(data=>console.log(data))
        .catch(err=>console.log(err));
       // alert("submitted successfully");
       window.location.reload(false);
        })

        .catch(err=>console.log(err));
    };

    render() {
        return(
            <div className="container">
                <div className="row row-content">
                   <div className="col-12">
                      <h3>Delivery Address</h3>
                      <hr/>
                   </div>
                    <div className="col-12 col-md-9">
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="fullname">First Name</Label>
                                
                                    <Control.text model=".fullname" id="fullname" name="fullname"
                                        placeholder="Full Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(2), maxLength: maxLength(15)
                                        }}
                                        />
                                        <Errors
                                        className="text-danger"
                                        model=".fullname"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 1 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                               </Row>
                            
                            <Row className="form-group">
                            <Label htmlFor="telnum" >Contact Tel.</Label>
                                
                                    <Control.text model=".telnum" id="telnum" name="telnum"
                                        placeholder="Tel. number"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(10), maxLength: maxLength(10), isNumber
                                        }}
                                        />
                                  <Errors
                                        className="text-danger"
                                        model=".telnum"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be equal to 10 numbers',
                                            maxLength: 'Must be 10 numbers ',
                                            isNumber: 'Must be a number'
                                        }}
                                     />
                               </Row>
                               <Row className="form-group">
                                <Label htmlFor="landmark" >Town/City:  </Label>
                                    <Control.select model=".city" id="city" name="city"
                                        placeholder="city"
                                        className="form-control"  
                                        >  <option value="Arrah">Arrah</option>
                                        </Control.select>
                           </Row>
                            <Row className="form-group">
                                <Label htmlFor="pincode">Pincode</Label>
                                    <Control.select model=".pincode" id="pincode" name="pincode"
                                        placeholder="Pincode"
                                        className="form-control">
                                             <option value="802301">802301</option>
                                             <option value="802302">802302</option>
                                            </Control.select>  
                                                   
                          </Row>
                          <Row className="form-group">
                                <Label htmlFor="village" >Area, Colony, Street, Sector, Village:  </Label>
                                    < Control.text model=".village" id="village" name="village"
                                        placeholder=""
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(2), maxLength: maxLength(20)
                                        }}
                                        />
                                            <Errors
                                        className="text-danger"
                                        model=".village"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 1 characters',
                                            maxLength: 'Must be 20 characters or less'
                                        }}
                                     />
                           </Row>
                            <Row className="form-group">
                                <Label htmlFor="houseno">Flat, House no., Building, Company, Apartment:s</Label>
                                    <Control.text model=".houseno" id="houseno" name="houseno"
                                         className="form-control"
                                         validators={{
                                            required, minLength: minLength(2), maxLength: maxLength(20) 
                                        }}
                                        />
                                         <Errors
                                        className="text-danger"
                                        model=".houseno"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 1 characters',
                                            maxLength: 'Must be 20 characters or less'
                                        }}
                                     />

                          </Row>

                           
                           
                            <Row className="form-group">
                                <Label htmlFor="landmark" >Landmark e.g. near apollo hospital:   </Label>
                                    <Control.text model=".landmark" id="landmark" name="landmark"
                                        placeholder=""
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(2), maxLength: maxLength(20)
                                        }}
                                       />
                                           <Errors
                                        className="text-danger"
                                        model=".landmark"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 1 characters',
                                            maxLength: 'Must be 20 characters or less'
                                        }}
                                     />
                          </Row>
                           
                            
                            
                            <Row className="form-group">
                               
                                    <Button type="submit" color="primary">
                                        Deliver to this address
                                    </Button>
                             
                                    </Row>
                        </LocalForm>
                    </div>
               </div>
                           
<div class="alert-box" id="alert-box" style={{display: "none"}}>

<div class="pop-inside-alt">


<h2>successful</h2>

<i  id="correct-pop-box" className="fa fa-check fa-lg"></i>


<button id="pop-close-btn">close</button>


</div>
</div>
               </div>
        );
    }
}
   


export default Billing;
