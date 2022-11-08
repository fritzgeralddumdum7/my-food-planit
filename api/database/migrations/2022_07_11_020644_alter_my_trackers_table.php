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
        Schema::table('my_trackers', function (Blueprint $table) {
            $table->dropForeign(['recipe_id']);
            $table->dropColumn('recipe_id');

            $table->morphs('planable');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('my_trackers', function (Blueprint $table) {
            $table->dropMorphs('planable');
            $table->foreignId('recipe_id')
                ->constrained()
                ->onUpdate('cascade')
                ->onDelete('cascade');
        });
    }
};
