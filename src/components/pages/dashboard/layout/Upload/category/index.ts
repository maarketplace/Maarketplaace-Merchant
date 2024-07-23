interface Category {
    name: string;
    subcategories: string[];
}

export const categories: { [key: string]: Category } = {
    "Non-Fiction": {
        name: "Non-Fiction",
        subcategories: [
            "Biographies & Memoirs",
            "Self-Help",
            "Business & Economics",
            "Technology",
            "Science & Nature",
            "History",
            "Health & Fitness",
        ],
    },
    "Academic & Education": {
        name: "Academic & Education",
        subcategories: [
            "Textbooks",
            "Study Guides",
            "Language Learning",
            "Reference",
        ],
    },
    "Religion & Spirituality": {
        name: "Religion & Spirituality",
        subcategories: [
            "Christianity",
            "Eastern Religions",
            "New Age & Spirituality",
        ],
    },
};

// interface Category {
//     name: string;
//     subcategories: string[];
// }

// export const categories: { [key: string]: Category } = {
//     nonfiction: { name: 'Non-Fiction', subcategories: ['Laptops', 'Smartphones', 'Cameras', 'Computer and Laptops', 'Smartphones and Tablets', 'Tvs', 'Headphones'] },
//     Clothings: { name: 'Apparels and Accessories', subcategories: ['Shirts', 'Pants', 'Shoes', 'Men`s Clothing', 'Women`s Clothing', 'Belts', 'hats', 'Scarves', 'Glass'] },
//     Kitchen: { name: 'Home and Kitchen', subcategories: ['furniture', 'Kitchen Appliances', 'Home Decor', 'Bedding and Bath', 'Cleaning Supplies'] },
//     Beauty: { name: 'Health and Beauty', subcategories: ['Skincare', 'Haircare', 'Vitamins and Supplements', 'Hygiene Products'] },
//     Sports: { name: 'Sports and Outdoor', subcategories: ['Fitness Equipment', 'Sports Apparel', 'Camping and Hiking Gear', 'Cycling Accessories', 'Swimming Accessories', 'Football Accessories', 'Outdoor Reacreation'] },
//     Games: { name: 'Toys and Games', subcategories: ['Action Figures and Dolls', 'Board Games and Puzzles', 'Educational Toys', 'Outdoor Play', 'Video Games and Consoles'] },
//     Books: { name: "Books and Media", subcategories: ['Fiction', 'Non-Fiction', 'eBooks and Audiobooks', 'Movies and Tv shows', 'Music cds and Vinyls'] },
//     Office: { name: 'Office Supllies', subcategories: ['Desk Accessories', 'Satitionary', 'Writting Instruments', 'Organization and storage', 'Office Electronics'] },

// };