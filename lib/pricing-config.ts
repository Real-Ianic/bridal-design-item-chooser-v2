export const PRICING_CONFIG = {
  basePackagePrice: 7088,
  photography: {
    kentWong: {
      id: 1,
      name: "Kent Wong",
      price: 7088,
      description: "Professional photographer",
    },
    superpandaJoseDaniel: {
      id: 2,
      name: "Superpanda Jose Daniel",
      price: 9088,
      description: "Premium photographer",
      topUp: 1
    },
  },
  videography: {
    stephLeeFilms: {
      id: 1,
      name: "Steph Lee Films",
      price: 7088,
      description: "Standard videography",
    },
    superpandaJoseDaniel: {
      id: 2,
      name: "Superpanda Jose Daniel",
      price: 9588,
      description: "Premium",
      topUp: 1,
    },
    okraFilms: {
      id: 3,
      name: "Okra Films",
      price: 9088,
      description: "Creative style",
      topUp: 1,
    },
    highestKite: {
      id: 4,
      name: "Highest Kite",
      price: 10088,
      description: "Cinematic",
      topUp: 1,
    },
  },
  hairMakeup: {
    atelierMakeup: {
      vendor: "Autelier Make-up",
      options: [
        { id: "a1", name: "Senior and Lead MUA", price: 7088 },
        { id: "a2", name: "Director MUA", price: 7888, topUp: 1 },
        { id: "a3", name: "Principal MUA", price: 8288, topUp: 1 },
      ],
    },
    alyciaTan: {
      vendor: "Alycia Tan",
      options: [{ id: "b1", name: "Alycia Tan", price: 7088, topUp: 1 }],
    },
    makeupRoom: {
      vendor: "The Make-up Room",
      options: [
        { id: "c1", name: "Senior MUA", price: 7688, topUp: 1 },
        { id: "c2", name: "Director MUA", price: 8088, topUp: 1 },
      ],
    },
  },
  freshLooks: {
    oneLook: {
      id: 1,
      name: "1 Look",
      price: 7088,
      description: "Single fresh look",
    },
    twoLooks: {
      id: 2,
      name: "2 Looks",
      price: 7588,
      topUp: 1,
      description: "Two fresh looks",
    },
  },
  florist: {
    price: 788,
    description: "Professional florist services",
  },
}
