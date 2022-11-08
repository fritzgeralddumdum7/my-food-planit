<?php

namespace Database\Seeders;

use App\Models\MyMealPlan;
use App\Models\Recipe;
use App\Models\RecipePlan;
use App\Models\ScheduledPlan;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use File;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;


class CalendarSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $mealPlan = MyMealPlan::where('user_id', 1)->get(['id'])->first()->toArray();
        $mealPlans = MyMealPlan::where('user_id', 1)->get(['id'])->toArray();

        for ($i = 0; $i < count($mealPlans); $i++) {
            $ingredients = File::get("database/data/ingredients.json");
            $directions = File::get("database/data/directions.json");
            $nutritions = File::get("database/data/nutritions.json");
            $mealTypes = [1, 2, 3, 4, 5];

            foreach ($mealTypes as $mealType) {
                $faker = Faker::create();
                $recipe = Recipe::create([
                    'user_id' => 1,
                    'title' => $faker->sentence,
                    'author' => $faker->word,
                    'image' => 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505',
                    'serving' => rand(1,10),
                    'ingredients' => $ingredients,
                    'nutritions' => $nutritions,
                    'directions' => $directions,
                    'created_at' => now(),
                    'updated_at' => now(),
                    'is_ninety_ten' => 0
                ]);

                $planable = new ScheduledPlan;
                $planable->meal_type = $mealType;
                $planable->date = $i > 0 ?date('Y-m-d', strtotime(date('Y-m-d') . ' ' . $i . ' days')) : date('Y-m-d');
                $recipe->scheduledPlan()->save($planable);
            }
        }
    }
}
