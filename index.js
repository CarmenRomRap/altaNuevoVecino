console.log('Empieza el alta de vecinos')

const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient({region: 'eu-west-1'})

exports.handler = function(event, context, callback){
    console.log('Procesando los datos del nuevo vecino desde git final: ' + JSON.stringify(event, null, 2))

    let date = new Date().getTime();
    
    let params =  {
        Item: {
            fecha_alta: event.date ? event.date : date,
            nombre_usuario: event.nombre_usuario ? event.nombre_usuario : "Anonymous",
            nombre: event.nombre,
            apellidos: event.apellidos,
            email: event.apellidos
        },

        TableName: 'vecinos'
    };
    
    console.log('Vamos a dar de alta al vecino: ' + params.Item.nombre_usuario)

    docClient.put(params, function(err,data){
        if(err) {
            callback(err, null)
        }else{
            callback(null, data)
        }
    });

}
