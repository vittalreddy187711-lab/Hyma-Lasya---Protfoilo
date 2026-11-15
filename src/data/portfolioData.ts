import heroArtwork from '../assets/images/hero_ai_abstract_1794719453324.jpg';
import gradeCalcVisual from '../assets/images/project_grade_calc_1794719453494.jpg';
import pythonCalcVisual from '../assets/images/project_python_calc_1794719454718.jpg';

export type SkillCategory = 'all' | 'programming' | 'web' | 'ai';

export interface SkillItem {
  id: string;
  name: string;
  levelLabel: string;
  category: Exclude<SkillCategory, 'all'>;
  categoryLabel: string;
  description: string;
  focusAreas: string[];
}

export interface ProjectItem {
  id: 'grade-calculator' | 'python-calculator';
  title: string;
  subtitle: string;
  status: string;
  category: string;
  image: string;
  imageAlt: string;
  summary: string;
  learningFocus: string[];
  stack: string[];
  actionLabel: string;
}

export interface MilestoneItem {
  id: string;
  index: string;
  title: string;
  timeframe: string;
  detail: string;
}

export interface CertificateEntry {
  id: string;
  title: string;
  issuer: string;
  date: string;
}

export const PORTFOLIO_PROFILE = {
  fullName: 'Hyma Lasya S',
  headlineRole: 'Aspiring AI Engineer',
  academicStatus: 'First-Year B.Tech Computer Science Student',
  githubUrl: 'https://github.com/hymalasyasomusekhar',
  githubHandle: 'hymalasyasomusekhar',
  heroImage: heroArtwork,
};

export const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
] as const;

export const HERO_SUMMARY_STRIP = [
  { label: 'Academic Track', value: 'B.Tech CSE · Year 1' },
  { label: 'Primary Focus', value: 'Python & Generative AI' },
  { label: 'Learning Builds', value: '2 Active Projects' },
  { label: 'Code Profile', value: 'GitHub Active' },
];

export const CAREER_ROADMAP = [
  {
    step: '01',
    title: 'Computer Science Foundations',
    description:
      'Building a strong first-year base in computational thinking, clean problem decomposition, and structured Python programming.',
  },
  {
    step: '02',
    title: 'Web Interfaces & Applied Python',
    description:
      'Combining HTML and CSS fundamentals with Python logic to understand how backend calculations connect to accessible user interfaces.',
  },
  {
    step: '03',
    title: 'Machine Learning & AI Engineering',
    description:
      'Progressing toward core machine learning algorithms, data handling, and practical Generative AI engineering.',
  },
];

export const SKILLS_DATA: SkillItem[] = [
  {
    id: 'python',
    name: 'Python',
    levelLabel: 'Beginner',
    category: 'programming',
    categoryLabel: 'Programming',
    description:
      'Practicing core syntax, conditional logic, loops, functions, and structured problem-solving through small console utilities.',
    focusAreas: ['Control Flow & Loops', 'Modular Functions', 'Input Validation'],
  },
  {
    id: 'html',
    name: 'HTML',
    levelLabel: 'Foundational',
    category: 'web',
    categoryLabel: 'Web Development',
    description:
      'Writing semantic, well-structured page layouts with accessible headings, landmarks, lists, and interactive form elements.',
    focusAreas: ['Semantic Markup', 'Accessible Forms', 'Document Structure'],
  },
  {
    id: 'css',
    name: 'CSS',
    levelLabel: 'Foundational',
    category: 'web',
    categoryLabel: 'Web Development',
    description:
      'Styling responsive layouts with Flexbox and CSS Grid, clean typography spacing, and modern dark-theme interfaces.',
    focusAreas: ['Flexbox & Grid', 'Responsive Design', 'Visual Hierarchy'],
  },
  {
    id: 'genai',
    name: 'Basic Generative AI',
    levelLabel: 'Exploring',
    category: 'ai',
    categoryLabel: 'AI & Concepts',
    description:
      'Learning how large language models work conceptually, structuring clear prompts, and using AI thoughtfully to accelerate coding practice.',
    focusAreas: ['Prompt Clarity', 'AI-Assisted Study', 'Problem Decomposition'],
  },
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'grade-calculator',
    title: 'Student Grade Calculator',
    subtitle: 'Python & GenAI Learning Project',
    status: 'Learning Build',
    category: 'Python · Generative AI Study',
    image: gradeCalcVisual,
    imageAlt: 'Minimalist isometric glass bars representing grade calculation metrics',
    summary:
      'A structured learning project focused on calculating subject totals, weighted percentages, letter grades, and GPA logic in Python, using Generative AI workflows to explore edge cases and clean function design.',
    learningFocus: [
      'Score aggregation and percentage-to-grade mapping',
      'Clean input boundaries (0–100 validation)',
      'Using GenAI prompts to review logic and test cases',
    ],
    stack: ['Python', 'Grade Logic', 'GenAI-Assisted Study'],
    actionLabel: 'Try Interactive Preview',
  },
  {
    id: 'python-calculator',
    title: 'Python Basic Calculator',
    subtitle: 'Core Arithmetic & CLI Practice',
    status: 'In Progress',
    category: 'Python · In Progress',
    image: pythonCalcVisual,
    imageAlt: 'Minimalist dark geometric prisms representing arithmetic operations',
    summary:
      'An ongoing Python practice project designed to strengthen command-line programming fundamentals through clean arithmetic functions, continuous calculation loops, and safe error handling.',
    learningFocus: [
      'Addition, subtraction, multiplication, and division functions',
      'Graceful handling of division by zero and invalid inputs',
      'Menu-driven terminal execution loop',
    ],
    stack: ['Python', 'Functions', 'Error Handling'],
    actionLabel: 'View Build Scope',
  },
];

export const LEARNING_MILESTONES: MilestoneItem[] = [
  {
    id: 'btech-start',
    index: '01',
    title: 'Began B.Tech in Computer Science',
    timeframe: 'Year 1 · Academic Start',
    detail:
      'Started undergraduate studies in Computer Science with a clear focus on building long-term foundations for AI Engineering.',
  },
  {
    id: 'python-start',
    index: '02',
    title: 'Started Programming with Python',
    timeframe: 'Ongoing Practice',
    detail:
      'Moved from syntax basics to building structured small programs like grade and arithmetic calculators.',
  },
  {
    id: 'web-foundations',
    index: '03',
    title: 'Built First HTML & CSS Layouts',
    timeframe: 'Web Fundamentals',
    detail:
      'Practiced semantic HTML structure and responsive CSS styling to present projects clearly on the web.',
  },
  {
    id: 'genai-workflow',
    index: '04',
    title: 'Explored Generative AI for Learning',
    timeframe: 'AI Exploration',
    detail:
      'Applied basic Generative AI concepts to debug beginner Python code, test edge cases, and deepen conceptual understanding.',
  },
];
