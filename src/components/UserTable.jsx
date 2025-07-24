import { Modal, message, } from "antd";
import { ExclamationCircleOutlined } from '@ant-design/icons'
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
        <div className="max-w-[90%] mx-auto pt-10 bg-gray-100 min-h-screen">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <h1 className="text-xl !font-semibold px-6 py-4 border-b border-gray-200 !mb-0">
                    User List
                </h1>


                <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 text-sm font-semibold bg-gray-50 text-gray-500 ">
                    <div className="col-span-3">NAME</div>
                    <div className="col-span-3">EMAIL</div>
                    <div className="col-span-2">ROLE</div>
                    <div className="col-span-2">STATUS</div>
                    <div className="col-span-2">ACTIONS</div>
                </div>

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
