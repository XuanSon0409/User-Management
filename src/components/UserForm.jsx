import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select, Button, message } from "antd";

const { Option } = Select;

export default function UserForm({ isModalOpen, onClose, onAddUser, initialValues, checkEmailExists, }) {
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
        reader.onload = () => {
            setImageBase64(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleFinish = async (values) => {
        if (!imageBase64) {
            message.error("Please upload an image.");
            return;
        }


        const trimmedValues = {
            ...values,
            name: values.name.replace(/\s+/g, ' ').trim(),
            email: values.email.replace(/\s+/g, ' ').trim(),
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
            await onAddUser(newUser);
            form.resetFields();
            setImageBase64(null);
            message.success(isEdit ? "Updated Successfully" : "Added Successfully");
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
            <Form form={form} layout="vertical" onFinish={handleFinish}>
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

                <Form.Item label="Avatar" required>
                    <div className="flex items-center justify-center w-full">
                        <div className="w-full h-64">
                            {!imageBase64 ? (
                                <label
                                    htmlFor="dropzone-file"
                                    className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                                >
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg
                                            className="w-8 h-8 mb-4 text-gray-500"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 20 16"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                            />
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500">
                                            <span className="font-semibold">Click to upload</span> or
                                            drag and drop
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            SVG, PNG, JPG or GIF (max 800x400px)
                                        </p>
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
                                <div className="flex flex-col items-center justify-center h-full gap-4">
                                    <img
                                        src={imageBase64}
                                        alt="Preview"
                                        className="h-24 w-24 object-cover rounded-full border"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setImageBase64(null)}
                                        className="text-sm text-red-500 hover:underline cursor-pointer"
                                    >
                                        Remove image
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </Form.Item>

                <Form.Item className=" text-right ">
                    <Button onClick={handleCancel} className="mr-2">
                        Cancel
                    </Button>
                    <Button type="primary" htmlType="submit">
                        {initialValues ? "Update" : "Save"}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}