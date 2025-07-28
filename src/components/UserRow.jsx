import { Button } from "antd";
import { EditFilled, DeleteFilled } from "@ant-design/icons";

export default function UserRow({ user, onEdit, onDeleteConfirm }) {
    const getRoleStyle = (role) => {
        switch (role) {
            case "Admin":
                return "bg-blue-100 text-blue-800";
            case "User":
                return "bg-purple-100 text-purple-800";
            case "Moderator":
                return "bg-green-100 text-green-800";
            default:
                return "bg-gray-200 text-gray-600";
        }
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case "Active":
                return "bg-green-100 text-green-800";
            case "Inactive":
                return "bg-yellow-100 text-yellow-800";
            default:
                return "bg-gray-200 text-gray-600";
        }
    };

    return (
        <div className="border-b border-gray-200 p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-4 items-center hover:bg-gray-50 transition-all">
            {/* Avatar + Name + Email (on small screen) */}
            <div className="flex items-center gap-3 md:col-span-3">
                <img
                    src={user.avatar || `https://i.pravatar.cc/100?u=${user.email}`}
                    alt={user.name}
                    className="h-10 w-10 rounded-full border object-cover"
                />
                <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate max-w-[150px]">{user.name}</p>
                    <p className="text-xs text-gray-500 md:hidden truncate">{user.email}</p>
                </div>
            </div>

            {/* Email (hidden on small screens) */}
            <div className="hidden md:block md:col-span-3 text-sm text-gray-600 truncate">
                {user.email}
            </div>

            {/* Role */}
            <div className="md:col-span-2">
                <span
                    className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${getRoleStyle(
                        user.role
                    )}`}
                >
                    {user.role}
                </span>
            </div>

            {/* Status */}
            <div className="md:col-span-2">
                <span
                    className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${getStatusStyle(
                        user.status
                    )}`}
                >
                    {user.status}
                </span>
            </div>

            {/* Actions */}
            <div className="flex gap-2 md:col-span-2 flex-wrap justify-start md:justify-end">
                <Button
                    type="primary"
                    size="small"
                    icon={<EditFilled />}
                    onClick={() => onEdit(user)}
                    className="flex items-center"
                >
                    Edit
                </Button>
                <Button
                    type="primary"
                    danger
                    size="small"
                    icon={<DeleteFilled />}
                    onClick={() => onDeleteConfirm(user.id)}
                    className="flex items-center"
                >
                    Delete
                </Button>
            </div>
        </div>
    );
}