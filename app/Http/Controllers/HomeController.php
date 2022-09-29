<?php

namespace App\Http\Controllers;

use Validator;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('home');
    }

    public function get_all_employees(){
        $user = User::all();
        return response()->json(['status'=>true,'data'=>$user]);
    }

    public function get_single_employee(Request $request){
        $user = User::find($request->id);
        return response()->json(['status'=>true,'data'=>$user]);
    }

    public function edit_employee(Request $request)
    {
        $user = User::where('id',$request->id)->get(['id','name','email','mobile','gender','hobbies','address']);
        return response()->json(['status'=>true,'data'=>['id'=>$user[0]->id,'name'=>$user[0]->name,'email'=>$user[0]->email,'mobile'=>$user[0]->mobile,
        'gender'=>$user[0]->gender,'hobbies'=>$user[0]->hobbies,'address'=>$user[0]->address]]);
    }

    public function update_profile_picture(Request $request)
    {
        // return $request;
        $res = User::find($request->id);
        $file = $request->file('fileupload');
        $filename = time().'.'.$file->getClientOriginalExtension();
        $path = 'upload';
        // return $path;
        $res->profile_pic = url('/').'/'.$path.'/'.$filename;
        if($res->save()){
            $file->move($path,$filename);
            return response()->json(['status'=>true,'message'=>'Image Uploaded Successfully!']);
        }else{
            return response()->json(['status'=>false,'error'=>'Image Uploading Failed!']);
        }

    }

    public function change_password(Request $request)
    {
        // return $request->id;
        $valid = Validator::make($request->data,[
             'password' => 'required|same:confirm_password',
        ]);

        if(!$valid->passes()){
            return response()->json(['status'=>false,'error'=>$valid->errors()]);
        }else{
            $res = User::find($request->id);
            $res->password = Hash::make($request->password);
            if($res->save()){
                return response()->json(['status'=>true,'message'=>'Password Changed!']);
            }else{
                return response()->json(['status'=>false,'error'=>'Something Went Wrong!']);
            }
        }
    }

    public function update_employee(Request $request)
    {
        $valid = Validator::make($request->all(),[
          'name' => 'required',
          'email' => 'required|email',
          'mobile' => 'required|integer|digits:10',
          'gender' => 'required',
          'hobbies' => 'required|not_in:0',
          'address' => 'required',
        ]);

        if(!$valid->passes()){
            return response()->json(['status'=>false,'error'=>$valid->errors()]);
        }else{
            $res = User::find($request->id);
            $res->name = $request->name;
            $res->email = $request->email;
            $res->mobile = $request->mobile;
            $res->gender = $request->gender;
            $res->hobbies = $request->hobbies;
            $res->address =  $request->address;
            if($res->save()){
                return response()->json(['status'=>true,'message'=>'User Updated!']);
            }else{
                return response()->json(['status'=>false,'error'=>'Something Went Wrong!']);
            }
        }
    }

    public function add_employee(Request $request)
    {
        $valid = Validator::make($request->all(),[
          'name' => 'required',
          'email' => 'required|email',
          'mobile' => 'required|integer|digits:10',
          'gender' => 'required',
          'hobbies' => 'required|not_in:0',
          'address' => 'required',
          'password' => 'required|same:confirm_password',
        ]);

        if(!$valid->passes()){
            return response()->json(['status'=>false,'error'=>$valid->errors()]);
        }else{
            $res = new User;
            $res->name = $request->name;
            $res->email = $request->email;
            $res->mobile = $request->mobile;
            $res->gender = $request->gender;
            $res->hobbies = $request->hobbies;
            $res->address =  $request->address;
            $res->password =  Hash::make($request->password);
            if($res->save()){
                return response()->json(['status'=>true,'message'=>'User Added!']);
            }else{
                return response()->json(['status'=>false,'error'=>'Something Went Wrong!']);
            }
        }
    }

    public function delete_employee(Request $request)
    {
        $res = User::find($request->id);
        if($res->delete()){
            return response()->json(['status'=>true,'message'=>'User Deleted!']);
        }else{
            return response()->json(['status'=>false,'error'=>'Something Went Wrong!']);
        }
    }
}