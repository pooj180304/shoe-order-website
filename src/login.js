import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
    const[username,Changeusername]=useState("");
    const[password,Changepassword]=useState("");

    const usenavigate = useNavigate()

    const ProceedLogin=(e)=>{
        e.preventDefault();
        if(validate()){
            fetch("http://localhost:3000/user/"+username).then((res)=>{
                return res.json();
            }).then((resp)=>{
                console.log(resp);
                if(Object.keys(resp).length===0){
                    toast.error('Please enter valid username');    
                }else{
                    if(resp.password === password){
                        toast.success('Success');
                        usenavigate('/display')
                    }else{
                        toast.error('Please enter valid credentials');
                    }
                }
            }).catch((err)=>{
                toast.error('Login failed due to :'+err.message);
            });
        }
    }
    const validate=()=>{
        let result = true;
        if(username === ''|| username === null){
            result=false;
            toast.warning('Please enter username');
        }
        if(password===''||password===null){
            result=false;
            toast.warning('Please enter password');
        }
        return result;
    }
    return (  
        <div className="body" >
        <div className="row justify-content-start align-items-center" style={{ minHeight: "100vh" }}>
            <div className="col-lg-3">
                <form onSubmit={ProceedLogin} className="container">
                    <div className="card">
                        <div className="card-header">
                            <h2>User Login</h2>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <label>username<span className="errmsg">*</span></label>
                                <input value={username} onChange={e=>Changeusername(e.target.value)} className="form-control"></input>
                            </div>
                            <div className="form-group">
                                <label>Password<span className="errmsg">*</span></label>
                                <input type="password" value={password} onChange={e=>Changepassword(e.target.value)} className="form-control"></input>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">Login</button>
                            &nbsp;
                            <Link className="btn btn-primary" to={'/register'}>New User</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        </div>
    );
}
 
export default Login;