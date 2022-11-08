<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('recipe_tags', function (Blueprint $table) {
            $table->morphs('taggable');
            $table->dropForeign(['recipe_id']);
            $table->unSignedBigInteger('recipe_id')->nullable()->change();
        });
        Schema::rename('recipe_tags', 'tags');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tags', function (Blueprint $table) {
            $table->dropColumn(['taggable_id', 'taggable_type']);
            $table->foreign('recipe_id')
                ->references('id')
                ->on('recipes');
        });
        Schema::rename('tags', 'recipe_tags');
    }
};
