const Hero = require('./models/hero');

module.exports = {
  heroes: () => {
    return Hero.find()
      .then(heroes => {
        return heroes.map(hero => {
          return {
            ...hero._doc,
            _id: hero.id,
            date: new Date(hero.date).toISOString()
          };
        });
      })
      .catch(err => {
        throw err;
      });
  },
  findHero: async (args) => {
    try {
      let hero = await Hero.findById(args.id);
      return {
        ...hero._doc,
        date: new Date(hero.date).toISOString()
      };
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  createHero: args => {
    const hero = new Hero({
      title: args.heroInput.title,
      description: args.heroInput.description,
      date: new Date(args.heroInput.date)
    });
    return hero
      .save()
      .then(result => {
        return { ...result._doc, _id: result._doc._id.toString() };
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  },
  deleteHero: async (args) => {
    try {
      console.log(args);
      const hero = await Hero.findById(args.heroRemove._id);
      return hero.remove().then(result => {
        return { ...result._doc, _id: result._doc._id.toString() };
      });
    } catch (err) {
      throw err;
    }
  },
  updateHero: async (args) => {
    try {
      const newHero = await Hero.findByIdAndUpdate(
        args.heroUpdate._id,
        {
          title: args.heroUpdate.title,
          description: args.heroUpdate.description,
          date: new Date(args.heroUpdate.date)
        },
        { new: true }
      );
      return newHero;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
};