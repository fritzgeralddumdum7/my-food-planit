<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StorePlansRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'title' => 'required|string',
            'days' => 'required',
            'tags' => 'array',
            'tags.*' => 'string|distinct',
            'recipePlans' => 'nullable|array',
            'newIngredients' => 'nullable|array',
            'price' => 'required|numeric',
            'plan' => 'required|string',
        ];
    }
}
