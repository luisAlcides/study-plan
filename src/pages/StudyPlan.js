const StudyPlan = ({ studyDays, setStudyDays, completedDays, setCompletedDays, darkMode }) => {
  const handleStudyDaysChange = (event) => {
    const newStudyDays = parseInt(event.target.value, 10);
    setStudyDays(newStudyDays);
    setCompletedDays(new Array(newStudyDays).fill(false));
  };

  const handleDayCheckboxChange = (index) => {
    setCompletedDays((prevCompletedDays) => {
      const newCompletedDays = [...prevCompletedDays];
      newCompletedDays[index] = !newCompletedDays[index];
      return newCompletedDays;
    });
  };

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} min-h-screen transition-all duration-500`}>
      <div className="container mx-auto p-6">
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-bold">Study Plan</h2>
            <input
              type="number"
              value={studyDays}
              onChange={handleStudyDaysChange}
              className={`ml-4 px-4 py-2 rounded shadow-md w-20 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
              min="1"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: studyDays }).map((_, index) => (
              <div key={index} className={`shadow-md rounded-lg p-4 transition-all duration-500 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} ${completedDays[index] ? 'line-through' : ''}`}>
                <h3 className="text-xl font-semibold mb-2">Day {index + 1}</h3>
                <div className="mt-4">
                  <input
                    type="checkbox"
                    checked={completedDays[index]}
                    onChange={() => handleDayCheckboxChange(index)}
                  />
                  <span className="ml-2">Mark as completed</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyPlan;
