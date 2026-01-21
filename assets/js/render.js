const Render = {
    scheduleTable: () => {
        const tbody = document.getElementById('schedule-table-body');
        if (!tbody) return;
        
        tbody.innerHTML = Store.groups.map(group => `
            <tr class="group hover:bg-slate-50/50 transition-colors">
                <td class="py-4 font-semibold text-sm">${group.name}</td>
                <td class="py-4 text-sm text-slate-500">${group.lead}</td>
                <td class="py-4">
                    <span class="px-3 py-1 rounded-full text-[10px] font-bold ${
                        group.status === 'Live' ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-500'
                    }">${group.status}</span>
                </td>
                <td class="py-4 text-right">
                    <button class="text-xs font-bold text-indigo-600 hover:underline">Manage</button>
                </td>
            </tr>
        `).join('');
    },

    leaderboard: () => {
        const container = document.getElementById('top-individuals');
        if (!container) return;

        container.innerHTML = Store.individuals.map((person, i) => `
            <div class="flex items-center justify-between group">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-500 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                        ${person.avatar}
                    </div>
                    <div>
                        <p class="text-sm font-bold">${person.name}</p>
                        <p class="text-[10px] text-slate-400 font-bold uppercase">Rank #${i+1}</p>
                    </div>
                </div>
                <span class="text-sm font-bold text-indigo-600">${person.points}</span>
            </div>
        `).join('');
    }
};

const UI = {
    // 1. Toast Notification Logic
    showToast: (title, message, type = 'success') => {
        const container = document.getElementById('toast-container');
        const template = document.getElementById('toast-template');
        const clone = template.content.cloneNode(true);
        
        clone.querySelector('.title-text').innerText = title;
        clone.querySelector('.message-text').innerText = message;
        
        const iconContainer = clone.querySelector('.icon-container');
        if(type === 'success') {
            iconContainer.classList.add('bg-green-100', 'text-green-600');
            iconContainer.innerHTML = `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>`;
        }

        const toast = clone.querySelector('div');
        container.appendChild(toast);
        
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            toast.style.transition = 'all 0.5s ease';
            setTimeout(() => toast.remove(), 500);
        }, 3000);
    },

    // 2. Modal Logic
    openGroupModal: (groupId) => {
        const group = Store.groups.find(g => g.id === groupId);
        const backdrop = document.getElementById('modal-backdrop');
        const content = document.getElementById('modal-content');
        const title = document.getElementById('modal-title');

        title.innerText = `${group.name} - Individual Breakdown`;
        
        // Mock individual data for the group
        const members = [
            { name: "John Doe", role: "Developer", contribution: "85%" },
            { name: "Jane Smith", role: "Designer", contribution: "92%" },
            { name: "Sam Wilson", role: "QA", contribution: "78%" }
        ];

        content.innerHTML = `
            <div class="space-y-4">
                ${members.map(m => `
                    <div class="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                        <div>
                            <p class="font-bold text-slate-800">${m.name}</p>
                            <p class="text-xs text-slate-500">${m.role}</p>
                        </div>
                        <div class="text-right">
                            <p class="text-sm font-bold text-indigo-600">${m.contribution}</p>
                            <p class="text-[10px] uppercase text-slate-400 font-bold">Contribution</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        backdrop.classList.remove('hidden');
    },

    closeModal: () => {
        document.getElementById('modal-backdrop').classList.add('hidden');
    }
};