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
        Schema::table('user_details', function (Blueprint $table) {
            $table->boolean('mfp_help')->nullable()->change();
            $table->string('weight_goal_level')->nullable()->change();
            $table->integer('activity_level')->nullable()->change();
            $table->integer('age')->nullable()->change();
            $table->integer('gender')->nullable()->change();
            $table->decimal('height')->nullable()->change();
            $table->decimal('current_weight')->nullable()->change();
            $table->decimal('goal_weight')->nullable()->change();
            $table->boolean('nine_to_ten_mode')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('user_details', function (Blueprint $table) {
            $table->boolean('mfp_help')->nullable(false)->change();
            $table->string('weight_goal_level')->nullable(false)->change();
            $table->integer('activity_level')->nullable(false)->change();
            $table->integer('age')->nullable(false)->change();
            $table->integer('gender')->nullable(false)->change();
            $table->double('height')->nullable(false)->change();
            $table->double('current_weight')->nullable(false)->change();
            $table->double('goal_weight')->nullable(false)->change();
            $table->boolean('nine_to_ten_mode')->nullable(false)->change();
        });
    }
};