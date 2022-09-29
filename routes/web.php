<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('auth/login');
});


Auth::routes();

Route::get('/home', [HomeController::class, 'index'])->name('home');
Route::get('/get-all-employees', [HomeController::class, 'get_all_employees']);
Route::get('/get-single-employee', [HomeController::class, 'get_single_employee']);
Route::get('/edit-employee', [HomeController::class, 'edit_employee']);
Route::post('/update-employee', [HomeController::class, 'update_employee']);
Route::post('/add-employee', [HomeController::class, 'add_employee']);
Route::post('/update-profile-picture',[HomeController::class,'update_profile_picture']);
Route::post('/change-password',[HomeController::class,'change_password']);
Route::get('/delete-employee',[HomeController::class,'delete_employee']);
Route::get( '/{path?}', function(){
    return view('home');
} )->where('path', '.*');
