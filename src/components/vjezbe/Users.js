import { useState, useEffect } from "react";
import { WP_REST_URL } from "../../services/wordpress";

function Users(){

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch(`${WP_REST_URL}/users`)
            .then(res => res.json())
            .then(data => setUsers(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="container">
            <h1>Korisnici</h1>
            <table className="row">
                {users.map(user => (
                    <tr className="col-12 mb-3" key={user.id}>
                        <td>
                            <img src={user.avatar_urls['48']} alt={user.name} width="96" height="96" />
                        </td>
                        <td>
                            <h2>{user.name}</h2>
                        </td>
                    </tr>
                ))}
            </table>
        </div>
    );
}

export default Users;