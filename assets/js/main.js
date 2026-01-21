document.addEventListener('DOMContentLoaded', () => {
    const role = Store.currentUser.role;
    
    // Update Badge UI
    document.getElementById('user-role-label').innerText = role;
    document.getElementById('user-name').innerText = role === 'admin' ? 'System Administrator' : 'Lead Evaluator';

    // Show Correct View
    if (role === 'admin') {
        document.getElementById('admin-view').classList.remove('hidden');
        Render.scheduleTable();
        Render.leaderboard();
    } else {
        document.getElementById('leader-view').classList.remove('hidden');
        // Initializing Leader History
        document.getElementById('leader-history').innerHTML = `
            <div class="p-3 bg-slate-50 rounded-xl text-xs text-slate-500 border border-slate-100">
                You haven't submitted any scores yet today.
            </div>
        `;
    }
});

function logout() {
    localStorage.clear();
    window.location.href = 'index.html';
}