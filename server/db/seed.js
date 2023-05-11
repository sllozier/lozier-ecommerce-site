const { db, Account, Artist, Product, Track, Order, LineItem } = require("./");

const getAlbumData = require("./spotify");
const getPeoples = require("./peoples");

const seed = async () => {
  try {
    console.log(`Seeding started...`);
    await db.sync({ force: true });

    // Accounts
    const accountData = await getPeoples();
    const accounts = await Promise.all(
      accountData.map((account) => Account.create(account))
    );

    const admin = await Account.create({
      firstName: "Boss",
      lastName: "Admin",
      username: "admin",
      password: "password",
      email: "bossAdmin@email.com",
      isAdmin: true,
    });
    //await Order.create({ accountId: admin.id });

    const user = await Account.create({
      firstName: "Peep",
      lastName: "User",
      username: "user",
      password: "password",
      email: "peepUser@email.com",
      isAdmin: false,
    });
    // await Order.create({ accountId: user.id });

    //ORDER
    const order1 = await Order.create({
      isCart: false,
      accountId: 1,
      purchaseDate: new Date(),
      // cart: [
      //   "product1",
      //   "product2"
      // ]
    });

    const order2 = await Order.create({
      accountId: 2,
    });

    const order3 = await Order.create({
      isCart: false,
      accountId: 4,
      purchaseDate: new Date(),
    });

    const order4 = await Order.create({
      accountId: 4,
    });

    // Product
    const [albums, artists] = await getAlbumData();
    const products = await Promise.all(
      albums.map(async (album) => {
        let art = await Artist.findOne({
          where: {
            spotifyId: album.artists[0].id,
          },
        });

        if (!art) {
          let spotifyArtist = artists.find(
            (art) => art.id === album.artists[0].id
          );
          art = await Artist.create({
            name: spotifyArtist.name,
            spotifyId: spotifyArtist.id,
            image: spotifyArtist.images[0].url,
            genre: spotifyArtist.genres[0],
          });
        }

        let prod = await Product.create({
          name: album.name,
          price: (album.popularity / 10) * 10.05,
          stock: Math.floor(Math.random() * 16),
          popularity: album.popularity,
          image: album.images[0].url,
          spotifyId: album.id,
          trackTotal: album.total_tracks,
          releaseDate: album.release_date,
          label: album.label,
          artistId: art.id,
        });

        album.tracks.items.map(async (track) => {
          await Track.create({
            name: track.name,
            spotifyId: track.id,
            length: track.duration_ms,
            explicit: track.explicit,
            preview: track.preview_url,
            image: track.image,
            productId: prod.id,
          });
        });
        return prod;
      })
    );

    //LOAD ORDERS
    // for (let i = 0; i < 100; i++) {
    //   //every 4th order is active
    //   const order = await Order.create({ complete: !(i % 4 === 0) });

    //   //get available products
    //   const available = products.filter((prod) =>
    //     order.complete ? prod : prod.stock
    //   );
    //   //give each order between 0 and 4 random albums
    //   for (let j = 0; j < Math.ceil(Math.random() * 4); j++) {
    //     //grab a random product, make a lineItem
    //     const curProd = available[Math.floor(Math.random() * available.length)];
    //     // ensure only new lineItems are added in seed
    //     const isNew = (await order.getProducts()).every(
    //       (item) => item.productId !== curProd.id
    //     );

    //     if (isNew && curProd.stock > 0)
    //       await curProd.createLineitem({
    //         quantity: Math.ceil(Math.random() * curProd.stock),
    //         orderId: order.id,
    //       });
    //   }

    //   //give 25 accounts 4 orders, rest an empty cart
    //   await accounts[Math.floor(i / 4)].addOrder(order);
    //   if (i >= 25) await (await Order.create()).setAccount(accounts[i]);
    // }

    // console.log(
    //   `Seeding successful!`,
    //   "Order Special Methods:",
    //   Object.keys(Order.prototype),
    //   "Product Special Methods:",
    //   Object.keys(Product.prototype),
    //   "Line Item Special Methods:",
    //   Object.keys(LineItem.prototype)
    // );
  } catch (error) {
    console.log(`Seeding Problem! Error in seed Function: ${error}`);
  }
};
const runSeed = async () => {
  console.log(`Start seeding...`);
  try {
    await seed();
  } catch (error) {
    console.error("RUN SEED ERROR", error);
    process.exitCode = 1;
  }
};

if (module === require.main) {
  runSeed();
}

module.exports = seed;

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
