const API = "https://69f1f0a6b15130b973523d9c.mockapi.io/contacts";

let editId = null;

async function fetchContacts() {
  try {
    const res = await fetch(API);
    const data = await res.json();

    let output = "";

    data.forEach(contact => {
      output += `
      <li>
        ${contact.name} - ${contact.phone} - ${contact.email}
        <button class="edit-btn" onclick="editContact('${contact.id}','${contact.name}','${contact.phone}','${contact.email}')">Edit</button>
        <button class onclick="deleteContact(${contact.id})">Delete</button>
      </li>
      `;
    });

    document.getElementById("contactList").innerHTML = output;

  } catch (error) {
    alert("Failed to load contacts");
  }
}

async function addContact() {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;

  if (name === "" || phone === "" || email === "") {
    alert("Fill all fields");
    return;
  }

  try {
    if (editId) {
      await fetch(`${API}/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email })
      });

      editId = null;

    } else {
      await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email })
      });
    }

    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("email").value = "";

    fetchContacts();

  } catch (error) {
    alert("Something went wrong");
  }
}

function editContact(id, name, phone, email) {
  document.getElementById("name").value = name;
  document.getElementById("phone").value = phone;
  document.getElementById("email").value = email;

  editId = id;
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

  const filtered = data.filter(contact =>
    contact.name.toLowerCase().includes(search)
  );

  let output = "";

  filtered.forEach(contact => {
    output += `
    <li>
      ${contact.name} - ${contact.phone}
    </li>
    `;
  });

  document.getElementById("contactList").innerHTML = output;
}

fetchContacts();