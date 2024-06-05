import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import StudyPlan from './pages/StudyPlan';
import { addProfile, getProfiles, updateProfile, deleteProfile } from './db';
import { FaSun, FaMoon } from 'react-icons/fa';
import './App.css';

const topics = [
  {
    id: 'statistics',
    title: 'Statistics',
    levels: {
      basic: [
        { title: "Think Stats by Allen B. Downey", tooltip: "An introduction to statistics using Python." },
        { title: "Statistics for Data Science by James D. Miller", tooltip: "A comprehensive guide to statistics for data science." },
        { title: "Practical Statistics for Data Scientists by Peter Bruce and Andrew Bruce", tooltip: "Practical guide to using statistics in data science projects." },
        { title: "Statistics Done Wrong by Alex Reinhart", tooltip: "The woefully complete guide to avoiding statistical errors." },
        { title: "Naked Statistics by Charles Wheelan", tooltip: "Stripping the dread from data." },
      ],
      intermediate: [
        { title: "An Introduction to Statistical Learning by Gareth James, Daniela Witten, Trevor Hastie, and Robert Tibshirani", tooltip: "A detailed introduction to statistical learning methods." },
        { title: "Bayesian Analysis with Python by Osvaldo Martin", tooltip: "A guide to Bayesian analysis using Python." },
        { title: "Statistics for Machine Learning by Pratap Dangeti", tooltip: "Statistics techniques for machine learning." },
        { title: "Statistical Methods for Machine Learning by Jason Brownlee", tooltip: "Discover how to prepare data, select features, model data, and evaluate models." },
        { title: "Introduction to Probability by Dimitri P. Bertsekas and John N. Tsitsiklis", tooltip: "A comprehensive text on probability theory." },
      ],
      advanced: [
        { title: "All of Statistics by Larry Wasserman", tooltip: "A rigorous overview of statistical theory and methods." },
        { title: "Statistical Learning with Sparsity by Trevor Hastie, Robert Tibshirani, and Martin Wainwright", tooltip: "Techniques for sparse data in statistical learning." },
        { title: "The Elements of Statistical Learning by Trevor Hastie, Robert Tibshirani, and Jerome Friedman", tooltip: "Comprehensive guide to statistical learning." },
        { title: "Bayesian Data Analysis by Andrew Gelman, John B. Carlin, Hal S. Stern, David B. Dunson, Aki Vehtari, and Donald B. Rubin", tooltip: "A comprehensive approach to Bayesian data analysis." },
        { title: "Advanced Data Analysis from an Elementary Point of View by Cosma Rohilla Shalizi", tooltip: "An advanced guide to data analysis techniques." },
      ],
    },
  },
  {
    id: 'programming',
    title: 'Programming',
    levels: {
      basic: [
        { title: "Automate the Boring Stuff with Python by Al Sweigart", tooltip: "Introduction to Python with practical automation projects." },
        { title: "Python Crash Course by Eric Matthes", tooltip: "A hands-on, project-based introduction to Python." },
        { title: "Think Python by Allen B. Downey", tooltip: "A beginner's guide to Python programming." },
        { title: "Learn Python the Hard Way by Zed A. Shaw", tooltip: "A very simple introduction to the terrifyingly beautiful world of computers and code." },
        { title: "Head First Python by Paul Barry", tooltip: "A brain-friendly guide." },
      ],
      intermediate: [
        { title: "Fluent Python by Luciano Ramalho", tooltip: "Advanced techniques for writing effective Python code." },
        { title: "Effective Python by Brett Slatkin", tooltip: "59 specific ways to improve your Python programs." },
        { title: "Python Tricks by Dan Bader", tooltip: "A buffet of awesome Python features and best practices." },
        { title: "Python Cookbook by David Beazley and Brian K. Jones", tooltip: "Recipes for mastering Python 3." },
        { title: "Python 3 Object-Oriented Programming by Dusty Phillips", tooltip: "Build robust and maintainable software with object-oriented design patterns in Python 3.8." },
      ],
      advanced: [
        { title: "Python Programming: An Introduction to Computer Science by John Zelle", tooltip: "Introduction to Python and computer science principles." },
        { title: "Learning Python by Mark Lutz", tooltip: "Comprehensive guide to Python programming." },
        { title: "Expert Python Programming by Michal Jaworski and Tarek Ziadé", tooltip: "Become an ace Python programmer by mastering best practices, advanced tools, and techniques." },
        { title: "Pro Python by Marty Alchin", tooltip: "Best practices and advanced techniques in Python." },
        { title: "Programming Python by Mark Lutz", tooltip: "Powerful object-oriented programming." },
      ],
    },
  },
  {
    id: 'machine_learning',
    title: 'Machine Learning',
    levels: {
      basic: [
        { title: "Data Science from Scratch by Joel Grus", tooltip: "First principles with Python." },
        { title: "Python Data Science Handbook by Jake VanderPlas", tooltip: "Essential tools for working with data." },
        { title: "Data Science for Business by Foster Provost and Tom Fawcett", tooltip: "Data mining and data-analytic thinking." },
        { title: "Machine Learning for Absolute Beginners by Oliver Theobald", tooltip: "A plain English introduction." },
        { title: "Introduction to Machine Learning with Python by Andreas C. Müller and Sarah Guido", tooltip: "A comprehensive guide to practical machine learning." },
      ],
      intermediate: [
        { title: "Machine Learning Yearning by Andrew Ng", tooltip: "Technical strategy for AI engineers." },
        { title: "Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow by Aurélien Géron", tooltip: "Concepts, tools, and techniques to build intelligent systems." },
        { title: "Applied Predictive Modeling by Max Kuhn and Kjell Johnson", tooltip: "Techniques for predictive analytics." },
        { title: "Pattern Recognition and Machine Learning by Christopher M. Bishop", tooltip: "The leading textbook on pattern recognition." },
        { title: "Deep Learning with Python by François Chollet", tooltip: "Introduction to deep learning with practical examples." },
      ],
      advanced: [
        { title: "Machine Learning: A Probabilistic Perspective by Kevin P. Murphy", tooltip: "Comprehensive introduction to the field of machine learning from a probabilistic viewpoint." },
        { title: "Bayesian Reasoning and Machine Learning by David Barber", tooltip: "A practical guide to machine learning techniques." },
        { title: "Machine Learning in Action by Peter Harrington", tooltip: "Provides a detailed overview of the field." },
        { title: "Reinforcement Learning: An Introduction by Richard S. Sutton and Andrew G. Barto", tooltip: "Comprehensive introduction to reinforcement learning." },
        { title: "Probabilistic Graphical Models by Daphne Koller and Nir Friedman", tooltip: "Principles and techniques." },
      ],
    },
  },
  {
    id: 'deep_learning',
    title: 'Deep Learning',
    levels: {
      basic: [
        { title: "Deep Learning with Python by François Chollet", tooltip: "Introduction to deep learning with practical examples." },
        { title: "Neural Networks and Deep Learning by Michael Nielsen", tooltip: "An online book exploring deep learning in detail." },
        { title: "Deep Learning by Ian Goodfellow, Yoshua Bengio, and Aaron Courville", tooltip: "The definitive textbook on deep learning." },
        { title: "Make Your Own Neural Network by Tariq Rashid", tooltip: "An introduction to neural networks and deep learning." },
        { title: "Fundamentals of Deep Learning by Nikhil Buduma", tooltip: "Designing next-generation machine intelligence algorithms." },
      ],
      intermediate: [
        { title: "Deep Reinforcement Learning Hands-On by Maxim Lapan", tooltip: "Apply modern RL techniques to practical problems." },
        { title: "Generative Adversarial Networks by Ian Goodfellow", tooltip: "Introduction to GANs and their applications." },
        { title: "Deep Learning with TensorFlow 2 and Keras by Antonio Gulli, Amita Kapoor, and Sujit Pal", tooltip: "Build and train deep learning models with TensorFlow 2 and Keras." },
        { title: "Applied Deep Learning by Umberto Michelucci", tooltip: "A case-based approach to understanding deep learning." },
        { title: "Python Deep Learning by Ivan Vasilev, Daniel Slater, Gianmario Spacagna, Peter Roelants, and Valentino Zocca", tooltip: "Exploit deep learning techniques and frameworks using Python." },
      ],
      advanced: [
        { title: "Deep Learning by Ian Goodfellow, Yoshua Bengio, and Aaron Courville", tooltip: "The definitive textbook on deep learning." },
        { title: "Deep Learning for Computer Vision by Rajalingappaa Shanmugamani", tooltip: "Implement advanced computer vision projects." },
        { title: "Deep Learning with PyTorch by Eli Stevens, Luca Antiga, and Thomas Viehmann", tooltip: "A practical guide to implementing deep learning using PyTorch." },
        { title: "Advanced Deep Learning with TensorFlow 2 and Keras by Rowel Atienza", tooltip: "Build and deploy advanced deep learning models." },
        { title: "Neural Networks and Deep Learning: A Textbook by Charu C. Aggarwal", tooltip: "A comprehensive introduction to neural networks and deep learning." },
      ],
    },
  },
  {
    id: 'data_visualization',
    title: 'Data Visualization',
    levels: {
      basic: [
        { title: "Storytelling with Data by Cole Nussbaumer Knaflic", tooltip: "A guide to effectively communicating data." },
        { title: "The Visual Display of Quantitative Information by Edward R. Tufte", tooltip: "The classic book on statistical graphics and data visualization." },
        { title: "Information is Beautiful by David McCandless", tooltip: "Data visualization at its finest." },
        { title: "Data Visualization Made Simple by Kristen Sosulski", tooltip: "Insights into the design and development of data visualizations." },
        { title: "Cool Infographics by Randy Krum", tooltip: "Effective communication with data visualization and design." },
      ],
      intermediate: [
        { title: "Information Dashboard Design by Stephen Few", tooltip: "The effective visual communication of data." },
        { title: "Data Visualisation: A Handbook for Data Driven Design by Andy Kirk", tooltip: "Practical guide to data visualization design." },
        { title: "Data Points by Nathan Yau", tooltip: "Visualization that means something." },
        { title: "Visualize This by Nathan Yau", tooltip: "The FlowingData guide to design, visualization, and statistics." },
        { title: "Designing Data Visualizations by Noah Iliinsky and Julie Steele", tooltip: "Representing informational relationships." },
      ],
      advanced: [
        { title: "Practical Tableau by Ryan Sleeper", tooltip: "How to make your data presentations clear and captivating." },
        { title: "Interactive Data Visualization for the Web by Scott Murray", tooltip: "An introduction to designing interactive data visualizations." },
        { title: "Fundamentals of Data Visualization by Claus O. Wilke", tooltip: "How to make informative and compelling data visualizations." },
        { title: "The Big Book of Dashboards by Steve Wexler, Jeffrey Shaffer, and Andy Cotgreave", tooltip: "Visualizing your data using real-world business scenarios." },
        { title: "Data Visualization with Python and JavaScript by Kyran Dale", tooltip: "Scrape, clean, explore, and transform your data." },
      ],
    },
  },
];

