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
        Schema::create('recipe_store_plans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('store_plan_id')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->unsignedInteger('meal_type');
            $table->unsignedInteger('nth_day');
            $table->morphs('planable');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('recipe_store_plans');
    }
};
