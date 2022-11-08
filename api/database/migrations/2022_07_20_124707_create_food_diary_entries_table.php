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
        Schema::create('food_diary_entries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->date('date');
            $table->jsonb('nutritions');
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
        Schema::dropIfExists('food_diary_entries');
    }
};
