const express = require ('express'); // importando a biblioteca
const mongoose = require ('mongoose');
const cors = require ('cors');
const routes = require ('./routes')

const app = express ();

mongoose.connect('mmongodb+srv://Charlesrramos:101167@cluster0-atoyj.mongodb.net/week10?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  useCreateIndex: true,
});


app.use(cors()); // poder rodar em qualquer porta 
app.use(express.json());  // use siginifica que vai valer para toda a aplicação.
app.use(routes);


app.listen(3333); // listen escolhendo a porta do servidor
 
