"use strict";
const fs = require('fs')
const nodemailer = require("nodemailer");
var dateTime = require('node-datetime');
var parser, xmlDoc, balance;
var parser2, xmlDoc2, results2;
var parser3, xmlDoc3, results3;
var dt = dateTime.create();
var formattedDate = dt.format('d-m-Y H:M:S');

console.log(formattedDate);

function getRehoboth() {
    try {
        UserOnline();
        show_loader();
        //setTimeout(hide_loader, 3000);
        //hide_loader();

        var str = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:net="http://www.netvendor.co.za/"><soap:Header/>' +
            '<soap:Body>' +
            '<net:CheckCredit>' +
            '<net:auth>' +
            '<net:UserName>MobiPay</net:UserName>' +
            '<net:Password>mobipay1</net:Password>' +
            '</net:auth>' +
            '</net:CheckCredit>' +
            '</soap:Body>' +
            '</soap:Envelope>';


        function createCORSRequest(method, url) {
            var xhr = new XMLHttpRequest();
            if ("withCredentials" in xhr) {
                xhr.open(method, url, false);
            } else if (typeof XDomainRequest != "undefined") {
                console.log();
                xhr = new XDomainRequest();
                xhr.open(method, url);
            } else {
                console.log("CORS not supported");
                //alert("CORS not supported");
                xhr = null;
            }
            return xhr;
        }
        var xhr = createCORSRequest("POST", "https://uberswitch01.netvendna.com/MobiPayTwo_API.asmx?wsdl");
        if (!xhr) {
            console.log("XHR issue");
            return;
        }

        xhr.onload = function () {
            balance = xhr.responseText;
            console.log(balance);
            balance.toString;
        }

        xhr.setRequestHeader('Content-Type', 'text/xml');
        xhr.send(str);

        parser = new DOMParser();
        xmlDoc = parser.parseFromString(balance, "text/xml");
        var Value = xmlDoc.getElementsByTagName("CheckCreditResult")[0].childNodes[0].nodeValue;

        // Create our number formatter.
        var formatter = new Intl.NumberFormat('en-NA', {
            style: 'currency',
            currency: 'NAD',
            minimumFractionDigits: 2,
        });
        document.getElementById("rehoboth").value = formatter.format(Value);

        let contents = "\nRehoboth" + " " + Value + " " + "Date" + " " + formattedDate;
        fs.appendFile('Logs.txt', contents, function (err) {
            if (err) {
                alert(err);
                return console.log(err);
            }

            console.log("The file was saved!");
        });
    }
    catch (error) {
        console.log(error);
        alert('Error ' + error.name + ' There was an error ' + error.message);
    }

};

const loader = document.getElementById("loader");
function show_loader() {
  loader.removeAttribute('hidden');
  fetch('https://www.mocky.io/v2/5185415ba171ea3a00704eed?mocky-delay=2000ms')
    .then(response => response.json())
    .then(data => {
      loader.setAttribute('hidden', '');
      //console.log(data)
    });
}


 function UserOnline(){
   /**
    * Show a warning to the user.
    * You can retry in the dialog until a internet connection
    * is active.
    */
   var message = function(){
       const {dialog} = require('electron').remote;

       return dialog.showMessageBox({
           title:"There's no internet",
           message:"No internet available, do you want to try again?",
           type:'warning',
           buttons:[],
           defaultId: 0
       })
   };

   var execute = function(){
       if(navigator.onLine){
           // Execute action if internet available.
           console.log('Internet connection available');
       }else{
           // Show warning to user
           // And "retry" to connect
           message();
       }
   };

   // Verify for first time
   execute();
}

