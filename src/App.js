import React, { useState } from "react";
import "./App.css";
import UserManagement from "./User_management"; // Import UserManagement component
import LoginActivity from "./LoginActivity"; // Import LoginActivity component
import QuizApp from "./QuizApp"; // Make sure this path is correct
import OTP from "./OTP";
import NEWS from "./NEWS";
import Dashboard from "./Components/Weather"

const App = () => {
  const [clients, setClients] = useState([
    { id: "001", name: "Alice Johnson", email: "alice@example.com", phone: "123-456-7890" },
    { id: "002", name: "Bob Smith", email: "bob@example.com", phone: "098-765-4321" },
    { id: "003", name: "Charlie Brown", email: "charlie@example.com", phone: "555-555-5555" },
  ]);

  const [search, setSearch] = useState("");
  const [editorContent, setEditorContent] = useState("");
  const [addingClient, setAddingClient] = useState(false);
  const [newClient, setNewClient] = useState({ id: "", name: "", email: "", phone: "" });

  const [activeSection, setActiveSection] = useState("dashboard");

  const handleDelete = (id) => {
    setClients(clients.filter((client) => client.id !== id));
  };

  const handleAddClient = () => {
    if (!newClient.id || !newClient.name || !newClient.email || !newClient.phone) {
      alert("All fields are required!");
      return;
    }
    setClients([newClient, ...clients]);
    setAddingClient(false);
    setNewClient({ id: "", name: "", email: "", phone: "" });
  };

  const handleSaveEditor = () => {
    alert(`Content saved: ${editorContent}`);
    setEditorContent("");
  };

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <aside className="sidebar">
        <h2 className="logo">React Projects</h2>
        <ul>
          <li className={activeSection === "dashboard" ? "active" : ""} onClick={() => setActiveSection("dashboard")}>Weather App</li>
          <li className={activeSection === "clients" ? "active" : ""} onClick={() => setActiveSection("clients")}>Tic-Tac-Toe</li>
          <li className={activeSection === "userManagement" ? "active" : ""} onClick={() => setActiveSection("userManagement")}>To-Do-List</li>
          <li className={activeSection === "activities" ? "active" : ""} onClick={() => setActiveSection("activities")}>Password-Generator</li>
          <li className={activeSection === "earnings" ? "active" : ""} onClick={() => setActiveSection("earnings")}>OTP-Input</li>
          <li className={activeSection === "settings" ? "active" : ""} onClick={() => setActiveSection("settings")}>Quiz-App</li>
        </ul>
      </aside>

      <main className="main">
        {activeSection === "" && (
          <div>
            <section className="clients">
              <div className="section-header">
                
              </div>
            </section>

            {addingClient && (
              <div className="modal">
                <div className="modal-content">
                  <h2>Add New Client</h2>
                  <label>
                    ID:
                    <input
                      type="text"
                      value={newClient.id}
                      onChange={(e) => setNewClient({ ...newClient, id: e.target.value })}
                    />
                  </label>
                  <label>
                    Name:
                    <input
                      type="text"
                      value={newClient.name}
                      onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                    />
                  </label>
                  <label>
                    Email:
                    <input
                      type="email"
                      value={newClient.email}
                      onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                    />
                  </label>
                  <label>
                    Phone:
                    <input
                      type="text"
                      value={newClient.phone}
                      onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                    />
                  </label>
                  <button className="save-button" onClick={handleAddClient}>
                    Save
                  </button>
                  <button className="delete-button" onClick={() => setAddingClient(false)}>
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeSection === "userManagement" && <UserManagement />}
        {activeSection === "activities" && <LoginActivity />}
        {activeSection === "earnings" && <OTP />}
        {activeSection === "settings" && <QuizApp />}
        {activeSection === "clients" && <NEWS />}
        {activeSection === "dashboard" && <Dashboard />}



      </main>
    </div>
  );
};

export default App;
