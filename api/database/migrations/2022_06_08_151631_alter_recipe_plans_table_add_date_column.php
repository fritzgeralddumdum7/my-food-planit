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
            $table->unSignedBigInteger('nth_day')->default(1)->after('meal_type');
        });
        
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('recipe_plans', function (Blueprint $table) {
            $table->dropColumn('nth_day');
        });
    }
};
