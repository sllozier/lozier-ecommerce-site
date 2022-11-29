// The purpose of this module is to bring your Sequelize instance (`db`) together
// with your models, for which you'll find some blank files in this directory:

const db = require('./database');
const Sequelize = require('sequelize');
const getAlbumData = require('./spotify');
const Account = require('./Account');
const Order = require('./Order');
// const Genre = require('./Genre');
const LineItem = require('./LineItem');
const Product = require('./Product');
const Artist = require('./Artist');
const Track = require('./Track');
//test this.
//associations
Account.hasMany(Order);
Order.belongsTo(Account);


Product.belongsToMany(Order, { through: LineItem });
Order.belongsToMany(Product, { through: LineItem });

Product.hasMany(Track);
Track.belongsTo(Product);

Artist.hasMany(Product);
Product.belongsTo(Artist);


const syncAndSeed = async() => {
  await db.sync({ force: true });

   // Account
   const bilal = await Account.create({
    username: 'bilal',
    password: 'password1',
    email: 'bilal@gmail.com',
    firstName: 'Bilal',
    lastName: 'Abbas',
    address: '123 London Street',
    isAdmin: false,
  });

  const sarah = await Account.create({
    username: 'sarah',
    password: 'password2',
    email: 'sarah@gmail.com',
    firstName: 'Sarah',
    lastName: 'Lozier',
    address: '123 Maine Lane',
    isAdmin: false,
  });

  const will = await Account.create({
    username: 'w',
    password: 'w',
    email: 'will@gmail.com',
    firstName: 'Will',
    lastName: 'Siddons',
    address: '123 Philly Road',
    isAdmin: true,
  });

  const austin = await Account.create({
    username: 'austin',
    password: 'password4',
    email: 'austin@gmail.com',
    firstName: 'Austin',
    lastName: 'Gautney',
    address: '123 Stone Cold Court',
    isAdmin: true,
  });

  const [albums, artists] = await getAlbumData();
   
    
    const products = await Promise.all(albums.map(async album => {
      //console.log('SEED Artist name?', album.artists[0].name)
      const art = await Artist.findOne({
        where: {
          spotifyId: album.artists[0].id
        },
      });
     //console.log("SEED ART", art)
      
      if(!art){
        // function getObjKey(obj, val){
        //   return Object.keys(obj).find(key => console.log("OBJKEY", obj[key]))
        // }
        // console.log("GETOBJKEYS?", getObjKey(artists, "id"))
        let spotifyArtist = artists.find(art => art[0] === album.artists[0].id);
        //console.log("SEED SPOTART", spotifyArtist)
        art = await Artist.create({
          name: spotifyArtist.name,
          spotifyId: spotifyArtist.id,
          image: spotifyArtist.images[0].url,
          genre: spotifyArtist.genres[0],
        });
       }

      let prod = await Product.create({
        title: album.name,
        price: 999 + Math.ceil(album.popularity / 10) *100,
        stock: Math.floor(Math.random() * 16),
        popularity: album.popularity,
        image: album.images[0].url,
        spotifyId: album.id,
        trackTotal: album.total_tracks,
        releaseDate: album.release_date,
        label: album.label,
        artistId: art.id,
      });

      album.tracks.items.map(async track => {
        await Track.create({
          name: track.name,
          spotifyId: track.id,
          length: track.duration_ms,
          explicit: track.explicit,
          preview: track.preview_url,
          productId: prod.id,
        });
      });
      return prod;
    }));
    console.log(`
    Seeding successful!`,);
}

module.exports = {
  db,
  syncAndSeed,
  Account,
  Order,
  Track,
  Artist,
  LineItem,
  Product,
};

// const seed = async () => {
//   try {
//     console.log(`Seeding started...`);
//     await db.sync({ force: true });

//     // Account
//     const bilal = await Account.create({
//       username: 'bilal',
//       password: 'password1',
//       email: 'bilal@gmail.com',
//       firstName: 'Bilal',
//       lastName: 'Abbas',
//       address: '123 London Street',
//       isAdmin: false,
//     });

