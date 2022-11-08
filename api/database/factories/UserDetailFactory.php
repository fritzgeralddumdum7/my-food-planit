<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\UserDetail>
 */
class UserDetailFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'username' => $this->faker->userName(),
            'mfp_help' => 0,
            'height_unit'=>'cm',
            'height' => null,
            'current_weight'=>null,
            'current_weight_unit'=>'kg',
            'goal_weight'=>null,
            'goal_weight_unit'=>'kg',
            'nine_to_ten_mode'=>false,
            'calorie_goal'=>null,
        ];
    }
}
