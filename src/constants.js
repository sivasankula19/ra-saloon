import beard_grooming from './assets/beard_grooming.jpg';
import blow_dry_finish from './assets/blow_dry_finish.jpg';
import custom_tatto_art from './assets/custom_tatto_art.jpg';
import hair_coloring from './assets/hair_coloring.jpg';
import mens_haircut from './assets/mens_haircut.jpg';
import precision_cuts from './assets/precision_cuts.jpg';
import tatto_men from './assets/tatto_men.jpg';
import tatto_women from './assets/women_tatto2.jpg';
import womens_styling from './assets/womens_styling.jpg';

export const gallery = [
    { img: mens_haircut, label: "Men's Haircut" },
    { img: womens_styling, label: "Women's Styling" },
    { img: beard_grooming, label: "Beard Grooming" },
    { img: hair_coloring, label: "Hair Coloring" },
    { img: blow_dry_finish, label: "Blow Dry & Finish" },
    { img: precision_cuts, label: "Precision Cuts" },
    { img: tatto_men, label: "Tattoo – Men" },
    { img: tatto_women, label: "Tattoo – Women" },
    { img: custom_tatto_art, label: "Custom Tattoo Art" },
]

export const services = [
    {
        category: "Hair", icon: "✂️", items: [
            { name: "Haircut (Men)", price: 150 },
            { name: "Haircut (Women)", price: 300 },
            { name: "Kids Haircut", price: 100 },
            { name: "Hair Wash & Blow Dry", price: 250 },
            { name: "Hair Straightening", price: 1200 },
            { name: "Keratin Treatment", price: 2500 },
            { name: "Hair Coloring", price: 800 },
            { name: "Hair Highlights", price: 1500 },
        ]
    },
    {
        category: "Skin", icon: "✨", items: [
            { name: "Basic Facial", price: 400 },
            { name: "Cleanup", price: 250 },
            { name: "De-Tan Pack", price: 350 },
            { name: "Gold Facial", price: 800 },
            { name: "Threading (Eyebrows)", price: 50 },
            { name: "Threading (Upper Lip)", price: 30 },
        ]
    },
    {
        category: "Nails", icon: "💅", items: [
            { name: "Manicure (Basic)", price: 300 },
            { name: "Pedicure (Basic)", price: 350 },
            { name: "Gel Nails", price: 700 },
            { name: "Nail Art", price: 500 },
        ]
    },
    {
        category: "Grooming", icon: "🪒", items: [
            { name: "Shave (Men)", price: 100 },
            { name: "Beard Trim", price: 80 },
            { name: "Beard Styling", price: 150 },
            { name: "Head Massage", price: 200 },
            { name: "Body Waxing (Arms)", price: 300 },
            { name: "Body Waxing (Legs)", price: 400 },
        ]
    },
    {
        category: "Tattoos", icon: "🖊️", items: [
            { name: "Small Tattoo – Men (upto 2\")", price: 800 },
            { name: "Small Tattoo – Women (upto 2\")", price: 800 },
            { name: "Medium Tattoo – Men (2\"–5\")", price: 2000 },
            { name: "Medium Tattoo – Women (2\"–5\")", price: 2000 },
            { name: "Large Tattoo – Men (5\"+)", price: 4000 },
            { name: "Large Tattoo – Women (5\"+)", price: 4000 },
            { name: "Full Sleeve – Men", price: 12000 },
            { name: "Full Sleeve – Women", price: 10000 },
            { name: "Half Sleeve – Men", price: 7000 },
            { name: "Half Sleeve – Women", price: 6000 },
            { name: "Finger / Wrist Tattoo", price: 500 },
            { name: "Neck / Behind Ear Tattoo", price: 1200 },
            { name: "Custom Design Tattoo", price: 1500 },
            { name: "Cover-up Tattoo", price: 3000 },
            { name: "Tattoo Touch-up", price: 600 },
            { name: "Temporary Tattoo", price: 200 },
        ]
    },
];

export const reviews = [
    { name: "Priya S.", text: "Amazing haircut! The staff is so friendly and the salon is super clean. Best in Gachibowli!", stars: 5 },
    { name: "Rahul M.", text: "Got a beard styling done here. Absolutely professional work. Will come back!", stars: 5 },
    { name: "Sneha K.", text: "Keratin treatment was done perfectly. My hair feels amazing. Great value for money!", stars: 5 },
    { name: "Vikram R.", text: "Very hygienic place with skilled staff. The gold facial was worth every rupee.", stars: 4 },
    { name: "Arjun T.", text: "Got my first tattoo here — the artist was super skilled and hygienic. Loved the result!", stars: 5 },
    { name: "Divya M.", text: "Got a small wrist tattoo and it came out absolutely beautiful. Very clean studio!", stars: 5 },
];

