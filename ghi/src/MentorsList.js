import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from './UserContext';

function MentorListView() {
  const { userData } = useContext(UserContext);
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    async function fetchMentors() {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_HOST}/users`);
        if (response.ok) {
          const data = await response.json();
          const mentorUsers = data.filter((user) => user.role === 'mentor');
          setMentors(mentorUsers);
        } else {
          console.error('Failed to get mentors');
        }
      } catch (error) {
        console.error('Error occurred while fetching: ', error);
      }
    }

    fetchMentors();
  }, []);

  return (
    <>
    <div className="container mt-5">
      <h2 className="mb-4">Contact Your Mentors!</h2>
      <p className="mb-3">Logged in as: {userData.username}</p>
      <ul className="list-group">
        {mentors.map((mentor) => (
          <li key={mentor.id} className="list-group-item">
            <div className="d-flex justify-content-between">
              <div>
                <strong>Username:</strong> {mentor.username}
              </div>
              <div>
                <strong>Email:</strong> {mentor.email}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
}

export default MentorListView;
