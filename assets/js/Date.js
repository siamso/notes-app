export const greeting = function () {
  const currentHour = new Date().getHours();
  
  const greetings = 
  currentHour < 12 ? 'Morning' :
  currentHour < 18 ? 'Afternoon' :
  currentHour < 24 ? 'Evening' :
  'Morning'
  return `Good ${greetings}`;
}

export const getDate = function () {
  const Months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
  'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentDate = new Date(),
  currentDay = currentDate.getDate(),
  currentMonth = Months[currentDate.getMonth()],
  currentYear = currentDate.getFullYear();
  
  return `${currentMonth} ${currentDay}, ${currentYear}`;
}