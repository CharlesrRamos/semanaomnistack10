const axios = require ('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require ('../utils/parseStringAsArray');

// async significa que pode demorar para responder devido ao github
//await aguardar finalizar para  devolver a resposta.
module.exports = {

    // método para listagem de Devs
    async index (request, response) {
        const devs = await Dev.find();

            return response.json(devs);

        },
    


    async store (request, response) {
        const {github_username, techs, latitude, longitude} = request.body;
        
        let dev = await Dev.findOne( {github_username}); //  findOne verificar na base se possui alguém com aquele paremetro passado

        // caso não possua, entra no if e efetua o cadastro.

        if (!dev) {  
                
                
            const apiResponse = await axios.get (`https://api.github.com/users/${github_username}`);
            
            // pegar só as informações que queremos - name = login funciona como de fosse um if.
            const {name = login, avatar_url, bio} = apiResponse.data;
            
            // split cortar a string toda vez que estiver uma virgula - Map para percorer  todas as techs epara cada uma das tecnologias usa o trim para tirar o espaçamento.
        
            const techsArray = parseStringAsArray(techs);
        
            const location = {
                type: 'Point',
                coordinates: [longitude , latitude],
            };
            
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            });
        };

      
        return response.json (dev); // .send envia um texto , trocou o .send por .json pois é a estrutura utilizada para envio, criando assim um objeto com os dados.
   }
};