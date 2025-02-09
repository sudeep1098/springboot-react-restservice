import React, { useEffect, useState } from "react";
import { fetchPeople, deletePerson } from "../api/person";
import { Person } from "../types/Person";
import { Link } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";

const PeopleList: React.FC = () => {
    const [people, setPeople] = useState<Person[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [menuOpen, setMenuOpen] = useState<{ [key: string]: boolean }>({});

    useEffect(() => {
        const loadPeople = async () => {
            try {
                const response = await fetchPeople();
                setPeople(response);
            } catch (error) {
                console.error("Failed to fetch people:", error);
            } finally {
                setLoading(false);
            }
        };
        loadPeople();
    }, []);

    const toggleMenu = (id: string) => {
        setMenuOpen((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this person?")) {
            await deletePerson(id);
            setPeople((prev) => prev.filter((person) => person.id !== id));
        }
    };

    if (loading) {
        return <p className="text-center text-gray-500">Loading People...</p>;
    }

    return (
        <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-xl shadow-2xl">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                People List
            </h2>
            {people.length === 0 ? (
                <p className="text-gray-500 text-center">No people found.</p>
            ) : (
                <ul className="space-y-4">
                    {people.map((person) => (
                        <li
                            key={person.id}
                            className="p-4 bg-gray-50 rounded-lg hover:shadow-md transition-all duration-300 flex justify-between items-center relative"
                        >
                            <span className="text-gray-800 font-medium">
                                {person.firstName} {person.lastName}
                            </span>
                            <button
                                onClick={() => toggleMenu(person.id)}
                                className="p-2 hover:bg-gray-200 rounded-full transition-all"
                            >
                                <BsThreeDotsVertical size={20} />
                            </button>

                            {menuOpen[person.id] && (
                                <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow-lg w-32">
                                    <Link
                                        to={`/people/edit/${person.id}`}
                                        className="block px-4 py-2 hover:bg-gray-100 text-gray-700 transition-all"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(person.id)}
                                        className="block w-full text-left px-4 py-2 hover:bg-red-100 text-red-600 transition-all"
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PeopleList;