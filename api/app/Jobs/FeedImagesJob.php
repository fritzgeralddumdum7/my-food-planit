<?php

namespace App\Jobs;

use App\Models\FeedImage;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;

class FeedImagesJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $payload;
    public $tries = 5;
    
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
        $path = $this->payload['path'] . '/' . $this->payload['originalFileName'];

        if (Storage::disk('s3')->put($path, Storage::disk('public')->get($path))) {
            Storage::disk('public')->delete($path);
            Storage::deleteDirectory($this->payload['path']);
        }
    }
}
