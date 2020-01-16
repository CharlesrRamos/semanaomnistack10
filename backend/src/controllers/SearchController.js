const Dev = require ('../models/Dev');
const parseStringAsArray = require ('../utils/parseStringAsArray');

module.exports = {

    async index(request, response) {
        // busca de devs em um raio de 10km
        //filtro de tecnologia
       const { latitude, longitude, techs } = request.query;

       const techsArray = parseStringAsArray(techs);

       const devs = await Dev.find({
           techs: {
               $in: techsArray, // filtros in se o usuario tem as tecnologias dentro do array
           },

           location: {
               $near: {
                   $geometry:{
                       type: 'Point',
                       coordinates: [longitude, latitude],

                   },
                   $macDistance: 10000,
               },
           },
       });

        return response.json({ devs });
    }
}