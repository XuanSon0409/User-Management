import { Modal, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import UserRow from "./UserRow";

export default function UserTable({ users, onDelete, onEdit }) {
    const showDeleteConfirm = (id) => {
        Modal.confirm({
            title: "Are you sure you want to delete this user?",
            icon: <ExclamationCircleOutlined />,
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            async onOk() {
                try {
                    await onDelete(id);
                    message.success("User deleted successfully");
                } catch (error) {
                    message.error(error.message || "Delete failed");
                }
            },
        });
    };

    return (
        <div className="max-w-screen-xl mx-auto pt-9 mt-1 pb-20 px-8 sm:px-6 bg-gray-100 min-h-screen">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                {/* Header */}
                <h1 className="text-xl !font-semibold px-6 py-5 border-b border-gray-200">
                    User List
                </h1>

                {/* Table Header (hiển thị từ md trở lên) */}
                <div className="hidden md:grid grid-cols-20 gap-3 px-6 py-3 text-sm font-semibold bg-gray-50 text-gray-600 uppercase tracking-wide border-b border-gray-100">
                    <div className="col-span-5">Name</div>
                    <div className="col-span-5">Email</div>
                    <div className="col-span-3">Role</div>
                    <div className="col-span-3">Status</div>
                    <div className="col-span-4 ">Actions</div>
                </div>

                {/* Content */}
                {users.length === 0 ? (
                    <div className="text-center text-gray-500 text-sm py-10">
                        No users.
                    </div>
                ) : (
                    users.map((user) => (
                        <UserRow
                            key={user.id}
                            user={user}
                            onEdit={onEdit}
                            onDeleteConfirm={showDeleteConfirm}
                        />
                    ))
                )}
            </div>
        </div>
    );
}