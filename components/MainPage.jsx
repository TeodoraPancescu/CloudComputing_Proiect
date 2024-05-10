import { deleteRecord, getRecords } from "@/utils/recordsFunctions";
import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { useRouter } from 'next/router';
import { useHistory } from 'react-router-dom';



const MainPage = () => {
    const router = useRouter();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchRecords = async () => {
        try {
            const response = await getRecords();
            setData(response);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteRecords = async (id) => {
        try {
            const response = await deleteRecord(id);

            if (response?.acknowledged) {
                const newData = data.filter(e => e._id !== id)
                setData(newData)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleEditRecord = (id) => {
        router.push(`/edit?id=${id}`);
    }

    const handleNavigateToCreatePage = () => {
        router.push('/create');
    };

    useEffect(() => {
        fetchRecords();
    }, []);

    if (isLoading) return <Spinner />

    console.log(data)

    return (
        <div className="p-4 gap-4">
            <button
                type="button"
                onClick={handleNavigateToCreatePage}
                className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
                Adaugă carte
            </button>
            <div className="flex flex-wrap gap-4">
                {data?.map((record) => (
                    <div
                        key={record._id}
                        className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                    >
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-pink-500 dark:text-purple">{record.denumire}</h5>
                        <p className="mb-3 font-bold text-gray-700 dark:text-gray-400">de {record.autor}</p>
                        <p className="mb-3 font-normal text-purple-500 dark:text-purple-400">{record.descriere}</p>
                        <br></br>
                        <br></br>
                        <button
                            type="button"
                            onClick={() => handleEditRecord(record._id)}
                            className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                            Editare
                        </button>
                        <button
                            type="button"
                            onClick={() => handleDeleteRecords(record._id)}
                            className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                            Ștergere
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MainPage