const App = () => {
  const [profiles, setProfiles] = useState([]);
  const [currentProfile, setCurrentProfile] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('title');
  const [studyDays, setStudyDays] = useState(180);
  const [completedDays, setCompletedDays] = useState(() => {
    const savedCompletedDays = localStorage.getItem('completedDays');
    return savedCompletedDays ? JSON.parse(savedCompletedDays) : new Array(studyDays).fill(false);
  });

  useEffect(() => {
    const fetchProfiles = async () => {
      const savedProfiles = await getProfiles();
      setProfiles(savedProfiles);
      if (savedProfiles.length > 0) {
        setCurrentProfile(savedProfiles[0]);
      }
    };
    fetchProfiles();
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('completedDays', JSON.stringify(completedDays));
  }, [completedDays]);

  const handleAddProfile = async (profileName) => {
    const newProfile = { name: profileName, progress: {} };
    const addedProfile = await addProfile(newProfile);
    const savedProfiles = await getProfiles();
    setProfiles(savedProfiles);
    setCurrentProfile(addedProfile);
  };

  const handleProfileChange = (profileId) => {
    const selectedProfile = profiles.find((profile) => profile._id === profileId);
    setCurrentProfile(selectedProfile);
  };

  const handleProgressChange = async (topicId, level, bookIndex) => {
    const updatedProfile = { ...currentProfile };
    if (!updatedProfile.progress[topicId]) {
      updatedProfile.progress[topicId] = { basic: {}, intermediate: {}, advanced: {} };
    }
    if (!updatedProfile.progress[topicId][level]) {
      updatedProfile.progress[topicId][level] = {};
    }
    updatedProfile.progress[topicId][level][bookIndex] = !updatedProfile.progress[topicId][level][bookIndex];
    setCurrentProfile(updatedProfile);
    await updateProfile(updatedProfile);
  };

  const calculateOverallProgress = () => {
    if (!currentProfile) return 0;
    const totalBooks = topics.reduce((acc, topic) => {
      return acc + Object.values(topic.levels).reduce((levelAcc, books) => levelAcc + books.length, 0);
    }, 0);
    const completedBooks = topics.reduce((acc, topic) => {
      const topicProgress = currentProfile.progress[topic.id] || { basic: {}, intermediate: {}, advanced: {} };
      return acc + Object.keys(topic.levels).reduce((levelAcc, level) => {
        const levelProgress = topicProgress[level] || {};
        const completedInLevel = Object.values(levelProgress).filter(Boolean).length;
        return levelAcc + completedInLevel;
      }, 0);
    }, 0);
    return Math.round((completedBooks / totalBooks) * 100);
  };

  const overallProgress = calculateOverallProgress();

  const filteredTopics = topics.map(topic => {
    const filteredLevels = Object.keys(topic.levels).reduce((acc, level) => {
      const filteredBooks = topic.levels[level].filter(book => book.title.toLowerCase().includes(searchTerm.toLowerCase()));
      acc[level] = filteredBooks;
      return acc;
    }, {});
    return { ...topic, levels: filteredLevels };
  });

  const sortedTopics = filteredTopics.map(topic => {
    const sortedLevels = Object.keys(topic.levels).reduce((acc, level) => {
      const sortedBooks = [...topic.levels[level]].sort((a, b) => a.title.localeCompare(b.title));
      acc[level] = sortedBooks;
      return acc;
    }, {});
    return { ...topic, levels: sortedLevels };
  });

  return (
    <Router>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Routes>
        <Route path="/" element={
          <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} min-h-screen transition-all duration-500`}>
            <div className="container mx-auto p-6">
              <h1 className="text-5xl font-bold mb-6 text-center">Learning Path for Data Science and AI</h1>
              <div className="flex justify-between items-center mb-8">
                <div className="flex space-x-4">
                  <select
                    onChange={(e) => handleProfileChange(e.target.value)}
                    className={`px-4 py-2 rounded shadow-md ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
                  >
                    {profiles.map(profile => (
                      <option key={profile._id} value={profile._id}>
                        {profile.name}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => handleAddProfile(prompt('Enter new profile name:'))}
                    className="bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600 transition-all duration-300"
                  >
                    Add Profile
                  </button>
                </div>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="ml-4 px-4 py-2 rounded shadow-md hover:bg-gray-600 transition-all duration-300 flex items-center"
                >
                  {darkMode ? <FaSun /> : <FaMoon />}
                  <span className="ml-2">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
              </div>
              <div className="mb-8">
                <label className="block text-xl font-semibold mb-2">Overall Progress:</label>
                <div className="relative pt-1">
                  <div className="overflow-hidden h-4 text-xs flex rounded bg-gray-200">
                    <div style={{ width: `${overallProgress}%` }} className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${darkMode ? 'bg-green-400' : 'bg-green-500'} transition-all duration-500`}></div>
                  </div>
                </div>
                <span className="block text-right text-lg font-medium mt-2">{overallProgress}%</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedTopics.map(topic => (
                  <div key={topic.id} className={`shadow-md rounded-lg p-6 transition-all duration-500 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
                    <h2 className="text-2xl font-bold mb-4">{topic.title}</h2>
                    {Object.keys(topic.levels).map(level => (
                      <div key={level} className="mb-4">
                        <h3 className="text-xl font-semibold mb-2 capitalize">{level}</h3>
                        <ul className="list-disc list-inside mb-4">
                          {topic.levels[level].map((book, index) => (
                            <li key={index} className="flex items-center mb-2">
                              <input
                                type="checkbox"
                                checked={!!currentProfile?.progress[topic.id]?.[level]?.[index]}
                                onChange={() => handleProgressChange(topic.id, level, index)}
                                className="mr-2"
                              />
                              <span className="tooltip">{book.title}
                                <span className="tooltiptext">{book.tooltip}</span>
                              </span>
                            </li>
                          ))}
                        </ul>
                        <div className="relative pt-1">
                          <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                            <div style={{ width: `${(Object.values(currentProfile?.progress[topic.id]?.[level] || {}).filter(Boolean).length / topic.levels[level].length) * 100}%` }} className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${darkMode ? 'bg-purple-400' : 'bg-purple-500'} transition-all duration-500`}></div>
                          </div>
                          <span className="block text-right text-sm font-medium mt-1">
                            {Object.values(currentProfile?.progress[topic.id]?.[level] || {}).filter(Boolean).length} / {topic.levels[level].length} completed
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        } />
        <Route path="/study-plan" element={
          <StudyPlan
            studyDays={studyDays}
            setStudyDays={setStudyDays}
            completedDays={completedDays}
            setCompletedDays={setCompletedDays}
            darkMode={darkMode}
          />
        } />
      </Routes>
    </Router>
  );
};

export default App;