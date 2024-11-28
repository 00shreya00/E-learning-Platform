import React from 'react';
import { useParams } from 'react-router-dom';

const subjects = [
  { id: 1, name: 'Python', description: 'Learn Python programming.', image: 'images/1.png' },
  { id: 2, name: 'React', description: 'Master React development.', image: 'images/3.png' },
  { id: 3, name: 'NodeJS', description: 'Build full-stack apps with NodeJS.', image: 'images/4.png' },
  // Add more subjects as needed
];

function SubjectPage() {
  const { subject } = useParams(); // Fetch the subject from the URL
  const matchedSubject = subjects.find((s) => s.name.toLowerCase() === subject.toLowerCase());

  if (!matchedSubject) {
    return <h2>No subject found for "{subject}".</h2>;
  }

  return (
    <div>
      <h1>{matchedSubject.name}</h1>
      <img src={matchedSubject.image} alt={matchedSubject.name} />
      <p>{matchedSubject.description}</p>
    </div>
  );
}

export default SubjectPage;
