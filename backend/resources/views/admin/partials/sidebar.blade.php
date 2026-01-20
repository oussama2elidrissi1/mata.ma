<aside class="w-64 bg-blue-900 min-h-screen text-white">
    <div class="p-6 border-b border-blue-800">
        <div class="flex items-center gap-3">
            <div class="relative">
                <span class="text-3xl font-bold text-red-500 tracking-tight" style="text-shadow: 2px 2px 4px rgba(0,0,0,0.3), -1px -1px 2px rgba(255,255,255,0.2); letter-spacing: -0.02em;">
                    MATA
                </span>
            </div>
            <div>
                <h2 class="font-bold text-lg text-white">Admin</h2>
                <p class="text-xs text-blue-200">Administration</p>
            </div>
        </div>
    </div>

    <nav class="p-4">
        <ul class="space-y-2">
            <li>
                <a href="{{ route('admin.dashboard') }}" class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors {{ request()->routeIs('admin.dashboard') ? 'bg-blue-800 text-white' : 'text-blue-200 hover:bg-blue-800 hover:text-white' }}">
                    <i data-lucide="layout-dashboard" class="w-5 h-5"></i>
                    <span class="font-medium">Dashboard</span>
                </a>
            </li>
            <li>
                <a href="{{ route('admin.actors') }}" class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors {{ request()->routeIs('admin.actors') ? 'bg-blue-800 text-white' : 'text-blue-200 hover:bg-blue-800 hover:text-white' }}">
                    <i data-lucide="users" class="w-5 h-5"></i>
                    <span class="font-medium">Acteurs</span>
                </a>
            </li>
            <li>
                <a href="{{ route('admin.associations') }}" class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors {{ request()->routeIs('admin.associations') ? 'bg-blue-800 text-white' : 'text-blue-200 hover:bg-blue-800 hover:text-white' }}">
                    <i data-lucide="building-2" class="w-5 h-5"></i>
                    <span class="font-medium">Associations</span>
                </a>
            </li>
            <li>
                <a href="{{ route('admin.accreditations') }}" class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors {{ request()->routeIs('admin.accreditations') ? 'bg-blue-800 text-white' : 'text-blue-200 hover:bg-blue-800 hover:text-white' }}">
                    <i data-lucide="award" class="w-5 h-5"></i>
                    <span class="font-medium">Accréditations</span>
                </a>
            </li>
            <li>
                <a href="{{ route('admin.pending') }}" class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors {{ request()->routeIs('admin.pending') ? 'bg-blue-800 text-white' : 'text-blue-200 hover:bg-blue-800 hover:text-white' }}">
                    <i data-lucide="clock" class="w-5 h-5"></i>
                    <span class="font-medium">Demandes en attente</span>
                </a>
            </li>
            <li>
                <a href="{{ route('admin.events') }}" class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors {{ request()->routeIs('admin.events') ? 'bg-blue-800 text-white' : 'text-blue-200 hover:bg-blue-800 hover:text-white' }}">
                    <i data-lucide="calendar" class="w-5 h-5"></i>
                    <span class="font-medium">Événements</span>
                </a>
            </li>
            <li>
                <a href="{{ route('admin.news') }}" class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors {{ request()->routeIs('admin.news') ? 'bg-blue-800 text-white' : 'text-blue-200 hover:bg-blue-800 hover:text-white' }}">
                    <i data-lucide="newspaper" class="w-5 h-5"></i>
                    <span class="font-medium">Actualités</span>
                </a>
            </li>
            <li>
                <a href="{{ route('admin.suspended') }}" class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors {{ request()->routeIs('admin.suspended') ? 'bg-blue-800 text-white' : 'text-blue-200 hover:bg-blue-800 hover:text-white' }}">
                    <i data-lucide="x-circle" class="w-5 h-5"></i>
                    <span class="font-medium">Suspendus</span>
                </a>
            </li>
            <li>
                <a href="{{ route('admin.users') }}" class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors {{ request()->routeIs('admin.users') ? 'bg-blue-800 text-white' : 'text-blue-200 hover:bg-blue-800 hover:text-white' }}">
                    <i data-lucide="user-cog" class="w-5 h-5"></i>
                    <span class="font-medium">Utilisateurs</span>
                </a>
            </li>
            <li>
                <a href="{{ route('admin.stats') }}" class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors {{ request()->routeIs('admin.stats') ? 'bg-blue-800 text-white' : 'text-blue-200 hover:bg-blue-800 hover:text-white' }}">
                    <i data-lucide="bar-chart-3" class="w-5 h-5"></i>
                    <span class="font-medium">Statistiques</span>
                </a>
            </li>
            <li>
                <a href="{{ route('admin.settings') }}" class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors {{ request()->routeIs('admin.settings') ? 'bg-blue-800 text-white' : 'text-blue-200 hover:bg-blue-800 hover:text-white' }}">
                    <i data-lucide="settings" class="w-5 h-5"></i>
                    <span class="font-medium">Paramètres</span>
                </a>
            </li>
        </ul>
    </nav>
</aside>
