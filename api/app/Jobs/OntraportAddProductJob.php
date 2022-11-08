<?php

namespace App\Jobs;

use App\Models\StorePlan;
use OntraportAPI\Ontraport;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Contracts\Queue\ShouldBeUnique;

class OntraportAddProductJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $payload, $userId;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($payload, $userId)
    {
        $this->payload = $payload;
        $this->userId = $userId;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $client = new Ontraport(env('ONTRAPORT_ID'),env('ONTRAPORT_KEY'));
        $response = $client->product()->create($this->payload);

        $storePlan = StorePlan::find($this->userId);
        $storePlan->ontraport_id = json_decode($response)->data->id;
        $storePlan->save();
    }
}
