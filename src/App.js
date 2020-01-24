import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from './components/shared_components/Header';
import  dateFormat from 'dateformat';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ration: []
    };
  }

  componentDidMount() {
    this.getAllRation();
  }
  getAllRation(){
    axios.get('http://localhost:3002/api/ration/get-ration')
      .then(res => {
        this.setState({ ration: res.data.data });
      })
      .catch((err) =>{
        console.log(err);
      })
  }

  delete(id){
    console.log(id);
    axios.delete('http://localhost:3002/api/ration/delete-ration/'+id)
      .then((result) => {
        console.log("result ---------",result)
        this.getAllRation();
      })
      .catch((err) =>{
        console.log(err);
      })
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
            {/* <h4><Link to="/create"><span className="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> Add Ration</Link></h4> */}
            <table className="table table-stripe">
              <thead>
                <tr>
                  <th>Packet Id</th>
                  <th>Packet Type</th>
                  <th>Packet Content</th>
                  <th>Calories</th>
                  <th>Expiry Date</th>
                  <th>Quantity In Liters </th>
                  <th>Actions</th>

                </tr>
              </thead>
              <tbody>
                {this.state.ration.map(ration =>
                  <tr>
                    <td>{ration.pack_id}</td>
                    <td>{ration.type}</td>
                    { ration.type == 'Food' && <td>{ration.packet_content}</td>}
                    { ration.type == 'Water' && <td> - </td>}
                    { ration.type == 'Food' && <td>{ration.calories}</td>}
                    { ration.type == 'Water' && <td> - </td>}
                    { ration.type == 'Food' && <td>{dateFormat(ration.packet_exp_date, "dd/mm/yyyy")}</td>}
                    { ration.type == 'Water' && <td> - </td>}
                    { ration.type == 'Water' && <td>{ration.qty_ltr}</td>}
                    { ration.type == 'Food' && <td> - </td>}
                    <td><button onClick={this.delete.bind(this,ration._id)} className="btn btn-danger">Delete</button></td>
                  
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
