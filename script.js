const API = "http://localhost:3001/contacts";

async function fetchContacts() {
    const res = await fetch(API);
    const data = await res.json();

    let output = "";
    data.forEach(contact => {
        output += `
        <li>
            ${contact.name} - ${contact.phone}
            <button onclick="deleteContact(${contact.id})">Delete</button>
        </li>
        `;
    });

    document.getElementById("contactList").innerHTML = output;
}

async function addContact() {
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;

    if(name === "" || phone === "") {
        alert("Fill all fields");
        return;
    }

    await fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({name, phone, email})
    });

    fetchContacts();
}

async function deleteContact(id) {
    await fetch(`${API}/${id}`, {
        method: "DELETE"
    });

    fetchContacts();
}

async function searchContact() {
    const search = document.getElementById("search").value.toLowerCase();

    const res = await fetch(API);
    const data = await res.json();

    const filtered = data.filter(c =>
        c.name.toLowerCase().includes(search)
    );

    let output = "";
    filtered.forEach(contact => {
        output += `
        <li>
            ${contact.name} - ${contact.phone}
            <button onclick="deleteContact(${contact.id})">Delete</button>
        </li>
        `;
    });

    document.getElementById("contactList").innerHTML = output;
}

fetchContacts();
