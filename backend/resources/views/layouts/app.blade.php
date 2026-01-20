<!doctype html>
<html lang="fr" dir="ltr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ $title ?? 'MATA - Annuaire des Acteurs du Tourisme' }}</title>

    <!-- Tailwind CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- i18n Script (chargé en premier) -->
    <script src="{{ asset('js/i18n.js') }}"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: '#CC0000',
                    }
                }
            }
        }
    </script>
    <style>
        body {
            font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
        ::-webkit-scrollbar {
            width: 8px;
        }
        ::-webkit-scrollbar-track {
            background: #f1f1f1;
        }
        ::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #555;
        }
    </style>
</head>
<body class="min-h-screen bg-white text-slate-900">
    @include('partials.header')

    <main class="min-h-[70vh]">
        @yield('content')
    </main>

    @include('partials.footer')

    <script src="{{ asset('js/app.js') }}" defer></script>
</body>
</html>
