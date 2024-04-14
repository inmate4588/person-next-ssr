// app/people-c/page.tsx
'use client'

import { useEffect, useState } from 'react';
import { Person } from '../models/person'; // Adjust the import path as necessary

const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const apiURL = process.env.NEXT_PUBLIC_API_URL; // This will work if used in getServerSideProps or API routes
  const bearerToken = process.env.NEXT_API_BEARER_TOKEN; // Replace this with your actual bearer token
  console.log(apiURL, bearerToken);

  useEffect(() => {
    const fetchPeople = async () => {
      const response = await fetch(`${apiURL}`, {
        method: 'GET',
        headers: new Headers({
          'Authorization': `Bearer ${bearerToken}`,
          'Content-Type': 'application/json'
        }),
      });
      if (!response.ok) {
        console.error('Failed to fetch people');
        return;
      }
      const data: Person[] = await response.json();
      setPeople(data);
    };

    fetchPeople();
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold my-4">People</h1>
      <table className="table-auto w-full">
        <thead className="text-left">
          <tr>
            <th className="p-2">First Name</th>
            <th className="p-2">Last Name</th>
            <th className="p-2">Phone</th>
            <th className="p-2">Date of Birth</th>
          </tr>
        </thead>
        <tbody>
          {people.map((person, index) => (
            <tr key={index} className="odd:bg-gray-100">
              <td className="p-2">{person.firstName}</td> {/* Adjusted to camelCase */}
              <td className="p-2">{person.lastName}</td> {/* Adjusted to camelCase */}
              <td className="p-2">{person.phone}</td>
              <td className="p-2">{person.dob}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PeoplePage;
