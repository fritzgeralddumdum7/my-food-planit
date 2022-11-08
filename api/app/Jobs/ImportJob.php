<?php

namespace App\Jobs;

use App\Models\Recipe;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Http;

class ImportJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $payload;
    public $timeout = 0;
    public $tries = 3;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($payload)
    {
        $this->payload = $payload;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $nutritions = [];
        $total['calories'] = 0;
        $total['fat'] = 0;
        $total['carbs'] = 0;
        $total['cholesterol'] = 0;
        $total['sodium'] = 0;
        $total['protein'] = 0;
        $total['sugar'] = 0;

        foreach ($this->payload['ingredients'] as $ingredient) {
            $totalNutrients = Http::get('https://api.edamam.com/api/nutrition-data', [
                'app_id' => env('EDAMAM_ID'),
                'app_key' => env('EDAMAM_KEY'),
                'nutrition-type' => 'logging',
                'ingr' => $ingredient
            ])['totalNutrients'];

            if ($totalNutrients) {
                $nutrition['ingr'] = $ingredient;
                $nutrition['calories'] = isset($totalNutrients['ENERC_KCAL']) ? $totalNutrients['ENERC_KCAL']['quantity']: 0;
                $nutrition['fat'] = isset($totalNutrients['FAT']) ? $totalNutrients['FAT']['quantity'] : 0;
                $nutrition['carbs'] = isset($totalNutrients['CHOCDF']) ? $totalNutrients['CHOCDF']['quantity'] : 0;
                $nutrition['cholesterol'] = isset($totalNutrients['CHOLE']) ? $totalNutrients['CHOLE']['quantity'] : 0;
                $nutrition['sodium'] = isset($totalNutrients['NA']) ? $totalNutrients['NA']['quantity'] : 0;
                $nutrition['protein'] = isset($totalNutrients['PROCNT']) ? $totalNutrients['PROCNT']['quantity'] : 0;
                $nutrition['sugar'] = isset($totalNutrients['SUGAR']) ? $totalNutrients['SUGAR']['quantity'] : 0;
                $nutritions['match'][] = $nutrition;

                $total['calories'] += $nutrition['calories'];
                $total['fat'] += $nutrition['fat'];
                $total['carbs'] += $nutrition['carbs'];
                $total['cholesterol'] += $nutrition['cholesterol'];
                $total['sodium'] += $nutrition['sodium'];
                $total['protein'] += $nutrition['protein'];
                $total['sugar'] += $nutrition['sugar'];
            } else {
                $nutrition['ingr'] = $ingredient;
                $nutritions['unmatch'][] = $nutrition;
            }
        }

        $parsedNutrition = [
            'calories' => $total['calories'] / $this->payload['serving'],
            'fat' => $total['fat'] / $this->payload['serving'],
            'carbs' => $total['carbs'] / $this->payload['serving'],
            'cholesterol' => $total['cholesterol'] / $this->payload['serving'],
            'sodium' => $total['sodium'] / $this->payload['serving'],
            'protein' => $total['protein'] / $this->payload['serving'],
            'sugar' => $total['sugar'] / $this->payload['serving'],
            'totalNutrition' => $total
        ];

        Recipe::whereId($this->payload['id'])->update([
            'nutritions' => $parsedNutrition,
        ]);
    }
}
