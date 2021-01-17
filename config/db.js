const  mongoose = require('mongoose');

const conectarDB = async () =>{

        try{
            await mongoose.connect('mongodb://localhost/merntask',{
             useNewUrlParser : true,
             useUnifiedTopology:true,
             useFindAndModify:false
            });
            console.log('data base conectada..!');
        }catch(error){
            console.log(error);
            process.exit(1);//detiene app
        }
}

module.exports = conectarDB;