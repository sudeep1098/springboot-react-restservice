// src/api/person.ts
import axios from "axios";
import { Person } from "../types/Person";

const apiBase = "http://localhost:8080/api";

export const fetchPeople = async (): Promise<Person[]> => {
    try {
        const response = await axios.get(`${apiBase}/people`);
        return response.data;
    } catch (error) {
        console.error("Error fetching people:", error);
        return [];
    }
};

export const fetchPeopleById = async (id: string) => {
    try {
        const response = await axios.get(`${apiBase}/people/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching people:", error);
    }
}

export const addPeople = async (person: Person) => {
    try {
        const response = await axios.post(`${apiBase}/people`, person);
        return response.data;
    } catch (error) {
        console.error("Error adding people:", error);
    }
}

export const updatePerson = async (person: Person) => {
    try {
        const response = await axios.put(`${apiBase}/people/${person.id}`, person);
        return response.data;
    } catch (error) {
        console.error("Error updating person:", error);
        throw error;
    }
};

export const deletePerson = async (id: string) => {
    try {
        const response = await axios.delete(`${apiBase}/people/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting person:", error);
        throw error;
    }
}