@component('mail::layout')
    @slot('header')
        @component('mail::header', ['url' => config('app.client')])
            My Food Planit
        @endcomponent
    @endslot

# Greetings!

<h1>You have been invited by {{$name}}</h1>

@component('mail::button', ['url' => $url])
Join My Food Planit
@endcomponent

Thanks,<br>
{{ config('app.name') }}


    @slot('footer')
        @component('mail::footer')
          © {{ date('Y') }} {{ config('app.name') }}. @lang('All rights reserved.')
        @endcomponent
  @endslot
@endcomponent