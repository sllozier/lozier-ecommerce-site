// The purpose of this module is to bring your Sequelize instance (`db`) together
// with your models, for which you'll find some blank files in this directory:

const db = require('./database')
const Student = require('./Student')
const Campus = require('./Campus')

Campus.hasMany(Student);
Student.belongsTo(Campus);

const syncAndSeed = async () => {
    await db.sync({ force: true });

    const library = await Campus.create({
      name: 'Library', 
      address: 'Next to janitors office',
      description: 'The library has more than enough space as it spans two floors. There is a large open space in the center where students can work together or in small groups. The second floor has multiple rooms for small groups to work and is the perfect spot for Saturday detention.',
      imageUrl: 'library.jpg',
      })
  
  const parkingLot = await Campus.create({
      name: 'Parking Lot',
      address: 'Just outside Shermer High School',
      description: 'This is where your detention begins folks. Leave all your dreams here and maybe you will get a kiss at the end of the day!',
      imageUrl: 'parkingLot.jpg',
  })
  
  const hallway = await Campus.create({
      name: 'Hallway',
      address: 'Just outside the doors of the library',
      description: 'Freedom lies in the halls of Shermer High School. Beware! Prinicpal Dick is lurking! Hide your grass, man!',
      imageUrl: 'hallway.jpg',
  })
  
  const footballField = await Campus.create({
      name: 'Football Field',
      address: 'Across the parking lot from the school entrance',
      description: 'You survived detention and got the girl. Pump that fist!',
      imageUrl: 'footballField.jpg',
  })
  
  await Student.create({
      firstName: 'Brian',
      lastName: 'Johnson',
      email: 'brain@breakfastclub.com',
      imageUrl:'brian.jpg',
      gpa: 4.0,
      campusId: parkingLot.id,
      quote: "Dear Mr. Vernon, we accept the fact that we had to sacrifice a whole Saturday in detention for whatever it was we did wrong. What we did was wrong. But we think you're crazy to make us write an essay telling you who we think we are. What do you care? And you see us as you want to see us - in the simplest terms, in the most convenient definitions. You see us as a brain, an athlete, a basket case, a princess, and a criminal.",
    })
  
  await Student.create({
      firstName:'Andrew',
      lastName:'Clark',
      email:'athlete@breakfastclub.com',
      imageUrl:'andrew.jpg',
      gpa: 3.0,
      campusId: hallway.id,
      quote: "I'm not a winner because I want to be one. I'm a winner because I've got strength and speed... kinda like a racehorse. It's about how involved I am in what's happening to me.",
    })
  
  await Student.create({
      firstName: 'Allison',
      lastName:'Reynolds',
      email: 'basketCase@breakfastclub.com',
      imageUrl: 'allison.jpg',
      gpa: 2.8,
      campusId: hallway.id,
      quote: "I don't have to run away and live in the street. I can run away and I can go to the ocean, I can go to the country, I can go to the mountains. I could go to Israel, Africa, Afghanistan.",
    })
  
  await Student.create({
      firstName: 'Claire',
      lastName: 'Standish',
      email: 'princess@breakfastclub.com',
      imageUrl: 'claire.jpg',
      gpa: 3.5,
      campusId: library.id,
      quote: "I have just as, many feelings as you do and it hurts so much when someone steps all over them",
    })
    
  await Student.create({
      firstName: 'John',
      lastName: 'Bender',
      email: 'criminal@breakfastclub.com',
      imageUrl: 'bender.jpg',
      gpa: 0.0,
      campusId: footballField.id,
      quote: "But face it. You’re a neo maxi zoom dweebie, what would you be doing if you weren’t out making yourself a better citizen?",
    })
    console.log(`
    Seeding successful!
    Time for school!
  `);
};



module.exports = {
  db,
  syncAndSeed,
  Student,
  Campus,

}