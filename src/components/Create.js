import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from './shared_components/Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  
class Create extends Component {

  constructor() {
    super();
    this.state = {
      pack_id : '',
      packet_content: '',
      calories: '',
      packet_exp_date: '',
      type: '',
      qty_ltr: '',
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();
    if(!this.state.pack_id){
    
      toast.error('Please enter Pack id. Ex. F1,W1.', {
        position: toast.POSITION.TOP_RIGHT
      })
      return
    }
    if(this.state.type =='Food'  && !this.state.packet_content){
      toast.error('Please enter Packet content.', {
        position: toast.POSITION.TOP_RIGHT
      })
      return
    }
    if(!this.state.type){
      alert("Please select Packet type.");
      toast.error('Please enter Packet content.', {
        position: toast.POSITION.TOP_RIGHT
      })
      return
    }
    if(this.state.type =='Food'  && !this.state.calories){
      toast.error('Please enter calories.', {
        position: toast.POSITION.TOP_RIGHT
      })
      return
    }
    if(this.state.type =='Food'  && !this.state.packet_exp_date){
      toast.error('Please select expiry date.', {
        position: toast.POSITION.TOP_RIGHT
      })
      return
    }

    if(this.state.type =='Water' &&!this.state.qty_ltr){
      toast.error('Please enter water quantity in liters.', {
        position: toast.POSITION.TOP_RIGHT
      })
      return
    }
    



    const { pack_id, packet_content, type, calories, packet_exp_date, qty_ltr } = this.state;
    axios.post('http://localhost:3002/api/ration/add-ration', { pack_id, packet_content, type, calories, packet_exp_date, qty_ltr })
      .then((result) => {
        console.log(result)
        if(result.status == 200 && result.statusText == 'OK'){     
        toast.success(result.data.msg, {
        position: toast.POSITION.TOP_RIGHT
       });
          this.state = {
            pack_id : '',
            packet_content: '',
            calories: '',
            packet_exp_date: '',
            type: '',
            qty_ltr: '',
          };
          this.props.history.push("/")
        }else{
          toast.error(result.data.msg, {
            position: toast.POSITION.TOP_RIGHT
          }) 
        }       
      })
      .catch((err) =>{
        console.log(err)
      })
  }

  getInitialState = () =>{
    return {selectValue:''};
}
handleChange =(e) =>{
    this.setState({type:e.target.value});
}

  render() {
    const { pack_id, packet_content, type, calories, packet_exp_date, qty_ltr } = this.state;
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
             <Header />
             <ToastContainer position={toast.POSITION.TOP_RIGHT} />

            </h3>
          </div>
          <div className="panel-body">
            {/* <h4><Link to="/"><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span>Add Ration</Link></h4> */}
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label >Packet Id:</label>
                <input type="text" className="form-control" name="pack_id" value={pack_id} onChange={this.onChange} placeholder="Packet Id" />
              </div>
              <div className="form-group">
                <label >Packet Type:</label>
                {/* <input type="text" className="form-control" name="type" value={type} onChange={this.onChange} placeholder="Packet Type" /> */}
                <select value={type} 
         onChange={this.handleChange} 
         >
            <option value="">Select-Packet-Type</option>
            <option value="Food">Food</option>
            <option value="Water">Water</option>
            
          </select>
              </div>
              { type =='Food' && <div>
              <div className="form-group">
                <label >Packet Content:</label>
                <input type="text" className="form-control" name="packet_content" value={packet_content} onChange={this.onChange} placeholder="Packet Content" />
              </div>
              <div className="form-group">
                <label >Calories:</label>
                <input type="number" className="form-control" name="calories" value={calories} onChange={this.onChange} placeholder="Calories" />
              </div>
              <div className="form-group">
                <label >Expiry Date:</label>
                <input type="Date" className="form-control" name="packet_exp_date" value={packet_exp_date} onChange={this.onChange} placeholder="Expiry Date" />
              </div> </div>}
             { type =='Water' && <div className="form-group">
                <label >Quantity in Litres:</label>
                <input type="number" className="form-control" name="qty_ltr" value={qty_ltr} onChange={this.onChange} placeholder="Quantity in Litres" />
              </div>}
              <button type="submit" className="btn btn-info">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;
