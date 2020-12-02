
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/populationDB', { useNewUrlParser: true })

const Schema = mongoose.Schema

const SystemSchema = new Schema({
    planets: [{ type: Schema.Types.ObjectId, ref: 'Planet' }],
    starName: String
})

const PlanetSchema = new Schema({
    visitors: [{ type: Schema.Types.ObjectId, ref: 'Visitor' }],
    name: String,
    system: { type: Schema.Types.ObjectId, ref: 'System' }
})

const VisitorSchema = new Schema({
    visitedPlanets: [{ type: Schema.Types.ObjectId, ref: 'Planet' }],
    name: String,
    homePlanet: { type: Schema.Types.ObjectId, ref: 'Planet' }
})

const System = mongoose.model('System', SystemSchema)
const Planet = mongoose.model('Planet', PlanetSchema)
const Visitor = mongoose.model('Visitor', VisitorSchema)

let solarSystem = new System({
    starName: "1234",
    planets: []
})

let planet1 = new Planet({
    name: "Earth",
    system: solarSystem,
    visitors: []
})

let planet2 = new Planet({
    name: "pluto",
    system: solarSystem,
    visitors: []
})

let visitor = new Visitor({
    name: "Mike",
    homePlanet: planet1,
    visitedPlanets: []
})

visitor.visitedPlanets.push(planet1)
visitor.visitedPlanets.push(planet2)

planet1.visitors.push(visitor)
planet2.visitors.push(visitor)

solarSystem.planets.push(planet1)
solarSystem.planets.push(planet2)

planet1.save()
planet2.save()
visitor.save()
solarSystem.save()

Visitor.find({}, function(err, visitors){
    console.log(visitors)
  //  visitors.forEach(v => console.log(v.visitedPlanets))
})
Visitor.find({})
    .populate('visitedPlanets')
    .exec(function (err, visitors) {
        console.log(visitors)
        visitors.forEach(v => console.log(v.visitedPlanets))
    })

Planet.findOne({})
    .populate('visitors')
    .exec(function (err, planet) {
        console.log(planet.visitors)
    })

System.findOne({})
    .populate({
        path: 'planets',
        populate: {
            path: 'visitors'
        }
    })
    .exec(function (err, system) {
        system.planets.forEach(p => console.log(p.visitors)) 
    })
