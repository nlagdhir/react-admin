import { Outlet, Navigate } from "react-router-dom";
import swal from "sweetalert";

const NonLoggedInRoutes = () => {

    // const [authenticated, setAuthenticated] = useState(false);

    // useEffect(() => {
    //     http.get('checkingAuthenticated').then(res => {
    //         if(res.status === 200){
    //             setAuthenticated(true);
    //         }
    //     }); 

    //     return () => {
    //         setAuthenticated(false);
    //     };
    // },[]);

    let token = localStorage.getItem('auth_token');

    if(token) {
        swal('success','You are logged in','success');
    }

    return (
        token ? <Navigate to="/admin" /> : <Outlet />
    )
}

export default NonLoggedInRoutes;