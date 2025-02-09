import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Person } from "../types/Person";
import { addPeople, updatePerson, fetchPeopleById } from "../api/person";

const PersonForm: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const isEditMode = Boolean(id);
    const [person, setPerson] = useState<Person>({ firstName: "", lastName: "" } as Person);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (isEditMode) {
            const fetchPersonData = async () => {
                try {
                    const response = await fetchPeopleById(id!);
                    setPerson(response);
                } catch (error) {
                    setError("Failed to load person data.");
                }
            };
            fetchPersonData();
        }
    }, [id, isEditMode]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPerson({ ...person, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            if (isEditMode) {
                await updatePerson(person);
                alert("Person updated successfully!");
                navigate("/people");
            } else {
                await addPeople(person);
                setPerson({ firstName: "", lastName: "" } as Person);
                alert("Person added successfully!");
            }
        } catch (error) {
            setError(isEditMode ? "Failed to update person. Please try again." : "Failed to add person. Please try again.");
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-xl shadow-2xl">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                {isEditMode ? "Edit Person" : "Add New Person"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={person.firstName}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    required
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={person.lastName}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50"
                    disabled={loading}
                >
                    {loading ? (isEditMode ? "Updating..." : "Submitting...") : isEditMode ? "Update" : "Submit"}
                </button>
                {error && <p className="text-red-500 text-center">{error}</p>}
            </form>
        </div>
    );
};

export default PersonForm;