/* ------  SOAP API Request/ Response for Other  ------ */
function getOther(){
        try{
    // btnOther.addEventListener("click", function(){
        UserOnline();
            show_loader();
            //setTimeout(hide_loader, 2000);
            //hide_loader();
    
        var str = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:net="http://www.netvendor.co.za/"><soap:Header/>'+
        '<soap:Body>'+ 
           '<net:CheckCredit>'+
              '<net:auth>'+
                '<net:UserName>MOBI-NAT</net:UserName>'+
                 '<net:Password>2596</net:Password>'+
              '</net:auth>'+
           '</net:CheckCredit>'+
        '</soap:Body>'+
     '</soap:Envelope>';
    
    
    function createCORSRequest(method, url) {
                var xhr = new XMLHttpRequest();
                if ("withCredentials" in xhr) {
                    xhr.open(method, url, false);
                } else if (typeof XDomainRequest != "undefined") {
                    alert
                    xhr = new XDomainRequest();
                    xhr.open(method, url);
                } else {
                    console.log("CORS not supported");
                    alert("CORS not supported");
                    xhr = null;
                }
                return xhr;
            }
    var xhr = createCORSRequest("POST", "https://uberswitch01.netvendna.com/MobiPayTwo_API.asmx?wsdl");
    if(!xhr){
     console.log("XHR issue");
     return;
    }
    
    xhr.onload = function (){
     results2 = xhr.responseText;
     console.log(results2);
     results2.toString;
    }
    
    xhr.setRequestHeader('Content-Type', 'text/xml');
    xhr.send(str);
    
    parser2 = new DOMParser();
    xmlDoc2 = parser2.parseFromString(results2,"text/xml");
    //document.getElementById("other").value =
    var Value = xmlDoc2.getElementsByTagName("CheckCreditResult")[0].childNodes[0].nodeValue;
    
    // Create our number formatter.
    var formatter = new Intl.NumberFormat('en-NA', {
        style: 'currency',
        currency: 'NAD',
        minimumFractionDigits: 2, 
      });
      
     // formatter.format(Value); /* $2,500.00 */
    
      document.getElementById("other").value = formatter.format(Value);
    
      let contents = "\nOther" + " " + Value + " " + "Date" + " " + formattedDate;
        fs.appendFile('Logs.txt', contents, function (err) {
            if (err) {
                alert(err);
                return console.log(err);
            }

            console.log("The file was saved!");
        });
    
    }catch(error){
        alert('Error' + error.name +'There was an error' + error.message );
        }
    }
    
    // SOAP API Request/ Response for Multichoice
    function getMultichoice(){
        try{
            UserOnline();
            show_loader();
            //setTimeout(hide_loader, 2000);
            //hide_loader();
    
    var str =
     '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sel="http://services.multichoice.co.za/SelfCare" xmlns:sel1="http://datacontracts.multichoice.co.za/SelfCare"><soapenv:Header/>'+
    '<soapenv:Body>'+
       '<sel:GetAgentDetails>'+
          '<sel:agentDetailsRequest>'+
             '<sel1:dataSource>Namibia</sel1:dataSource>'+
             '<sel1:agentNumber>5026</sel1:agentNumber>'+
          '</sel:agentDetailsRequest>'+
          '<sel:VendorCode>MobiPayDStv</sel:VendorCode>'+
          '<sel:language>English</sel:language>'+
          '<sel:ipAddress></sel:ipAddress>'+
          '<sel:businessUnit></sel:businessUnit>'+
       '</sel:GetAgentDetails>'+
    '</soapenv:Body>'+
 '</soapenv:Envelope>';

    function createCORSRequest(method, url) {
                var xhr = new XMLHttpRequest();
                if ("withCredentials" in xhr) {
                    xhr.open(method, url, false);
                } else if (typeof XDomainRequest != "undefined") {
                    console.log();
                    xhr = new XDomainRequest();
                    xhr.open(method, url);
                } else {
                    console.log("CORS not supported");
                    alert("CORS not supported");
                    xhr = null;
                }
                return xhr;
            }
    var xhr = createCORSRequest("POST", "https://live.mcadigitalmedia.com/VendorSelfCare/SelfCareService.svc?singleWsdl");
    if(!xhr){
     console.log("XHR issue");
     return;
    }
    
    xhr.onload = function (){
     results3 = xhr.responseText;
     console.log(results3);
     results3.toString;
    }
    
    xhr.setRequestHeader('Content-Type', 'text/xml');
    xhr.send(str);
    
    parser3 = new DOMParser();
    xmlDoc3 = parser3.parseFromString(results3,"text/xml");
    //document.getElementById("rehoboth").value =
    var Value = xmlDoc3.getElementsByTagName("GetAgentDetailsResult")[0].getAttributeNode("a:agentBalance").nodeValue;
    
    // Create our number formatter.
    var formatter = new Intl.NumberFormat('en-NA', {
        style: 'currency',
        currency: 'NAD',
        minimumFractionDigits: 2, 
      });
      
     // formatter.format(Value); /* $2,500.00 */
      document.getElementById("multichoice").value = formatter.format(Value);
    
      let contents = "\nMultichoice" + " " + Value + " " + "Date" + " " + formattedDate;
        fs.appendFile('Logs.txt', contents, function (err) {
            if (err) {
                alert(err);
                return console.log(err);
            }

            console.log("The file was saved!");
        });
    }
    catch(error){
    alert('Error ' + error.name + ' There was an error' + error.message );
    }
    
};
    
    // function startInterval() {
    //   myVar = setInterval( RequestRehoboth, 3000);
    //   }
    
    //   function StopInterval() {
    //     clearInterval(myVar);
    //   }
    
function sendMail() {
    
    // async..await is not allowed in global scope, must use a wrapper
    async function main() {
      // Generate test SMTP service account from ethereal.email
      // Only needed if you don't have a real mail account for testing
      let testAccount = await nodemailer.createTestAccount();
    
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: testAccount.user, // generated ethereal user
          pass: testAccount.pass, // generated ethereal password
        },
      });
    
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <fungaimahara37@gmail.com>', // sender address
        to: "anceley@mobipay.com.na", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
      });
    
      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }
    
    main().catch(console.error);
    
}