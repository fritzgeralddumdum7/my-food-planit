<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use OntraportAPI\Ontraport;
use App\Models\PlanPurchase;

class OntraportPurchaseJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $payload, $purchaseId;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($payload, $purchaseId)
    {
        $this->payload = $payload;
        $this->purchaseId = $purchaseId;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $client = new Ontraport(env('ONTRAPORT_ID'),env('ONTRAPORT_KEY'));
        $response = $client->transaction()->processManual($this->payload);
        
        PlanPurchase::find($this->purchaseId)->update([
            'ontraport_id' => json_decode($response)->data->invoice_id
        ]);
    }
}
