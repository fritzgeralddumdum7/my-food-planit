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
        Schema::create('health_vitals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->double('weight');
            $table->string('notes');
            $table->string('bp');
            $table->string('a1c');
            $table->double('neck');
            $table->double('waist');
            $table->double('hips');
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
        Schema::dropIfExists('health_vitals');
    }
};
