    import React from "react";
    import { SearchOutlined, PlusOutlined } from "@ant-design/icons";

    export default function SearchBar({ onAddUser, searchTerm, onSearchChange }) {
        return (
            <div className="bg-white border-b border-gray-200 py-4 shadow">
                <div className="max-w-screen-xl mx-auto px-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                        {/* Title */}
                        <h1 className="text-xl sm:text-2xl !font-bold text-gray-900">User Management</h1>

                        {/* Search + Button */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
                            {/* Search Input */}
                            <div className="relative w-full sm:w-[250px] ">
                                <SearchOutlined className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 " />
                                <input
                                    type="text"
                                    placeholder="Search users..."
                                    value={searchTerm}
                                    onChange={(e) => onSearchChange(e.target.value)}
                                    className="w-full h-10 pl-10 pr-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                />
                            </div>

                            <button
                                onClick={onAddUser}
                                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 !text-white px-5 py-2 h-10 rounded-lg font-medium text-sm w-full sm:w-auto transition border-4 border-blue-600 hover:border-blue-700"
                            >
                                <PlusOutlined />
                                Add New User
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
