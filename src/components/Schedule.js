import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from './shared_components/Header';
import  dateFormat from 'dateformat';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class Schedule extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ration: [],
      date:''
    };
  }

  componentDidMount() {
 // this.getSchedule()
  }

  getSchedule(date){
    axios.get(`http://localhost:3002/api/ration/schedule-ration/${date}`)
      .then(res => {
        console.log(res.data);
        this.setState({ ration: res.data});
      })
      .catch((err) =>{
        console.log(err);
      })
  }

  getDate(date,index){
    var date  = new Date(this.state.date)
    date.setDate(date.getDate() + (index));  
    return dateFormat(date, "dd/mm/yyyy")
  }

  onChange = (e) => {
    this.setState({date:e.target.value});
    this.getSchedule(e.target.value)
  }

  render() {
    return (
      <div className="container">
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">
           Martian
          </h3>
        </div>
        <Header />
        <ToastContainer position={toast.POSITION.TOP_RIGHT} />
        <div className="panel-body">
        <br/>
        <div className="col col-4 form-group">
                <label >Expiry Date:</label>
                <input type="Date" className="form-control"  value={this.state.date} onChange={this.onChange} name="date"  placeholder="Expiry Date" />
              </div>
          {/* <h4><Link to="/create"><span className="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> Add Ration</Link></h4> */}
          {this.state.ration.length > 0 && <table className="table table-stripe">
          <thead>
                        <tr>
                        <th scope="col">Schedule Date</th>
                            <th scope="col">Packet Id</th>
                            <th scope="col">Packet Type</th>
                            <th scope="col">Packet Content</th>
                            <th scope="col">Calories</th>
                            <th scope="col">Expiry date</th>
                            <th scope="col">Quantity In Litres</th>
                  
                </tr>
                    </thead>
                    <tbody>    
              {this.state.ration.map((ration,index) =>
                <tr >
                  <th scope="row">{this.getDate(ration.date,index)}</th>
                 <td colSpan="6">
                 <table className="table table-striped" >
                    <tbody>
                 {ration.packets.map(packets =>
                 <tr >
                 <td>{packets.pack_id}</td>
                 <td>{packets.type}</td>
                  { packets.type == 'Food' && <td>{packets.packet_content}</td>}
                  { packets.type == 'Water' && <td> - </td>}
                  { packets.type == 'Food' && <td>{packets.calories}</td>}
                  { packets.type == 'Water' && <td> - </td>}
                  { packets.type == 'Food' && <td>{dateFormat(packets.packet_exp_date, "dd/mm/yyyy")}</td>}
                  { packets.type == 'Water' && <td> - </td>}
                  { packets.type == 'Water' && <td>{packets.qty_ltr}</td>}
                  { packets.type == 'Food' && <td> - </td>}
                
                 </tr>

                 )}
              </tbody>
            </table>
               </td>
                </tr>
              )}
          </tbody>
                </table>
          }
         <br/>
        { this.state.date && <div className="form-group">
                <label >Number of days you can survive with current inventory : { this.state.ration.length} </label>
              </div>
        }
        </div>
      </div>
    </div>
    );
  }
}

export default Schedule;
