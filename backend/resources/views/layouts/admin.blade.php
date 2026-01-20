<!doctype html>
<html lang="fr" dir="ltr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ $title ?? 'Admin - MATA' }}</title>

    <!-- Tailwind CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- Lucide Icons (via CDN) -->
    <script src="https://unpkg.com/lucide@latest"></script>
    
    <!-- i18n Script -->
    <script src="{{ asset('js/i18n.js') }}" defer></script>
    
    <style>
        [x-cloak] { display: none !important; }
    </style>
</head>
<body class="min-h-screen bg-gray-50">
    <div class="flex min-h-screen">
        @include('admin.partials.sidebar')
        
        <main class="flex-1 overflow-x-hidden">
            @yield('content')
        </main>
    </div>

    <script src="{{ asset('js/admin.js') }}" defer></script>
</body>
</html>
