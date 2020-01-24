
// Register babel
require('babel-register');
var chai = require('chai');
var chaiHttp = require('chai-http')
var should = chai.should();
chai.use(chaiHttp);
var server =  require('../server.js');
var host = 'http://localhost:3002';
var Ration = require('../app/models').Ration

//Our parent block
describe(`Ration`, () => {
    describe(`/GET get-ration`, () => {
        it(`it should GET all the ration`, (done) => {
        chai.request(host)
          .get(`/api/ration/get-ration`)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a(`object`);
                res.body.data.should.be.a('array');
               // (res.body).length.should.be.eql(0);

                done();
             });
          });
     });
     describe('/POST Food add-ration', () => {
      it('it should Add ration in of Food type', (done) => {
          let ration = {
              pack_id: "F1",
              type: "Food",
              packet_content :"packet_content",
              calories : 3000,
              packet_exp_date : '2020-01-01T18:30:00.000Z'
          }
            chai.request(host)
            .post(`/api/ration/add-ration`)
            .send(ration)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.data.should.have.property('pack_id');
                  res.body.data.should.have.property('type');
                  res.body.data.should.have.property('packet_content');
                  res.body.data.should.have.property('calories');
                  res.body.data.should.have.property('packet_exp_date');
                  res.body.data.should.have.property('type').eql('Food');
              done();
            });
      });
    });

    describe('/POST Water add-ration', () => {
      it('it should Add ration in type of Water', (done) => {
          let ration = {
              pack_id: "W1",
              type: "Water",
              qty_ltr :2,
          }
            chai.request(host)
            .post(`/api/ration/add-ration`)
            .send(ration)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.data.should.have.property('pack_id');
                  res.body.data.should.have.property('type');
                  res.body.data.should.have.property('qty_ltr');
                  res.body.data.should.have.property('type').eql('Water');
              done();
            });
      });
    });


    
    
  //Test the /DELETE/:id route for delete ration
  
  describe('/DELETE/:id ration', () => {
    it('it should DELETE a ration details given the id', (done) => {
        let ration = new Ration({
        pack_id: "W1",
        type: "Water",
        qty_ltr :2})
        ration.save((err, ration) => {
              chai.request(host)
              .delete('/api/ration/delete-ration/'+ration._id)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('msg').eql('Ration successfully deleted!');
                done();
              });
        });
    });
});
  
   });

 
