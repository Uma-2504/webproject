const form = document.getElementById("form");
const list = document.getElementById("appointmentList");

// Load existing appointments
let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
renderAppointments();

// Scroll function (navbar)
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({
    behavior: "smooth"
  });
}

// Form submit
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const appointment = {
    name: form[0].value,
    email: form[1].value,
    date: form[2].value,
    time: form[3].value
  };

  appointments.push(appointment);
  localStorage.setItem("appointments", JSON.stringify(appointments));

  showToast("🎉 Appointment booked successfully!");
  renderAppointments();
  form.reset();
});

// Show appointments
function renderAppointments() {
  list.innerHTML = "";

  if (appointments.length === 0) {
    list.innerHTML = "<p class='text-center text-muted'>No appointments yet</p>";
    return;
  }

  appointments.forEach(a => {
    const div = document.createElement("div");
    div.className = "alert alert-info";
    div.innerHTML = `
      <strong>${a.name}</strong><br>
      📧 ${a.email}<br>
      📅 ${a.date} | ⏰ ${a.time}
    `;
    list.appendChild(div);
  });
}

// Clear appointments (Admin)
function clearAppointments() {
  if (confirm("Are you sure you want to delete all appointments?")) {
    appointments = [];
    localStorage.removeItem("appointments");
    renderAppointments();
  }
}

// Toast message
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "position-fixed bottom-0 end-0 m-3 alert alert-success shadow";
  toast.innerText = message;
  document.body.appendChild(toast);

  setTimeout(() => toast.remove(), 2500);
}