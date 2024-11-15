module.exports.isStudyRelated = (content) => {
  // Padhai, coding, web development, aur UI/UX se related keywords ko filter karna
  const relevantKeywords = [
    "mathematics",
    "physics",
    "chemistry",
    "biology",
    "computer science",
    "information technology",
    "electronics",
    "electrical engineering",
    "mechanical engineering",
    "civil engineering",
    "chemical engineering",
    "industrial engineering",
    "biomedical engineering",
    "environmental engineering",
    "coding",
    "programming",
    "web development",
    "app development",
    "frontend",
    "backend",
    "full stack",
    "ui design",
    "ux design",
    "user interface",
    "user experience",
    "html",
    "css",
    "javascript",
    "typescript",
    "react",
    "angular",
    "vue",
    "node.js",
    "express",
    "django",
    "flask",
    "next.js",
    "nuxt.js",
    "svelte",
    "tailwindcss",
    "bootstrap",
    "sass",
    "less",
    "styled components",
    "three.js",
    "firebase",
    "database",
    "sql",
    "nosql",
    "mongodb",
    "postgresql",
    "mysql",
    "api",
    "graphql",
    "rest api",
    "websocket",
    "json",
    "xml",
    "jwt",
    "oauth",
    "responsive design",
    "progressive web apps",
    "cross-platform development",
    "flutter",
    "react native",
    "kotlin",
    "swift",
    "android development",
    "ios development",
    "mobile development",
    "version control",
    "git",
    "github",
    "gitlab",
    "bitbucket",
    "agile",
    "scrum",
    "kanban",
    "devops",
    "docker",
    "kubernetes",
    "continuous integration",
    "continuous deployment",
    "cloud computing",
    "aws",
    "azure",
    "google cloud",
    "heroku",
    "netlify",
    "vercel",
    "cybersecurity",
    "penetration testing",
    "ethical hacking",
    "artificial intelligence",
    "machine learning",
    "deep learning",
    "neural networks",
    "data science",
    "big data",
    "data analysis",
    "data visualization",
    "pandas",
    "numpy",
    "matplotlib",
    "scikit-learn",
    "tensorflow",
    "keras",
    "pytorch",
    "r programming",
    "statistics",
    "data mining",
    "blockchain",
    "cryptocurrency",
    "smart contracts",
    "solidity",
    "bitcoin",
    "ethereum",
    "decentralized applications",
    "internet of things",
    "virtual reality",
    "augmented reality",
    "game development",
    "unity",
    "unreal engine",
    "webpage",
    "website",
    "ui",
    "ux",
    "seo",
    "content management systems",
    "wordpress",
    "shopify",
    "e-commerce development",
    "product design",
  ];

  const isNotVulgar =
    content.toLowerCase().includes("no-vulgar") ||
    !content.toLowerCase().includes("vulgar");
  const containsRelevantKeyword = relevantKeywords.some((keyword) => {
    const regex = new RegExp(`\\b${keyword}\\b`, "i");
    return regex.test(content);
  });

  if (isNotVulgar && containsRelevantKeyword) {
    return true;
  }

  return false;
};
