const Layout = {
    init() {
        this.renderSidebar();
        this.renderTopHeader();
        this.renderMobileHeader();
    },

    getBrand() {
        const role = localStorage.getItem('userRole') || 'leader';
        return {
            name: 'ScoreFlow',
            logoColor: '#00A78E',
            bg: '#ffffff'
        };
    },

    renderSidebar() {
        const container = document.getElementById('sidebar-container');
        if (!container) return;

        const role = localStorage.getItem('userRole') || 'leader';
        const brand = this.getBrand();
        const currentPath = window.location.pathname;

        const sections = [
            {
                title: '',
                items: [
                    { icon: 'grid', label: 'Dashboard', href: role === 'admin' ? '../admin/index.html' : '../leader/index.html' },
                    { icon: 'chart', label: 'Reporting', href: '../admin/performance.html' }
                ]
            },
            {
                title: 'Management',
                items: [
                    { icon: 'home', label: 'Cohorts', href: '../admin/groups.html' },
                    { icon: 'users', label: 'Members', href: '../admin/users.html' }
                ]
            },
            {
                title: 'Operations',
                items: [
                    { icon: 'edit', label: 'Score Entry', href: '../leader/index.html' },
                    { icon: 'cast', label: 'Live Mode', href: '../admin/live-rankings.html' },
                    { icon: 'refresh', label: 'Rounds', href: '../admin/rounds.html' },
                    { icon: 'plan', label: 'Schedules', href: '../admin/schedules.html' }
                ]
            }
        ];

        const sidebarHTML = `
            <div id="hs-sidebar-footer" class="hs-overlay [--auto-close:lg] lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 w-64 hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform h-full hidden fixed top-0 start-0 bottom-0 z-[60] bg-white border-e border-gray-100">
                <div class="relative flex flex-col h-full">
                    <header class="p-6 mb-2">
                        <a class="flex items-center gap-3" href="/">
                            <div class="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black" style="background: ${brand.logoColor}">
                                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                            </div>
                            <span class="text-xl font-black text-gray-900 tracking-tight">${brand.name}</span>
                        </a>
                    </header>
                    
                    <nav class="flex-1 overflow-y-auto px-4">
                        ${sections.map(section => `
                            ${section.title ? `<div class="sidebar-category">${section.title}</div>` : ''}
                            <ul class="space-y-1">
                                ${section.items.map(item => {
            const isActive = currentPath.includes(item.href) && item.href !== '#';
            return `
                                        <li>
                                            <a class="sidebar-item flex items-center gap-x-3.5 py-3 px-4 text-sm font-semibold ${isActive ? 'sidebar-item-active' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}" href="${item.href}">
                                                ${this.getIcon(item.icon, isActive)}
                                                ${item.label}
                                            </a>
                                        </li>
                                    `;
        }).join('')}
                            </ul>
                        `).join('')}
                    </nav>

                    <footer class="p-6 border-t border-gray-50">
                        <div class="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">
                            ScoreFlow v2.5.0
                        </div>
                    </footer>
                </div>
            </div>
        `;

        container.innerHTML = sidebarHTML;
    },

    renderTopHeader() {
        const container = document.getElementById('top-header-pill');
        if (!container) return;

        const user = JSON.parse(localStorage.getItem('user')) || { name: 'Guest', email: 'guest@example.com' };

        container.innerHTML = `
            <header class="hidden lg:flex items-center justify-between py-4 px-8 bg-white border-b border-gray-100 sticky top-0 z-50">
                <div class="flex items-center gap-6 flex-1 max-w-2xl">
                    <button class="text-gray-400 hover:text-gray-600">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
                    </button>
                    <div class="relative flex-1 group">
                        <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg class="w-5 h-5 text-gray-400 group-focus-within:text-[#00A78E] transition-colors" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                        </div>
                        <input type="text" class="top-search-input text-sm font-medium focus:bg-white focus:ring-2 focus:ring-[#e6f6f4] outline-none" placeholder="Search">
                        <div class="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                            <span class="text-[10px] font-bold text-gray-400 border border-gray-200 rounded px-1.5 py-0.5">+ Space</span>
                        </div>
                    </div>
                </div>

                <div class="flex items-center gap-6">
                    <div class="flex items-center gap-4 text-gray-400">
                        <button class="hover:text-gray-600"><svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg></button>
                        <button class="hover:text-gray-600"><svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><circle cx="12" cy="12" r="3"/></svg></button>
                        <button class="hover:text-gray-600"><svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></button>
                    </div>
                    <div class="h-8 w-px bg-gray-100"></div>
                    <div class="flex items-center gap-3 pl-2">
                        <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=00A78E&color=fff" class="w-10 h-10 rounded-full border-2 border-white shadow-sm" alt="">
                        <div class="hidden xl:block">
                            <p class="text-xs font-bold text-gray-900">${user.name}</p>
                            <p class="text-[10px] font-medium text-gray-400">${user.email}</p>
                        </div>
                        <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="m19.5 8.25-7.5 7.5-7.5-7.5"/></svg>
                    </div>
                </div>
            </header>
        `;
    },

    renderMobileHeader() {
        const container = document.getElementById('mobile-header-container');
        if (!container) return;

        container.innerHTML = `
            <div class="sticky top-0 inset-x-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3 lg:hidden">
                <div class="flex justify-between items-center">
                    <div class="flex items-center gap-2">
                         <div class="w-8 h-8 rounded-lg flex items-center justify-center text-white font-black bg-[#00A78E]">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                        </div>
                        <span class="font-black text-xl tracking-tight">ScoreFlow</span>
                    </div>
                    <button type="button" class="p-2 bg-gray-50 border border-gray-100 rounded-xl" data-hs-overlay="#hs-sidebar-footer">
                        <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
                    </button>
                </div>
            </div>
        `;
    },

    getIcon(name, active) {
        const color = active ? '#00A78E' : 'currentColor';
        const icons = {
            grid: `<svg class="w-5 h-5" fill="none" stroke="${color}" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>`,
            list: `<svg class="w-5 h-5" fill="none" stroke="${color}" stroke-width="2" viewBox="0 0 24 24"><path d="M9 6h11M9 12h11M9 18h11M5 6v.01M5 12v.01M5 18v.01"/></svg>`,
            mail: `<svg class="w-5 h-5" fill="none" stroke="${color}" stroke-width="2" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>`,
            chart: `<svg class="w-5 h-5" fill="none" stroke="${color}" stroke-width="2" viewBox="0 0 24 24"><path d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"/><path d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"/></svg>`,
            home: `<svg class="w-5 h-5" fill="none" stroke="${color}" stroke-width="2" viewBox="0 0 24 24"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>`,
            users: `<svg class="w-5 h-5" fill="none" stroke="${color}" stroke-width="2" viewBox="0 0 24 24"><path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>`,
            edit: `<svg class="w-5 h-5" fill="none" stroke="${color}" stroke-width="2" viewBox="0 0 24 24"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>`,
            refresh: `<svg class="w-5 h-5" fill="none" stroke="${color}" stroke-width="2" viewBox="0 0 24 24"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>`,
            cast: `<svg class="w-5 h-5" fill="none" stroke="${color}" stroke-width="2" viewBox="0 0 24 24"><path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>`,
            plan: `<svg class="w-5 h-5" fill="none" stroke="${color}" stroke-width="2" viewBox="0 0 24 24"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>`
        };
        return icons[name] || '';
    },

    logout() {
        if (confirm('Are you sure you want to sign out?')) {
            localStorage.clear();
            window.location.href = '../auth.html';
        }
    }
};

document.addEventListener('DOMContentLoaded', () => Layout.init());
