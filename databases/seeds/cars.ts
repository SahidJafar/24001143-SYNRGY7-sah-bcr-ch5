import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("cars").del();

    // Inserts seed entries
    await knex("cars").insert([
        { 
            id: 1, 
            plate: "DBH-3491",
            manufacture:"Ford",
            model:"F150",
            image:"https://cdn.carbuzz.com/gallery-images/1600x900/700000/700000/700000-1.jpg",
            image_public_id: "car01",
            rent_per_day:200000,
            capacity:2,
            description:"Brake assist. Leather-wrapped shift knob. Glove box lamp. Air conditioning w/in-cabin microfilter.",
            available_at:"2022-03-23T15:49:05.563Z",
            transmission:"automatic",
            available:true,
            type:"Sedan",
            year:2022,
        },
        { 
            id: 2, 
            plate: "WXB-3984",
            manufacture:"BMW",
            model:"X5",
            image:"https://cdn.carbuzz.com/gallery-images/1600x900/700000/700000/700000-1.jpg",
            image_public_id: "car02",
            rent_per_day:800000,
            capacity:6,
            description:"Rear passenger map pockets. Electrochromic rearview mirror. Dual chrome exhaust tips. Locking glove box.",
            available_at:"2022-03-23T15:49:05.563Z",
            transmission:"automatic",
            available:false,
            type:"Convertible",
            year:2019,
        },
    ]);
};
