<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Relationships>
 */
class RelationshipsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $follower = User::inRandomOrder()->first();
        $following = User::inRandomOrder()->first();
        while($following == $follower) {
            $following = User::inRandomOrder()->first();
        }
        return [
            'follower_id' => $follower,
            'following_id' => $following
        ];
    }
}
