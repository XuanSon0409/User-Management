import { Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

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

    const handleFinish = (values) => {
        const trimmedValues = {
            ...values,
            name: values.name.trim(),
            email: values.email.trim(),
            role: values.role.trim(),
            status: values.status.trim(),
        };

        if (initialValues) {
            // Chế độ Edit
            onAddUser({ ...initialValues, ...trimmedValues });
        } else {
            // Chế độ Create
            onAddUser(trimmedValues);
        }

        form.resetFields();
        setImageBase64("");
        onClose();
    };

    return (
        <div className="border-b border-gray-200 px-4 py-4 md:grid md:grid-cols-12 md:gap-4 hover:bg-gray-50">
            {/* Name + Avatar */}
            <div className="flex items-center col-span-3">
                <img
                    src={user.avatar || `https://i.pravatar.cc/100?u=${user.email}`}
                    alt={user.name}
                    className="h-8 w-8 rounded-full mr-3"
                />
                <div className="min-w-0"> {/* để truncate hoạt động trong flex */}
                    <div className="text-sm font-medium text-gray-900 truncate max-w-[150px]">
                        {user.name}
                    </div>
                    <div className="md:hidden text-xs text-gray-500">{user.email}</div>
                </div>
            </div>

            {/* Email */}
            <div className="hidden md:block col-span-3 text-sm text-gray-600">
                {user.email}
            </div>

            {/* Role */}
            <div className="mt-2 md:mt-0 col-span-2">
                <span
                    className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${getRoleStyle(
                        user.role
                    )}`}
                >
                    {user.role}
                </span>
            </div>

            {/* Status */}
            <div className="mt-2 md:mt-0 col-span-2">
                <span
                    className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${getStatusStyle(
                        user.status
                    )}`}
                >
                    {user.status}
                </span>
            </div>

            {/* Actions */}
            <div className="mt-3 md:mt-0 col-span-2 flex gap-2">
                <Button
                    type="primary"
                    size="small"
                    icon={<EditOutlined />}
                    onClick={() => onEdit(user)}
                >
                    Edit
                </Button>
                <Button
                    type="primary"
                    danger
                    size="small"
                    icon={<DeleteOutlined />}
                    onClick={() => onDeleteConfirm(user.id)}
                >
                    Delete
                </Button>
            </div>
        </div>
    );
}


