import {useAuth} from "../Context/AuthContext";
import {useNavigate} from "react-router-dom";
import LoginModal from "../modals/LoginModal";

export const Login = () =>{
    const {handleLogin} = useAuth();
    const navigate = useNavigate();

    const handleLoginClick = async (name:string, password:string) =>{
        if(handleLogin){
            await handleLogin(name,password)
        }
    }

    const handleRegisterClick = () => {
        navigate("/register");
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-sm p-6 bg-white rounded shadow-md">
                <h2 className="text-2xl font-semibold mb-6">Log In</h2>
                <LoginModal
                    onLogin={handleLoginClick}
                    navigate={navigate}
                />
                <p className="text-center mt-4 text-gray-600">
                    Do not have an account?{" "}
                    <button
                        className="text-blue-500 hover:text-blue-600 underline focus:outline-none"
                        onClick={handleRegisterClick}
                    >
                        Register
                    </button>
                </p>
            </div>
        </div>
    );
};