//     const sarah = await Account.create({
//       username: 'sarah',
//       password: 'password2',
//       email: 'sarah@gmail.com',
//       firstName: 'Sarah',
//       lastName: 'Lozier',
//       address: '123 Maine Lane',
//       isAdmin: false,
//     });

//     const will = await Account.create({
//       username: 'w',
//       password: 'w',
//       email: 'will@gmail.com',
//       firstName: 'Will',
//       lastName: 'Siddons',
//       address: '123 Philly Road',
//       isAdmin: true,
//     });

//     const austin = await Account.create({
//       username: 'austin',
//       password: 'password4',
//       email: 'austin@gmail.com',
//       firstName: 'Austin',
//       lastName: 'Gautney',
//       address: '123 Stone Cold Court',
//       isAdmin: true,
//     });

    

    // Order
    // const order1 = await Order.create({
    //   isCart: false,
    //   accountId: 1,
    //   purchaseDate: new Date(),
      // cart: [
      //   "product1",
      //   "product2"
      // ]
    //});

    // const order2 = await Order.create({
    //   accountId: 2,
    // });

    // const order3 = await Order.create({
    //   isCart: false,
    //   accountId: 4,
    //   purchaseDate: new Date()
    // });

    // const order4 = await Order.create({
    //   accountId: 4,
    // });

    // Genre
    // const pop = await Genre.create({
    //   name: 'pop',
    // });

    // const rock = await Genre.create({
    //   name: 'rock',
    // });

    // const classical = await Genre.create({
    //   name: 'classical',
    // });

    // const hipHop = await Genre.create({
    //   name: 'hip hop',
    // });

    // LineItem


    // Product
    // const [albums, artists] = await getAlbumData();
   
    
    // const products = await Promise.all(albums.map(async album => {
    //   console.log('SEED Artist name?', album.artists[0].name)
    //   const art = await Artist.findOne({
    //     where: {
    //       spotifyId: album.artists[0].id
    //     },
    //   });
     //console.log("SEED ART", art)
      
      // if(!art){
      
      //   let spotifyArtist = artists.find(art => art.id === album.artists[0].id);
        // const obj = Object.keys(spotifyArtist)
        // console.log("SEED SPOT ART KEYS", obj)
//         art = await Artist.create({
//           name: spotifyArtist.name,
//           spotifyId: spotifyArtist.id,
//           image: spotifyArtist.images[0].url,
//           genre: spotifyArtist.genres[0],
//         });
//        }

//       let prod = await Product.create({
//         title: album.name,
//         price: 999 + Math.ceil(album.popularity / 10) *100,
//         stock: Math.floor(Math.random() * 16),
//         popularity: album.popularity,
//         image: album.images[0].url,
//         spotifyId: album.id,
//         trackTotal: album.total_tracks,
//         releaseDate: album.release_date,
//         label: album.label,
//         artistId: art.id,
//       });

//       album.tracks.items.map(async track => {
//         await Track.create({
//           name: track.name,
//           spotifyId: track.id,
//           length: track.duration_ms,
//           explicit: track.explicit,
//           preview: track.preview_url,
//           productId: prod.id,
//         });
//       });
//       return prod;
//     }));

//     console.log(`
//     Seeding successful!`,);
//   } catch (err) {
//     // seeding failure message
//     console.log(`
//     Seeding Problem! Error in seed Function: ${err}
//     `);
//   }
// };
//     const runSeed = async() => {
//       console.log(`Start seeding...`);
//       try{
//         await seed();
//       }catch(error){
//         console.error(error);
//         process.exitCode = 1;
//       }finally {
//         console.log(`closing db connection`);
//         await db.close();
//         console.log(`db connection closed`);
//       }
//     };

