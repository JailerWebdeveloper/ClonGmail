import { useEffect, useState } from "react";
import { MdRefresh, MdInbox, MdMail, MdStar, MdLabel, MdOutlineMail, MdSend } from "react-icons/md";
import { useUser } from "../../../Services/hooks/useAuth";
import { Toaster, toast } from 'sonner';

const Dashboard = () => {
    const [emails, setEmails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedEmail, setSelectedEmail] = useState(null);
    const [newMessage, setNewMessage] = useState({
        sender: "",
        receiver: "",
        content: ""
    });

    const UserInfo = useUser();

    const fetchEmails = async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://seguridargmail.onrender.com/api/message/Allmensages/${UserInfo.user}`);
            const data = await response.json();
            setEmails(data.data);
        } catch (error) {
            console.error("Error fetching emails:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmails();
    }, []);

    const handleSendMessage = async () => {
        if (newMessage.receiver === UserInfo.user) {
            toast.error("No puedes enviarte mensajes a ti mismo.");
            return;
        }

        try {
            const response = await fetch("https://seguridargmail.onrender.com/api/message/Enviarmensaje", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newMessage),
            });

            if (response.ok) {
                toast.success('Message sent successfully');
                setNewMessage({ sender: "", receiver: "", content: "" });
                setIsModalOpen(false);
                fetchEmails();
            } else {
                toast.error("Failed to send message");
            }
        } catch (error) {
            console.error("Error sending message:", error);
            toast.error("An error occurred while sending the message.");
        }
    };

    const openViewModal = (email) => {
        setSelectedEmail(email);
        setIsViewModalOpen(true);
    };

    return (
        <div className="flex h-screen">
            <Toaster position="top-right" />
            
            {/* Sidebar */}
            <aside className="w-64 bg-gray-100 p-4 border-r border-gray-200">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="btn btn-primary w-full mb-4 flex items-center gap-2"
                >
                    <MdMail className="text-xl" />
                    Enviar
                </button>
                <ul className="space-y-2">
                    <li>
                        <a className="flex items-center gap-3 text-gray-700 hover:bg-gray-200 p-2 rounded">
                            <MdInbox className="text-lg" />
                            <span>Inbox</span>
                        </a>
                    </li>
                    <li>
                        <a className="flex items-center gap-3 text-gray-700 hover:bg-gray-200 p-2 rounded">
                            <MdStar className="text-lg" />
                            <span>Starred</span>
                        </a>
                    </li>
                    <li>
                        <a className="flex items-center gap-3 text-gray-700 hover:bg-gray-200 p-2 rounded">
                            <MdLabel className="text-lg" />
                            <span>Important</span>
                        </a>
                    </li>
                </ul>
            </aside>

            {/* Email List */}
            <div className="flex-1 flex flex-col">
                <header className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h1 className="text-2xl font-semibold text-gray-700">Inbox</h1>
                    <button onClick={fetchEmails} className="btn btn-sm btn-outline flex items-center gap-2">
                        <MdRefresh />
                        Refresh
                    </button>
                </header>

                <main className="p-4 flex-1 overflow-auto">
                    {loading ? (
                        <p className="text-center text-gray-500">Loading emails...</p>
                    ) : (
                        <ul className="space-y-3">
                            {emails && emails.messages && emails.messages.length > 0 ? (
                                emails.messages.map((email) => (
                                    <li
                                        key={email.id}
                                        className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:bg-gray-100 cursor-pointer"
                                        onClick={() => openViewModal(email)}
                                    >
                                        <div className="flex-shrink-0">
                                            <MdOutlineMail className="size-8 mr-4"/>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-gray-800">{email.sender}</h3>
                                            <p className="text-sm text-gray-600">{email.receiver}</p>
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {new Date(email.timestamp).toLocaleDateString()}
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <p className="text-center text-gray-500">No emails available.</p>
                            )}
                        </ul>
                    )}
                </main>
            </div>

            {/* Send Message Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6 space-y-4">
                        <h2 className="text-2xl font-bold text-gray-800">Compose Message</h2>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Sender</label>
                            <input
                                type="text"
                                value={newMessage.sender}
                                onChange={(e) => setNewMessage({ ...newMessage, sender: e.target.value })}
                                className="input input-bordered w-full mt-1"
                                placeholder="Your name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Receiver</label>
                            <input
                                type="text"
                                value={newMessage.receiver}
                                onChange={(e) => setNewMessage({ ...newMessage, receiver: e.target.value })}
                                className="input input-bordered w-full mt-1"
                                placeholder="Receiver's name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Message</label>
                            <textarea
                                value={newMessage.content}
                                onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
                                className="textarea textarea-bordered w-full mt-1"
                                placeholder="Type your message..."
                            ></textarea>
                        </div>
                        <div className="flex justify-end space-x-4">
                            <button onClick={() => setIsModalOpen(false)} className="btn btn-ghost">Cancel</button>
                            <button onClick={handleSendMessage} className="btn btn-primary flex items-center gap-2">
                                <MdSend className="text-lg" /> Send
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* View Email Modal */}
            {isViewModalOpen && selectedEmail && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6 space-y-4">
                        <h2 className="text-2xl font-bold text-gray-800">Email from {selectedEmail.sender}</h2>
                        <p className="text-sm text-gray-600">To: {selectedEmail.receiver}</p>
                        <div className="mt-4">
                            <p className="text-gray-800">{selectedEmail.content}</p>
                        </div>
                        <div className="flex justify-end">
                            <button onClick={() => setIsViewModalOpen(false)} className="btn btn-primary">Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
