<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Eloquent\Model;
use App\Models\Tag;

class TaggableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $tags = Tag::all();
        $tags->each(function ($tag) {
            if ($tag->recipe_id && !$tag->taggable_type) {
                $tag->taggable_id = $tag->recipe_id;
                $tag->taggable_type = 'App\Models\Recipe';
                $tag->save();
            }
        });
    }
}
