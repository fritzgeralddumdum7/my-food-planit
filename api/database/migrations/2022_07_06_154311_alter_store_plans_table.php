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
        Schema::table('store_plans', function (Blueprint $table) {
            $table->dropColumn('total_recipes');
            $table->renameColumn('total_days', 'days');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('store_plans', function (Blueprint $table) {
            $table->integer('total_recipes')->after('days');
            $table->renameColumn('days', 'total_days');
        });
    }
};
