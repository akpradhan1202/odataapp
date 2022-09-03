const express = require('express');
const app = express();
const core = require('@sap-cloud-sdk/core');
const passport = require('passport')
const xsenv = require('@sap/xsenv')
const JWTStrategy = require('@sap/xssec').JWTStrategy
const services = xsenv.getServices({ uaa: 'odataapp-uaa' })

//passport.use(new JWTStrategy(services.uaa))

//app.use(passport.initialize())
//app.use(passport.authenticate('JWT', { session: false }))

//app.use(bodyParser.json());


app.get('/srv', async function (req, res) {

    console.log('test',req.query);
    
    try {
        let res1 = await core.executeHttpRequest(
            {
                destinationName: req.query.destination || 'odataapp-nw'
                
            
            },
            {
                method: 'GET',
                url: req.query.path || 'sap/opu/odata/SAP/ZOD_APPROVE_FMCL_POC_SRV',
                headers: {
                    custom: {
                      authorization: 'custom-auth-header',
                      'content-type': 'application/json',
                      accept: 'application/json'
                    }
                  }
            },
            
        );
        res.status(200).json(res1.data);
        
    } catch (err) {
        console.log(err.stack);
        res.status(500).send(err.message);
    }
 

});




const port = process.env.PORT || 5001;
app.listen(port, function () {
    console.info('Listening on http://localhost:' + port);
});