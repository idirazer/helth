const product = require('../medicament');
const mongoClient = require('mongoose');

mongoClient.connect("mongodb://localhost:27017/Health_CareDB", {
    useNewUrlParser: true
  })
  .then((response) => {
    console.log("MongoDB Connected Successfully.");
  })
  .catch((err) => {
    console.log("Database connection failed.");
  });


const products = [
  new product({
    imgePath: '/images/medecines/mucoangin20mg.jpg ',
    productName: 'Mucoangin',
    information: {
      utilisation: 'Mint',
      Quantum: 0,
      quantite: '20mg',
      consigne: 'COMPRIME',
    },
    price: 12000,

  }),


  new product({
    imgePath: '/images/medecines/doliprane-1000mg.jpg ',
    productName: 'doliprane',
    information: {
      utilisation: 'Paracétamol',
      Quantum: 0,
      quantite: '1000mg',
      consigne: 'CMPRIME',
    },
    price: 62.50,

  }),
  new product({
    imgePath: '/images/medecines/proton20mg.jpg ',
    productName: 'Proton',
    information: {
      utilisation: 'Oméprazole',
      Quantum: 0,
      quantite: '20mg',
      consigne: 'GLES.MICROGRAN/GAST.RESIST',
    },
    price: 12000,

  }),
  new product({
    imgePath: '/images/medecines/amoclan500mg.jpg ',
    productName: 'Amoclan',
    information: {
      utilisation: 'Amoxilcilline Trihydratee/Acide Clavulanique pota',
      Quantum: 0,
      quantite: '500mg/62.5mg',
      consigne: 'PDRE SUSP BUV SACHET',
    },
    price: 458.08,

  }),
  new product({
    imgePath: '/images/medecines/appetit-plus.jpg ',
    productName: 'apetit',
    information: {
      utilisation: 'Complément alimentaire',
      Quantum: 0,
      quantite: '150ml',
      consigne: 'SIROP',
    },
    price: 00,

  }),
  new product({
    imgePath: '/images/medecines/arthrofit.png ',
    productName: 'Arthofit',
    information: {
      utilisation: 'Complément alimentaire',
      Quantum: 0,
      quantite: '750mg',
      consigne: 'COMPRIME',
    },
    price: 00,

  }),
  new product({
    imgePath: '/images/medecines/aspirine_vit_c_eff.png ',
    productName: 'Aspirine UPSA VITAMINE C TAMPONEE EFFERVESCENT',
    information: {
      utilisation: 'Acide acetylsalicylique/ acide ascorbique',
      Quantum: 0,
      quantite: '330mg/200mg',
      consigne: 'COMP.EFFERV',
    },
    price: 00,

  }),
  new product({
    imgePath: '/images/medecines/Calcium400mg.jpg ',
    productName: 'Calcium',
    information: {
      utilisation: 'Das gendus plus',
      Quantum: 0,
      quantite: '400mg',
      consigne: 'COMP.EFFERVESCENT',
    },
    price: 00,

  }),
  new product({
    imgePath: '/images/medecines/calcibronat-2g.jpg ',
    productName: 'Calcibronat',
    information: {
      utilisation: 'CALCIBRONAT',
      Quantum: 0,
      quantite: '',
      consigne: 'COMP.EFFERVESCENT',
    },
    price: 00,

  }),
  new product({
    imgePath: '/images/medecines/cardio.png ',
    productName: 'Cardio',
    information: {
      utilisation: 'Cardiofit plu',
      Quantum: 0,
      quantite: '37.08gr',
      consigne: 'COMPRIME',
    },
    price: 12000,

  }),
  new product({
    imgePath: '/images/medecines/charbonel+.jpg ',
    productName: 'Charbonel+',
    information: {
      utilisation: 'Complément alimentaire',
      Quantum: 0,
      quantite: '',
      consigne: 'COMP.ENRO',
    },
    price: 00,

  }),
  new product({
    imgePath: '/images/medecines/confortbebe.png ',
    productName: 'Confort bebe',
    information: {
      utilisation: 'Complément alimentaire',
      Quantum: 0,
      quantite: '30ml',
      consigne: 'Goutes',
    },
    price: 00,

  }),
  new product({
    imgePath: '/images/medecines/confortcolique.png ',
    productName: 'Confort colique',
    information: {
      utilisation: 'Complément alimentaire',
      Quantum: 0,
      quantite: '150ml',
      consigne: 'SIROP',
    },
    price: 00,

  }),
  new product({
    imgePath: '/images/medecines/dolopatch.jpg ',
    productName: 'Dolopatch',
    information: {
      utilisation: 'Hydro-Gel',
      Quantum: 0,
      quantite: '12cm x 8cm',
      consigne: 'GEL',
    },
    price: 00,

  }),
  new product({
    imgePath: '/images/medecines/dolorol.jpg ',
    productName: 'Dolorol',
    information: {
      utilisation: 'Dolorol',
      Quantum: 0,
      quantite: 'x',
      consigne: 'OIL',
    },
    price: 00,

  }),


  new product({
    imgePath: '/images/medecines/lactofibre.png ',
    productName: 'Lactofibre',
    information: {
      utilisation: 'Complément alimentaire',
      Quantum: 0,
      quantite: '100ml',
      consigne: 'SIROP',
    },
    price: 00,

  }),
  new product({
    imgePath: '/images/medecines/maalox.jpg ',
    productName: 'Maalox',
    information: {
      utilisation: 'Maux d estomac',
      Quantum: 0,
      quantite: '460mg/400mg',
      consigne: 'GOUTES',
    },
    price: 00,

  }),
  new product({
    imgePath: '/images/medecines/Mivolis-DAS-gesunde-PLUS-Hair-Vital-Vitamin-Complex-With-Zinc-60-Capsules.jpg ',
    productName: 'Mivolis',
    information: {
      utilisation: 'Haar vital komplex',
      Quantum: 0,
      quantite: 'x',
      consigne: 'COMP.EFFERVESCENT',
    },
    price: 00,

  }),
  new product({
    imgePath: '/images/medecines/Mivolis-DAS-Gesunde-PLUS-Multivitamin-Bears-For-Children-60-bears.jpg ',
    productName: 'Mivolis for Children 60 bears',
    information: {
      utilisation: 'Multi-vitamine Barchen',
      Quantum: 0,
      quantite: 'x',
      consigne: 'COMPRIME',
    },
    price: 00,

  }),
  new product({
    imgePath: '/images/medecines/Mivolis-DAS-gesunde-PLUS-Multivitamins-for-Children-20-Lozenges.jpg ',
    productName: 'Mivolis for Children 20 Lozenges',
    information: {
      utilisation: 'Multivitamine',
      Quantum: 0,
      quantite: 'x',
      consigne: 'COMPRIME',
    },
    price: 00,

  }),
  new product({
    imgePath: '/images/medecines/Mivolis-Eyes-Vitamin-Complex-30-Capsules.jpg ',
    productName: 'Mivolis Eyes Vitamin',
    information: {
      utilisation: 'Augen kapseln',
      Quantum: 0,
      quantite: '',
      consigne: 'COMPRIME',
    },
    price: 00,

  }),
  new product({
    imgePath: '/images/medecines/movitebPHY00471.jpg ',
    productName: 'Moviteb',
    information: {
      utilisation: 'Nosée Remontée acides',
      Quantum: 0,
      quantite: '200ml',
      consigne: 'SIROP',
    },
    price: 00,

  }),
  new product({
    imgePath: '/images/medecines/pansements.jpg ',
    productName: 'Pansements',
    information: {
      utilisation: 'Secoplast',
      Quantum: 0,
      quantite: '6cm x 1cm',
      consigne: 'PANCEMENT',
    },
    price: 00,

  }),
  new product({
    imgePath: '/images/medecines/penival1500000.png ',
    productName: 'Penival',
    information: {
      utilisation: 'Phenoxymethylprnicilline s/f potassique',
      Quantum: 0,
      quantite: '1500000UI',
      consigne: 'COMP.SEC',
    },
    price: 275.88,

  }),
  new product({
    imgePath: '/images/medecines/relaxkid.png ',
    productName: 'Relax kid',
    information: {
      utilisation: 'Complément alimentaire',
      Quantum: 0,
      quantite: '30ml',
      consigne: 'SIROP',
    },
    price: 00,

  }),
  new product({
    imgePath: '/images/medecines/santévieconcepation.jpg ',
    productName: 'Tisane Santé vie concepation',
    information: {
      utilisation: 'Snté vie',
      Quantum: 0,
      quantite: 'x',
      consigne: 'TISANE',
    },
    price: 00,

  }),
  new product({
    imgePath: '/images/medecines/vitaminD3nutravia.jpg ',
    productName: 'Vitamin D3 nutravia',
    information: {
      utilisation: 'Nutravia',
      Quantum: 0,
      quantite: '10.000 IU',
      consigne: 'COMPRIME',
    },
    price: 00,

  }),
  new product({
    imgePath: '/images/medecines/vitamine-d3.jpg ',
    productName: 'Vitamine D3 B.O.N',
    information: {
      utilisation: 'Cholecalciferol',
      Quantum: 0,
      quantite: '200 000 UI/1ML',
      consigne: 'SOLUSION INJECTABLE ET BUVALE',
    },
    price: 00,

  }),


  new product({
    imgePath: '/images/medecines/vomitebPHY00470.jpg ',
    productName: 'Vomiteb comprimés',
    information: {
      utilisation: 'Nosée remontée acides',
      Quantum: 0,
      quantite: 'x',
      consigne: 'COMPRIME',
    },
    price: 00,

  }),

  new product({
    imgePath: '/images/medecines/Zinc.png ',
    productName: 'Zinc',
    information: {
      utilisation: 'Zinc sci farma',
      Quantum: 0,
      quantite: '500mg',
      consigne: 'COMPRIME',
    },
    price: 00,

  }),


]
var done = 0;
for (var i = 0; i < products.length; i++) {
  products[i].save((error, doc) => {
    if (error) {
      console.log(error)
    }
    console.log(doc)
    done++
    if (done == products.length) {
      mongoClient.disconnect();
    }

  })

}