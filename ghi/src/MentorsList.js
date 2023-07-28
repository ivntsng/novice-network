import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from './UserContext';

function MentorListView() {
  const { userData } = useContext(UserContext);
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    async function fetchMentors() {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_HOST}/users/`);
        if (response.ok) {
          const data = await response.json();
          const mentorUsers = data.filter((user) => user.role === 'mentor');
          setMentors(mentorUsers);
        } else {
          console.error('Failed to get mentors');
        }
      } catch (error) {
        console.error('Error occurred whilee fetching: ', error);
      }
    }

    fetchMentors();
  }, []);

  return (
    <div>
      <h2>Contact Your Mentors!</h2>
      <p>Logged in as: {userData.username}</p>
      <ul>
        {mentors.map((mentor) => (
          <li key={mentor.id}>
            <strong>Username:</strong> {mentor.username}    <strong>Email:</strong> {mentor.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MentorListView;
