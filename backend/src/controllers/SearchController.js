const parseStringAsArray = require("../utils/parseStringAsArray");
const Dev = require("../models/Dev");

module.exports = {
    async index(request, response) {
        //console.log(request.query);

        const {latitude, longitude, techs} = request.query;
        const techsArray = parseStringAsArray(techs);

        const devs = await Dev.find({
            techs: {
                $in: techsArray,
            },
            location: {
                $near: {
                    $geometry: {
                        tyoe: "Point",
                        coordinates: [parseFloat(longitude), parseFloat(latitude)],
                    },
                    $maxDistance: 10000,
                },
            },
        });

        return response.json({devs});
    }
}