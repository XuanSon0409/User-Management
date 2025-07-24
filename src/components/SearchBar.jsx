import React from "react";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";

export default function SearchBar({ onAddUser, searchTerm, onSearchChange }) {
    return (
        <div className="bg-white border-b border-gray-200 py-3">
            <div className="max-w-[90%] mx-auto">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                    {/* Title */}
                    <h1 className="font-inter text-2xl !font-bold text-gray-900 !mb-0">User Management</h1>

                    {/* Search + Button */}
                    <div className="flex items-center gap-3 ml-auto">
                        {/* Search Input */}
                        <div className="relative w-[240px]">
                            <SearchOutlined className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search users..."
                                value={searchTerm}
                                onChange={(e) => onSearchChange(e.target.value)}
                                className="w-full h-[42px] pl-10 pr-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            />
                        </div>

                        <button
                            onClick={onAddUser}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 !text-white border-4 border-blue-600 hover:border-blue-700 px-6 h-[42px] rounded-md font-medium min-w-[170px] justify-center text-sm transition"
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
