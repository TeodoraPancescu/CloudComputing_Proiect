import { useRouter } from "next/router";
import React, { useState } from "react";

const RecordForm = (props) => {
    const router = useRouter();
    const { entry, onSubmit } = props;
    const [data, setData] = useState(entry);

    const handleChange = (type, value) => {
        setData({ ...data, [type]: value });
    };

    const handleCancel = () => {
        router.push("/");
    }

    return (
        <div className="p-4">
            <div className="flex flex-col mx-auto max-w-80 border p-4 shadow-sm gap-4 w-full" style={{ backgroundColor: '#FDEDEF', borderColor: '#FBB6CE', color: '#C53030' }}>
                <div className="text-center font-bold text-pink-500 dark:text-purple">{entry._id ? 'Editare' : 'Adăugare o nouă'} Carte </div>
                <div>
                    <label
                        htmlFor="denumire"
                        className="block mb-2 text-sm font-medium text-purple-900 dark:text-purple"
                    >
                        Denumire
                    </label>
                    <input
                        type="denumire"
                        id="denumire"
                        value={data.denumire}
                        onChange={(e) => handleChange("denumire", e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-purple-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-purple-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Adăugați denumirea cărții aici"
                        required
                    />
                </div>
                <div>
                    <label
                        htmlFor="autor"
                        className="block mb-2 text-sm font-medium text-purple-900 dark:text-purple"
                    >
                        Autor
                    </label>
                    <input
                        type="autor"
                        id="autor"
                        value={data.autor}
                        onChange={(e) => handleChange("autor", e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-purple-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-purple-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"

                        placeholder="Adăugați autorul cărții aici"
                        required
                    />
                </div>
                <div>
                    <label
                        htmlFor="descriere"
                        className="block mb-2 text-sm font-medium text-purple-900 dark:text-purple"
                    >
                        Descriere
                    </label>
                    <textarea
                        id="descriere"
                        rows="4"
                        value={data.descriere}
                        onChange={(e) => handleChange("descriere", e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-purple-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-purple-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Adăugați descrierea cărții aici"
                    ></textarea>
                </div>

                <div className="flex justify-center">
                    <button
                        type="button"
                        onClick={() => onSubmit(data)}
                        className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                        {entry?._id ? "Update" : "Adăugare"}
                    </button>
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                        Întoarcere
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RecordForm;