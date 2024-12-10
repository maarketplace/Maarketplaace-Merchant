interface CourseSubCategory {
    id: string;
    name: string;
  }
  
  interface CourseCategory {
    id: string;
    name: string;
    courseSubcategories: CourseSubCategory[];
  }
  
  const courseCategories: CourseCategory[] = [
    {
      id: "1",
      name: "Business and Entrepreneurship",
      courseSubcategories: [
        { id: "1.1", name: "Startups and Business Strategy" },
        { id: "1.2", name: "Sales and Marketing" },
        { id: "1.3", name: "Leadership and Management" },
        { id: "1.4", name: "Finance and Accounting" },
        { id: "1.5", name: "Productivity and Time Management" },
      ],
    },
    {
      id: "2",
      name: "Technology and Software",
      courseSubcategories: [
        { id: "2.1", name: "Coding and Programming (Python, Java, etc.)" },
        { id: "2.2", name: "Web Development (HTML, CSS, JavaScript)" },
        { id: "2.3", name: "Data Science and Analytics" },
        { id: "2.4", name: "Cybersecurity" },
        { id: "2.5", name: "Artificial Intelligence and Machine Learning" },
      ],
    },
    {
      id: "3",
      name: "Creative Arts",
      courseSubcategories: [
        { id: "3.1", name: "Graphic Design" },
        { id: "3.2", name: "Photography and Videography" },
        { id: "3.3", name: "Music Production" },
        { id: "3.4", name: "Writing and Storytelling" },
        { id: "3.5", name: "Film and Animation" },
      ],
    },
    {
      id: "4",
      name: "Health and Wellness",
      courseSubcategories: [
        { id: "4.1", name: "Fitness and Nutrition" },
        { id: "4.2", name: "Mental Health and Mindfulness" },
        { id: "4.3", name: "Yoga and Meditation" },
        { id: "4.4", name: "Health Coaching" },
        { id: "4.5", name: "First Aid and Emergency Response" },
      ],
    },
    {
      id: "5",
      name: "Lifestyle and Personal Development",
      courseSubcategories: [
        { id: "5.1", name: "Public Speaking" },
        { id: "5.2", name: "Communication and Relationships" },
        { id: "5.3", name: "Career Development and Job Search" },
        { id: "5.4", name: "Travel and Adventure Skills" },
        { id: "5.5", name: "Fashion and Beauty" },
      ],
    },
    {
      id: "6",
      name: "Education and Teaching",
      courseSubcategories: [
        { id: "6.1", name: "Teaching Methodologies" },
        { id: "6.2", name: "Language Learning (English, Spanish, etc.)" },
        { id: "6.3", name: "Special Needs Education" },
        { id: "6.4", name: "Exam Preparation (GRE, IELTS, etc.)" },
        { id: "6.5", name: "Online Course Creation" },
      ],
    },
    {
      id: "7",
      name: "Finance and Investment",
      courseSubcategories: [
        { id: "7.1", name: "Stock Market and Trading" },
        { id: "7.2", name: "Cryptocurrency and Blockchain" },
        { id: "7.3", name: "Real Estate Investment" },
        { id: "7.4", name: "Personal Finance Management" },
        { id: "7.5", name: "Investment Strategies" },
      ],
    },
    {
      id: "8",
      name: "Marketing and Social Media",
      courseSubcategories: [
        { id: "8.1", name: "Social Media Management" },
        { id: "8.2", name: "Content Marketing" },
        { id: "8.3", name: "SEO and Digital Advertising" },
        { id: "8.4", name: "Email Marketing" },
        { id: "8.5", name: "Branding and PR" },
      ],
    },
    {
      id: "9",
      name: "Science and Engineering",
      courseSubcategories: [
        { id: "9.1", name: "Physics, Chemistry, and Biology" },
        { id: "9.2", name: "Mechanical and Civil Engineering" },
        { id: "9.3", name: "Electrical Engineering" },
        { id: "9.4", name: "Environmental Science" },
        { id: "9.5", name: "Robotics" },
      ],
    },
    {
      id: "10",
      name: "Skills and Certifications",
      courseSubcategories: [
        { id: "10.1", name: "Project Management (PMP, Agile)" },
        { id: "10.2", name: "IT Certifications (AWS, Microsoft, etc.)" },
        { id: "10.3", name: "Language Certifications (TOEFL, DELF)" },
        { id: "10.4", name: "Design Certifications (Adobe Suite)" },
        { id: "10.5", name: "Health Certifications (CPR, Fitness Trainer)" },
      ],
    },
    {
      id: "11",
      name: "Arts and Humanities",
      courseSubcategories: [
        { id: "11.1", name: "History and Archaeology" },
        { id: "11.2", name: "Philosophy and Ethics" },
        { id: "11.3", name: "Literature Studies" },
        { id: "11.4", name: "Political Science" },
        { id: "11.5", name: "Sociology" },
      ],
    },
    {
      id: "12",
      name: "Agriculture and Environment",
      courseSubcategories: [
        { id: "12.1", name: "Sustainable Farming" },
        { id: "12.2", name: "Agribusiness" },
        { id: "12.3", name: "Gardening and Landscaping" },
        { id: "12.4", name: "Climate Change and Conservation" },
        { id: "12.5", name: "Food Security" },
      ],
    },
    {
      id: "13",
      name: "Legal and Government",
      courseSubcategories: [
        { id: "13.1", name: "Legal Studies" },
        { id: "13.2", name: "Human Rights and Advocacy" },
        { id: "13.3", name: "Public Administration" },
        { id: "13.4", name: "Criminology and Law Enforcement" },
        { id: "13.5", name: "Policy Making" },
      ],
    },
    {
      id: "14",
      name: "Kids and Teen Learning",
      courseSubcategories: [
        { id: "14.1", name: "Coding for Kids" },
        { id: "14.2", name: "STEM for Kids" },
        { id: "14.3", name: "Creative Writing for Teens" },
        { id: "14.4", name: "Financial Literacy for Young Adults" },
        { id: "14.5", name: "Arts and Crafts" },
      ],
    },
  ];
  
  export default courseCategories;
  

 export  const courseLocations = [
    "Telegram",
    "Google Drive",
    "WhatsApp",
    "Zoom",
    "Microsoft Teams",
    "Slack",
    "Dropbox",
    "OneDrive",
    "YouTube (Private/Unlisted)",
    "Vimeo",
    "Facebook Groups",
    "Instagram (DM or private group)",
    "LinkedIn Groups",
    "Email (as attachments or links)",
    "Google Classroom",
    "Canvas",
    "Moodle",
    "Coursera",
    "Udemy",
    "Skillshare",
    "Kajabi",
    "Teachable",
    "Podia",
    "Thinkific",
    "Notion",
    "Evernote",
    "AirTable",
    "Discord",
    "WeTransfer",
    "Hightail",
    "Amazon S3",
    "GitHub (for tech courses)",
    "Others",
  ];
  
  