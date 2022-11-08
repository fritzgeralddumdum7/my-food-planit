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
        
        Schema::table('recipe_plans', function (Blueprint $table) {
            $table->morphs('recipe_plannable');
            $table->dropForeign(['recipe_id']);
            $table->unSignedBigInteger('recipe_id')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *u
     * @return void
     */
    public function down()
    {
        Schema::table('recipe_plans', function (Blueprint $table) {
            $table->dropColumn(['recipe_plannable_id', 'recipe_plannable_type']);
            $table->foreign('recipe_id')
                ->references('id')
                ->on('recipes');
        });
    }
};
