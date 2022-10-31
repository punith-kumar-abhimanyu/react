import React from 'react';
import coffeeBanner from './assets/coffee_banner.jpg';
import espresso from './assets/espresso.jpg';
import cappuccino from './assets/cappuccino.jpg';
import latte from './assets/latte.jpg';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.coffeeDetails = [
      {
        name:"Espresso",
        imageName:espresso,
        addOn:[
          {
            addOnName:"Milk",
            price:60,
            selectedQuantity:0
          },
          {
            addOnName:"Cream",
            price:75,
            selectedQuantity:0
          },
          {
            addOnName:"Latte",
            price:100,
            selectedQuantity:0
          }
        ]
      },
      {
        name:"Cappuccino",
        imageName:cappuccino,
        addOn:[
          {
            addOnName:"Milk",
            price:80,
            selectedQuantity:0
          },
          {
            addOnName:"Cream",
            price:90,
            selectedQuantity:0
          },
          {
            addOnName:"Latte",
            price:125,
            selectedQuantity:0
          }
        ]
      },
      {
        name:"latte",
        imageName:latte,
        addOn:[
          {
            addOnName:"Milk",
            price:100,
            selectedQuantity:0
          },
          {
            addOnName:"Cream",
            price:125,
            selectedQuantity:0
          },
          {
            addOnName:"Latte",
            price:150,
            selectedQuantity:0
          }
        ]
      }
    ]
    this.totalPrice=0;
    this.state = {coffeeData:this.coffeeDetails,total:this.totalPrice};

  }

  addRemoveItem(coffeeIndex,addOnIndex,type) {
    if(type == 'add'){
      this.coffeeDetails[coffeeIndex].addOn[addOnIndex].selectedQuantity+=1;
      this.totalPrice += this.coffeeDetails[coffeeIndex].addOn[addOnIndex].price;
      
    }
    if(type=='remove'){
      if(this.coffeeDetails[coffeeIndex].addOn[addOnIndex].selectedQuantity != 0) {
        this.coffeeDetails[coffeeIndex].addOn[addOnIndex].selectedQuantity-=1;
        this.totalPrice = this.totalPrice - this.coffeeDetails[coffeeIndex].addOn[addOnIndex].price;
      }
    }
    this.setState({coffeeData:this.coffeeDetails,total:this.totalPrice})
  }
  placeOrder() {
    this.totalPrice=0;
    this.coffeeDetails.map((data,index) => {
      data.addOn.map((addOnData,addOnIndex) => {
        this.coffeeDetails[index].addOn[addOnIndex].selectedQuantity = 0;
      })
    });
    this.setState({coffeeData:this.coffeeDetails,total:this.totalPrice});
  }

  render() {
    return(
      <div>
        <img src={coffeeBanner} alt="Coffee_shop" className="cls-banner"/>
        <div className="row cls-main">
          {this.coffeeDetails.map((item,index) => {
            return (
              <div className="col-sm-4">
                <div className="card">
                  <img src={item.imageName} className="card-img-top" alt=""/>
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">Select your preffered Add-on.</p>
                  </div>
                  <ul className="list-group list-group-flush">
                    {item.addOn.map((addOnData,addOnIndex) => {
                      return(
                        <li className="list-group-item" key={addOnData.addOnName}>
                          <div className="row">
                            <div className="col-sm-4">{addOnData.addOnName}</div>
                            <div className="col-sm-4">
                              <span>
                                <i className="bi bi-dash-circle"  onClick={()=>this.addRemoveItem(index,addOnIndex,'remove')}></i>
                                <span className="ms-2 me-2">{addOnData.selectedQuantity}</span>
                                <i className="bi bi-plus-circle" onClick={()=>this.addRemoveItem(index,addOnIndex,'add')}></i>
                              </span>
                            </div>
                            <div className="col-sm-4">
                              <span>
                                <i className="bi bi-currency-rupee"></i>{addOnData.price}
                              </span>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
        <div className="row cls-main">
          <div className="col-sm-12">
            <table className="table table-striped">
              <thead className="cls-text-center">
                <tr>
                  <th colSpan="4" className="cls-table-head"><h2>Selected Coffee</h2></th>
                </tr>
                <tr>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              {this.totalPrice == 0 ? 
               (<tbody>
                 <tr>
                   <td colSpan="6" className="cls-text-center"><h4>No Order Yet</h4></td>
                 </tr>
               </tbody>) : 
              (<>
                <tbody>
                  {this.state.coffeeData.map((orderedItem,index) => {
                    return(
                      <>
                        {orderedItem.addOn.map((orderedAddOnData,addOnIndex) => {
                          if(orderedAddOnData.selectedQuantity != 0) {
                            return(
                              <tr>
                                <td>{orderedItem.name+' '+orderedAddOnData.addOnName}</td>
                                <td className="cls-text-center">{orderedAddOnData.selectedQuantity}</td>
                                <td className="cls-text-center">{orderedAddOnData.price}</td>
                                <td className="cls-text-center">{(orderedAddOnData.selectedQuantity)*(orderedAddOnData.price)}</td>
                              </tr>
                            );
                          } 
                        })}
                      </>
                    )
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="3" className="cls-text-right"><h6>Total Bill Amount</h6></td>
                    <td className="cls-text-center">{this.totalPrice}</td>
                  </tr>
                  <tr>
                    <td colSpan="5"><span className="btn btn-primary d-block btn-lg" data-bs-toggle="modal" data-bs-target="#successModal" onClick={()=>this.placeOrder()}>Place Order</span></td>
                  </tr>
                </tfoot>
              </>)}
            </table>
          </div>
        </div>
        <div class="modal fade" id="successModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Order Placed Successfully</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                Your Order Successfully Placed !!! <br/>
                Have a Nice Cofee Day!!
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
