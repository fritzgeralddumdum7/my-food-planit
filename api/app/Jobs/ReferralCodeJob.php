<?php

namespace App\Jobs;

use App\Models\Friend;
use App\Models\Relationships;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Carbon;

class ReferralCodeJob implements ShouldQueue
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
        if ($this->payload['code'] != null) {
            $user = User::where('referral_code', $this->payload['code'])->first();

            $invitation = $user->friends()->where('email', $this->payload['email'])->first();
            $friend = null;

            if ($invitation) {
                $friend = $invitation->update([
                    'hasJoined' => true,
                    'joined' => Carbon::now()
                ]);
            } else {
                $friend = Friend::create([
                    'invited_by' => $user->id,
                    'email' => $this->payload['email'],
                    'hasJoined' => true,
                    'invited' => Carbon::now(),
                    'joined' => Carbon::now(),
                ]);
            }

            $new_user = User::where('email', $this->payload['email'])->first();

            Relationships::create([
                'follower_id' => $user->id,
                'following_id' => $new_user->id
            ]);

            Relationships::create([
                'follower_id' => $new_user->id,
                'following_id' => $user->id
            ]);
        } else {
            $invitation = Friend::where('email', $this->payload['email'])->first();

            if ($invitation) {
                $invitation->update([
                    'hasJoined' => 1,
                    'joined' => Carbon::now()
                ]);

                Relationships::create([
                    'follower_id' => $this->payload['id'],
                    'following_id' => $invitation->inviter->id
                ]);

                Relationships::create([
                    'follower_id' => $invitation->inviter->id,
                    'following_id' => $this->payload['id']
                ]);
            }
        }
    }
}
