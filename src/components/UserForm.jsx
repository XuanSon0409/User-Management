import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select, Button, message } from "antd";

const { Option } = Select;

export default function UserForm({
    isModalOpen,
    onClose,
    onAddUser,
    initialValues,
    checkEmailExists,
}) {
    const [form] = Form.useForm();
    const [imageBase64, setImageBase64] = useState(null);

    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue(initialValues);
            setImageBase64(initialValues.avatar || null);
        }
    }, [initialValues, form]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => setImageBase64(reader.result);
        reader.readAsDataURL(file);
    };

    const handleFinish = async (values) => {
        if (!imageBase64) {
            message.error("Please upload an image.");
            return;
        }

        const trimmedValues = {
            ...values,
            name: values.name.replace(/\s+/g, " ").trim(),
            email: values.email.replace(/\s+/g, " ").trim(),
            role: values.role.trim(),
            status: values.status.trim(),
        };

        const isEdit = !!initialValues;
        const newUser = {
            ...trimmedValues,
            avatar: imageBase64,
            id: initialValues?.id || Date.now(),
        };

        try {
            const success = await onAddUser(newUser);
            if (success) {
                form.resetFields();
                setImageBase64(null);
                message.success(isEdit ? "Updated Successfully" : "Added Successfully");
            } else {
                message.error(isEdit ? "Update failed: user does not exist" : "Failed to add user");
            }
        } catch (error) {
            message.error(error.message || "Failed to save user");
        }
    };

    const handleCancel = () => {
        onClose();
        form.resetFields();
        setImageBase64(null);
    };

    return (
        <Modal
            title={initialValues ? "Edit User" : "Add New User"}
            open={isModalOpen}
            onCancel={handleCancel}
            footer={null}
            destroyOnHidden
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleFinish}
                className="space-y-4"
            >
                <Form.Item label="Name" name="name" rules={[{ required: true }]}>
                    <Input placeholder="Enter full name" />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true },
                        { type: "email", message: "Invalid email format" },
                        {
                            validator: (_, value) => {
                                if (!value || !checkEmailExists) return Promise.resolve();
                                const isEdit = !!initialValues;
                                const emailChanged = value !== initialValues?.email;
                                if ((!isEdit || emailChanged) && checkEmailExists(value)) {
                                    return Promise.reject(new Error("Email already exists"));
                                }
                                return Promise.resolve();
                            },
                        },
                    ]}
                >
                    <Input placeholder="example@email.com" />
                </Form.Item>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Form.Item label="Role" name="role" rules={[{ required: true }]}>
                        <Select placeholder="Select role">
                            <Option value="Admin">Admin</Option>
                            <Option value="User">User</Option>
                            <Option value="Moderator">Moderator</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label="Status" name="status" rules={[{ required: true }]}>
                        <Select placeholder="Select status">
                            <Option value="Active">Active</Option>
                            <Option value="Inactive">Inactive</Option>
                        </Select>
                    </Form.Item>
                </div>

                <Form.Item label="Avatar" required>
                    <div className="w-full">
                        {!imageBase64 ? (
                            <label
                                htmlFor="dropzone-file"
                                className="flex flex-col items-center justify-center w-full h-52 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
                            >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg
                                        className="w-8 h-8 mb-3 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M7 16v-4m0 0l-3 3m3-3l3 3M17 8v4m0 0l3-3m-3 3l-3-3m-2 10a9 9 0 100-18 9 9 0 000 18z"
                                        />
                                    </svg>
                                    <p className="text-sm text-gray-500">
                                        <span className="font-medium">Click to upload</span> or drag and drop
                                    </p>
                                    <p className="text-xs text-gray-400">PNG, JPG, JPEG up to 2MB</p>
                                </div>
                                <input
                                    id="dropzone-file"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                            </label>
                        ) : (
                            <div className="flex flex-col items-center gap-3">
                                <img
                                    src={imageBase64}
                                    alt="Preview"
                                    className="w-24 h-24 object-cover rounded-full border"
                                />
                                <button
                                    type="button"
                                    onClick={() => setImageBase64(null)}
                                    className="text-sm text-red-500 hover:underline"
                                >
                                    Remove image
                                </button>
                            </div>
                        )}
                    </div>
                </Form.Item>

                <Form.Item className="flex justify-end gap-2">
                    <Button onClick={handleCancel}>Cancel</Button>
                    <Button type="primary" htmlType="submit">
                        {initialValues ? "Update" : "Save"}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}
