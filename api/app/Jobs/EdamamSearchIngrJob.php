<?php

namespace App\Jobs;

use App\Models\JobResult;
use Illuminate\Bus\Queueable;
use Illuminate\Support\Facades\Http;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Contracts\Queue\ShouldBeUnique;

class EdamamSearchIngrJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $payload;
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
        $result = Http::get('https://api.edamam.com/auto-complete',[
            'app_id' => env('EDAMAM_FOOD_ID'),
            'app_key' => env('EDAMAM_FOOD_KEY'),
            'q' => $this->payload['keyword']
        ]);

        JobResult::find($this->payload['id'])->update([
            'data' => $result,
            'is_job_done' => true,
        ]);
    }
}
