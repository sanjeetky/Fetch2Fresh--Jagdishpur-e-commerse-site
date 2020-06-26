import React,{Component} from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,Breadcrumb, BreadcrumbItem ,
    CardTitle } from 'reactstrap';
    import { Link } from 'react-router-dom';
    import { Slide } from 'react-slideshow-image';
class Home extends Component {

    constructor(props){
        super(props);
       
    }

    render() {

        const slideImages = [
            
            'https://s3.ap-south-1.amazonaws.com/chazes3/35529ff9-eb98-40fe-8afe-49d689e970bc.jpg',
            'https://s3.ap-south-1.amazonaws.com/chazes3/46b4f710-15e2-47c3-8699-ec2689223be2.jpg'
          ];
          const properties = {
              
            duration: 5000,
            transitionDuration: 500,
            infinite: true,
           // indicators: true,
            arrows: true,
            pauseOnHover: true,
            /*onChange: (oldIndex, newIndex) => {
              console.log(`slide transition from ${oldIndex} to ${newIndex}`);
            }*/
          }
          const Slideshow = () => {
            return (
              <div className="slide-container" >
                <Slide {...properties}>
                  <div className="each-slide">
                    <div style={{'backgroundImage': `url(${slideImages[0]})`,height:"150px",width:"100%", backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
                    </div>
                  </div>
                  <div className="each-slide">
                    <div style={{'backgroundImage': `url(${slideImages[1]})`,height:"150px",width:"100%", backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
                    </div>
                  </div>
                 
                </Slide>
              </div>
            )
        }

   /* const fruits=this.state.fruits.map((item)=>{
     return (
      <div className="col-4 col-md-3 ">
        <Card  >
           <Link to={`/home/${item.itemid}`} >
         <CardImg width="100%" style={{height:"170px"}} src={item.img} alt={item.name}/>
            <div style={{backgroundcolor:"blue"}} class="card-footer text-muted text-center">
             {item.name}
            </div>
            </Link>
        </Card>
      </div>
            );
        })


           */

        return (
          <div>
              <div className="fluid ">
                <div className="picture ">
              <Slideshow/>
              </div>
              </div>
     
<div class="container-main-2">
    <div class="container-fx-pt">

     <div class="container-main-left-service">

       <div class="service-bann">

         <h1 id="service-heading-155">One website for all your needs</h1>

         <button id="service-btn-1">
           <span>
             <h1 id="service-heading-200">Create Custom Order</h1>

             <span id="service-order-135">
               Enter name/photos of products and <br/>leave the rest on us
             </span>
             <img src="assets/images/partner.png"  alt="" style={{width:" 50px", height: "50px", position: "absolute",top:"50%", transform: "translateY(-50%)", right: "20px"}}/>
           
           </span>

         </button>

       </div>

     </div>

     </div>
     </div>
    

     <div id="container-items-scroll">

  <div class="items-top-recent">
    <img class="top-items-img"  src="assets/images/cart.png"  alt="xyz"/>
    <p class="top-items-name">mango lanhras aam mango</p>
   </div>
   <div class="items-top-recent">
    <img class="top-items-img"  src="assets/images/cart.png"  alt="xyz"/>
    <p class="top-items-name">mango lanhras aam mango</p>
   </div>
   <div class="items-top-recent">
    <img class="top-items-img"  src="assets/images/cart.png"  alt="xyz"/>
    <p class="top-items-name">mango lanhras aam mango</p>
   </div>
   <div class="items-top-recent">
    <img class="top-items-img"  src="assets/images/cart.png"  alt="xyz"/>
    <p class="top-items-name">mango lanhras aam mango</p>
   </div>
   <div class="items-top-recent">
    <img class="top-items-img"  src="assets/images/cart.png"  alt="xyz"/>
    <p class="top-items-name">mango lanhras aam mango</p>
   </div>
   <div class="items-top-recent">
    <img class="top-items-img"  src="assets/images/cart.png"  alt="xyz"/>
    <p class="top-items-name">mango lanhras aam mango</p>
   </div>
   <div class="items-top-recent">
    <img class="top-items-img"  src="assets/images/cart.png"  alt="xyz"/>
    <p class="top-items-name">mango lanhras aam mango</p>
   </div>
   <div class="items-top-recent">
    <img class="top-items-img"  src="assets/images/cart.png"  alt="xyz"/>
    <p class="top-items-name">mango lanhras aam mango</p>
   </div>

</div>

        <div class="container-main-right-catg">


            <div class="all-categary-container-123">



            <div class="name-categary-type-123-box">


             <div class="sm-container-category sm-category-1">
            
            <div class="sm-categary-inside  categary-item-1">
            <Link to="/home/fruits" >
                <a  class="items-category-name">
                  <img src="assets/images/images.jpg" class="items-image" alt=""/>
                  <span className="itemactive" >fruits and vegetable </span>
                </a>
           </Link>
            </div>
        
           </div>
          </div>



          <div class="name-categary-type-123-box">


            <div class="sm-container-category sm-category-1">
           
           <div class="sm-categary-inside  categary-item-1">
           <Link to="/home/grocery" >
               <a  class="items-category-name">
                 <img src="assets/images/images.jpg" class="items-image" alt=""/>
                 <span className="itemactive">Grocery </span>
               </a>
               </Link>
           </div>
       
          </div>
         </div>



         <div class="name-categary-type-123-box">


            <div class="sm-container-category sm-category-1">
           
           <div class="sm-categary-inside  categary-item-1">
           <Link to="/home/grocery" >
               <a  class="items-category-name">
                 <img src="assets/images/images.jpg" class="items-image" alt=""/>
                 <span className="itemactive" >Grocery </span>
               </a>
               </Link>
           </div>
       
          </div>
         </div>



         <div class="name-categary-type-123-box">


            <div class="sm-container-category sm-category-1">
           
           <div class="sm-categary-inside  categary-item-1">
           <Link to="/home/grocery" >
               <a  class="items-category-name">
                 <img src="assets/images/images.jpg" class="items-image" alt=""/>
                 <span className="itemactive">Grocery </span>
               </a>
               </Link>
           </div>
       
          </div>
         </div>



         <div class="name-categary-type-123-box">


            <div class="sm-container-category sm-category-1">
           
           <div class="sm-categary-inside  categary-item-1">
           <Link to="/home/grocery" >
               <a  class="items-category-name">
                 <img src="assets/images/images.jpg" class="items-image" alt=""/>
                 <span className="itemactive">Grocery </span>
               </a>
               </Link>
           </div>
       
          </div>
         </div>


          
     </div>
     </div>
   </div>
  
          
        );
    }
}


 
export default Home;

