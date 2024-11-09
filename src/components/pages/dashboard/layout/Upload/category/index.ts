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