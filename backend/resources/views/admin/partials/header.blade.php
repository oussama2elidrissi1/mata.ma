<header class="bg-blue-900 shadow-md border-b border-blue-800">
    <div class="px-6 py-4">
        <div class="flex items-center justify-between">
            <div>
                <h1 class="text-2xl md:text-3xl font-bold text-white font-serif tracking-tight">{{ $title ?? 'Administration' }}</h1>
                <p class="text-sm text-blue-200 mt-1 font-normal">{{ $subtitle ?? '' }}</p>
            </div>
            <div class="flex items-center gap-3">
                @if(isset($actions))
                    {!! $actions !!}
                @endif
                <button id="logout-btn" class="flex items-center gap-2 px-4 py-2 text-white hover:bg-blue-800 rounded-lg transition-colors">
                    <i data-lucide="log-out" class="w-4 h-4"></i>
                    <span>Déconnexion</span>
                </button>
            </div>
        </div>
    </div>
</header>