//     if (module === require.main){
//       runSeed();
//     }



    // const product1 = await Product.create({
    //   title: 'Flower Boy - Tyler the Creator',
    //   price: 99.99,
    //   stock: 10,
    //   image: 'https://i.imgur.com/MZAcECn.png',
    //   description: 'The more important takeaway from the two songs, and by extension, Scum F*** Flower Boy as a whole, is that the Odd Future ex-leader delivers the most introspective and honest album of his career. Thats not to say his previous efforts lacked true self reflection.But, on Flower Boy, the bars come not from a place of angst & strife; Tyler has grown up, and he waxes poetic about loneliness, success, sexuality, love, and etc.without choosing to take on delirious, violent alter - egos.',
    // });

    // const product2 = await Product.create({
    //   title: 'The Psychedelic Sounds - The 13th Floor Elevators',
    //   price: 12.50,
    //   stock: 15,
    //   image: 'https://i.imgur.com/GI9lCcj.png',
    //   description: 'Colored vinyl 2LP reissue of The 13th Floor Elevators incendiary debut album from 1966 featuring newly remastered mono mixes plus the original stereo mix in the bands intended running order. Previously only available as part of the award-winning Music Of The Spheres boxset, this is the first reissue in over four decades was sourced from original tapes for the stereo version.',
    // });

    // const product3 = await Product.create({
    //   title: 'The Number Of The Beast - Iron Maiden',
    //   price: 10.99,
    //   stock: 25,
    //   image: 'https://i.imgur.com/hQw5iCB.png',
    //   description: 'TENTH STUDIO ALBUM FROM EAST LONDONS IRON MAIDEN.The X Factor was originally recorded between 1994 and 1995, and was the first to feature Blaze Bayley on vocals.Eleven tracks in all.Released by Sanctuary Records on 180 gram double vinyl housed in a gatefold sleeve with a fold out insert.',
    // });

    // const product4 = await Product.create({
    //   title: 'Acid Rap - Chance the Rapper',
    //   price: 5.00,
    //   stock: 10,
    //   image: 'https://i.imgur.com/0H3SsJa.png',
    //   description: 'This album is great. It emanates a positive vibe and is what introduced a lot of people to Chance the Rapper. On this album, he is quite unrestrained. He has weird adlibs (igh) which I somehow got used to. Some people say that he has an annoying voice but I think his voice goes really well with the instrumentals on here. Song like: Cocoa Butter Kisses, Pusha Man, Juice and Favourite Song are highlights on this album for me. ',
    // });

    // const product5 = await Product.create({
    //   title: 'Acid Rap - Chance the Rapper',
    //   price: 5.00,
    //   stock: 10,
    //   image: 'https://i.imgur.com/0H3SsJa.png',
    //   description: 'lorem ipsum some text for product4...',
    // });

    // const product6 = await Product.create({
    //   title: 'The Number Of The Beast - Iron Maiden',
    //   price: 10.99,
    //   stock: 25,
    //   image: 'https://i.imgur.com/hQw5iCB.png',
    //   description: 'lorem ipsum some text for product3...',
    // });

    // const product7 = await Product.create({
    //   title: 'The Psychedelic Sounds - The 13th Floor Elevators',
    //   price: 12.50,
    //   stock: 15,
    //   image: 'https://i.imgur.com/GI9lCcj.png',
    //   description: 'lorem ipsum some text for product2...',
    // });

    // const product8 = await Product.create({
    //   title: 'Flower Boy - Tyler the Creator',
    //   price: 99.99,
    //   stock: 10,
    //   image: 'https://i.imgur.com/MZAcECn.png',
    //   description: 'lorem ipsum some text for product1...',
    // });

    // seeding successful message
    // await product3.createLineitem()
    // await product1.createLineitem()
    // await product3.createLineitem()
    // await product1.createLineitem()
    // const test = await product3.getLineitem()
    // test.dataValues.quantity = product3.stock
    // await product3.setLineitem([1])
    // console.log(`
    // Seeding successful!`,);

      // "Order Special Methods:" , Object.keys(Order.prototype),
      // "Product Special Methods:", Object.keys(Product.prototype),
      // "Order Special Methods:", Object.keys(LineItem.prototype)
      // test
  //   );
  // } catch (err) {
    // seeding failure message
//     console.log(`
//     Seeding Problem! Error in syncAndSeed Function: ${err}
//     `);
//   }
// };

// module.exports = {
//   db,
//   seed,
//   Account,
//   Order,
//   Track,
//   Artist,
//   LineItem,
//   Product,
// };
