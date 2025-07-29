import { Button } from "antd";
import { EditFilled, DeleteFilled } from "@ant-design/icons";

export default function UserRow({ user, onEdit, onDeleteConfirm }) {
    const getRoleStyle = (role) => {
        switch (role) {
            case "Admin":
                return "bg-purple-100 text-purple-700";
            case "User":
                return "bg-blue-100 text-blue-700";
            case "Moderator":
                return "bg-green-100 text-green-700";
            default:
                return "bg-gray-200 text-gray-600";
        }
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case "Active":
                return "bg-green-100 text-green-700";
            case "Inactive":
                return "bg-yellow-100 text-yellow-700";
            default:
                return "bg-gray-200 text-gray-600";
        }
    };

    return (
        <div className="grid md:grid-cols-20 grid-cols-1 gap-y-2 px-4 py-4 border-b border-gray-200 hover:bg-gray-50 transition-all">
            {/* Avatar + Name */}
            <div className="md:col-span-5 flex items-center gap-3">
                <img
                    src={user.avatar || `https://i.pravatar.cc/100?u=${user.email}`}
                    alt={user.name}
                    className="h-10 w-10 rounded-full border object-cover"
                />
                <span className="text-sm font-medium text-gray-900">{user.name}</span>
            </div>

            {/* Email */}
            <div className="md:col-span-5 text-sm text-gray-600 truncate md:ml-0 ml-12 md:flex md:justify-start md:items-center md:text-center">
                {user.email}
            </div>

            {/* Role */}
            <div className="md:col-span-3 text-sm md:ml-0 ml-12 md:flex md:justify-start md:items-center md:text-center">
                <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${getRoleStyle(user.role)}`}>
                    {user.role}
                </span>
            </div>

            {/* Status */}
            <div className="md:col-span-3 text-sm md:ml-0 ml-12 md:flex md:justify-start md:items-center md:text-center">
                <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${getStatusStyle(user.status)}`}>
                    {user.status}
                </span>
            </div>



            {/* Actions */}
            <div className="md:col-span-4 flex md:justify-start justify-end items-center gap-2 md:ml-0 ml-12">
                <Button
                    type="primary"
                    size="small"
                    icon={<EditFilled />}
                    onClick={() => onEdit(user)}
                >
                    Edit
                </Button>
                <Button
                    type="primary"
                    danger
                    size="small"
                    icon={<DeleteFilled />}
                    onClick={() => onDeleteConfirm(user.id)}
                >
                    Delete
                </Button>
            </div>
        </div>
    );
}