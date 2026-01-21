// On Load
document.addEventListener('DOMContentLoaded', () => {
    refreshAll();
});

function refreshAll() {
    renderUserTable();
    renderRankings();
    updateDashboardStats(); // From previous step
}

/* --- USER MANAGEMENT --- */
function renderUserTable() {
    const tbody = document.getElementById('user-table-body');
    tbody.innerHTML = DataStore.users.map(user => {
        const group = DataStore.groups.find(g => g.id === user.groupId);
        return `
            <tr class="border-b border-slate-50 hover:bg-slate-50 transition">
                <td class="p-6">
                    <p class="font-bold text-slate-800">${user.name}</p>
                    <p class="text-[10px] text-slate-400 font-bold">${user.email}</p>
                </td>
                <td class="p-6">
                    <span class="px-3 py-1 rounded-2x text-[10px] font-bold ${user.role === 'Leader' ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-500'}">
                        ${user.role}
                    </span>
                </td>
                <td class="p-6">
                    <select onchange="assignUserToGroup(${user.id}, this.value)" class="bg-transparent border-none text-xs font-bold text-slate-600 focus:ring-0">
                        <option value="">No Group</option>
                        ${DataStore.groups.map(g => `<option value="${g.id}" ${g.id === user.groupId ? 'selected' : ''}>${g.name}</option>`).join('')}
                    </select>
                </td>
                <td class="p-6 text-right">
                    <button class="text-red-400 hover:text-red-600 text-xs font-bold">Remove</button>
                </td>
            </tr>
        `;
    }).join('');
}

function openUserModal() { document.getElementById('user-modal').classList.remove('hidden'); }
function closeUserModal() { document.getElementById('user-modal').classList.add('hidden'); }

function saveUser() {
    const name = document.getElementById('new-user-name').value;
    const role = document.getElementById('new-user-role').value;
    
    if(!name) return alert("Please enter a name");

    const newUser = {
        id: DataStore.users.length + 1,
        name: name,
        email: name.toLowerCase().replace(' ', '.') + "@school.edu",
        role: role,
        groupId: null
    };

    DataStore.users.push(newUser);
    closeUserModal();
    refreshAll();
}

/* --- GROUP RANKINGS & PERFORMANCE --- */
function renderRankings() {
    const rankList = document.getElementById('group-rank-list');
    
    // Sort groups by their average score
    const rankedGroups = [...DataStore.groups].sort((a, b) => {
        return DataStore.getGroupAvg(b.id) - DataStore.getGroupAvg(a.id);
    });

    rankList.innerHTML = rankedGroups.map((group, index) => `
        <div class="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <div class="flex items-center gap-4">
                <span class="w-8 h-8 flex items-center justify-center font-black ${index === 0 ? 'text-amber-500' : 'text-slate-300'}">
                    #${index + 1}
                </span>
                <div>
                    <p class="font-bold text-slate-800">${group.name}</p>
                    <p class="text-[10px] text-slate-400 font-bold tracking-widest uppercase">${group.members.length} Members</p>
                </div>
            </div>
            <div class="text-right">
                <p class="text-lg font-black text-indigo-600">${DataStore.getGroupAvg(group.id)}</p>
                <p class="text-[10px] text-slate-400 font-bold uppercase">Avg Score</p>
            </div>
        </div>
    `).join('');

    renderTrendChart(rankedGroups);
}

function renderTrendChart(groups) {
    const chart = document.getElementById('trend-chart');
    chart.innerHTML = groups.map(g => `
        <div class="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
            <div class="w-full bg-slate-100 rounded-lg overflow-hidden flex items-end h-full">
                <div class="bg-indigo-500 w-full transition-all duration-700 hover:bg-indigo-400" 
                     style="height: ${DataStore.getGroupAvg(g.id) * 10}%"></div>
            </div>
            <span class="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">${g.name.substring(0,5)}...</span>
        </div>
    `).join('');
}

function assignUserToGroup(userId, groupId) {
    const user = DataStore.users.find(u => u.id === userId);
    user.groupId = parseInt(groupId);
    // Refresh member counts in groups
    DataStore.groups.forEach(g => {
        g.members = DataStore.users.filter(u => u.groupId === g.id).map(u => u.id);
    });
    refreshAll();
}