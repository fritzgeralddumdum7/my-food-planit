@component('mail::layout')
    @slot('header')
        @component('mail::header', ['url' => config('app.client')])
            My Food Planit
        @endcomponent
    @endslot

# Greetings!

View your cart.

@component('mail::button', ['url' => $url])
View Cart
@endcomponent

Thanks,<br>
{{ config('app.name') }}


    @slot('footer')
        @component('mail::footer')
          © {{ date('Y') }} {{ config('app.name') }}. @lang('All rights reserved.')
        @endcomponent
  @endslot
@endcomponent
