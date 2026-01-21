// Function specifically for the add-group.html page
function handleCreateGroup() {
    const name = document.getElementById('groupName').value;
    const day = document.getElementById('groupDay').value;

    if (!name) return alert("Please enter a group name");

    const newGroup = {
        id: DataStore.groups.length + 1,
        name: name,
        day: day,
        scores: []
    };

    DataStore.groups.push(newGroup);
    saveData(); 

    // Redirect back to schedules
    window.location.href = 'schedules.html';
}

// Function to render schedules on schedules.html
function renderSchedules() {
    const container = document.getElementById('schedules-container');
    if (!container) return;

    container.innerHTML = DataStore.groups.map(g => `
        <div class="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm relative group">
            <button onclick="deleteGroup(${g.id})" class="absolute top-4 right-4 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition">
                Delete
            </button>
            <div class="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center font-black mb-6">
                ${g.name[0]}
            </div>
            <h3 class="text-xl font-black text-slate-900 mb-1">${g.name}</h3>
            <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">${g.day}</p>
        </div>
    `).join('');
}

function deleteGroup(id) {
    if(confirm('Delete this group?')) {
        DataStore.groups = DataStore.groups.filter(g => g.id !== id);
        saveData();
        renderSchedules();
    }
}

// Logic to run when any admin page loads
document.addEventListener('DOMContentLoaded', () => {
    // Check if on schedules page
    if (document.getElementById('schedules-container')) renderSchedules();
    
    // Update Dashboard Stats if on index.html
    if (document.getElementById('total-groups')) {
        document.getElementById('total-groups').innerText = DataStore.groups.length;
        // Calculation logic for avg...
    }
});