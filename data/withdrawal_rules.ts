// withdrawal_rules.ts

export interface WithdrawalRules {
  [drug: string]: {
    [animal_product: string]: number;
  };
}

export const withdrawal_rules: WithdrawalRules = {
  Albendazole: {
    cattle_muscle: 14,
    cattle_milk: 3,
    goat_muscle: 7,
    goat_milk: 4,
  },
  Amoxicillin: {
    cattle_muscle: 21,
    cattle_milk: 3,
    sheep_muscle: 19,
    sheep_milk: 3,
    pig_muscle: 24,
  },
  Benzylpenicillin: {
    cattle_muscle: 14,
    cattle_milk: 3,
    chicken_muscle: 7,
    pig_muscle: 15,
  },
  Ampicillin: {
    finfish: 10,
  },
  Oxytetracycline: {
    cattle_muscle: 14,
    cattle_milk: 5,
    fish_muscle: 14,
    pig_muscle: 14,
    poultry_muscle: 14,
    sheep_muscle: 14,
    sheep_milk: 5,
  },
  Colistin: {
    cattle_muscle: 7,
    cattle_milk: 3,
    sheep_muscle: 7,
    sheep_milk: 3,
    goat_muscle: 7,
    pig_muscle: 7,
    chicken_muscle: 7,
    turkey_muscle: 7,
    rabbit_muscle: 7,
  },
  Streptomycin: {
    cattle_muscle: 14,
    cattle_milk: 7,
    chicken_muscle: 14,
    pig_muscle: 14,
    sheep_muscle: 14,
    sheep_milk: 7,
  },
  Erythromycin: {
    chicken_muscle: 7,
    chicken_eggs: 7,
    turkey_muscle: 7,
  },
  Oxfendazole: {
    cattle_muscle: 14,
    cattle_milk: 7,
    goat_muscle: 7,
    sheep_muscle: 7,
    sheep_milk: 7,
  },
  Gentamicin: {
    cattle_muscle: 100,
    pig_muscle: 100,
  },
  Neomycin: {
    cattle_muscle: 30,
    cattle_milk: 3,
    chicken_muscle: 30,
    duck_muscle: 30,
    goat_muscle: 30,
    sheep_muscle: 30,
  },
  Tylosin: {
    cattle_muscle: 14,
    cattle_milk: 3,
    pig_muscle: 14,
    chicken_muscle: 14,
    chicken_eggs: 7,
  },
  Ractopamine: {
    cattle_muscle: 1,
    pig_muscle: 1,
  },
  Clenbuterol: {
    cattle_muscle: 0,
    sheep_muscle: 0,
    pig_muscle: 0,
  },
  Zilpaterol: {
    cattle_muscle: 1,
    pig_muscle: 1,
  },
  Trenbolone: {
    cattle_muscle: 0,
    pig_muscle: 0,
  },
  "Melengestrol acetate": {
    cattle_muscle: 0,
    cattle_milk: 0,
  },
  Zeranol: {
    cattle_muscle: 0,
    sheep_muscle: 0,
  },
  Testosterone: {
    cattle_muscle: 0,
    pig_muscle: 0,
  },
  Progesterone: {
    cattle_muscle: 0,
    cow_milk: 0,
  },
  Ivermectin: {
    cattle_muscle: 28,
    cattle_milk: 7,
    sheep_muscle: 21,
    goat_muscle: 21,
    pig_muscle: 21,
  },
  Doramectin: {
    cattle_muscle: 35,
    cattle_milk: 7,
    sheep_muscle: 28,
    pig_muscle: 28,
  },
  Moxidectin: {
    cattle_muscle: 28,
    cattle_milk: 7,
    sheep_muscle: 28,
    goat_muscle: 28,
  },
  Closantel: {
    cattle_muscle: 28,
    sheep_muscle: 28,
    goat_muscle: 28,
  },
  Levamisole: {
    cattle_muscle: 7,
    sheep_muscle: 7,
    goat_muscle: 7,
    pig_muscle: 7,
  },
};